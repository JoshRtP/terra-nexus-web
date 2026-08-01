---
type: Content Audit
title: Service Architecture Audit
description: >
  Audit of every offering and sub-offering in the approved Terra Nexus service
  architecture. Source wording is preserved unchanged. Normalized proposed names
  and descriptions are agent-draft and require owner approval before use on the
  website. Do not modify the source-document mirror.
tags:
- audit
- services
- content-review
- phase-1a
status: draft
generated:
  by: github-copilot/claude-sonnet-4-6
  at: '2026-08-01T00:00:00Z'
sources:
- id: service-architecture
  resource: /references/source-documents/service-architecture.md
  title: Terra Nexus Service Architecture
  author: human:terra-nexus-owner
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
---

# Service Architecture Audit

> **Layer 1 (reference):** Source wording is reproduced verbatim from
> `references/source-documents/service-architecture.md`. It has not been changed.
>
> **Layer 2 (normalized):** Proposed names and descriptions are [agent-draft]
> and require owner review before use on the website.
>
> **Layer 3 (recommendations):** Agent recommendations are clearly labeled.
>
> Recommendation codes:
> - **retain** — Use source wording as-is
> - **retain-with-update** — Keep offering; propose minor wording or framing change
> - **merge** — Combine with another offering on the website
> - **move** — Belongs in a different service family
> - **internal-only** — Should not appear on the public website
> - **remove-from-public** — Too generic or out of scope for public site
> - **owner-decision** — Cannot proceed without owner clarification

---

## Strategy & Innovation

### S&I-1: Corporate & Business Unit Strategy

**Source number:** 1  
**Source family:** Strategy & Innovation  
**Source name:** Corporate & Business Unit Strategy  
**Source description:** "Establish the organization's overarching vision to achieve long-term objectives through strategic investments, resource allocation, supporting capabilities, and governance."

**Normalized proposed name:** Corporate & Business Unit Strategy [agent-draft]  
**Normalized proposed description:** [agent-draft] Support P&L owners, business unit leaders, and corporate strategy functions in defining strategic direction, allocating resources, and building the governance and capabilities to win at the intersection of food and climate.

**Decision owner:** P&L owners, business unit leaders, corporate strategy  
**Food-and-climate relevance:** Moderate — source wording is generic corporate strategy; needs food-and-climate qualifier on the website  
**Overlap with other services:** Some overlap with S&I-6 (Sustainability & Climate Change Strategy) when sustainability is the strategic driver  
**Overlap intentional?** Yes — S&I-6 is likely a sub-theme within this offering  
**Public website?** Yes — with food-and-climate framing  
**Internal only?** No  
**Grammar or terminology issues:** "Supporting capabilities" in the description is vague; could be clarified  
**Recommendation:** retain-with-update — add explicit food-and-climate framing to the website description  
**Approval status:** Needs owner decision (D-9)

---

**S&I-1.1: Vision and Mission Development**

**Source description:** "Define a winning aspiration by establishing clear, inspiring, and compelling purpose."  
**Food-and-climate relevance:** Low as stated — applies to any company. On the website, frame as food-and-climate vision and mission work.  
**Recommendation:** retain-with-update — add food-and-climate context  
**Approval status:** Needs owner decision (D-9)

**S&I-1.2: Business Portfolio Management**

**Source description:** "Manage and optimize the mix of business units for strategic alignment and performance."  
**Food-and-climate relevance:** Low as stated — generic portfolio management. Relevant when applied to food-and-climate business unit mix decisions.  
**Recommendation:** retain-with-update or internal-only — depends on whether owner wants to feature portfolio management on the public site  
**Approval status:** Owner decision required

**S&I-1.3: Resource Allocation & Prioritization**

**Source description:** "Allocate resources to align with business goals, support key initiatives, and maximize returns."  
**Food-and-climate relevance:** Low as stated  
**Recommendation:** internal-only — too generic for public-facing website unless framed around food-and-climate capital allocation  
**Approval status:** Owner decision required

**S&I-1.4: Supporting Capabilities**

**Source description:** "Strengthen the key capabilities needed to support strategic objectives and drive growth."  
**Food-and-climate relevance:** Very low as stated — generic management consulting language  
**Recommendation:** remove-from-public — too generic; capability building is implied by all other offerings  
**Approval status:** Owner decision required

**S&I-1.5: Corporate Governance and Compliance**

