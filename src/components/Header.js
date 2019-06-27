import React, {Component} from 'react'
import {Header, YearAndButtons} from './styled-components'
import DaysOfTheWeek from './DaysOfTheWeek'
import Buttons from './Buttons'
import CurrentDate from './CurrentDate'

class Header extends Component {
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

Header.propTypes = {}

export default Header
