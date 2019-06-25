import {configure, observable, action, runInAction, computed} from 'mobx'
import moment from 'moment'
import 'moment/locale/ru'

configure({enforceActions: 'observed'})

class Calendar {
    @observable days = []
    @observable today = moment().format('MMMM Do YYYY dddd')

    addDayFirstWeek = (arr,value) => {
        arr[0] = []
        arr[0] = [...arr[0], value]
        return arr
    }

    addDayNextWeek = (arr,value) => {
        arr[arr.length] = []
        arr[arr.length - 1] = [...arr[arr.length - 1], value]
        return arr
    }

    addDayInCurrentWeek = (arr,value) => {
        if (!arr[arr.length - 1]) {
            arr[arr.length - 1] = []
        }
        arr[arr.length - 1] = [...arr[arr.length - 1], value]
        return arr
    }

    @computed get formattedDays() {
        console.log(this.days)
        return this.days.reduce((accum, value, index) =>
                index === 0 ? this.addDayFirstWeek(accum,value) :
                    value.includes('numberDay:1') ? this.addDayNextWeek(accum,value) :
                        this.addDayInCurrentWeek(accum,value)
            , [])

    }

    @action
    addDays = () => {
        const currentYear = moment().format('YYYY')
        const requiredFormat = 'MMMM Do YYYY dddd'
        const getNumberDayOfWeek = day => moment(day, requiredFormat).day()
        const firstDayOfTheYear = moment(`${currentYear}-01-01`).format(requiredFormat)
        let dayOfWeek = getNumberDayOfWeek(firstDayOfTheYear)
        if (dayOfWeek !== 1) {
            let day = dayOfWeek === 0 ? 7 : dayOfWeek
            for (let j = 1; j < day; ++j) {
                const lastDay = moment(firstDayOfTheYear, requiredFormat).add(-j, 'days').format(requiredFormat)
                runInAction(() => {
                     this.days.unshift(`${lastDay} numberDay:${getNumberDayOfWeek(lastDay)}`)
                })
            }
        }
        for (let i = 0; i < 365; ++i) {
            const nextDay = moment(firstDayOfTheYear, requiredFormat).add(i, 'days').format(requiredFormat)
            runInAction(() => {
                this.days = [...this.days, `${nextDay} numberDay:${getNumberDayOfWeek(nextDay)}`]
            })
        }
    }

}

export default Calendar