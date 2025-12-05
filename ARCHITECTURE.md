# Quantum BASIC - Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Retro Terminal (React)                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │ │
│  │  │ Code Editor  │  │   Terminal   │  │   Circuit    │   │ │
│  │  │   (BASIC)    │  │   Output     │  │  Visualizer  │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │ HTTP POST /api/execute
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER                              │
│                     (Node.js + Express)                          │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  Request Handler                           │ │
│  │  • Receives BASIC code                                     │ │
│  │  • Creates interpreter instance                            │ │
│  │  • Returns output + quantum state                          │ │
│  └────────────────┬───────────────────────┬───────────────────┘ │
│                   │                       │                      │
│                   ↓                       ↓                      │
│  ┌────────────────────────┐  ┌────────────────────────┐        │
│  │  BASIC Interpreter     │  │   Quantum Engine       │        │
│  │                        │  │                        │        │
│  │  • Line Parser         │←→│  • State Vector        │        │
│  │  • Statement Router    │  │  • Gate Operations     │        │
│  │  • Expression Eval     │  │  • Measurement         │        │
│  │  • Variable Storage    │  │  • Circuit Tracking    │        │
│  │  • Control Flow        │  │                        │        │
│  └────────────────────────┘  └────────────────────────┘        │
│                                                                   │
└───────────────────────────────┼───────────────────────────────────┘
                                │ MCP Protocol
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MCP SERVER                                    │
│              (Quantum Simulator Tools)                           │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ simulate_circuit │  │ get_quantum_state│  │  generate_   │ │
│  │                  │  │                  │  │  quantum_    │ │
│  │ • Run circuits   │  │ • Analyze state  │  │  program     │ │
│  │ • Calculate      │  │ • Check          │  │              │ │
│  │   probabilities  │  │   entanglement   │  │ • Algorithm  │ │
│  │                  │  │ • Compute purity │  │   templates  │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Program Execution Flow

```
1. USER WRITES CODE
   ↓
   10 QINIT 1
   20 HADAMARD 0
   30 MEASURE 0
   40 PRINT QRESULT

2. CLICK RUN BUTTON
   ↓
   Frontend sends HTTP POST to /api/execute

3. BACKEND RECEIVES CODE
   ↓
   Creates BasicInterpreter instance
   Creates QuantumEngine instance
   Links them together

4. PARSING PHASE
   ↓
   Split code into lines
   Extract line numbers and statements
   Sort by line number
   
   Result:
   [
     { lineNumber: 10, statement: "QINIT 1" },
     { lineNumber: 20, statement: "HADAMARD 0" },
     { lineNumber: 30, statement: "MEASURE 0" },
     { lineNumber: 40, statement: "PRINT QRESULT" }
   ]

5. EXECUTION PHASE
   ↓
   Line 10: QINIT 1
     → QuantumEngine.initialize(1)
     → Creates state vector: [1, 0]
     → Output: "Initialized 1 qubit(s)"
   
   Line 20: HADAMARD 0
     → QuantumEngine.hadamard(0)
     → State becomes: [1/√2, 1/√2]
     → Circuit: [{ gate: 'H', qubit: 0 }]
     → Output: "Applied Hadamard to qubit 0"
   
   Line 30: MEASURE 0
     → QuantumEngine.measure(0)
     → Calculate probabilities: 50% |0⟩, 50% |1⟩
     → Random outcome: 0 or 1
     → Collapse state
     → Store in QRESULT variable
     → Output: "Measured qubit 0: [result]"
   
   Line 40: PRINT QRESULT
     → Evaluate expression: QRESULT
     → Get value from variables
     → Output: "0" or "1"

6. RETURN RESULTS
   ↓
   {
     success: true,
     output: [
       "Initialized 1 qubit(s)",
       "Applied Hadamard to qubit 0",
       "Measured qubit 0: 1",
       "1"
     ],
     quantumState: [...],
     circuitData: {
       numQubits: 1,
       gates: [
         { gate: 'H', qubit: 0 },
         { gate: 'M', qubit: 0 }
       ]
     }
   }

7. FRONTEND DISPLAYS
   ↓
   Terminal shows output lines
   Circuit visualizer draws gates
```

