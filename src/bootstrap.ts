import { Server } from './server'

export class Bootstrap {
	server: Server

	constructor() {
		const port = process.env.port ?? '3005'
		this.server = new Server(port)
	}

	async start(): Promise<void> {
		this.server.listen()
	}

	get httpServer(): Server['httpServer'] | undefined {
		return this.server.getHTTPServer()
	}

	async stop(): Promise<void> {
		return this.server.stop()
	}
}
