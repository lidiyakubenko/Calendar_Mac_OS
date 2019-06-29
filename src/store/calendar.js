import {action, configure, observable, runInAction} from 'mobx'
import moment from 'moment'
import 'moment/locale/ru'
import {addLastDay, addLastMonth, addNextDay, addNextMonth, getDateWithNumDayOfWeek} from './help-functions'

configure({enforceActions: 'observed'})

class Calendar {
    @observable weeks = []
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

    isWeekend = day => {
        return day.includes('numberDay:6') || day.includes('numberDay:0')
    }

    getOnlyDay = day => {
        return moment(day, 'MMMM Do YYYY dddd').format('DD')
    }


    removeNumberDay = day => {
        const index = day.indexOf(' numberDay')
        return day.substring(0, index)
    }

    isFirstDayMonth = day => {
        return day.includes(` 1-го`)
    }

    getMonthAndYear = day => {
        return moment(day, 'MMMM Do YYYY dddd').format('MMMM YYYY')
    }

    scrollToLastMonth = focusMonth => {
        const lastMonth = addLastMonth(focusMonth,1)
        const lastMonthHeight = this.monthsControl[lastMonth].height
        const height = lastMonthHeight - this.headerHeight
        window.scrollTo(0, height)
    }



    scrollToCurrMonth = () => {
        const currMonthHeight = this.monthsControl[this.today.monthAndYear].height
        const height = currMonthHeight - this.headerHeight
        window.scrollTo(0, height)
    }

    scrollToNextMonth = focusMonth => {
        const nextMonth = addNextMonth(focusMonth,1)
        const nextMonthHeight = this.monthsControl[nextMonth].height
        const height = nextMonthHeight - this.headerHeight
        window.scrollTo(0, height)
    }


    isFocusAtMonth = day => {
        const month = this.getMonthAndYear(day)
        return this.monthsControl[month] ? this.monthsControl[month].isFocus : false
    }

    getNumberDayOfWeek = day => moment(day, 'MMMM Do YYYY dddd').day()

    @action
    addLastDays = (day, daysCount) => {
        let days = []
        for (let i = 1; i <= daysCount; ++i) {
            const lastDay = addLastDay(day, i)
            days.unshift(getDateWithNumDayOfWeek(lastDay))
        }
        let lastWeeks = this.daysByWeeks(days)
        runInAction(() => {
            this.weeks = [...lastWeeks, ...this.weeks]
        })
    }

    @action
    addNextDays = (day, daysCount) => {
        let days = []
        for (let i = 1; i <= daysCount; ++i) {
            const nextDay = addNextDay(day, i)
            days = [...days, getDateWithNumDayOfWeek(nextDay)]
        }
        let nextWeeks = this.daysByWeeks(days)
        runInAction(() => {
            this.weeks = [...this.weeks, ...nextWeeks]
        })
    }

    daysByWeeks = days => {
        return days.reduce((accum, value, index) =>
                index === 0 ? this.addDayInFirstWeek(accum, value) :
                    value.includes('numberDay:1') ? this.addDayInNextWeek(accum, value) :
                        this.addDayInCurrentWeek(accum, value)
            , [])
    }

    addFirstDays = () => {
        const firstDayOfTheYear = moment(`${this.today.year}-01-01`).format('MMMM Do YYYY dddd')
        let dayOfWeek = this.getNumberDayOfWeek(firstDayOfTheYear)
        if (dayOfWeek !== 1) {
            dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek
            const lastDay = addLastDay(firstDayOfTheYear, dayOfWeek)
            this.addNextDays(lastDay, 371)
        }
    }


    @action
    addMonthsControl = refTable => {
        const rows = [...refTable.current.children]
        rows.forEach(row => [...row.children].forEach(cell => {
            const isFirstDay = this.isFirstDayMonth(this.removeNumberDay(cell.id))
            const month = this.monthsControl[(this.getMonthAndYear(cell.id))]
            if (isFirstDay) {
                runInAction(() => {
                    this.monthsControl = {
                        ...this.monthsControl,
                        [this.getMonthAndYear(cell.id)]: {
                            height: cell.offsetTop,
                            isFocus: month ? month.isFocus : false
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
        months.sort((a, b) => {
            return moment.utc(a,'MMMM YYYY').diff(moment.utc(b,'MMMM YYYY'))
        })
        months.forEach((month, i) => {
            const currMonth = this.monthsControl[month]
            const lastMonth = this.monthsControl[months[i - 1]]
            const bottom = currMonth.height
            const top = lastMonth ? lastMonth.height : 0
            runInAction(() => {
                this.monthsControl[month].isFocus = docHeight >= top && docHeight <= bottom
            })
        })
    }


    addNewDays = ref => {
        const docHeight = Number(document.documentElement.scrollTop.toFixed(0))
        const docBottom = Number(document.documentElement.offsetHeight.toFixed(0))
        const lastWeek = this.weeks.length - 1
        const lastDay = this.weeks[lastWeek].length - 1
        if (docHeight <= 500) {
            this.addLastDays(this.removeNumberDay(this.weeks[0][0]), 105)
            this.addMonthsControl(ref)
        }
        if (docHeight >= docBottom - 1000) {
            this.addNextDays(this.removeNumberDay(this.weeks[lastWeek][lastDay]), 105)
            this.addMonthsControl(ref)
        }
    }

}

export default Calendar