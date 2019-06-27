import React, {Component} from 'react'
import {Main, Table} from './styled-components'
import {observer} from 'mobx-react'
import Week from './Week'
import Header from './Header'


@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }


    componentWillMount() {
        this.props.store.addDays()
    }

    componentDidMount() {
        this.props.store.addMonthsControl(this.myRef)
        this.props.store.scrollToCurrMonth()
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        this.props.store.changeFocusMonth()
    }

    render() {
        const {store} = this.props
        return (
            <Main>
               <Header/>
                <div onScroll={this.handleScroll} id='scroll'>
                    <Table>
                        <tbody ref={this.myRef}>
                        {
                            store.daysByWeeks.map((week, i) => (
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
