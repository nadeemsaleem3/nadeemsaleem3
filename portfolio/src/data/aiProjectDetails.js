// Case-study content for the AI/ML projects.
// Each entry powers the /projects/:slug detail page, which is reached from the
// AI/ML project cards rather than from the top navigation.

export const aiProjectDetails = [
  {
    slug: 'malwareguard-ai',
    name: 'MalwareGuard AI',
    tagline: 'Static PE-feature malware detection with a tool-using AI agent that cannot skip the model',
    category: 'AI/ML',
    role: 'Machine Learning Engineer',
    type: 'Machine Learning + Agentic AI',
    liveUrl: 'https://malwareguard-ai-473e.onrender.com',
    image: '/images/projects/malwareguard-ai.png',
    imageFallback: '/nadeemsaleem3/images/projects/malwareguard-ai.png',
    accent: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentSoft: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    summary:
      'A production-style malware classification system: seven tuned model families, a leakage-audited evaluation protocol, a frozen LightGBM artifact, and a conversational agent that can only report what its three bounded tools actually return.',
    atAGlance: [
      { value: '0.99874', label: 'Hold-out AUC' },
      { value: '98.8%', label: 'Hold-out accuracy' },
      { value: '7', label: 'Model families compared' },
      { value: '40', label: 'Automated tests in CI' }
    ],
    requirement: {
      intro:
        'The brief was to build and evaluate ML models that classify Windows Portable Executable (PE) files as malware or goodware, then place a deployed AI agent in front of the selected production model. The agent had to call the model for every classification, support single-record, batch and labeled-evaluation tasks, and withhold predictions when evaluation accuracy fell below a user-defined threshold.',
      items: [
        {
          title: 'Leakage-safe ML protocol',
          detail:
            'Hold out a stratified 20% test set before any preprocessing, inspect for duplicates and class imbalance, and fit every learned transform inside training folds only.'
        },
        {
          title: 'Required model breadth',
          detail:
            'Train four baselines (logistic regression, decision tree, random forest, PyTorch MLP) plus at least three stronger models including XGBoost and LightGBM. Compare all of them with stratified 10-fold cross-validation and report mean ± standard deviation.'
        },
        {
          title: 'Frozen production artifact',
          detail:
            'Select the winner by cross-validation AUC, resolve close results with accuracy and production considerations, freeze preprocessing and threshold, then refit on the full training set and score the untouched hold-out once.'
        },
        {
          title: 'Three agent tools, one source of truth',
          detail:
            'Expose single-record prediction, batch CSV prediction and labeled-data evaluation. The LLM may interpret and explain, but it must never invent a prediction, metric or feature-level cause.'
        },
        {
          title: 'Conditional prediction and safe failure',
          detail:
            'In the evaluation workflow, call the labeled-evaluation tool first and only call the single-record tool when the returned accuracy meets the user minimum. Validate uploads, handle missing labels and single-class files, and surface tool failures without claiming success.'
        },
        {
          title: 'Gated deployment',
          detail:
            'Ship a hosted Flask app behind CI/CD that only deploys a commit after linting and tests pass, then run a post-deployment health smoke test.'
        }
      ]
    },
    solution: [
      {
        title: 'A leakage-audited dataset pipeline',
        detail:
          'Collapsed duplicate SHA1 hashes so near-identical executables could not straddle train and test, quarantined conflicting labels, and kept imputation, encoding and scaling inside every fold. The test partition stayed untouched until the final single scoring run.'
      },
      {
        title: 'Seven-model bake-off with a clear winner',
        detail:
          'Tuned logistic regression, decision tree, random forest and a PyTorch MLP as baselines, then XGBoost, LightGBM and CatBoost over randomized search spaces. Every family was compared with stratified 10-fold cross-validation using AUC as the primary metric and accuracy as the tie-breaker.'
      },
      {
        title: 'A frozen, reproducible LightGBM artifact',
        detail:
          'The winning pipeline — fitted preprocessing, feature schema, class mapping, classification threshold and model version — is packaged together so live inference applies exactly the transformations used in final evaluation.'
      },
      {
        title: 'An agent wrapped around bounded tools',
        detail:
          'The agent can call three tools only: single-record prediction, batch CSV prediction and labeled evaluation. Counts and metrics are computed in code; the LLM receives bounded summaries and file references rather than raw CSVs, keeping every number traceable to a tool result.'
      },
      {
        title: 'A code-enforced accuracy gate',
        detail:
          'The conditional-prediction workflow is enforced in code, not by prompt wording. If evaluation accuracy is below the threshold, or evaluation fails, the single-record tool is never called and the agent explains why prediction was withheld.'
      },
      {
        title: 'Resilient provider handling and gated CI/CD',
        detail:
          'The agent falls back across three LLM providers, validates upload type, schema and size, and keeps user sessions isolated. Every push is linted and tested, and deployment happens only behind a green CI gate followed by a health check.'
      }
    ],
    achievements: [
      {
        headline: 'AUC 0.99874 and 98.8% accuracy on the one-time hold-out',
        x: 'A highly accurate production malware classifier',
        y: 'a one-time untouched hold-out evaluation',
        z: 'tuning seven model families over randomized search spaces, comparing them with stratified 10-fold cross-validation, and refitting the LightGBM winner on the full training set'
      },
      {
        headline: 'No duplicate-driven leakage across evaluation partitions',
        x: 'Credible generalization estimates',
        y: 'collapsed duplicate SHA1 hashes, quarantined label conflicts, and learned transforms fitted only inside each fold',
        z: 'auditing the dataset before any model saw it'
      },
      {
        headline: 'Every reported prediction traces back to the selected ML model',
        x: 'Faithful, auditable agent answers',
        y: 'three bounded tools that compute predictions, batch summaries and metrics in code',
        z: 'restricting the LLM to tool selection, argument validation and explanation of tool output'
      },
      {
        headline: 'Predictions withheld automatically when the model misses the bar',
        x: 'Safe conditional behavior',
        y: 'a code-enforced accuracy gate in the evaluation workflow',
        z: 'calling labeled evaluation first and only invoking single-record prediction when returned accuracy meets the user threshold'
      },
      {
        headline: 'Continuous availability across LLM provider outages',
        x: 'Resilient conversational uptime',
        y: 'a three-provider fallback chain',
        z: 'abstracting the model client behind one interface with graceful degradation'
      },
      {
        headline: 'Deployment blocked on every failing build',
        x: 'Release confidence',
        y: '40 automated tests and a green-only deployment gate',
        z: 'linting and testing every push before the hosting step runs'
      }
    ],
    architecture: {
      summary:
        'A single Flask service hosts the chat UI, the agent loop, the tool registry and the frozen ML pipeline. The agent selects a tool, validates arguments against the saved schema, executes Python inference, and composes an answer strictly from the returned structured result.',
      flow: [
        { title: 'Chat UI / CSV upload', detail: 'User request arrives through the conversational interface with optional file reference.' },
        { title: 'Agent orchestrator', detail: 'Interprets intent, chooses one of the three tools and validates arguments against the saved feature schema.' },
        { title: 'Tool layer', detail: 'Single-record, batch and labeled-evaluation tools run the production pipeline in code.' },
        { title: 'Production artifact', detail: 'Frozen LightGBM model plus fitted preprocessing, feature schema, class mapping and threshold.' },
        { title: 'Grounded response', detail: 'The agent reports only tool-returned predictions, counts and metrics, with a concise activity record.' }
      ],
      decisions: [
        'The LLM never performs arithmetic on uploaded data — metrics and counts are computed by the tools.',
        'Uploaded content is treated as data, not instructions, and arbitrary execution is out of scope.',
        'Predictions and true labels stay visibly distinct; scores are not described as calibrated confidence.',
        'Feature-level explanations are only given when a supporting explanation tool exists.'
      ]
    },
    stack: [
      { group: 'Modeling', items: ['Python', 'scikit-learn', 'PyTorch', 'XGBoost', 'LightGBM', 'CatBoost'] },
      { group: 'Evaluation', items: ['Stratified 10-fold CV', 'AUC / ROC', 'Hold-out protocol', 'Confusion matrix', 'Leakage auditing'] },
      { group: 'Agent & App', items: ['Tool-calling agent', 'Flask', 'CSV ingestion', 'Session isolation', 'Health endpoint'] },
      { group: 'Delivery', items: ['GitHub Actions', 'Lint + 40 tests', 'Gated deploy', 'Render'] }
    ],
    evaluation: [
      { label: 'Primary selection metric', value: 'Cross-validated AUC (mean ± SD)' },
      { label: 'Secondary metric', value: 'Accuracy (mean ± SD)' },
      { label: 'Final test', value: 'Untouched stratified 20% hold-out' },
      { label: 'Hold-out results', value: 'AUC 0.99874 · 98.8% accuracy' },
      { label: 'Agent tasks covered', value: 'Single record · batch · labeled evaluation with conditional prediction' },
      { label: 'Failure cases tested', value: 'Malformed features, missing labels, single-class files, tool failure' }
    ],
    links: [
      { label: 'Open live app', href: 'https://malwareguard-ai-473e.onrender.com', primary: true }
    ]
  },
  {
    slug: 'hr-copilot-ai',
    name: 'HR Copilot AI',
    tagline: 'Agentic HR assistant that combines policy RAG, MCP tools and mock employee data into cited answers',
    category: 'AI/ML',
    role: 'Full-Stack AI Engineer',
    type: 'Agentic RAG + MCP',
    liveUrl: 'https://hr-copilot-ai.onrender.com',
    image: '/images/projects/hr-copilot-ai.png',
    imageFallback: '/nadeemsaleem3/images/projects/hr-copilot-ai.png',
    accent: 'from-violet-500 via-purple-500 to-fuchsia-500',
    accentText: 'text-violet-600 dark:text-violet-400',
    accentSoft: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
    summary:
      'An HR policy assistant that retrieves grounded evidence, calls MCP-exposed tools against structured employee data, and streams a cited answer alongside a live operational trace of every tool call.',
    atAGlance: [
      { value: '100%', label: 'Evaluation pass rate' },
      { value: '15', label: 'Policy documents indexed' },
      { value: '30', label: 'Evaluation questions' },
      { value: '35', label: 'Synthetic employee records' }
    ],
    requirement: {
      intro:
        'The brief was to design, build, deploy and evaluate an agentic HR system. It had to answer policy questions from an internal corpus with grounded citations, complete multi-step workflows over mock structured data, and call real Model Context Protocol (MCP) tools — all running on a free-tier host with visible, non-chain-of-thought traces and explicit safety guardrails.',
      items: [
        {
          title: 'Policy corpus ingestion and indexing',
          detail:
            'Parse and clean a small internal policy corpus, chunk it with a justified strategy, embed the chunks, and persist citation metadata in a lightweight vector store.'
        },
        {
          title: 'Retrieval-augmented answers',
          detail:
            'Implement top-k retrieval with a prompt that injects retrieved chunks and source metadata, cite document titles and sections, and refuse or redirect out-of-corpus questions.'
        },
        {
          title: 'Agent orchestration',
          detail:
            'Interpret intent, decide when RAG alone is sufficient, select tools, call MCP servers, handle ambiguous requests and missing data, and synthesize a final grounded response.'
        },
        {
          title: 'MCP tool integration',
          detail:
            'Expose at least five MCP tools, including at least one RAG-backed tool and at least one tool over mock structured data or a mock operation — and actually invoke them through the MCP layer.'
        },
        {
          title: 'Safe, confirmable actions',
          detail:
            'Prevent irreversible operations: ticket creation, email drafting and record updates must be mock actions or require explicit user confirmation.'
        },
        {
          title: 'Deployment, CI/CD and evaluation',
          detail:
            'Deploy to a free-tier host with /chat and /health endpoints, gate deployment on tests, and evaluate groundedness, citation accuracy, tool selection, workflow completion, safety and latency against a 20–30 item gold set.'
        }
      ]
    },
    solution: [
      {
        title: 'A citation-first RAG pipeline',
        detail:
          'Fifteen HR policy documents are parsed, chunked with heading awareness, embedded and loaded into ChromaDB with document, section and snippet metadata on every chunk. Retrieved evidence is injected into the prompt so answers can cite the exact source behind each policy claim.'
      },
      {
        title: 'An agentic planner/executor over MCP',
        detail:
          'A planner decides whether the question needs policy retrieval, structured employee data or both. The executor then calls MCP-exposed tools such as policy search, employee lookup and PTO balance checks, passing validated arguments and feeding structured results back into the loop.'
      },
      {
        title: 'Grounded answers with a live operational trace',
        detail:
          'Chat responses stream progressively and carry inline citations. Beside the conversation, a trace panel shows the selected tools, their arguments, their returned results and the retrieved policy sources — an architectural activity record, not hidden chain-of-thought.'
      },
      {
        title: 'Boot-time reproducibility',
        detail:
          'On startup the app auto-ingests the 15 policy documents and seeds 35 synthetic employees into SQLite, so a cold free-tier instance comes up with a fully usable demo state and no manual data preparation.'
      },
      {
        title: 'Guardrails and safe actions',
        detail:
          'Out-of-corpus questions are refused or redirected, policy facts are kept distinct from recommendations, and every action with real-world consequences is a mock operation behind explicit confirmation.'
      },
      {
        title: 'Evaluate, then ship',
        detail:
          'A 30-question evaluation suite covers straightforward policy Q&A, multi-document questions, tool-requiring tasks, ambiguous requests and out-of-scope requests. The deployed build streams answers from a single free-tier service with /chat and /health endpoints.'
      }
    ],
    achievements: [
      {
        headline: '100% pass rate across the 30-question evaluation suite',
        x: 'Grounded, cited HR answers',
        y: 'a 30-question gold evaluation suite spanning policy Q&A, multi-document retrieval, tool tasks, ambiguity and out-of-scope requests',
        z: 'building a citation-first RAG pipeline over 15 policy documents with guardrails against unsupported claims'
      },
      {
        headline: 'Zero-setup demo state on every cold start',
        x: 'Immediate reproducibility on a free-tier host',
        y: '35 synthetic employees and a fully populated policy index at boot',
        z: 'automating corpus ingestion into ChromaDB and SQLite seeding during application startup'
      },
      {
        headline: 'Every policy claim traceable to a source',
        x: 'Auditable, trustworthy answers',
        y: 'inline citations plus a live trace of retrieved policy sources and tool results',
        z: 'persisting document, section and snippet metadata on every embedded chunk'
      },
      {
        headline: 'More than a chatbot: completed multi-step HR workflows',
        x: 'Answers that act on structured data',
        y: 'agentic workflows that combine policy evidence with structured employee records',
        z: 'a planner/executor loop that calls MCP-exposed tools with validated arguments and synthesizes the results'
      },
      {
        headline: 'No irreversible actions from the agent',
        x: 'Safe HR automation',
        y: 'mock-only or explicitly confirmed side effects',
        z: 'designing every write operation as a confirmation-gated mock action'
      },
      {
        headline: 'One deployable service within free-tier limits',
        x: 'A publicly accessible agentic system',
        y: 'a single Render service exposing streamed chat and health endpoints',
        z: 'co-locating the web app, agent orchestrator, MCP server, vector index and mock data store'
      }
    ],
    architecture: {
      summary:
        'One deployed service contains the chat UI, the agent orchestrator and MCP client, a local MCP server, the ChromaDB policy index and a SQLite store of synthetic employee data. The LLM provider is configured through environment variables, and the MCP layer stays explicit so every tool call is logged.',
      flow: [
        { title: 'Chat UI', detail: 'User asks a policy or workflow question; responses stream back with citations and a trace.' },
        { title: 'Agent orchestrator', detail: 'Plans whether to retrieve policy, call structured-data tools or ask a clarifying question.' },
        { title: 'MCP client → MCP server', detail: 'Discovers and invokes tools such as policy search, employee lookup and PTO balance checks.' },
        { title: 'RAG index + mock data', detail: 'ChromaDB serves cited policy chunks; SQLite serves synthetic employee, PTO and benefits records.' },
        { title: 'Grounded response', detail: 'The executor synthesizes an answer from tool output and retrieved evidence, with a concise activity trace.' }
      ],
      decisions: [
        'MCP is the only path to tools; the agent never calls hard-coded functions directly.',
        'Citations carry document, section and snippet metadata so claims can be checked.',
        'Writes are mock operations or require explicit confirmation; nothing irreversible is automated.',
        'The whole stack is co-located to stay inside free-tier hosting limits, with cold-start behavior documented.'
      ]
    },
    stack: [
      { group: 'RAG', items: ['Python', 'ChromaDB', 'Embeddings', 'Heading-aware chunking', 'Citation metadata'] },
      { group: 'Agent', items: ['Planner / executor', 'Tool calling', 'MCP client', 'MCP server', 'Guardrails'] },
      { group: 'App & Data', items: ['Streamed chat', 'SQLite', 'Synthetic HR data', 'Health endpoint', 'Trace panel'] },
      { group: 'Delivery', items: ['Automated evaluation', 'CI checks', 'Render', 'Environment-based secrets'] }
    ],
    evaluation: [
      { label: 'Evaluation set', value: '30 questions and tasks with gold answers' },
      { label: 'Coverage', value: 'Policy Q&A · multi-document · tool-requiring · ambiguous · out-of-scope' },
      { label: 'Answer quality', value: 'Groundedness · citation accuracy' },
      { label: 'Agent behavior', value: 'Tool selection · workflow completion · safety' },
      { label: 'Result', value: '100% pass rate on the 30-question suite' },
      { label: 'Deployment', value: 'Live free-tier service with /chat and /health' }
    ],
    links: [
      { label: 'Open live app', href: 'https://hr-copilot-ai.onrender.com', primary: true }
    ]
  }
];

export const getAIProjectDetail = (slug) =>
  aiProjectDetails.find((project) => project.slug === slug);
