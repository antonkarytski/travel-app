const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended : true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/country', require('./routes/countries.routes'))



if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('/', (req, res) => { res.send('Hello from Express!') })
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => console.log(`App started ${PORT}`))
    } catch (e){
        console.log("Server Error", e.message)
        process.exit(1)
    }
}

start()

