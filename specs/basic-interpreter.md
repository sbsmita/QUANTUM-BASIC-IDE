# Spec: BASIC Language Interpreter

## Overview
Implement a BASIC language interpreter that supports classic BASIC statements plus quantum computing extensions.

## Requirements

### R1: Classic BASIC Statements
Support the following traditional BASIC statements:
- PRINT - Output text and variables
- LET - Variable assignment
- IF...THEN - Conditional execution
- GOTO - Jump to line number
- REM - Comments
- END - Program termination

### R2: Quantum Extensions
New quantum-specific statements:
- QINIT n - Initialize quantum register
- HADAMARD q - Apply Hadamard gate
- QNOT q - Apply Pauli-X gate
- CNOT c,t - Apply CNOT gate
- MEASURE q - Measure qubit

### R3: Variable System
- Uppercase variable names (A, X, COUNT)
- Support integers and floats
- Special variable: QRESULT (measurement result)
- Variables persist across statements

### R4: Expression Evaluation
- Arithmetic: +, -, *, /
- Comparisons: =, <>, <, >, <=, >=
- String literals in quotes
- Variable substitution

## Design

### Program Structure
```
Line Number → Statement → Execution
    ↓            ↓            ↓
  10-9999    PRINT/LET/etc  Output/State Change
```

### Execution Flow
1. Parse all lines into line number + statement
2. Sort by line number
3. Execute sequentially
4. Handle GOTO by jumping to line
5. Stop at END or last line

### Parser Design
```javascript
parseLine(line) {
  // Extract: "10 PRINT X" → { lineNumber: 10, statement: "PRINT X" }
}

executeLine(line) {
  // Route to appropriate handler based on statement type
}
```

## Implementation Tasks

### Task 1: Line Parser
**File**: `backend/interpreter.js`
**Method**: `parseLine(line)`
**Steps**:
1. Use regex to extract line number
2. Extract statement text
3. Validate line number range (10-9999)
4. Return structured object

### Task 2: Statement Router
**File**: `backend/interpreter.js`
**Method**: `executeLine(line)`
**Steps**:
1. Check statement prefix (PRINT, LET, etc.)
2. Route to appropriate handler
3. Handle errors gracefully
4. Update program counter

### Task 3: PRINT Handler
**Steps**:
1. Extract expression after PRINT
2. Evaluate expression
3. Convert to string
4. Add to output array

### Task 4: LET Handler
**Steps**:
1. Parse variable = expression
2. Evaluate right side
3. Store in variables object
4. Support arithmetic expressions

### Task 5: IF...THEN Handler
**Steps**:
1. Parse condition and THEN clause
2. Evaluate condition
3. If true, execute THEN statement
4. Support nested execution

### Task 6: GOTO Handler
**Steps**:
1. Extract target line number
2. Find index in sorted lines array
3. Update program counter
4. Handle invalid line numbers

### Task 7: Expression Evaluator
**File**: `backend/interpreter.js`
**Method**: `evaluateExpression(expr)`
**Steps**:
1. Handle string literals
2. Handle numeric literals
3. Substitute variables
4. Evaluate arithmetic
5. Return result

### Task 8: Condition Evaluator
**Method**: `evaluateCondition(condition)`
**Steps**:
1. Parse operator (=, <>, <, >, <=, >=)
2. Evaluate left and right expressions
3. Apply comparison
4. Return boolean

## Testing

### Test Case 1: Basic Arithmetic
```basic
10 LET X = 5
20 LET Y = 3
30 LET Z = X + Y
40 PRINT Z
```
Expected Output: `8`

### Test Case 2: Conditional Logic
```basic
10 LET X = 10
20 IF X > 5 THEN PRINT "BIG"
30 IF X < 5 THEN PRINT "SMALL"
```
Expected Output: `BIG`

### Test Case 3: Loop with GOTO
```basic
10 LET I = 1
20 PRINT I
30 LET I = I + 1
40 IF I <= 5 THEN GOTO 20
50 END
```
Expected Output: `1 2 3 4 5`

### Test Case 4: Quantum Integration
```basic
10 QINIT 1
20 HADAMARD 0
30 MEASURE 0
40 LET RESULT = QRESULT
50 PRINT RESULT
```
Expected Output: `0` or `1` (random)

## Acceptance Criteria
- [ ] All classic BASIC statements work
- [ ] Quantum statements integrate seamlessly
- [ ] Variables store and retrieve correctly
- [ ] Expression evaluation handles arithmetic
- [ ] Conditionals work properly
- [ ] GOTO jumps to correct lines
- [ ] Error messages are clear
- [ ] All test cases pass
