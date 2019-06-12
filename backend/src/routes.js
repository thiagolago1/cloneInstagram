//Importando Express
const express = require('express');

//Importando o PostController
const PostController = require('./controllers/PostController');

//Importando o LikeController
const LikeController = require('./controllers/LikeController');

//Importando Multer p/ rotas (lida com arquivos multipart)
const multer = require('multer');

//Importando a config de Uplodas
const uploadConfig = require('./config/upload');

//Importando o reteador
const routes = new express.Router();
const upload = multer(uploadConfig);

//Middleware (Como se fosse um interceptador para chamadas e requisições) que recebe request e response
//Está retornando uma resposta com 'Hello World'
//O Req representa a requisição
// routes.get('/', (req, res) => {
//     return res.send(`Hello World ${req.query.name}`);
// });

//Chamando o método dentro da controller
routes.get('/posts', PostController.index);
routes.post('/posts',  upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store)

//Exportando rotas
module.exports = routes;