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
        _id: consultoriaId_Recife2,
        nome_consultoria: "Nordeste Finance",
        cnpj: "77.888.999/0001-55",
        data_fundacao: new Date("2012-09-05T00:00:00Z"),
        endereco: { rua: "Rua da Aurora", numero: "450", cidade: "Recife", estado: "PE", cep: "50050-000", pais: "Brasil" },
        contato: { telefone: "81977776666", email: "contato@nordestefinance.com" },
        consultores_principais: ["Paulo Andrade", "Fernanda Torres"],
        segmento_foco: ["Pessoa Física", "PMEs"],
        nota_avaliacao_media: 4.5,
      },
      {
        _id: consultoriaId_BH,
        nome_consultoria: "BH Capital",
        cnpj: "12.345.678/0001-90",
        data_fundacao: new Date("2008-01-18T00:00:00Z"),
        endereco: { rua: "Av. Afonso Pena", numero: "1500", cidade: "Belo Horizonte", estado: "MG", cep: "30130-005", pais: "Brasil" },
        contato: { telefone: "31988887777", email: "contato@bhcapital.com" },
        consultores_principais: ["Rogério Lemos", "Isabela Souza"],
        segmento_foco: ["Investidores Qualificados"],
        nota_avaliacao_media: 4.6,
      },
      {
        _id: consultoriaId_POA,
        nome_consultoria: "SulInvest",
        cnpj: "98.765.432/0001-11",
        data_fundacao: new Date("2011-07-10T00:00:00Z"),
        endereco: { rua: "Av. Borges de Medeiros", numero: "200", cidade: "Porto Alegre", estado: "RS", cep: "90020-021", pais: "Brasil" },
        contato: { telefone: "51999998888", email: "contato@sulinvest.com" },
        consultores_principais: ["Cláudio Porto", "Marina Reis"],
        segmento_foco: ["Empresas Familiares"],
        nota_avaliacao_media: 4.4,
      },
      {
        _id: consultoriaId_Brasilia,
        nome_consultoria: "Capital Federal Advisors",
        cnpj: "33.444.555/0001-22",
        data_fundacao: new Date("2015-02-25T00:00:00Z"),
        endereco: { rua: "Setor Comercial Sul", numero: "Qd 3", cidade: "Brasília", estado: "DF", cep: "70000-000", pais: "Brasil" },
        contato: { telefone: "61988887777", email: "contato@cfa.com" },
        consultores_principais: ["Eduardo Neves", "Camila Prado"],
        segmento_foco: ["Servidores Públicos"],
        nota_avaliacao_media: 4.3,
      },
      {
        _id: consultoriaId_Salvador,
        nome_consultoria: "Bahia Wealth",
        cnpj: "88.999.000/0001-33",
        data_fundacao: new Date("2009-10-12T00:00:00Z"),
        endereco: { rua: "Av. Tancredo Neves", numero: "3000", cidade: "Salvador", estado: "BA", cep: "41820-021", pais: "Brasil" },
        contato: { telefone: "71999990000", email: "contato@bahiawealth.com" },
        consultores_principais: ["Patrícia Moura", "Luiz Gonzaga"],
        segmento_foco: ["Turismo", "Hotéis"],
        nota_avaliacao_media: 4.7,
      },
      {
        _id: consultoriaId_Curitiba,
        nome_consultoria: "Paraná Invest",
        cnpj: "55.666.777/0001-88",
        data_fundacao: new Date("2007-06-22T00:00:00Z"),
        endereco: { rua: "Rua XV de Novembro", numero: "100", cidade: "Curitiba", estado: "PR", cep: "80020-310", pais: "Brasil" },
        contato: { telefone: "41988887777", email: "contato@paranainvest.com" },
        consultores_principais: ["Thiago Lopes", "Renata Dias"],
        segmento_foco: ["Indústrias", "Exportadores"],
        nota_avaliacao_media: 4.5,
      },
      {
        _id: consultoriaId_Manaus,
        nome_consultoria: "Amazon Capital",
        cnpj: "22.333.444/0001-55",
        data_fundacao: new Date("2013-04-14T00:00:00Z"),
        endereco: { rua: "Av. Djalma Batista", numero: "150", cidade: "Manaus", estado: "AM", cep: "69050-010", pais: "Brasil" },
        contato: { telefone: "92988887777", email: "contato@amazoncapital.com" },
        consultores_principais: ["Rafael Barbosa", "Joana Lima"],
        segmento_foco: ["Setor Industrial", "Logística"],
        nota_avaliacao_media: 4.4,
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
      {
        _id: tipoId_Cripto,
        nome_tipo: "Criptomoedas",
        descricao: "Ativos digitais como Bitcoin, Ethereum e outros tokens baseados em blockchain.",
        nivel_risco: 5,
        emissor_principal: "Blockchain",
        liquidez: "24/7",
      },
      {
        _id: tipoId_Multimercado,
        nome_tipo: "Fundos Multimercado",
        descricao: "Fundos que investem em diversas classes de ativos, nacionais e internacionais.",
        nivel_risco: 3,
        emissor_principal: "Gestoras de Fundos",
        liquidez: "Variável",
      },
      {
        _id: tipoId_AcoesInter,
        nome_tipo: "Ações Internacionais",
        descricao: "Participação no capital de empresas estrangeiras listadas em bolsas globais.",
        nivel_risco: 4,
        emissor_principal: "NYSE / NASDAQ / Outras",
        liquidez: "Diária",
      },
      {
        _id: tipoId_RendaFixaPre,
        nome_tipo: "Renda Fixa Pré-Fixada",
        descricao: "Títulos de dívida com taxa de juros definida no momento da aplicação.",
        nivel_risco: 1,
        emissor_principal: "Tesouro Nacional / Bancos",
        liquidez: "Variável",
      },
      {
        _id: tipoId_FIA,
        nome_tipo: "Fundos de Investimento em Ações (FIA)",
        descricao: "Fundos que aplicam majoritariamente em ações negociadas em bolsa.",
        nivel_risco: 4,
        emissor_principal: "Gestoras de Fundos",
        liquidez: "D+3",
      },
      {
        _id: tipoId_ETF,
        nome_tipo: "Exchange Traded Funds (ETFs)",
        descricao: "Fundos de índice negociados na bolsa, que replicam a performance de um índice.",
        nivel_risco: 3,
        emissor_principal: "B3",
        liquidez: "Diária",
      },
      {
        _id: tipoId_Commodities,
        nome_tipo: "Commodities",
        descricao: "Investimentos em ativos como ouro, petróleo, soja e outros produtos básicos.",
        nivel_risco: 4,
        emissor_principal: "Mercados Futuros / B3",
        liquidez: "Variável",
      },
      {
        _id: tipoId_Debentures,
        nome_tipo: "Debêntures",
        descricao: "Títulos de dívida emitidos por empresas para captação de recursos.",
        nivel_risco: 2,
        emissor_principal: "Empresas",
        liquidez: "Baixa",
      },
      {
        _id: tipoId_COE,
        nome_tipo: "Certificado de Operações Estruturadas (COE)",
        descricao: "Produto que combina renda fixa e derivativos para retornos personalizados.",
        nivel_risco: 3,
        emissor_principal: "Bancos",
        liquidez: "No vencimento",
      },
      {
        _id: tipoId_Previdencia,
        nome_tipo: "Previdência Privada",
        descricao: "Planos de aposentadoria com benefícios fiscais e gestão profissional.",
        nivel_risco: 2,
        emissor_principal: "Seguradoras / Bancos",
        liquidez: "Baixa",
      },
      {
        _id: tipoId_Cambio,
        nome_tipo: "Câmbio",
        descricao: "Compra e venda de moedas estrangeiras para proteção ou especulação.",
        nivel_risco: 4,
        emissor_principal: "Bancos / Corretoras",
        liquidez: "Imediata",
      },
      {
        _id: tipoId_FIDC,
        nome_tipo: "Fundos de Investimento em Direitos Creditórios (FIDC)",
        descricao: "Fundos que compram direitos creditórios originados por empresas.",
        nivel_risco: 3,
        emissor_principal: "Gestoras de Fundos",
        liquidez: "Baixa",
      },
    ]);


    console.log("Tipos de investimento inseridos com sucesso.");

    // ETAPA 4: INSERÇÃO DOS CLIENTES
    console.log("Etapa 4: Inserindo clientes...");
    
    await db.collection('clientes').insertMany([
      {
        nome_completo: "Ana Silva Santos de Paula",
        cpf: "123.456.789-10",
        data_nascimento: new Date("1985-03-15T00:00:00Z"),
        data_adesao: new Date("2020-03-10T00:00:00Z"),
        observacoes: "Cliente prefere contato por WhatsApp.",
        endereco: {
          rua: "Rua das Flores",
          numero: "123",
          cidade: "Recife",
          estado: "PE",
          cep: "50000-000",
          pais: "Brasil",
        },
        contato: { telefone: "81987654321", email: "ana.silva@email.com" },
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
      {
        nome_completo: "Bruno Carvalho",
        cpf: "321.654.987-00",
        data_nascimento: new Date("1990-07-20T00:00:00Z"),
        data_adesao: new Date("2021-05-15T00:00:00Z"),
        observacoes: "Cliente só atende celular pela noite.",
        endereco: {
          rua: "Av. Paulista",
          numero: "2000",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01310-200",
          pais: "Brasil",
        },
        contato: { telefone: "11988889999", email: "bruno.c@example.com" },
        perfil_investidor: "Agressivo",
        consultoria_id: consultoriaId_SP1,
        investimentos: [
          {
            tipo_investimento_id: tipoId_Cripto,
            valor_aplicado: 50000,
            data_aplicacao: new Date("2021-06-01T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_AcoesInter,
            valor_aplicado: 30000,
            data_aplicacao: new Date("2021-07-10T00:00:00Z"),
          },
        ],
      },
      {
        nome_completo: "Carla Menezes",
        cpf: "456.789.123-55",
        data_nascimento: new Date("1978-11-05T00:00:00Z"),
        data_adesao: new Date("2023-09-12T00:00:00Z"),
        endereco: {
          rua: "Rua da Aurora",
          numero: "780",
          cidade: "Recife",
          estado: "PE",
          cep: "50050-020",
          pais: "Brasil",
        },
        contato: { telefone: "81977778888", email: "carla.m@example.com" },
        perfil_investidor: "Conservador",
        consultoria_id: consultoriaId_Recife2,
        investimentos: [
          {
            tipo_investimento_id: tipoId_RendaFixaPre,
            valor_aplicado: 40000,
            data_aplicacao: new Date("2019-10-01T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_Previdencia,
            valor_aplicado: 15000,
            data_aplicacao: new Date("2020-01-15T00:00:00Z"),
          },
        ],
      },
      {
        nome_completo: "Diego Torres",
        cpf: "789.123.456-99",
        data_nascimento: new Date("1982-02-28T00:00:00Z"),
        data_adesao: new Date("2018-03-05T00:00:00Z"),
        endereco: {
          rua: "Av. Afonso Pena",
          numero: "1650",
          cidade: "Belo Horizonte",
          estado: "MG",
          cep: "30130-010",
          pais: "Brasil",
        },
        contato: { telefone: "31988885555", email: "diego.t@example.com" },
        perfil_investidor: "Moderado",
        consultoria_id: consultoriaId_BH,
        investimentos: [
          {
            tipo_investimento_id: tipoId_FII,
            valor_aplicado: 20000,
            data_aplicacao: new Date("2018-04-01T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_Debentures,
            valor_aplicado: 10000,
            data_aplicacao: new Date("2019-05-20T00:00:00Z"),
          },
        ],
      },
      {
      nome_completo: "Esdras Henrique Albino da Silva",
      cpf: "123.456.789-11",
      data_nascimento: new Date("1985-06-15T00:00:00Z"),
      data_adesao: new Date("2017-09-10T00:00:00Z"),
      endereco: {
        rua: "Rua das Palmeiras",
        numero: "250",
        cidade: "Recife",
        estado: "PE",
        cep: "50050-000",
        pais: "Brasil",
      },
      contato: { telefone: "81999998888", email: "esdras.henrique@example.com" },
      perfil_investidor: "Agressivo",
      consultoria_id: consultoriaId_Recife1,
      investimentos: [
        {
          tipo_investimento_id: tipoId_AcoesNacionais,
          valor_aplicado: 35000,
          data_aplicacao: new Date("2018-02-15T00:00:00Z"),
        },
        {
          tipo_investimento_id: tipoId_AcoesInter,
          valor_aplicado: 15000,
          data_aplicacao: new Date("2023-01-10T00:00:00Z"),
        },
      ],
    },
    {
      nome_completo: "Francisco Gabriel de Lima Brasil",
      cpf: "321.654.987-01",
      data_nascimento: new Date("1998-11-22T00:00:00Z"),
      data_adesao: new Date("2020-05-25T00:00:00Z"),
      endereco: {
        rua: "Av. Boa Viagem",
        numero: "1020",
        cidade: "Recife",
        estado: "PE",
        cep: "51020-000",
        pais: "Brasil",
      },
      contato: { telefone: "81988887777", email: "francisco.gabriel@example.com" },
      perfil_investidor: "Moderado",
      consultoria_id: consultoriaId_BH,
      investimentos: [
        {
          tipo_investimento_id: tipoId_FII,
          valor_aplicado: 22000,
          data_aplicacao: new Date("2020-07-15T00:00:00Z"),
        },
        {
          tipo_investimento_id: tipoId_Debentures,
          valor_aplicado: 8000,
          data_aplicacao: new Date("2021-09-05T00:00:00Z"),
        },
      ],
    },
    {
      nome_completo: "Guilherme de Oliveira Costa Campelo",
      cpf: "987.654.321-55",
      data_nascimento: new Date("1975-03-02T00:00:00Z"),
      data_adesao: new Date("2015-12-01T00:00:00Z"),
      endereco: {
        rua: "Rua XV de Novembro",
        numero: "89",
        cidade: "Curitiba",
        estado: "PR",
        cep: "80020-310",
        pais: "Brasil",
      },
      contato: { telefone: "41977776666", email: "guilherme.campelo@example.com" },
      perfil_investidor: "Conservador",
      consultoria_id: consultoriaId_Curitiba,
      investimentos: [
        {
          tipo_investimento_id: tipoId_RendaFixaPre,
          valor_aplicado: 50000,
          data_aplicacao: new Date("2016-04-10T00:00:00Z"),
        },
        {
          tipo_investimento_id: tipoId_AcoesNacionais,
          valor_aplicado: 12000,
          data_aplicacao: new Date("2022-03-18T00:00:00Z"),
        },
      ],
    },
    {
      nome_completo: "Nicolas Veiga Gomes Bezerra",
      cpf: "741.852.963-44",
      data_nascimento: new Date("2000-08-09T00:00:00Z"),
      data_adesao: new Date("2022-06-14T00:00:00Z"),
      endereco: {
        rua: "Rua Sete de Setembro",
        numero: "155",
        cidade: "Porto Alegre",
        estado: "RS",
        cep: "90010-190",
        pais: "Brasil",
      },
      contato: { telefone: "51966665555", email: "nicolas.bezerra@example.com" },
      perfil_investidor: "Agressivo",
      consultoria_id: consultoriaId_SP1,
      investimentos: [
        {
          tipo_investimento_id: tipoId_AcoesNacionais,
          valor_aplicado: 15000,
          data_aplicacao: new Date("2022-08-20T00:00:00Z"),
        },
        {
          tipo_investimento_id: tipoId_FII,
          valor_aplicado: 9000,
          data_aplicacao: new Date("2023-04-25T00:00:00Z"),
        },
      ],
    },
    {
      nome_completo: "Rinaldo da Silva Bento Junior",
      cpf: "159.753.486-22",
      data_nascimento: new Date("1992-04-30T00:00:00Z"),
      data_adesao: new Date("2023-10-02T00:00:00Z"),
      endereco: {
        rua: "Rua Getúlio Vargas",
        numero: "505",
        cidade: "Manaus",
        estado: "AM",
        cep: "69010-020",
        pais: "Brasil",
      },
      contato: { telefone: "92955554444", email: "rinaldo.bento@example.com" },
      perfil_investidor: "Moderado",
      consultoria_id: consultoriaId_Manaus,
      investimentos: [
        {
          tipo_investimento_id: tipoId_Debentures,
          valor_aplicado: 18000,
          data_aplicacao: new Date("2020-01-12T00:00:00Z"),
        },
        {
          tipo_investimento_id: tipoId_RendaFixaPos,
          valor_aplicado: 25000,
          data_aplicacao: new Date("2021-02-08T00:00:00Z"),
        },
      ],
    },
      {
        nome_completo: "Fernanda Alves",
        cpf: "987.654.321-77",
        data_nascimento: new Date("1995-09-18T00:00:00Z"),
        data_adesao: new Date("2022-01-10T00:00:00Z"),
        endereco: {
          rua: "Av. Tancredo Neves",
          numero: "3100",
          cidade: "Salvador",
          estado: "BA",
          cep: "41820-025",
          pais: "Brasil",
        },
        contato: { telefone: "71999991111", email: "fernanda.a@example.com" },
        perfil_investidor: "Agressivo",
        consultoria_id: consultoriaId_Salvador,
        investimentos: [
          {
            tipo_investimento_id: tipoId_ETF,
            valor_aplicado: 18000,
            data_aplicacao: new Date("2022-02-15T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_Commodities,
            valor_aplicado: 22000,
            data_aplicacao: new Date("2022-03-01T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_FIDC,
            valor_aplicado: 25000,
            data_aplicacao: new Date("2022-04-01T00:00:00Z"),
          },
        ],
      },
      {
        nome_completo: "Gustavo Pereira",
        cpf: "654.987.321-11",
        data_nascimento: new Date("1987-06-12T00:00:00Z"),
        data_adesao: new Date("2021-11-25T00:00:00Z"),
        endereco: {
          rua: "Rua XV de Novembro",
          numero: "120",
          cidade: "Curitiba",
          estado: "PR",
          cep: "80020-320",
          pais: "Brasil",
        },
        contato: { telefone: "41988886666", email: "gustavo.p@example.com" },
        perfil_investidor: "Moderado",
        consultoria_id: consultoriaId_Curitiba,
        investimentos: [
          {
            tipo_investimento_id: tipoId_FIDC,
            valor_aplicado: 30000,
            data_aplicacao: new Date("2021-12-01T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_COE,
            valor_aplicado: 15000,
            data_aplicacao: new Date("2022-01-05T00:00:00Z"),
          },
        ],
      },
      {
        nome_completo: "Maria Helena Martins de Andrade",
        cpf: "852.963.741-00",
        data_nascimento: new Date("1992-04-09T00:00:00Z"),
        data_adesao: new Date("2020-08-18T00:00:00Z"),
        endereco: {
          rua: "Av. Beira Mar Norte",
          numero: "550",
          cidade: "Florianópolis",
          estado: "SC",
          cep: "88015-705",
          pais: "Brasil",
        },
        contato: { telefone: "48999992222", email: "helena.m@example.com" },
        perfil_investidor: "Agressivo",
        consultoria_id: consultoriaId_Floripa,
        investimentos: [
          {
            tipo_investimento_id: tipoId_Multimercado,
            valor_aplicado: 27000,
            data_aplicacao: new Date("2020-09-01T00:00:00Z"),
          },
          {
            tipo_investimento_id: tipoId_AcoesInter,
            valor_aplicado: 35000,
            data_aplicacao: new Date("2020-09-15T00:00:00Z"),
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
