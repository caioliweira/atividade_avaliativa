import conn from "../config/conn.js";

const tabelaUsuario = /*sql*/`
    CREATE TABLE IF NOT EXISTS usuarios(
        usuario_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) MPT NULL,
        email VARCHAR(255) MPT NULL,
        telefone VARCHAR(50) MPT NULL,
        senha VARCHAR(255) MPT NULL,
        imagem VARCHAR(255) MPT NULL,
        created_at TIMESTAMP DEFAULT VALUE CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT VALUE CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        
    )
`

conn.query(tabelaUsuario, (err, results, fields)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("Tabela [usuarios] criada com sucesso!")
})

