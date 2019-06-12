//Importando a Model de Post
const Post = require('../models/Post');

//Exportando objeto que contém os métodos da controller
module.exports = {
    async store(req, res) {
        const post = await Post.findById(req.params.id); //Buscando o Post pelo ID

        post.likes += 1; //Soma o 'like' no post

        await post.save(); //Salva, é claro kk

        //Mensagem para todos os usuários conectados na aplicação
        req.io.emit('like', post);

        return res.json(post);
    },
};