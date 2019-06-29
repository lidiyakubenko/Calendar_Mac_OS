import styled, {keyframes} from 'styled-components'


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
width: 700px;
padding-top:65px;
border-collapse: collapse;
`

export const Header = styled.div`
position:fixed;
background-color:rgb(255,255,255);
border: .5px solid rgba(0,0,0,.2);
top:0;
width:700px;
z-index:10;
`

export const YearAndButtons = styled.div`
display: flex; 
justify-content: space-between;
align-items:center;
padding:5px 10px;
`


export const Td = styled.td`
border: 1px solid  #DCDCDC;
width:100px;
height:90px;
box-sizing:border-box;
position:relative;
font-size:.9em;
`

export const DayOffCell = styled(Td)`
background:#F5F5F5;
color:grey;
`

export const Holiday = styled.div`
background-color: rgb(193, 232, 255);
position:relative;
font-size: 0.85em;
height:15px;
font-family:sans-serif;
z-index:5;
margin:0 -1px 2px -1px;
color:rgb(0,0,0);
margin:${props => `0 -${props.numDay * 100 + 1}px 2px ${props.margin - 1}px`};
`

export const Th = styled.td`
position:relative;
padding:13px 49px;
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

export const DayOfTheWeek = styled.div`
position:absolute;
right:9px;
bottom:5px;
top:5px;
font-size:.9em;
font-family:Roboto,sans-serif;
font-weight:bold;
`

const makeDisabled = keyframes`
  from {
    color:black;
  }

  to {
     color:#DCDCDC;
  }
`

const makeEnabled = keyframes`
  from {
    color:#DCDCDC;
  }

  to {
     color:black;
  }
`


export const Number = styled.div`
position:absolute;
top:5px;
right:9px;
font-family:sans-serif;
 animation: ${makeEnabled} 1s forwards;
`

export const NotCurrNumber = styled(Number)`
 animation: ${makeDisabled} .5s forwards;
`

export const TodayNumber = styled.div`
position:absolute;
font-family:sans-serif;
top:3px;
right:3px;
padding: ${props => props.number < 10 ? '2px 7px' : '3px 4px'};
background-color:#FF4500;
color:white;
border-radius:90px
`

export const NameEmployee = styled.div`
position: absolute;
width: 200px;
left: 15px;
top: 0;
`


