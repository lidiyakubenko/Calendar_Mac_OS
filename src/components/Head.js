import React, {Component} from 'react'
import {Header, YearAndButtons} from './styled-components'
import DaysOfTheWeek from './DaysOfTheWeek'
import Buttons from './Buttons'
import CurrentDate from './CurrentDate'
import {observer} from 'mobx-react'


@observer
class Head extends Component {
    render() {
        const {monthsControl,scrollToCurrMonth,scrollToNextMonth,scrollToLastMonth} = this.props.store
        const months = Object.keys(monthsControl)
        const focusMonth = months.reduce((accum,month)=>
           accum ? accum : monthsControl[month].isFocus ? month : false ,false)
        return (
            <Header>
                <YearAndButtons>
                    {focusMonth ? <CurrentDate date={focusMonth}/>
                            :
                        <CurrentDate date='январь 2019'/>
                    }
                    <Buttons
                        focusMonth={focusMonth}
                        scrollToLastMonth={scrollToLastMonth}
                        scrollToNextMonth={scrollToNextMonth}
                        scrollToCurrMonth={scrollToCurrMonth}
                    />
                </YearAndButtons>
                <table>
                    <DaysOfTheWeek/>
                </table>
            </Header>
        )
    }
}

Head.propTypes = {}

export default Head
