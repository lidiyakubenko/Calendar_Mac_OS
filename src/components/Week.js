import React, {Component} from 'react'
import {DayOffCell, NotCurrNumber, TodayNumber, Number, Td} from './styled-components'
import moment from 'moment'

class Week extends Component {
    componentDidUpdate() {
        const {week} = this.props
    }

    getMonthAndYear = () => {

    }

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

    assignCurrMonthRef = day => {
        const {today} = this.props
        const ref = this.props.currentMonth
        const currMonth = moment(today, 'MMMM Do YYYY dddd').format('MMMM')
        return day.includes(`${currMonth} 1-`) ? ref : ''
    }


    isCurrMonth = day => {
        const {today} = this.props
        const currMonth = moment(today, 'MMMM Do YYYY dddd').format('MMMM')
        return  day.includes(`${currMonth}`)
    }

    render() {
        const {week, today,isFocus} = this.props
        return (
            <tr>
                {week.map((day, i) => {
                    return this.isWeekend(day) ?
                        <DayOffCell ref={this.assignCurrMonthRef(day)} key={i}>
                            {!isFocus? <Number>{this.getOnlyDay(day)}</Number> : this.isCurrMonth(day) ?
                                <Number>{this.getOnlyDay(day)}</Number>:
                                <NotCurrNumber>{this.getOnlyDay(day)}</NotCurrNumber>
                            }

                        </DayOffCell> :
                        this.removeNumberDay(day) === today ?
                            <Td ref={this.assignCurrMonthRef(day)} key={i}>
                                    <TodayNumber number={this.getOnlyDay(day)}>{this.getOnlyDay(day)}</TodayNumber>
                            </Td>
                            :
                            <Td ref={this.assignCurrMonthRef(day)} key={i}>
                                {!isFocus? <Number>{this.getOnlyDay(day)}</Number> : this.isCurrMonth(day) ?
                                    <Number>{this.getOnlyDay(day)}</Number>:
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
