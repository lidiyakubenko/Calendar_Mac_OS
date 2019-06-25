import React, {useRef, useEffect,useState} from 'react'
import {
    ArrowButton,
    Button,
    DayOffCell,
    DayOfTheWeek,
    Header,
    Main,
    Month,
    Number,
    Table,
    Td,
    Th,
    TodayNumber,
    Year,
    YearAndButtons
} from './styled-components'
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'


const scrollToRef = ref => {
    const headerHeight = 80
    window.scrollTo(0, ref.current.offsetTop - headerHeight)
}


const App = () => {

    const myRef = useRef(null)

    const myRef2 = useRef(null)

    const executeScroll = ref => scrollToRef(ref)

    useEffect(() => executeScroll(myRef))

    const handleScroll = e =>{

        console.log(e)

    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <Main>
            <div onScroll={handleScroll} id='scroll'>
            <Header>
                <YearAndButtons>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                        <Month>апрель </Month>
                        <Year> 2019</Year>
                        <Month>г.</Month>
                    </div>
                    <div style={{display: 'flex'}}>
                        <ArrowButton>
                            <MdKeyboardArrowLeft/>
                        </ArrowButton>
                        <Button onClick={() => executeScroll(myRef)}>Сегодня</Button>
                        <ArrowButton>
                            <MdKeyboardArrowRight/>
                        </ArrowButton>
                    </div>
                </YearAndButtons>
                <table ref={myRef}>
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
                        <Th style={{color: 'grey'}}>
                            <DayOfTheWeek>сб</DayOfTheWeek>
                        </Th>
                        <Th style={{color: 'grey'}}>
                            <DayOfTheWeek>вс</DayOfTheWeek>
                        </Th>
                    </tr>
                    </tbody>
                </table>
            </Header>
            <Table>
                <tbody>
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
            <div style={{marginTop:1000}} ref={myRef2}>dd</div>
            </div>
        </Main>
    )
}
export default App
