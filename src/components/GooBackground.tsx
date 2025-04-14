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
  sectionY: number;
}

const GooBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GooNode[]>([]);
  const animationFrameIdRef = useRef<number>();
  const mousePositionRef = useRef({ x: 0, y: 0, isDown: false });
  const scrollYRef = useRef(0);
  const sectionsRef = useRef<{id: string, y: number, height: number}[]>([]);
  
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      mapSections();
      initializeNodes();
    };

    const mapSections = () => {
      const sectionElements = document.querySelectorAll('section[id]');
      const sections: {id: string, y: number, height: number}[] = [];
      
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        sections.push({
          id: section.id,
          y: window.scrollY + rect.top,
          height: rect.height
        });
      });
      
      sectionsRef.current = sections;
    };
    
    const initializeNodes = () => {
      const nodes: GooNode[] = [];
      
      mapSections();
      
      sectionsRef.current.forEach((section, sectionIndex) => {
        const baseNodeCount = Math.min(Math.floor(window.innerWidth / 100), 25);
        let nodeCount = baseNodeCount;
        
        if (section.id === 'about') nodeCount = baseNodeCount - 5;
        if (section.id === 'experience') nodeCount = baseNodeCount + 3;
        if (section.id === 'skills') nodeCount = baseNodeCount + 7;
        if (section.id === 'contact') nodeCount = baseNodeCount - 8;
        
        const sectionY = section.y;
        const sectionHeight = section.height;
        
        for (let i = 0; i < nodeCount; i++) {
          const x = Math.random() * canvas.width;
          const y = sectionY + Math.random() * sectionHeight;
          
          let hueBase = 200;
          
          if (section.id === 'about') hueBase = 190;
          if (section.id === 'experience') hueBase = 210;
          if (section.id === 'skills') hueBase = 220;
          if (section.id === 'contact') hueBase = 195;
          
          const hue = hueBase + Math.random() * 20 - 10;
          
          nodes.push({
            x,
            y,
            targetX: x,
            targetY: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 5 + 3,
            connections: [],
            hue,
            sectionY
          });
        }
      });
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const connectionCount = Math.floor(Math.random() * 3) + 1;
        
        for (let c = 0; c < connectionCount; c++) {
          const possibleTargets = nodes.filter((n, idx) => 
            idx !== i && 
            !node.connections.includes(idx) &&
            Math.abs(n.sectionY - node.sectionY) < window.innerHeight * 0.8
          );
          
          if (possibleTargets.length > 0) {
            const targetNode = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
            const targetIdx = nodes.indexOf(targetNode);
            node.connections.push(targetIdx);
          }
        }
      }
      
      nodesRef.current = nodes;
    };
    
    const updateNodes = () => {
      const nodes = nodesRef.current;
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y + window.scrollY;
      const isMouseDown = mousePositionRef.current.isDown;
      const currentScrollY = window.scrollY;
      
      const scrollDelta = currentScrollY - scrollYRef.current;
      scrollYRef.current = currentScrollY;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        const screenY = node.y - currentScrollY;
        
        if (screenY > -500 && screenY < window.innerHeight + 500) {
          node.vy += scrollDelta * 0.01;
          
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
          
          if (isMouseDown && distanceToMouse < 200) {
            const angle = Math.atan2(dy, dx);
            const force = (200 - distanceToMouse) * 0.01;
            node.vx += Math.cos(angle) * force;
            node.vy += Math.sin(angle) * force;
          } else if (distanceToMouse < 150) {
            const angle = Math.atan2(dy, dx);
            node.vx += Math.cos(angle) * 0.05;
            node.vy += Math.sin(angle) * 0.05;
          }
          
          const sectionTetherY = node.sectionY + window.innerHeight/2;
          const ty = (sectionTetherY - node.y) * 0.001;
          
          node.vx *= 0.95;
          node.vy *= 0.95;
          node.vy += ty;
          
          node.x += node.vx;
          node.y += node.vy;
          
          if (node.x < node.radius) {
            node.x = node.radius;
            node.vx *= -0.7;
          } else if (node.x > canvas.width - node.radius) {
            node.x = canvas.width - node.radius;
            node.vx *= -0.7;
          }
          
          if (Math.abs(node.y - node.sectionY) > window.innerHeight * 1.5) {
            node.vy += (node.sectionY - node.y) * 0.01;
          }
          
          if (Math.random() < 0.001) {
            node.targetX = Math.random() * canvas.width;
            
            const sectionBuffer = window.innerHeight * 0.4;
            const minY = node.sectionY - sectionBuffer;
            const maxY = node.sectionY + sectionBuffer;
            node.targetY = minY + Math.random() * (maxY - minY);
          }
        }
      }
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentScrollY = window.scrollY;
      
      ctx.lineWidth = 1.5;
      
      nodesRef.current.forEach((node, i) => {
        const screenY = node.y - currentScrollY;
        
        if (screenY > -200 && screenY < window.innerHeight + 200) {
          node.connections.forEach(targetIdx => {
            const target = nodesRef.current[targetIdx];
            const targetScreenY = target.y - currentScrollY;
            
            if (targetScreenY > -200 && targetScreenY < window.innerHeight + 200) {
              const dx = target.x - node.x;
              const dy = target.y - node.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 250) {
                const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
                gradient.addColorStop(0, `hsla(${node.hue}, 80%, 60%, 0.2)`);
                gradient.addColorStop(1, `hsla(${target.hue}, 80%, 60%, 0.2)`);
                
                ctx.strokeStyle = gradient;
                
                const midX = (node.x + target.x) / 2;
                const midY = (node.y + target.y - currentScrollY) / 2 + currentScrollY;
                
                const curveOffset = Math.min(30, distance / 8);
                const controlX = midX + (Math.random() - 0.5) * curveOffset;
                const controlY = midY + (Math.random() - 0.5) * curveOffset;
                
                ctx.beginPath();
                ctx.moveTo(node.x, screenY);
                ctx.quadraticCurveTo(controlX, controlY, target.x, targetScreenY);
                ctx.stroke();
              }
            }
          });
          
          const gradient = ctx.createRadialGradient(
            node.x, screenY, 0,
            node.x, screenY, node.radius * 2
          );
          
          gradient.addColorStop(0, `hsla(${node.hue}, 80%, 60%, 0.8)`);
          gradient.addColorStop(1, `hsla(${node.hue}, 80%, 60%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, screenY, node.radius * 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = `hsla(${node.hue}, 80%, 60%, 0.8)`;
          ctx.beginPath();
          ctx.arc(node.x, screenY, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }
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
    
    const handleScroll = () => {
      // We don't need to do anything here as we track scroll position in updateNodes
      // But this ensures the event listener is registered
    };
    
    resizeCanvas();
    initializeNodes();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
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
