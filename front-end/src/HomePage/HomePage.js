import axios from "axios"
import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import { ButtonContainer, DataContainer, DeleteButton, GlobalStyle, Page, TableContainer} from "./styled"
import { Chart } from "react-google-charts"
import Table from "../components/Table/Table"

const HomePage = () => {

  const [allUsers, setAllUsers] = useState([])
  const [sum, setSum] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [participation, setParticipation] = useState("")

  const createUser = async () => {
    const body = { firstName, lastName, participation }
    await axios
      .post("https://case-cubo-rodrigoularte.herokuapp.com/users", body)
      .then(((res) => {
        console.log(res.data)
        setShowMessage(false)
        setFirstName("")
        setLastName("")
        setParticipation("")
        getAllUsers()
        getSum()
      }))
      .catch((error) => {
        console.log(error.response.data.message)
        setShowMessage(true)
        setErrorMessage(error.response.data.message)
      })
  }

  const getAllUsers = async () => {
    await axios
      .get("https://case-cubo-rodrigoularte.herokuapp.com/users")
      .then((res => { setAllUsers(res.data) }))
      .catch((error) => { console.log(error.response.data) })
  }

  const getSum = async () => {
    await axios
      .get("https://case-cubo-rodrigoularte.herokuapp.com/sum")
      .then((res => { setSum(res.data.sum) }))
      .catch((error) => { console.log(error.response.data) })
  }

  const deleteAllUsers = async () => {
    if(window.confirm("Are you shure? All data will be deleted.")) {
      await axios
        .delete("https://case-cubo-rodrigoularte.herokuapp.com/users")
        .then(((res) => {
          alert(res.data.message)
          window.location.reload()
        }))
        .catch((error) => { console.log(error.response.data) })
    } else {
      alert("Canceled.")
    }
  }

  const onSubmitForm = (event) => {
    event.preventDefault()

    if ((participation + sum) <= 100) {
      createUser()
    } else if(sum === 100) {
      setErrorMessage(`The participation count has already reached 100%. Clear the table to proceed.`)
      setShowMessage(true)
    } else {
      setErrorMessage(`The final sum cannot be greater than 100. Choose a number less than or equal to ${100 - sum}.`)
      setShowMessage(true)
    }
  }

  const data = [
    ["Name", "Participation"]
  ]

  allUsers.length > 0 && allUsers.map((user) => {
    data.push([`${user.first_name} ${user.last_name}`, user.participation])
  })

  const options = {
    pieHole: 0.4
  }

  useEffect(() => {
    getAllUsers()
    getSum()
  }, [])

  return (
    <Page>
      <GlobalStyle />
      <Header
        firstName={firstName}
        lastName={lastName}
        participation={participation}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setParticipation={setParticipation}
        onSubmitForm={onSubmitForm}
        showMessage={showMessage}
        errorMessage={errorMessage}
      />

      {allUsers.length > 0 ?
        <h1>Participation Data</h1> :
        <h1>No Participation Data</h1>
      }

      <DataContainer>
        {allUsers.length > 0 &&
          <TableContainer>
            <Table
              allUsers={allUsers}
            />
            <ButtonContainer>
              <DeleteButton onClick={deleteAllUsers}>Clear table</DeleteButton>
            </ButtonContainer>
          </TableContainer>
        }

        {allUsers.length > 0 &&
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"40vw"}
            height={"300px"}
          />
        }
      </DataContainer>
    </Page>
  )
}

export default HomePage