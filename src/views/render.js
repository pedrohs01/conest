// processo de renderizaçao   do documento index . html
 
console.log("Processo  de Renderização")
 
// exemplo de comando que so funciona no Node.js
console.log(`Electron:${api.verElectron()}`)
api.hello()
 
// funçao que é executada quando o botao for clicado
 
function sobre(){
   api.openAbout()
}

function cliente(){
   api.abrir()
}

function fornecedores(){
   api.forne()
}

function produtos(){
   api.pro()
}