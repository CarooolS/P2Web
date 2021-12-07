const mysql = require("mysql");
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

exports.cadastro = (req, res) => {
    console.log(req.body);
    
    const { usuario2, email, senha2 } = req.body;

    db.query('SELECT email FROM usuario WHERE email = ?', [email], async (error, resultado) => {
        if(error){
            console.log(error);
        }

        if(resultado.length > 0){
            // return res.render('cadastro.html')
            res.send("Cadastrado!")
        }

        let hashedPassword = await bcrypt.hash(senha2, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO usuario SET ?', {nome: usuario2, email: email, senha: hashedPassword}, (error, resultado) => {
            if(error){
                console.log(error);
            }
            else{
                console.log(resultado);
                // return res.render('cadastro.html')
                res.send("Cadastrado!")
            }
        })
    })

    
}