**Source description:** "Integrate management systems and governance structures to align strategy with company operations, facilitating effective execution."  
**Food-and-climate relevance:** Low as stated  
**Recommendation:** internal-only — governance and compliance work is often sensitive; generic framing unsuitable for public website  
**Approval status:** Owner decision required

---

### S&I-2: Market Entry & Competitive Strategy

**Source number:** 2  
**Source name:** Market Entry & Competitive Strategy  
**Source description:** "Develop strategies for entering new markets and positioning to win by evaluating the current competitive landscape, market potential, trends, and key competitive differentiators."

**Normalized proposed name:** Market Entry & Competitive Strategy [agent-draft]  
**Normalized proposed description:** [agent-draft] Help food and agribusiness leaders evaluate new markets, develop go-to-market strategies, and establish competitive positioning at the intersection of food and climate.

**Food-and-climate relevance:** High — market entry for food-and-climate is a core Terra Nexus strength  
**Recommendation:** retain-with-update — add explicit food-and-climate context to website description  
**Approval status:** Needs owner decision (D-9)

**S&I-2.1 Landscape Analysis** — retain  
**S&I-2.2 Entry Barrier Analysis** — retain  
**S&I-2.3 Go-to-Market Strategies** — retain  
**S&I-2.4 Market Positioning Strategies** — retain  
**S&I-2.5 Market Segmentation and Targeting** — retain  
**S&I-2.6 Targeted Brand Development** — retain-with-update: clarify this is for client products, not Terra Nexus's own brand  
**S&I-2.7 Pilot Projects & Commercialization Support** — retain; note overlap with S&I-5.7 (Rapid Prototyping & Testing)

---

### S&I-3: Business Model & Growth Strategy

**Source number:** 3  
**Source name:** Business Model & Growth Strategy  
**Source description:** "Create new innovating business models and strategies for sustainable growth."

**Normalized proposed name:** Business Model & Growth Strategy [agent-draft]  
**Normalized proposed description:** [agent-draft] Support food and agribusiness organizations in reinventing their models, developing new growth pathways, and commercializing food-and-climate opportunities.

**Food-and-climate relevance:** High when applied to food-and-climate growth models  
**Recommendation:** retain-with-update — add food-and-climate growth framing  
**Approval status:** Needs owner decision (D-9)

**S&I-3.1 Portfolio Management** — retain; note slight naming overlap with S&I-1.2  
**S&I-3.2 Business Model Innovation** — retain; this is a core Terra Nexus capability  
**S&I-3.3 Purpose Premiums & Pricing Optimization Models** — retain; directly relevant to food-and-climate product premiums  
**S&I-3.4 Digital Transformation** — owner-decision: generic digital transformation work may be out of scope for public site unless framed for food-and-climate context  
**S&I-3.5 Strategic Capability Building** — owner-decision: generic; consider whether to feature publicly  
**S&I-3.6 Inorganic Growth** — retain: M&A and partnership work is relevant for food-and-climate players

---

### S&I-4: Customer Experience

**Source number:** 4  
**Source name:** Customer Experience  
**Source description:** "Build a customer-centric ecosystem to better understand, engage, attract, and retain customers."

**Food-and-climate relevance:** Moderate — consumer research and segmentation for food sustainability products is relevant; pure CX/CRM work is less so  
**Recommendation:** retain-with-update — frame for food-and-climate customer strategy rather than generic CX  
**Grammar issues:** "Attract, and retain" — minor comma placement  
**Approval status:** Needs owner decision (D-9)

**S&I-4.1 Consumer Research** — retain: food consumer research for sustainability positioning is core  
**S&I-4.2 Segmentation & Targeting** — retain  
**S&I-4.3 Voice of Customer (VoC)** — retain-with-update: confirm this is offered as a standalone service  
**S&I-4.4 Customer Journey Mapping** — retain  
**S&I-4.5 Market Basket Analysis** — owner-decision: very specific retail analytics capability; confirm if offered  
**S&I-4.6 Personalization & Key Buying Criteria** — retain  
**S&I-4.7 Channel Integration** — owner-decision: confirm scope and applicability  
**S&I-4.8 Loyalty Programs and CRM Strategies** — owner-decision: generic CRM work may be out of food-and-climate scope for public site

---

### S&I-5: Product, Innovation, & Design

**Source number:** 5  
**Source name:** Product, Innovation, & Design  
**Source description:** "Develop innovative new products, services, or processes, while enhancing existing offerings."

