import React, {Component} from 'react'
import {DayOffCell, Td, TodayNumber} from './styled-components'
import {observer} from 'mobx-react'
import NumberMonth from './NumberMonth'
import moment from 'moment/moment'


@observer
class Week extends Component {
    render() {
        const {week, today} = this.props
        const {isFocusAtMonth, getOnlyDay,removeNumberDay,isWeekend} = this.props.store
        return (
            <tr>
                {week.map(dayInfo => {
                    const day = moment(removeNumberDay(dayInfo),'MMMM Do YYYY dddd').format('DD-MM-YY')
                    const isFocus = isFocusAtMonth(dayInfo)
                    const isToday = removeNumberDay(dayInfo) === today

                    return isWeekend(dayInfo) ?
                        <DayOffCell id={dayInfo} key={dayInfo}>
                            <NumberMonth day={day} isFocus={isFocus}/>
                        </DayOffCell> :
                        isToday ?
                            <Td id={dayInfo} key={dayInfo}>
                                <TodayNumber number={day}>{day}</TodayNumber>
                            </Td>
                            :
                            <Td id={dayInfo} key={dayInfo}>
                                <NumberMonth day={day} isFocus={isFocus}/>
                            </Td>

                })}
            </tr>
        )
    }
}

Week.propTypes = {}

export default Week
