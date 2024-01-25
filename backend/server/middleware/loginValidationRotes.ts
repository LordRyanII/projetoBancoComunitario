import { z, ZodError } from "zod";
import { Response, Request, NextFunction, response } from "express";
import httpstatusCode from "../configs/httpstatusCode";

interface LoginRequestBody {
  celular: string;
  senha: string;
}

interface errors {
  status: null | undefined;
  mensagem: string;
}
const loginUserSchema = z.object({
  celular: z.string().min(11, {
    message: "O número de celular deve ter no máximo 11 dígitos.",
  }),
  senha: z.string().refine((value) => value.length >= 8, {
    message: "A senha deve ter no mínimo 8 caracteres.",
  }),
});


export const validationRoteLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result:LoginRequestBody = await loginUserSchema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const erroValidacao: errors = {
        status: null,
        mensagem: error.errors.map((e) => e.message).join(", "),
      };
      return res.status(httpstatusCode.badRequest).json(erroValidacao);
    }
  }
};
