import { registroRouter, loginRouter, transaccionRouter, prestamoRouter, transferenciaRouter, traerBitacora, traersaldousuario } from "./servicioBancoRouter.js";
import { Router } from "express";

const router = Router();

router.post("/registro", registroRouter);
router.post("/login", loginRouter);
router.post("/transaccion", transaccionRouter);
router.post("/prestamo", prestamoRouter);
router.post("/transferencia", transferenciaRouter);

router.get("/obtusuario/:id", traersaldousuario);
router.get('/obtbitacora/:id_cliente', traerBitacora);





export default router;