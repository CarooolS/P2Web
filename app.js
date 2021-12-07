//modulos
const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
 
const app = express(); 

//dados do mysql para criar a conexão
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('/views', path.join(__dirname, '/views')); // onde o html está
app.set('view engine', 'html'); //usando o html
app.use('/public', express.static(path.join(__dirname, '/public'))); //onde o css está e fazendo com que o servidor use-o


//conectando com o banco de dados caso não tenha nenhum erro
db.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("Conectado...")
    }
});

//rotas
app.use('/', require('./rotas/paginas'));
app.use('/login.html', require('./rotas/paginas'));
app.use('/cadastro.html', require('./rotas/paginas'));
app.use('/autenticacao', require('./rotas/autenticacao'));

//executando na porta
app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});
