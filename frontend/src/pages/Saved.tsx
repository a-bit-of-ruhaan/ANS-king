import { motion } from "framer-motion";
import { Library } from "lucide-react";

export function Saved() {
  return (
    <div className="p-8 max-w-4xl mx-auto h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Library className="w-8 h-8 text-primary" />
          Saved Answers
        </h1>
        <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Library className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">No saved answers yet</h2>
          <p className="text-muted-foreground text-lg max-w-md">
            When you generate great answers, you can save them here for quick access before your exams.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
