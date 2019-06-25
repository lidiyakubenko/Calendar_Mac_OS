import {configure, observable} from 'mobx'
import moment from 'moment'
import 'moment/locale/ru'

configure({enforceActions: 'observed'})

class Calendar {
    @observable list = [1,2,3]
    @observable today = moment().format('MMMM Do YYYY dddd')
}

export default Calendar