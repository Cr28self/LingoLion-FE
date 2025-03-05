import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Search, ArrowLeft, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AnimatedGradientText } from "@/components/animated-gradient-text";

export default function NotFoundRoute() {
  const [searchPosition, setSearchPosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const lostWords = [
    "Hello?",
    "Where am I?",
    "Lost in translation...",
    "Page not found",
    "404",
    "Oops!",
    "Let's learn something else",
    "Back to studying?",
  ];

  useEffect(() => {
    // Random movement for the search icon
    const moveSearchIcon = () => {
      const maxX = window.innerWidth * 0.05;
      const maxY = window.innerHeight * 0.05;
      setSearchPosition({
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY - maxY / 2,
      });
    };

    // Change words periodically
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % lostWords.length);
    }, 2000);

    // Move the search icon periodically
    const moveInterval = setInterval(moveSearchIcon, 3000);

    // Show sparkle effect periodically
    const sparkleInterval = setInterval(() => {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1000);
    }, 5000);

    return () => {
      clearInterval(wordInterval);
      clearInterval(moveInterval);
      clearInterval(sparkleInterval);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32">
        {/* Main content */}
        <div className="max-w-md w-full mx-auto flex flex-col items-center text-center space-y-12">
          <div className="relative">
            <div
              className="relative p-8 rounded-full bg-muted border-4 border-primary/20 shadow-xl transition-all duration-500 ease-in-out"
              style={{
                transform: `translate(${searchPosition.x}px, ${searchPosition.y}px)`,
              }}
            >
              <Search className="h-16 w-16 text-primary animate-bounce" />
              {showSparkle && (
                <Sparkles className="absolute top-0 right-0 h-8 w-8 text-primary animate-spin" />
              )}
            </div>
            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center animate-pulse">
              404
            </div>
          </div>

          <div className="space-y-4">
            <AnimatedGradientText
              text="Oops! Page Not Found"
              className="text-4xl md:text-5xl tracking-tighter"
            />
            <p className="text-xl text-muted-foreground min-h-[2em] transition-all duration-500">
              {lostWords[wordIndex]}
            </p>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
              <br />
              Let's get you back to learning English!
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden w-full"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Go Home</span>
                <span className="absolute inset-0 bg-primary-foreground/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto">
          <div className="flex items-center gap-2">
            <img
              src="/lingo-lion-logo-noBG.webp"
              alt="AI-powered English learning"
              className="h-6 w-6"
            />
            <span className="text-lg font-bold">LingoLion</span>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            © 2025 LingoLion. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
