import React, {Component} from 'react'
import {DayOffCell, Holiday, Td, TodayNumber} from './styled-components'
import {observer} from 'mobx-react'
import NumberMonth from './NumberMonth'
import moment from 'moment/moment'
import holidays from '../store/holidays'

@observer
class Week extends Component {

    checkHolidays = (dayInfo,day) => {
        const {getNumberDayOfWeek,removeNumberDay} =this.props.store
        const numDay = getNumberDayOfWeek(removeNumberDay(dayInfo))
        for (let i = 0; i < holidays.length; ++i) {
            const holiday = holidays[i]
            if (holiday.startDate === day) {
                console.log(`${holiday.name} ${numDay}`)
                return (<Holiday numDay={numDay === 0 ? 7 : numDay}>{holiday.name}</Holiday>)
            }
        }
    }

    render() {
        const {week, today} = this.props
        const {isFocusAtMonth, getOnlyDay, removeNumberDay, isWeekend} = this.props.store
        return (
            <tr>
                {week.map(dayInfo => {
                    const day = moment(removeNumberDay(dayInfo), 'MMMM Do YYYY dddd').format('DD.MM.YYYY')
                    const isFocus = isFocusAtMonth(dayInfo)
                    const isToday = removeNumberDay(dayInfo) === today

                    return isWeekend(dayInfo) ?
                        <DayOffCell id={dayInfo} key={dayInfo}>
                            {this.checkHolidays(dayInfo,day)}
                            <NumberMonth day={day} isFocus={isFocus}/>
                        </DayOffCell> :
                        isToday ?
                            <Td id={dayInfo} key={dayInfo}>
                                {this.checkHolidays(dayInfo,day)}
                                <TodayNumber number={day}>{day}</TodayNumber>
                            </Td>
                            :
                            <Td id={dayInfo} key={dayInfo}>
                                {this.checkHolidays(dayInfo,day)}
                                <NumberMonth day={day} isFocus={isFocus}/>
                            </Td>

                })}
            </tr>
        )
    }
}

Week.propTypes = {}

export default Week
