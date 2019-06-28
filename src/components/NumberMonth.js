import React, {Component} from 'react'
import {NotCurrNumber, Number} from './styled-components'
import {observer} from 'mobx-react'


@observer
class NumberMonth extends Component {
    render() {
        const {day,isFocus} = this.props
        return (
            isFocus ?
                <Number>{day}</Number> :
                <NotCurrNumber>{day}</NotCurrNumber>

        )
    }
}

NumberMonth.propTypes = {}

export default NumberMonth
