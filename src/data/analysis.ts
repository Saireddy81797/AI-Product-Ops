export interface VerificationSample {
  id: number;
  appName: string;
  field: string;
  firstPass: string;
  firstPassCorrect: boolean;
  verifiedAnswer: string;
  finalCorrect: boolean;
  notes: string;
}

export const verificationSamples: VerificationSample[] = [
  { id: 1, appName: 'Salesforce', field: 'Auth method', firstPass: 'API Key', firstPassCorrect: false, verifiedAnswer: 'OAuth2', finalCorrect: true, notes: 'Agent confused SOAP legacy API with current REST API which uses OAuth2' },
  { id: 2, appName: 'HubSpot', field: 'Access path', firstPass: 'Gated', firstPassCorrect: false, verifiedAnswer: 'Self-serve', finalCorrect: true, notes: 'Agent confused enterprise-only features with general developer access' },
  { id: 3, appName: 'Attio', field: 'API surface', firstPass: 'GraphQL', firstPassCorrect: false, verifiedAnswer: 'REST', finalCorrect: true, notes: 'Agent assumed modern startups use GraphQL; Attio is REST-only' },
  { id: 4, appName: 'Slack', field: 'Has MCP', firstPass: 'No', firstPassCorrect: false, verifiedAnswer: 'Yes', finalCorrect: true, notes: 'Slack has official MCP support; agent missed it in first pass' },
  { id: 5, appName: 'Telegram', field: 'Auth method', firstPass: 'OAuth2', firstPassCorrect: false, verifiedAnswer: 'Token', finalCorrect: true, notes: 'Bot API uses bot tokens, not OAuth2' },
  { id: 6, appName: 'Shopify', field: 'Auth method', firstPass: 'API Key', firstPassCorrect: false, verifiedAnswer: 'OAuth2', finalCorrect: true, notes: 'Admin API requires OAuth2 for apps; API key alone insufficient' },
  { id: 7, appName: 'Linear', field: 'API surface', firstPass: 'REST', firstPassCorrect: false, verifiedAnswer: 'GraphQL', finalCorrect: true, notes: 'Linear API is GraphQL-only; agent defaulted to REST' },
  { id: 8, appName: 'Stripe', field: 'Has MCP', firstPass: 'No', firstPassCorrect: false, verifiedAnswer: 'Community', finalCorrect: true, notes: 'Community MCP exists; agent missed community implementations' },
  { id: 9, appName: 'Notion', field: 'Has MCP', firstPass: 'No', firstPassCorrect: false, verifiedAnswer: 'Yes', finalCorrect: true, notes: 'Notion has official MCP server; agent missed recent release' },
  { id: 10, appName: 'Firecrawl', field: 'Has MCP', firstPass: 'No', firstPassCorrect: false, verifiedAnswer: 'Yes', finalCorrect: true, notes: 'Firecrawl has official MCP; agent missed it' },
  { id: 11, appName: 'DealCloud', field: 'Access path', firstPass: 'Self-serve', firstPassCorrect: false, verifiedAnswer: 'Gated', finalCorrect: true, notes: 'Agent assumed public docs meant self-serve; actually partner-gated' },
  { id: 12, appName: 'Amazon SP-API', field: 'Access path', firstPass: 'Self-serve', firstPassCorrect: false, verifiedAnswer: 'Gated', finalCorrect: true, notes: 'Registration approval process makes it effectively gated' },
  { id: 13, appName: 'Sherlock', field: 'Verdict', firstPass: 'Buildable with effort', firstPassCorrect: false, verifiedAnswer: 'Not viable', finalCorrect: true, notes: 'CLI tool with no API; agent overestimated buildability' },
  { id: 14, appName: 'NotebookLM', field: 'Verdict', firstPass: 'Buildable with effort', firstPassCorrect: false, verifiedAnswer: 'Not viable', finalCorrect: true, notes: 'No public API exists; agent assumed Gemini Enterprise API access' },
  { id: 15, appName: 'Mermaid CLI', field: 'Verdict', firstPass: 'Buildable', firstPassCorrect: false, verifiedAnswer: 'Not viable', finalCorrect: true, notes: 'CLI tool, not a service API; agent misclassified' },
  { id: 16, appName: 'Gladly', field: 'Access path', firstPass: 'Self-serve', firstPassCorrect: false, verifiedAnswer: 'Gated', finalCorrect: true, notes: 'API access requires enterprise plan; agent missed paywall' },
  { id: 17, appName: 'PitchBook', field: 'Access path', firstPass: 'Self-serve', firstPassCorrect: false, verifiedAnswer: 'Gated', finalCorrect: true, notes: 'Enterprise subscription required for API access' },
  { id: 18, appName: 'Plaid', field: 'Access path', firstPass: 'Gated', firstPassCorrect: false, verifiedAnswer: 'Self-serve', finalCorrect: true, notes: 'Sandbox is self-serve; only production is gated' },
  { id: 19, appName: 'WooCommerce', field: 'Auth method', firstPass: 'OAuth2', firstPassCorrect: false, verifiedAnswer: 'Basic', finalCorrect: true, notes: 'Uses WooCommerce API key/secret via Basic auth, not OAuth2' },
  { id: 20, appName: 'Apify', field: 'Auth method', firstPass: 'API Key', firstPassCorrect: false, verifiedAnswer: 'Token', finalCorrect: true, notes: 'Uses bearer token auth, not API key headers' },
];

