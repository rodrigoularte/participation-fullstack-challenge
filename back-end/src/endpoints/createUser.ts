import { Request, Response } from "express"
import UserDB from "../data/UserDB"
import { User } from "../model/User"
import { GenerateId } from "../services/GenerateId"


export const createUser = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400

  try {
    const {firstName, lastName, participation} = req.body

    //verifica se algum campo do body está vazio
    if(!firstName || !lastName || !participation) {
      errorCode = 422
      throw new Error("All fields are required and cannot be empty.")
    }

    if(typeof participation !== "number") {
      errorCode = 422
      throw new Error("Participation must be a number.")
    }

    //cria um id
    const generateId = new GenerateId()
    const id = generateId.generate()

    //cria o user
    const userDB = new UserDB()
    const newUser = new User(id, firstName, lastName, participation)
    await userDB.insertUser(newUser)

    res.status(201).send({message: "Data added."})

  } catch (error: any) {
    res.status(errorCode).send({ message: error.message } || { message: error.sqlMessage })
  }
}