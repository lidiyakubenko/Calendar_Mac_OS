import React, {Component} from 'react'
import {Header, Main, Table, YearAndButtons} from './styled-components'
import {observer} from 'mobx-react'
import Week from './Week'
import DaysOfTheWeek from './DaysOfTheWeek'
import Buttons from './Buttons'
import CurrentDate from './CurrentDate'
import _ from 'lodash'


@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.handleScroll = _.debounce(this.handleScroll.bind(this), 300)
    }


    componentWillMount() {
        this.props.store.addDays()
    }

    componentDidMount() {
        this.props.store.addMonthsControl(this.myRef)
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(e) {

    }

    render() {
        const {store} = this.props
        return (
            <Main>
                <Header>
                    <YearAndButtons>
                        <CurrentDate/>
                        <Buttons/>
                    </YearAndButtons>
                    <table>
                        <DaysOfTheWeek/>
                    </table>
                </Header>
                <div onScroll={this.handleScroll} id='scroll'>
                    <Table>
                        <tbody ref={this.myRef}>
                        {
                            store.formattedDays.map((week, i) => (
                                <Week
                                    key={i}
                                    week={week}
                                    store={store}
                                    today={store.today}
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
