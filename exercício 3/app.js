const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

app.post ('/soma', (req, res) =>{
    try {
        const {soma} = req.body.soma; // constante criada e atribuída para requisição do corpo da página em JSON
        console.log(soma)

        if (req.body.soma){
            return res.status(400).send("Formato inválido");
        }

        if (soma) { // verificação de números, se realmente números foram digitados
            return res.status(400).send("Apenas números devem ser digitados!");
        }

        res.status(201).json({message: `A soma dos dados é: ${dados.resultado} `});
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // servidor não conectado
    }
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});