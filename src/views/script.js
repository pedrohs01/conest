function buscarCep() {
    let cep = (frmFornecedor.inputCep.value)
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    
    fetch(urlAPI)
        .then((response) => { 
            return response.json()
        })
        .then((dados) => { 
            frmFornecedor.inputLogradouro.value = `${dados.logradouro}`
            frmFornecedor.inputBairro.value = `${dados.bairro}`
            frmFornecedor.inputCidade.value = `${dados.localidade}`
            frmFornecedor.uf.value = `${dados.uf}`
        })
        .catch((error) => {
            console.log(`Erro ao obter o endereço: ${error}`)
        })
    }
 