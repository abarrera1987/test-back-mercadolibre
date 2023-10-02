import express, { Application } from 'express'
import itemsRoutes from '../routes/items.routes'
import cors from 'cors'
class Server {

	private app: Application
	private port: string
	private api = {
		items: '/api'
	}

	constructor() {
		this.app = express()
		this.port = process.env.PORT || '3000'
		// Metodos iniciales
		this.middlewares()
		this.routes()
	}

	middlewares() {
		//CORS
		this.app.use(cors())
		//Body
		this.app.use(express.json())
	}

	routes() {
		this.app.use(this.api.items, itemsRoutes)
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running in port ${this.port}`);
		})
	}

}

export default Server;