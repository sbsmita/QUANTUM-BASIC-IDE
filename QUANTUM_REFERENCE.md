# Quantum BASIC - Quick Reference Guide

## Quantum Operations

### QINIT - Initialize Quantum Register
```basic
QINIT n
```
Creates `n` qubits in the |0⟩ state.

**Example:**
```basic
10 QINIT 2    REM Initialize 2 qubits
```

**Notes:**
- Must be called before any quantum operations
- All qubits start in |0⟩ state
- Qubit indices: 0 to n-1

---

### HADAMARD - Create Superposition
```basic
HADAMARD qubit
```
Applies Hadamard gate to create equal superposition of |0⟩ and |1⟩.

**Matrix:**
```
H = 1/√2 * [1   1]
           [1  -1]
```

**Example:**
```basic
10 QINIT 1
20 HADAMARD 0    REM Qubit 0 now in superposition
30 MEASURE 0     REM 50% chance of 0 or 1
```

**Use Cases:**
- Quantum coin flip
- Creating superposition states
- Quantum random number generation
- First step in many quantum algorithms

---

### QNOT - Quantum NOT Gate (Pauli-X)
```basic
QNOT qubit
```
Flips qubit state: |0⟩ → |1⟩ and |1⟩ → |0⟩

**Matrix:**
```
X = [0  1]
    [1  0]
```

**Example:**
```basic
10 QINIT 1
20 QNOT 0        REM Flip to |1⟩
30 MEASURE 0     REM Always returns 1
```

**Use Cases:**
- Bit flip operations
- State preparation
- Quantum logic gates

---

### CNOT - Controlled-NOT Gate
```basic
CNOT control, target
```
Flips target qubit if control qubit is |1⟩. Creates entanglement.

**Matrix:**
```
CNOT = [1  0  0  0]
       [0  1  0  0]
       [0  0  0  1]
       [0  0  1  0]
```

**Example:**
```basic
10 QINIT 2
20 HADAMARD 0    REM Control in superposition
30 CNOT 0,1      REM Entangle qubits
40 MEASURE 0
50 MEASURE 1     REM Always matches qubit 0
```

**Use Cases:**
- Creating Bell states (entanglement)
- Quantum error correction
- Quantum teleportation
- Controlled operations

---

### MEASURE - Measure Qubit
```basic
MEASURE qubit
```
Collapses quantum state and returns classical bit (0 or 1). Result stored in `QRESULT`.

**Example:**
```basic
10 QINIT 1
20 HADAMARD 0
30 MEASURE 0
40 PRINT QRESULT    REM Prints 0 or 1
```

**Notes:**
- Measurement is irreversible
- Collapses superposition
- Result is probabilistic
- Use `QRESULT` to access result

---

## Classic BASIC Statements

### PRINT - Output
```basic
PRINT expression
PRINT "text"
PRINT variable
PRINT "text"; variable
```

**Examples:**
```basic
10 PRINT "Hello Quantum World"
20 LET X = 42
30 PRINT X
40 PRINT "Answer: "; X
```

---

### LET - Variable Assignment
```basic
LET variable = expression
```

**Examples:**
```basic
10 LET X = 5
20 LET Y = X + 3
30 LET RESULT = X * Y
```

---

### IF...THEN - Conditional
```basic
IF condition THEN statement
```

**Operators:** `=`, `<>`, `<`, `>`, `<=`, `>=`

**Examples:**
```basic
10 IF X = 0 THEN PRINT "ZERO"
20 IF X > 5 THEN GOTO 100
30 IF QRESULT = 1 THEN LET COUNT = COUNT + 1
```

---

### GOTO - Jump
```basic
GOTO line_number
```

**Example:**
```basic
10 LET I = 1
20 PRINT I
30 LET I = I + 1
40 IF I <= 10 THEN GOTO 20
50 END
```

---

### REM - Comment
```basic
REM comment text
```

**Example:**
```basic
10 REM This is a comment
20 REM Initialize quantum system
```

---

### END - Terminate
```basic
END
```

**Example:**
```basic
100 PRINT "Done"
110 END
```

---

## Common Quantum Patterns

### Pattern 1: Quantum Coin Flip
```basic
10 REM Quantum Coin Flip
20 QINIT 1
30 HADAMARD 0
40 MEASURE 0
50 IF QRESULT = 0 THEN PRINT "HEADS"
60 IF QRESULT = 1 THEN PRINT "TAILS"
70 END
```

**Explanation:**
1. Initialize 1 qubit in |0⟩
2. Apply Hadamard to create superposition
3. Measure (50/50 chance)
4. Print result

---

### Pattern 2: Bell State (Entanglement)
```basic
10 REM Bell State
20 QINIT 2
30 HADAMARD 0
40 CNOT 0,1
50 MEASURE 0
60 LET FIRST = QRESULT
70 MEASURE 1
80 LET SECOND = QRESULT
90 PRINT "Qubit 0: "; FIRST
100 PRINT "Qubit 1: "; SECOND
110 END
```

