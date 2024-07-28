import express, { Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import compress from 'compression'
import Router from 'express-promise-router'
import helmet from 'helmet'
import * as http from 'http'
import httpStatus from 'http-status'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import { RegisterRoutes } from '../build/routes'

export class Server {
  private readonly express: express.Express
  private readonly port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.express = express()
    
    // Configurar CORS
    const corsOptions = {
      origin: 'http://localhost:4200', // Permitir el origen de tu aplicación Angular
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
      credentials: true // Habilitar el envío de cookies
    }

    this.express.use(cors(corsOptions)) // Usar cors con opciones

    this.express.use(json())
    this.express.use(urlencoded({ extended: true }))
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(compress())

    const router = Router()
    this.express.use(router)

    RegisterRoutes(this.express)

    this.express.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')))
    })

    // Middleware de manejo de errores
    this.express.use((err: Error, _: Request, res: Response, _next: () => void) => {
      console.error(err.stack)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        data: null
      })
    })
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      const env = this.express.get('env') as string
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`Mock Backend App is running at http://localhost:${this.port} in ${env} mode`)
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  getHTTPServer(): Server['httpServer'] {
    return this.httpServer
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            reject(error)
            return
          }
          resolve()
        })
      } else {
        resolve()
      }
    })
  }
}