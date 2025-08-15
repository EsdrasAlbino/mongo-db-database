import insercao from "./InsercaoTotal.js";
import checkListProject from "./Consultas.js";

const executarConsultas = async () => {
  try {
    console.log("=== INICIANDO SISTEMA DE CONSULTORIAS FINANCEIRAS ===\n");
    
    console.log("1. Executando inserção de dados...");
    await insercao();
    
    console.log("\n2. Executando consultas do projeto...");
    await checkListProject();
    
    console.log("\n=== SISTEMA FINALIZADO COM SUCESSO ===");
  } catch (error) {
    console.error("Erro durante a execução:", error);
    process.exit(1);
  }
};

executarConsultas();
