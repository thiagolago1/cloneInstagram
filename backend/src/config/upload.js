//Importando Multer
const multer = require('multer');

//Importanto Path para lidar com os caminhos - formata o path do jeito correto para rodar em todas a plataformas
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({ //diskStorage para salvar as imagens dentro do projeto
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //caminho relativo
        filename: function(req, file, callback) {
            callback(null, file.originalname); //salvando com o nome original da imagem
        }
    })
}
