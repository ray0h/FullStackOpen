import React, { useState, useEffect } from "react"
import './index.css'
import Filter from "./filter.js"
import NewPerson from "./addNewPerson.js"
import People from "./people.js"
import personService from "./services/persons.js"

const Message = ({message, errorMsg}) => {
    if (errorMsg) {
        return <div className="msgCont error">{message}</div>
    } else {
        return <div className="msgCont">{message}</div>
    }
}

const App = () => {

    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState("")
    const [ newNumber, setNewNumber] = useState("")
    const [ searchStr, setSearchStr] = useState("")
    const [ message, setMessage ] = useState("")
    const [ errorMsg, setErrorMsg ] = useState(false)

    useEffect( () => {
        personService
            .getAll()
            .then((ppl) => {
                setPersons(ppl)
            })
    }, [])

    const handleNewName = (e) => setNewName(e.target.value)
    const handleNewNumber = (e) => setNewNumber(e.target.value)
    const handleSearchStr = (e) => setSearchStr(e.target.value)
    const handleDel = (e) => {
        let name = e.target.value
        let id = persons.find(p => p.name === name).id
        let delPerson = window.confirm(`Confirm deleting ${name}?`)
        if (delPerson) { 
            personService
                .erase(id)
                .then(setPersons(persons.filter(each => each.id !== id)))
                .then( () =>
                    {setErrorMsg(false)
                    setMessage(`${name} was deleted from the phonebook.`)
                    setTimeout( () => {setMessage("")}, 4000)}
                )
        }
    }

    const addPerson = (e) => {
        e.preventDefault()
        const currentNames = persons.map(each => each.name)
        const currentNums = persons.map(each => each.number)
        if (!currentNames.includes(newName)) {
            const newPerson = {
                name: newName,
                number: newNumber,
            }
            personService
                .create(newPerson)
                .then(newPeep => {
                    setPersons(persons.concat(newPeep))
                    setNewName("")
                    setNewNumber("")
                })
                .then( () => {
                    setErrorMsg(false)
                    setMessage(`${newName} was added to the phonebook.`)
                    setTimeout( () => {setMessage("")}, 4000)
                })
                .catch(error => {
                    setMessage(error.response.data.error) // this is the string
                    setErrorMsg(true)
                    setTimeout( () => {setMessage("")}, 4000)
                })
        } else if (currentNames.includes(newName) && !currentNums.includes(newNumber)) {
            let id = persons.find(each => (each.name === newName)).id
            let updateNum = window.confirm(`Update ${newName}'s number?`)
            if (updateNum) {
                let person = persons.find(each => each.id === id)
                let updPerson = {...person, number : newNumber }
                personService   
                    .update(id, updPerson)
                    .then(returnedPeep => {
                        setPersons(persons.map(each => (each.id !== id) ? each : returnedPeep))
                        setMessage(`${newName}'s number has been updated.`)
                        setTimeout( () => {setMessage("")}, 4000)
                        setErrorMsg(false)
                    })
                    .catch(error => {
                        setMessage(`${newName} was already removed from the server`)
                        setTimeout( () => {setMessage("")}, 4000)
                        setPersons(persons.filter(each => each.id !== id))
                        setErrorMsg(true)
                    }
                )    
            }
        } else {
            setMessage(`${newName} is already in the phonebook!`)
            setErrorMsg(true)
            setTimeout( () => {setMessage("")}, 4000)
        }
    }
    var regEx = new RegExp("^"+searchStr)
    const personsToShow = (searchStr !== "") ? persons.filter(each => each.name.match(regEx)) : persons

    return (
        <div className="mainCont">
            <div className="secondCont">
            <div className="decCont">
                <h2>Phonebook</h2>
                <Filter search = {searchStr} changeHandler = {handleSearchStr}/>
                <Message message={message} errorMsg={errorMsg} />
            </div>
            <div className="decCont">    
                <h2>Add a New Person</h2>
                <NewPerson submitHandler={addPerson} nameValue={newName} nameHandler={handleNewName} numberValue={newNumber} numberHandler={handleNewNumber} />
            </div>    
            <div className="decCont">  
                <h2>Numbers</h2>
                <People persons = {personsToShow} delHandler={handleDel}/>
            </div>
            </div>
        </div>
    )
}

export default App