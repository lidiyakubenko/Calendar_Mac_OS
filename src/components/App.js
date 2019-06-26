import React, {Component} from 'react'
import {Header, Main, Table, YearAndButtons} from './styled-components'
import {observer} from 'mobx-react'
import Week from './Week'
import DaysOfTheWeek from './DaysOfTheWeek'
import Buttons from './Buttons'
import CurrentDate from './CurrentDate'
import _ from 'lodash'

const headerHeight = 76

const scrollToRef = ref => {
    window.scrollTo(0, ref.current.offsetTop - headerHeight)
}

@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFocus: false,
        }
        this.currentMonth = React.createRef()
        this.handleScroll = _.debounce(this.handleScroll.bind(this), 100)
    }


    executeScroll = ref => scrollToRef(ref)

    componentWillMount() {
        this.props.store.addDays()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.executeScroll(this.currentMonth)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(e) {
        const monthHeight = this.currentMonth.current.offsetTop - headerHeight
        const docHeight = Number(document.documentElement.scrollTop.toFixed(0))
        if (docHeight > monthHeight - 100  && docHeight < monthHeight + 100) {
            this.setState({isFocus: true})
        }
        else {
            this.setState({isFocus: false})
        }
        console.log(docHeight)
    }

    render() {
        const {store} = this.props
        return (
            <Main>
                <div onScroll={this.handleScroll} id='scroll'>
                    <Header>
                        <YearAndButtons>
                            <CurrentDate/>
                            <Buttons
                                myRef={this.currentMonth}
                                executeScroll={this.executeScroll}
                            />
                        </YearAndButtons>
                        <table>
                            <DaysOfTheWeek/>
                        </table>
                    </Header>
                    <Table>
                        <tbody>
                        {
                            store.formattedDays.map((week, i) => (
                                <Week
                                    key={i}
                                    week={week}
                                    currentMonth={this.currentMonth}
                                    today={store.today}
                                isFocus={this.state.isFocus}
                                />
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
            </Main>
        )
    }
}

export default App
