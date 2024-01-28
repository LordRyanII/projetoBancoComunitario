import { Router, json, urlencoded, Request, Response, NextFunction } from "express";
import { returnUserData } from "../controllers/dataController";
import { authenticateToken } from "../middleware/tokenUsers";
import cors from 'cors';

const admRouter = Router();

admRouter.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

admRouter.use(cors());

admRouter.use(json());
admRouter.use(urlencoded({ extended: true }));

admRouter.get('/adm/userdata', authenticateToken, returnUserData);



export default admRouter