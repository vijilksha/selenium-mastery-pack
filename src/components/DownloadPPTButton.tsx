import React, { useState } from 'react';
import { Download, Loader2, FileText, Code } from 'lucide-react';
import { generateSectionPPT, sectionPPTContent } from '@/lib/pptGenerator';
import { downloadLocatorPracticeHTML } from '@/lib/sampleHtmlGenerator';
import { toast } from 'sonner';

interface DownloadPPTButtonProps {
  sectionId: string;
}

export const DownloadPPTButton: React.FC<DownloadPPTButtonProps> = ({ sectionId }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const content = sectionPPTContent[sectionId];
    
    if (!content) {
      toast.error('PPT content not available for this section');
      return;
    }

    setIsGenerating(true);
    
    try {
      await generateSectionPPT(content);
      toast.success(`${content.sectionTitle} PPT downloaded successfully!`);
    } catch (error) {
      console.error('Error generating PPT:', error);
      toast.error('Failed to generate PPT. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHTMLDownload = () => {
    downloadLocatorPracticeHTML();
    toast.success('Practice HTML page downloaded successfully!');
  };

  // Only show HTML download for locator-best-practices section
  const showHTMLDownload = sectionId === 'locator-best-practices';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <FileText className="w-4 h-4 group-hover:hidden" />
            <Download className="w-4 h-4 hidden group-hover:block" />
            <span>Download as PPT</span>
          </>
        )}
      </button>
      
      {showHTMLDownload && (
        <button
          onClick={handleHTMLDownload}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg text-green-600 dark:text-green-400 font-medium text-sm transition-all duration-200 group"
        >
          <Code className="w-4 h-4 group-hover:hidden" />
          <Download className="w-4 h-4 hidden group-hover:block" />
          <span>Download Practice HTML</span>
        </button>
      )}
    </div>
  );
};
