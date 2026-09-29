import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Copy, Download, Save, RefreshCw, Printer, BookOpen, Layers } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "../services/api";

export function Answer() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const subject = searchParams.get("subject") || "";
  
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnswer() {
      if (!topic || !subject) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await api.generate({
          topic,
          subject,
          marks: "Long Answer",
        });
        setContent(response.content);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to generate answer");
        } else {
          setError("Failed to generate answer");
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnswer();
  }, [topic, subject]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border py-4 px-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{topic}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {subject}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Layers className="w-4 h-4" /> Long Answer</span>
              <span>•</span>
              <span className="text-primary font-medium">Est. 6-7 handwritten pages</span>
            </div>
          </div>
          
          {!loading && !error && (
            <div className="flex gap-2">
              <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Copy">
                <Copy className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Save">
                <Save className="w-5 h-5" />
              </button>
              <button onClick={handlePrint} className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Print">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Download PDF">
                <Download className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        {loading ? (
          <div className="max-w-3xl mx-auto py-12 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 border-b-2 border-indigo-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
            <h3 className="text-xl font-medium animate-pulse mb-2">Preparing your EXAM-ready answer...</h3>
            <p className="text-muted-foreground text-sm">Structuring content, adding examples, and formatting for exams.</p>
          </div>
        ) : error ? (
          <div className="max-w-3xl mx-auto py-12 text-center">
            <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/20 mb-6">
              <h3 className="text-destructive font-semibold mb-2">Generation Failed</h3>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-strong:text-foreground prose-table:border prose-table:border-border prose-th:bg-secondary prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-border prose-code:text-primary prose-code:bg-primary/10 prose-code:p-1 prose-code:rounded">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
            
            <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 font-medium transition-colors text-sm">
                Make it Shorter
              </button>
              <button className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 font-medium transition-colors text-sm">
                Make it Simpler
              </button>
              <button className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 font-medium transition-colors text-sm">
                Generate 1-Minute Revision
              </button>
              <button className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 font-medium transition-colors text-sm">
                Generate MCQs
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Print Styles (hidden normally, visible on print) */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .prose, .prose * {
            visibility: visible;
          }
          .prose {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: black !important;
          }
          .prose * {
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}
