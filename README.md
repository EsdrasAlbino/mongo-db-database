# Sistema de Consultorias Financeiras - MongoDB

Este projeto implementa um sistema de gerenciamento de consultorias financeiras utilizando MongoDB como banco de dados. O sistema permite inserir dados de consultorias, tipos de investimento e clientes, além de executar consultas complexas para análise dos dados.

## 📋 Funcionalidades

- **Inserção de dados**: Criação e população automática do banco de dados com dados de exemplo
- **Consultas avançadas**: Implementação de consultas MongoDB utilizando aggregation pipeline, filtros e operadores
- **Relatórios**: Geração de relatórios analíticos sobre clientes e investimentos
- **Limpeza de dados**: Sistema de limpeza automática das coleções

## 🗂️ Estrutura do Projeto

```
mongo-db/
├── index.js              # Arquivo principal - orquestra a execução
├── InsercaoTotal.js       # Script de inserção de dados no banco
├── ChecklistProjeto.js    # Script de consultas e operações MongoDB
├── package.json           # Dependências e configurações do projeto
├── tsconfig.json          # Configurações TypeScript
└── README.md             # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **MongoDB** - Banco de dados NoSQL
- **MongoDB Driver** - Driver oficial do MongoDB para Node.js
- **TypeScript** - Superset JavaScript com tipagem estática

## 📊 Estrutura do Banco de Dados

O banco de dados `projeto_financeiro` contém três coleções principais:

### Coleção `consultorias`
- `_id`: ObjectId único
- `nome`: Nome da consultoria
- `endereco`: Endereço completo
- `contato`: Informações de contato
- `tipos_investimento_ids`: Array de referências aos tipos de investimento

### Coleção `tipos_investimento`
- `_id`: ObjectId único
- `nome_tipo`: Nome do tipo de investimento
- `descricao`: Descrição detalhada
- `nivel_risco`: Nível de risco (Baixo, Médio, Alto)
- `consultoria_id`: Referência à consultoria

### Coleção `clientes`
- `_id`: ObjectId único
- `nome_completo`: Nome completo do cliente
- `email`: Email de contato
- `perfil_investidor`: Perfil (Conservador, Moderado, Arrojado)
- `data_adesao`: Data de adesão ao sistema
- `consultoria_id`: Referência à consultoria
- `investimentos`: Array de investimentos do cliente
- `observacoes`: Observações adicionais (opcional)

## 🚀 Como Executar

### Pré-requisitos

1. **MongoDB** instalado e rodando na porta padrão (27017)
2. **Node.js** (versão 14 ou superior)
3. **npm** ou **yarn**

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd mongo-db
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o MongoDB (se não estiver rodando):


### Execução

Execute o sistema completo:
```bash
node index.js
```

O sistema executará automaticamente:
1. **Inserção de dados** - Popula o banco com dados de exemplo
2. **Consultas do projeto** - Executa todas as consultas programadas

### Execução Individual

Para executar apenas a inserção de dados:
```bash
node -e "import('./InsercaoTotal.js').then(m => m.default())"
```

Para executar apenas as consultas:
```bash
node -e "import('./ChecklistProjeto.js').then(m => m.default())"
```

## 🔍 Consultas Implementadas

O sistema demonstra o uso de diversos operadores e funcionalidades do MongoDB:

1. **USE** - Conexão com banco de dados
2. **FIND** - Busca de documentos
3. **SIZE** - Filtro por tamanho de array
4. **AGGREGATE** - Pipeline de agregação
5. **MATCH** - Filtros em agregação
6. **GTE** - Comparação maior ou igual
7. **PROJECT** - Projeção de campos
8. **GROUP** - Agrupamento de dados
9. **SUM** - Somatória de valores
10. **MAX** - Valor máximo
11. **AVG** - Média de valores
12. **COUNT** - Contagem de documentos
13. **EXISTS** - Verificação de existência de campo
14. **SORT** - Ordenação de resultados
15. **LIMIT** - Limitação de resultados
16. **$WHERE** - Consultas com JavaScript

## 📈 Exemplos de Consultas

### Buscar clientes com perfil Arrojado
```javascript
db.clientes.find({ perfil_investidor: "Arrojado" })
```

### Relatório agregado por perfil de investidor
```javascript
db.clientes.aggregate([
  {
    $match: {
      data_adesao: { $gte: new Date("2022-01-01") },
      perfil_investidor: { $in: ["Moderado", "Arrojado"] }
    }
  },
  { $unwind: "$investimentos" },
  {
    $group: {
      _id: "$perfil_investidor",
      valor_total_investido: { $sum: "$investimentos.valor_aplicado" },
      maior_investimento: { $max: "$investimentos.valor_aplicado" },
      media_investimento: { $avg: "$investimentos.valor_aplicado" }
    }
  }
])
```

## 🧪 Dados de Exemplo

O sistema inclui dados de exemplo para:
- 5 consultorias em diferentes cidades (Recife, São Paulo, Belo Horizonte, Porto Alegre)
- 15 tipos de investimento diversos (CDB, Ações, Fundos, etc.)
- 20 clientes com diferentes perfis e investimentos
# mongo-db-database
