# Quantum BASIC - Demo Script

## 5-Minute Demo Walkthrough

### Introduction (30 seconds)
"Welcome to **Quantum BASIC** - a resurrection project that brings 1960s BASIC programming into the quantum computing era. We've taken a dead technology and reimagined it for tomorrow's problems, all built using Kiro's powerful features."

### The Resurrection (1 minute)
"BASIC was the first programming language for millions of developers in the 70s and 80s. It's been dead for decades, replaced by modern languages. But what if we could bring it back with quantum superpowers?

That's exactly what we did. Quantum BASIC lets you write quantum algorithms using familiar BASIC syntax - line numbers, PRINT statements, GOTO - but with quantum gates like HADAMARD, CNOT, and MEASURE."

### Live Demo (2 minutes)

#### Part 1: Quantum Coin Flip
1. Open http://localhost:3000
2. Show the retro green terminal interface
3. Click "Coin Flip" example button
4. Point out the BASIC code:
   ```basic
   10 REM Quantum Coin Flip
   20 QINIT 1
   30 HADAMARD 0
   40 MEASURE 0
   50 IF QRESULT = 0 THEN PRINT "HEADS"
   60 IF QRESULT = 1 THEN PRINT "TAILS"
   ```
5. Click RUN - show output
6. Run multiple times - show randomness
7. Point out quantum circuit visualization

#### Part 2: Bell State (Entanglement)
1. Click "Bell State" button
2. Explain: "This creates quantum entanglement - spooky action at a distance"
3. Show the code with HADAMARD and CNOT
4. Click RUN
5. Point out: "Both qubits always match - that's entanglement!"
6. Show circuit diagram with control/target gates

### Kiro Features Showcase (1.5 minutes)

#### 1. Vibe Coding
"The entire project was built through conversation with Kiro. I said 'Create a BASIC interpreter with quantum computing' and Kiro scaffolded everything - no manual boilerplate."

#### 2. Agent Hooks
"Watch this - I'll save a .qb file..."
- Open `examples/coin-flip.qb` in editor
- Make a small change (add a comment)
- Save the file
- "See? The hook automatically ran the program and validated the syntax. No manual commands needed."

Show the hooks in `.kiro/hooks/`:
- Auto-run on save
- Generate quantum algorithm (manual button)
- Validate syntax

#### 3. Steering Docs
"This steering doc enforces quantum BASIC standards automatically."

Open `.kiro/steering/quantum-basic-standards.md`

"Every time Kiro generates code, it follows these rules:
- Line numbers in increments of 10
- Uppercase variables
- QINIT before quantum operations
- Proper quantum patterns"

#### 4. MCP Integration
"We built a custom MCP server for quantum simulation."

Show `.kiro/settings/mcp.json`

"Ask Kiro: 'Use the quantum-simulator MCP to generate a bell_state program'"

Demonstrate the MCP tool generating code.

#### 5. Specs
"For complex features, we used specs to structure development."

Open `specs/quantum-gates.md`

"This spec defines requirements, design, implementation tasks, and test cases. It's like a blueprint that Kiro follows."

### Why This Matters (30 seconds)

"Quantum BASIC demonstrates three things:

1. **Educational Value** - Makes quantum computing accessible through familiar BASIC syntax
2. **Kiro's Power** - All five major features working together seamlessly
3. **Creative Resurrection** - Bringing dead tech back with cutting-edge capabilities

This is how you bridge 50+ years of computing history."

### Closing
"From vibe coding to automated workflows to structured specs, Kiro transformed this from idea to working quantum platform. BASIC is back. And it's quantum. Thank you!"

---

## Quick Demo Commands

### Terminal Commands
```bash
# Start the app
npm run dev

# In another terminal, test MCP
cd mcp-server
node quantum-mcp.js
```

### Browser
- Open: http://localhost:3000
- Try all three example buttons
- Edit code and click RUN

### Kiro Commands
- "Generate a quantum coin flip program"
- "Use MCP to create a bell_state algorithm"
- "Validate this quantum BASIC code"
- "Explain how the CNOT gate works"

### Files to Show
1. `.kiro/hooks/auto-run-on-save.json` - Hook configuration
2. `.kiro/steering/quantum-basic-standards.md` - Coding standards
3. `.kiro/settings/mcp.json` - MCP setup
4. `specs/quantum-gates.md` - Spec example
5. `examples/bell-state.qb` - Quantum program
6. `backend/quantum.js` - Quantum engine implementation

### Key Talking Points
- ✅ Uses ALL 5 Kiro features (vibe, hooks, steering, MCP, specs)
- ✅ Resurrection category - brings BASIC back to life
- ✅ Educational value - teaches quantum computing
- ✅ Creative pairing - 1960s + 2020s tech
- ✅ Working implementation - real quantum algorithms
- ✅ Visual appeal - retro terminal + circuit diagrams

### Backup Demo (If Live Demo Fails)
1. Show screenshots in README
2. Walk through code structure
3. Explain Kiro features from documentation
4. Show example programs in `examples/` directory
5. Demonstrate MCP server code

### Questions & Answers

**Q: Does this run on real quantum hardware?**
A: Currently simulated, but the MCP architecture allows connecting to IBM Quantum or AWS Braket.

**Q: Can you write complex quantum algorithms?**
A: Yes! The interpreter supports Deutsch's algorithm, Grover's search, and more. Check the examples.

**Q: How does Kiro help with this?**
A: Kiro handled scaffolding, enforced standards via steering, automated workflows with hooks, and extended capabilities via MCP.

**Q: Why BASIC?**
A: BASIC was the first language for millions. By resurrecting it with quantum capabilities, we make quantum computing accessible to a whole generation of developers.

**Q: What's the most impressive Kiro feature here?**
A: The integration of all five features. Vibe coding built it, specs structured it, steering enforced standards, hooks automated workflows, and MCP extended capabilities. They work together seamlessly.
