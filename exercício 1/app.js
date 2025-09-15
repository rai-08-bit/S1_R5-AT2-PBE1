const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs')

app.use(express.json());

app.post('/usuarios/novo', (req, res) => {
    try {
        const { user, senha, email } = req.body.dadosNovo; // constante criada e atribuída para requisição do corpo da página em JSON
        console.log(user, senha, email);


        if (user.length < 3) {
            return res.status(401).json("O nome de usuário deve ter no mínimo 3 caracteres. Digite novamente!");
        }

        if (senha.length < 4) {
            res.status(401).json("Sua senha deve ter no mínimo 4 caracteres. Digite novamente!");
        }

        if (!email.includes("@")) {
            res.status(401).json("Seu email deve conter @, por favor, digite novamente!");
        }
        
        let novoUsuario = { user, senha, email };
        
        let usuariosJson = [];
        if (fs.existsSync('./usuarios.json')) {
            usuariosJson = JSON.parse(fs.readFileSync("./usuarios.json", "utf8"));
            usuariosJson.push(novoUsuario);
            fs.writeFileSync('./usuarios.json', JSON.stringify(usuariosJson), 'utf8');
        } else {
            usuariosJson.push(novoUsuario);
            fs.writeFileSync('./usuarios.json', JSON.stringify(usuariosJson), 'utf8');
        }
        res.status(201).json("Usuário criado com sucesso!");
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro interno no servidor" }); // servidor não conectado
    }
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});