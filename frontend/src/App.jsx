import { useState } from 'react';
import CircuitVisualizer from './components/CircuitVisualizer';
import './App.css';

const EXAMPLE_PROGRAMS = {
  'Coin Flip': `10 REM Quantum Coin Flip
20 QINIT 1
30 HADAMARD 0
40 MEASURE 0
50 PRINT "Result: "; QRESULT
60 END`,
  'Bell State': `10 REM Bell State (Entanglement)
20 QINIT 2
30 HADAMARD 0
40 CNOT 0,1
50 MEASURE 0
60 PRINT "Qubit 0: "; QRESULT
70 MEASURE 1
80 PRINT "Qubit 1: "; QRESULT
90 END`,
  'Random 0-3': `10 REM Random Number (0-3)
20 QINIT 2
30 HADAMARD 0
40 HADAMARD 1
50 MEASURE 0
60 LET A = QRESULT
70 MEASURE 1
80 LET B = QRESULT
90 LET RESULT = A * 2 + B
100 PRINT "Random: "; RESULT
110 END`
};

function App() {
  const [code, setCode] = useState(EXAMPLE_PROGRAMS['Coin Flip']);
  const [output, setOutput] = useState('');
  const [circuitData, setCircuitData] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...\n');
    setCircuitData(null);

    try {
      const response = await fetch('http://localhost:3000/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const result = await response.json();

      if (result.error) {
        setOutput(`ERROR: ${result.error}\n`);
      } else {
        setOutput(result.output.join('\n') + '\n');
        if (result.circuitData) {
          setCircuitData(result.circuitData);
        }
      }
    } catch (error) {
      setOutput(`ERROR: ${error.message}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const loadExample = (name) => {
    setCode(EXAMPLE_PROGRAMS[name]);
    setOutput('');
    setCircuitData(null);
  };

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column' }}>
      <header className="app-header">
        <h1>QUANTUM BASIC IDE</h1>
        <p>Write quantum programs in BASIC</p>
      </header>

      <div className="main-container">
        <div className="left-panel">
          <div className="editor-section">
            <div className="editor-header">
              <span>CODE EDITOR</span>
              <div className="example-buttons">
                {Object.keys(EXAMPLE_PROGRAMS).map(name => (
                  <button
                    key={name}
                    onClick={() => loadExample(name)}
                    className="example-btn"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
            <div className="controls">
              <button
                className="run-button"
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? 'RUNNING...' : '▶ RUN'}
              </button>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="output-section">
            <div className="output-header">OUTPUT</div>
            <pre className="output-display">{output}</pre>
          </div>
          {circuitData && <CircuitVisualizer data={circuitData} />}
        </div>
      </div>

      <footer className="app-footer">
        <strong>Supported Commands:</strong> PRINT, LET, IF...THEN, GOTO, REM | 
        <strong> Quantum:</strong> QINIT, HADAMARD, QNOT, CNOT, MEASURE
      </footer>
    </div>
  );
}

export default App;
