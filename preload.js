const { ipcRenderer,contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
    openAbout: () => ipcRenderer.send('open-about'),
    openCliente: () => ipcRenderer.send('open-cliente'),
    openFornecedores: () => ipcRenderer.send('open-fornecedores'),
    openProduto: () => ipcRenderer.send('open-produto'),
    openRelatorio: () => ipcRenderer.send('open-relatorio'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newForne: (fornecedor) => ipcRenderer.send('new-forne', fornecedor)
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