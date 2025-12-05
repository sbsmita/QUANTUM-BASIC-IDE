# Quantum BASIC - Kiro Features Showcase

This project demonstrates all major Kiro features for the Kiroween Hackathon.

## 1. Vibe Coding ✨

Natural language interaction with Kiro to build the project:
- "Create a BASIC interpreter with quantum computing support"
- "Add a retro green terminal UI"
- "Generate quantum circuit visualizations"

The entire project was scaffolded through conversational development with Kiro.

## 2. Agent Hooks 🪝

Located in `.kiro/hooks/`:

### Auto-run on Save
**File**: `auto-run-on-save.json`
- **Trigger**: When any `.qb` file is saved
- **Action**: Automatically executes the Quantum BASIC program
- **Benefit**: Instant feedback loop for quantum programming

### Generate Quantum Algorithm
**File**: `generate-quantum-code.json`
- **Trigger**: Manual button click
- **Action**: Uses MCP to generate common quantum algorithms
- **Benefit**: Quick scaffolding of quantum programs

### Validate Quantum Syntax
**File**: `validate-quantum-syntax.json`
- **Trigger**: On `.qb` file save
- **Action**: Validates code against quantum-basic-standards
- **Benefit**: Catches errors before execution

## 3. Steering Docs 📋

Located in `.kiro/steering/`:

### Quantum BASIC Standards
**File**: `quantum-basic-standards.md`
- **Inclusion**: Always active
- **Purpose**: Enforces coding standards for Quantum BASIC
- **Content**:
  - Line numbering conventions (increments of 10)
  - Variable naming (uppercase)
  - Quantum operation patterns
  - Error handling guidelines
  - Best practices

This steering doc ensures all generated code follows consistent patterns.

## 4. MCP Integration 🔌

Located in `.kiro/settings/mcp.json` and `mcp-server/`:

### Quantum Simulator MCP Server
**Server**: `quantum-simulator`
- **Command**: `node mcp-server/quantum-mcp.js`
- **Tools**:
  1. `simulate_circuit` - Run quantum circuit simulations
  2. `get_quantum_state` - Analyze quantum state vectors
  3. `generate_quantum_program` - Generate BASIC code for algorithms

**Auto-approved tools**: `simulate_circuit`, `get_quantum_state`

### MCP Capabilities
- Connect to real quantum simulators
- Generate quantum algorithms on demand
- Analyze quantum states and entanglement
- Bridge classical BASIC with quantum computing

## 5. Specs 📐

Located in `specs/`:

### Quantum Gates Spec
**File**: `quantum-gates.md`
- Defines quantum gate operations (H, X, CNOT)
- Mathematical representations
- Implementation tasks with acceptance criteria
- Test cases for verification

### BASIC Interpreter Spec
**File**: `basic-interpreter.md`
- Classic BASIC statement support
- Quantum extensions design
- Parser and execution flow
- Expression evaluation logic

Specs provide structured development with clear requirements, design decisions, and implementation tasks.

## How Kiro Features Work Together

1. **Vibe Coding** → Initial project creation through conversation
2. **Specs** → Formalize requirements and implementation plan
3. **Steering Docs** → Enforce standards during development
4. **Agent Hooks** → Automate workflows (run on save, validate)
5. **MCP** → Extend capabilities with quantum simulation tools

## Example Workflow

1. Developer asks Kiro: "Create a Bell state program"
2. **Steering doc** ensures proper format (line numbers, QINIT first)
3. **MCP** generates the quantum algorithm code
4. Developer saves the `.qb` file
5. **Agent hook** automatically runs the program
6. **Agent hook** validates syntax against standards
7. Output shows in retro terminal with circuit visualization

## Running the Project

```bash
# Install dependencies
npm run install:all
cd mcp-server && npm install && cd ..

# Start development
npm run dev
```

Open http://localhost:3000 and experience quantum computing in BASIC!

## Kiro-Powered Development Benefits

- **Faster Development**: Vibe coding eliminates boilerplate
- **Consistent Quality**: Steering docs enforce standards
- **Automated Workflows**: Hooks handle repetitive tasks
- **Extended Capabilities**: MCP adds quantum simulation
- **Structured Planning**: Specs organize complex features

This project showcases how Kiro transforms the development experience from idea to working application.
