import React, {Component} from 'react'
import {Header, Main, Table, YearAndButtons} from './styled-components'
import {observer} from 'mobx-react'
import Week from './Week'
import DaysOfTheWeek from './DaysOfTheWeek'
import Buttons from './Buttons'
import CurrentDate from './CurrentDate'
import _ from 'lodash'

const scrollToRef = ref => {
    window.scrollTo(0, ref.current.offsetTop)
}

@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.handleScroll = _.debounce(this.handleScroll.bind(this), 100)
    }


    executeScroll = ref => scrollToRef(ref)

    componentDidMount() {
        this.props.store.addDays()
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(e){
        console.log(e)
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
                                myRef={this.myRef}
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
                            store.formattedDays.map((week, i) => (<Week key={i} week={week} myRef={this.myRef}/>))
                        }
                        </tbody>
                    </Table>
                </div>
            </Main>
        )
    }
}

export default App
