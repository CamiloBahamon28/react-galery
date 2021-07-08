import express from 'express'
import fileUpload from 'express-fileupload'

//importando las rutas
import indexRoutes from './routes/index.routes' 
import imagesRoutes from './routes/images.routes' 

import config from './config'

const app = express()

app.set('port', process.env.PORT || 4000)

app.use(fileUpload({
    tempFileDir: '/temp'//para guardar los archivos en una carpeta temporal
}))

//utilizando las rutas
app.use(indexRoutes)
app.use(imagesRoutes)

app.listen(app.get('port'))
console.log('Server Port', app.get('port'));