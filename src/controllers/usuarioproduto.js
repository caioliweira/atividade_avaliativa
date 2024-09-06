const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'desapega'
});

app.use(bodyParse.json());
app.post('/api/produtos', (req, res) => {
    const { nome, descrição, preço,produtos } = req.body;
    db.query(
        'INSERT INTO product (nome, descrição, preço,produtos) VALUES (?, ?, ?, ?)',
        [nome, descrição, preço,produtos],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: results.insertId, nome, descrição, preço,produtos });
        }
    );
});


app.use(bodyParse.json());

app.post('/api/produtos', (req, res) => {
    const { nome, descricão, preço, } = req.body;
    db.query(
        'INSERT INTO product (nome,)'
    )
});

app.get('/api/produtos', (req, res) => {
    const {produtos } = req.query;
    db.query(
        'SELECT * FROM product WHEREprodutos ?',
        [produtos],
        (err, results) => {
            if (err)
                return
            res.status(500).send(err);
            res.json(results);
        }
    )
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

