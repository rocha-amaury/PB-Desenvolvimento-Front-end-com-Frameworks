// node src/assets/generatePosts.js

import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Array de usuários fornecido
const users = [
  {
    userId: "451e3ce7-edc7-4940-b73b-4f5ff53cc62b",
    username: "Laurine_Hartmann98",
    name: "Mary Oberbrunner",
    email: "Shania.Pfannerstill9@gmail.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1171.jpg",
    password: "yDN7d5jAfpoAOm3",
    points: 561,
    badges: ["expert", "beginner"],
  },
  {
    userId: "50827a2f-8d66-4b90-9495-ae1b53277ee4",
    username: "Neha93",
    name: "Mr. Jermaine Conroy",
    email: "Carmela84@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/37565234",
    password: "87lG6wUjyZ93lFe",
    points: 790,
    badges: ["beginner", "advanced", "intermediate", "expert"],
  },
  {
    userId: "7e736751-866b-4bcb-b485-694c05af7ec1",
    username: "Maximillian_OReilly94",
    name: "Kristina Trantow",
    email: "Orin9@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/2117551",
    password: "F6U_RkJOjvlEFAz",
    points: 50,
    badges: ["beginner", "intermediate"],
  },
  {
    userId: "2b705731-04e2-4ced-aa9c-2c009b32c8b4",
    username: "Autumn_Reynolds",
    name: "Vickie Bernier",
    email: "Maxine64@hotmail.com",
    avatar: "https://avatars.githubusercontent.com/u/67696618",
    password: "DDby2nEHVsM_f6I",
    points: 812,
    badges: ["beginner"],
  },
  {
    userId: "cd76d468-45fb-4023-bfbc-60ae45742ccb",
    username: "Zechariah56",
    name: "Alberta Wilkinson",
    email: "Janessa_McDermott@yahoo.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/505.jpg",
    password: "y0wjeVghpS8VTC8",
    points: 699,
    badges: ["intermediate", "advanced", "expert", "beginner"],
  },
  {
    userId: "f67246a7-970e-4063-8e37-dea8c1677a6f",
    username: "Darrick_Lowe",
    name: "Priscilla Erdman-Ratke",
    email: "Janae_Ernser@yahoo.com",
    avatar: "https://avatars.githubusercontent.com/u/29096308",
    password: "EJvn5SYimM6j31d",
    points: 899,
    badges: ["intermediate", "beginner", "expert"],
  },
  {
    userId: "3fb99649-54ce-4166-9398-666ba4e471be",
    username: "Koby_Graham36",
    name: "Billie Schaden IV",
    email: "Ross_Greenholt68@hotmail.com",
    avatar: "https://avatars.githubusercontent.com/u/76384386",
    password: "02eB_ZnAMxrc9nv",
    points: 106,
    badges: ["intermediate"],
  },
  {
    userId: "0eb64bd6-a048-4508-9b22-632f74161303",
    username: "Chelsie_Stracke",
    name: "Santos O'Connell",
    email: "Sylvester.Bins32@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/13620806",
    password: "DKDuEsWhwjY2S8M",
    points: 228,
    badges: ["intermediate", "expert", "advanced", "beginner"],
  },
  {
    userId: "7f984e4c-eeaa-401d-87c7-c0a88c906ac9",
    username: "Kody.Lang43",
    name: "Kari Hauck",
    email: "Tracy.Kertzmann@yahoo.com",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1139.jpg",
    password: "3l736uumAf59IUX",
    points: 245,
    badges: ["advanced", "expert", "beginner", "intermediate"],
  },
  {
    userId: "621f31eb-1d84-4b56-b575-bacf59ed67c7",
    username: "Michaela_Cremin1",
    name: "Harry Koch",
    email: "Madelynn_Price@yahoo.com",
    avatar: "https://avatars.githubusercontent.com/u/29870647",
    password: "7Sk4_cBTL1ToyUA",
    points: 956,
    badges: ["beginner", "intermediate"],
  },
];

function generateComments() {
  const numComments = faker.number.int({ min: 0, max: 5 });
  let comments = [];

  if (numComments === 0) {
    comments = [""];
  } else {
    for (let i = 0; i < numComments; i++) {
      comments.push({
        commentId: faker.string.uuid(),
        userId: faker.helpers.arrayElement(users).userId,
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
    postId: faker.string.uuid(),
    userId: randomUser.userId,
    titile: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(),
    likes: faker.number.int({ min: 0, max: 1000 }),
    dislikes: faker.number.int({ min: 0, max: 1000 }),
    comments: generateComments(), //[""],
    createdAt: new Date(),
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
