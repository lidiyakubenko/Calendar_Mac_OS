import React, {Component} from 'react'
import {DayOfTheWeek, Th} from './styled-components'

class DaysOfTheWeek extends Component {
    render() {
        return (
         <div style={{display:'flex'}}>
                <Th>
                    <DayOfTheWeek>пн</DayOfTheWeek>
                </Th>
                <Th>
                    <DayOfTheWeek>вт</DayOfTheWeek>
                </Th>
                <Th>
                    <DayOfTheWeek>ср</DayOfTheWeek>
                </Th>
                <Th>
                    <DayOfTheWeek>чт</DayOfTheWeek>
                </Th>
                <Th>
                    <DayOfTheWeek>пт</DayOfTheWeek>
                </Th>
                <Th style={{color: 'grey'}}>
                    <DayOfTheWeek>сб</DayOfTheWeek>
                </Th>
                <Th style={{color: 'grey'}}>
                    <DayOfTheWeek>вс</DayOfTheWeek>
                </Th>
         </div>
        )
    }
}

DaysOfTheWeek.propTypes = {}

export default DaysOfTheWeek
