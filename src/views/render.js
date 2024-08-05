function sobre(){
   api.openAbout()
}

function cliente(){
   api.openCliente()
}

function fornecedores(){
   api.openFornecedores()
}

function produtos(){
   api.openProduto()
}

function relatorio(){
   api.openRelatorio()
}

api.dbMessage((event, message) => {
   console.log(message)
   if (message === "conectado") {
      document.getElementById('statusDb').src = "../public/img/dbon.png"
   } else {
      document.getElementById('statusDb').src = "../public/img/dboff.png"
   }
})