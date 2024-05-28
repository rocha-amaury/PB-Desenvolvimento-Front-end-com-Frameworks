function convertData(data) {
  const ids = Object.keys(data);
  let users = Object.values(data);
  return users.map((user, index) => {
    return {
      id: ids[index],
      ...user,
    };
  });
}

export async function fetchUsers(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/users.json`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    const usersData = await response.json();
    return convertData(usersData);
  } catch (error) {
    throw new Error('Erro ao processar dados dos usuários');
  }
}