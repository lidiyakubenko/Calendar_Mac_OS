import React, {Component} from 'react'
import {Header, YearAndButtons} from './styled-components'
import DaysOfTheWeek from './DaysOfTheWeek'
import Buttons from './Buttons'
import CurrentDate from './CurrentDate'
import {observer} from 'mobx-react'


@observer
class Head extends Component {
    render() {
        const {monthsControl} = this.props
        const months = Object.keys(monthsControl)
        return (
            <Header>
                <YearAndButtons>
                    {months.map((month,i)=>(
                        monthsControl[month].isFocus ?
                            <CurrentDate key={i} date={month}/>
                            :
                            null
                    ))}
                    <Buttons/>
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
