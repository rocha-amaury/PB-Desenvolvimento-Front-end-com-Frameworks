// node src/assets/generateFileFireBase.js
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Caminhos dos arquivos JSON
const usersPath = path.join(__dirname, "usersTest.json");
const postsPath = path.join(__dirname, "postsTest.json");
const outputPath = path.join(__dirname, "combinedData.json");

// Ler e analisar os arquivos JSON
const usersData = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
const postsData = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

// Combinar os dados dos dois arquivos
const combinedData = {
  users: usersData,
  posts: postsData,
};

// Salvar o resultado em um novo arquivo JSON
const filePath = path.join(__dirname, "combinedData.json");
fs.writeFileSync(filePath, JSON.stringify(combinedData, null, 2));

console.log("Arquivos combinados e salvos em combinedData.json");
