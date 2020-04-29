import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {

    const [vis, setVis]=useState(false)
    const showWhenVisible = {
        display: vis ? '' : 'none' }
    const hideWhenVisible = {
        display: vis ? 'none' : '' }
    const handleVisibility = () => {
        setVis(!vis)
    }
    useImperativeHandle (ref, () => {
        return {
            handleVisibility
        }
    })

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    return (
        <div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={handleVisibility}>Cancel</button>
            </div>
            <div style={hideWhenVisible}>
                <button onClick={handleVisibility}>{props.buttonLabel}</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable