import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import Calendar from './store/calendar'

ReactDom.render(
        <App store={new Calendar()}/>,
    document.getElementById('root')
)