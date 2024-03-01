import React from 'react'
import { ACTIONS } from './App'

const Digitbuttons = ({dispatch,digit}) => {
  return (
        <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</button>
   
  )
}

export default Digitbuttons