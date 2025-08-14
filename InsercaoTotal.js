import { MongoClient, ObjectId } from 'mongodb';

// ===================================================================================
// SCRIPT MESTRE UNIFICADO E COMPLETO - INSERÇÃO DE DADOS
// ARQUIVO CONVERTIDO PARA NODE.JS
// ===================================================================================

const insercao = async () => {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('projeto_financeiro');
    
    console.log("--- INICIANDO EXECUÇÃO DO SCRIPT DE INSERÇÃO ---");

    // ETAPA 0: LIMPEZA DAS COLEÇÕES NO BANCO DE DADOS ATUAL
    console.log(
      "Etapa 0: Limpando coleções existentes (consultorias, tipos_investimento, clientes)..."
    );
    
    try {
      await db.collection('consultorias').drop();
    } catch (e) {
      console.log("Coleção consultorias não existia");
    }
    
    try {
      await db.collection('tipos_investimento').drop();
    } catch (e) {
      console.log("Coleção tipos_investimento não existia");
    }
    
    try {
      await db.collection('clientes').drop();
    } catch (e) {
      console.log("Coleção clientes não existia");
    }
    
    console.log("Coleções limpas com sucesso.");

    // ETAPA 1: DEFINIÇÃO DOS IDs DE REFERÊNCIA
    console.log("Etapa 1: Definindo ObjectIds para interconexão...");

    const consultoriaId_Recife1 = new ObjectId();
    const consultoriaId_SP1 = new ObjectId();
    const consultoriaId_Recife2 = new ObjectId();
    const consultoriaId_BH = new ObjectId();
    const consultoriaId_POA = new ObjectId();
    const consultoriaId_Brasilia = new ObjectId();
    const consultoriaId_Salvador = new ObjectId();
    const consultoriaId_Curitiba = new ObjectId();
    const consultoriaId_Manaus = new ObjectId();
    const consultoriaId_Floripa = new ObjectId();
    
    const tipoId_AcoesNacionais = new ObjectId();
    const tipoId_RendaFixaPos = new ObjectId();
    const tipoId_FII = new ObjectId();
    const tipoId_Cripto = new ObjectId();
    const tipoId_Multimercado = new ObjectId();
    const tipoId_AcoesInter = new ObjectId();
    const tipoId_RendaFixaPre = new ObjectId();
    const tipoId_FIA = new ObjectId();
    const tipoId_ETF = new ObjectId();
    const tipoId_Commodities = new ObjectId();
    const tipoId_Debentures = new ObjectId();
    const tipoId_COE = new ObjectId();
    const tipoId_Previdencia = new ObjectId();
    const tipoId_Cambio = new ObjectId();
    const tipoId_FIDC = new ObjectId();

    console.log("ObjectIds definidos.");

    // ETAPA 2: INSERÇÃO DAS 10 CONSULTORIAS
    console.log("Etapa 2: Inserindo 10 documentos em 'consultorias'...");
    
    await db.collection('consultorias').insertMany([
      {
        _id: consultoriaId_Recife1,
        nome_consultoria: "ValorInvest Consultoria",
        cnpj: "11.222.333/0001-44",
        data_fundacao: new Date("2010-05-20T00:00:00Z"),
        endereco: {
          rua: "Av. Boa Viagem",
          numero: "1200",
          cidade: "Recife",
          estado: "PE",
          cep: "51020-001",
          pais: "Brasil",
        },
        contato: { telefone: "81999991111", email: "contato@valorinvest.com.br" },
        consultores_principais: ["Carlos Silva", "Mariana Costa"],
        segmento_foco: ["Pessoa Física", "Pequenas Empresas"],
        nota_avaliacao_media: 4.8,
      },
      {
        _id: consultoriaId_SP1,
        nome_consultoria: "Futuro Seguro Partners",
        cnpj: "44.555.666/0001-77",
        data_fundacao: new Date("2005-11-15T00:00:00Z"),
        endereco: {
          rua: "Av. Paulista",
          numero: "900",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01310-100",
          pais: "Brasil",
        },
        contato: { telefone: "11988882222", email: "parceria@futuroseguro.com" },
        consultores_principals: [
          "Roberto Almeida",
          "Beatriz Lima",
          "Fernando Jorge",
        ],
        segmento_foco: ["Grandes Empresas", "Investidores Institucionais"],
        nota_avaliacao_media: 4.9,
      },
      {
        _id: consultoriaId_Floripa,
        nome_consultoria: "Floripa Wealth Tech",
        cnpj: "99.888.777/0001-10",
        data_fundacao: new Date("2020-08-10T00:00:00Z"),
        endereco: {
          rua: "Av. Beira Mar Norte",
          numero: "500",
          cidade: "Florianópolis",
          estado: "SC",
          cep: "88015-700",
          pais: "Brasil",
        },
        contato: { telefone: "48999990000", email: "tech@floripawealth.com" },
        consultores_principais: ["Luciana Tech", "Rafael Innovation"],
        segmento_foco: ["Startups", "Tecnologia"],
        nota_avaliacao_media: 4.7,
      },
    ]);

    console.log("Consultorias inseridas com sucesso.");

    // ETAPA 3: INSERÇÃO DOS TIPOS DE INVESTIMENTO
    console.log("Etapa 3: Inserindo tipos de investimento...");
    
    await db.collection('tipos_investimento').insertMany([
      {
        _id: tipoId_AcoesNacionais,
        nome_tipo: "Ações Nacionais",
        descricao: "Participação no capital social de empresas de capital aberto na bolsa brasileira.",
        nivel_risco: 4,
        emissor_principal: "B3",
        liquidez: "Diária",
      },
      {
        _id: tipoId_RendaFixaPos,
        nome_tipo: "Renda Fixa Pós-Fixada",
        descricao: "Títulos de dívida com rentabilidade atrelada a um indicador, como a taxa Selic ou CDI.",
        nivel_risco: 1,
        emissor_principal: "Tesouro Nacional / Bancos",
        liquidez: "Variável",
      },
      {
        _id: tipoId_FII,
        nome_tipo: "Fundos Imobiliários (FIIs)",
        descricao: "Fundos que investem em ativos do mercado imobiliário. Distribuem rendimentos mensais.",
        nivel_risco: 3,
        emissor_principal: "B3",
        liquidez: "Diária",
      },
    ]);

    console.log("Tipos de investimento inseridos com sucesso.");

    // ETAPA 4: INSERÇÃO DOS CLIENTES
    console.log("Etapa 4: Inserindo clientes...");
    
    await db.collection('clientes').insertMany([
      {
        nome_completo: "Ana Silva Santos",
        cpf: "123.456.789-10",
        data_nascimento: new Date("1985-03-15T00:00:00Z"),
        data_adesao: new Date("2020-01-10T00:00:00Z"),
        endereco: {
          rua: "Rua das Flores",
          numero: "123",
          cidade: "Recife",
          estado: "PE",
          cep: "50000-000",
          pais: "Brasil",
        },
        contato: {
          telefone: "81987654321",
          email: "ana.silva@email.com",
        },
        perfil_investidor: "Moderado",
        consultoria_id: consultoriaId_Recife1,
        investimentos: [
          {
            tipo_investimento_id: tipoId_AcoesNacionais,
            valor_aplicado: 15000,
            data_aplicacao: new Date("2020-02-01T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_RendaFixaPos,
            valor_aplicado: 25000,
            data_aplicacao: new Date("2020-03-15T00:00:00Z"),
          },
        ],
      },
    ]);

    console.log("Clientes inseridos com sucesso.");

    // RESUMO FINAL
    console.log("--- SCRIPT DE INSERÇÃO FINALIZADO ---");
    console.log("Resumo da base de dados criada:");
    
    const consultoriasCount = await db.collection('consultorias').countDocuments();
    const tiposCount = await db.collection('tipos_investimento').countDocuments();
    const clientesCount = await db.collection('clientes').countDocuments();
    
    console.log(`- Coleção 'consultorias': ${consultoriasCount} documentos.`);
    console.log(`- Coleção 'tipos_investimento': ${tiposCount} documentos.`);
    console.log(`- Coleção 'clientes': ${clientesCount} documentos.`);

  } catch (error) {
    console.error('Erro durante a inserção:', error);
  } finally {
    await client.close();
  }
};

export default insercao;
