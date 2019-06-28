import React, {Component} from 'react'
import {Month, Year} from './styled-components'
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
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <Month>{this.getOnlyMonth(date)} </Month>
                <Year> {this.getOnlyYear(date)}</Year>
                <Month>г.</Month>
            </div>
        )
    }
}

CurrentDate.propTypes = {}

export default CurrentDate
