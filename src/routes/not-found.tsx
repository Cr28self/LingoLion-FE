import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatedGradientText } from '@/components/animated-gradient-text';

export const NotFoundRoute = () => {
  const [searchPosition, setSearchPosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const lostWords = [
    'Hello?',
    'Where am I?',
    'Lost in translation...',
    'Page not found',
    '404',
    'Oops!',
    "Let's learn something else",
    'Back to studying?',
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
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6 md:py-24 lg:py-32">
        {/* Main content */}
        <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-12 text-center">
          <div className="relative">
            <div
              className="relative rounded-full border-4 border-primary/20 bg-muted p-8 shadow-xl transition-all duration-500 ease-in-out"
              style={{
                transform: `translate(${searchPosition.x}px, ${searchPosition.y}px)`,
              }}
            >
              <Search className="h-16 w-16 animate-bounce text-primary" />
              {showSparkle && (
                <Sparkles className="absolute right-0 top-0 h-8 w-8 animate-spin text-primary" />
              )}
            </div>
            <div className="absolute -right-2 -top-2 flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-primary text-primary-foreground">
              404
            </div>
          </div>

          <div className="space-y-4">
            <AnimatedGradientText
              text="Oops! Page Not Found"
              className="text-4xl tracking-tighter md:text-5xl"
            />
            <p className="min-h-[2em] text-xl text-muted-foreground transition-all duration-500">
              {lostWords[wordIndex]}
            </p>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
              <br />
              Let's get you back to learning English!
            </p>
          </div>

          <div className="flex w-full max-w-xs flex-col gap-4">
            <Button
              asChild
              size="lg"
              className="group relative w-full overflow-hidden"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Go Home</span>
                <span className="absolute inset-0 origin-left scale-x-0 bg-primary-foreground/10 transition-transform group-hover:scale-x-100" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
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
};
