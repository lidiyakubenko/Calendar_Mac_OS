import React, {Component} from 'react'
import {DayOfTheWeek, Th} from './styled-components'

class DaysOfTheWeek extends Component {
    render() {
        return (
            <tbody>
            <tr>
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
            </tr>
            </tbody>
        )
    }
}

DaysOfTheWeek.propTypes = {}

export default DaysOfTheWeek
