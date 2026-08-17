import { useState, useMemo } from 'react';
import { apps, categories, AppRecord, AuthMethod, AccessPath, Verdict } from '@/data/apps';
import { patternInsights, accuracyProgression, verificationSamples } from '@/data/analysis';
import {
  Search, Filter, CheckCircle2, XCircle, AlertCircle, ArrowRight,
  Bot, ShieldCheck, Database, Layers, Zap, Lock, Globe, FileSearch,
  TrendingUp, Target, Eye, Code2, GitBranch, Cpu, Sparkles, ChevronDown,
  ExternalLink, BarChart3, CircleCheck, CircleAlert, CircleX,
} from 'lucide-react';

// ============ HERO ============
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1">
            <Bot className="h-3.5 w-3.5 text-sky-400" />
            <span className="text-xs font-medium text-sky-300">AI Product Ops · Take-Home Assignment</span>
          </div>
        </div>

        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Researching 100 apps<br />
          for <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">agent toolkit</span> buildability
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          An autonomous agent researched 100 apps across 10 categories — capturing auth methods, access paths,
          API surfaces, and MCP support. Here are the patterns, the agent, and the proof.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-3xl">
          <HeroStat value="100" label="Apps researched" />
          <HeroStat value="94%" label="Final accuracy" />
          <HeroStat value="3" label="Verification passes" />
          <HeroStat value="22%" label="Have MCP" />
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <a href="#patterns" className="group inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            See the patterns
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a href="#matrix" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800">
            Explore the matrix
          </a>
          <a href="#agent" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800">
            How the agent works
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

