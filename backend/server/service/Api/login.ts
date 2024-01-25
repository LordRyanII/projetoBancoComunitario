import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
import UserModel, {
  UserDocument,
} from "../../database/models/SchemmaDatabaseUser";


interface LoginRequestBody {
  celular: string;
  senha: string;
};

const generateAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.secretToken, {
    expiresIn: '7d', // Expira em 7 dias
  });
};

const loginHandler = async (bodyRequest: any): Promise<any> => {
  try {
    const { celular, senha }: LoginRequestBody = bodyRequest;

    const user: UserDocument | null = await UserModel.findOne({ celular });

    const passwordMatch = user != null ? await bcrypt.compare(senha, user.senha) : null;

    if (!passwordMatch) {
      const mensagem = {
        status: null,
        mensagem: 'Credenciais inválidas. Por favor, verifique novamente.',
      };
      return mensagem;
    }

    // Se o login for bem-sucedido, gere um novo token de acesso
    const newAccessToken = generateAccessToken(user?._id || 0);

    // Adicione o token gerado ao objeto de retorno
    const userObject = user != null ? user.toObject() : null;
    if (userObject) {
      userObject.token = newAccessToken;
    }

    // Remova as propriedades desnecessárias (se necessário)
    delete userObject.nome;
    delete userObject.sobrenome;
    delete userObject.idade;
    delete userObject.genero;
    delete userObject.etnia;
    delete userObject.celular;
    delete userObject.moeda;
    delete userObject.senha;
    delete userObject.endereco;
    delete userObject._id;
    delete userObject.data;
    delete userObject.historico;
    delete userObject.whatsapp;
    delete userObject.dataCadastro;
    delete userObject.empregado;
    delete userObject.empresario;

    return userObject;
  } catch (error) {
    console.error('Erro durante o login:', error);
    return null;
  }
};

export default loginHandler;


/*
{
    "nome": "Renata",
    "sobrenome": "Alves da Luz",
    "data": "13032003",
    "genero": "Feminino",
    "etnia": "Branca",
    "celular": "51997233803",
    "senha": "Usuarior2002*",
    "endereco": {
        "cep":"92990000",
        "logradouro":"Casa",
        "rua":"Nova Petrópolis",
        "numero": "1139",
        "bairro": "Centro"
    },
    "whatsapp": true,
    "empregado": true,
    "empresario":true
}

*/