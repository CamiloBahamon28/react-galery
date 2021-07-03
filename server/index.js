import express from 'express'
import { asap } from 'rsvp'

import indexRoutes from './routes/index.routes' 

const app = express()

app.set('port', process.env.PORT || 4000)

app.use(indexRoutes)

app.listen(app.get('port'))
console.log('Server Port', app.get('port'));