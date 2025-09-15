const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

app.post ('/soma', (req, res) =>{
    try {
        const {soma} = req.body; // constante criada e atribuída para requisição do corpo da página em JSON
        console.log(soma)

        if (!soma){
            return res.status(400).send("Formato inválido");
        }

        const somaTotal = soma.reduce((acumulado, corrente) => {
            if (typeof corrente === "number" && !isNaN(corrente)) {
                return acumulado + corrente;
            } else{
                return acumulado;
            }
        }, 0); 

        return res.status(200).send(`A soma total dos números digitados é ${somaTotal}`);

    } catch (error) {
        console.log(error);
        res.status(500).json(error); // servidor não conectado
    }
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});