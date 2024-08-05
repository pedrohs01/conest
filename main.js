const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, dialog } = require('electron/main')
const path = require('node:path')

//conctar o banco de daodos
const { dbStatus, desconectar } = require('./database.js')


let dbCon = null
// importação do Schema
const clienteModel = require('./src/models/Cliente.js')

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
    if(father){
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
    if(father){
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
    if(father){
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
    if(father){
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
    if(father){
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
            type:'info',
            title:'aviso',
            message:"Cliente cadastrado com sucesso!",
            buttons:['ok']
        })
    } catch (error) {
        console.log(error)
    }
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//GRUD update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//GRUD delate >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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