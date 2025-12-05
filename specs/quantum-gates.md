# Spec: Quantum Gate Operations

## Overview
Define the quantum gate operations supported in Quantum BASIC, including their mathematical representations and implementation requirements.

## Requirements

### R1: Single-Qubit Gates
The system MUST support the following single-qubit gates:
- **Hadamard (H)**: Creates superposition
- **Pauli-X (QNOT)**: Quantum NOT gate
- **Pauli-Y**: Rotation around Y-axis
- **Pauli-Z**: Phase flip gate

### R2: Two-Qubit Gates
The system MUST support:
- **CNOT**: Controlled-NOT gate with control and target qubits
- **SWAP**: Swap states of two qubits
- **CZ**: Controlled-Z gate

### R3: Measurement
- **MEASURE**: Collapse quantum state and return classical bit (0 or 1)
- Result stored in QRESULT variable
- Measurement is irreversible

## Design

### Gate Matrix Representations

#### Hadamard Gate
```
H = 1/√2 * [1   1]
           [1  -1]
```

#### Pauli-X Gate
```
X = [0  1]
    [1  0]
```

#### CNOT Gate
```
CNOT = [1  0  0  0]
       [0  1  0  0]
       [0  0  0  1]
       [0  0  1  0]
```

### State Vector Representation
- n qubits → 2^n dimensional complex vector
- Initial state: |0...0⟩ = [1, 0, 0, ..., 0]
- Probabilities: |amplitude|^2

## Implementation Tasks

### Task 1: Implement Hadamard Gate
**File**: `backend/quantum.js`
**Method**: `hadamard(qubit)`
**Steps**:
1. Calculate state indices affected by gate
2. Apply Hadamard matrix transformation
3. Update state vector
4. Record gate in circuit history

### Task 2: Implement Pauli-X Gate
**File**: `backend/quantum.js`
**Method**: `pauliX(qubit)`
**Steps**:
1. Identify qubit bit position in state index
2. Swap amplitudes for |0⟩ and |1⟩ states
3. Update state vector

### Task 3: Implement CNOT Gate
**File**: `backend/quantum.js`
**Method**: `cnot(control, target)`
**Steps**:
1. Check control qubit is |1⟩
2. If true, apply X gate to target
3. Update state vector

### Task 4: Implement Measurement
**File**: `backend/quantum.js`
**Method**: `measure(qubit)`
**Steps**:
1. Calculate probability of |0⟩ and |1⟩
2. Sample random outcome based on probabilities
3. Collapse state vector (zero out non-measured states)
4. Normalize remaining amplitudes
5. Return classical bit result

## Testing

### Test Case 1: Hadamard Creates Superposition
```basic
10 QINIT 1
20 HADAMARD 0
30 MEASURE 0
```
Expected: 50% chance of 0, 50% chance of 1

### Test Case 2: Bell State Entanglement
```basic
10 QINIT 2
20 HADAMARD 0
30 CNOT 0,1
40 MEASURE 0
50 MEASURE 1
```
Expected: Both measurements always match (00 or 11)

### Test Case 3: X Gate Flips Bit
```basic
10 QINIT 1
20 QNOT 0
30 MEASURE 0
```
Expected: Always returns 1

## Acceptance Criteria
- [ ] All single-qubit gates implemented
- [ ] CNOT gate works correctly
- [ ] Measurement collapses state properly
- [ ] State vector maintains normalization
- [ ] Circuit history tracked for visualization
- [ ] All test cases pass
