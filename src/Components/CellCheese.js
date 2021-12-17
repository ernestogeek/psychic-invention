import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheese } from '@fortawesome/free-solid-svg-icons'
import cheese from './cheese.png'

export const CellCheese = ({row,col}) => {
    return (
        <div className="square" id={`${row}-${col}`}>
             <img src={cheese} className="rat" alt="" />
        </div>
    )
}
