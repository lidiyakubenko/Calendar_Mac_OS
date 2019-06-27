import {configure, observable, action, runInAction, computed} from 'mobx'
import moment from 'moment'
import 'moment/locale/ru'

configure({enforceActions: 'observed'})

class Calendar {
    @observable days = []
    @observable today = moment().format('MMMM Do YYYY dddd')
    @observable currMonthAndYear = moment().format('MMMM YYYY')
    @observable monthsControl = {}

    addDayFirstWeek = (arr, value) => {
        arr[0] = []
        arr[0] = [...arr[0], value]
        return arr
    }

    addDayNextWeek = (arr, value) => {
        arr[arr.length] = []
        arr[arr.length - 1] = [...arr[arr.length - 1], value]
        return arr
    }

    addDayInCurrentWeek = (arr, value) => {
        if (!arr[arr.length - 1]) {
            arr[arr.length - 1] = []
        }
        arr[arr.length - 1] = [...arr[arr.length - 1], value]
        return arr
    }

    removeNumberDay = day => {
        const index = day.indexOf(' numberDay')
        return day.substring(0, index)
    }

    isFirstDayMonth = day => {
        const currMonth = moment(day, 'MMMM Do YYYY dddd').format('MMMM')
        return day.includes(`${currMonth} 1-`)
    }

    getMonthAndYear = day => {
        return moment(day, 'MMMM Do YYYY dddd').format('MMMM YYYY')
    }

    isCurrMonth = day => {
        return this.getMonthAndYear(this.removeNumberDay(day)) === this.currMonthAndYear
    }

    scrollToCurrMonth = month => {
        const headerHeight = 76
        window.scrollTo(0, month.offsetTop - headerHeight)
    }


    @computed get formattedDays() {
        return this.days.reduce((accum, value, index) =>
                index === 0 ? this.addDayFirstWeek(accum, value) :
                    value.includes('numberDay:1') ? this.addDayNextWeek(accum, value) :
                        this.addDayInCurrentWeek(accum, value)
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
                const lastDay = moment(firstDayOfTheYear, requiredFormat).subtract(j, 'days').format(requiredFormat)
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

    @action
    addMonthsControl = ref => {
        const docHeight = Number(document.documentElement.scrollTop.toFixed(0))
        const rows = [...ref.current.children]
        rows.forEach(row => [...row.children].forEach(cell => {
            if (this.isFirstDayMonth(this.removeNumberDay(cell.id))) {
                runInAction(() => {
                    this.monthsControl =
                        {
                            ...this.monthsControl,
                            [cell.id]: {
                                height: cell.offsetTop,
                                isFocus: this.isCurrMonth(cell.id)
                            }
                        }
                })
            }
        }))
    }


}

export default Calendar