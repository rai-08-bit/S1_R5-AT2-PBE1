const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

app.post ('/soma', (req, res) =>{
    try {
        const {notas, nome} = req.body; // constante criada e atribuída para requisição do corpo da página em JSON
        console.log(notas)

    } catch (error) {
        console.log(error);
        res.status(500).json(error); // servidor não conectado
    }
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});