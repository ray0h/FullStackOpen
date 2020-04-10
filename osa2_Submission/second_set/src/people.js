import React from "react"

const Person = ({ name, number, delHandler}) => {

    return (
        <div className = "entryCont">
            <p>{name}, {number}</p>
            <button value = {name} onClick={delHandler}>delete</button>
        </div>
)}
const People = ({ persons, delHandler }) => persons.map(each => <Person key={each.id} name={each.name} number={each.number} delHandler={delHandler}/>)

export default People