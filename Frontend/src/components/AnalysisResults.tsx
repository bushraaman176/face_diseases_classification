import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

export interface SkinIssue {
  name: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

interface AnalysisResultsProps {
  issues: SkinIssue[];
}

export const AnalysisResults = ({ issues }: AnalysisResultsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-secondary';
      case 'low': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10';
      case 'medium': return 'bg-secondary/10';
      case 'low': return 'bg-primary/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Analysis Complete</h2>
        <p className="text-muted-foreground">
          We've detected {issues.length} skin concern{issues.length !== 1 ? 's' : ''} that need attention
        </p>
      </div>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <Card 
            key={index}
            className="p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-left"
            style={{ 
              boxShadow: 'var(--shadow-soft)',
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getSeverityBg(issue.severity)}`}>
                      {issue.severity === 'low' ? (
                        <CheckCircle2 className={`h-5 w-5 ${getSeverityColor(issue.severity)}`} />
                      ) : (
                        <AlertCircle className={`h-5 w-5 ${getSeverityColor(issue.severity)}`} />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{issue.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-14">
                    {issue.description}
                  </p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityBg(issue.severity)} ${getSeverityColor(issue.severity)}`}>
                  {issue.severity.toUpperCase()}
                </div>
              </div>

              <div className="space-y-2 ml-14">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-semibold">{Math.round(issue.confidence)}%</span>
                </div>
                <Progress value={issue.confidence} className="h-2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
