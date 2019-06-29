import React, {Component} from 'react'
import {DayOffCell, Holiday, NameEmployee, Td, TodayNumber} from './styled-components'
import {observer} from 'mobx-react'
import NumberMonth from './NumberMonth'
import moment from 'moment'
import holidays from '../store/holidays'

@observer
class Week extends Component {

    cutName = name => {
        return `${name.substring(0, 10)}...`
    }

    diffDates = (a, b) => {
        return moment(a, 'DD.MM.YYYY').diff(moment(b, 'DD.MM.YYYY'), 'days')
    }

    getFormatDate = date => {
        return moment(date, 'MMMM Do YYYY dddd').format('DD.MM.YYYY')
    }

    checkHolidays = dayInfo => {
        const {getNumberDayOfWeek, removeNumberDay} = this.props.store
        const day = this.getFormatDate(removeNumberDay(dayInfo))
        let numDay = getNumberDayOfWeek(removeNumberDay(dayInfo))
        const weekLength = 7
        let components = []
        numDay = numDay === 0 ? 7 : numDay

        for (let i = 0; i < holidays.length; ++i) {
            const holiday = holidays[i]
            let fromFirst = this.diffDates(day, holiday.startDate)
            let fromLast = this.diffDates(holiday.endDate, day)
            let lengthHolidays = this.diffDates(holiday.endDate, holiday.startDate)

            if (fromFirst === 0) {
                components = [...components,
                    (margin) =>
                        <Holiday margin={margin}
                                 numDay={lengthHolidays < weekLength ? lengthHolidays : weekLength - numDay}
                                 key={holiday.name}>
                            <NameEmployee> {numDay === 7 ? this.cutName(holiday.name) : holiday.name}</NameEmployee>
                        </Holiday>
                ]

            }
            if (numDay === 1 && fromFirst > 0 && fromLast > 0) {
                components = [...components,
                    (margin) =>
                        <Holiday margin={margin} numDay={fromLast >= 6 ? weekLength - 1 : fromLast} key={holiday.name}>
                            <NameEmployee> {numDay === 7 ? this.cutName(holiday.name) : holiday.name}</NameEmployee>
                        </Holiday>]
            }
        }
        return components.map((comp, i) => i === 0 ? comp(0) : comp(i + 3))
    }

    render() {
        const {week, today} = this.props
        const {isFocusAtMonth, removeNumberDay, isWeekend} = this.props.store
        return (
            <tr>
                {week.map(dayInfo => {
                    const day = moment(removeNumberDay(dayInfo), 'MMMM Do YYYY dddd').format('DD.MM.YYYY')
                    const isFocus = isFocusAtMonth(dayInfo)
                    const isToday = removeNumberDay(dayInfo) === today
                    console.log(isToday)
                    return isWeekend(dayInfo) ?
                        <DayOffCell id={dayInfo} key={dayInfo}>
                            {this.checkHolidays(dayInfo, day)}
                            <NumberMonth day={day} isFocus={isFocus}/>
                        </DayOffCell> :
                        isToday ?
                            <Td id={dayInfo} key={dayInfo}>
                                {this.checkHolidays(dayInfo, day)}
                                <TodayNumber number={day}>{day}</TodayNumber>
                            </Td>
                            :
                            <Td id={dayInfo} key={dayInfo}>
                                {this.checkHolidays(dayInfo, day)}
                                <NumberMonth day={day} isFocus={isFocus}/>
                            </Td>

                })}
            </tr>
        )
    }
}

Week.propTypes = {}

export default Week
