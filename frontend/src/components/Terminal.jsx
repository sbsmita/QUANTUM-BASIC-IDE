import './Terminal.css';

function Terminal({ output }) {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-title">OUTPUT</span>
      </div>
      <div className="terminal-body">
        {output.length === 0 ? (
          <div className="terminal-line prompt">READY.</div>
        ) : (
          output.map((line, i) => (
            <div key={i} className="terminal-line">
              {line}
            </div>
          ))
        )}
        <div className="terminal-cursor">█</div>
      </div>
    </div>
  );
}

export default Terminal;
