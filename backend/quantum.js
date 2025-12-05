export class QuantumEngine {
  constructor() {
    this.numQubits = 0;
    this.state = [];
    this.circuit = [];
  }

  initialize(numQubits) {
    this.numQubits = numQubits;
    const stateSize = Math.pow(2, numQubits);
    this.state = new Array(stateSize).fill(0).map((_, i) => ({
      amplitude: i === 0 ? { real: 1, imag: 0 } : { real: 0, imag: 0 }
    }));
    this.circuit = [];
  }

  hadamard(qubit) {
    this.circuit.push({ gate: 'H', qubit });
    const newState = [...this.state];
    const stateSize = this.state.length;
    const step = Math.pow(2, qubit);

    for (let i = 0; i < stateSize; i++) {
      if ((i & step) === 0) {
        const i0 = i;
        const i1 = i | step;
        
        const a0 = this.state[i0].amplitude;
        const a1 = this.state[i1].amplitude;
        
        const sqrt2 = Math.sqrt(2);
        newState[i0].amplitude = {
          real: (a0.real + a1.real) / sqrt2,
          imag: (a0.imag + a1.imag) / sqrt2
        };
        newState[i1].amplitude = {
          real: (a0.real - a1.real) / sqrt2,
          imag: (a0.imag - a1.imag) / sqrt2
        };
      }
    }
    
    this.state = newState;
  }

  pauliX(qubit) {
    this.circuit.push({ gate: 'X', qubit });
    const newState = [...this.state];
    const step = Math.pow(2, qubit);

    for (let i = 0; i < this.state.length; i++) {
      if ((i & step) === 0) {
        const i0 = i;
        const i1 = i | step;
        
        newState[i0].amplitude = this.state[i1].amplitude;
        newState[i1].amplitude = this.state[i0].amplitude;
      }
    }
    
    this.state = newState;
  }

  cnot(control, target) {
    this.circuit.push({ gate: 'CNOT', control, target });
    const newState = [...this.state];
    const controlStep = Math.pow(2, control);
    const targetStep = Math.pow(2, target);

    for (let i = 0; i < this.state.length; i++) {
      if ((i & controlStep) !== 0 && (i & targetStep) === 0) {
        const i0 = i;
        const i1 = i | targetStep;
        
        newState[i0].amplitude = this.state[i1].amplitude;
        newState[i1].amplitude = this.state[i0].amplitude;
      }
    }
    
    this.state = newState;
  }

  measure(qubit) {
    this.circuit.push({ gate: 'M', qubit });
    
    // Calculate probabilities
    const step = Math.pow(2, qubit);
    let prob0 = 0;
    
    for (let i = 0; i < this.state.length; i++) {
      const amp = this.state[i].amplitude;
      const probability = amp.real * amp.real + amp.imag * amp.imag;
      
      if ((i & step) === 0) {
        prob0 += probability;
      }
    }
    
    // Simulate measurement
    const result = Math.random() < prob0 ? 0 : 1;
    
    // Collapse state
    const newState = this.state.map((s, i) => {
      const qubitValue = (i & step) !== 0 ? 1 : 0;
      if (qubitValue === result) {
        const norm = Math.sqrt(result === 0 ? prob0 : (1 - prob0));
        return {
          amplitude: {
            real: s.amplitude.real / norm,
            imag: s.amplitude.imag / norm
          }
        };
      }
      return { amplitude: { real: 0, imag: 0 } };
    });
    
    this.state = newState;
    return result;
  }

  getState() {
    return this.state.map(s => ({
      probability: s.amplitude.real * s.amplitude.real + s.amplitude.imag * s.amplitude.imag
    }));
  }

  getCircuitData() {
    return {
      numQubits: this.numQubits,
      gates: this.circuit
    };
  }
}
