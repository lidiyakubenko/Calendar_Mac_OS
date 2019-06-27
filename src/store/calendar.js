import {configure, observable, action, runInAction, computed} from 'mobx'
import moment from 'moment'
import 'moment/locale/ru'
import {addLastDay, addNextDay, getDateWithNumDayOfWeek} from './help-functions'

configure({enforceActions: 'observed'})

class Calendar {
    @observable days = []
    @observable today = {
        full: moment().format('MMMM Do YYYY dddd'),
        monthAndYear: moment().format('MMMM YYYY'),
        year: moment().format('YYYY'),
    }
    @observable monthsControl = {}
    headerHeight = 73


    addDayInFirstWeek = (week, dayInfo) => {
        week[0] = []
        week[0] = [...week[0], dayInfo]
        return week
    }

    addDayInNextWeek = (week, dayInfo) => {
        week[week.length] = []
        week[week.length - 1] = [...week[week.length - 1], dayInfo]
        return week
    }

    addDayInCurrentWeek = (week, dayInfo) => {
        if (!week[week.length - 1]) {
            week[week.length - 1] = []
        }
        week[week.length - 1] = [...week[week.length - 1], dayInfo]
        return week
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
        return this.getMonthAndYear(this.removeNumberDay(day)) === this.today.monthAndYear
    }

    scrollToCurrMonth = () => {
        const currMonthHeight = this.monthsControl[this.today.monthAndYear].height
        const height = currMonthHeight - this.headerHeight
        window.scrollTo(0, height)
    }

    isFocusAtMonth = day => {
        const month = this.getMonthAndYear(day)
        return this.monthsControl[month] ? this.monthsControl[month].isFocus : false
    }

    getNumberDayOfWeek = day => moment(day, 'MMMM Do YYYY dddd').day()

    addLastDays = (day, daysCount) => {
        for (let i = 1; i < daysCount; ++i) {
            const lastDay = addLastDay(day, i)
            runInAction(() => {
                this.days.unshift(getDateWithNumDayOfWeek(lastDay))
            })
        }
    }

    @action
    addNextDays = (day, daysCount) => {
        for (let i = 0; i < daysCount; ++i) {
            const nextDay = addNextDay(day, i)
            runInAction(() => {
                this.days = [...this.days, getDateWithNumDayOfWeek(nextDay)]
            })
        }
    }


    @computed get daysByWeeks() {
        return this.days.reduce((accum, value, index) =>
                index === 0 ? this.addDayInFirstWeek(accum, value) :
                    value.includes('numberDay:1') ? this.addDayInNextWeek(accum, value) :
                        this.addDayInCurrentWeek(accum, value)
            , [])

    }

    addDays = () => {
        const requiredFormat = 'MMMM Do YYYY dddd'
        const firstDayOfTheYear = moment(`${this.today.year}-01-01`).format(requiredFormat)
        let dayOfWeek = this.getNumberDayOfWeek(firstDayOfTheYear)
        if (dayOfWeek !== 1) {
            dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek
            this.addLastDays(firstDayOfTheYear, dayOfWeek)
        }
        this.addNextDays(firstDayOfTheYear, 365)
    }

    @action
    addMonthsControl = refTable => {
        const rows = [...refTable.current.children]
        rows.forEach(row => [...row.children].forEach(cell => {
            if (this.isFirstDayMonth(this.removeNumberDay(cell.id))) {
                runInAction(() => {
                    this.monthsControl = {
                        ...this.monthsControl,
                        [this.getMonthAndYear(cell.id)]: {
                            height: cell.offsetTop,
                            isFocus: false
                        }
                    }
                })
            }
        }))
    }

    @action
    changeFocusMonth = () => {
        const docHeight = Number(document.documentElement.scrollTop.toFixed(0))
        const months = Object.keys(this.monthsControl)
        const margin = 180
        months.forEach((month, i) => {
            const currMonth = this.monthsControl[month]
            const nextMonth = this.monthsControl[months[i + 1]]
            const top = currMonth.height - this.headerHeight
            const bottom = nextMonth ? nextMonth.height - this.headerHeight : top + 360
            runInAction(() => {
                currMonth.isFocus = docHeight >= top - margin && docHeight <= bottom - margin
            })
        })
    }


}

export default Calendar