**Explanation:**
1. Initialize 2 qubits
2. Put qubit 0 in superposition
3. Entangle with CNOT
4. Measure both (always match!)

---

### Pattern 3: Quantum Random Number (0-3)
```basic
10 REM Quantum Random Number
20 QINIT 2
30 HADAMARD 0
40 HADAMARD 1
50 MEASURE 0
60 LET A = QRESULT
70 MEASURE 1
80 LET B = QRESULT
90 LET RESULT = A * 2 + B
100 PRINT "Random: "; RESULT
110 END
```

**Explanation:**
1. Initialize 2 qubits
2. Put both in superposition
3. Measure both
4. Combine into 2-bit number (0-3)

---

### Pattern 4: Quantum Random Number (0-7)
```basic
10 REM Quantum Random Number (0-7)
20 QINIT 3
30 HADAMARD 0
40 HADAMARD 1
50 HADAMARD 2
60 MEASURE 0
70 LET A = QRESULT
80 MEASURE 1
90 LET B = QRESULT
100 MEASURE 2
110 LET C = QRESULT
120 LET RESULT = A * 4 + B * 2 + C
130 PRINT "Random: "; RESULT
140 END
```

**Explanation:**
1. Initialize 3 qubits
2. Put all in superposition
3. Measure all three
4. Combine into 3-bit number (0-7)

---

### Pattern 5: Superposition Demo
```basic
10 REM Superposition Demo
20 QINIT 1
30 PRINT "Initial: |0>"
40 HADAMARD 0
50 PRINT "Superposition: |0> + |1>"
60 MEASURE 0
70 PRINT "Collapsed to: "; QRESULT
80 END
```

---

### Pattern 6: Multiple Measurements
```basic
10 REM Multiple Coin Flips
20 LET HEADS = 0
30 LET TAILS = 0
40 LET I = 1
50 QINIT 1
60 HADAMARD 0
70 MEASURE 0
80 IF QRESULT = 0 THEN LET HEADS = HEADS + 1
90 IF QRESULT = 1 THEN LET TAILS = TAILS + 1
100 LET I = I + 1
110 IF I <= 10 THEN GOTO 50
120 PRINT "Heads: "; HEADS
130 PRINT "Tails: "; TAILS
140 END
```

---

## Quantum Concepts

### Superposition
A qubit can be in multiple states simultaneously until measured.

**Creating Superposition:**
```basic
HADAMARD 0    REM Qubit 0 now |0> + |1>
```

### Entanglement
Two qubits become correlated - measuring one affects the other.

**Creating Entanglement:**
```basic
HADAMARD 0    REM Superposition
CNOT 0,1      REM Entangle with qubit 1
```

### Measurement Collapse
Measuring a qubit collapses it from superposition to definite state.

**Before Measurement:** |0⟩ + |1⟩ (both states)
**After Measurement:** |0⟩ OR |1⟩ (one state)

### Quantum Randomness
True randomness from quantum mechanics, not pseudo-random.

```basic
HADAMARD 0    REM Create superposition
MEASURE 0     REM True quantum randomness
```

---

## Best Practices

### 1. Always Initialize First
```basic
10 QINIT 2    REM Always first!
20 HADAMARD 0
```

### 2. Use Comments
```basic
10 REM Quantum Coin Flip Program
20 REM Initialize quantum system
30 QINIT 1
```

### 3. Line Number Increments of 10
```basic
10 REM Good - allows insertions
20 QINIT 1
30 HADAMARD 0
```

### 4. Uppercase Variables
```basic
10 LET COUNT = 0
20 LET RESULT = QRESULT
```

### 5. Check Qubit Indices
```basic
10 QINIT 2        REM Creates qubits 0 and 1
20 HADAMARD 0     REM OK
30 HADAMARD 2     REM ERROR - only 0,1 exist
```

---

## Error Messages

### "Invalid line format"
- Missing line number
- Line number not at start

### "Unknown statement"
- Typo in command
- Unsupported BASIC statement

### "QINIT not called"
- Trying quantum operations before QINIT

### "Qubit index out of range"
- Using qubit index >= number of qubits

### "IF without THEN"
- Missing THEN in conditional

---

## Tips & Tricks

### Debugging
Add PRINT statements to see values:
```basic
10 MEASURE 0
20 PRINT "Measured: "; QRESULT
```

### Testing Randomness
Run programs multiple times to see different outcomes.

### Visualizing Circuits
The circuit visualizer shows your quantum operations in real-time.

### Learning Path
1. Start with coin flip
2. Try Bell state
3. Build random number generator
4. Explore more complex algorithms

---

## Resources

- **Examples**: Check `examples/` directory
- **Specs**: See `specs/` for detailed specifications
- **Standards**: Read `.kiro/steering/quantum-basic-standards.md`

---

**Happy Quantum Coding!** ⚛️
