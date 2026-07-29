import { useEffect, useRef, useState } from "react";
import { Check, Circle, CornerDownLeft, Loader2, X } from "lucide-react";

type Suite = {
  name: string;
  tests: number;
  /** Tests in this suite that fail. Omit for a fully passing suite. */
  failed?: number;
  seconds: number;
};

/**
 * Illustrative test run for the hero panel.
 *
 * Illustrative UI, not a claim about real test results: it shows the shape of a
 * Playwright reporter. Every total is derived from this array, so the summary
 * counters can never drift out of step with the rows above them.
 */
const suites: Suite[] = [
  { name: "auth.spec.ts", tests: 12, seconds: 1.2 },
  { name: "checkout.spec.ts", tests: 18, seconds: 3.4 },
  { name: "payment.spec.ts", tests: 9, failed: 1, seconds: 0.8 },
  { name: "search.spec.ts", tests: 14, seconds: 2.1 },
  { name: "api-contract.spec.ts", tests: 22, seconds: 4.9 },
];

const TOTAL_TESTS = suites.reduce((n, s) => n + s.tests, 0);

/**
 * The command that "launches" the run, typed out before any suite starts.
 *
 * --workers=4 rather than --shard=1/3. Sharding runs only one slice of the
 * suite, which contradicted the panel showing all five spec files and a 75 test
 * total. Workers parallelise within a single run, so the flag and the output
 * below now agree. Anyone Playwright-literate enough to read the flag is
 * exactly the reader who would have caught that.
 */
const CMD = "npx playwright test --workers=4";

/** Per-character typing speed for CMD. */
const TYPE_MS = 45;
/** Time each suite spends in the running state before it resolves. */
const STEP_MS = 900;
/** Pause on the completed run before looping back to the start. */
const REPLAY_MS = 3200;

