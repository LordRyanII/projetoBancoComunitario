import axios from 'axios';

const getDados = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token não encontrado.');
  }

  try {
    const response = await axios.get('https://api-bancocomunitario.onrender.com/data/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    throw error;
  }
};

export default getDados;