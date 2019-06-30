import React, {Component} from 'react'
import {Main, Table} from './styled-components'
import {inject, observer} from 'mobx-react'
import Week from './Week'
import Head from './Head'
import _ from 'lodash'

@inject('store')
@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.debouncedHandleScroll = _.debounce(this.debouncedHandleScroll.bind(this),300)
    }

    componentWillMount() {
        this.props.store.addFirstDays()
    }

    componentDidMount() {
        this.props.store.addMonthsControl(this.myRef)
        window.addEventListener('scroll', this.debouncedHandleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debouncedHandleScroll)
    }

    debouncedHandleScroll(){
        this.props.store.addNewDays(this.myRef)
        this.props.store.changeFocusMonth()
    }

    render() {
        const {store} = this.props
        return (
            <Main>
                <Head store={store}/>
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
            </Main>
        )
    }
}

export default App
