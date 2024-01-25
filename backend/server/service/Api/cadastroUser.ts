const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserModel from "../../database/models/SchemmaDatabaseUser";

dotenv.config();

interface UserCadastro {
  nome: string;
  sobrenome: string;
  data: number;
  genero: string;
  etnia: string;
  celular: number;
  senha: string;
  endereco: {
    cep: string | null;
    logradouro: string;
    rua: string;
    numero: string;
    bairro: string;
  };
  whatsapp: boolean;

}

const addLeadingZero = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;

const formatarData = (data: Date): string => {
  const dia = addLeadingZero(data.getDate());
  const mes = addLeadingZero(data.getMonth() + 1);
  const ano = data.getFullYear();
  const horas = addLeadingZero(data.getHours());
  const minutos = addLeadingZero(data.getMinutes());
  const segundos = addLeadingZero(data.getSeconds());

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
};

const cadastroUser = async (dadosForm: UserCadastro): Promise<string> => {
  try {
    // Gera um token aleatório com validade curta
    const user = new UserModel();
    const tokenAuthorized = jwt.sign({ userId: user._id }, process.env.secretToken, {
      expiresIn: '7d',
    });
    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(dadosForm.senha, 10);

    // Data cadastro
    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);

    // Adiciona campos ao objeto de dados
    const userDataWithHashedPassword = {
      ...dadosForm,
      senha: hashedPassword,
      token: tokenAuthorized,
      historico: [
        { dataHistorico: dataFormatada, descricao: 'Entrada', valor: 0 }
      ],
      dataCadastro: dataFormatada,
    };

    // Cria uma instância do modelo Mongoose e salva no banco de dados
    const newUser = new UserModel(userDataWithHashedPassword);
    await newUser.save();

    return "Usuário cadastrado com sucesso!";
  } catch (error: any) {
    return (
      "Erro durante o cadastro do usuário: " +
      (error.message || "Erro desconhecido")
    );
  }
};

export default cadastroUser;