**Normalized proposed name:** Product, Innovation, & Design [agent-draft]  
**Normalized proposed description:** [agent-draft] Help food and agribusiness organizations design and commercialize new products, services, and processes that create value at the intersection of food and climate.

**Food-and-climate relevance:** High — product innovation for sustainable food is a core theme  
**Recommendation:** retain-with-update — add food-and-climate framing  
**Approval status:** Needs owner decision (D-9)

**S&I-5.1 Innovation Process & Roadmap Development** — retain  
**S&I-5.2 Open Innovation and Collaboration** — retain  
**S&I-5.3 Design Thinking** — retain  
**S&I-5.4 Empathy Mapping and Persona Development** — retain  
**S&I-5.5 Ideation and Concept Development** — retain  
**S&I-5.6 New Product Development** — retain; note overlap with CS-4.4  
**S&I-5.7 Rapid Prototyping & Testing** — retain; note overlap with S&I-2.7  
**S&I-5.8 Certifications & Claims** — retain-with-update: distinguish this from the Impact Verification & Claims Translation offering in C&ES; this version focuses on product claims and certifications

---

### S&I-6: Sustainability & Climate Change Strategy

**Source number:** 6  
**Source name:** Sustainability & Climate Change Strategy  
**Source description:** "Develop long-term strategies to reduce environmental impact and ensure sustainable business practices."

**Food-and-climate relevance:** High — but source description is very generic  
**Overlap with other services:** Overlaps with Corporate Sustainability (CS-1) when owned by the CSO; belongs here when owned by strategy/commercial functions  
**Overlap intentional?** Yes — different decision owners  
**Sub-offerings:** None listed in source document — this is a gap  
**Recommendation:** retain-with-update — add food-and-climate framing; request owner input on sub-offerings  
**Approval status:** Needs owner input on sub-offering structure

---

## Financial Investments & New Venture Development

### FI-1: Financial Planning and Analysis

**Source number:** 1  
**Source family:** Financial Investments & New Venture Development  
**Source description:** "Implement strategic financial planning and analysis to guide budgeting, optimize profitability, and manage cash flow effectively."

**Food-and-climate relevance:** Low as stated — generic FP&A. Relevant when supporting food-and-climate investment decisions.  
**Recommendation:** retain-with-update — frame explicitly as FP&A supporting food-and-climate investment cases and program economics  
**Approval status:** Needs owner decision (D-9)

**FI-1.1 Budgeting and Forecasting** — retain-with-update (food-and-climate framing)  
**FI-1.2 Profitability Analysis** — retain-with-update  
**FI-1.3 Cash Flow Management** — owner-decision: generic; confirm public website scope

---

### FI-2: Business Case & Initiative Prioritization

**Source description:** "Evaluate and prioritize business initiatives and investments based on strategic value and potential returns."

**Food-and-climate relevance:** High — business case development for food-and-climate initiatives is a core offering  
**Recommendation:** retain-with-update — add food-and-climate framing  
**Approval status:** Needs owner decision (D-9)

**FI-2.1 Project Investment & Deal Structuring** — retain  
**FI-2.2 Investment Diversification** — retain-with-update: frame for food-and-climate portfolio diversification  
**FI-2.3 Asset Allocation Models** — retain-with-update: frame for food-and-climate asset allocation  
**FI-2.4 Return on Investment Analysis** — retain

---

### FI-3: Corporate Ventures

**Source description:** "Launch corporate venture initiatives for new markets, technologies, and strategic opportunities."

**Food-and-climate relevance:** High — CVC strategy for food-and-climate is a strong capability area  
**Recommendation:** retain-with-update — add food-and-climate framing  
**Approval status:** Needs owner decision (D-9)

**FI-3.1 Identifying Strategic Focus Areas** — retain  
**FI-3.2 Alignment with Corporate Strategy** — retain  
**FI-3.3 Market Trend Analysis** — retain  
**FI-3.4 Innovation Ecosystem Mapping** — retain; highly relevant for food-and-climate ecosystem intelligence  
**FI-3.5 CVC Strategy Development** — retain  
**FI-3.6 Designing CVC Fund Structures** — retain  
**FI-3.7 Portfolio Strategy and Investment Thesis** — retain

---

### FI-4: Investor Due Diligence

**Source description:** "Perform comprehensive due diligence on potential investments to assess financial, technical, and strategic fit."

