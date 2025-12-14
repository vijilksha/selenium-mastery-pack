import { Section } from '@/data/sections';
import { DownloadPPTButton } from './DownloadPPTButton';

interface SectionHeaderProps {
  section: Section;
  number: number;
}

export const SectionHeader = ({ section, number }: SectionHeaderProps) => {
  const Icon = section.icon;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-primary">Section {String(number).padStart(2, '0')}</span>
        </div>
        <DownloadPPTButton sectionId={section.id} />
      </div>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">{section.title}</h2>
          <p className="text-muted-foreground">{section.description}</p>
        </div>
      </div>
    </div>
  );
};
