import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {router} from './routes/routes'

export const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/', router)


const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`App listening at: ${port}`))
process.on('SIGINT', () => {server.close(); console.log("Application closed")})