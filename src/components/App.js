import React, {Component} from 'react'
import {Main, Table} from './styled-components'
import {inject, observer} from 'mobx-react'
import Week from './Week'
import Head from './Head'

@inject('store')
@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isScroll: false,
            indexScroll: null
        }
        this.myRef = React.createRef()
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentWillMount() {
        this.props.store.addFirstDays()
    }

    componentDidMount() {
        this.props.store.addMonthsControl(this.myRef)
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        // this.setState({isScroll: true})
        // clearTimeout(this.state.indexScroll)
        this.props.store.addNewDays(this.myRef)
        this.props.store.changeFocusMonth()
        // const index = setTimeout(() => this.setState({isScroll: false}), 100)
        // this.setState({indexScroll: index})
    }

    render() {
        const {isScroll} = this.state
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
                                    isScroll={isScroll}
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
