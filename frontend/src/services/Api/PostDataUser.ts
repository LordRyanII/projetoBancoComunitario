import axios, { AxiosResponse } from "axios";

const urlBase = "https://api-bancocomunitario.onrender.com/cadastroUser";

interface Endereco {
  cep: string;
  logradouro: string;
  rua: string;
  numero: string;
  bairro: string;
}

interface Usuario {
  nome: string;
  sobrenome: string;
  data: string;
  genero: string;
  etnia: string;
  celular: string;
  senha: string;
  endereco: Endereco;
  whatsapp: boolean;
  empregado: boolean;
  empresario: boolean;
}

interface dadosRequest {
  Status: string;
  mensagem: string | undefined;
}

export const registerUser = async (
  dadosUser: Usuario
): Promise<any> => {
  try {
    const response: AxiosResponse<dadosRequest> = await axios.post(
      urlBase,
      dadosUser
    );
    return response;
  } catch (error: any) {
    console.error(
      "Erro ao cadastrar o usuário:",
      error.response?.data?.mensagem
    );
    throw (
      error.response?.data || {
        status: "Error",
        mensagem: "Erro desconhecido ao cadastrar o usuário",
      }
    );
  }
};
