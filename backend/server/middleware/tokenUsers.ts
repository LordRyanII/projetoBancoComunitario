import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
import UserModel, {UserDocument} from '../database/models/SchemmaDatabaseUser';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ status: 'Unauthorized', message: 'Token não fornecido' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.secretToken);

    // Adquira o usuário do banco de dados usando o ID decodificado
    const user: UserDocument | null = await UserModel.findOne({ _id: decoded.userId }).exec();

    if (!user) {
      return res.status(401).json({ status: 'Unauthorized', message: 'Usuário não encontrado' });
    }

    // Adicione os dados do usuário ao objeto req para uso posterior nas rotas
    req.user = user;

    // Continue para a próxima função de middleware ou manipulador de rota
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(403).json({ status: 'Forbidden', message: 'Token inválido' });
  }
};