**Food-and-climate relevance:** High — diligence for food-and-climate investments is a core service  
**Recommendation:** retain-with-update — add food-and-climate framing  
**Approval status:** Needs owner decision (D-9)

**FI-4.1 Identifying Investment Opportunities** — retain  
**FI-4.2 Financial, Technical, and Strategic Due Diligence** — retain  
**FI-4.3 Startup Valuation and Investment Terms** — retain; note "Startup" may be too narrow — confirm if applies to later-stage companies and assets

---

## Sustainable Supply Chain & Operations

### SSC-1: Digital Supply Chain Strategy

**Source description:** "Leverage digital technologies to enhance supply chain efficiency and responsiveness."

**Food-and-climate relevance:** High — traceability, visibility, and data tools are central to sustainable supply chains  
**Recommendation:** retain-with-update — clarify food-and-climate supply chain context; distinguish from generic IT strategy  
**Approval status:** Needs owner decision (D-9)

**SSC-1.1 Supply Chain Design and Optimization** — retain  
**SSC-1.2 Demand Planning and Forecasting** — retain-with-update: frame for sustainable supply chain context  
**SSC-1.3 Digital Analytics & Decision Support Solutions** — retain; supports transparency and traceability goals

---

### SSC-2: Value Chain Interventions (Influence-to-Impact)

**Source description:** "Create clear expectations for reducing environmental impact across the value chain."

**Food-and-climate relevance:** High — directly aligned with Terra Nexus's influence-to-impact positioning  
**Recommendation:** retain  
**Approval status:** No changes needed

**SSC-2.1 Spend & Impact Assessment** — retain  
**SSC-2.2 White Label Product Performance** — owner-decision: wording unclear; "white label product integration" does not obviously relate to supply chain sustainability; confirm intended meaning  
**SSC-2.3 Supplier Engagement Policies** — retain  
**SSC-2.4 Resilience & Contingency Planning** — retain  
**SSC-2.5 SC Vulnerability & Surety of Supply** — retain-with-update: "surety of supply" appears twice in source ("surety of supply"); use "security of supply" for clarity  
**SSC-2.6 ESG Performance Planning** — retain

---

### SSC-3: Responsible Sourcing & Procurement

**Source description:** "Increase resilience through ethical, sourcing and procurement practices."

**Grammar issue:** Comma after "ethical" appears to be erroneous ("ethical, sourcing and procurement" should read "ethical sourcing and procurement practices")  
**Food-and-climate relevance:** High  
**Recommendation:** retain-with-update — fix grammar; add food-and-climate sourcing context  
**Approval status:** Needs owner decision (D-9)

**SSC-3.1 Category Management** — retain  
**SSC-3.2 Supplier Evaluation and Selection** — retain  
**SSC-3.3 Contract Negotiation and Management** — owner-decision: general contract management may be out of scope for public website  
**SSC-3.4 Global Sourcing Strategies** — retain  
**SSC-3.5 Supplier Relationship Management (SRM)** — retain

---

### SSC-4: Resource Efficiency & Lean Operations (Operational Excellence)

**Source description:** "Maximize operational efficiency and minimize waste with lean principles."

**Food-and-climate relevance:** Moderate as stated — lean operations is core for food manufacturing; needs food-and-climate framing  
**Recommendation:** retain-with-update — frame for food and agribusiness operations; connect to emission and waste reduction outcomes  
**Approval status:** Needs owner decision (D-9)

**SSC-4.1 Lean Operations and Waste Reduction** — retain  
**SSC-4.2 Inventory Management** — owner-decision: general inventory management may be generic for public site  
**SSC-4.3 Process Improvement and Workflow Optimization** — owner-decision: generic; confirm scope  
**SSC-4.4 Total Quality Management (TQM)** — owner-decision: generic; confirm food-and-climate application  
**SSC-4.5 Cost Reduction & Value Engineering** — retain-with-update: frame for food-and-climate cost reduction linked to sustainability  
**SSC-4.6 Performance Benchmarking, Reporting, and KPIs** — retain

---

### SSC-5: Low Impact Logistics

**Source description:** "Design logistics solutions that minimize environmental impact and enhance sustainability."

**Food-and-climate relevance:** High — transport emissions are a significant Scope 3 category for food companies  
**Recommendation:** retain  
**Approval status:** No changes needed

