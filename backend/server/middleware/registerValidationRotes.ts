import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import httpstatusCode from "../configs/httpstatusCode";
import UserModel from "../database/models/SchemmaDatabaseUser";

export interface Endereco {
  cep: string | null;
  logradouro: string;
  rua: string;
  numero: number;
  bairro: string;
}

const enderecoSchema = z.object({
  cep: z.string().nullable(),
  logradouro: z.string(),
  rua: z.string(),
  numero: z.string(),
  bairro: z.string(),
});
const userCadastroSchema = z.object({
  nome: z.string().min(1, { message: "O campo nome não pode ser vazio." }),
  sobrenome: z
    .string()
    .min(1, { message: "O campo sobrenome não pode ser vazio." }),
  data: z.string(), // Pode ser alterado para z.date() se a data de nascimento for esperada como um objeto Date
  genero: z.string(),
  etnia: z.string(),
  celular: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: "O número de celular deve ter exatamente 11 dígitos.",
  }),
  senha: z
    .string()
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
      message:
        "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.",
    }),
  endereco: enderecoSchema,
  whatsapp: z.boolean(),
  empregado: z.boolean(),
  empresario: z.boolean(),
});

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userCadastroSchema.parseAsync(req.body);
    const { celular } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await UserModel.findOne({ celular }).exec();
    if (existingUser) {
      const erroValidacao = {
        status: 'Nok',
        mensagem: "Usuário já cadastrado.",
      };
      return res.status(httpstatusCode.badRequest).json(erroValidacao);
    }

    // Continue apenas se o usuário não existir
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const erroValidacao: any = {
        status: 'Nok',
        mensagem: error.errors
          .map((e) => {
            const path = e.path.join(".");
            return `${path}: ${e.message}`;
          })
          .join(", "),
      };
      return res.status(httpstatusCode.badRequest).json(erroValidacao);
    } else {
      return res
        .status(httpstatusCode.internalServerError)
        .json({ status: "NOK", mensagem: "Erro interno de servidor" });
    }
  }
};
