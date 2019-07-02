import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import Week from './Week'
import Head from './Head'
import {List, WindowScroller} from 'react-virtualized'
import moment from 'moment/moment'
import {getWeek} from '../store/help-functions'

@inject('store')
@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.firstDate = '04.01.1960'
        this.lastDate = '01.01.2050'
    }

    renderRow = ({index, key, style, isScrolling}) => {
        const week = getWeek(index)
        return (
            <div key={key} style={style}>
                <Week week={week} isScrolling={isScrolling} store={this.props.store}/>
            </div>
        )
    }

    render() {
        const {today} = this.props.store
        const weeks = moment(this.lastDate, 'DD.MM.YYYY').diff(moment(this.firstDate, 'DD.MM.YYYY'), 'weeks')
        const indexCurrWeek = moment(today.formatDote, 'DD.MM.YYYY').diff(moment(this.firstDate, 'DD.MM.YYYY'), 'weeks')
        return (
            <div style={{height: 550, marginLeft: '20%', marginTop: 73}}>
                <Head store={this.props.store}/>
                <WindowScroller>
                    {({height, isScrolling, onChildScroll, scrollTop}) => {
                        return <List
                            scrollToIndex={indexCurrWeek + 4}
                            isScrolling={isScrolling}
                            height={height}
                            width={700}
                            scrollTop={scrollTop}
                            rowHeight={90}
                            rowRenderer={this.renderRow}
                            rowCount={weeks}
                        />
                    }
                    }
                </WindowScroller>
            </div>
        )
    }
}

export default App
