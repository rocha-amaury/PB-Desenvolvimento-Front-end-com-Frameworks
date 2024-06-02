export function convertDataAntigo(data) {
  console.log(data);
  
  const ids = Object.keys(data);
  let items = Object.values(data);
  return items.map((item, index) => {
    return {
      id: ids[index],
      ...item,
    };
  });
}

export function convertData(data) {
  const ids = Object.keys(data);
  const combinedArray = ids.map(id => {
    const item = data[id]; 
    return { key: id, ...item };
  });
  // console.log(combinedArray);
  return combinedArray; 
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