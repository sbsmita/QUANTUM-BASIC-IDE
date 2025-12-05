import { useEffect, useRef } from 'react';
import './CircuitVisualizer.css';

function CircuitVisualizer({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { numQubits, gates } = data;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw settings
    const qubitSpacing = 60;
    const gateSpacing = 80;
    const startX = 50;
    const startY = 40;

    // Draw qubit lines
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    for (let i = 0; i < numQubits; i++) {
      const y = startY + i * qubitSpacing;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + gates.length * gateSpacing + 50, y);
      ctx.stroke();

      // Qubit label
      ctx.fillStyle = '#00ff00';
      ctx.font = '14px monospace';
      ctx.fillText(`q${i}`, 10, y + 5);
    }

    // Draw gates
    gates.forEach((gate, gateIndex) => {
      const x = startX + gateIndex * gateSpacing + 40;

      if (gate.gate === 'H') {
        // Hadamard gate
        const y = startY + gate.qubit * qubitSpacing;
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x - 15, y - 15, 30, 30);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('H', x - 7, y + 6);
      } else if (gate.gate === 'X') {
        // X gate
        const y = startY + gate.qubit * qubitSpacing;
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x - 15, y - 15, 30, 30);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('X', x - 7, y + 6);
      } else if (gate.gate === 'CNOT') {
        // CNOT gate
        const controlY = startY + gate.control * qubitSpacing;
        const targetY = startY + gate.target * qubitSpacing;

        // Control dot
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(x, controlY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Vertical line
        ctx.strokeStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(x, controlY);
        ctx.lineTo(x, targetY);
        ctx.stroke();

        // Target circle
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, targetY, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Target cross
        ctx.beginPath();
        ctx.moveTo(x - 10, targetY);
        ctx.lineTo(x + 10, targetY);
        ctx.moveTo(x, targetY - 10);
        ctx.lineTo(x, targetY + 10);
        ctx.stroke();
      } else if (gate.gate === 'M') {
        // Measurement
        const y = startY + gate.qubit * qubitSpacing;
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 15, y - 15, 30, 30);
        
        // Meter symbol
        ctx.beginPath();
        ctx.arc(x, y + 5, 8, Math.PI, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + 5);
        ctx.lineTo(x + 5, y - 3);
        ctx.stroke();
      }
    });

  }, [data]);

  if (!data) return null;

  return (
    <div className="circuit-visualizer">
      <div className="circuit-header">QUANTUM CIRCUIT</div>
      <div style={{ flex: 1, overflow: 'auto', background: '#000' }}>
        <canvas
          ref={canvasRef}
          width={650}
          height={data.numQubits * 60 + 40}
          className="circuit-canvas"
        />
      </div>
    </div>
  );
}

export default CircuitVisualizer;
