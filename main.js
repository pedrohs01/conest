const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')

//conctar o banco de daodos
const {conectar, desconectar} = require('./database.js')

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
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 360, 
            height: 220,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/sobre.html')
    // bug2 
    about.on('closed', () => {
        about = null
    })
}

// janela cliente
let cliente // bug de abertura

const abrir = () => {       
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 800, 
            height: 600,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/cliente.html')
    // bug2 
    about.on('closed', () => {
        about = null
    })
}

// janela fornecedores
let fornecedores // bug de abertura

const forne = () => {       
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 800, 
            height: 600,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/fornecedores.html')
    // bug2 
    about.on('closed', () => {
        about = null
    })
}

// janela produtos
let produtos // bug de abertura

const pro = () => {       
    // nativeTheme.themeSource ='dark'
    // se a janela about noa etiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 800, 
            height: 600,
            icon: './src/public/img/pacote.png',
            resizable: false, // evitar o redimensionamento
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu
          autoHideMenuBar: true // esconder menu
        })
    }
    //iniciar a janela com o menu personalizado
    about.loadFile('./src/views/produtos.html')
    // bug2 
    about.on('closed', () => {
        about = null
    })
}
 


// iniciar a aplicaçao
app.whenReady().then(() => {

    //status de conexão 
    ipcMain.on('send-message', (event, message) =>{
        console.log(`<<< ${message}`)
        statusConexao()
    })

    // desconctar do banco ao ecerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
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
            click: () => abrir()
        },
        {
          label: 'fornecedores',
          click: () => forne()
      },
      {
        label: 'produtos',
        click: () => pro()
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
  }

]

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