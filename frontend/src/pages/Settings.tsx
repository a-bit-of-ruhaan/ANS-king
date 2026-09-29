import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Shield, Palette } from "lucide-react";

export function Settings() {
  return (
    <div className="p-8 max-w-4xl mx-auto h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          Settings
        </h1>
        
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-4 hover:bg-secondary/20 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Account Settings</h3>
              <p className="text-muted-foreground text-sm">Manage your profile and preferences</p>
            </div>
          </div>
          
          <div className="p-6 border-b border-border flex items-center gap-4 hover:bg-secondary/20 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Appearance</h3>
              <p className="text-muted-foreground text-sm">Customize themes and display</p>
            </div>
          </div>

          <div className="p-6 flex items-center gap-4 hover:bg-secondary/20 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Privacy & Security</h3>
              <p className="text-muted-foreground text-sm">Control your data and API keys</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
