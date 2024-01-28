import { Router, json, urlencoded, Request, Response, NextFunction } from "express";
import { loginUser, cadastrarUsuario } from "../controllers/loginController";
import { validationRoteLogin } from "../middleware/loginValidationRotes";
import { registerValidation } from "../middleware/registerValidationRotes";
import { authenticateToken } from "../middleware/tokenUsers";
import { returnUserData } from "../controllers/dataController";
const cors = require('cors');

const useRouter = Router();

useRouter.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

useRouter.use(cors());

useRouter.use(json());
useRouter.use(urlencoded({ extended: true }));

useRouter.post("/loginUsers", validationRoteLogin, loginUser);
useRouter.post("/cadastroUser", registerValidation, cadastrarUsuario);

useRouter.get("/data/user", authenticateToken, returnUserData);

export default useRouter;
