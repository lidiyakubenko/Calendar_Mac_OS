import React, {Component} from 'react'
import {Month, TopDateFixed, Year} from './styled-components'
import {observer} from 'mobx-react'
import moment from 'moment/moment'


@observer
class CurrentDate extends Component {

    getOnlyMonth = day => {
        return moment(day, 'MMMM YYYY').format('MMMM')
    }

    getOnlyYear = day => {
        return moment(day, 'MMMM YYYY').format('YYYY')
    }

    render() {
        const {date} = this.props
        return (
            <TopDateFixed>
                <Month>{this.getOnlyMonth(date)} </Month>
                <Year> {this.getOnlyYear(date)}</Year>
                <Month>г.</Month>
            </TopDateFixed>
        )
    }
}

CurrentDate.propTypes = {}

export default CurrentDate
