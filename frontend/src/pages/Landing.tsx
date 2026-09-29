import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, BrainCircuit, GraduationCap, ChevronRight } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center font-bold text-primary-foreground">
            A
          </div>
          <span className="font-bold text-xl tracking-tight">ANS-KING (by Ruhaan)</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors py-2 px-4">
            Sign In
          </Link>
          <Link to="/app" className="text-sm font-medium bg-primary text-primary-foreground py-2 px-4 rounded-md shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-12 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm font-medium text-muted-foreground mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Powered by Gemini 1.5 Flash</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]"
        >
          Turn Any Topic Into a <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            EXAM-Ready Answer.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-xl text-muted-foreground max-w-2xl"
        >
          AI-powered exam preparation built for undergraduate theory papers. Generate structured, detailed, easy-to-write answers in seconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/app" className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground h-14 px-8 rounded-lg text-lg font-medium shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all">
            Generate Answer
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center justify-center gap-2 bg-secondary text-foreground h-14 px-8 rounded-lg text-lg font-medium hover:bg-secondary/80 transition-colors border border-border">
            See How It Works
          </button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full text-left"
        >
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Exam-Oriented Structure</h3>
            <p className="text-muted-foreground">Answers formatted specifically for university examinations with proper headings, definitions, and examples.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BrainCircuit className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Intelligent Length</h3>
            <p className="text-muted-foreground">Targeted word counts designed to fill 6-7 handwritten pages without artificial fluff or repetition.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quick Revision Mode</h3>
            <p className="text-muted-foreground">Instantly summarize long answers into key points, definitions, and diagrams for last-minute studying.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