**SSC-5.1 Network Design and Optimization** — retain  
**SSC-5.2 Transportation and Freight Management** — retain  
**SSC-5.3 Reverse Logistics and Returns Management** — retain-with-update: confirm relevance and scope for food supply chains

---

### SSC-6: Joint Business Planning & Supply Chain Collaboration

**Source description:** "Collaborate with supply chain partners for enhanced visibility, efficiency, and resilience."

**Food-and-climate relevance:** High — collaboration between food companies and their supply chains is a core Terra Nexus theme  
**Recommendation:** retain  
**Approval status:** No changes needed

**SSC-6.1 Joint Business Planning** — retain  
**SSC-6.2 SC Visibility & Tracking** — retain  
**SSC-6.3 Transparency and Traceability** — retain; directly tied to Terra Nexus purpose language  
**SSC-6.4 Smart Contracts & Blockchain for SCM** — owner-decision: "smart contracts and blockchain" terminology may be dated or too specific; confirm whether this should be "distributed ledger" or "digital contracting" or retained as-is  
**SSC-6.5 Collaboration Platforms** — retain

---

### SSC-7: Circular Economy, Waste, & Diversion

**Source description:** "Promote circular economy principles to reduce waste and foster sustainable material management."

**Food-and-climate relevance:** High — food waste and circular economy are core expertise topics  
**Recommendation:** retain  
**Approval status:** No changes needed

**SSC-7.1 Lifecycle Management** — retain  
**SSC-7.2 Diversion Optimization** — retain  
**SSC-7.3 Waste-to-Energy, Plastic Materials Recovery, & New Bi-Products** — retain-with-update: "Bi-Products" should be "By-Products" (spelling error in source; do not alter source document, fix only in normalized layer)

---

## Corporate Sustainability

### CS-1: Sustainability Strategy

**Source description:** "Align environmental and social impacts with business success by integrating sustainability into the core of corporate strategy and business operations."

**Food-and-climate relevance:** High  
**Overlap with S&I-6:** Yes — intentional; different decision owners (CSO vs. strategy/commercial)  
**Recommendation:** retain  
**Approval status:** No changes needed

**CS-1.1 Defining Corporate Ambition & Leadership** — retain  
**CS-1.2 Purpose-to-Profit Alignment** — retain; directly resonates with Terra Nexus brand language  
**CS-1.3 Materiality Assessment** — retain  
**CS-1.4 Performance Benchmarking & Best Practices** — retain  
**CS-1.5 Corporate Narrative & Comms Strategy** — retain-with-update: clarify this is for the client's sustainability narrative, not Terra Nexus's own  
**CS-1.6 Opportunity Identification & Analytics** — retain  
**CS-1.7 Goals, Targets, Commitments & Policies** — retain  
**CS-1.8 Operating Model & Governance** — retain  
**CS-1.9 Roadmap & Action Plans** — retain

---

### CS-2: Measurement, Impact, & Disclosure

**Source description:** "Quantify and report progress through transparent disclosure."

**Food-and-climate relevance:** High  
**Recommendation:** retain  
**Approval status:** No changes needed

**CS-2.1 Climate Risk, Adaptation & Resilience** — retain  
**CS-2.2 Risk Mgmt. & Mitigation Acceptance Testing** — retain-with-update: "Risk Mgmt." should be spelled out as "Risk Management" in normalized version; "Mitigation Acceptance Testing" is unusual phrasing — confirm intended meaning with owner  
**CS-2.3 Verified Emissions Reduction & Carbon Asset Procurement** — retain-with-update: note that carbon asset procurement in a Carbon & Ecosystem Services market context is owned by C&ES; this sub-offering may be correctly scoped to the CSO function managing carbon credit purchases for compliance/net-zero targets  
**CS-2.4 On-Demand Disclosure – 3rd Party Response as a Service** — retain; note this may be an Operate-model service  
**CS-2.5 Product and Services Footprinting** — retain; note overlap with C&ES Full Service GHG Accounting (different decision owner)  
**CS-2.6 Corporate Reporting** — retain

---

### CS-3: Stakeholder Engagement

**Source description:** "Engage internal and external stakeholder groups."

**Food-and-climate relevance:** Moderate as stated; high in context  
**Recommendation:** retain-with-update — add food-and-climate stakeholder context  
**Approval status:** Needs owner decision (D-9)

**CS-3.1 External Stakeholder & Ecosystem Engagement** — retain  
**CS-3.2 Internal Talent Engagement** — retain  
**CS-3.3 Leadership & Board Coaching** — retain; note this is an Advise-model service

