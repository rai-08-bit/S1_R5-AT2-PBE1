const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

app.post ('/alunos/notas', (req, res) =>{
    try {
        const {notas, nome} = req.body; // constante criada e atribuída para requisição do corpo da página em JSON
        console.log(notas)

        let soma = 0;

        if (!isNaN(notas) || isNaN(soma) || soma == undefined) { // verificação de números, se realmente números foram digitados
            return res.status(400).send("Apenas números devem ser digitados!");
        }
        if (!notas) {
            return res.status(400).send("Dados enviados incorretamente");
        }

        notas.forEach(nota => {
            soma += nota;
        });

        let media = soma/notas.length;

        if (media >6) {
            return res.status(200).send(`Parabéns ${nome}, você foi aprovado!`);
        } else {
            return res.status(200).send(`Não foi dessa vez ${nome}, você foi reprovado! Estude mais.`);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error); // servidor não conectado
    }
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});