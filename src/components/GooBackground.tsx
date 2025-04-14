
import { useEffect, useRef, useState } from 'react';

interface GooNode {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
  hue: number;
}

const GooBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GooNode[]>([]);
  const animationFrameIdRef = useRef<number>();
  const mousePositionRef = useRef({ x: 0, y: 0, isDown: false });
  
  // Track window dimensions to properly resize canvas
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup
    const resizeCanvas = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // When resizing, we should re-initialize nodes to fit the new dimensions
      initializeNodes();
    };
    
    const initializeNodes = () => {
      // Create nodes
      const nodeCount = Math.min(Math.floor(window.innerWidth / 80), 35);
      
      const nodes: GooNode[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        nodes.push({
          x,
          y,
          targetX: x, // Initial target is the same as position
          targetY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 5 + 3,
          connections: [],
          hue: Math.random() > 0.5 ? 200 : 190 // Blue/Cyan hues for tech feel
        });
      }
      
      // Create connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const connectionCount = Math.floor(Math.random() * 3) + 1; // 1-3 connections
        
        for (let c = 0; c < connectionCount; c++) {
          // Find a random node to connect to
          let targetIdx;
          do {
            targetIdx = Math.floor(Math.random() * nodes.length);
          } while (targetIdx === i || node.connections.includes(targetIdx));
          
          node.connections.push(targetIdx);
        }
      }
      
      nodesRef.current = nodes;
    };
    
    const updateNodes = () => {
      const nodes = nodesRef.current;
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;
      const isMouseDown = mousePositionRef.current.isDown;
      
      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Calculate distance to mouse
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        
        // Mouse interaction - attraction when clicked, subtle movement when hovering
        if (isMouseDown && distanceToMouse < 200) {
          // Strong attraction to mouse
          const angle = Math.atan2(dy, dx);
          const force = (200 - distanceToMouse) * 0.01;
          node.vx += Math.cos(angle) * force;
          node.vy += Math.sin(angle) * force;
        } else if (distanceToMouse < 150) {
          // Gentle movement when mouse is near
          const angle = Math.atan2(dy, dx);
          node.vx += Math.cos(angle) * 0.05;
          node.vy += Math.sin(angle) * 0.05;
        }
        
        // Apply physics - move toward target with elastic effect
        const tx = node.targetX - node.x;
        const ty = node.targetY - node.y;
        
        // Spring effect
        node.vx += tx * 0.003;
        node.vy += ty * 0.003;
        
        // Dampen velocity (friction)
        node.vx *= 0.95;
        node.vy *= 0.95;
        
        // Apply velocity
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges with elasticity
        if (node.x < node.radius) {
          node.x = node.radius;
          node.vx *= -0.7;
        } else if (node.x > canvas.width - node.radius) {
          node.x = canvas.width - node.radius;
          node.vx *= -0.7;
        }
        
        if (node.y < node.radius) {
          node.y = node.radius;
          node.vy *= -0.7;
        } else if (node.y > canvas.height - node.radius) {
          node.y = canvas.height - node.radius;
          node.vy *= -0.7;
        }
        
        // Occasionally update target location
        if (Math.random() < 0.001) {
          node.targetX = Math.random() * canvas.width;
          node.targetY = Math.random() * canvas.height;
        }
      }
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gooey connections first
      ctx.lineWidth = 1.5;
      
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach(targetIdx => {
          const target = nodesRef.current[targetIdx];
          
          // Calculate distance between nodes
          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw if within reasonable distance
          if (distance < 250) {
            // Create gradient based on the nodes' hues
            const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
            gradient.addColorStop(0, `hsla(${node.hue}, 80%, 60%, 0.2)`);
            gradient.addColorStop(1, `hsla(${target.hue}, 80%, 60%, 0.2)`);
            
            ctx.strokeStyle = gradient;
            
            // Draw a bezier curve to simulate elasticity
            const midX = (node.x + target.x) / 2;
            const midY = (node.y + target.y) / 2;
            
            // Add a slight curve based on distance
            const curveOffset = Math.min(30, distance / 8);
            const controlX = midX + (Math.random() - 0.5) * curveOffset;
            const controlY = midY + (Math.random() - 0.5) * curveOffset;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.quadraticCurveTo(controlX, controlY, target.x, target.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw nodes
      nodesRef.current.forEach((node) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        );
        
        gradient.addColorStop(0, `hsla(${node.hue}, 80%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${node.hue}, 80%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Actual node
        ctx.fillStyle = `hsla(${node.hue}, 80%, 60%, 0.8)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    const animate = () => {
      updateNodes();
      draw();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current.x = e.clientX - rect.left;
      mousePositionRef.current.y = e.clientY - rect.top;
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      mousePositionRef.current.isDown = true;
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      mousePositionRef.current.isDown = false;
    };
    
    // Initialize and start animation
    resizeCanvas();
    animate();
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dimensions.width, dimensions.height]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default GooBackground;
