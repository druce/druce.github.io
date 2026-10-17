---
id: 7165
title: 'AI Agent Governance in 2026'
date: 2026-06-21T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7165
permalink: /2026/06/ai-agent-governance
categories: AI
tags: AI, tech
image: /assets/2026/pettingzoo.png
mathjax: false
mermaid: false
description: 'AI Agent Governance in 2026'
---
<figure>
<picture>
  <source srcset="/assets/2026/pettingzoo.webp" type="image/webp">
  <img src="/assets/2026/pettingzoo.png" alt="illustration: rogue agent petting zoo" fetchpriority="high" style="width: 100%; height: auto;">
</picture>
</figure>
> I asked AI to research [key requirements](https://druce.ai/governance_wiki/) for AI agents built by citizen devs:
>
> - Execution environments with hard constraints on access to local and Internet resources, to avoid the [OpenAI/Hugging Face debacle](https://therecord.media/openai-cyberattack-hugging-face) and the [“lethal trifecta”](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
> - A clear, strong user contract, backed by training on how to do things the right way.
> - Hard maturity gates, and reviews before anything reaches production at individual, team, enterprise levels.
> - A foundation of good access control, clean and well-catalogued data, observability, and well-defined API endpoints with runtime monitoring.
>
> Assume every agent will eventually be confused, compromised or creative, and build the fences before you open the gates.
<!--more-->

**Contents**

1. [Training And Citizen Builder Contract](#training)
2. [Agent Registry: Inventory Plane And System Of Record](#registry)
3. [Data Prerequisites: DSPM And Content Tags](#data)
4. [Identity Prerequisites](#identity)
5. [Sandboxes And Trust Zones](#sandboxes)
6. [Secrets: Key Vault](#secrets)
7. [Logging And Audit](#logging)
8. [Risk-Based Deployment Review And Gating](#deployment)
9. [Runtime Oversight](#runtime)
10. [Shadow AI Discovery And Enforcement](#shadow-ai)
11. [Vendor-Hosted And SaaS Agents](#vendor-agents)
12. [Open-Ended Agents: Coding And Computer Use](#open-ended-agents)
13. [Models And Providers](#models)
14. [Incident Response](#incident-response)
15. [Decommissioning And Offboarding](#decommissioning)
16. [Program Governance And Measurement](#program-governance)

Here is what an ideal AI agent governance program might look like in 2026:

## 1. Training And Citizen Builder Contract {#training}

- **Pre-vetted, hardened templates and stubs** ("paved road" starter kits) for citizen-built agents, with best-practice examples covering:
  - Approved platforms e.g. Claude Code, skills, etc.
  - How to access models, tools, files, data, network resources.
  - How to test (unit tests and evals).
  - How to log and what must be logged.
  - How to escalate risky actions to a human in the loop.
  - Best practices to maximize output quality: all output attributable to sources; prompt evals/improvers (e.g., [Claude skills](https://github.com/anthropics/skills/tree/main/skills/claude-api/shared/evals), DSPy optimizers such as GEPA, vendor prompt improvers); hill-climbing on evals, scoring on a held-out set.
  - Version control for code, prompts and configuration (e.g. menu-driven or simple commands to commit to Git; prompt versioning in e.g. Langfuse or LangSmith)
  - Requirements to pass deployment gates, by risk tier.
- **What triggers re-review:** major changes; new tool or data access; new module dependencies;  model or prompt changes, change of owner, approval expiry.
- **The "builder contract"**: an acceptable-use agreement attested at agent submission:
  - Follow all compliance and legal policies.
    - MNPI and information barriers (Advisers Act §204A)
    - Books and records (Rule 204-2)
    - Privacy (Reg S-P)
    - Data-vendor license terms
    - No personal AI accounts or personal API keys for firm work
  - **Follow best practices** to:
    - Avoid known risks and failure modes: prompt injection, lethal-trifecta capability combinations, tool poisoning, memory poisoning, excessive agency, overreliance on unverified output
    - Avoid excessive use of models and other resources
  - **Accept accountability** as owner of record. The agent can't be held accountable; its owner is.
  - **Request help** when needed
  - **Report incidents** promptly, through a blameless channel.
- **Tiered curricula**:
  - All AI users: data handling, verifying output, spotting injection
  - Builders: everything above
  - Approvers: approval fatigue; approve the actual parameters, not the agent's summary
  - Administrators
- **Recertify** annually and when standards change.
- **Training is required but not a control.** Controls are infrastructure that cannot be bypassed.
- **All agents must be registered.** After training and demonstrating understanding (certification), anyone can register an agent that follows approved templates for development and testing.


## 2. Agent Registry: Inventory Plane And System Of Record {#registry}

Central record for each agent, sufficient to launch and manage it, and drive controls. The agent platform compiles each agent's policy and creates its environment at runtime (allowlists, scopes, budgets) from this entry at startup.

**Each agent's purpose and composition**
- Purpose and business case
- Each LLM model (pinned version), each tool, and the purpose of each; system-prompt version/hash
- People: owner of record, other maintainers, other interested parties, managers, and downstream users who need notice of changes
- Dependencies: upstream data sources, services, agents, packages and MCP servers. Can be kept as an AI bill of materials (AIBOM, e.g., CycloneDX ML-BOM)

**Access and behavior**
- What it reads: the tools, data and network access it requires. Each source should be catalogued in firm infrastructure with sensitivity and other labels enabling risk tiering.
- What it writes, which writes are consequential or irreversible.
- Secrets and API keys it uses: key-vault references, never values
- What invokes it: schedule, interactive user, or another workflow or agent
- Escalation flags and paths; fallback approver when the owner is unavailable
- Kill path; the manual fallback when the agent is stopped
- Where it gets its code and where it writes output and logs

**Operations and lifecycle**
- Enough information to spawn its container with the necessary capabilities and controls
- Enough information to assess its risk tier and run deployment tests and gates
- Its Rule-of-Two zone, eval suite and pass thresholds, and approvals with evidence
- Enough information for runtime monitoring, rate limits, and usage alerts and limits; the cost center billed
- Version history with registry integrity: changes are authenticated, logged and reviewed. Owners can't approve their own scope increases.
- Status (development, test, deployed, deprecated) and approval expiry

**Other**
- Agent identity (e.g., Entra Agent ID, SPIFFE ID) and allowed delegations: which agents it may call and be called by.
- Regulatory flags: MNPI or information-barrier exposure, client or investor data, outputs subject to records retention or comms archiving.
- Hosting and vendor: where it runs, e.g. multiple execution platforms may be available.
- Formats: A2A Agent Card for capabilities and endpoints if other agents call it.

## 3. Data Prerequisites: DSPM And Content Tags {#data}

- Firm data must be properly tagged and correctly permissioned before agents can access it:
  - internal/external,
  - PII
  - legally privileged
  - MNPI and restricted-list names
  - information-barrier side (public vs. private)
  - client and investor data
  - licensed third-party data (vendor licenses often restrict use with external models)
  - positions, signals and model code
  - NDA and diligence material
- Tag two independent axes (confidentiality/integrity):
  - sensitivity: who may see it/write it
  - trust: who authored it, and whether it may carry trusted instructions
- Treat all external content as untrusted: it is data, never instructions.
- Internal data can carry prompt injection, inadvertently or intentionally. Trust follows provenance, not storage location. Inbound email, uploaded documents, tickets from outsiders, vendor files and earlier agent outputs are external content sitting on internal systems.
- Fix oversharing before enabling agent retrieval, since agents surface whatever permissions allow (Varonis, SharePoint Advanced Management, Restricted Content Discovery, Purview DSPM for AI).
- Retrieval should be through least-privilege tools. It enforces the caller's entitlements, tenant and information barrier on every query (entitlement-aware RAG: Glean, Microsoft Graph).
- Outputs inherit the most restrictive label of their inputs. Anything derived from untrusted content is untrusted (taint propagation).
- Context minimization: each agent gets only the fields its task needs.
- Products:
  - classification/DSPM: Microsoft Purview, Cyera, BigID, Varonis, Sentra
  - DLP: Purview DLP, Nightfall, Cyberhaven

## 4. Identity Prerequisites {#identity}

**Human and agent identity**
- Long-lived credentials for humans only, always with phishing-resistant MFA
- Agents get a durable identity tied to their registry entry, for attribution, but only short-lived credentials.
- One identity per agent. No shared keys or service accounts. A per-run session ID on every action.
- Downstream systems can tell that an agent acted, and on whose behalf.

**Tokens and revocation**
- Short-lived, scoped tokens for agents. Each time a user runs or schedules an agent, it gets a new token or revalidates existing ones.
  - Scheduled runs are authorized at execution time, not at scheduling time. Tokens are audience-bound (RFC 8707) and sender-constrained (DPoP, RFC 9449).
- Registry changes invalidate tokens, so agents always run with currently authorized permissions. (OpenID CAEP / Shared Signals; Entra CAE).

**Effective permissions**
- The ephemeral credential is the intersection of the user's and the agent's permissions.
  - Also intersect with the task's declared intent or mission (intent-based authorization: Keycard; AAuth).
  - When there is no interactive user:
    - Scheduled runs use the scheduler's current permissions at execution
    - Workflow-triggered runs follow the delegation rule below
    - System agents run on registry scope alone, with the owner accountable

**Delegation between agents**
- Delegation to another agent: the delegate gets the intersection of the caller's and callee's permissions, so permissions only shrink down the call chain (attenuation).
  - Standards:
    - OAuth Token Exchange (RFC 8693, on-behalf-of "act" claim)
    - Transaction Tokens (IETF draft)
    - IETF WIMSE
    - attenuable tokens (Biscuit, macaroons)
- Trust flows the other way too: a callee's output is untrusted to its caller if the callee processed untrusted content.
- Agent-to-agent calls are mutually authenticated and pass through the tool gateway, so a low-privilege agent can't recruit a high-privilege one.

**Products**
- agent identity: Microsoft Entra Agent ID, Okta Cross App Access / Auth0 for AI Agents, CyberArk, Aembit, Astrix, Keycard
- workload identity: SPIFFE/SPIRE

## 5. Sandboxes And Trust Zones {#sandboxes}

### Runtimes

- Every run executes in an ephemeral runtime with strong isolation, default-deny egress and allowlists from the registry.
  - Code execution should use microVM or gVisor-class isolation. Plain containers share the host kernel.
  - No direct network access to anything: all traffic leaves through an allowlisting proxy
  - Products:
    - runtimes: Firecracker, gVisor, Kata Containers
    - sandbox services: E2B, Modal, Daytona
    - cloud-hosted: AWS Bedrock AgentCore Runtime, Azure Container Apps dynamic sessions, Cloudflare Sandbox SDK
    - local: Anthropic sandbox-runtime
    - egress: Cilium FQDN policies, Zscaler, Netskope, Prisma Access, Cloudflare Gateway
- No persistent memory. Persistent state is saved only through authorized tools to avoid memory poisoning.
  - Saved state carries provenance labels. State derived from untrusted content stays untrusted.
  - Agents that need memory get it from a governed memory service: labeled, reviewable and revocable.
  - Hard constraints live in the broker, not the context, because context compaction can drop them. In a [famous OpenClaw example](https://simonwillison.net/2026/Feb/23/summer-yue/), the agent lost "wait for approval" and deleted hundreds of emails.

### Rule Of Two / Trust Zones

Follow Meta's [Agents Rule of Two](https://ai.meta.com/blog/practical-ai-agent-security/): an agent may combine at most two of untrusted prompts, access to internal data, and network egress.

| Zone | Untrusted prompts | Internal data | Egress | Example |
|---|---|---|---|---|
| 1 External research | yes | **no** | yes | internet research |
| 2 Internal processing | yes | yes | **no** | internal processes |
| 3 Trusted production | **no** | yes | yes | IT-developed apps with prompt injection protection |
| Exception: all three | yes | yes | yes | split across zones, or human approval per action |

- **Zone 1:** any prompt, any egress, NO access to internal data. Example: internet research.
  - The task itself is internal data. A query about a name reveals the firm's interest, so keep theses, positions and sizes out. DLP should apply when pasting data into Zone 1. Dev in Zone 1 should use dummy or non-sensitive data.
  - Zone 1 output is untrusted when it enters another zone.
  - High-impact actions (posting, emailing, purchasing) still need escalation and approval.

- **Zone 2:** any prompt, any data, NO egress. Used for internal processes.
  - Egress is defined strictly: even read-only GETs and DNS lookups can exfiltrate.
  - Other channels to close:
    - Rendered markdown images
    - Link unfurling in Slack/Teams and URL previews
    - Package installs, webhooks and telemetry
    - Outbound email and tickets
    - Links shown to users
  - The model API call is itself egress. Allow only approved endpoints via the gateway under no-training, zero-retention terms, or use self-hosted or in-tenant models.
  - No consequential writes: output goes to a review queue or through narrow validated tools, because injected instructions can do damage without any egress.

- **Zone 3:** internal trusted data, any egress, NO untrusted prompts. Example: IT-developed apps with strict testing and monitoring and no untrusted user-submitted prompts.
  - Inputs are parameterized, not free text.
  - Even internal documents can contain injection. Input data handed to prompts must be trusted. Filters and scrubbing processes can fail.
  - Untrusted content can enter only through structural isolation: a quarantined LLM extracts typed fields that the privileged model consumes (dual-LLM pattern, CaMeL).

- "Any" means the leg is permitted, not unrestricted. Registry allowlists and gateway policy, human-in-the-loop escalation apply in every zone.
- Workflows that need all three legs are split into agents in different zones, with typed hand-offs or a human checkpoint between them.

### Tool Access And Dangerous Actions

- Resource access (data, tools, other agents) always goes through least-privilege tool calls, via gateways that limit dangerous actions.
  - Prefer narrow tools to general ones such as a shell, raw SQL or generic HTTP. Wrap coarse-grained APIs and MCP servers in narrow internal facades.
  - Products:
    - tool/MCP gateways: agentgateway, Kong, Docker MCP Gateway, IBM ContextForge, Obot, MintMCP, AWS AgentCore Gateway, Azure API Management
    - policy engines: OPA, Cedar, Cerbos, OpenFGA, SpiceDB
- No dangerous actions without human escalation.
  - "Dangerous" means: irreversible, high-value, external commitments, trades and wires, deletions, permission changes, communications to clients or regulators.
  - For low latency and operational efficiency, route through a cascade: deterministic allow/deny, then a conservative classifier, then a human. An approval granted nearly 100% of the time should become a rule.
  - Approval screens show the exact parameters from the broker, not the agent's description of them.
  - Highest-risk actions need two approvers plus invariants enforced in code. Example: an interest-only payment can't move principal.

## 6. Secrets: Key Vault {#secrets}

- No credentials are stored in code, config, prompts, the registry, logs or the sandbox.
- Allowed tools reach keys only by indirection through the key vault, based on registry entitlements.
- The indirection happens outside the sandbox: the egress proxy or tool gateway swaps a placeholder for the real credential, and only for allowlisted destinations.
- Rotate and revoke automatically or use dynamic per-run secrets.
- Scan for secrets in CI, logs and traces (GitGuardian, TruffleHog, GitHub secret scanning).
- Products:
  - vaults: HashiCorp Vault, Azure Key Vault, AWS Secrets Manager, GCP Secret Manager, CyberArk Conjur, Infisical
  - credential brokering: Aembit, AWS AgentCore Identity, Arcade

## 7. Logging And Audit {#logging}

- SIEM: log every security-relevant event and action (within reason) to immutable, tamper-resistant storage. Every tool call is recorded, and each event is attributable to:
  - the immediate agent
  - the registered caller at the top of the chain
  - the human owner
  - the invoking user (if not the owner)
  - or the full delegation chain
- Each event also records:
  - session ID and mission/intent ID
  - model and prompt version
  - the policy decision, with its rule ID
  - the approver
- Immutable storage: S3 Object Lock (compliance mode), Azure immutable blob storage.
- LLM observability integrated with the gateway.
  - OpenTelemetry GenAI semantic conventions; Langfuse, LangSmith, Arize Phoenix, Braintrust, Datadog LLM Observability.
- Log stores may hold some of the firm's most sensitive content, such as prompts containing MNPI or PII. Classify and access-control them to match, and redact secrets and PII at ingestion.
- Logged untrusted content stays untrusted downstream.
- Records: agent-generated business communications and advice-related records may fall under Rule 204-2. Route them to the comms archive (Global Relay, Smarsh, Theta Lake) and to surveillance (Behavox, SteelEye) where applicable.
- SIEM products: Microsoft Sentinel, Splunk, Google SecOps, CrowdStrike Falcon Next-Gen SIEM, Cortex XSIAM, Elastic.

## 8. Risk-Based Deployment Review And Gating {#deployment}

**Development and CI**
- Development happens only in sandboxed dev environments, on test, mocked, synthetic, masked or non-sensitive data. Synthetic and masked data: Tonic.ai, Gretel, K2view.
- Automated CI/CD tools check that the agent meets standards, including:
  - SAST/SCA (Semgrep, Snyk, Endor Labs, Socket)
  - Secret scanning
  - Policy-as-code checks of the registry manifest (OPA/Conftest), e.g., rejecting forbidden capability combinations
  - MCP server scanning (mcp-scan)
  - Eval quality gates (Promptfoo, Braintrust, DeepEval)

**Review and promotion**
- Deployment only on risk-based review for production access.
  - The tier is computed from registry-declared capabilities: tools, data labels, egress and autonomy. Low tiers self-serve; human review is reserved for high tiers.
  - Separation of duties: builders can't approve their own promotion. A named reviewer pool handles reviews per predetermined criteria.
- Rollout in stages for higher risk tiers: shadow mode, then canary, then full, with a rollback plan.
- Gate evidence: the complete registry entry, threat model, eval results against thresholds, red-team results for high tiers, and owner attestation.
- Reviewers should require reasonable code coverage, quality tests, and prompt evaluation.

**Testing**
- Automated tests cover known failure modes:
  - Prompt injection, e.g., white-on-white prompt payloads in submitted documents. Other injection vectors: tiny or zero-width text, and Unicode tag characters ("ASCII smuggling"); text in images and document metadata; spreadsheet comments, calendar invites, email and code comments; MCP tool descriptions (tool poisoning) and tool outputs; encoded payloads (base64, Morse code)
  - Non-injection failures: fabricated numbers, wrong-tenant retrieval, runaway loops, destructive commands.
  - Tools and corpora: AgentDojo, garak, PyRIT, Promptfoo red-team plugins.
  - Passing these tests does not prove safety. Architecture like Rule of Two is the primary control.
- Red teaming and adversarial testing: develop specific tests for every critical failure mode, for higher risk tiers.
  - A threat model per agent ([CSA MAESTRO](https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro) framework). Vendors: Mindgard, HiddenLayer, Lakera, Haize Labs.

**Supply chain**
- Packages are pinned and come from trusted repositories, with a delay (1-2 weeks) after release. See e.g. the [Shai-Hulud npm worm](https://unit42.paloaltonetworks.com/npm-supply-chain-attack/).
  - Terms and tools:
    - Dependency cooldown / minimum release age: pnpm and Renovate minimumReleaseAge, Dependabot cooldown, uv exclude-newer
    - Hash-pinned lockfiles
    - Curated package proxies: JFrog Curation, Sonatype Repository Firewall, Socket
    - SBOM/AIBOM
    - Signed builds: Sigstore, SLSA
  - Extend beyond packages:
    - MCP servers and skills: pin versions, and hash tool descriptions to catch "rug pulls"
    - Container images
    - Model weights: safetensors, not pickle
    - Prompt templates

**Re-review**
- Significant code changes trigger re-review.
  - So does any capability change (tools, data labels, egress, model, autonomy), detected by diffing the manifest and re-tiered automatically.
  - Prompt and model changes re-run evals automatically, with no committee.
- Periodic re-review brings agents up to current standards, keyed to approval expiry policy in the registry.

## 9. Runtime Oversight {#runtime}

**Gateways**
- All LLM calls go through an LLM gateway that logs appropriately and filters e.g. PII.
  - Enforce gateway use by blocking direct access to model APIs
  - PII filtering is a default per-agent policy set in the registry; blanket redaction can block legitimate tasks.
  - Full traces can be very large.
    - Always keep structured action logs and content hashes.
    - Keep full content for a rolling window, potentially always for highest tiers.
    - Configure verbosity with debug flags; large log entries in debug mode only.
- All tool calls go through a tool gateway. Sensitive tool calls may be filtered.
- Products:
  - gateways: LiteLLM, Portkey, Kong AI Gateway, Cloudflare AI Gateway, Azure API Management
  - PII detection: Microsoft Presidio, Nightfall

**Checks and monitoring**
- Perform automated integrity checks and anomaly detection.
- Deterministic pass/fail checks, tiered for operational efficiency: cheap tests pass quickly or escalate to more complex ones (a guardrail cascade by a supervisor agent).
- Risky, high-volume or anomalous tool calls get AI oversight that they are aligned with the agent's stated intent, again tiered from simple to complex.
  - Products: Meta LlamaFirewall (AlignmentCheck), Prisma AIRS, Zenity, Lasso, Lakera Guard, NVIDIA NeMo Guardrails.
  - Note that the monitor can be prompt-injected by the content it monitors. Give it the action, declared intent and provenance, not raw untrusted text, and use an independent model.

**Limits and kill switch**
- Rate limits; daily and monthly budgets.
  - Budgets halt the agent, not just alert. Set them per run, agent, user and cost center.
  - Per-downstream-resource limits. An agent making excessive requests can trigger a downstream IP or account ban.
  - Loop detection.
- Kill switch and protocols for invoking it.
  - Layers: revoke tokens, block egress, stop runtimes, disable the registry entry and schedules.
  - Anyone on call or automatic circuit breakers can trigger the kill switch. Drills should test it.

## 10. Shadow AI Discovery And Enforcement {#shadow-ai}

- Before implementing an agent platform, discover unregistered agents and AI use:
  - OAuth grants and browser extensions
  - personal API keys
  - low-code flows
  - AI traffic at egress
  - Products: Harmonic, Nudge, Reco, Microsoft Defender for Cloud Apps, Zenity.
- Offer an amnesty and a fast registration path
- Block unsanctioned AI endpoints at the SASE/egress layer.
- Test regularly that an unregistered agent can't get credentials or egress.

## 11. Vendor-Hosted And SaaS Agents {#vendor-agents}

- Copilot, Glean, ChatGPT Enterprise, Claude Enterprise, Agentforce and ServiceNow agents often run on vendor infrastructure, where sandboxing can't be applied directly.
- Controls:
  - Vendor risk review
  - Contract terms: no training on inputs, zero-day retention, breach notice, sub-processors
  - Configuration: connector scopes, sharing, who may create agents
  - Register each configured agent
  - Route tool access through firm-controlled connectors where possible
  - Ingest vendor audit logs into the SIEM
- AI features switched on inside existing SaaS products should trigger risk review.

## 12. Open-Ended Agents: Coding And Computer Use {#open-ended-agents}

- Claude Code, Codex, Cursor and similar tools can't declare scope up front, so they must be contained.
- Run them in dev containers or cloud dev environments (Coder, GitHub Codespaces, Microsoft Dev Box), not on desktops that hold production credentials.
- Push managed settings via MDM: permission deny rules, sandbox mode, network allowlists, hooks, and approved MCP servers only.
- Browser and computer-use agents run in an isolated browser profile or an enterprise browser (Island, Prisma Access Browser), without the user's broader signed-in sessions.

## 13. Models And Providers {#models}

- Keep an approved model list. Enterprise terms cover:
  - no training on inputs
  - zero or limited retention
  - named sub-processors
  - regional processing where required
- Pin model snapshots. Provider version changes and deprecations re-run evals and can trigger re-review. Models can also change without a version increment as providers fix bugs or pursue efficiencies.
- Zone 2 work that can't leave the firm uses self-hosted or in-tenant models (e.g., Bedrock, Vertex AI or Azure OpenAI over private endpoints).

## 14. Incident Response {#incident-response}

- Agent-specific runbooks:
  - Suspected injection
  - Data leakage
  - Runaway actions or cost
  - Compromised package or MCP server
  - Rogue delegation
- Forensics come from traces and mission IDs. Preserve evidence before rotating credentials.
- Notification obligations: Reg S-P customer notice (within 30 days), data-vendor contracts, counterparties.
- Every bug and incident should add a regression test. If a control failed, fix the control, not just the agent.

## 15. Decommissioning And Offboarding {#decommissioning}

- When an owner leaves or changes roles, reassign or disable their agents. No orphaned agents.
- Idle agents auto-demote or expire.
- Decommissioning revokes credentials, schedules and egress rules, and retains logs per policy.

## 16. Program Governance And Measurement {#program-governance}

- A named agent program owner and identified RACI (Responsible, Accountable, Consulted, Informed) across the CISO, compliance (CCO), platform/CTO and business owners.
- Exam readiness: be able to produce the inventory, policies, approvals and logs on request.
- Map controls to frameworks:
  - NIST AI RMF and its GenAI Profile (NIST AI 600-1)
  - ISO/IEC 42001
  - OWASP Top 10 for LLM Applications and for Agentic Applications
  - MITRE ATLAS
  - FINOS AI Governance Framework
- Metrics:
  - number of agents registered, tiered, put in production
  - unregistered agents found and brought under management
  - number of owners / devs
  - requests / tokens
  - policy denials (a control plane that never denies is just logging)
  - approval rate by action type (near 100% → make it a rule)
  - time to approve, by tier
  - incidents
  - cost per agent
  - eval pass rates

May all your agents be well-behaved!

But they won't be.

So, may your containers and guardrails hold!
