import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Globe,
  Headphones,
  MessageSquare,
  Mic,
  Sparkles,
  Star,
} from 'lucide-react';
export function HeroImage() {
  return (
    <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-xl shadow-xl">
      <img
        src="/hero-image.png"
        alt="AI-powered English learning"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent" />
    </div>
  );
}

export default function LandingRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/lingo-lion-logo-noBG.webp"
              alt="AI-powered English learning"
              className="h-6 w-6"
            />

            <span className="text-xl font-bold">LingoLion</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              to="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/auth/login"
              className="hidden text-sm font-medium hover:text-primary sm:block"
            >
              Log in
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master English with AI-Powered Learning
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Personalized language learning that adapts to your needs.
                    Practice speaking, writing, and comprehension with our
                    advanced AI tutor.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    Start Learning Free <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="w-full lg:w-[550px]">
                <HeroImage />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  AI-Powered Language Learning
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform uses advanced AI to create a personalized
                  learning experience that adapts to your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Mic className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Speech Recognition</h3>
                <p className="text-center text-muted-foreground">
                  Practice your pronunciation with real-time feedback from our
                  AI speech recognition system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MessageSquare className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Conversation Practice</h3>
                <p className="text-center text-muted-foreground">
                  Engage in natural conversations with our AI tutor to improve
                  your speaking skills.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BookOpen className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Personalized Lessons</h3>
                <p className="text-center text-muted-foreground">
                  Get customized lessons based on your proficiency level, goals,
                  and learning style.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Headphones className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Listening Comprehension</h3>
                <p className="text-center text-muted-foreground">
                  Improve your listening skills with a variety of accents and
                  speaking speeds.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Globe className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Cultural Context</h3>
                <p className="text-center text-muted-foreground">
                  Learn English in real-world contexts with cultural insights
                  and practical examples.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Sparkles className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Track your improvement with detailed analytics and
                  personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Learn English in 3 Simple Steps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform makes learning English easy, effective, and
                  enjoyable.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Take Assessment</h3>
                <p className="text-center text-muted-foreground">
                  Complete a quick assessment to determine your current English
                  proficiency level.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Get Personalized Plan</h3>
                <p className="text-center text-muted-foreground">
                  Receive a customized learning plan tailored to your goals and
                  learning style.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Practice with AI</h3>
                <p className="text-center text-muted-foreground">
                  Learn through interactive lessons and practice conversations
                  with our AI tutor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of satisfied learners who have improved their
                  English with LinguaAI.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex text-yellow-500">
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                  </div>
                  <p className="text-muted-foreground">
                    "LinguaAI has transformed my English learning journey. The
                    AI tutor feels like talking to a real person!"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Sophia Kim</p>
                    <p className="text-xs text-muted-foreground">
                      Seoul, South Korea
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex text-yellow-500">
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                  </div>
                  <p className="text-muted-foreground">
                    "I've tried many language apps, but LinguaAI is the only one
                    that actually improved my speaking confidence."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Carlos Rodriguez</p>
                    <p className="text-xs text-muted-foreground">
                      Barcelona, Spain
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex text-yellow-500">
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                    <Star className="h-5 w-5 fill-yellow-500" />
                  </div>
                  <p className="text-muted-foreground">
                    "The personalized feedback on my pronunciation has been
                    invaluable. I sound much more natural now!"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Hiroshi Tanaka</p>
                    <p className="text-xs text-muted-foreground">
                      Tokyo, Japan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Choose Your Learning Plan
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Flexible plans to fit your learning needs and budget.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="mt-4 text-3xl font-bold">$0</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Forever free
                  </p>
                  <ul className="mt-6 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic AI conversation practice</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>5 lessons per month</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Limited vocabulary exercises</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="relative flex flex-col rounded-lg border shadow-sm">
                <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Standard</h3>
                  <div className="mt-4 text-3xl font-bold">$12</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Per month
                  </p>
                  <ul className="mt-6 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited AI conversation practice</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited lessons</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Pronunciation feedback</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Progress tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 pt-0">
                  <Button className="w-full">Subscribe Now</Button>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <div className="mt-4 text-3xl font-bold">$29</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Per month
                  </p>
                  <ul className="mt-6 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Everything in Standard</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>1-on-1 sessions with human tutors</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced grammar correction</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Business English modules</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Certification preparation</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-primary py-12 text-primary-foreground md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Start Your English Learning Journey Today
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed">
                  Join thousands of learners who have improved their English
                  with our AI-powered platform.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-primary-foreground text-background"
                  />
                  <Button type="submit" variant="secondary">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs">
                  Try free for 7 days. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <img
              src="/lingo-lion-logo-noBG.webp"
              alt="AI-powered English learning"
              className="h-6 w-6"
            />
            <span className="text-lg font-bold">LingoLion</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 LinguaAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
