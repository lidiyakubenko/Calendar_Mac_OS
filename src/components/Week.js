import React, {Component} from 'react'
import {DayOffCell,TodayNumber, Number, Td} from './styled-components'
import moment from 'moment'

class Week extends Component {
    render() {
        const {week,myRef} = this.props
        const arr = week.length < 7 ? new Array(7 - week.length) : null
        const requireFormat = 'MMMM Do YYYY dddd'
        const getDayOfTheMonth = day => moment(day, requireFormat).format('DD')
        console.log(week[0].includes('апрель 1-го'))
        return (
            <tr ref={ week[0].includes('апрель 1-го') ? myRef : ''}>
                {
                    arr ? arr.map((a, i) => <Td key={i}/>) : null
                }
                {week.map((day, i) => {
                    return day.includes('numberDay:6') || day.includes('numberDay:0') ?
                        <DayOffCell key={i}>
                            <Number>{getDayOfTheMonth(day)}</Number>
                        </DayOffCell> :
                        day.substring(0,day.indexOf(' numberDay')) === moment().format('MMMM Do YYYY dddd') ?
                            <Td key={i}>
                                <TodayNumber number={getDayOfTheMonth(day)}>{getDayOfTheMonth(day)}</TodayNumber>
                            </Td>
                            :
                            <Td key={i}>
                                <Number>{getDayOfTheMonth(day)}</Number>
                            </Td>

                })}
            </tr>
        )
    }
}

Week.propTypes = {}

export default Week
