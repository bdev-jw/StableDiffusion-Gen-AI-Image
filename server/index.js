import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoute from './routes/postRoute.js'
import stableDiffusionRoute from './routes/stablediffusionRoute.js';


// import dalleRoute from './routes/dalleRoute.js'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/post',postRoute)
app.use('/api/v1/stable-diffusion', stableDiffusionRoute);
// app.use('/api/v1/dalle',dalleRoute)

app.get('/', async (req,res)=>{
    res.send('Stable-Diffusion')
})

const startServer = async ()=>{
    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, ()=> console.log('서버 시작 port 로컬 8080'))
    } catch (error){
        console.log(error)
    }
}

startServer()