export function TestRunPanel() {
  // Characters of CMD typed so far.
  const [typed, setTyped] = useState(0);
  // Number of suites that have finished. suites[resolved] is the one running.
  const [resolved, setResolved] = useState(0);
  const [still, setStill] = useState(false);
  // Transient: the Enter keycap held down at the moment the command fires.
  const [pressed, setPressed] = useState(false);
  // False while the tab is hidden or the panel is scrolled out of view.
  const [active, setActive] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  /*
    Without this the run loops forever whether or not anyone can see it, which
    burns cycles off-screen and, worse, means a visitor returning to a
    backgrounded tab finds the panel parked mid-cycle looking broken. Chrome
    throttles timers hard in hidden tabs, so the panel can sit frozen for a
    while before catching up.

    Paused when hidden or off-screen, and restarted from the beginning when it
    comes back, so the animation is always seen from the top.
  */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let onScreen = true;
    const sync = () =>
      setActive(onScreen && document.visibilityState === "visible");

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // Replay from the top whenever the panel becomes visible again.
  useEffect(() => {
    if (!active || still) return;
    setTyped(0);
    setResolved(0);
  }, [active, still]);

  // A visitor who asked for reduced motion gets the finished run immediately,
  // with no typing and no loop.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setTyped(CMD.length);
      setResolved(suites.length);
    }
  }, []);

  // One timer drives all three phases: type the command, resolve the suites,
  // then hold on the result before restarting.
  useEffect(() => {
    if (still || !active) return;

    let delay = REPLAY_MS;
    let next = () => {
      setTyped(0);
      setResolved(0);
    };

    if (typed < CMD.length) {
      delay = TYPE_MS;
      next = () => setTyped((t) => t + 1);
    } else if (resolved < suites.length) {
      delay = STEP_MS;
      next = () => setResolved((r) => r + 1);
    }

    const timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [typed, resolved, still, active]);

  const started = typed >= CMD.length;
  const done = started ? Math.min(resolved, suites.length) : 0;
  const finished = started && done === suites.length;
  const settled = suites.slice(0, done);

  // Punch the keycap when the command completes, so the run visibly follows
  // from an Enter press rather than just beginning on its own.
  useEffect(() => {
    if (!started || still) return;
    setPressed(true);
    const timer = setTimeout(() => setPressed(false), 180);
    return () => clearTimeout(timer);
  }, [started, still]);

  /** Restart the run. Also what the Enter keycap does when clicked. */
  const rerun = () => {
    if (still) {
      // Reduced motion: jump straight to the finished run, never a blank panel.
      setTyped(CMD.length);
      setResolved(suites.length);
      return;
    }
    setTyped(0);
    setResolved(0);
  };

  const failedTests = settled.reduce((n, s) => n + (s.failed ?? 0), 0);
  const passedTests = settled.reduce((n, s) => n + s.tests - (s.failed ?? 0), 0);
  // Zero while the command is still being typed: nothing is running yet.
  const runningTests = !started || finished ? 0 : suites[done].tests;
  const elapsed = settled.reduce((n, s) => n + s.seconds, 0);

  const passedPct = (passedTests / TOTAL_TESTS) * 100;
  const failedPct = (failedTests / TOTAL_TESTS) * 100;

  return (
    <div
      ref={rootRef}
      className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-2xl p-6 backdrop-blur-sm shadow-2xl shadow-blue-500/10"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-50" />

      {/* Instrument bezel: hairline corner brackets and centre ticks. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 rounded-tl-2xl border-l border-t border-blue-400/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 rounded-tr-2xl border-r border-t border-blue-400/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 rounded-bl-2xl border-b border-l border-blue-400/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 rounded-br-2xl border-b border-r border-blue-400/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-blue-400/30"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-blue-400/30"
      />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Test Run #248</span>
          {!started ? (
            <span className="text-xs text-muted-foreground">Waiting</span>
          ) : finished ? (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-status-good" aria-hidden />
              Run complete
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2
                className="w-3.5 h-3.5 text-status-running animate-spin"
                style={{ animationDuration: `${STEP_MS}ms` }}
                aria-hidden
              />
              Running
            </span>
          )}
        </div>

        {/* The command that starts the run, typed a character at a time. */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs">
          <span className="text-status-good" aria-hidden>
            $
          </span>
          <span className="min-w-0 flex-1 truncate text-foreground/80">
            {CMD.slice(0, typed)}
          </span>
          {!started && (
            <span
              aria-hidden
              className="inline-block h-3.5 w-[2px] shrink-0 bg-status-running animate-caret-blink"
            />
          )}

          {/*
            A real button, not a decorative keycap. It presses itself when the
            command finishes typing, and clicking it re-runs the suite, so the
            affordance is honest rather than a prop.
          */}
          <button
            type="button"
            onClick={rerun}
            title="Run again"
            aria-label="Run the test suite again"
            className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${
              pressed
                ? "translate-y-px border-status-running/60 bg-status-running/20 text-foreground"
                : "border-border bg-secondary/60 text-muted-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.08)] hover:border-blue-400/50 hover:text-foreground"
            }`}
          >
            <CornerDownLeft className="h-3 w-3" aria-hidden />
            Enter
          </button>
        </div>

        {/* Suite rows */}
        <div className="bg-background/50 border border-border rounded-lg divide-y divide-border/50">
          {suites.map((suite, i) => {
            // Nothing runs until the command has finished typing.
            const state = !started
              ? "queued"
              : i < done
                ? "settled"
                : i === done
                  ? "running"
                  : "queued";
            const isFailed = state === "settled" && suite.failed;

            return (
              <div
                key={suite.name}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-opacity duration-300 ${
                  state === "queued" ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Glyph and word both carry the state, never color alone. */}
                {state === "settled" && !isFailed && (
                  <Check className="w-4 h-4 shrink-0 text-status-good" aria-hidden />
                )}
                {isFailed && (
                  <X className="w-4 h-4 shrink-0 text-status-critical" aria-hidden />
                )}
                {state === "running" && (
                  /*
                    Tailwind's animate-spin is a fixed 1000ms turn, which against
                    a 900ms step left every spinner cut off mid-rotation. Pinning
                    the duration to STEP_MS gives each spec exactly one clean
                    revolution before the spinner hands off to the next row.
                  */
                  <Loader2
                    className="w-4 h-4 shrink-0 text-status-running animate-spin"
                    style={{ animationDuration: `${STEP_MS}ms` }}
                    aria-hidden
                  />
                )}
                {state === "queued" && (
                  <Circle className="w-4 h-4 shrink-0 text-muted-foreground" aria-hidden />
                )}

                <span className="flex-1 truncate text-foreground/90">{suite.name}</span>

                {/*
                  A part-failed suite must report BOTH halves. Printing only
                  "1 failed" hid this suite's 8 passing tests, so the rows added
                  up to 66 while the summary said 74.
                */}
                <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                  {state === "settled" &&
                    isFailed &&
                    `${suite.tests - suite.failed!} passed, ${suite.failed} failed`}
                  {state === "settled" && !isFailed && `${suite.tests} passed`}
                  {state === "running" && "running..."}
                  {state === "queued" && "queued"}
                </span>

                <span className="w-12 text-right text-xs text-muted-foreground tabular-nums">
                  {state === "settled" ? `${suite.seconds.toFixed(1)}s` : ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress: 2px gap between the passed and failed segments */}
        <div className="space-y-2">
          <div className="flex h-2 w-full gap-[2px] rounded-full bg-background/60">
            {/*
              The transition is dropped at done === 0 so restarting the loop
              snaps back to empty instead of animating the bar in reverse.
            */}
            <div
              className={`rounded-full bg-status-good ${
                done === 0 ? "" : "transition-[width] duration-500 ease-out"
              }`}
              style={{ width: `${passedPct}%` }}
            />
            {failedPct > 0 && (
              <div
                className="rounded-full bg-status-critical transition-[width] duration-500 ease-out"
                style={{ width: `${failedPct}%` }}
              />
            )}
          </div>

          {/* Doubles as the legend: a colored glyph beside text-token numbers. */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-good" aria-hidden />
              <span className="tabular-nums text-foreground/80">{passedTests}</span> passed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-critical" aria-hidden />
              <span className="tabular-nums text-foreground/80">{failedTests}</span> failed
            </span>
            {started && !finished && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-status-running" aria-hidden />
                <span className="tabular-nums text-foreground/80">{runningTests}</span> running
              </span>
            )}
            <span className="ml-auto tabular-nums">{elapsed.toFixed(1)}s</span>
          </div>
        </div>

        {finished && failedTests > 0 && (
          <p className="text-xs text-muted-foreground">
            {failedTests} defect caught before release.
          </p>
        )}
      </div>
    </div>
  );
}
