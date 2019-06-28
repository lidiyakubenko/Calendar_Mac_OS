import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import Calendar from './store/calendar'
import {Provider} from 'mobx-react'

ReactDom.render(
    <Provider store={new Calendar()}>
        <App />
    </Provider>,
    document.getElementById('root')
)