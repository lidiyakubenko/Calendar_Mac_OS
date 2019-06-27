import moment from 'moment/moment'


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

