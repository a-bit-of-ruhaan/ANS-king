import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, Clock, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function Dashboard() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !subject) return;
    
    navigate(`/app/answer?topic=${encodeURIComponent(topic)}&subject=${encodeURIComponent(subject)}`);
  };

  const recentTopics = [
    { id: 1, title: "Addressing Modes", subject: "Computer System Architecture", date: "Today" },
    { id: 2, title: "Normalization Forms", subject: "DBMS", date: "Yesterday" },
    { id: 3, title: "Process Scheduling Algorithms", subject: "Operating Systems", date: "2 days ago" },
  ];

  return (
    <div className="p-8 pb-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">Good afternoon <Sun className="w-8 h-8 text-primary" /></h1>
        <p className="text-muted-foreground mb-12">What are you studying today?</p>

        <form onSubmit={handleGenerate} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-card rounded-2xl border border-border shadow-xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex flex-col md:flex-row gap-2 p-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="e.g. Explain stack organization and its applications"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-transparent border-0 focus:ring-0 text-lg px-4 py-3 placeholder:text-muted-foreground/60 focus:outline-none"
                  required
                />
              </div>
              <div className="w-px bg-border hidden md:block my-2" />
              <div className="md:w-1/3 relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent border-0 focus:ring-0 text-base px-4 py-3 text-muted-foreground focus:text-foreground focus:outline-none appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Subject</option>
                  <option value="Computer System Architecture">Computer System Architecture</option>
                  <option value="DBMS">DBMS</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Programming in C">Programming in C</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={!topic || !subject}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed m-1"
            >
              <Sparkles className="w-5 h-5" />
              Generate
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Recent Answers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTopics.map((item) => (
            <div key={item.id} className="p-5 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{item.subject}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
