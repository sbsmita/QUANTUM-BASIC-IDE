---
title: Quantum BASIC Coding Standards
inclusion: always
---

# Quantum BASIC Development Standards

## BASIC Language Conventions

### Line Numbers
- Use increments of 10 (10, 20, 30...) to allow for future insertions
- Keep line numbers sequential and organized
- Maximum line number: 9999

### Variable Naming
- Use uppercase for variable names (X, COUNT, RESULT)
- Reserved quantum variable: QRESULT (stores measurement results)
- Keep variable names descriptive but concise

### Code Structure
```basic
10 REM Program description
20 REM Initialize quantum system
30 QINIT <num_qubits>
40 REM Apply quantum operations
50 REM Measure and process results
60 END
```

## Quantum Operations

### Supported Gates
- **QINIT n** - Initialize n qubits in |0⟩ state
- **HADAMARD q** - Apply Hadamard gate to qubit q (creates superposition)
- **QNOT q** - Apply Pauli-X gate to qubit q (quantum NOT)
- **CNOT c,t** - Apply CNOT gate with control c and target t
- **MEASURE q** - Measure qubit q, result stored in QRESULT

### Quantum Programming Patterns

#### Pattern 1: Quantum Coin Flip
```basic
10 QINIT 1
20 HADAMARD 0
30 MEASURE 0
40 PRINT QRESULT
```

#### Pattern 2: Bell State (Entanglement)
```basic
10 QINIT 2
20 HADAMARD 0
30 CNOT 0,1
40 MEASURE 0
50 MEASURE 1
```

#### Pattern 3: Quantum Random Number (0-3)
```basic
10 QINIT 2
20 HADAMARD 0
30 HADAMARD 1
40 MEASURE 0
50 LET A = QRESULT
60 MEASURE 1
70 LET B = QRESULT
80 LET RESULT = A * 2 + B
90 PRINT RESULT
```

## Error Handling
- Always initialize qubits with QINIT before operations
- Qubit indices start at 0
- Ensure qubit index < number of initialized qubits
- MEASURE collapses quantum state (irreversible)

## Best Practices
1. Add REM comments to explain quantum operations
2. Test with simple circuits before complex algorithms
3. Visualize circuits to verify gate sequence
4. Remember: measurement changes the quantum state
5. Use meaningful variable names for classical results