---

### CS-4: Building Purpose Driven Products & Services

**Source description:** "Commercialize sustainable products and services."

**Food-and-climate relevance:** High — directly relevant to food brands and sustainability product launches  
**Overlap with S&I offerings:** Yes — intentional; CS-4 is owned by CSO when sustainability is the strategic driver; S&I equivalents are owned by P&L/commercial  
**Overlap intentional?** Yes — different decision owners  
**Recommendation:** retain  
**Approval status:** No changes needed

**CS-4.1 Market Entry & Competitive Strategy** — retain; note duplicate name with S&I-2; distinguish by decision owner in page copy  
**CS-4.2 New Game Business Models & Growth Opportunities** — retain  
**CS-4.3 Customer Discovery, Acquisition, Experience, Retention** — retain  
**CS-4.4 New Product Development** — retain; note overlap with S&I-5.6; distinguish by decision owner

---

### CS-5: Sustainable Supply Chain & Operations (within Corporate Sustainability)

**Source description:** "Reduce cost, and improve operational efficiencies by implementing sustainability in supply chain and operations."

**Overlap with SSC&O service family:** Yes — intentional; this version is sponsored by the CSO/ESG function  
**Overlap intentional?** Confirmed — see approved decision record and service-decision-owner-matrix  
**Recommendation:** retain; add clear decision-owner context in website copy  
**Approval status:** No changes needed

**CS-5.1 Value Chain Interventions** — retain; same as SSC-2; different decision owner  
**CS-5.2 Responsible Sourcing & Procurement** — retain; same as SSC-3; different decision owner  
**CS-5.3 Resource Efficiency & Lean Operations** — retain; same as SSC-4; different decision owner  
**CS-5.4 Joint Business Planning & Supply Chain Collaboration** — retain; same as SSC-6; different decision owner  
**CS-5.5 Low Impact Logistics** — retain; same as SSC-5; different decision owner  
**CS-5.6 Circular Economy, Waste, & Diversion** — retain; same as SSC-7; different decision owner

---

## Carbon & Ecosystem Services

All seven offering names are approved. Detailed descriptions are drafted in the individual offering files and are `status: draft`. See Section D-3 in the decision log.

| Offering | Status |
|---|---|
| VCM & Scope 3 Markets | Draft description created |
| Commercialization Pathways | Draft description created |
| Asset & Portfolio Valuation | Draft description created |
| Pilot Development & Partner Selection | Draft description created |
| Program Design & Operations | Draft description created |
| Impact Verification & Claims Translation | Draft description created |
| Full Service GHG Accounting | Draft description created |

---

## Summary of Items Requiring Owner Decisions

| Item | Issue | Recommendation |
|---|---|---|
| S&I sub-offerings 1.2–1.5 | Generic; may not belong on public website | Owner decides which to feature publicly |
| S&I-3.4 Digital Transformation | Generic IT work outside food-and-climate scope | Owner confirms scope |
| S&I-4.5 Market Basket Analysis | Specific retail analytics capability | Owner confirms if offered |
| S&I-4.8 Loyalty Programs and CRM | Generic CRM; out of food-and-climate scope | Owner decides |
| S&I-6 Sustainability & Climate Change Strategy | No sub-offerings listed | Owner provides sub-offering structure |
| FI-1.3 Cash Flow Management | Generic | Owner confirms public website scope |
| FI-4.3 "Startup" in valuation offering | May be too narrow | Owner confirms whether this applies to later-stage assets |
| SSC-2.2 White Label Product Performance | Unclear meaning | Owner clarifies intent |
| SSC-2.5 "Surety of supply" | Appears twice; recommend "security of supply" | Owner approves wording change |
| SSC-3 grammar | "ethical, sourcing and procurement" comma error | Owner approves grammar fix |
| SSC-4.2–4.4 | Generic operations management | Owner confirms public website scope |
| SSC-6.4 Smart Contracts & Blockchain | Potentially dated terminology | Owner decides whether to update |
| SSC-7.3 "Bi-Products" | Should be "By-Products" | Owner approves spelling fix |
| CS-2.2 "Mitigation Acceptance Testing" | Unusual phrasing | Owner confirms intended meaning |
| CS-2.3 Carbon asset procurement boundary | Scope overlap with C&ES | Owner confirms CSO function owns this in CS |
