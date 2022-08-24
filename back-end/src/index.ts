import { app } from "./app"
import { createUser } from "./endpoints/createUser"
import { deleteAllUsers } from "./endpoints/deleteAllUsers"
import { getAllUsers } from "./endpoints/getAllUsers"
import { getParticipationSum } from "./endpoints/getParticipationSum"


app.post("/users", createUser)
app.get("/users", getAllUsers)
app.get("/sum", getParticipationSum)
app.delete("/users", deleteAllUsers)