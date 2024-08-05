/**
 * Processo de rederização 
 * fornecedores
 */

//GRUD creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura do inputs do formulario
let formFornecedor = document.getElementById('frmFornecedor')
let razaoSocial = document.getElementById('inputName')
let cnpjForne = document.getElementById('inputCnpj')
let foneForne = document.getElementById('inputPhone')
let emailForne = document.getElementById('inputAddress')
let cepForne = document.getElementById('inputCep')
let logradouroForne = document.getElementById('inputLogradouro')
let numeroForne = document.getElementById('inputNumero')
let bairroForne = document.getElementById('inputBairro')
let cidadeForne = document.getElementById('inputCidade')
let ufForne = document.getElementById('uf')
let complementoForne = document.getElementById('inputComplemento')

formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(razaoSocial.value, cnpjForne.value, foneForne.value, emailForne.value, cepForne.value, logradouroForne.value, numeroForne.value, bairroForne.value, cidadeForne.value, ufForne.value, complementoForne.value)
    //Empacotar os dados em um objeto e enviar ao main.js (paso2)
    const fornecedor = {
        razaoFo: razaoSocial.value,
        cnpjFo: cnpjForne.value,
        foneFo: foneForne.value,
        emailFo: emailForne.value,
        cepFo: cepForne.value,
        logradouroFo: logradouroForne.value,
        numeroFo: numeroForne.value,
        bairroFo: bairroForne.value,
        cidadeFo: cidadeForne.value,
        ufFo: ufForne.value,
        complementoFo: complementoForne.value
    }
    api.newForne(fornecedor)
    //limpar os dados do form apos o envio
    formFornecedor.reset()
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<