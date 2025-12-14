import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = 'java', title, showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-code-bg">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>
          {lines.map((line, i) => (
            <div key={i} className="table-row">
              {showLineNumbers && (
                <span className="table-cell pr-4 text-right text-muted-foreground/40 select-none">
                  {i + 1}
                </span>
              )}
              <span className="table-cell text-code-text">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};
