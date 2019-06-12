//Importando a Model de Post
const Post = require('../models/Post');

//Importando o Sharp (Manipulador de Imagem)
const sharp = require('sharp');

//Imports do Nodejs
const path = require('path');
const fs = require('fs');

//Exportando objeto que contém os métodos da controller
module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');//Ordenando por data
        return res.json(posts)
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body; //Pegando as informações
        const { filename: image } = req.file; //Pegando a imagem

        const[name] = image.split('.');
        const filename = `${name}.jpg`;

        //Redimensionar imagem
        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', filename )
        )

        //Apaga imagens que não foram redimensionadas e grava apenas as redimensionadas
        fs.unlinkSync(req.file.path);

        const post = await Post.create({ //Postando de fato no db
            author,
            place,
            description,
            hashtags,
            image: filename,
        });

        //Mensagem para todos os usuários conectados na aplicação em tempo real
        req.io.emit('post', post);

        return res.json({ post });
    },
};