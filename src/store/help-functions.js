import moment from 'moment'


export const getDateWithNumDayOfWeek = day =>{
    const numberDay = moment(day, 'MMMM Do YYYY dddd').day()
    return `${day} numberDay:${numberDay}`
}

export const addLastDay = (day,index) =>{
   return moment(day, 'MMMM Do YYYY dddd').subtract(index, 'days').format('MMMM Do YYYY dddd')
}

export const addNextDay = (day,index) =>{
   return moment(day, 'MMMM Do YYYY dddd').add(index, 'days').format('MMMM Do YYYY dddd')
}

export const addLastMonth = (day,index) =>{
    return moment(day, 'MMMM YYYY').subtract(index, 'months').format('MMMM YYYY')
}

export const addNextMonth = (day,index) =>{
    return moment(day, 'MMMM Do YYYY dddd').add(index, 'months').format('MMMM YYYY')
}

export const removeNumberDay = day => {
    const index = day.indexOf(' numberDay')
    return day.substring(0, index)
}

export const isFirstDayMonth = day => {
    return day.includes(` 1-го`)
}

export const getMonthAndYear = day => {
    return moment(day, 'MMMM Do YYYY dddd').format('MMMM YYYY')
}

export const isWeekend = day => {
    return day.includes('numberDay:6') || day.includes('numberDay:0')
}

export const getNumberDayOfWeek = day => moment(day, 'MMMM Do YYYY dddd').day()



