// The 4 market mechanisms — how environmental performance reaches the
// market (credit, inset, product claim, or certificate). Canonical source
// of truth for this content; moved here 2026-08-18 so the homepage's "Our
// Markets" section and the Carbon & Ecosystem Services capability page's
// mechanism selector render the exact same data instead of two hand-kept
// copies. Originally authored on the capability page (2026-08-19 rebuild,
// content verbatim from a design reference prototype — see that page's own
// header comment for provenance) — copy is unchanged by this move.
export interface MarketMechanism {
  id: string;
  num: string;
  title: string;
  carrier: string;
  headline: string;
  summary: string;
  body: string[];
  examples: string;
}

export const marketMechanisms: MarketMechanism[] = [
  {
    id: 'm01',
    num: '01',
    title: 'Carbon & Ecosystem Credits',
    carrier: 'As a quantified environmental asset',
    headline: 'Turn verified environmental outcomes into market-ready assets.',
    summary: 'A credit is a unit: once issued, a quantified outcome can be owned, transferred, priced, retired, and reported under defined market rules. Carbon is the mature case; biodiversity, water, habitat, and soil are following it.',
    body: [
      'A credit is a unit. Once a quantified outcome has been issued as one, it can be owned, transferred, priced, retired, and reported under a defined set of market rules.',
      'Carbon is the mature case, where a credit stands for a verified reduction or removal. The same structure is now being extended to biodiversity, water, habitat, and soil, with real variation in how rigorously it holds.',
      'Terra Nexus works the full length of the asset: market and methodology strategy, development, quantification, verification, issuance, valuation, transaction, and the accounting that has to survive scrutiny afterward.',
    ],
    examples: 'Carbon reductions · Carbon removals · Agricultural carbon · Nature-based credits · Biodiversity · Water · Other ecosystem-service markets',
  },
  {
    id: 'm02',
    num: '02',
    title: 'Scope 3 & Insets',
    carrier: 'As an outcome connected to the value chain',
    headline: 'Create and account for environmental value inside the value chain.',
    summary: "Improvements at farms, suppliers, and facilities stay attached to the chain they occur in and count toward corporate targets, procurement programs, and customer commitments — if claim rights, allocation, and custody are settled first.",
    body: [
      "Some outcomes are worth more where they happen. A reduction at a supplier's farm, mill, or plant can count toward a corporate target, a procurement program, or a customer commitment, provided it stays attached to that chain.",
      'Generating the outcome is the straightforward half. The harder half is settling who may claim it, how it is quantified and allocated, how chain of custody is held, how competing claims are ruled out, and how the performance enters a corporate inventory without being challenged later.',
      'Terra Nexus designs those systems, then helps operate, verify, and maintain them.',
    ],
    examples: 'Scope 3 reductions · Scope 3 removals · Insets · Supplier interventions · Regenerative agriculture programs · Low-carbon sourcing · Supply-shed programs · Value-chain decarbonization',
  },
  {
    id: 'm03',
    num: '03',
    title: 'Product & Commodity Claims',
    carrier: 'As an attribute of the physical product',
    headline: 'Make environmental performance part of what is bought and sold.',
    summary: 'The claim travels with the product itself, so it only reaches as far as the evidence behind it: what was quantified, how it ties to this unit, and what the producer or buyer may say about it.',
    body: [
      'Environmental performance can differentiate a product, ingredient, feedstock, fuel, material, or commodity, but only as far as the evidence behind it reaches.',
      'The useful claim is rarely that something is sustainable. It is narrower: which characteristic can be demonstrated, how was it quantified, how is it tied to this particular product, and what may the producer or buyer say about it.',
      'Terra Nexus connects environmental data, lifecycle assessment, traceability, chain of custody, and assurance to claims that hold up in front of a buyer, an auditor, or a regulator.',
    ],
    examples: 'Low-carbon products · Low-CI commodities · Low-carbon feedstocks and fuels · Certified commodities · Regenerative products · Product carbon footprints · Responsible sourcing claims',
  },
  {
    id: 'm04',
    num: '04',
    title: 'Environmental Attribute Certificates',
    carrier: 'As a certificate conveying the attribute',
    headline: 'Convey environmental value when physical supply alone cannot.',
    summary: 'The attribute transfers separately from the molecule, letting buyers procure differentiated production where segregation is impractical — provided issuance, custody, retirement, exclusivity, and claims all agree.',
    body: [
      'An Environmental Attribute Certificate, or EAC, carries a verified characteristic of how a commodity, material, fuel, or energy source was produced. Depending on the market, that attribute can transfer separately from the physical product, so a buyer can still procure differentiated production where segregation or physical traceability is impractical.',
      'Separating the attribute from the molecule puts all the weight on the architecture. Ownership, quantification, issuance, chain of custody, transfer, retirement, exclusivity, accounting, and claim language have to agree with one another. Where they do not, the value leaks or the claim will not stand.',
      'These markets are still forming. Terra Nexus helps clients design, evaluate, enter, operate, and commercialize them.',
    ],
    examples: 'Low-carbon commodity certificates · Low-carbon material certificates · Agricultural environmental attributes · Fuel attributes · Sustainable aviation fuel certificates · Renewable-energy attributes · Book-and-claim markets',
  },
];
