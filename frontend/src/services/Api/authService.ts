import axios, { AxiosRequestConfig, AxiosResponseHeaders } from "axios";
import { HttpStatusCode } from "axios";

const urlBase: string = "http://localhost:3001/loginUsers";

interface AxiosRequestData<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  reques?: any;
}

interface DadosAPI {
  Status: HttpStatusCode;
  Descricao: string;
  token?: any; // Token é opcional em caso de sucesso
}

interface DadosRequest {
  celular: string;
  senha: string;
}

export const loginAuth = async (dados: DadosRequest): Promise<DadosAPI> => {
    try {
      // Garantir que os campos obrigatórios estejam preenchidos
      if (!dados.celular || !dados.senha) {
        throw new Error("Campos 'celular' e 'senha' são obrigatórios.");
      }
  
      const response: AxiosRequestData<DadosAPI> = await axios.post(
        urlBase,
        dados
      );
  
      // Se a resposta foi bem-sucedida, armazenar o token no localStorage
      if (response.data.token.token) {
        localStorage.setItem('token', response.data.token.token as string);
      }
  
      return response.data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error; // Pode ser tratado de maneira diferente, dependendo dos requisitos.
    }
  };