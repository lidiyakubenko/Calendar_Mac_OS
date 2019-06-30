import React, {Component} from 'react'
import {NotCurrNumber, Number, TodayNumber} from './styled-components'
import {observer} from 'mobx-react'


@observer
class Day extends Component {
    render() {
        const {day, dayInfo, isToday, isFocus, checkVacation} = this.props
        return (
            <React.Fragment>
                {isToday ? <TodayNumber number={day}>{day}</TodayNumber> :
                    isFocus ?
                        <Number>{day}</Number> :
                        <NotCurrNumber>{day}</NotCurrNumber>
                }
                {checkVacation(dayInfo)}
            </React.Fragment>
        )
    }
}

Day.propTypes = {}

export default Day
