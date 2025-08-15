import { MongoClient, ObjectId } from "mongodb";

// ===================================================================================
// SCRIPT DE CONSULTAS E OPERAÇÕES - VERSÃO NODE.JS
// ===================================================================================

const checkListProject = async () => {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("projeto_financeiro");

        console.log("\n--- INICIANDO SCRIPT DE CONSULTAS E OPERAÇÕES ---");

        // --- 1. USE ---
        console.log(
            "--- 1. USE: Conectado ao banco de dados 'projeto_financeiro' ---"
        );

        // --- 2. FIND ---
        console.log(
            "\n--- 2. FIND: Encontrando todos os clientes com perfil 'Agressivo' ---"
        );
        const clientesAgressivos = await db
            .collection("clientes")
            .find({ perfil_investidor: "Agressivo" })
            .toArray();
        console.log(JSON.stringify(clientesAgressivos, null, 2));

        // --- 3. SIZE ---
        console.log(
            "\n--- 3. SIZE: Encontrando clientes que possuem exatamente 3 investimentos ---"
        );
        const clientesCom3Investimentos = await db
            .collection("clientes")
            .find({ investimentos: { $size: 3 } })
            .toArray();
        console.log(JSON.stringify(clientesCom3Investimentos, null, 2));

        // --- 4 a 12. AGGREGATE, MATCH, GTE, PROJECT, GROUP, SUM, MAX, AVG, COUNT ---
        console.log(
            "\n--- 4-12. AGGREGATE, GTE, MATCH, GROUP, SUM, AVG, MAX, COUNT ---"
        );

        // --- Consulta 1 com operadores agregados: Relatório  ---
        console.log(
            "\n--- Consulta 1 com operadores agregados: Relatório: Valor total investido, média, maior investimento e contagem de clientes com perfil 'Moderado' ou 'Arrojado' que aderiram desde 2022, agrupados por perfil."
        );

        const relatorioAgregado = await db
            .collection("clientes")
            .aggregate([
                {
                    $match: {
                        data_adesao: { $gte: new Date("2022-01-01T00:00:00Z") },
                        perfil_investidor: { $in: ["Moderado", "Conservador"] },
                    },
                },
                { $unwind: "$investimentos" },
                {
                    $group: {
                        _id: "$perfil_investidor",
                        valor_total_investido: {
                            $sum: "$investimentos.valor_aplicado",
                        },
                        maior_investimento_individual: {
                            $max: "$investimentos.valor_aplicado",
                        },
                        media_por_investimento: {
                            $avg: "$investimentos.valor_aplicado",
                        },
                        clientes_unicos: { $addToSet: "$_id" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        perfil_de_investidor: "$_id",
                        valor_total_investido: "$valor_total_investido",
                        maior_investimento_individual:
                            "$maior_investimento_individual",
                        media_por_investimento: "$media_por_investimento",
                        numero_de_clientes: { $size: "$clientes_unicos" },
                    },
                },
            ])
            .toArray();

        console.log(JSON.stringify(relatorioAgregado, null, 2));

        // --- Consulta 2 com operadores agregados: Média de investimento por tipo de produto desde 2023 ---
        console.log(
            "\n--- Consulta 2 com operadores agregados: Média de investimento por tipo de produto desde 2023 ---"
        );

        const mediaPorProduto = await db
            .collection("clientes")
            .aggregate([
                { $unwind: "$investimentos" },

                {
                    $match: {
                        "investimentos.data_aplicacao": {
                            $gte: new Date("2023-01-01T00:00:00Z"),
                        },
                    },
                },

                {
                    $lookup: {
                        from: "tipos_investimento",
                        localField: "investimentos.tipo_investimento_id",
                        foreignField: "_id",
                        as: "tipo_info",
                    },
                },

                { $unwind: "$tipo_info" },

                {
                    $group: {
                        _id: "$tipo_info.nome_tipo",
                        media_investida: {
                            $avg: "$investimentos.valor_aplicado",
                        },
                        maior_investimento: {
                            $max: "$investimentos.valor_aplicado",
                        },
                        total_investido: {
                            $sum: "$investimentos.valor_aplicado",
                        },
                        qtd_investimentos: { $sum: 1 },
                    },
                },

                {
                    $project: {
                        _id: 0,
                        tipo_produto: "$_id",
                        media_investida: 1,
                        maior_investimento: 1,
                        total_investido: 1,
                        qtd_investimentos: 1,
                    },
                },
            ])
            .toArray();

        console.log("Média por produto:", mediaPorProduto);

        // --- Consulta 3 com operadores agregados: Total investido por mês em 2024 ---
        console.log(
            "\n--- Consulta 3 com operadores agregados: Total investido por mês em 2024 ---"
        );

        const totalPorMes = await db
            .collection("clientes")
            .aggregate([
                { $unwind: "$investimentos" },
                {
                    $match: {
                        "investimentos.data_aplicacao": {
                            // CORREÇÃO: O campo é data_aplicacao
                            $gte: new Date("2022-01-01T00:00:00Z"),
                            $lt: new Date("2023-01-01T00:00:00Z"),
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            ano: { $year: "$investimentos.data_aplicacao" }, // CORREÇÃO
                            mes: { $month: "$investimentos.data_aplicacao" }, // CORREÇÃO
                        },
                        total_investido: {
                            $sum: "$investimentos.valor_aplicado",
                        },
                        media_investida: {
                            $avg: "$investimentos.valor_aplicado",
                        },
                        qtd_investimentos: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        mes: "$_id.mes",
                        ano: "$_id.ano",
                        total_investido: 1,
                        media_investida: 1,
                        qtd_investimentos: 1,
                    },
                },
                { $sort: { ano: 1, mes: 1 } },
            ])
            .toArray();

        console.log("Total por mês:", totalPorMes);

        // --- Consulta 4 com operadores agregados: Contagem de clientes por perfil com mais de R$ 50.000 aplicados ---
        console.log(
            "\n--- Consulta 4 com operadores agregados: Contagem de clientes por perfil com mais de R$ 50.000 aplicados ---"
        );

        const clientesAltoValor = await db
            .collection("clientes")
            .aggregate([
                { $unwind: "$investimentos" },
                {
                    $group: {
                        _id: "$_id",
                        perfil: { $first: "$perfil_investidor" },
                        total_investido: {
                            $sum: "$investimentos.valor_aplicado",
                        },
                    },
                },
                { $match: { total_investido: { $gte: 50000 } } },
                {
                    $group: {
                        _id: "$perfil",
                        qtd_clientes: { $sum: 1 },
                        total_investido_grupo: { $sum: "$total_investido" },
                        media_investida_grupo: { $avg: "$total_investido" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        perfil_investidor: "$_id",
                        qtd_clientes: 1,
                        total_investido_grupo: 1,
                        media_investida_grupo: 1,
                    },
                },
            ])
            .toArray();

        console.log("Clientes alto valor:", clientesAltoValor);

        // --- 13. EXISTS ---
        console.log(
            "\n--- 13. EXISTS: Encontrando clientes que possuem o campo 'observacoes' ---"
        );
        const clientesComObservacoes = await db
            .collection("clientes")
            .find({ observacoes: { $exists: true } })
            .toArray();
        console.log(JSON.stringify(clientesComObservacoes, null, 2));

        // --- 14. SORT ---
        console.log(
            "\n--- 14. SORT: Listando os 5 clientes mais antigos (data de adesão ascendente) ---"
        );
        const clientesAntigos = await db
            .collection("clientes")
            .find()
            .sort({ data_adesao: 1 })
            .limit(5)
            .toArray();
        console.log(JSON.stringify(clientesAntigos, null, 2));

        // --- 15. LIMIT ---
        console.log(
            "\n--- 15. LIMIT: A consulta anterior já utilizou o .limit(5) ---"
        );

        // --- 16. $WHERE ---
        console.log(
            "\n--- 16. $WHERE: Encontrando clientes onde o nome do cliente tem mais de 20 caracteres ---"
        );
        const clientesNomeLongo = await db
            .collection("clientes")
            .find({ $where: "this.nome_completo.length > 20" })
            .toArray();
        console.log(JSON.stringify(clientesNomeLongo, null, 2));

        console.log("\n--- FIM DO SCRIPT DE CONSULTAS E OPERAÇÕES ---");
    } catch (error) {
        console.error("Erro durante as consultas:", error);
    } finally {
        await client.close();
    }
};

export default checkListProject;
