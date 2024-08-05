/**
 *  Modulo de conexão o banco de dados
 *  uso do framewoork mongoose
 */

// importa a blibioteca
const mongoose = require('mongoose')

let url = "mongodb+srv://admin:senac123@clusterconest.lbtakyr.mongodb.net/"

// variavel para armazenar o status de oonexaão
let isConnected = false

//status de conexãp
const dbStatus = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

const conectar = async () => {
    if (isConnected === false) {
        try {
            await mongoose.connect(url)
            isConnected = true
            console.log("Mongodb conectado")
            return (isConnected)
        } catch (error) {
            console.log(`problema detctado: ${error}`)
        }
    }
}

const desconectar = async () => {
    if (isConnected === true) {
        try {
            await mongoose.disconnect(url)
            isConnected = false
            console.log("mongodb desconctado")
        } catch (error) {
            console.log(`problema detctado: ${error}`)
        }
    }
}

// exporta os metodos conctar e desconectar
module.exports = {dbStatus, desconectar}