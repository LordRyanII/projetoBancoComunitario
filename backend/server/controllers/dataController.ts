import { Request, Response } from "express";
import httpstatusCode from "../configs/httpstatusCode";

export const returnUserData = (req: Request, res: Response) => {
    const { senha, _id, token, ...userDataWithoutPassword } = req.user?.toObject() || {};

    return res.status(httpstatusCode.ok).json({
         status: 'Ok', data: userDataWithoutPassword 
    });
};
