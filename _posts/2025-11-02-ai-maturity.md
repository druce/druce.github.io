---
id: 7152
title: 'An AI Maturity Framework'
date: 2025-11-02T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7152
permalink: /2025/11/ai-maturity
categories: AI
tags: AI

---
> _A 12-dimension assessment of your company's AI maturity and readiness, and a roadmap for developing an AI strategy_

<!--more-->

## How to think about AI now

### What is AI?

#### Ability Understand language (but everything is language)

- Search and retrieval with deep semantic understanding
- Create first draft of anything
- Especially coding
- And if you can code you can do anything a computer can do. Advanced agentic processes composing sequences of retrieving or sensing, creating, and acting

#### Everything is language (or at least everything a business can do/talk about)

A digression into epistomology:

[Eddington's ichthyologist](https://www.goodreads.com/quotes/9688420-selective-subjectivism-let-us-suppose-that-an-ichthyologist-is-exploring)

Tired:

- Biology is a subset of chemistry, the application of chemistry to living things
- Chemistry is a subset of physics, the application of physics to materials
- Physics is the application of mathematics to the natural world
- Mathematics is abstraction of everything

Math is our deepest abstraction, and also the formal foundation of computation. Checking proofs, which start from axioms and apply rules is something a Turing machine can do, as well as performing search to find new valid proofs. Gödel's incompleteness theorem is analogous to the halting problem of mathematics. The former says you can't write a program that will tell if any program stops without running it; the latter says there are mathematical conjectures that must be either true or false but are unprovable.

Wired:

- Information theory is everything you can represent with symbols and language
- Computer science is talking about computation and Turing machines and other simpler models of computation
- Mathematics is study of the set of Turing machines that represent proofs

Probably we should say the last 3 are all isomorphic and all fall under math, if you can't prove it, you can't know it.

The point is : everything knowable is expressed in language. If you do language, you can write any program and solve any solvable problem (eventually). As for everything which is not language:

Wovon man nicht sprechen kann, darüber muss man schweigen. - Ludwig Wittgenstein
(Whereof we cannot speak, we must attend in silence)

#### Pillars of AI strategy

- People - if you have a good AI team, they can implement everything below.

- Data - AI works on data. You want all your processes to generate clean data that AI can use for retrieval, creation, automation. Data engineering should provide data quality, timeliness, reliable availability, process observability, security, compliance, governance, discoverability, interoperability, scalability, lifecycle management, change control, cost control.

- Tech foundations: ability to reliably scale AI processes with security, robustness, business continuity, disaster recovery.

- Process: industrialize automation, software dev etc.


A good metaphor is infinite interns, but possibly stoner interns and occasionally disobedient rogue interns.

#### Pitfalls to avoid

- IP and data protection

- Reputational / regulatory risk

- All security concerns amplified - a power multiplier for bad actors, and for cyber defenders.

Also think of AI as an insider threat, those infinite stoner interns need to be limited in the what they can do (least privilege) and subject to multiple layers of checking for correctness and guardrails they aren't going rogue

In that context, here is a maturity model:

- Crawl: ad-hoc experimentation, assessment and planning
- Walk: foundation-building; structured experimentation, enterprise assistants, coordinated pilots, governance, training
- Run: Operational scaling: production deployments across business functions; Dedicated teams and centers of excellence; automated pipelines and MLOps; continuous monitoring of measurable benefits against KPIs; human-in-the-loop automation
- Fly: AI-native organization: AI institutionalized embedded in culture and strategy; continuous self-optimization; autonomous agents handling end-to-end processes; advanced use cases


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
    .subtitle {
        text-align: center;
        color: #718096;
        margin-bottom: 30px;
        font-size: 1.1em;
    }
    .chart-container {
        position: relative;
        height: 700px;
        margin: 30px auto;
    }
    .slider-container {
        margin: 40px 0;
        padding: 30px;
        background: #f7fafc;
        border-radius: 12px;
    }
    .slider-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }
    .slider-label {
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 8px;
        font-size: 1.1em;
        text-align: center;
    }
    input[type="range"] {
        width: 80%;
        max-width: 500px;
        height: 8px;
        border-radius: 5px;
        background: #e2e8f0;
        outline: none;
        -webkit-appearance: none;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    input[type="range"]::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .value-display {
        margin-top: 8px;
        font-size: 1em;
        color: #4a5568;
        font-weight: 600;
    }
    .maturity-questions {
        margin-top: 25px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        border-left: 4px solid #667eea;
    }
    .maturity-level-section {
        margin: 15px 0;
        padding: 15px;
        background: #edf2f7;
        border-radius: 6px;
    }
    .maturity-level-section h4 {
        margin: 0 0 10px 0;
        color: #2d3748;
        font-size: 1em;
    }
    .maturity-level-section p {
        margin: 5px 0;
        color: #4a5568;
        line-height: 1.6;
    }
    .level-1-section h4 { color: #e53e3e; }
    .level-2-section h4 { color: #dd6b20; }
    .level-3-section h4 { color: #38a169; }
    .level-4-section h4 { color: #3182ce; }
    .maturity-levels {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin: 20px 0;
        padding: 15px;
        background: #edf2f7;
        border-radius: 8px;
    }
    .maturity-level {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: #2d3748;
    }
    .level-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    .level-1 { background: #fc8181; }
    .level-2 { background: #f6ad55; }
    .level-3 { background: #68d391; }
    .level-4 { background: #4299e1; }
    .buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin: 30px 0;
    }
    button {
        padding: 12px 24px;
        font-size: 1em;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .reset-btn {
        background: #e53e3e;
        color: white;
    }
    .reset-btn:hover {
        background: #c53030;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .sample-btn {
        background: #48bb78;
        color: white;
    }
    .sample-btn:hover {
        background: #38a169;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
</style>

<div class="container">
    <div class="maturity-levels">
        <div class="maturity-level">
            <div class="level-indicator level-1"></div>
            <span>Level 1: Crawl</span>
        </div>
        <div class="maturity-level">
            <div class="level-indicator level-2"></div>
            <span>Level 2: Walk</span>
        </div>
        <div class="maturity-level">
            <div class="level-indicator level-3"></div>
            <span>Level 3: Run</span>
        </div>
        <div class="maturity-level">
            <div class="level-indicator level-4"></div>
            <span>Level 4: Fly</span>
        </div>
    </div>

    <div class="chart-container">
        <canvas id="radarChart"></canvas>
    </div>

    <div class="buttons">
        <button class="reset-btn" onclick="resetValues()">Reset All</button>
        <button class="sample-btn" onclick="loadSample()">Load Sample Assessment</button>
    </div>

    <!-- Dimension 1: Strategic Vision & Leadership -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">1. Strategic Vision & Leadership</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider0" onchange="updateChart(0, this.value)">
            <div class="value-display" id="value0">Level 1: Crawl</div>
        </div>

        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are individual employees experimenting with AI tools on their own initiative?</p>
<p>&bull; Has leadership acknowledged AI as a topic of interest or potential?</p>
<p>&bull; Are there ad-hoc discussions about AI in leadership meetings?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Has leadership defined formal AI objectives and priorities?</p>
<p>&bull; Is there a designated executive sponsor or AI steering committee?</p>
<p>&bull; Has the organization allocated budget specifically for AI initiatives?</p>
<p>&bull; Are AI goals included in strategic planning documents?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Does leadership have a comprehensive AI strategy with clear ROI targets?</p>
<p>&bull; Are AI objectives integrated into departmental and individual performance goals?</p>
<p>&bull; Is there regular executive review of AI initiative progress and outcomes?</p>
<p>&bull; Has leadership championed organization-wide AI adoption?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Does the board regularly review AI strategy and competitive positioning?</p>
<p>&bull; Are AI capabilities central to the organization's competitive advantage?</p>
<p>&bull; Is there a Chief AI Officer or equivalent C-level position?</p>
<p>&bull; Does leadership actively shape industry AI standards and best practices?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 2: Data Engineering & Quality -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">2. Data Engineering & Data Quality</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider1" onchange="updateChart(1, this.value)">
            <div class="value-display" id="value1">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are employees using publicly available or manually gathered data?</p>
<p>&bull; Is data primarily stored in siloed spreadsheets or local files?</p>
<p>&bull; Is data quality managed informally or ad-hoc?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Is there a centralized data warehouse or lake?</p>
<p>&bull; Are data quality standards documented and monitored?</p>
<p>&bull; Is data lineage tracked for critical datasets?</p>
<p>&bull; Are there established data governance policies?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Is real-time or near-real-time data available for AI applications?</p>
<p>&bull; Are data pipelines automated with monitoring and alerting?</p>
<p>&bull; Is metadata comprehensively managed across all data assets?</p>
<p>&bull; Are data quality metrics consistently above 95% for critical datasets?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Do automated systems continuously validate and improve data quality?</p>
<p>&bull; Is synthetic data generation used to augment training datasets?</p>
<p>&bull; Are data pipelines self-healing with automatic anomaly detection?</p>
<p>&bull; Is data provenance fully tracked with automated compliance verification?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 3: Technology Platforms & Infrastructure -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">3. Technology Platforms & Infrastructure</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider2" onchange="updateChart(2, this.value)">
            <div class="value-display" id="value2">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are employees using consumer-grade AI tools (ChatGPT, Claude, etc.)?</p>
<p>&bull; Is AI experimentation happening on personal devices or accounts?</p>
<p>&bull; Is there no formal AI infrastructure in place?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Has the organization deployed enterprise AI platforms (Microsoft Copilot, etc.)?</p>
<p>&bull; Is there secure API access to AI models for development teams?</p>
<p>&bull; Are development and production environments separated?</p>
<p>&bull; Is there basic version control for AI-related code?</p>

            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Is there a complete MLOps platform with CI/CD pipelines?</p>
<p>&bull; Are model training, testing, and deployment automated?</p>
<p>&bull; Is infrastructure scalable with cloud or hybrid capabilities?</p>
<p>&bull; Are there established sandboxes for experimentation?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Are AI agents deployed on auto-scaling infrastructure?</p>
<p>&bull; Is there a comprehensive AI orchestration platform managing multiple agents?</p>
<p>&bull; Are models automatically retrained based on performance degradation?</p>
<p>&bull; Is infrastructure self-optimizing for cost and performance?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 4: Controls, Monitoring, Observability -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">4. Controls, Monitoring, Observability</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider3" onchange="updateChart(3, this.value)">
            <div class="value-display" id="value3">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Is AI usage largely untracked or unmonitored?</p>
<p>&bull; Are there no formal logs of AI tool usage?</p>
<p>&bull; Is success measured anecdotally if at all?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Are basic usage metrics collected (number of queries, users, etc.)?</p>
<p>&bull; Is there logging of AI system inputs and outputs?</p>
<p>&bull; Are cost and performance metrics tracked in dashboards?</p>
<p>&bull; Are there alerts for system failures or anomalies?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Is model performance continuously monitored against KPIs?</p>
<p>&bull; Are comprehensive audit trails maintained for compliance?</p>
<p>&bull; Is there real-time monitoring of model drift and data quality?</p>
<p>&bull; Are user satisfaction and business impact metrics tracked?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Do monitoring systems automatically trigger remediation actions?</p>
<p>&bull; Is there predictive alerting based on trend analysis?</p>
<p>&bull; Are agents self-monitoring with automatic performance optimization?</p>
<p>&bull; Is there comprehensive observability across the entire AI agent ecosystem?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 5: Governance -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">5. Governance</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider4" onchange="updateChart(4, this.value)">
            <div class="value-display" id="value4">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are there no formal AI usage policies or guidelines?</p>
<p>&bull; Is risk management for AI informal or non-existent?</p>
<p>&bull; Are employees unaware of potential AI-related risks?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Are acceptable use policies documented and communicated?</p>
<p>&bull; Is there a risk assessment framework for AI projects?</p>
<p>&bull; Are there approval processes for new AI initiatives?</p>
<p>&bull; Is regulatory compliance reviewed for AI applications?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Is there a formal AI governance board with regular meetings?</p>
<p>&bull; Are all AI projects subject to ethical review and risk assessment?</p>
<p>&bull; Is IP protection systematically managed for AI-generated content?</p>
<p>&bull; Are third-party AI vendors assessed for compliance and risk?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Are governance policies automatically enforced through technical controls?</p>
<p>&bull; Is there continuous compliance monitoring with automated reporting?</p>
<p>&bull; Does the organization contribute to industry AI governance standards?</p>
<p>&bull; Are AI agents subject to automated ethical guardrails and override mechanisms?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 6: Security and Threat Management -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">6. Security and Threat Management</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider5" onchange="updateChart(5, this.value)">
            <div class="value-display" id="value5">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are employees potentially sharing sensitive data with public AI tools?</p>
<p>&bull; Is there no awareness of AI-specific security threats?</p>
<p>&bull; Are AI tools used without security review?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Are prompt injection and data leakage risks understood and documented?</p>
<p>&bull; Is sensitive data prohibited from being shared with external AI tools?</p>
<p>&bull; Are enterprise AI tools deployed with security configurations?</p>
<p>&bull; Is there basic training on AI security risks?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Are AI assistants deployed with comprehensive security controls?</p>
<p>&bull; Is there continuous monitoring for AI-specific attack vectors?</p>
<p>&bull; Are security assessments mandatory for all AI implementations?</p>
<p>&bull; Is AI being used to enhance cybersecurity capabilities?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Do AI agents operate within zero-trust security architectures?</p>
<p>&bull; Are AI-powered security tools autonomously detecting and responding to threats?</p>
<p>&bull; Is there real-time threat intelligence specifically for AI systems?</p>
<p>&bull; Are agents secured with hardware-based trust and attestation?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 7: Teams, Talent, Organizational Design -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">7. Teams, Talent, Organizational Design</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider6" onchange="updateChart(6, this.value)">
            <div class="value-display" id="value6">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are individuals using AI tools without coordination?</p>
<p>&bull; Is there no dedicated AI talent or roles?</p>
<p>&bull; Is AI expertise limited to a few enthusiasts?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Has the organization hired or designated AI specialists?</p>
<p>&bull; Are there cross-functional AI working groups that meet regularly?</p>
<p>&bull; Is there a forum for sharing AI knowledge and use cases?</p>
<p>&bull; Are job descriptions updated to include AI-related responsibilities?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Is there a dedicated AI team or center of excellence?</p>
<p>&bull; Are AI champions embedded across business units?</p>
<p>&bull; Is there a clear career path for AI roles?</p>
<p>&bull; Are retention strategies in place for AI talent?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Is AI expertise distributed throughout the organization?</p>
<p>&bull; Are teams structured around AI agent development and orchestration?</p>
<p>&bull; Is there a talent pipeline through academic partnerships and internships?</p>
<p>&bull; Does organizational design facilitate rapid AI innovation and deployment?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 8: Training and Education -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">8. Training and Education</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider7" onchange="updateChart(7, this.value)">
            <div class="value-display" id="value7">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Is AI training limited to individual self-learning?</p>
<p>&bull; Are employees discovering AI tools on their own?</p>
<p>&bull; Is there no formal AI education program?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Is there firm-wide AI literacy training for all employees?</p>
<p>&bull; Are role-specific AI training programs developed?</p>
<p>&bull; Is there documentation of AI best practices and guidelines?</p>
<p>&bull; Are employees aware of available enterprise AI tools?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Is there continuous learning with regular AI training updates?</p>
<p>&bull; Are employees certified in AI tool usage for their roles?</p>
<p>&bull; Is there a knowledge management system for AI practices?</p>
<p>&bull; Are advanced courses available for power users and developers?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Are external certifications and advanced degrees supported?</p>
<p>&bull; Is there a formal AI academy or university partnership?</p>
<p>&bull; Do employees contribute to AI research and publications?</p>
<p>&bull; Is training personalized based on role, skill level, and usage patterns?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 9: Use Cases -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">9. Use Cases</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider8" onchange="updateChart(8, this.value)">
            <div class="value-display" id="value8">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are AI applications limited to personal productivity?</p>
<p>&bull; Is AI use opportunistic without clear business objectives?</p>
<p>&bull; Are success metrics undefined or not tracked?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Are use cases identified and prioritized by business function?</p>
<p>&bull; Is there a documented methodology for selecting AI projects?</p>
<p>&bull; Are pilot projects launched with defined success criteria?</p>
<p>&bull; Is ROI tracked for AI initiatives?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Are AI assistants deployed across multiple business functions?</p>
<p>&bull; Is there a portfolio approach to managing AI projects?</p>
<p>&bull; Are use cases regularly evaluated and optimized?</p>
<p>&bull; Is learning from projects systematically captured and applied?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Are autonomous agents handling end-to-end business processes?</p>
<p>&bull; Is there continuous identification of new automation opportunities?</p>
<p>&bull; Are agents self-optimizing based on performance data?</p>
<p>&bull; Is AI integrated into every major business function with measurable impact?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 10: Analytics, AI Development & MLOps -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">10. Analytics, AI Development & MLOps</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider9" onchange="updateChart(9, this.value)">
            <div class="value-display" id="value9">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Is analytics limited to using pre-built AI tools?</p>
<p>&bull; Is there no custom AI model development?</p>
<p>&bull; Are capabilities limited to prompting existing models?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Are analytics teams experimenting with model fine-tuning?</p>
<p>&bull; Is there basic prompt engineering and RAG implementation?</p>
<p>&bull; Are pre-built models integrated into business applications?</p>
<p>&bull; Is there a development environment for AI experimentation?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Are custom models developed and deployed for specific use cases?</p>
<p>&bull; Is there a complete MLOps pipeline from development to production?</p>
<p>&bull; Are A/B testing and champion/challenger models implemented?</p>
<p>&bull; Is model performance continuously evaluated and improved?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Are AI agents autonomously developing and deploying models?</p>
<p>&bull; Is there automated feature engineering and model selection?</p>
<p>&bull; Do systems automatically optimize across multiple objectives?</p>
<p>&bull; Is there a self-improving AI development pipeline?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 11: External Partnerships -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">11. External Partnerships</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider10" onchange="updateChart(10, this.value)">
            <div class="value-display" id="value10">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are vendor relationships limited to consumer SaaS subscriptions?</p>
<p>&bull; Is there no formal engagement with AI vendors or partners?</p>
<p>&bull; Is external AI expertise not being leveraged?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Are enterprise agreements established with major AI providers?</p>
<p>&bull; Is the organization participating in industry AI forums?</p>
<p>&bull; Are consultants or implementation partners engaged for specific projects?</p>
<p>&bull; Is there evaluation of specialized AI vendors by use case?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Are strategic partnerships established with key technology providers?</p>
<p>&bull; Is the organization involved in industry consortia and working groups?</p>
<p>&bull; Are academic partnerships in place for research collaboration?</p>
<p>&bull; Are data partnerships established to enhance AI capabilities?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Is the organization co-developing AI solutions with partners?</p>
<p>&bull; Are there joint ventures or investments in AI startups?</p>
<p>&bull; Does the organization influence partner roadmaps and standards?</p>
<p>&bull; Is there an ecosystem of partners supporting the AI agent infrastructure?</p>
            </div>
        </div>
    </div>

    <!-- Dimension 12: Process Implementation -->
    <div class="slider-container">
        <div class="slider-group">
            <div class="slider-label">12. Process Implementation</div>
            <input type="range" min="1" max="4" value="1" step="1"
                   id="slider11" onchange="updateChart(11, this.value)">
            <div class="value-display" id="value11">Level 1: Crawl</div>
        </div>
        <div class="maturity-questions">
            <div class="maturity-level-section level-1-section">
                <h4>Level 1: Crawl</h4>
<p>&bull; Are AI tools used informally without process integration?</p>
<p>&bull; Are workflows unchanged despite AI availability?</p>
<p>&bull; Is there no documentation of how AI fits into processes?</p>
            </div>
            <div class="maturity-level-section level-2-section">
                <h4>Level 2: Walk</h4>
<p>&bull; Are business workflows documented to identify AI opportunities?</p>
<p>&bull; Is there a change management process for AI implementations?</p>
<p>&bull; Are employees trained on new AI-enhanced processes?</p>
<p>&bull; Are processes updated to incorporate enterprise AI tools?</p>
            </div>
            <div class="maturity-level-section level-3-section">
                <h4>Level 3: Run</h4>
<p>&bull; Are workflows optimized around AI assistant capabilities?</p>
<p>&bull; Is there continuous process improvement driven by AI insights?</p>
<p>&bull; Are standard operating procedures consistently followed?</p>
<p>&bull; Is change management sophisticated with user adoption tracking?</p>
            </div>
            <div class="maturity-level-section level-4-section">
                <h4>Level 4: Fly</h4>
<p>&bull; Are processes fully automated with AI agents handling exceptions?</p>
<p>&bull; Is there dynamic process optimization based on real-time data?</p>
<p>&bull; Are agents autonomously improving workflows?</p>
<p>&bull; Is the organization constantly innovating processes using AI capabilities?</p>
            </div>
        </div>
    </div>
</div>

<script>
    const dimensions = [
        { id: 1, short: "Strategic Vision", full: "Strategic Vision & Leadership" },
        { id: 2, short: "Data Engineering", full: "Data Engineering & Quality" },
        { id: 3, short: "Technology Platforms", full: "Technology Platforms & Infrastructure" },
        { id: 4, short: "Controls & Monitoring", full: "Controls, Monitoring, Observability" },
        { id: 5, short: "Governance", full: "Governance" },
        { id: 6, short: "Security", full: "Security and Threat Management" },
        { id: 7, short: "Teams & Talent", full: "Teams, Talent, Organizational Design" },
        { id: 8, short: "Training & Education", full: "Training and Education" },
        { id: 9, short: "Use Cases", full: "Use Cases" },
        { id: 10, short: "Analytics & MLOps", full: "Analytics, AI Development & MLOps" },
        { id: 11, short: "External Partnerships", full: "External Partnerships" },
        { id: 12, short: "Process Implementation", full: "Process Implementation" }
    ];

    const maturityLevels = ["Crawl", "Walk", "Run", "Fly"];
    let chartData = new Array(12).fill(1);

    // Create chart
    const ctx = document.getElementById('radarChart').getContext('2d');
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dimensions.map(d => `${d.id}. ${d.short}`),
            datasets: [{
                label: 'Maturity Level',
                data: chartData,
                fill: true,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 4,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return value === 0 ? '' : `L${value}`;
                        },
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        color: '#2d3748'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const level = context.parsed.r;
                            return `${dimensions[context.dataIndex].full}: Level ${level} (${maturityLevels[level-1]})`;
                        }
                    }
                }
            }
        }
    });

    function updateChart(index, value) {
        chartData[index] = parseInt(value);
        radarChart.data.datasets[0].data = chartData;
        radarChart.update();
        document.getElementById(`value${index}`).textContent =
            `Level ${value}: ${maturityLevels[value-1]}`;
    }

    function resetValues() {
        chartData = new Array(12).fill(1);
        radarChart.data.datasets[0].data = chartData;
        radarChart.update();
        dimensions.forEach((_, index) => {
            document.getElementById(`slider${index}`).value = 1;
            document.getElementById(`value${index}`).textContent = 'Level 1: Crawl';
        });
    }

    function loadSample() {
        const sampleData = [3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2];
        chartData = sampleData;
        radarChart.data.datasets[0].data = chartData;
        radarChart.update();
        dimensions.forEach((_, index) => {
            document.getElementById(`slider${index}`).value = sampleData[index];
            document.getElementById(`value${index}`).textContent =
                `Level ${sampleData[index]}: ${maturityLevels[sampleData[index]-1]}`;
        });
    }
</script>
