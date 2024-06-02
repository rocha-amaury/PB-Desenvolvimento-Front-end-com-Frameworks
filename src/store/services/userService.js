import { convertData } from "../../utils.js";

const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

// export const getUsers = async () => {
//   const response = await fetch(`${baseUrl}/users.json`);
//   const data = await response.json();
//   return Object.values(data);
// };

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users.json`);
  const data = await response.json();
  let convertedData = convertData(data);  
  return convertedData;
};