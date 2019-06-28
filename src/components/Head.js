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
        const month = months.reduce((accum,month)=>
           accum ? accum : monthsControl[month].isFocus ? month : false ,false)
        return (
            <Header>
                <YearAndButtons>
                    {month ? <CurrentDate date={month}/>
                            :
                        <CurrentDate date='январь 2019'/>
                    }
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
