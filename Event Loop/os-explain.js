import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "evetLoop.txt");

const data = fs.readFileSync(filePath, "utf8");

console.log(data);