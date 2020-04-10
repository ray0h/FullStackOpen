import React from 'react'

const NewInput = ({ text, newValue, changeHandler}) => {
    return (
        <div>
            {text}:
            <input 
                value = {newValue}
                onChange = {changeHandler}
            />
        </div>
    )
}

const NewPerson = ({ submitHandler, nameValue, nameHandler, numberValue, numberHandler }) => {
    return (
        <form className="personForm" onSubmit={submitHandler}>
            <NewInput text="name" newValue={nameValue} changeHandler={nameHandler}/>
            <NewInput text="number" newValue={numberValue} changeHandler={numberHandler}/>
            <div>
                <button type="submit">
                    Add
                </button>
            </div>
        </form>
    )
}

export default NewPerson
