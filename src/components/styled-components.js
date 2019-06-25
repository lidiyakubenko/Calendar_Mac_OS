import styled from 'styled-components'


export const CommonForButton = styled.button`
background-color:rgb(255,255,255);
color: rgba(0,0,0,.8);
border: 0px solid rgba(0,0,0,.1);
border-bottom: .5px solid rgba(0,0,0,.2);
margin:.3px;
box-shadow:0 0 1px rgba(0,0,0,.4);
border-radius: 3px;
outline:none;
cursor:pointer;
transition:.3s;
:active {
    background-color:rgb(0,0,0,.2);
  }
`
export const Button = styled(CommonForButton)`
padding:0 10px;
font-size:0.8em;
`

export const ArrowButton = styled(CommonForButton)`
font-size: 1em;
padding:0 2px;
`

export const Table = styled.table`
border-collapse: collapse;
`

export const Main = styled.div`
margin: auto; 
width: 705px;
height:2000px;
border-collapse: collapse;
box-shadow:0 0 1px rgba(0,0,0,.4);
`

export const Header = styled.div`
display: flex; 
justify-content: space-between;
align-items:center;
padding: 10px 15px 5px 15px;
`


export const Td = styled.td`
border: 1px solid  #DCDCDC;
padding:45px 50px;
box-sizing:border-box;
position:relative;
font-size:.9em;
`

export const DayOffCell = styled(Td)`
background:#F5F5F5;
color:grey;
`

export const Th = styled.td`
position:relative;
padding-top:30px;
box-shadow:0 1px rgba(0,0,0,.1);
`

export const Number = styled.div`
position:absolute;
top:5px;
right:9px;
font-family:sans-serif;
`
export const Month = styled.div`
font-family:Roboto,sans-serif;
font-weight:600;
font-size:1.7em;
margin-right:5px;
`


export const Year = styled(Month)`
font-weight:100;
font-size:1.9em;
`


export const TodayNumber = styled.div`
position:absolute;
font-family:sans-serif;
top:${props => props.number < 10 ? '3px' : '2px'};
right:${props => props.number < 10 ? '2px' : '2px'};
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
font-size:.9em;
font-family:Roboto,sans-serif;
font-weight:bold;
`