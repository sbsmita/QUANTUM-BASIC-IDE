import express from 'express';
import cors from 'cors';
import { BasicInterpreter } from './interpreter.js';
import { QuantumEngine } from './quantum.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Quantum BASIC backend running on port ${PORT}`);
});
