import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    mongoose.connect(`mongodb+srv://luccaslf2103:lucaslima2003@cluster0.qcxvc6x.mongodb.net/infosystem`)
    
    const connection = mongoose.connection 

    connection.on('error', console.error.bind(console, 'erro na conexão do mongoose'))
    connection.on('open', ()=>{console.log('conexão com o mongoose estabelecida')})

  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express