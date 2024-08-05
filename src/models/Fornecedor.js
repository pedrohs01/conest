/**
 * Modelu de dados (model) Fornecedores
 */

const { model, Schema } = require ('mongoose')

const fornecedorSchema = new Schema({
    razaoSocial: {
        type: String
    },
    cnpjForne: {
        type: String
    },
    foneForne: {
        type: String
    },
    emailForne: {
        type: String
    },
    cepForne: {
        type: String
    },
    logradouroForne: {
        type: String
    },
    numeroForne: {
        type: String
    },
    bairroForne: {
        type: String
    },
    cidadeForne: {
        type: String
    },
    ufForne: {
        type: String
    },
    complementoForne: {
        type: String
    }
})

module.exports = model('Fornecedor', fornecedorSchema)