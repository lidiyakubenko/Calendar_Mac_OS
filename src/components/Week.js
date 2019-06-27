import React, {Component} from 'react'
import {DayOffCell, Td, TodayNumber} from './styled-components'
import {observer} from 'mobx-react'
import NumberMonth from './NumberMonth'


@observer
class Week extends Component {
    render() {
        const {week, today} = this.props
        const {isFocusAtMonth, getOnlyDay} = this.props.store
        return (
            <tr>
                {week.map(dayInfo => {
                    const day = getOnlyDay(dayInfo)
                    const isFocus = isFocusAtMonth(dayInfo)
                    const isToday = this.removeNumberDay(dayInfo) === today
                    
                    return this.isWeekend(dayInfo) ?
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
