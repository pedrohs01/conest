/**
 * Processo de rederização 
 * fornecedores
 */

//musar probriedades do documeno ao iniciar (ux)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// Função para manipular o evento enter
// UX
function teclaEnter(event){
    if (event.key === 'Enter') {
       event.preventDefault()
        // excutar a função associada ao botão buscar
        buscarFornecedor()
    }
}

// Adicionar o função de manipulção do enveto de tecla enter
document.getElementById('frmFornecedor').addEventListener('keydown',
teclaEnter)

//função para remover o manipulador de enventos
function removerTeclaEnter() {
    document.getElementById('frmFornecedor').removeEventListener('keydown',teclaEnter)
}

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

//GRUD read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// array(vetor) ussado na rederização dos dados dos clientes
let arrayFornecedor = []
// funçao que vai enviar ao mian um pedido de busca pelo nome
function buscarFornecedor() {
    let razaoSocial = document.getElementById('inputSearch').value.trim()
    if(razaoSocial === "") {
        //validar capo obrigatorio
        api.infoSearcDialogf()
    } else {
        //enviar o pedido de busca
        api.searchForne(razaoSocial)
    }
    // Foco no campo de busca(UX)
    api.focusSearchf((args) => {
        document.getElementById('inputSearch').focus()
    })
    //setar o nome do cliente e habilitar o recadastramento
    api.nameForne((args) => {
        //restaurar a tecla enter ao padrão
        removerTeclaEnter()
        let setarNomeFornecedor = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputName').value = setarNomeFornecedor
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputPhone').value = ""
        document.getElementById('inputAddress').value = ""
        document.getElementById('inputId').value = ""
        document.getElementById('inputCnpj').value = ""
        document.getElementById('inputCep').value = ""
        document.getElementById('inputLogradouro').value = ""
        document.getElementById('inputNumero').value = ""
        document.getElementById('inputBairro').value = ""
        document.getElementById('inputCidade').value = ""
        document.getElementById('inputComplemento').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputName').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    // limpar caixa dee busca
    api.clearSearchf((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // receber do main.js os dados do cliente (passo 4)
    api.dataForne((event, dadosFornecedor) => {
        arrayFornecedor = JSON.parse(dadosFornecedor)
        console.log(dadosFornecedor)
    
    // passo 5 (final) percorrer o array, extrair os dados e setar os campos de texto (caixa input)
    arrayFornecedor.forEach((c) => {
        document.getElementById('inputId').value = c._id,
        document.getElementById('inputName').value = c.razaoSocial,
        document.getElementById('inputCnpj').value = c.cnpjForne,
        document.getElementById('inputPhone').value = c.foneForne,
        document.getElementById('inputAddress').value = c.emailForne,
        document.getElementById('inputCep').value = c.cepForne,
        document.getElementById('inputLogradouro').value = c.logradouroForne,
        document.getElementById('inputNumero').value = c.numeroForne,
        document.getElementById('inputBairro').value = c.bairroForne,
        document.getElementById('inputCidade').value = c.cidadeForne,
        document.getElementById('uf').value = c.ufForne,
        document.getElementById('inputComplemento').value = c.complementoForne
        // limpar a caixa de busca (UX)
       document.getElementById('inputSearch').value = ""

        document.getElementById('btnUpdate').disabled = false
        document.getElementById('btnDelete').disabled = false
    })
})
}

//reset do form
function resetForm() {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById('inputSearch').disabled = false
    btnRead.disabled = false
    document.getElementById("frmFornecedor").addEventListener("keydown", teclaEnter)
    arrayFornecedor = []
}