import { Document, Schema, Model, model } from 'mongoose'
import { UserInterface } from '../Interfaces/User'

export interface UserModel extends UserInterface, Document {
  
}

const UserSchema = new Schema({
  email: {
    type:String,
    required:true,
    minLength:[5, 'O campo Email deve ter pelo menos 5 caracteres']
  },
  firstName: {
    type:String,
    required:true,
    minLength:[2, 'O campo First Name deve ter pelo menos 2 caracteres']
  },
  lastName: {
    type:String,
    required:true,
    minLength:[2, 'O campo Last Name deve ter pelo menos 2 caracteres']
  },
  password:{
    type:String,
    required:true,
    minLength:[8, 'O campo First Name deve ter pelo menos 8 caracteres']
  }
}, {
  timestamps: true
})

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)