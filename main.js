const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, dialog } = require('electron/main')
const path = require('node:path')

//conctar o banco de daodos
const { dbStatus, desconectar } = require('./database.js')


let dbCon = null
// importação do Schema
const clienteModel = require('./src/models/Cliente.js')
const fornecedorModel = require('./src/models/Fornecedor.js')

//janela principal (definir o objeto win como variavel)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/pacote.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}



// janela sobre
let about // bug de abertura

const aboutWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        // nativeTheme.themeSource ='dark'
        // se a janela about noa etiver aberta
        if (!about) {
            about = new BrowserWindow({
                width: 360,
                height: 220,
                icon: './src/public/img/pacote.png',
                resizable: false, // evitar o redimensionamento
                // titleBarStyle: 'hidden',  esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder menu
                parent: father,
                modal: true
            })
        }
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/sobre.html')
    // bug2 
    about.on('closed', () => {
        about = null
    })
}


let cliente
const clienteWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        // nativeTheme.themeSource ='dark'
        // se a janela about noa etiver aberta
        cliente = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
            // titleBarStyle: 'hidden',  esconder barra de titulo e menu
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        //iniciar a janela com o menu personalizado
        cliente.loadFile('./src/views/cliente.html')
    }
}



// janela fornecedores
let fornecedores // bug de abertura

const fornecedorWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        // nativeTheme.themeSource ='dark'
        // se a janela about noa etiver aberta

        fornecedores = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
            // titleBarStyle: 'hidden',  esconder barra de titulo e menu
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        //iniciar a janela com o menu personalizado
        fornecedores.loadFile('./src/views/fornecedores.html')
    }
}




// janela produtos
let produtos // bug de abertura

const produtoWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        // nativeTheme.themeSource ='dark'
        // se a janela about noa etiver aberta

        produtos = new BrowserWindow({
            width: 800,
            height: 600,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
            // titleBarStyle: 'hidden',  esconder barra de titulo e menu
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        //iniciar a janela com o menu personalizado
        produtos.loadFile('./src/views/produtos.html')
    }
}

// janela relatorio
let relatorio // bug de abertura

const relatorioWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        // nativeTheme.themeSource ='dark'
        // se a janela about noa etiver aberta

        relatorio = new BrowserWindow({
            width: 800,
            height: 600,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
            // titleBarStyle: 'hidden',  esconder barra de titulo e menu
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        //iniciar a janela com o menu personalizado
        relatorio.loadFile('./src/views/relatorio.html')
    }
}






// iniciar a aplicaçao
app.whenReady().then(() => {

    //status de conexão 
    ipcMain.on('send-message', (event, message) => {
        console.log(` ${message}`)
        event.reply('db-message', 'conectado')
    })
    ipcMain.on('db-conect', async (event, message) => {
        dbCon = await dbStatus()
        event.reply('db-message', "conectado")
    })

    // desconctar do banco ao ecerrar a janela
    app.on('before-quit', async () => {
        await desconectar(dbCon)
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//  Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            },
            {
                label: 'cliente',
                click: () => clienteWindow()
            },
            {
                label: 'fornecedores',
                click: () => fornecedorWindow()
            },
            {
                label: 'produtos',
                click: () => produtoWindow()
            },
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            }, {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            }, {
                type: 'separator'

            }, {
                label: 'aplicar zoom',
                role: 'zoomIn'
            }, {
                label: 'Reduzir',
                role: 'zoomOut'
            }, {
                label: 'Restaurar o zoom padrao',
                role: 'resetZoom'
            }
        ]
    },

    {
        label: 'Relatórios',
        click: () => relatorioWindow()
    },

    {
        label: 'Ajuda',
        submenu: [
            {
                type: 'separator'
            },

            {
                label: 'Sobre',
                accelerator: 'Alt+F1',
                click: () => aboutWindow()
            },
        ]
    },

]

//GRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) // teste do paso 2 do slide
    //passo 3 cadastrar o cliente no mongodb
    try {
        // extrair os dados do objeto
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        })
        await novoCliente.save() //save() - mongose
        dialog.showMessageBox({
            type: 'info',
            title: 'aviso',
            message: "Cliente cadastrado com sucesso!",
            buttons: ['ok']
        })
    } catch (error) {
        console.log(error)
    }
})



