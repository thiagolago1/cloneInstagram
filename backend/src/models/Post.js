//Arquivo referente as Postagens

//Importação do Mongoose
const mongoose = require('mongoose');

//Mostra quais colunas estão disponíveis dentro da tabela do db
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        //Parâmetros para os likes
        type: Number,
        default: 0,
    }
}, {
    //Datas
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);