export interface AccuracyPass {
  pass: string;
  accuracy: number;
  correctCount: number;
  totalCount: number;
  description: string;
}

export const accuracyProgression: AccuracyPass[] = [
  { pass: 'First Pass (Agent only)', accuracy: 68, correctCount: 68, totalCount: 100, description: 'Agent researched all 100 apps using web search and docs extraction. Common errors: defaulting to REST, missing MCP implementations, misclassifying gated vs self-serve.' },
  { pass: 'Second Pass (Verification loop)', accuracy: 84, correctCount: 84, totalCount: 100, description: 'Agent re-checked low-confidence answers against primary docs. Browser-use verification caught auth method errors and MCP misses. 16 corrections applied.' },
  { pass: 'Final Pass (Human review)', accuracy: 94, correctCount: 94, totalCount: 100, description: 'Human manually verified a 20-app sample against official docs. 10 more corrections applied. Remaining 6 low-confidence items flagged honestly.' },
];

export interface PatternInsight {
  title: string;
  finding: string;
  detail: string;
  metric: string;
  category: string;
}

export const patternInsights: PatternInsight[] = [
  {
    title: 'OAuth2 dominates auth',
    finding: 'OAuth2 is the most common auth method across all 100 apps',
    detail: '52 of 100 apps use OAuth2 as their primary auth method. API Key is second at 28. This means most agent toolkits will need OAuth flow management as a core capability.',
    metric: '52%',
    category: 'Auth',
  },
  {
    title: 'Self-serve is the majority',
    finding: '72 of 100 apps offer self-serve developer access',
    detail: 'The majority of apps allow developers to obtain credentials for free or on a trial. The remaining 28 are gated behind paid plans, enterprise subscriptions, or partner programs.',
    metric: '72%',
    category: 'Access',
  },
  {
    title: 'REST is the standard surface',
    finding: '76 of 100 apps expose a REST API',
    detail: 'REST remains the dominant API paradigm. Only 4 apps are GraphQL-only (Linear, Monday partial, Intercom partial). 12 apps have no real API or only a CLI.',
    metric: '76%',
    category: 'API',
  },
  {
    title: 'Most common blocker: app review',
    finding: 'The most frequent blocker is app review or approval processes',
    detail: '17 apps require some form of app review, developer token approval, or marketplace approval. This is the #1 friction point for building agent toolkits.',
    metric: '17 apps',
    category: 'Blockers',
  },
  {
    title: 'MCP adoption is early',
    finding: 'Only 8 apps have official MCP servers; 14 have community implementations',
    detail: '22 of 100 apps have some MCP support. Official MCPs: Slack, Notion, Linear, Firecrawl, Otter, Devin. Community MCPs cover GitHub, Stripe, Zendesk, and others.',
    metric: '22%',
    category: 'MCP',
  },
  {
    title: 'Finance and AI are hardest',
    finding: 'Finance/Fintech and AI/Media categories have the highest gating rates',
    detail: '60% of Finance apps and 30% of AI apps are gated. These categories require the most outreach and partnership work before toolkits can be built.',
    metric: '60%',
    category: 'Difficulty',
  },
];
