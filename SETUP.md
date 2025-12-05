# Quantum BASIC - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

### 1. Install Root Dependencies
```bash
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 3. Install MCP Server Dependencies
```bash
cd mcp-server
npm install
cd ..
```

## Running the Application

### Option 1: Run Everything (Recommended)
```bash
npm run dev
```

This starts both backend (port 3001) and frontend (port 3000) concurrently.

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

## Accessing the Application

Open your browser to: http://localhost:3000

You should see the retro green terminal interface with example Quantum BASIC programs.

## Testing the MCP Server

The MCP server is configured in `.kiro/settings/mcp.json`. To test it with Kiro:

1. Open Kiro IDE
2. The MCP server should auto-connect
3. Try asking: "Use the quantum-simulator MCP to generate a coin_flip program"

## Example Programs

Located in `examples/` directory:
- `coin-flip.qb` - Simple quantum coin flip
- `bell-state.qb` - Quantum entanglement demo
- `random-number.qb` - Quantum random number generator
- `superposition-demo.qb` - Superposition visualization
- `quantum-not.qb` - X gate demonstration

## Kiro Features Setup

### Agent Hooks
Hooks are in `.kiro/hooks/` and will activate automatically when:
- You save a `.qb` file (auto-run and validation)
- You click the manual "Generate Quantum Algorithm" button

### Steering Docs
The `quantum-basic-standards.md` steering doc is always active and guides code generation.

### MCP Integration
The quantum simulator MCP server provides tools for:
- Circuit simulation
- Quantum state analysis
- Algorithm generation

## Troubleshooting

### Backend Connection Error
If you see "Connection Error" in the terminal:
- Ensure backend is running on port 3001
- Check `npm run dev:backend` output for errors

### MCP Server Not Connecting
- Verify Node.js version is 18+
- Check `.kiro/settings/mcp.json` configuration
- Restart Kiro IDE

### Port Already in Use
If ports 3000 or 3001 are taken:
- Change port in `frontend/vite.config.js` (frontend)
- Change PORT in `backend/server.js` (backend)

## Project Structure

```
quantum-basic/
├── backend/              # BASIC interpreter + quantum engine
├── frontend/             # React retro terminal UI
├── mcp-server/           # MCP quantum simulator
├── examples/             # Sample .qb programs
├── specs/                # Feature specifications
├── .kiro/
│   ├── hooks/           # Agent hooks
│   ├── steering/        # Coding standards
│   └── settings/        # MCP configuration
└── README.md
```

## Next Steps

1. Try running the example programs
2. Modify them to create your own quantum algorithms
3. Use Kiro's vibe coding to generate new programs
4. Explore the MCP tools for quantum simulation

Happy quantum coding! 🎯⚛️