// ============ HEADLINE FINDINGS ============
function HeadlineFindings() {
  return (
    <section className="border-b border-slate-800 bg-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">Headline</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">The patterns, up front</h2>
          <p className="mt-3 max-w-2xl text-slate-400">Six patterns emerged from clustering all 100 apps. These are the takeaways a reviewer should remember.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {patternInsights.map((insight, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-6 transition hover:border-slate-700 hover:bg-slate-950"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-md bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-400">{insight.category}</span>
                <span className="text-2xl font-bold text-white">{insight.metric}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{insight.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{insight.finding}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{insight.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PATTERN ANALYSIS (CHARTS) ============
function PatternAnalysis() {
  const authCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach(a => { counts[a.auth] = (counts[a.auth] || 0) + 1; });
    return counts;
  }, []);

  const accessCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach(a => { counts[a.access] = (counts[a.access] || 0) + 1; });
    return counts;
  }, []);

  const verdictCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach(a => { counts[a.verdict] = (counts[a.verdict] || 0) + 1; });
    return counts;
  }, []);

  const mcpCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach(a => { counts[a.hasMcp] = (counts[a.hasMcp] || 0) + 1; });
    return counts;
  }, []);

  const categoryGating = useMemo(() => {
    return categories.map(cat => {
      const catApps = apps.filter(a => a.category === cat);
      const gated = catApps.filter(a => a.access === 'Gated').length;
      const selfServe = catApps.filter(a => a.access === 'Self-serve').length;
      return { category: cat, gated, selfServe, total: catApps.length };
    });
  }, []);

  const authColors: Record<string, string> = {
    'OAuth2': 'bg-sky-500',
    'API Key': 'bg-emerald-500',
    'Basic': 'bg-amber-500',
    'Token': 'bg-violet-500',
    'Mixed': 'bg-rose-500',
    'Other': 'bg-slate-500',
  };

  const accessColors: Record<string, string> = {
    'Self-serve': 'bg-emerald-500',
    'Gated': 'bg-rose-500',
    'Mixed': 'bg-amber-500',
  };

  const verdictColors: Record<string, string> = {
    'Buildable': 'bg-emerald-500',
    'Buildable with effort': 'bg-sky-500',
    'Blocked': 'bg-amber-500',
    'Not viable': 'bg-rose-500',
  };

  return (
    <section id="patterns" className="border-b border-slate-800 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">Pattern Analysis</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Clustering the 100 apps</h2>
          <p className="mt-3 max-w-2xl text-slate-400">Auth methods, access paths, buildability verdicts, and MCP adoption — broken down by category.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Auth distribution */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Lock className="h-4 w-4 text-sky-400" /> Auth method distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(authCounts).sort((a, b) => b[1] - a[1]).map(([method, count]) => (
                <div key={method}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{method}</span>
                    <span className="font-mono text-slate-400">{count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div className={`h-full rounded-full ${authColors[method] || 'bg-slate-500'} transition-all duration-700`} style={{ width: `${count}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Access path */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Globe className="h-4 w-4 text-emerald-400" /> Access path: self-serve vs gated
            </h3>
            <div className="space-y-3">
              {Object.entries(accessCounts).sort((a, b) => b[1] - a[1]).map(([path, count]) => (
                <div key={path}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{path}</span>
                    <span className="font-mono text-slate-400">{count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div className={`h-full rounded-full ${accessColors[path] || 'bg-slate-500'} transition-all duration-700`} style={{ width: `${count}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Target className="h-4 w-4 text-amber-400" /> Buildability verdict
            </h3>
            <div className="space-y-3">
              {Object.entries(verdictCounts).sort((a, b) => b[1] - a[1]).map(([verdict, count]) => (
                <div key={verdict}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{verdict}</span>
                    <span className="font-mono text-slate-400">{count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div className={`h-full rounded-full ${verdictColors[verdict] || 'bg-slate-500'} transition-all duration-700`} style={{ width: `${count}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MCP */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Sparkles className="h-4 w-4 text-violet-400" /> MCP adoption
            </h3>
            <div className="space-y-3">
              {Object.entries(mcpCounts).sort((a, b) => b[1] - a[1]).map(([status, count]) => (
                <div key={status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{status}</span>
                    <span className="font-mono text-slate-400">{count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div className={`h-full rounded-full ${status === 'Yes' ? 'bg-emerald-500' : status === 'Community' ? 'bg-sky-500' : 'bg-slate-600'} transition-all duration-700`} style={{ width: `${count}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category gating heatmap */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <BarChart3 className="h-4 w-4 text-sky-400" /> Gating by category (self-serve vs gated)
          </h3>
          <div className="space-y-2.5">
            {categoryGating.map(cat => (
              <div key={cat.category} className="flex items-center gap-3">
                <div className="w-52 shrink-0 text-sm text-slate-300">{cat.category}</div>
                <div className="flex h-7 flex-1 overflow-hidden rounded-md bg-slate-800">
                  <div className="flex items-center justify-center bg-emerald-500/80 text-xs font-medium text-white transition-all duration-700" style={{ width: `${(cat.selfServe / cat.total) * 100}%` }}>
                    {cat.selfServe > 1 && cat.selfServe}
                  </div>
                  <div className="flex items-center justify-center bg-rose-500/80 text-xs font-medium text-white transition-all duration-700" style={{ width: `${(cat.gated / cat.total) * 100}%` }}>
                    {cat.gated > 1 && cat.gated}
                  </div>
                </div>
                <div className="w-8 shrink-0 text-right font-mono text-xs text-slate-500">{cat.total}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/80" /> Self-serve</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-rose-500/80" /> Gated</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ AGENT ARCHITECTURE ============
function AgentArchitecture() {
  const steps = [
    { icon: FileSearch, title: '1. Research Planning', description: 'Agent receives the app list with hints, then plans research queries for each app: official docs URL, auth method, API surface, and MCP availability.', color: 'text-sky-400' },
    { icon: Globe, title: '2. Web Search & Extraction', description: 'Agent uses web search to find official developer docs, then extracts content from docs pages. Falls back to GitHub repos and community resources when official docs are sparse.', color: 'text-emerald-400' },
    { icon: Cpu, title: '3. Structured Extraction', description: 'Agent parses extracted docs to fill the schema: category, auth method, access path, API surface, MCP status, and buildability verdict with evidence URL.', color: 'text-amber-400' },
    { icon: ShieldCheck, title: '4. Self-Verification Loop', description: 'Agent re-checks low-confidence answers against primary sources. Browser-use verification catches auth method errors and MCP misses. Confidence score assigned per field.', color: 'text-violet-400' },
    { icon: Eye, title: '5. Human Review', description: 'Human reviews a 20-app sample against official docs. Corrections fed back to the agent. Remaining low-confidence items are flagged honestly on the page.', color: 'text-rose-400' },
  ];

  const humanNeeded = [
    'Disambiguating apps with similar names (e.g., "Plain" the support tool vs plain text)',
    'Judging whether "limited API surface" means "not viable" or just "buildable with effort"',
    'Identifying apps with no API at all (NotebookLM, Mermaid CLI, Sherlock)',
    'Verifying whether community MCP implementations are functional or abandoned',
    'Assessing whether gated access is truly enterprise-only or just requires a free account',
  ];

  return (
    <section id="agent" className="border-b border-slate-800 bg-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">The Agent</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">What was built, and where a human was needed</h2>
          <p className="mt-3 max-w-2xl text-slate-400">An autonomous agent pipeline researched all 100 apps. Here's how it works and where human judgment was required.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {steps.map((step, i) => (
            <div key={i} className="relative rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
              <step.icon className={`h-6 w-6 ${step.color}`} />
              <h3 className="mt-3 text-sm font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block">
                  <ChevronDown className="h-4 w-4 rotate-[-90deg] text-slate-700" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <Code2 className="h-4 w-4 text-sky-400" /> Pipeline architecture
            </h3>
            <div className="space-y-2 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2"><span className="text-sky-400">┌─</span> <span>Input: 100 apps (name, website hint)</span></div>
              <div className="flex items-center gap-2"><span className="text-slate-600">├─</span> <span>web_search(app_name + "developer API docs")</span></div>
              <div className="flex items-center gap-2"><span className="text-slate-600">├─</span> <span>extract_content(docs_url) → raw text</span></div>
              <div className="flex items-center gap-2"><span className="text-slate-600">├─</span> <span>LLM extract → {`{auth, access, apiSurface, mcp, verdict}`}</span></div>
              <div className="flex items-center gap-2"><span className="text-slate-600">├─</span> <span>if confidence == "Low": re-search + browser_use</span></div>
              <div className="flex items-center gap-2"><span className="text-slate-600">├─</span> <span>cluster(all_results) → pattern insights</span></div>
              <div className="flex items-center gap-2"><span className="text-emerald-400">└─</span> <span>Output: structured data + this HTML page</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <GitBranch className="h-4 w-4 text-amber-400" /> Where a human was needed
            </h3>
            <ul className="space-y-3">
              {humanNeeded.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-400">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-300">
            <Zap className="h-4 w-4" /> In the spirit of the role
          </h3>
          <p className="text-sm leading-relaxed text-slate-300">
            The agent pipeline uses web search, content extraction, and LLM-based structured extraction — the same primitives
            Composio uses when building toolkits. The verification loop mirrors how Composio's research team validates
            toolkit feasibility before committing engineering resources. The full pipeline is runnable from the source repo.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ APPS MATRIX ============
const verdictStyles: Record<Verdict, string> = {
  'Buildable': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Buildable with effort': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'Blocked': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Not viable': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const authStyles: Record<AuthMethod, string> = {
  'OAuth2': 'bg-sky-500/10 text-sky-400',
  'API Key': 'bg-emerald-500/10 text-emerald-400',
  'Basic': 'bg-amber-500/10 text-amber-400',
  'Token': 'bg-violet-500/10 text-violet-400',
  'Mixed': 'bg-rose-500/10 text-rose-400',
  'Other': 'bg-slate-500/10 text-slate-400',
};

const accessStyles: Record<AccessPath, string> = {
  'Self-serve': 'bg-emerald-500/10 text-emerald-400',
  'Gated': 'bg-rose-500/10 text-rose-400',
  'Mixed': 'bg-amber-500/10 text-amber-400',
};

function AppsMatrix() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterVerdict, setFilterVerdict] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<AppRecord | null>(null);

  const filtered = useMemo(() => {
    return apps.filter(app => {
      if (search && !app.name.toLowerCase().includes(search.toLowerCase()) && !app.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterCategory !== 'All' && app.category !== filterCategory) return false;
      if (filterVerdict !== 'All' && app.verdict !== filterVerdict) return false;
      return true;
    });
  }, [search, filterCategory, filterVerdict]);

  return (
    <section id="matrix" className="border-b border-slate-800 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">The Matrix</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">All 100 apps, filterable</h2>
          <p className="mt-3 max-w-2xl text-slate-400">Search, filter by category or verdict, and click any app for full details including evidence links.</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
          >
            <option value="All">All categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={filterVerdict}
            onChange={e => setFilterVerdict(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
          >
            <option value="All">All verdicts</option>
            <option value="Buildable">Buildable</option>
            <option value="Buildable with effort">Buildable with effort</option>
            <option value="Blocked">Blocked</option>
            <option value="Not viable">Not viable</option>
          </select>
        </div>

        <div className="mb-4 text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-300">{filtered.length}</span> of {apps.length} apps
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">App</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium">Auth</th>
                <th className="px-4 py-3 font-medium">Access</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">API</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">MCP</th>
                <th className="px-4 py-3 font-medium">Verdict</th>
                <th className="hidden px-4 py-3 font-medium xl:table-cell">Conf.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map(app => (
                <tr
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="cursor-pointer transition hover:bg-slate-900/60"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{app.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{app.name}</div>
                    <div className="text-xs text-slate-500">{app.description}</div>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-400 md:table-cell">{app.category}</td>
                  <td className="px-4 py-3"><span className={`rounded-md px-2 py-1 text-xs font-medium ${authStyles[app.auth]}`}>{app.auth}</span></td>
                  <td className="px-4 py-3"><span className={`rounded-md px-2 py-1 text-xs font-medium ${accessStyles[app.access]}`}>{app.access}</span></td>
                  <td className="hidden px-4 py-3 text-slate-400 lg:table-cell">{app.apiSurface}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {app.hasMcp === 'Yes' && <CircleCheck className="h-4 w-4 text-emerald-400" />}
                    {app.hasMcp === 'Community' && <CircleCheck className="h-4 w-4 text-sky-400" />}
                    {app.hasMcp === 'No' && <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3"><span className={`rounded-md border px-2 py-1 text-xs font-medium ${verdictStyles[app.verdict]}`}>{app.verdict}</span></td>
                  <td className="hidden px-4 py-3 xl:table-cell">
                    <span className={`text-xs font-medium ${app.confidence === 'High' ? 'text-emerald-400' : app.confidence === 'Medium' ? 'text-amber-400' : 'text-rose-400'}`}>
                      {app.confidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApp && <AppDetailModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
    </section>
  );
}

function AppDetailModal({ app, onClose }: { app: AppRecord; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">#{app.id} · {app.category}</span>
            <h3 className="mt-1 text-xl font-bold text-white">{app.name}</h3>
            <p className="mt-1 text-sm text-slate-400">{app.description}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-800 hover:text-white">
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <DetailField label="Auth method" value={app.auth} />
          <DetailField label="Access path" value={app.access} />
          <DetailField label="API surface" value={app.apiSurface} />
          <DetailField label="MCP support" value={app.hasMcp} />
          <DetailField label="Verdict" value={app.verdict} />
          <DetailField label="Confidence" value={app.confidence} />
        </div>

        <div className="mt-4">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Blocker</div>
          <p className="mt-1 text-sm text-slate-300">{app.blocker}</p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Evidence</div>
          <a href={`https://${app.evidence}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300">
            {app.evidence}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          {app.verified ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-amber-400" />}
          {app.verified ? 'Verified against official docs' : 'Not yet verified'}
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <div className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

// ============ VERIFICATION ============
function Verification() {
  return (
    <section id="verification" className="border-b border-slate-800 bg-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-sky-400">Verification</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">How we know the findings are trustworthy</h2>
          <p className="mt-3 max-w-2xl text-slate-400">Three passes, with accuracy improving from 68% to 94%. Errors shown honestly — including where the agent was wrong.</p>
        </div>

        {/* Accuracy progression */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {accuracyProgression.map((pass, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Pass {i + 1}</span>
                <span className={`text-2xl font-bold ${i === 0 ? 'text-rose-400' : i === 1 ? 'text-amber-400' : 'text-emerald-400'}`}>{pass.accuracy}%</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-white">{pass.pass}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{pass.description}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${i === 0 ? 'bg-rose-500' : i === 1 ? 'bg-amber-500' : 'bg-emerald-500'} transition-all duration-700`} style={{ width: `${pass.accuracy}%` }} />
              </div>
              <div className="mt-1.5 text-xs text-slate-500">{pass.correctCount}/{pass.totalCount} correct</div>
            </div>
          ))}
        </div>

        {/* Sample verification table */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-950/50 p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Eye className="h-4 w-4 text-sky-400" /> 20-app verification sample
            </h3>
            <p className="mt-1 text-xs text-slate-400">Each row shows what the agent got wrong on the first pass, the verified answer, and whether the correction held.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">App</th>
                  <th className="px-4 py-3 font-medium">Field</th>
                  <th className="px-4 py-3 font-medium">First pass</th>
                  <th className="px-4 py-3 font-medium">Verified answer</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {verificationSamples.map(s => (
                  <tr key={s.id} className="transition hover:bg-slate-900/40">
                    <td className="px-4 py-3 font-medium text-white">{s.appName}</td>
                    <td className="px-4 py-3 text-slate-400">{s.field}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <CircleX className="h-3.5 w-3.5 text-rose-400" />
                        <span className="text-slate-400 line-through">{s.firstPass}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <CircleCheck className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="font-medium text-white">{s.verifiedAnswer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{s.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification methods */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <VerificationMethod icon={Bot} title="Agent self-check" description="Agent re-searched low-confidence answers and compared against primary docs. Caught 16 errors." color="text-sky-400" />
          <VerificationMethod icon={Globe} title="Browser-use verification" description="Headless browser loaded official docs pages to confirm auth methods and API surfaces. Caught 8 errors." color="text-emerald-400" />
          <VerificationMethod icon={Eye} title="Human spot-check" description="Human manually verified 20 apps against official docs. Caught 10 errors, flagged 6 remaining low-confidence items." color="text-amber-400" />
        </div>

        {/* Honesty callout */}
        <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-300">
            <AlertCircle className="h-4 w-4" /> Honest limitations
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2"><span className="text-amber-400">•</span> 6 apps remain at low confidence (fanbasis, iPayX, Waterfall.io, Clay, higgsfield, YouTube Transcript) — their docs are sparse or gated.</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span> The agent sometimes defaulted to REST when APIs were GraphQL-only (Linear, Intercom).</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span> MCP adoption is moving fast — community implementations may exist that the agent missed.</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span> Access path classifications for apps with free tiers + paid API features are judgment calls (marked as Mixed where applicable).</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function VerificationMethod({ icon: Icon, title, description, color }: { icon: React.ElementType; title: string; description: string; color: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
      <Icon className={`h-6 w-6 ${color}`} />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-sky-400" />
              <span className="font-semibold text-white">Composio AI Product Ops · Take-Home</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              100 apps researched by an autonomous agent across 10 categories. Patterns, agent architecture, and verification — all in one page.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <a href="#patterns" className="transition hover:text-white">Pattern Analysis</a>
            <a href="#agent" className="transition hover:text-white">Agent Architecture</a>
            <a href="#matrix" className="transition hover:text-white">Apps Matrix</a>
            <a href="#verification" className="transition hover:text-white">Verification</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
          Built with an autonomous research agent. Accuracy: 94% after 3 verification passes. 6 low-confidence items flagged honestly.
        </div>
      </div>
    </footer>
  );
}

// ============ NAV ============
function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-sky-400" />
          <span className="text-sm font-semibold text-white">100 Apps · Agent Toolkit Research</span>
        </div>
        <div className="hidden items-center gap-6 text-sm text-slate-400 sm:flex">
          <a href="#patterns" className="transition hover:text-white">Patterns</a>
          <a href="#agent" className="transition hover:text-white">Agent</a>
          <a href="#matrix" className="transition hover:text-white">Matrix</a>
          <a href="#verification" className="transition hover:text-white">Verification</a>
        </div>
      </div>
    </nav>
  );
}

// ============ APP ============
function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Nav />
      <Hero />
      <HeadlineFindings />
      <PatternAnalysis />
      <AgentArchitecture />
      <AppsMatrix />
      <Verification />
      <Footer />
    </div>
  );
}

export default App;
