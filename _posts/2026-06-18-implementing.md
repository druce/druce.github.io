---
id: 7159
title: 'Implementing Enterprise AI in 2026: Objectives, Constraints, Principles to Consider'
date: 2026-06-19T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7159
permalink: /2026/04/ai-implementation
categories: AI
tags: AI, tech
image: /assets/2026/ai-trading.png
mathjax: false
mermaid: false
description: 'Implementing Enterprise AI in 2026: Objectives, Constraints, and Principles to Consider'
---
<figure>
<picture>
  <source srcset="/assets/2026/justice2.png" type="image/png">
  <img src="/assets/2026/justice2.png" alt="illustration: robot justice" fetchpriority="high" style="width: 100%; height: auto;">
</picture>
  <figcaption>Justice balancing speed and safety</figcaption>
</figure>
> _A [previous post]({% post_url 2025-11-02-ai-maturity %}) laid out a maturity framework for assessing how far along an organization is on its AI journey. As you proceed along the implementation journey through the stages of crawl, walk, run fly, what are you optimizing for, and what should you never lose sight of along the way?_
>
> _Here are lists of **objectives** to maximize, the **constraints** or **invariants** that must always hold, and the **operating principles** for resolving the inevitable tension between objectives. Consider it a starting inventory concerns to revisit at every milestone, from POC to full production._

<!--more-->

# Strategic AI Objectives - Maximize:

## Universal Knowledge Access

- Apply AI to any authorized data source
- Permission-aware RAG search to find anything with semantic understanding
- Create and maintain searchable institutional memory
- Reduce time-to-information
- Eliminate knowledge silos
- Make expertise available independent of organizational hierarchy

## Universal Content Creation

- First draft of anything (reports, decks, spreadsheets, code)
- Increase quality and consistency of communication
- Scale expert output without scaling headcount

## Universal Automation

- Automate any repeatable process
- Convert workflows into reusable agents
- Reduce human effort on low-value activities
- Shift labor toward judgment, creativity, and relationship management

## Software & Technical Velocity

- Accelerate coding and software delivery
- Reduce time from idea to production and increase experimentation velocity
- Improve software quality and maintainability
- Increase infrastructure and CI/CD automation

## Human Amplification

- Make every employee more effective
- Compress learning curves
- Increase decision quality
- Increase individual leverage
- Scale expertise beyond the original expert
- Turn average performers into good performers and good performers into exceptional performers

## Resilience

- Detect problems early and spike resources when there is an issue
- Reduce institutional memory loss and key-person risk
- Improve business continuity and recovery from disruption

## Business Agility

- Shorten decision cycles and increase organizational responsiveness
- Improve execution speed and adapt more rapidly to changing markets
- Reduce coordination overhead
- Build value and durable competitive differentiation


# Constraints - Always ensure:

## Legal & Regulatory Compliance

- Compliance with all applicable laws and regulations - no violations
- Regulatory and business reporting remains accurate and timely

## Security

- Sensitive data protected at all times: IP, MNPI, PII, client information
- Strong authentication and identity controls; all actions logged and attributable to a properly verified identity
- Least-privilege access enforced for humans and agents
- Data usage respects permissions, ownership, and retention requirements

## Observability and accountability

- AI usage and actions are traceable
- Decisions are explainable
- Required records are retained and discoverable
- Humans remain accountable for outcomes; material decisions have a designated owner
- Processes are designed to provide human-in-the-loop approvals for high-stakes actions, with soft guardrails as well as hard, bulletproof prevention of undesirable actions

## Reliability

- Critical services meet defined availability objectives
- Single points of failure are minimized
- Critical processes have checks and fallback mechanisms, are designed to degrade gracefully and avoid cascading failures
- Recovery procedures exist and are tested

## Model Risk

- AI outputs are evaluated under realistic conditions before deployment
- Model drift is expected and degradation is continuously monitored and evaluated in production
- High-risk use cases receive additional controls

## Governance

- Ownership exists for systems, data, and agents
- Policies are documented; exceptions are approved and tracked; controls are periodically reviewed
- Governance remains proportional to risk
- Cost controls and limits exist so risk-adjusted return remains positive
- All project deployments are gated to ensure they appropriately manage risk and measure return

## Reputation

- AI use must not damage trust
- External communications remain accurate
- Customers, team members and external partners are treated equitably
- AI behavior remains aligned with organizational values



# Operating Principles (how to balance objectives when they conflict)

- **Measure everything**: Usage, cost, performance, quality, risk, and business outcomes must be observable for data-driven decision-making.

- **Safety over autonomy**: AI autonomy increases only when evidence demonstrates acceptable risk.

- **Governance proportional to risk**: All deployments must follow checklists to ensure fitness and minimize risk; more control for high-risk use cases, less control for low-risk use cases.

- **Human review proportional to impact**: The greater the consequence, the greater the required oversight.

- **Automate the control environment**: Compliance by default: Controls should be embedded in systems rather than dependent on user behavior.

- **Continuous improvement**: Every workflow, agent, model, and policy is subject to ongoing evaluation and optimization.

- **Buy before build**: Commodity capabilities should generally be purchased; differentiation should be built.

- **Data gravity wins**: Move models to data, do not duplicate or move sensitive data unnecessarily.

- **Humans focus on judgment**: Machines handle scale and repetition; humans handle accountability, ethics, relationships, and strategic decisions.

