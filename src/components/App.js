import React, {Component} from 'react'
import {Main, Table} from './styled-components'
import {observer, inject} from 'mobx-react'
import Week from './Week'
import Head from './Head'
import _ from 'lodash'

@inject('store')
@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentWillMount() {
        this.props.store.addFirstDays()
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
        //add new days
        //add months control
        // change focus month
        this.props.store.addNewDays(this.myRef)
        this.props.store.changeFocusMonth()
    }

    render() {
        const {store} = this.props
        return (
            <Main>
                <Head store={store}/>
                <div onScroll={this.handleScroll} id='scroll'>
                    <Table>
                        <tbody ref={this.myRef}>
                        {
                            store.weeks.map((week, i) => (
                                <Week
                                    key={i}
                                    week={week}
                                    store={store}
                                    today={store.today.full}
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
