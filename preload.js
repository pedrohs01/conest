const { ipcRenderer,contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
    openAbout: () => ipcRenderer.send('open-about'),
    openCliente: () => ipcRenderer.send('open-cliente'),
    openFornecedores: () => ipcRenderer.send('open-fornecedores'),
    openProduto: () => ipcRenderer.send('open-produto'),
    openRelatorio: () => ipcRenderer.send('open-relatorio'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newForne: (fornecedor) => ipcRenderer.send('new-forne', fornecedor),

    infoSearcDialog: () => ipcRenderer.send('dialog-infoSearcDialog'),
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    nameClient: (args) => ipcRenderer.on('name-client', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client',dadosCliente),
    updateClient: (cliente) => ipcRenderer.send('upadate-client', cliente),
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    
    //fazer mais 3 novos para o forne info/focus/clear
    infoSearcDialogf: () => ipcRenderer.send('dialog-infoSearcDialogf'),
    focusSearchf: (args) => ipcRenderer.on('focus-searchf', args),
    searchForne: (nomeFornecedor) => ipcRenderer.send('search-forne', nomeFornecedor),
    nameForne: (args) => ipcRenderer.on('name-forne', args),
    clearSearchf: (args) => ipcRenderer.on('clear-searchf', args),
    dataForne: (dadosFornecedor) => ipcRenderer.on('data-forne',dadosFornecedor),
    updateForne: (fornecedor) => ipcRenderer.send('upadate-forne', fornecedor),
    deleteForne: (idForne) => ipcRenderer.send('delete-forne', idForne)
})

ipcRenderer.send('db-conect')
//ipcRenderer.send('send-message', "status do banco de dados: ")

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})


// inserir data da pagina
function obterData(){
    const data = new Date()
    const options = {
        weekday:'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-br',options)
}
 
 
// interagir diretamente no dom do documento html (index.html)
window.addEventListener('DOMContentLoaded',()=>{
const dataAtual = document.getElementById('dataAtual').innerHTML=  obterData()
})