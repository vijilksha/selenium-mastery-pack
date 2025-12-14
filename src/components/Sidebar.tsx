import { sections } from '@/data/sections';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const scrollToSection = (id: string) => {
    onSectionChange(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 ${collapsed ? 'w-16' : 'w-72'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && <span className="font-bold text-primary">Selenium Training</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-muted rounded-lg">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm truncate">{String(index + 1).padStart(2, '0')}. {section.shortTitle}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
