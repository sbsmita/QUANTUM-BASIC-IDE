import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { BasicInterpreter } from './interpreter.js';
import { QuantumEngine } from './quantum.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.post('/execute', async (req, res) => {
  try {
    const { code } = req.body;
    const interpreter = new BasicInterpreter();
    const quantumEngine = new QuantumEngine();
    
    interpreter.setQuantumEngine(quantumEngine);
    const result = await interpreter.execute(code);
    
    res.json({
      success: true,
      output: result.output,
      quantumState: result.quantumState,
      circuitData: result.circuitData
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      output: [`ERROR: ${error.message}`]
    });
  }
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Quantum BASIC backend running on port ${PORT}`);
});
