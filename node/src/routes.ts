import { Router } from 'express'
import UserController from './Controllers/UserController'

const routes = Router()

routes.post("/login", UserController.login)

routes.post("/register", UserController.store)

export default routes