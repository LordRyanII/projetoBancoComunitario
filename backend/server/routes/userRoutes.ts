import { Router, json, urlencoded, Request, Response, NextFunction } from "express";
import { loginUser, cadastrarUsuario } from "../controllers/loginController";
import { validationRoteLogin } from "../middleware/loginValidationRotes";
import { registerValidation } from "../middleware/registerValidationRotes";
import { authenticateToken } from "../middleware/tokenUsers";
import { returnUserData } from "../controllers/dataController";
const cors = require('cors');

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.use(cors());

router.use(json());
router.use(urlencoded({ extended: true }));

router.post("/loginUsers", validationRoteLogin, loginUser);
router.post("/cadastroUser", registerValidation, cadastrarUsuario);

router.get("/data/user", authenticateToken, returnUserData);

export default router;
