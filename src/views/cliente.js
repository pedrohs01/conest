/**
 * Processo de rederização 
 * clientes
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
       buscarCliente()
    }
}   

// Adicionar o função de manipulção do enveto de tecla enter
document.getElementById('frmClient').addEventListener('keydown',
teclaEnter)

//função para remover o manipulador de enventos
function removerTeclaEnter() {
    document.getElementById('frmClient').removeEventListener('keydown',teclaEnter)
}

//GRUD creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura do inputs do formulario
let formCliente = document.getElementById('frmClient')
let idCliente = document.getElementById('inputId')
let nomeCliente = document.getElementById('inputName')
let foneCliente = document.getElementById('inputPhone')
let emailCliente = document.getElementById('inputAddress')
//evento relacionado ao botão adicionar 
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    //Empacotar os dados em um objeto e enviar ao main.js (paso2)
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)
    //limpar os dados do form apos o envio
    formCliente.reset()
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// array(vetor) ussado na rederização dos dados dos clientes
let arrayCliente = []
// funçao que vai enviar ao mian um pedido de busca pelo nome
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value.trim()
    if(nomeCliente === "") {
        //validar capo obrigatorio
        api.infoSearcDialog()
    } else {
        //enviar o pedido de busca
        api.searchClient(nomeCliente)
    }
    // Foco no campo de busca(UX)
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })
    //setar o nome do cliente e habilitar o recadastramento
    api.nameClient((args) => {
        //restaurar a tecla enter ao padrão
        removerTeclaEnter()
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputName').value = setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputPhone').value = ""
        document.getElementById('inputAddress').value = ""
        document.getElementById('inputId').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputName').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    // limpara caixa dee busca
    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // receber do main.js os dados do cliente (passo 4)
    api.dataClient((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(dadosCliente)
    
    // passo 5 (final) percorrer o array, extrair os dados e setar os campos de texto (caixa input)
    arrayCliente.forEach((c) => {
        document.getElementById('inputId').value = c._id,
        document.getElementById('inputName').value = c.nomeCliente,
        document.getElementById('inputPhone').value = c.foneCliente,
        document.getElementById('inputAddress').value = c.emailCliente
        // limpar a caixa de busca (UX)
        document.getElementById('inputSearch').value = ""

        document.getElementById('btnUpdate').disabled = false
        document.getElementById('btnDelete').disabled = false
    })
})
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarCliente() {
    //passo 1
    const cliente = {
        idCli: idCliente.value,
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    console.log(cliente) //teste do passo 1
    // passo 2: enviar o objeto cliente ao main
    api.updateClient(cliente)
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD delate >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirCliente() {
    let idCli = idCliente.value// passo 1 (obter o id do cliente)
    console.log(idCli) //  teste passo 1 
    api.deleteClient(idCli)  // passo 2 - enviar o id do cliente ao main
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//reset do form
function resetForm() {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById('inputSearch').disabled = false
    btnRead.disabled = false
    document.getElementById("frmClient").addEventListener("keydown", teclaEnter)
    arrayCliente = []
    document.getElementById('inputId').value = ""
    document.getElementById('inputName').value = ""
    document.getElementById('inputPhone').value = ""
    document.getElementById('inputAddress').value = ""
}