## Component Architecture

### Frontend Components

```
App.jsx
├── State Management
│   ├── code (BASIC program text)
│   ├── output (execution results)
│   ├── circuitData (quantum circuit)
│   └── isRunning (execution status)
│
├── Event Handlers
│   ├── runProgram() → POST to backend
│   └── loadExample() → Load sample code
│
└── Child Components
    ├── Terminal
    │   ├── Props: output[]
    │   └── Displays: Text output with cursor
    │
    └── CircuitVisualizer
        ├── Props: circuitData
        └── Renders: Canvas with quantum gates
```

### Backend Components

```
server.js
└── Express App
    └── POST /api/execute
        ├── Create BasicInterpreter
        ├── Create QuantumEngine
        ├── Link them
        ├── Execute code
        └── Return results

interpreter.js
├── BasicInterpreter Class
│   ├── Properties
│   │   ├── variables: {}
│   │   ├── output: []
│   │   ├── quantumEngine: QuantumEngine
│   │   ├── programCounter: number
│   │   └── lines: []
│   │
│   ├── Methods
│   │   ├── execute(code)
│   │   ├── parseLine(line)
│   │   ├── executeLine(line)
│   │   ├── evaluateExpression(expr)
│   │   └── evaluateCondition(cond)
│   │
│   └── Statement Handlers
│       ├── PRINT
│       ├── LET
│       ├── IF...THEN
│       ├── GOTO
│       ├── QINIT
│       ├── HADAMARD
│       ├── QNOT
│       ├── CNOT
│       ├── MEASURE
│       └── END

quantum.js
└── QuantumEngine Class
    ├── Properties
    │   ├── numQubits: number
    │   ├── state: ComplexVector[]
    │   └── circuit: Gate[]
    │
    └── Methods
        ├── initialize(n)
        ├── hadamard(qubit)
        ├── pauliX(qubit)
        ├── cnot(control, target)
        ├── measure(qubit)
        ├── getState()
        └── getCircuitData()
```

### MCP Server Components

```
quantum-mcp.js
└── QuantumSimulatorMCP Class
    ├── Server Setup
    │   ├── Name: "quantum-simulator"
    │   ├── Version: "1.0.0"
    │   └── Protocol: MCP
    │
    ├── Tool Handlers
    │   ├── simulate_circuit
    │   │   ├── Input: { numQubits, gates[] }
    │   │   └── Output: { probabilities, depth }
    │   │
    │   ├── get_quantum_state
    │   │   ├── Input: { stateVector[] }
    │   │   └── Output: { entangled, purity }
    │   │
    │   └── generate_quantum_program
    │       ├── Input: { algorithm }
    │       └── Output: BASIC code string
    │
    └── Helper Methods
        ├── calculateProbabilities()
        ├── checkEntanglement()
        └── calculatePurity()
```

## Kiro Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      KIRO ECOSYSTEM                              │
└─────────────────────────────────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ↓                      ↓                      ↓
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   STEERING   │      │    HOOKS     │      │     MCP      │
│     DOCS     │      │              │      │   SERVERS    │
└──────────────┘      └──────────────┘      └──────────────┘
        │                      │                      │
        │                      │                      │
        ↓                      ↓                      ↓
