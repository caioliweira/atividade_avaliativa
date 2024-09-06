import { response } from "express";
import jwt from "jsonwebtoken";

const createUserToken = async (usuario, response) => {
    //criar o token 
    const token = jwt.sign(
        {
            nome: usuario.nome,
            id: usuario.usuarios.id
        },
        "SENHASUPERSEGURA" //senha de criptografia
    )
    // Retornar o token
    response.status(200).json({
        message:"Você está autenticado",
        token: token,
        usuarioId: usuario.usuarios.id,
    });
};

export default createUserToken;