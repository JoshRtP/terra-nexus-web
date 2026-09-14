// Ten Types of Innovation — framework record for the framework viewer.
//
// PROVENANCE
//  * Structure, the three category names, the ten type names and the 112
//    tactic names follow Doblin's published Ten Types of Innovation
//    taxonomy (Keeley, Walters, Pikkel & Quinn, 2013; Doblin is part of
//    Deloitte). See `attribution` below, which the page renders verbatim.
//  * Type descriptions, tactic descriptions and the category blurbs were
//    written for Terra Nexus's own session tool (the prototype handed over
//    2026-09-13 in plans/Innovation framework viewer mockups.zip), not
//    reproduced from the book. Generated from that prototype's data
//    modules on 2026-09-13 with no wording changed; this file is now the
//    source.
//  * Company examples are public illustrations, drawn from the book,
//    Doblin's own materials and public reporting. They are not Terra Nexus
//    client work and the page says so. Figures in them (acquisition
//    prices, unit counts) are as published at the time and should be
//    re-checked before being quoted elsewhere.
//  * Colours are data, not theme: three tonal families off the brand
//    anchors (navy, burgundy, sage), darkest at the backstage end, so the
//    ten types stay individually identifiable while the category still
//    reads across the board.
//
// Owner-published 2026-09-13: the framework is public knowledge and the
// tool is Terra Nexus's own; attribution wording below is for owner review.
import type { Framework } from './types';

