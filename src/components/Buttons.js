import React, {Component} from 'react'
import {ArrowButton, Button} from './styled-components'
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

class Buttons extends Component {
    render() {
        const {myRef,executeScroll} =this.props
        return (
            <div style={{display: 'flex'}}>
                <ArrowButton>
                    <MdKeyboardArrowLeft/>
                </ArrowButton>
                <Button onClick={() => executeScroll(myRef)}>Сегодня</Button>
                <ArrowButton>
                    <MdKeyboardArrowRight/>
                </ArrowButton>
            </div>
        )
    }
}

Buttons.propTypes = {}

export default Buttons
