import React from "react"

const Filter = ( { search, changeHandler }) => {
    return (
        <form className="filterForm">
            <div>
                search list for name:
                <input 
                    value={search}
                    onChange={changeHandler}
                />
            </div>
        </form>
    )
}
export default Filter