export const tenTypesOfInnovation: Framework = {
  slug: 'ten-types-of-innovation',
  name: 'Ten Types of Innovation',
  shortName: 'Ten Types',
  eyebrow: 'Innovation Framework',
  title: 'Ten Types of Innovation',
  // Written 2026-09-14 in the shape of the owner-approved Value Map lead; NEEDS OWNER REVIEW.
  lead: 'Most innovation efforts go straight to the product and stop there. The Ten Types is how Terra Nexus widens that view in a session, so a team sees the moves competitors find hardest to copy: how the business is configured, how it earns, and how customers experience it.',
  metaTitle: 'Ten Types of Innovation Framework Tool | Terra Nexus',
  metaDescription: 'An interactive reference to the Ten Types of Innovation: ten types, 112 tactics and real-company examples, with a play sheet you can print or share.',
  intro: 'Ten types across three categories. Pick a category to focus it, open a type for its tactics, and add tactics to a play sheet as you work through the session.',
  labels: { group: 'category', groupPlural: 'categories', type: 'type', typePlural: 'types', tactic: 'tactic', tacticPlural: 'tactics' },
  attribution: [
    'The Ten Types of Innovation framework, its three categories, ten types and tactic names are the work of Doblin, now part of Deloitte, set out in Ten Types of Innovation: The Discipline of Building Breakthroughs (Keeley, Walters, Pikkel and Quinn, 2013).',
    'The descriptions and the company illustrations on this page were compiled by Terra Nexus for use in strategy and innovation sessions. The examples are public illustrations of each tactic, not Terra Nexus client work.',
  ],
  categories: [
    { name: 'Configuration', focus: 'The internals of the business', blurb: 'Backstage. The types furthest from the customer — how the business is financed, partnered, organised and run.', color: '#131F48' },
    { name: 'Offering', focus: 'The core product', blurb: 'The product itself and the system of products around it. The easiest ground for competitors to copy.', color: '#6A1B32', note: { label: 'WHY ONLY TWO', text: 'Offering carries the fewest types and the most attention. Most programs over-invest here before looking at configuration.' } },
    { name: 'Experience', focus: 'Customer-facing elements', blurb: 'Onstage. The types customers see and feel — service, delivery, brand and the interactions you foster.', color: '#5B6C5D' },
  ],
  types: [
    {
      id: 'profit-model',
      category: 'Configuration',
      title: 'Profit Model',
      color: '#131F48',
      description: 'How you make money. Innovative profit models find fresh ways to convert your offerings and other sources of value into cash.',
      examples: [
        { who: 'Netflix', what: 'Reset the video rental industry by charging a recurring subscription instead of per-rental fees.' },
        { who: 'Gillette', what: 'Sells handles cheaply and makes its margin on the blades.' },
      ],
      tactics: [
        { title: 'Premium', description: 'Price at a higher margin than competitors, usually for a superior product, offering, experience, service, or brand.' },
        { title: 'Cost Leadership', description: 'Hold variable costs down and win on volume at low prices.' },
        { title: 'Scaled Transactions', description: 'Pursue large, high-volume deals where unit costs barely move, so margin comes from scale.' },
        { title: 'Microtransactions', description: 'Sell very cheap items in very high quantities to capture impulse spend.' },
        { title: 'Forced Scarcity', description: 'Cap quantity, timing or access so demand and price rise.' },
        {
          title: 'Subscription',
          description: 'Charge customers a recurring fee to have access to the service or product.',
          examples: [
            { who: 'Netflix', what: 'Subscription access replaced per-title rental in home video.' },
            { who: 'Rent the Runway', what: '$69/month to hold four high-quality garments at a time, swapped on return.' },
            { who: 'Hilti', what: 'Construction tools on subscription, so contractors stop buying and maintaining equipment.' },
          ],
        },
        { title: 'Membership', description: 'Charge for a period of access to places, goods or services non-members cannot reach.' },
        { title: 'Installed Base', description: 'Sell the core cheaply to build demand and loyalty, then earn on what attaches to it.' },
        { title: 'Switchboard', description: 'Connect many buyers to many sellers; each new participant makes the connection worth more.' },
        { title: 'Auction', description: 'Allow a market and its users to set the price for goods or services.' },
        { title: 'User-Defined', description: 'Let the customer name the price they are willing to pay.' },
        { title: 'Freemium', description: 'Offer basic services for free with optional premium features.' },
        {
          title: 'Flexible Pricing',
          description: 'Vary prices for an offering based on demand.',
          examples: [
            { who: 'Uber', what: 'Prices recalculated continuously against live demand.' },
          ],
        },
        { title: 'Float', description: 'Take payment before delivery and hold the cash until you build.' },
        { title: 'Financing', description: 'Earn from structured payment plans and after-sale interest rather than the sale itself.' },
        { title: 'Ad-Supported', description: 'Give the offering away to one audience and sell that audience to another.' },
        { title: 'Licensing', description: 'Grant permission to use your product or service for a fixed payment.' },
        {
          title: 'Metered Use',
          description: 'Allow customers to pay only for what they use.',
          examples: [
            { who: 'Bundles', what: 'Leases Miele washing machines at roughly €30/month for 35 washes, metered by a smart plug that also drives maintenance and refurbishment.' },
          ],
        },
        { title: 'Bundled Pricing', description: 'Sell a single transaction bundled as a package to increase perceived value.' },
        { title: 'Disaggregate Pricing', description: 'Let customers buy exactly and only what they need.' },
        { title: 'Risk Sharing', description: 'Waive fees when agreed targets are missed and take a larger share when they are met.' },
      ],
    },
    {
      id: 'network',
      category: 'Configuration',
      title: 'Network',
      color: '#2A3763',
      description: 'How you connect with others to create value. Network innovations provide a way to take advantage of other companies processes, technologies, offerings, channels, and brands.',
      examples: [
        { who: 'Target', what: 'Differentiates through partnerships with outside designers — Michael Graves designed a line of kitchen appliances for it.' },
      ],
      tactics: [
        { title: 'Merger/Acquisition', description: 'Combine or move entities to gain access to capabilities or scale.' },
        { title: 'Consolidation', description: 'Make multiple companies operate as one to maximize efficiency.' },
        {
          title: 'Open Innovation',
          description: 'Leverage external knowledge and processes for innovation.',
          examples: [
            { who: 'Unilever', what: 'Crowdsources specific technologies from startups and academics; its Foundry unit has run 200+ pilots with in-house brands.' },
          ],
        },
        { title: 'Secondary Markets', description: 'Route waste streams and by-products to the buyers who want them.' },
        { title: 'Supply Chain Integration', description: 'Coordinate and integrate supply chain activities to streamline operations.' },
        {
          title: 'Complementary Partnering',
          description: 'Share strengths with companies serving the same market with different offerings.',
          examples: [
            { who: 'Toast Ale', what: 'Brews beer from bakery waste — end slices and unsold crumpets from partner bakeries in place of virgin grain.' },
          ],
        },
        { title: 'Alliances', description: 'Share risk and revenue with another party to strengthen both competitive positions.' },
        { title: 'Franchising', description: 'Allow third parties to operate under your brand.' },
        { title: 'Coopetition', description: 'Work with a competitor toward a goal that serves you both.' },
        {
          title: 'Collaboration',
          description: 'Partner with others for mutual benefit.',
          examples: [
            { who: 'Target', what: 'Recruited outside designers — including architect Michael Graves — to differentiate its own shelves.' },
          ],
        },
      ],
    },
    {
      id: 'structure',
      category: 'Configuration',
      title: 'Structure',
      color: '#45507B',
      description: 'How you organize and align your talent and assets. Structure innovations focus on organizing company assets in unique ways.',
      examples: [
        { who: 'Whole Foods', what: 'Built a robust feedback system for its internal teams.' },
        { who: 'W.L. Gore', what: 'Flat organisation of small teams driven by commitments rather than direction; employees become shareholders after a year.' },
      ],
      tactics: [
        {
          title: 'Organizational Design',
          description: 'Make your organizational structure work in favor of innovation and delivery.',
          examples: [
            { who: 'W.L. Gore', what: 'Horizontal structure of small teams working to commitments rather than management directives.' },
          ],
        },
        {
          title: 'Incentive Systems',
          description: 'Use financial or non-financial rewards to encourage desired behaviors.',
          examples: [
            { who: 'W.L. Gore', what: 'Every employee becomes a shareholder after a year.' },
          ],
        },
        { title: 'IT Integration', description: 'Integrate IT systems to improve data flow and operations.' },
        { title: 'Competency Center', description: 'Support specific areas with expert resources.' },
        {
          title: 'Outsourcing',
          description: 'Delegate tasks to external providers for efficiency.',
          examples: [
            { who: 'Method', what: 'Production spread across more than 50 subcontractors to keep manufacturing nimble.' },
          ],
        },
        { title: 'Corporate University', description: 'Run your own training programs for job- and company-specific skills.' },
        { title: 'Decentralized Management', description: 'Distribute decision-making closer to the action.' },
        {
          title: 'Knowledge Management',
          description: 'Create processes for capturing and sharing knowledge.',
          examples: [
            { who: 'Whole Foods', what: 'Feedback system that moves what internal teams learn back through the organisation.' },
          ],
        },
        { title: 'Asset Standardization', description: 'Standardize physical and digital assets to cut operating cost and add modularity.' },
      ],
    },
    {
      id: 'process',
      category: 'Configuration',
      title: 'Process',
      color: '#626C93',
      description: 'How you use signature or superior methods to do your work. Process innovations involve the activities and operations that produce an enterprise\'s primary offerings.',
      examples: [
        { who: 'Zara', what: 'Fast fashion — moves a garment from sketch to shop floor in weeks.' },
        { who: 'Toyota', what: 'Lean production, the system the rest of manufacturing copied.' },
      ],
      tactics: [
        { title: 'Process Standardization', description: 'Use common standards to reduce errors and inefficiencies.' },
        { title: 'Localization', description: 'Adapt a process or offering to the culture and conditions of a region.' },
        {
          title: 'Process Efficiency',
          description: 'Optimize resources to maximize outcomes.',
          examples: [
            { who: 'Method', what: '"Greensourcing" — worked suppliers and manufacturers to track environmental impact and improve water, energy and material efficiency.' },
            { who: 'Blue River Technology', what: 'Computer vision sprays only weeds, cutting herbicide use by up to 90%; acquired by John Deere for $305M.' },
            { who: 'Diageo', what: 'Distilling by-products run an on-site bioenergy plant supplying half the Roseisle distillery.' },
          ],
        },
        { title: 'Flexible Manufacturing', description: 'Run production that absorbs change in mix or volume without losing efficiency.' },
        { title: 'Process Automation', description: 'Automate repetitive tasks to save time and costs.' },
        { title: 'Crowdsourcing', description: 'Harness the power of a crowd to complete tasks or gather input.' },
        {
          title: 'On-Demand Production',
          description: 'Produce only when there is a confirmed need.',
          examples: [
            { who: 'Zara', what: 'Produces against read demand, sketch to shelf in weeks rather than to seasonal forecast.' },
          ],
        },
        {
          title: 'Lean Production',
          description: 'Eliminate waste in production processes.',
          examples: [
            { who: 'Toyota', what: 'The production system that defined lean manufacturing.' },
          ],
        },
        { title: 'Logistics Systems', description: 'Manage the movement of goods, information and resources from origin to point of use.' },
        { title: 'Strategic Design', description: 'Plan processes to align with strategic goals.' },
        { title: 'Intellectual Property', description: 'Protect unique innovations through patents and copyrights.' },
        { title: 'User Generated', description: 'Put users to work creating and curating the content your offering runs on.' },
        { title: 'Predictive Analytics', description: 'Model past performance to price and shape future offerings.' },
      ],
    },
    {
      id: 'product-performance',
      category: 'Offering',
      title: 'Product Performance',
      color: '#6A1B32',
      description: 'How you develop distinguishing features and functionality. Product Performance innovations address the value, features, and quality of a company\'s offering.',
      examples: [
        { who: 'OXO Good Grips', what: 'Priced at a premium, kept a loyal following on the strength of universal design.' },
        { who: 'Dyson', what: 'Dual cyclone technology — 15 years and 5,000+ prototypes to remove the bag.' },
      ],
      tactics: [
        {
          title: 'Superior Product',
          description: 'Develop an offering of exceptional quality, elegance, and experience.',
          examples: [
            { who: 'Dyson', what: 'Dual cyclone technology developed over 15 years and 5,000+ prototypes.' },
            { who: 'Corning', what: 'Gorilla Glass became a required component for top technology brands.' },
          ],
        },
        {
          title: 'Ease of Use',
          description: 'Make your product simple, intuitive, and comfortable to use.',
          examples: [
            { who: 'OXO Good Grips', what: 'Universal design made the rest of the category feel clumsy — at a premium price.' },
          ],
        },
        { title: 'Engaging Functionality', description: 'Provide unexpected or noteworthy experiential benefits.' },
        { title: 'Safety', description: 'Increase the customer\'s level of confidence and security.' },
        { title: 'Feature Aggregation', description: 'Combine complementary features across offerings into a single product.' },
        { title: 'Added Functionality', description: 'Add new functionality to an existing offering.' },
        { title: 'Performance Simplification', description: 'Simplify functionality to reduce complexity.' },
        { title: 'Environmental Sensitivity', description: 'Offer something that does measurably less harm than the alternative.' },
        {
          title: 'Conservation',
          description: 'Design products that help customers reduce waste or harm to the environment.',
          examples: [
            { who: 'LUSH', what: '35% of the range ships "naked" of packaging; 6.5M shampoo bars sold in the US displaced 19.4M plastic bottles.' },
            { who: 'Rolls-Royce', what: 'Trent XWB engine runs 15% more efficiently than the model before it.' },
            { who: 'Method', what: 'Formulated to the precautionary principle — an ingredient that might not be safe was not used.' },
          ],
        },
        { title: 'Customization', description: 'Allow tailoring to suit individual needs.' },
        { title: 'Focus', description: 'Design deliberately for one audience and accept the loss of others.' },
        { title: 'Styling', description: 'Compete on style, form and image.' },
      ],
    },
    {
      id: 'product-system',
      category: 'Offering',
      title: 'Product System',
      color: '#8E4557',
      description: 'How you create complementary products and services. Product System innovations are rooted in how individual products and services connect or bundle together to create a robust and scalable system.',
      examples: [
        { who: 'Nike+', what: 'Turned shoes, sensors, apps and devices into a single sport-lifestyle suite.' },
      ],
      tactics: [
        {
          title: 'Complements',
          description: 'Sell additional related or ancillary products or services.',
          examples: [
            { who: 'Gillette', what: 'Cheap handle, profitable blades — the complement carries the margin.' },
            { who: 'Replenish', what: 'Reusable bottle plus concentrate pods; the bottle becomes the appliance and the refill becomes the product.' },
          ],
        },
        {
          title: 'Extensions/Plug-ins',
          description: 'Add features to extend the functionality of the core product.',
          examples: [
            { who: 'Mozilla', what: 'Open-source browser that lets outside developers add functionality through add-ons.' },
          ],
        },
        {
          title: 'Product Bundling',
          description: 'Offer several products for sale as one bundled product.',
          examples: [
            { who: 'Oscar Mayer', what: 'Lunchables combine separate snack items into one school-lunch product.' },
          ],
        },
        {
          title: 'Modular Systems',
          description: 'Create a set of individual components that can be used independently but gain utility when combined.',
          examples: [
            { who: 'Gerrard Street', what: 'Modular headphones on €7.50/month subscription; individual parts are mailed back and 85% of components are reused.' },
          ],
        },
        {
          title: 'Product/Service Platforms',
          description: 'Develop systems that connect multiple related products and services.',
          examples: [
            { who: 'Nike+', what: 'Shoes, sensors, apps and devices tied into one system across the sportswear range.' },
          ],
        },
        {
          title: 'Integrated Offering',
          description: 'Combine otherwise independent components into a complete experience.',
          examples: [
            { who: 'Uber', what: 'One app, one payment rail and one courier network spanning rides, restaurant delivery and groceries.' },
          ],
        },
      ],
    },
    {
      id: 'service',
      category: 'Experience',
      title: 'Service',
      color: '#3F4C41',
      description: 'How you support and amplify the value of your offerings. Service innovations ensure and enhance the utility, performance, and apparent value of an offering.',
      examples: [
        { who: 'Zappos', what: '"Deliver WOW through service" is its first internal core value.' },
        { who: 'Men\'s Wearhouse', what: 'Lifetime pressing on suits and coats.' },
      ],
      tactics: [
        { title: 'Try Before You Buy', description: 'Let customers test or experience an offering before investing in it.' },
        {
          title: 'Guarantee',
          description: 'Remove customer risk by insuring against failure or dissatisfaction.',
          examples: [
            { who: 'Patagonia', what: 'Ironclad Guarantee makes durability the promise rather than a claim.' },
          ],
        },
        {
          title: 'Loyalty Programs',
          description: 'Provide benefits and discounts to retain high-value customers.',
          examples: [
            { who: 'LUSH', what: 'Five returned pots earn a free face mask; 1.2M pots came back in 2018 into in-house recycling.' },
          ],
        },
        { title: 'Added Value', description: 'Include an additional experience as part of the base offering.' },
        { title: 'Concierge', description: 'Provide premium service by taking care of tasks for the customer.' },
        {
          title: 'Total Experience Management',
          description: 'Manage the customer\'s experience holistically to enhance satisfaction.',
          examples: [
            { who: 'Riversimple', what: 'All-inclusive car subscription — fuel included — which forces the maker to improve efficiency to protect its own margin.' },
          ],
        },
        { title: 'Supplementary Service', description: 'Offer extra services that amplify your core offering.' },
        {
          title: 'Superior Service',
          description: 'Go beyond expectations to deliver outstanding customer support.',
          examples: [
            { who: 'Zappos', what: 'Service staff empowered to stay on a problem for hours — the company\'s first core value.' },
            { who: 'Men\'s Wearhouse', what: 'Lifetime pressing included with every suit and coat.' },
          ],
        },
        { title: 'Personalized Service', description: 'Tailor services to individual preferences.' },
        { title: 'User Communities/Support Systems', description: 'Create spaces for customers to interact and support each other.' },
        { title: 'Lease or Loan', description: 'Let customers pay over time so the upfront cost falls away.' },
        { title: 'Self-Service', description: 'Empower customers to complete activities themselves.' },
      ],
    },
    {
      id: 'channel',
      category: 'Experience',
      title: 'Channel',
      color: '#5B6C5D',
      description: 'How you deliver your offerings to customers and users. Channel innovations encompass all the ways that you connect your company\'s offerings with your customers and users.',
      examples: [
        { who: 'Nespresso', what: 'Holds customers through a useful members-only club.' },
        { who: 'Niketown', what: 'Retail as theatre — flagship stores funded from the advertising budget, not expected to pay back on in-store sales.' },
      ],
      tactics: [
        {
          title: 'Diversification',
          description: 'Add and expand into new or different channels.',
          examples: [
            { who: 'Uber', what: 'Adjacent delivery channels opened off the same platform rather than a new business.' },
          ],
        },
        {
          title: 'Flagship Store',
          description: 'Create a signature space to showcase your brand and products.',
          examples: [
            { who: 'Niketown', what: 'Retail as theatre, funded by the ad budget; the stores built more brand than a campaign could.' },
          ],
        },
        { title: 'Go Direct', description: 'Connect directly with customers, bypassing intermediaries.' },
        {
          title: 'Non-Traditional Channels',
          description: 'Innovate with novel methods to reach customers.',
          examples: [
            { who: 'Ecover', what: 'In-store refill stations rolled into supermarket trials with Waitrose, M&S and Sainsbury\'s.' },
            { who: 'Algramo', what: 'App-scheduled refill cart tops up detergent bottles at the doorstep at ~40% of shelf price.' },
          ],
        },
        { title: 'Pop-up Presence', description: 'Stand up a temporary space that earns attention while it lasts.' },
        { title: 'Indirect Distribution', description: 'Use other resellers to deliver offerings.' },
        { title: 'Multi-Level Marketing', description: 'Sell via a tiered network of independent salespeople.' },
        { title: 'Cross-selling', description: 'Pair products, services, or categories for complementary sales.' },
        { title: 'On-Demand', description: 'Deliver goods in real-time wherever the customer desires.' },
        { title: 'Context Specific', description: 'Offer the right goods for a particular place, moment or occasion.' },
        { title: 'Experience Center', description: 'Give people a place to handle the offering and buy it through another channel.' },
      ],
    },
    {
      id: 'brand',
      category: 'Experience',
      title: 'Brand',
      color: '#7A8A7C',
      description: 'How you represent your offerings and business. Brand innovations help to ensure that customers and users recognize, remember, and prefer your offerings to those of competitors.',
      examples: [
        { who: 'Virgin', what: 'Extends one brand across sectors from soft drinks to space travel.' },
        { who: 'Intel', what: '"Intel Inside" on the box raises the value of the whole machine.' },
      ],
      tactics: [
        { title: 'Co-Branding', description: 'Combine brands to mutually reinforce credibility and attributes.' },
        {
          title: 'Brand Leverage',
          description: 'Use your brand equity to expand into new areas.',
          examples: [
            { who: 'Uber', what: 'Leaned on brand recognition and an existing driver network to enter restaurant and grocery delivery as UberEATS.' },
          ],
        },
        { title: 'Private Label', description: 'Provide goods made by others but sold under your brand.' },
        {
          title: 'Brand Extension',
          description: 'Offer new products or services under the umbrella of your brand.',
          examples: [
            { who: 'Virgin', what: 'One brand carried from records to airlines to spaceflight.' },
          ],
        },
        {
          title: 'Component Branding',
          description: 'Highlight unique parts of your offering.',
          examples: [
            { who: 'Intel', what: '"Intel Inside" turned a component into the reason to buy the whole machine.' },
          ],
        },
        {
          title: 'Transparency',
          description: 'Make operations and values visible to customers.',
          examples: [
            { who: 'H&M', what: 'Publishes its full supplier list; scored highest of clothing brands on the Fashion Transparency Index.' },
          ],
        },
        {
          title: 'Values Alignment',
          description: 'Emphasize alignment with customer priorities.',
          examples: [
            { who: 'Method', what: 'Built a brand that stands for non-toxic, cradle-to-cradle cleaning rather than for cleaning.' },
            { who: 'Patagonia', what: 'Campaigns that ask customers to buy less, backed by repair programmes.' },
          ],
        },
        {
          title: 'Certification',
          description: 'Earn badges or marks for specialized expertise or compliance.',
          examples: [
            { who: 'Danone', what: 'B-Corp certification achieved for 17 subsidiaries, roughly 30% of global sales.' },
          ],
        },
      ],
    },
    {
      id: 'customer-engagement',
      category: 'Experience',
      title: 'Customer Engagement',
      color: '#9AA89B',
      description: 'How you foster compelling interactions. Customer Engagement innovations are all about understanding the deep-seated aspirations of customers and users.',
      examples: [
        { who: 'Nintendo Wii', what: 'The experience comes more from the interactions in the room than from what is on screen.' },
        { who: 'Blizzard', what: 'Understands what keeps World of Warcraft players playing, and connecting, for hours.' },
      ],
      tactics: [
        { title: 'Process Automation', description: 'Remove the burden of repetitive tasks to create a seamless experience.' },
        { title: 'Experience Simplification', description: 'Cut choices and steps so a few things are done exceptionally well.' },
        { title: 'Curation', description: 'Apply a clear point of view to what you carry, and let that view define you.' },
        {
          title: 'Experience Enabling',
          description: 'Provide tools or platforms to enhance the customer experience.',
          examples: [
            { who: 'Nintendo Wii', what: 'Moved the experience off the screen and into the room.' },
          ],
        },
        { title: 'Mastery', description: 'Help customers develop skills and expertise through your offering.' },
        { title: 'Autonomy and Authority', description: 'Hand users the controls so they shape the experience themselves.' },
        {
          title: 'Community and Belonging',
          description: 'Make people feel part of a group or a movement.',
          examples: [
            { who: 'Method', what: '"People Against Dirty" — a community opened beyond customers to anyone who wants a cleaner planet.' },
            { who: 'Blizzard', what: 'Designs for what makes World of Warcraft players connect and collaborate.' },
          ],
        },
        {
          title: 'Personalization',
          description: 'Adapt offerings to meet individual needs and preferences.',
          examples: [
            { who: 'Adidas', what: 'FutureCraft Loop beta returned every pair for re-manufacture, making customers part of the loop.' },
          ],
        },
        { title: 'Whimsy and Personality', description: 'Use humor and emotional resonance to create memorable experiences.' },
        { title: 'Status and Recognition', description: 'Highlight customer achievements or association with your brand.' },
      ],
    },
  ],
  starter: {
    name: 'Method',
    note: 'Doblin cites Method as five types used together — Process, Structure, Product Performance, Brand and Customer Engagement.',
    tactics: [
      'process--process-efficiency',
      'structure--outsourcing',
      'product-performance--conservation',
      'brand--values-alignment',
      'customer-engagement--community-and-belonging',
    ],
  },
};
