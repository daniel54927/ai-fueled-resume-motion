import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Connection {
  from: Node;
  to: Node;
  strength: number;
}

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameIdRef = useRef<number>();
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const activatedNodesRef = useRef<Set<number>>(new Set());
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNodes();
    };
    
    const initializeNodes = () => {
      const nodeCount = Math.min(Math.floor(window.innerWidth / 100), 30);
      
      // Create nodes
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
        });
      }
      
      // Create connections between nearby nodes
      connectionsRef.current = [];
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const distance = getDistance(nodesRef.current[i], nodesRef.current[j]);
          if (distance < canvas.width / 4) {
            connectionsRef.current.push({
              from: nodesRef.current[i],
              to: nodesRef.current[j],
              strength: 1 - distance / (canvas.width / 4),
            });
          }
        }
      }
    };
    
    // Calculate distance between nodes
    const getDistance = (node1: Node, node2: Node) => {
      const dx = node1.x - node2.x;
      const dy = node1.y - node2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };
    
    const updateNodes = () => {
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;
      
      // Update nodes position
      nodesRef.current.forEach((node, index) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Keep within boundaries
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
        
        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If mouse is close to this node, activate it
        if (distance < 100) {
          activatedNodesRef.current.add(index);
          
          // Create slight attraction/repulsion
          const force = 0.2;
          const angle = Math.atan2(dy, dx);
          node.vx -= Math.cos(angle) * force;
          node.vy -= Math.sin(angle) * force;
          
          // Limit velocity
          const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (speed > 2) {
            node.vx = (node.vx / speed) * 2;
            node.vy = (node.vy / speed) * 2;
          }
        }
      });
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connectionsRef.current.forEach(conn => {
        const isFromActivated = activatedNodesRef.current.has(nodesRef.current.indexOf(conn.from));
        const isToActivated = activatedNodesRef.current.has(nodesRef.current.indexOf(conn.to));
        
        const alpha = Math.min(0.2, conn.strength);
        let lineColor;
        
        // Different colors for activated connections
        if (isFromActivated && isToActivated) {
          lineColor = `rgba(51, 195, 240, ${alpha * 1.5})`; // Brighter blue for active connections
        } else if (isFromActivated || isToActivated) {
          lineColor = `rgba(51, 195, 240, ${alpha})`;
        } else {
          lineColor = `rgba(155, 135, 245, ${alpha * 0.5})`;
        }
        
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = conn.strength * 1.5;
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.stroke();
      });
      
      // Draw nodes
      nodesRef.current.forEach((node, index) => {
        const isActivated = activatedNodesRef.current.has(index);
        
        ctx.beginPath();
        ctx.fillStyle = isActivated ? '#33C3F0' : 'rgba(155, 135, 245, 0.6)';
        ctx.arc(node.x, node.y, isActivated ? node.radius * 1.5 : node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow to activated nodes
        if (isActivated) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(51, 195, 240, 0.2)';
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Fade out activated nodes over time
      if (activatedNodesRef.current.size > 0) {
        const oldActivated = Array.from(activatedNodesRef.current);
        activatedNodesRef.current = new Set(oldActivated.slice(-5)); // Keep only most recent activations
      }
    };
    
    const animate = () => {
      updateNodes();
      draw();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    // Initialize and start animation
    resizeCanvas();
    animate();
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export default NeuralBackground;
