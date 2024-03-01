import { useReducer } from 'react';
import './App.css';
import Digitbuttons from './Digitbuttons';
import Operationbutton from './Operationbutton';

export const ACTIONS={
  ADD_DIGIT:'add-digit',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate',
  CLEAR:'clear',
  CHOOSE_OPERATION:'choose-operant'
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
      if(payload.digit==="0" && state.currentOperand==="0") 
      {
        return state
            }
      if(payload.digit==="." && state.currentOperand && state.currentOperand.includes(".")) 
      {
        return state
      }
      return {
        ...state,
        currentOperand:`${state.currentOperand||''}${payload.digit}`
      }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state
        }
  
        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }
  
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }
       return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        }
        
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.EVALUATE:
      if(state.previousOperand==null||state.operation==null||state.currentOperand==null){
        return state
      }
      return{
        ...state,
        overwrite:true,
        previousOperand:null,
        operation:null,
        currentOperand:evaluate(state)
      }

      case ACTIONS.DELETE_DIGIT:
       
       if(state.overwrite)
       {  return {
         ...state,
         currentOperand:null,
         overwrite:false
       }  
      }
      if(state.currentOperand===null){
        return state
      }
      if(state.currentOperand.length===1){
        return {
          ...state,
          currentOperand:null
        }
      }
      return {
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
  }
  function evaluate({previousOperand,currentOperand,operation}){
    let curr=parseFloat(currentOperand)
    let prev=parseFloat(previousOperand)
    let computation=''
    if(isNaN(curr)||isNaN(prev)) return ''
    switch(operation){
      case '+':
        computation=prev+curr;
        break;
        case '-':
          computation=prev - curr;
          break;
        case '*':
            computation=prev*curr;
            break;
        case '/':
            computation=prev/curr;
            break;
        } 
        return computation.toString()
  }
}

function App() {
  const[{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{})
  return (
      <div className='calculator-grid'>
        <div className='output'>
          <div className='previous-operand'>{previousOperand}{operation}</div>
          <div className='current-operand'>{currentOperand}</div>
        </div>
          <button className='span-two' onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
          <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
          <Operationbutton operation="/" dispatch={dispatch} />
          <Digitbuttons digit="1" dispatch={dispatch} />
          <Digitbuttons digit="2" dispatch={dispatch} />
          <Digitbuttons digit="3" dispatch={dispatch} />
          <Operationbutton operation="*" dispatch={dispatch} />
          <Digitbuttons digit="4" dispatch={dispatch} />
          <Digitbuttons digit="5" dispatch={dispatch} />
          <Digitbuttons digit="6" dispatch={dispatch} />
          <Operationbutton operation="+" dispatch={dispatch} />
          <Digitbuttons digit="7" dispatch={dispatch} />
          <Digitbuttons digit="8" dispatch={dispatch} />
          <Digitbuttons digit="9" dispatch={dispatch} />
          <Operationbutton operation="-" dispatch={dispatch} />
          <Digitbuttons digit="." dispatch={dispatch} />
          <Digitbuttons digit="0" dispatch={dispatch} />
          <button className='span-two' onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
        </div>
  );
}

export default App;
