import React, {Component} from 'react'
import {Month, Year} from './styled-components'

class CurrentDate extends Component {
    render() {
        return (
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <Month>апрель </Month>
                <Year> 2019</Year>
                <Month>г.</Month>
            </div>
        )
    }
}

CurrentDate.propTypes = {}

export default CurrentDate
