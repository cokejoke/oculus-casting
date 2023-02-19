const {app, BrowserWindow, BrowserView, nativeImage} = require('electron')
const path = require('path')
const fs = require("fs");
const url = require("url");

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600, autoHideMenuBar: true })
  win.setTitle('Oculus Casting')
  win.setIcon(nativeImage.createFromPath(path.join(__dirname, '/resources/public/favicon.png')))
  win.setBackgroundColor('#1c1e20')

  const view = new BrowserView()
  win.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 800, height: 600 })
  view.setAutoResize({width: true, height: true})

  const fs = require('fs');
  view.webContents.loadURL('https://www.oculus.com/casting/')
      .then(() => {
          view.webContents.session.cookies.get({ url: 'https://www.oculus.com' })
            .then((cookies) => {
                // Injects css only if user is logged in
                if(cookies.filter(c => c.name === 'oc_www_at').length !== 0) {
                  view.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/resources/styles/styles.css'), 'utf8'))
              }
            }).catch((error) => {
                console.log(error)
            })
      })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
