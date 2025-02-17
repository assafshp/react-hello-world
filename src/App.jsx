import { useState, useEffect } from 'react'
import './App.css'

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="clock">
      <div className="time">{time.toLocaleTimeString()}</div>
    </div>
  )
}

function App() {
  const [isCalculator, setIsCalculator] = useState(true)
  const [display, setDisplay] = useState('')
  
  const handleNumber = (num) => {
    setDisplay(prev => prev + num)
  }

  const handleOperator = (op) => {
    setDisplay(prev => prev + op)
  }

  const calculate = () => {
    try {
      setDisplay(eval(display).toString())
    } catch {
      setDisplay('Error')
    }
  }

  const clear = () => {
    setDisplay('')
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-time">{new Date().toLocaleTimeString()}</div>
        <button 
          className="toggle-button"
          onClick={() => setIsCalculator(!isCalculator)}
        >
          {isCalculator ? 'Show Clock' : 'Show Calculator'}
        </button>
      </div>
      
      {isCalculator ? (
        <div className="calculator">
          <div className="display">{display}</div>
          <div className="buttons">
            {/* Row 1: Clear and operators */}
            <button onClick={clear} className="operator clear">C</button>
            <button onClick={() => handleOperator('/')} className="operator">/</button>
            <button onClick={() => handleOperator('*')} className="operator">×</button>
            <button onClick={() => handleOperator('+')} className="operator">+</button>

            {/* Row 2-4: Numbers 7-9, 4-6, 1-3 in 3x3 matrix */}
            <button onClick={() => handleNumber('7')} className="number">7</button>
            <button onClick={() => handleNumber('8')} className="number">8</button>
            <button onClick={() => handleNumber('9')} className="number">9</button>
            <button onClick={() => handleOperator('-')} className="operator">-</button>

            <button onClick={() => handleNumber('4')} className="number">4</button>
            <button onClick={() => handleNumber('5')} className="number">5</button>
            <button onClick={() => handleNumber('6')} className="number">6</button>
            <button onClick={calculate} className="operator equals">=</button>

            <button onClick={() => handleNumber('1')} className="number">1</button>
            <button onClick={() => handleNumber('2')} className="number">2</button>
            <button onClick={() => handleNumber('3')} className="number">3</button>

            {/* Row 5: Zero and decimal */}
            <button onClick={() => handleNumber('0')} className="number zero">0</button>
            <button onClick={() => handleNumber('.')} className="number">.</button>
          </div>
        </div>
      ) : (
        <Clock />
      )}
    </div>
  )
}

export default App
