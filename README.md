# Quantum BASIC ⚛️

> **Resurrection Category - Kiroween Hackathon 2024**

Bringing BASIC programming back from the dead with quantum computing superpowers. Write quantum algorithms using familiar 1960s BASIC syntax on a retro green-screen terminal.

![Quantum BASIC](https://img.shields.io/badge/Category-Resurrection-purple) ![Kiro Features](https://img.shields.io/badge/Kiro%20Features-5%2F5-green) ![Status](https://img.shields.io/badge/Status-Working-success)

## 🎯 The Resurrection

**BASIC** (Beginner's All-purpose Symbolic Instruction Code) taught millions to code in the 1970s-80s. It's been dead for decades, replaced by modern languages.

**We brought it back.** With quantum computing.

Now you can write quantum algorithms using line numbers, PRINT statements, and GOTO - but with quantum gates like HADAMARD, CNOT, and MEASURE.

## ✨ Features

- 🖥️ **Classic BASIC Interpreter** - Line numbers, variables, conditionals, loops
- ⚛️ **Quantum Operations** - QINIT, HADAMARD, QNOT, CNOT, MEASURE
- 📊 **Circuit Visualization** - Real-time quantum circuit diagrams
- 🎨 **Retro Terminal UI** - Authentic green-screen aesthetic
- 🔌 **MCP Integration** - Quantum simulator tools
- 📚 **Educational Examples** - Coin flip, Bell states, quantum RNG

## 🚀 Quick Start

```bash
# Install dependencies
npm install
npm run install:all
cd mcp-server && npm install && cd ..

# Start the app
npm run dev
```

Open **http://localhost:3000** and start quantum coding!

## 💻 Example: Quantum Coin Flip

```basic
10 REM Quantum Coin Flip
20 QINIT 1
30 HADAMARD 0
40 MEASURE 0
50 IF QRESULT = 0 THEN PRINT "HEADS"
60 IF QRESULT = 1 THEN PRINT "TAILS"
70 END
```

Run it multiple times - true quantum randomness!

## 🎓 Example: Bell State (Entanglement)

```basic
10 REM Bell State - Quantum Entanglement
20 QINIT 2
30 HADAMARD 0
40 CNOT 0,1
50 MEASURE 0
60 PRINT "Qubit 0: "; QRESULT
70 MEASURE 1
80 PRINT "Qubit 1: "; QRESULT
90 END
```

Both qubits always match - that's quantum entanglement!

## 🛠️ Kiro Features (5/5)

This project showcases **ALL** major Kiro features:

### 1. ✨ Vibe Coding
Built the entire project through natural conversation with Kiro. No manual boilerplate.

### 2. 🪝 Agent Hooks
- **Auto-run on save** - Execute programs when `.qb` files are saved
- **Generate algorithms** - Use MCP to create quantum programs
- **Validate syntax** - Check code against standards automatically

### 3. 📋 Steering Docs
`quantum-basic-standards.md` enforces:
- Line numbering conventions (increments of 10)
- Variable naming (uppercase)
- Quantum operation patterns
- Best practices

### 4. 🔌 MCP Integration
Custom quantum simulator MCP server with tools:
- `simulate_circuit` - Run quantum simulations
- `get_quantum_state` - Analyze quantum states
- `generate_quantum_program` - Generate BASIC code

### 5. 📐 Specs
Structured development with comprehensive specs:
- `quantum-gates.md` - Gate operations specification
- `basic-interpreter.md` - Language interpreter design

## 🏗️ Architecture

```
Frontend (React + Vite)
    ↓ HTTP API
Backend (Node.js + Express)
    ↓
BASIC Interpreter ←→ Quantum Engine
    ↓
MCP Server (Quantum Simulator)
```

## 📁 Project Structure

```
quantum-basic/
├── backend/              # BASIC interpreter + quantum engine
├── frontend/             # React retro terminal UI
├── mcp-server/           # MCP quantum simulator
├── examples/             # Sample .qb programs
├── specs/                # Feature specifications
└── .kiro/
    ├── hooks/           # Agent hooks
    ├── steering/        # Coding standards
    └── settings/        # MCP configuration
```

## 🎮 Try It Out

1. Click **"Coin Flip"** - See quantum randomness
2. Click **"Bell State"** - Witness entanglement
3. Click **"Random #"** - Generate quantum random numbers
4. Write your own quantum programs!

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Installation and setup guide
- **[KIRO_FEATURES.md](KIRO_FEATURES.md)** - Detailed Kiro features explanation
- **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** - 5-minute demo walkthrough
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Complete project overview
- **[HACKATHON_SUBMISSION.md](HACKATHON_SUBMISSION.md)** - Official submission document

## 🎯 Quantum Operations

| Command | Description | Example |
|---------|-------------|---------|
| `QINIT n` | Initialize n qubits | `QINIT 2` |
| `HADAMARD q` | Create superposition | `HADAMARD 0` |
| `QNOT q` | Quantum NOT gate | `QNOT 1` |
| `CNOT c,t` | Controlled-NOT | `CNOT 0,1` |
| `MEASURE q` | Measure qubit | `MEASURE 0` |

## 🏆 Why This Matters

### Educational Value
- Makes quantum computing accessible through familiar BASIC syntax
- Visual circuit diagrams aid understanding
- Hands-on learning with real quantum algorithms

### Technical Achievement
- Full BASIC interpreter with quantum extensions
- Real quantum state simulation
- Complete Kiro feature integration

### Creative Vision
- Bridges 50+ years of computing history
- Unexpected pairing: 1960s syntax + 2020s quantum physics
- Retro-futuristic aesthetic

## 🔮 Future Enhancements

- Connect to IBM Quantum or AWS Braket
- More quantum gates (Y, Z, Toffoli, Fredkin)
- Quantum debugger with state visualization
- Algorithm library (Shor's, Grover's, Deutsch-Jozsa)
- Collaborative quantum coding

## 🎬 Demo

See **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** for a complete 5-minute demo walkthrough.

## 📄 License

MIT

## 🙏 Acknowledgments

Built with **Kiro** - the AI-powered IDE that made this resurrection possible.

**Quantum BASIC: Where nostalgia meets the future.** ⚛️
