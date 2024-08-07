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

// Alteterar comportamento do enter dentro do formulario(relacionar ao botão de busca)
// UX
document.getElementById('frmClient').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        // excutar a função associada ao botão buscar
        buscarCliente()
    }
})

//GRUD creat >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura do inputs do formulario
let formCliente = document.getElementById('frmClient')
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
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputName').value = setarNomeCliente
        document.getElementById('inputSearch').value = ""
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
    
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD delate >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//reset do form
function resetForm() {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById('inputSearch').disabled = false
    btnRead.disabled = false
}