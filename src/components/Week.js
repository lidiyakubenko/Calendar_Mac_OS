import React, {Component} from 'react'
import {DayOffCell, Vacation, NameEmployee, Td, TopDate, Tr} from './styled-components'
import {observer} from 'mobx-react'
import Day from './Day'
import moment from 'moment'
import vacation from '../store/vacation'
import CurrentDate from './CurrentDate'
import {getMonthAndYear, getNumberDayOfWeek, isFirstDayMonth, isWeekend, removeNumberDay} from '../store/help-functions'

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

    checkVacation = dayInfo => {
        const day = this.getFormatDate(removeNumberDay(dayInfo))
        let numDay = getNumberDayOfWeek(removeNumberDay(dayInfo))
        const weekLength = 7
        let components = []
        numDay = numDay === 0 ? 7 : numDay

        for (let i = 0; i < vacation.length; ++i) {
            const holiday = vacation[i]
            let fromFirst = this.diffDates(day, holiday.startDate)
            let fromLast = this.diffDates(holiday.endDate, day)
            let lengthVacation = this.diffDates(holiday.endDate, holiday.startDate)

            if (fromFirst === 0) {
                components = [...components,
                    (margin) =>
                        <Vacation margin={margin}
                                  numDay={lengthVacation < weekLength ? lengthVacation : weekLength - numDay}
                                  key={holiday.name}>
                            <NameEmployee> {numDay === 7 ? this.cutName(holiday.name) : holiday.name}</NameEmployee>
                        </Vacation>
                ]

            }
            if (numDay === 1 && fromFirst > 0 && fromLast > 0) {
                components = [...components,
                    () =>
                        <Vacation margin={0} numDay={fromLast >= 6 ? weekLength - 1 : fromLast} key={holiday.name}>
                            <NameEmployee> {numDay === 7 ? this.cutName(holiday.name) : holiday.name}</NameEmployee>
                        </Vacation>]
            }
        }
        return components.map((comp, i) => comp(i + 3))
    }


    render() {
        const {week,isScrolling} = this.props
        const {isFocusAtMonth,today} = this.props.store
        const monthAndYear = week.reduce((accum, day) => {
                const date = removeNumberDay(day)
                return accum ? accum : isFirstDayMonth(date) ? getMonthAndYear(date) : false
            }, false
        )
        return (
            <Tr>
                {monthAndYear ?
                    <TopDate isScrolling={isScrolling}>
                        <CurrentDate date={monthAndYear}/>
                    </TopDate> : <TopDate isScrolling={false}/>
                }
                {week.map(dayInfo => {
                    const day = moment(removeNumberDay(dayInfo), 'MMMM Do YYYY dddd').format('D')
                    // const isFocus = isFocusAtMonth(dayInfo)
                    const isToday = removeNumberDay(dayInfo) === today.full

                    return isWeekend(dayInfo) ?
                        <DayOffCell id={dayInfo} key={dayInfo}>
                            <Day day={day}
                                 dayInfo={dayInfo}
                                 isToday={isToday}
                                 isFocus={true}
                                 checkVacation={this.checkVacation}
                            />
                        </DayOffCell> :
                        <Td id={dayInfo} key={dayInfo}>
                            <Day day={day}
                                 dayInfo={dayInfo}
                                 isToday={isToday}
                                 isFocus={true}
                                 checkVacation={this.checkVacation}
                            />
                        </Td>
                })}
            </Tr>
        )
    }
}

Week.propTypes = {}

export default Week
