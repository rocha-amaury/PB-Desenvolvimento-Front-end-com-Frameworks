
export async function fetchData(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados.');
    }
    const data = await response.json(); 
    return data; 
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error; 
  }
}
