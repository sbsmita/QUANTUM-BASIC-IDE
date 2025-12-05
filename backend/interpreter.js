export class BasicInterpreter {
  constructor() {
    this.variables = {};
    this.output = [];
    this.quantumEngine = null;
    this.programCounter = 0;
    this.lines = [];
  }

  setQuantumEngine(engine) {
    this.quantumEngine = engine;
  }

  async execute(code) {
    this.output = [];
    this.variables = {};
    this.programCounter = 0;
    
    // Parse lines
    this.lines = code.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => this.parseLine(line))
      .sort((a, b) => a.lineNumber - b.lineNumber);

    // Execute lines
    while (this.programCounter < this.lines.length) {
      const line = this.lines[this.programCounter];
      await this.executeLine(line);
      this.programCounter++;
    }

    return {
      output: this.output,
      quantumState: this.quantumEngine?.getState(),
      circuitData: this.quantumEngine?.getCircuitData()
    };
  }

  parseLine(line) {
    const match = line.match(/^(\d+)\s+(.+)$/);
    if (!match) {
      throw new Error(`Invalid line format: ${line}`);
    }
    return {
      lineNumber: parseInt(match[1]),
      statement: match[2].trim()
    };
  }

  async executeLine(line) {
    const stmt = line.statement;

    // PRINT statement
    if (stmt.startsWith('PRINT ')) {
      const content = stmt.substring(6).trim();
      const value = this.evaluateExpression(content);
      this.output.push(String(value));
    }
    // LET statement
    else if (stmt.startsWith('LET ')) {
      const assignment = stmt.substring(4).trim();
      const [varName, expression] = assignment.split('=').map(s => s.trim());
      this.variables[varName] = this.evaluateExpression(expression);
    }
    // QINIT - Initialize quantum register
    else if (stmt.startsWith('QINIT ')) {
      const numQubits = parseInt(stmt.substring(6).trim());
      this.quantumEngine.initialize(numQubits);
      this.output.push(`Initialized ${numQubits} qubit(s)`);
    }
    // HADAMARD gate
    else if (stmt.startsWith('HADAMARD ')) {
      const qubit = parseInt(stmt.substring(9).trim());
      this.quantumEngine.hadamard(qubit);
      this.output.push(`Applied Hadamard to qubit ${qubit}`);
    }
    // QNOT gate (Pauli-X)
    else if (stmt.startsWith('QNOT ')) {
      const qubit = parseInt(stmt.substring(5).trim());
      this.quantumEngine.pauliX(qubit);
      this.output.push(`Applied X gate to qubit ${qubit}`);
    }
    // CNOT gate
    else if (stmt.startsWith('CNOT ')) {
      const [control, target] = stmt.substring(5).trim().split(',').map(s => parseInt(s.trim()));
      this.quantumEngine.cnot(control, target);
      this.output.push(`Applied CNOT: control=${control}, target=${target}`);
    }
    // MEASURE
    else if (stmt.startsWith('MEASURE ')) {
      const qubit = parseInt(stmt.substring(8).trim());
      const result = this.quantumEngine.measure(qubit);
      this.variables['QRESULT'] = result;
      this.output.push(`Measured qubit ${qubit}: ${result}`);
    }
    // IF statement
    else if (stmt.startsWith('IF ')) {
      const thenIndex = stmt.indexOf(' THEN ');
      if (thenIndex === -1) throw new Error('IF without THEN');
      
      const condition = stmt.substring(3, thenIndex).trim();
      const thenPart = stmt.substring(thenIndex + 6).trim();
      
      if (this.evaluateCondition(condition)) {
        await this.executeLine({ lineNumber: -1, statement: thenPart });
      }
    }
    // GOTO
    else if (stmt.startsWith('GOTO ')) {
      const targetLine = parseInt(stmt.substring(5).trim());
      const index = this.lines.findIndex(l => l.lineNumber === targetLine);
      if (index !== -1) {
        this.programCounter = index - 1; // -1 because it will be incremented
      }
    }
    // END
    else if (stmt === 'END') {
      this.programCounter = this.lines.length;
    }
    // REM (comment)
    else if (stmt.startsWith('REM ')) {
      // Do nothing
    }
    else {
      throw new Error(`Unknown statement: ${stmt}`);
    }
  }

  evaluateExpression(expr) {
    expr = expr.trim();
    
    // String literal
    if (expr.startsWith('"') && expr.endsWith('"')) {
      return expr.substring(1, expr.length - 1);
    }
    
    // Variable
    if (this.variables.hasOwnProperty(expr)) {
      return this.variables[expr];
    }
    
    // Number
    if (!isNaN(expr)) {
      return parseFloat(expr);
    }
    
    // Simple arithmetic
    try {
      return eval(expr.replace(/([A-Z]+)/g, (match) => {
        return this.variables[match] !== undefined ? this.variables[match] : match;
      }));
    } catch {
      return expr;
    }
  }

  evaluateCondition(condition) {
    const operators = ['=', '<>', '>', '<', '>=', '<='];
    
    for (const op of operators) {
      if (condition.includes(op)) {
        const [left, right] = condition.split(op).map(s => this.evaluateExpression(s.trim()));
        
        switch (op) {
          case '=': return left == right;
          case '<>': return left != right;
          case '>': return left > right;
          case '<': return left < right;
          case '>=': return left >= right;
          case '<=': return left <= right;
        }
      }
    }
    
    return false;
  }
}
