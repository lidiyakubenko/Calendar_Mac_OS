import React, {Component} from 'react'
import {DayOfTheWeek, Table, Td,Th, Number, TodayNumber} from './styled-components'

class App extends Component {
    render() {
        return (
            <div style={{margin:'auto',width:760}}>
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
                    </tr>
                    <tr>
                        <Td>
                         <TodayNumber number={5}>5</TodayNumber>
                        </Td>
                        <Td>
                            <Number>6</Number>
                        </Td>
                        <Td>
                            <Number>7</Number>
                        </Td>
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
            </div>
        )
    }
}

export default App
