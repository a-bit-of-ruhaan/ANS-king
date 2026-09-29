import { Outlet, Link, useLocation } from "react-router-dom";
import { BookOpen, History, LayoutDashboard, Settings, Library } from "lucide-react";
import { motion } from "framer-motion";

export function Layout() {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/app", icon: LayoutDashboard },
    { name: "Saved Answers", path: "/app/saved", icon: Library },
    { name: "History", path: "/app/history", icon: History },
    { name: "Subjects", path: "/app/subjects", icon: BookOpen },
    { name: "Settings", path: "/app/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col hidden md:flex">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center font-bold text-primary-foreground">
              A
            </div>
            <span className="font-bold text-xl tracking-tight">ANS-KING (by Ruhaan)</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative ${
                  isActive 
                    ? "text-primary-foreground bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-md border border-primary/20"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? "text-primary" : ""}`} />
                <span className="relative z-10 font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="font-semibold text-sm">US</span>
            </div>
            <div>
              <p className="text-sm font-medium">Student</p>
              <button 
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="text-xs text-destructive hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-background">
        <div className="max-w-5xl mx-auto h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
