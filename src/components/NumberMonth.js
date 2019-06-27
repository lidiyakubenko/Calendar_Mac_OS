import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NotCurrNumber, Number} from './styled-components'

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
