// node src/assets/generateUsers.js
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      points: faker.number.int({ min: 0, max: 1000 }),
      badges: faker.helpers.arrayElements(
        ["beginner", "intermediate", "advanced", "expert"],
        faker.number.int({ min: 1, max: 4 }),
      ),
    };
    users.push(user);
  }
  return users;
};

const users = generateUsers(10);

fs.writeFileSync(
  path.join(__dirname, "users.json"),
  JSON.stringify(users, null, 2),
  "utf-8",
);

const keyedUsers = users.reduce((acc, user, index) => {
  acc[`user${index + 1}`] = user;
  return acc;
}, {});

// Salva os usuários em um arquivo JSON
let filePath = path.join(__dirname, "usersTest.json");
fs.writeFileSync(filePath, JSON.stringify(keyedUsers, null, 2), "utf-8");

console.log("Arquivo users.json criado com sucesso!");
