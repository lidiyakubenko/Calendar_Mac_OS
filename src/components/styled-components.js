import styled from 'styled-components'

export const Button = styled.button``

export const Table = styled.table`
border-collapse: collapse
`


export const Td = styled.td`
border: 1px solid  #DCDCDC;
padding:45px 50px;
position:relative;
`

export const Th = styled.td`
position:relative;
font-family:Roboto,sans-serif;
font-weight:bold;
padding-top:30px;
`

export const Number = styled.div`
position:absolute;
top:5px;
right:9px;
font-family:sans-serif;
`

export const TodayNumber = styled.div`
position:absolute;
top:${props => props.number < 10 ? '3px' : '2px'};
right:${props => props.number < 10 ? '2px' : '2px'};
font-family:sans-serif;
padding: ${props => props.number < 10 ? '2px 7px' : '3px 4px'};
background-color:#FF4500;
color:white;
border-radius:90px
`

export const DayOfTheWeek = styled.div`
position:absolute;
right:9px;
bottom:5px;
top:5px;
`