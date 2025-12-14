import { SectionHeader } from '../SectionHeader';
import { sections } from '@/data/sections';

export const LocatorBestPractices = () => {
  const section = sections.find(s => s.id === 'locator-best-practices')!;

  return (
    <section id={section.id} className="space-y-8">
      <SectionHeader section={section} number={5} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Locator Priority Order</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-foreground">Priority</th>
                <th className="text-left p-3 text-foreground">Locator</th>
                <th className="text-left p-3 text-foreground">When to Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="p-3 text-primary">1</td><td className="p-3">ID</td><td className="p-3 text-muted-foreground">Always prefer if unique and stable</td></tr>
              <tr className="border-b border-border"><td className="p-3 text-primary">2</td><td className="p-3">Name</td><td className="p-3 text-muted-foreground">Good for form inputs</td></tr>
              <tr className="border-b border-border"><td className="p-3 text-primary">3</td><td className="p-3">CSS Selector</td><td className="p-3 text-muted-foreground">Fast, flexible, readable</td></tr>
              <tr className="border-b border-border"><td className="p-3 text-primary">4</td><td className="p-3">XPath</td><td className="p-3 text-muted-foreground">Complex DOM traversal, text matching</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-5 bg-destructive/10 rounded-xl border border-destructive/20">
        <h4 className="font-semibold text-destructive mb-2">Avoid Absolute XPath</h4>
        <p className="text-sm text-muted-foreground">Absolute XPath like <code className="bg-muted px-1 rounded">/html/body/div[1]/div[2]/form/input</code> breaks easily when DOM structure changes.</p>
      </div>
    </section>
  );
};
