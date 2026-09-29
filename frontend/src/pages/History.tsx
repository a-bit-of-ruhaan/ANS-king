import { motion } from "framer-motion";
import { History as HistoryIcon, Clock, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

export function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await api.getHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <HistoryIcon className="w-8 h-8 text-primary" />
          History
        </h1>
        
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading history...</div>
        ) : history.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <HistoryIcon className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No history available</h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Your recently generated answers will appear here so you can easily pick up where you left off.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((item) => (
              <div key={item.id} className="p-5 rounded-xl border border-border bg-card hover:bg-secondary/20 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.topic}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.subject}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
