import React, {Component} from 'react'
import {DayOffCell, NotCurrNumber, Number, Td, TodayNumber} from './styled-components'
import moment from 'moment'
import {observer} from 'mobx-react'


@observer
class Week extends Component {
    removeNumberDay = day => {
        const index = day.indexOf(' numberDay')
        return day.substring(0, index)
    }

    isWeekend = day => {
        return day.includes('numberDay:6') || day.includes('numberDay:0')
    }

    getOnlyDay = day => {
        return moment(day, 'MMMM Do YYYY dddd').format('DD')
    }


    render() {
        const {week, today} = this.props
        const {isFocusAtMonth} = this.props.store
        return (
            <tr>
                {week.map(day => {
                    return this.isWeekend(day) ?
                        <DayOffCell id={day} key={day}>
                            {isFocusAtMonth(day) ?
                                <Number>{this.getOnlyDay(day)}</Number> :
                                <NotCurrNumber>{this.getOnlyDay(day)}</NotCurrNumber>
                            }

                        </DayOffCell> :
                        this.removeNumberDay(day) === today ?
                            <Td id={day} key={day}>
                                <TodayNumber number={this.getOnlyDay(day)}>{this.getOnlyDay(day)}</TodayNumber>
                            </Td>
                            :
                            <Td id={day} key={day}>
                                {isFocusAtMonth(day) ?
                                    <Number>{this.getOnlyDay(day)}</Number> :
                                    <NotCurrNumber>{this.getOnlyDay(day)}</NotCurrNumber>
                                }
                            </Td>

                })}
            </tr>
        )
    }
}

Week.propTypes = {}

export default Week
