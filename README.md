# AI Product Ops Agent

An AI-powered research system for evaluating whether applications are ready to become tools for AI agents.

Built for the **Composio AI Product Ops Intern take-home assignment**.

## Overview

Composio turns applications into tools that AI agents can call. Before building a toolkit for an application, several questions need to be answered:

* What authentication methods does the application support?
* Can developers obtain credentials themselves?
* Is access self-serve, paid, admin-gated, or partner-gated?
* What API surface is available?
* Does the application have an MCP server?
* Can the application be turned into an agent toolkit today?
* What is the main integration blocker?

This project automates that research workflow across a set of 100 applications spanning 10 categories.

## What the System Researches

For each application, the research workflow captures:

| Field          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| Application    | Application being researched                                 |
| Category       | Product category                                             |
| Description    | One-line description                                         |
| Authentication | OAuth2, API key, token, Basic, or other                      |
| Access Model   | Self-serve, trial, paid, admin approval, partner-gated, etc. |
| API Surface    | REST, GraphQL, SOAP, SDKs, or other APIs                     |
| API Breadth    | Limited, moderate, or broad                                  |
| MCP            | Official, third-party, community, or none found              |
| Buildability   | Ready, Conditional, Outreach, or Blocked                     |
| Blocker        | Main technical or commercial blocker                         |
| Evidence       | Documentation supporting the finding                         |

## Research Workflow

```text
100 Applications
       |
       v
Research Agent
       |
       v
Web / Documentation Research
       |
       v
Official Sources Prioritized
       |
       v
Structured Research Results
       |
       v
Evidence Verification
       |
       v
Human Sample Checks
       |
       v
Pattern Analysis
       |
       v
Case Study
```

The goal is not simply to collect 100 rows. The final output identifies patterns across authentication, access models, API availability, MCP support, and buildability.

## Buildability Framework

Applications are grouped into four practical integration outcomes:

### READY

The application has a usable public API, accessible credentials, and no major integration blocker.

### CONDITIONAL

The API is usable, but an approval, plan requirement, OAuth review, or other condition may apply.

### OUTREACH

The integration is technically interesting but requires sales, partnership, enterprise access, or another commercial relationship.

### BLOCKED

A public integration path is unavailable or there is a significant technical/access limitation.

## Verification

Accuracy is treated as a first-class part of the workflow.

Research findings are checked against the underlying documentation, with additional human review used for ambiguous cases such as:

* Authentication requirements
* Pricing and developer access
* Production approval
* Admin permissions
* Official versus third-party MCP servers
* Partnership or contact-sales requirements

Incorrect or uncertain findings are retained as part of the evaluation rather than silently removed.

## Key Product Ops Questions

The resulting dataset is used to answer questions such as:

1. Which authentication methods dominate across application categories?
2. Which categories are easiest to integrate?
3. Where does API availability still lead to commercial or administrative gating?
4. Which applications are immediate integration opportunities?
5. Which applications require partnership or business-development outreach?
6. Where does MCP already exist, and where is there an opportunity to build an agent toolkit?

## Technology

* React
* TypeScript
* Vite
* Tailwind CSS
* Node.js
* Git / GitHub
* AI-assisted research workflow

## Running Locally

Clone the repository:

```bash
git clone https://github.com/Saireddy81797/AI-Product-Ops.git
cd AI-Product-Ops
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173/
```

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
AI-Product-Ops/
├── src/
│   ├── data/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Evidence Philosophy

The research prioritizes:

1. Official developer documentation
2. Official API references
3. Official authentication documentation
4. Official pricing/developer-access documentation
5. Official GitHub repositories
6. Reliable secondary sources only when official documentation is unavailable

Claims about MCP are separated between official and third-party/community implementations.

## Limitations

Automated web research can misinterpret documentation, especially when:

* Documentation is incomplete
* Authentication differs between development and production
* Pricing changes
* API access depends on account type
* MCP implementations are community-maintained
* Documentation pages have moved or changed

For this reason, ambiguous findings are surfaced for human verification rather than treated as certain.

## Live Case Study

The deployed case study presents:

* Research findings
* Cross-category patterns
* Application matrix
* Agent workflow
* Verification results
* Buildability opportunities

**Live Case Study:**
https://saireddy81797.github.io/AI-Product-Ops/

## Source Repository

https://github.com/Saireddy81797/AI-Product-Ops

## Author

**Byreddy Sai Reddy**

AI Product Ops Research Project
2026
