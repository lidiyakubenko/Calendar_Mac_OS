import React, {Component} from 'react'
import {Year,Month,Header,ArrowButton, Main, Button, DayOfTheWeek, Table, Td, Th, Number, TodayNumber, DayOffCell} from './styled-components'
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

class App extends Component {
    render() {
        return (
            <Main>
                <Header>
                    <div style={{display:'flex',alignItems:'flex-end'}}> <Month>апрель </Month> <Year> 2019</Year> <Month>г.</Month> </div>
                    <div style={{display:'flex'}}>
                        <ArrowButton>
                            <MdKeyboardArrowLeft/>
                        </ArrowButton>
                        <Button>Сегодня</Button>
                        <ArrowButton>
                           <MdKeyboardArrowRight/>
                        </ArrowButton>

                    </div>
                </Header>
                <Table>
                    <tbody>
                    <tr>
                        <Th>
                            <DayOfTheWeek>пн</DayOfTheWeek>
                        </Th>
                        <Th>
                            <DayOfTheWeek>вт</DayOfTheWeek>
                        </Th>
                        <Th>
                            <DayOfTheWeek>ср</DayOfTheWeek>
                        </Th>
                        <Th>
                            <DayOfTheWeek>чт</DayOfTheWeek>
                        </Th>
                        <Th>
                            <DayOfTheWeek>пт</DayOfTheWeek>
                        </Th>
                        <Th style={{color:'grey'}}>
                            <DayOfTheWeek>сб</DayOfTheWeek>
                        </Th>
                        <Th style={{color:'grey'}}>
                            <DayOfTheWeek>вс</DayOfTheWeek>
                        </Th>
                    </tr>
                    <tr>
                        <Td>
                            <Number number={5}>1 апр.</Number>
                        </Td>
                        <Td>
                            <Number>2</Number>
                        </Td>
                        <Td>
                            <Number>3</Number>
                        </Td>
                        <Td>
                            <Number>4</Number>
                        </Td>
                        <Td>
                            <Number>5</Number>
                        </Td>
                        <DayOffCell>
                            <Number>6</Number>
                        </DayOffCell>
                        <DayOffCell>
                            <Number>7</Number>
                        </DayOffCell>
                    </tr>
                    <tr>
                        <Td>
                            <Number>8</Number>
                        </Td>
                        <Td>
                            <Number>9</Number>
                        </Td>
                        <Td>
                            <TodayNumber number={10}>10</TodayNumber>
                        </Td>
                    </tr>

                    </tbody>
                </Table>
            </Main>
        )
    }
}

export default App
