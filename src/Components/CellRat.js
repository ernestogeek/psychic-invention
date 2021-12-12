import React from 'react'
import rat from './rat.png'
export const CellRat = ({row, col}) => {
    return (
        < div className="square" id={`${row}-${col}`}>
            <img src={rat} className="rat" alt=""/>
        </div>
    )
}
