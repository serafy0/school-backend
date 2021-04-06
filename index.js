const express = require('express')
const router = require('./routes')

const session = require('./middleware/session ')

const corsMw =require('./middleware/cors')
const apiErrorHandler =require('./errors/api-error-handler')

const dbSetup = require("./db/db-setup");
dbSetup();


const app = express()

//if the app is running with a proxy like (nginx)
//app.set('trust proxy',1)

//
app.use(express.json())


//setup CORS login
app.options('*', corsMw)
app.use(corsMw)

app.use(session)


app.use(router)

app.use(apiErrorHandler)





app.listen(8080,()=>console.log('server is running on port 8080'))