ipcMain.on('new-forne', async (event, fornecedor) => {
    console.log(fornecedor) // teste do paso 2 do slide
    //passo 3 cadastrar o cliente no mongodb
    try {
        // extrair os dados do objeto
        const novoFornecedor = new fornecedorModel({
            razaoSocial: fornecedor.razaoFo,
            cnpjForne: fornecedor.cnpjFo,
            foneForne: fornecedor.foneFo,
            emailForne: fornecedor.emailFo,
            cepForne: fornecedor.cepFo,
            logradouroForne: fornecedor.logradouroFo,
            numeroForne: fornecedor.numeroFo,
            bairroForne: fornecedor.bairroFo,
            cidadeForne: fornecedor.cidadeFo,
            ufForne: fornecedor.ufFo,
            complementoForne: fornecedor.complementoFo
        })
        await novoFornecedor.save() //save() - mongose
        dialog.showMessageBox({
            type: 'info',
            title: 'aviso',
            message: "Fornecedor cadastrado com sucesso!",
            buttons: ['ok']
        })
    } catch (error) {
        console.log(error)
    }
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Aviso (Buscar: prechimento capo og)
ipcMain.on('dialog-infoSearcDialog', (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: 'Atencao',
        message: 'pesquise o nome do cliente no campo de busca',
        buttons: ['ok']
    })
    event.reply('focus-search')
})
//recebimento do pedido de busaca pelo nome
ipcMain.on('search-client', async (event, nomeCliente) => {
    console.log(nomeCliente)
    //passo 2 : busca banco de dados
    try {
        // find() "método de busca" newregex 'i' case insensiteve
        const dadosClientes = await clienteModel.find({ nomeCliente: new RegExp(nomeCliente, 'i') })
        console.log(dadosClientes)
        // ux -> se p cliente noa estiver cadastrado avisar o usuario e habolitar o cadastro
        if (dadosClientes.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Atenção',
                message: 'Cliente não cadastrado.\ndeseja cadastarar',
                buttons: ['sim', 'nao'],
                defaultId: 0
            }).then((result) => {
                if (result.response === 0) {
                    //settar o nome do cliente no form e habilitar o cadastro
                    event.reply('name-client')
                } else {
                    // limpar a caixa de busca
                    event.reply('clear-search')
                }
            })
        } else {
            //passo 4 (enviar os dados dos clientes ao renderizador)
            event.reply('data-client', JSON.stringify(dadosClientes))
        }
    } catch (error) {
        console.log(error)
    }
})




//forne

// Aviso (Buscar: prechimento capo og)
ipcMain.on('dialog-infoSearcDialogf', (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: 'Atencao',
        message: 'pesquise o nome do fornecedor no campo de busca',
        buttons: ['ok']
    })
    event.reply('focus-searchf')
})
//recebimento do pedido de busaca pelo nome
ipcMain.on('search-forne', async (event, razaoSocial) => {
    console.log(razaoSocial)
    //passo 2 : busca banco de dados
    try {
        // find() "método de busca" newregex 'i' case insensiteve
        const dadosFornecedor = await fornecedorModel.find({ razaoSocial: new RegExp(razaoSocial, 'i') })
        console.log(dadosFornecedor)
        // ux -> se p cliente noa estiver cadastrado avisar o usuario e habolitar o cadastro
        if (dadosFornecedor.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Atenção',
                message: 'Fornecedor não cadastrado.\ndeseja cadastarar',
                buttons: ['sim', 'nao'],
                defaultId: 0
            }).then((result) => {
                if (result.response === 0) {
                    //settar o nome do cliente no form e habilitar o cadastro
                    event.reply('name-forne')
                } else {
                    // limpar a caixa de busca
                    event.reply('clear-searchf')
                }
            })
        } else {
            //passo 4 (enviar os dados dos clientes ao renderizador)
            event.reply('data-forne', JSON.stringify(dadosFornecedor))
        }
    } catch (error) {
        console.log(error)
    }
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//GRUD update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('upadate-client', async (event, cliente) => {
    console.log(cliente) // teste do paso 2 do slide
    //passo 3 cadastrar o cliente no mongodb
    try {
        // extrair os dados do objeto
        const clienteEditado = await clienteModel.findByIdAndUpdate(
            cliente.idCli, {
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: 'aviso',
            message: "Dados do cliente alterados com sucesso!",
            buttons: ['ok']
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD delate >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-client', (event, idCli) => {
    console.log(idCli) // teste do passo 2
    //importante confirma a ação antes de apagar
         dialog.showMessageBox({
            type: 'warning',
            title: 'Atenção',
            message: 'quer apagar',
            buttons: ['sim', 'nao'],
            defaultId: 0
        }).then(async(result) => {
            if (result.response === 0) {
                // passo 3
                try {
                    await clienteModel.findByIdAndDelete(idCli)
                    event.reply('reset-form')
                } catch (error) {
                    console.log(error)
                }
            }
        })
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//---------------------------------------------------------




// função que verrifica o status da conexao
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Banco de dados conectado.")
    } catch (error) {
        win.webContents.send('db-status', `erro de conexao:${error.message}`)
    }
}

ipcMain.on("open-about", () => {
    aboutWindow()
})

ipcMain.on('open-cliente', () => {
    clienteWindow()
})

ipcMain.on('open-fornecedores', () => {
    fornecedorWindow()
})

ipcMain.on('open-produto', () => {
    produtoWindow()
})

ipcMain.on('open-relatorio', () => {
    relatorioWindow()
})