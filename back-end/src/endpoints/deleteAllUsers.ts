import { Request, Response } from "express"
import UserDB from "../data/UserDB"

export const deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400

  try {
    const userDB = new UserDB()
    await userDB.delAllUsers()

    res.status(200).send({message: "All data deleted."})

  } catch (error: any) {
    res.status(errorCode).send({ message: error.message } || { message: error.sqlMessage })
  }
}