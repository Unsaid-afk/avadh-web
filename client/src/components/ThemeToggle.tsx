import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="relative overflow-visible"
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
    </Button>
  );
}
