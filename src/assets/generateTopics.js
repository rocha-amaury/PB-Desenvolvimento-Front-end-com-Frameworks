// node src/assets/generateTopics.js

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


// Função para gerar um post aleatório
function createRandomTopic() {
  const randomUser = users[Math.floor(Math.random() * users.length)];

  const post = {
    postType: "post",
    postId: faker.string.uuid(),
    parentPostId: null,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    date: new Date().toISOString(),
    userKey: randomUser.key,
    userId: randomUser.userId,
    username: randomUser.username,
    keywords: faker.lorem.words(3).split(" "),
    likes: faker.number.int({ min: 0, max: 1000 }),
    dislikes: faker.number.int({ min: 0, max: 1000 }),
    reports: 0,
  };
  return post;
}

function generateComments(posts) {
  let newPosts = [];

  posts.forEach((post) => {
    const numComments = faker.number.int({ min: 0, max: 5 });
    
    if (numComments > 0) {
      for (let i = 0; i < numComments; i++) {
        const randomUser = faker.helpers.arrayElement(users);
        const newPost = {
          postType: "comment",
          postId: faker.string.uuid(),
          parentPostId: post.postId,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          date: new Date().toISOString(),
          userKey: randomUser.key,
          userId: randomUser.userId,
          username: randomUser.username,
          keywords: faker.lorem.words(3).split(" "),
          likes: faker.number.int({ min: 0, max: 1000 }),
          dislikes: faker.number.int({ min: 0, max: 1000 }),
          reports: 0,
        };
        newPosts.push(newPost);
      }
    }
  });

  // posts.push(newPosts);

  return newPosts;
}

// Gerar um array de posts aleatórios
const randomPosts = Array.from({ length: 10 }, createRandomTopic);
// consol.log(randomPosts);

// Gerar um array de comentários para randomPosts
const postsComments = generateComments(randomPosts);
// console.log(postsComments);

// Gerar um array de comentários para os comentários de randomPosts
const commentsOfComments = generateComments(postsComments);
// console.log(commentsOfComments);

const resPosts = [...randomPosts, ...postsComments, ...commentsOfComments];
// console.log(resPosts);

const keyedPosts = resPosts.reduce((acc, post, index) => {
  acc[`post${index + 1}`] = post;
  return acc;
}, {});

// Salvar os posts gerados em um arquivo JSON
const filePath = path.join(__dirname, "postsTest.json");
fs.writeFileSync(filePath, JSON.stringify(keyedPosts, null, 2), "utf-8");

console.log("Posts gerados e salvos em posts.json");
