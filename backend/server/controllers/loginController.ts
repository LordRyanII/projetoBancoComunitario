import { Request, Response } from "express";
import httpstatusCode from "../configs/httpstatusCode";
import loginHandler from "../service/Api/login";
import cadastroUserFunction from '../service/Api/cadastroUser'; // Renomeei para evitar conflito de nomes

export const loginUser = async (req: Request, res: Response) => {
    try {
        const loginUserResult = await loginHandler(req.body);
        if (loginUserResult === null || loginUserResult.status === null) {
            const mensagem = loginUserResult.status === null? loginUserResult.mensagem : loginUserResult;
            return res.status(httpstatusCode.badRequest).json({ Status: 'Nok', mensagem: mensagem });
        }
        return res.status(httpstatusCode.ok).json({ Status: 'OK', "Descricao": "Login bem sucedido", token: loginUserResult });

    } catch (error) {
        return res.status(httpstatusCode.internalServerError).json({ Status: 'NOK', Mensagem: 'Erro interno de servidor' });
    }
};

export const cadastrarUsuario = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const userCadastrado = await cadastroUserFunction(req.body);
        if (userCadastrado === null) {
            return res.status(httpstatusCode.badRequest).json({
                status: 'Nok',
                mensagem: "Falha ao cadastrar usuário",
                descricao: 'Dados existentes no banco de dados'
            });
        }

        return res.status(httpstatusCode.created).json({
            Status: 'Ok',
            mensagem: userCadastrado
        });

    } catch (error) {
        return res.status(httpstatusCode.internalServerError).json({ Status: 'NOK', Mensagem: 'Erro interno de servidor' });
    }
}
