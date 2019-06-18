const express = require('express'); //Importando o Express
const mongoose = require('mongoose'); //Importando o Mongoose
const path = require('path'); //Import do Nodejs p/ caminhos relativos
const cors = require('cors'); //Importando cors, permite o backend ser acessível

//Função 'express' cria um 'servidor'
const app = express();

//Permite http e websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

//String de conexão com o mongodb
mongoose.connect('mongodb+srv://Banco:senha@cluster0-diq1n.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//Permitindo o acesso ao req.io
app.use((req, res, next) => {
    req.io = io;
    next();
})

//Permite que todo tipo de aplicação acesse o backend
app.use(cors());

//Acessar através da url, as imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//Passando o roteador para a aplicação reconhecer rotas
app.use(require('./routes'));

//Escutando a porta 3333
server.listen(3333);
