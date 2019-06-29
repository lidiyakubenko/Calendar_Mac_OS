import React, {Component} from 'react'
import {ArrowButton, Button} from './styled-components'
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

class Buttons extends Component {
    render() {
        const {focusMonth, scrollToCurrMonth, scrollToLastMonth, scrollToNextMonth} = this.props
        return (
            <div style={{display: 'flex'}}>
                <ArrowButton onClick={() => scrollToLastMonth(focusMonth)}>
                    <MdKeyboardArrowLeft/>
                </ArrowButton>
                <Button onClick={scrollToCurrMonth}>Сегодня</Button>
                <ArrowButton onClick={() => scrollToNextMonth(focusMonth)}>
                    <MdKeyboardArrowRight/>
                </ArrowButton>
            </div>
        )
    }
}

Buttons.propTypes = {}

export default Buttons
