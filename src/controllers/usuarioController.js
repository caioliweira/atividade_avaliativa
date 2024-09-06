import conn from "../config/conn.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { request, response } from "express"

export const register = async (request, response) => {
    const { nome, email, telefone, senha, confirmsenha } = request.body

    if (!nome) {
        response.status(400).json({ message: "nome é obrigatório" })
        return
    }
    if (!email) {
        response.status(400).json({ message: "email é obrigatório" })
        return
    }
    if (!telefone) {
        response.status(400).json({ message: "telefone é obrigatório" })
        return
    }
    if (!senha) {
        response.status(400).json({ message: "senha é obrigatório" })
        return
    }
    if (!confirmsenha) {
        response.status(400).json({ message: "confirma é obrigatório" })
        return
    }
    //----------------------------------------------
    if (!email.includes("@")) {
        response.status(409).json({ message: "@ é obrigatório" })
        return
    }

    if (senha != confirmsenha) {
        response.status(409).json({ message: "ser igual é obrigatório" })
        return
    }

    const checkSql = /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
    const checkSqlData = ["email", email]
    conn.query(checkSql, checkSqlData, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao buscar email para cadastro" })
            return
        }

        //2º
        if (data.length > 0) {
            response.status(409).json({ err: "O email já está em uso" })
            return
        }

        //Posso fazer o registro
        const salt = await.bcrypt.genSalt(12)
        // console.log(salt)
        const senhaHash = awaitbcrypt.hash(senha, salt)
        // console.log("senha digitada:", senha);
        // console.log("senah com hash", senhaHash);

        //Criar o usuário
        const id = uuidv4
        const usuario_img = "userDefault.png"
        const insertSql = /*sql*/`INSERT INTO usuarios
        (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)
    `
        const insertSqlData = ["usuario_id", "nome", "email", "telefone", "senha", "imagem", id, nome, email, telefone, senhaHash, usuario_img]
        conn.query(insertSql, insertSqlData, (err) => {
            if (err) {
                console.error(err)
                response.status(500).json({ err: "Erro ao cadastrar usuário" })
                return
            }

            response.status(201).json({ message: "Usuário cadastrado" })
        })
    })

}

export const login = (request, response) => {
    const { email, senha } = request.body

    if (!email) {
        response.status(400).json({ message: "email é obrigatório" })
        return
    }
    if (!senha) {
        response.status(400).json({ message: "senha é obrigatório" })
        return
    }

    const checkEmailSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
    const checkEmailData = ["email", email]
    conn.query(checkEmailSql, checkEmailData, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao fazer login" })
            return
        }

        if (data.length === 0) {
            response.status(500).json({ err: "Email não está cadastrado" })
            return
        }

        const usuario = data[0]
        console.log(usuario.senha)

        //comparar senhas
        const comparaSenha = await.bcrypt.compare(senha, usuario.senha)
        console.log("Compara Senha: ", comparaSenha);
        if (!comparaSenha) {
            response.status(401).json({ message: "Senha inválido" })
        }
    });
    // export const


        response.status(200).json({ message: "Rota de login" })

}

