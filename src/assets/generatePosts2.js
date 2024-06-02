// node src/assets/generatePosts2.js

import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fetchUsers } from "../utils.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

const users = await fetchUsers(baseUrl);
// console.log(users);

function generateComments() {
  const numComments = faker.number.int({ min: 0, max: 5 });
  let comments = [];

  if (numComments === 0) {
    comments = [""];
  } else {
    for (let i = 0; i < numComments; i++) {
      const randomUser = faker.helpers.arrayElement(users);
      comments.push({
        commentId: faker.string.uuid(),
        userKey: randomUser.key,
        userId: randomUser.userId,
        username: randomUser.username,
        text: faker.lorem.sentences(),
        createdAt: new Date(),        
      });
    }
  }

  return comments;
}

// Função para gerar um post aleatório
function createRandomPost() {
  const randomUser = users[Math.floor(Math.random() * users.length)];

  const post = {
    // postId: faker.string.uuid(),
    // userId: randomUser.userId,
    // titile: faker.lorem.sentence(),
    // text: faker.lorem.paragraphs(),
    // likes: faker.number.int({ min: 0, max: 1000 }),
    // dislikes: faker.number.int({ min: 0, max: 1000 }),
    // comments: generateComments(), //[""],
    // createdAt: new Date(),

    postId: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    date: new Date().toISOString(),
    userKey: randomUser.key,
    userId: randomUser.userId,
    username: randomUser.username,
    keywords: faker.lorem.words(3).split(" "),
    comments: generateComments(), //[""],
    likes: faker.number.int({ min: 0, max: 1000 }),
    dislikes: faker.number.int({ min: 0, max: 1000 }),
  };
  return post;
}

// Gerar um array de posts aleatórios
const randomPosts = Array.from({ length: 10 }, createRandomPost);

const keyedPosts = randomPosts.reduce((acc, post, index) => {
  acc[`post${index + 1}`] = post;
  return acc;
}, {});

// Salvar os posts gerados em um arquivo JSON
const filePath = path.join(__dirname, "postsTest.json");
fs.writeFileSync(filePath, JSON.stringify(keyedPosts, null, 2), "utf-8");

console.log("Posts gerados e salvos em posts.json");