┌──────────────────────────────────────────────────────────┐
│  quantum-basic-standards.md                              │
│  • Always active                                         │
│  • Enforces coding standards                             │
│  • Guides code generation                                │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  auto-run-on-save.json                                   │
│  • Trigger: Save .qb file                                │
│  • Action: Execute program                               │
│                                                           │
│  generate-quantum-code.json                              │
│  • Trigger: Manual button                                │
│  • Action: Use MCP to generate code                      │
│                                                           │
│  validate-quantum-syntax.json                            │
│  • Trigger: Save .qb file                                │
│  • Action: Validate against standards                    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  quantum-simulator MCP Server                            │
│  • simulate_circuit                                      │
│  • get_quantum_state                                     │
│  • generate_quantum_program                              │
└──────────────────────────────────────────────────────────┘
```

## Quantum State Representation

### State Vector Structure

```
For n qubits: 2^n dimensional complex vector

1 qubit (2 states):
|ψ⟩ = α|0⟩ + β|1⟩
State vector: [α, β]
Example: [1, 0] = |0⟩
         [0, 1] = |1⟩
         [1/√2, 1/√2] = superposition

2 qubits (4 states):
|ψ⟩ = α|00⟩ + β|01⟩ + γ|10⟩ + δ|11⟩
State vector: [α, β, γ, δ]
Example: [1, 0, 0, 0] = |00⟩
         [1/√2, 0, 0, 1/√2] = Bell state

3 qubits (8 states):
State vector: [α₀, α₁, α₂, α₃, α₄, α₅, α₆, α₇]
Represents: |000⟩, |001⟩, |010⟩, |011⟩, |100⟩, |101⟩, |110⟩, |111⟩
```

### Gate Operations on State Vector

```
Hadamard on qubit 0 (2 qubits):

Before: [1, 0, 0, 0]  (|00⟩)
        
Apply H to qubit 0:
For each pair of states differing only in qubit 0:
  |00⟩ and |10⟩ → (|00⟩ + |10⟩)/√2
  |01⟩ and |11⟩ → (|01⟩ + |11⟩)/√2

After: [1/√2, 0, 1/√2, 0]  (|00⟩ + |10⟩)/√2

CNOT with control=0, target=1:

Before: [1/√2, 0, 1/√2, 0]
        
If qubit 0 is |1⟩, flip qubit 1:
  |10⟩ → |11⟩

After: [1/√2, 0, 0, 1/√2]  (|00⟩ + |11⟩)/√2 = Bell state!
```

## Circuit Visualization

### Canvas Rendering

```
Circuit Layout:

q0 ─────H─────●─────M─────
              │
q1 ───────────⊕─────M─────

Components:
• Horizontal lines = qubit wires
• H in box = Hadamard gate
• ● = control qubit
• ⊕ = target qubit (CNOT)
• M in box = measurement

Drawing Algorithm:
1. Calculate positions
   - qubitSpacing = 60px
   - gateSpacing = 80px
   
2. Draw qubit lines
   - For each qubit: horizontal line
   - Label: q0, q1, q2...
   
3. Draw gates in order
   - Single-qubit: box with letter
   - CNOT: dot + line + circle with cross
   - Measurement: box with meter symbol
```

## Error Handling Flow

```
User Code → Parser → Validator → Executor
                ↓         ↓         ↓
              Error?    Error?    Error?
                ↓         ↓         ↓
            Catch     Catch     Catch
                ↓         ↓         ↓
            Format    Format    Format
                ↓         ↓         ↓
            Return to Frontend
                ↓
            Display in Terminal
```

## Performance Considerations

### State Vector Size

```
Qubits | States | Memory
-------|--------|--------
1      | 2      | 32 bytes
2      | 4      | 64 bytes
3      | 8      | 128 bytes
4      | 16     | 256 bytes
5      | 32     | 512 bytes
10     | 1024   | 16 KB
20     | 1M     | 16 MB
30     | 1B     | 16 GB (!)

Current limit: ~10 qubits for browser simulation
```

### Optimization Strategies

1. **Lazy State Calculation**: Only compute when needed
2. **Sparse Representation**: Store only non-zero amplitudes
3. **Gate Fusion**: Combine consecutive gates
4. **Measurement Optimization**: Early collapse reduces state size

---

**Architecture designed for education, extensibility, and quantum exploration.** ⚛️
