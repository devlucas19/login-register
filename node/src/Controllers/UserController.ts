import { Request, Response } from 'express'
import { User } from '../Schemas/User'

class UserController {
  public async login (req: Request, res: Response): Promise<Response> {
    
    try{
      const user = await User.findOne({email:req.body.email, password:req.body.password})

      if(user && user.email === req.body.email && user.password === req.body.password ){
        return res.status(200).json(user)
      }else{
        return res.status(401).json({errorMsg: "EMAIL OR PASSWORD INCORRECTS"})
      }
      
    }catch(error){
      return res.status(500).json({errorMsg: "Internal server error."})
    }

  }

  public async store (req: Request, res: Response): Promise<Response> {

    try{
      const existentUser = await User.findOne({email: req.body.email})

      if(existentUser){
        return res.status(401).json({errorMsg:"Email já cadastrado"})
      }

        const validations = [
          { field: 'firstName', minLength: 2, errorMsg: 'O campo first name deve ter no mínimo 2 caracteres' },
          { field: 'lastName', minLength: 2, errorMsg: 'O campo last name deve ter no mínimo 2 caracteres' },
          { field: 'email', minLength: 5, errorMsg: 'O campo email deve ter no mínimo 5 caracteres' },
          { field: 'password', minLength: 8, errorMsg: 'O campo password deve ter no mínimo 8 caracteres' }
        ];
  
        for (const validation of validations) {
          if (req.body[validation.field].length < validation.minLength) {
            return res.status(411).json({ errorMsg: validation.errorMsg });
          }
        }

        const user = await User.create(req.body)
        return res.status(201).json(user)

    }catch(error){
      return res.status(500).json({errorMsg: "Internal server error."})
    }
    
  }
}

export default new UserController()