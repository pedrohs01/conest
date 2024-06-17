/**
 *  Modulo de conexão o banco de dados
 *  uso do framewoork mongoose
 */

// importa a blibioteca
const mongoose = require('mongoose')

let url = "mongodb://admin:pti%402018@10.26.45.201:27017/?authSource=admin"

const conectar = async () => {
    try {
        await mongoose.connect(url)
        console.log("mongodb conectado")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}

const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("mongodb desconectado")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}

// exporta os metodos conctar e desconectar
module.exports = {conectar, desconectar}