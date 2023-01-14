const path = require('path');

const {app, BrowserWindow, Menu} = require("electron");

//Create the main window
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'Country App',
        width: 500,
        heigth: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

//Create about window
function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: 'About',
        width: 500,
        heigth: 300
    });

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

//App is ready
app.whenReady().then(() => {
    createMainWindow();

    //Implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
      })
})

//Menu template
const menu = [
    {
        role: 'fileMenu',
        
        /*
        label: 'Options',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]*/

    },
    {label: 'Help',
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            }
        ]
    }
]

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  