const { ipcRenderer } = require('electron')

ipcRenderer.send('send-message', "status do banco de dados: ")

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})




const { contextBridge, ipcRenderer } = require('electron')
 
// Gerenciamento de Processos (desempenho e segurança)
 
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    hello: () => ipcRenderer.send("send-message", "OIIIIII!!!!"),
    openAbout: () => ipcRenderer.send('open-about')
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