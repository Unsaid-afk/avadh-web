import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const nodeCount = Math.floor((window.innerWidth * window.innerHeight) / 25000);
    nodesRef.current = Array.from({ length: Math.max(nodeCount, 30) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodeColor = theme === "dark" ? "rgba(0, 150, 136, 0.3)" : "rgba(0, 77, 64, 0.15)";
      const lineColor = theme === "dark" ? "rgba(0, 150, 136, 0.1)" : "rgba(0, 77, 64, 0.05)";

      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      nodesRef.current.forEach((nodeA, i) => {
        nodesRef.current.slice(i + 1).forEach((nodeB) => {
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - distance / 150;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: theme === "dark" ? 0.6 : 0.8 }}
    />
  );
}
