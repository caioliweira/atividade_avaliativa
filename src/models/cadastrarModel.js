import conn from "../config/conn"

const tabelaProdutos = /*sql*/`
CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
Criação da tabela de produtos
CREATE TABLE product(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descrição TEXT,
    preço DECIMAL(10, 2),
    usuario_id INT,
    FOREIGN KEY(usuario_id) REFERENCES user(id)
)
`

conn.query(tabelaProdutos, (err, results, fields) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("Tabela de produtos criada com sucesso!")
})
