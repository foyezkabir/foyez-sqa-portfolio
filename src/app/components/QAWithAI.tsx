import { Sparkles, Zap, Brain } from "lucide-react";

export function QAWithAI() {
  return (
    <section className="px-8 py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="relative group">
          {/* Glow pulled back so the hero panel stays the brightest thing on the page. */}
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-lg opacity-20" />
          
          <div className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-3xl p-12 backdrop-blur-sm">
            {/* Hairline top highlight: the tighter replacement for the blur wash. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
            />
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-10 h-10 text-purple-400" />
                <h2 className="text-5xl font-bold">QA + AI</h2>
              </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Using AI to accelerate test generation, reduce maintenance overhead, and surface 
                intelligent insights from test results.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold">Smart Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    AI-generated test cases based on component analysis
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold">Auto Healing</h4>
                  <p className="text-sm text-muted-foreground">
                    Self-healing selectors and adaptive test maintenance
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold">Insight Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Pattern detection and failure root cause analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
