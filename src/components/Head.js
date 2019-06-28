import React, {Component} from 'react'
import {Header, YearAndButtons} from './styled-components'
import DaysOfTheWeek from './DaysOfTheWeek'
import Buttons from './Buttons'
import CurrentDate from './CurrentDate'
import {observer} from 'mobx-react'


@observer
class Head extends Component {
    render() {
        
        return (
            <Header>
                <YearAndButtons>
                    <CurrentDate/>
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
