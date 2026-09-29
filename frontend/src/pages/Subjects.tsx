import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function Subjects() {
  return (
    <div className="p-8 max-w-4xl mx-auto h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          Subjects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Computer System Architecture", "DBMS", "Operating Systems", "Data Structures", "Programming in C"].map((subject, i) => (
            <div key={i} className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{subject}</h3>
                <p className="text-muted-foreground text-sm">Explore topics</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
