import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import Calendar from './store/calendar'
import {Provider} from 'mobx-react'

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

ReactDom.render(
    <Provider store={new Calendar()}>
        <App />
    </Provider>,
    document.getElementById('root')
)