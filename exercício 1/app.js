const express = require('express');
const app = express();
const PORT = 8081;
const fs = require('fs')

app.use(express.json());

app.post('/usuarios/novo', (req, res) => {
    try {
        const { dadosNovo } = req.body; // constante criada e atribuída para requisição do corpo da página em JSON
        console.log(dadosNovo);

        if (fs.existsSync('./usuarios.json')) {
            const usuarios = fs.readFileSync("./usuarios.json", "utf8");
            const usuariosJson = JSON.parse(usuarios);
        } else {
            fs.writeFileSync('./usuarios.json', '[]');
        }

        if (dadosNovo.user.length < 3) {
            return res.status(401).json("O nome de usuário deve ter no mínimo 3 caracteres. Digite novamente!");
        }

        if (dadosNovo.senha.length < 4) {
            res.status(401).json("Sua senha deve ter no mínimo 4 caracteres. Digite novamente!");
        }

        if (!dadosNovo.email.includes("@")) {
            res.status(401).json("Seu email deve conter @, por favor, digite novamente!");
        }

        let novoUsuario = {
            user: dadosNovo.user,
            senha: dadosNovo.senha,
            email: dadosNovo.email
        }

        usuariosJson.push(novoUsuario);

        fs.writeFileSync('./usuarios.json', JSON.stringify(usuariosJson));
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro interno no servidor" }); // servidor não conectado
    }
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});