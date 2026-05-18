import type { FaqItem } from "@/types/content";

export const platformFaq: FaqItem[] = [
  {
    question: "Do we have to replace our ERP?",
    answer:
      "No. Closewell connects to the ledger you already run and reads from it. Nothing moves, and nothing posts without your approval.",
  },
  {
    question: "How is this different from a chatbot?",
    answer:
      "A chatbot answers from whatever it was trained on. Closewell answers only from your ledger, documents and written policies, and shows you exactly which ones it used.",
  },
  {
    question: "What stays with my team?",
    answer:
      "Judgment. Closewell writes down how your team already works, applies it, and asks a person whenever a case falls outside it. Every action is logged and reversible.",
  },
  {
    question: "Will our auditors accept the output?",
    answer:
      "Every entry and reconciliation links to its source documents and the policy used, so evidence is gathered as the work happens instead of at year-end.",
  },
  {
    question: "Is our data used to train models?",
    answer:
      "No. Your ledger and documents are only used to answer your questions and prepare your close. They are never used to train shared models.",
  },
  {
    question: "How does implementation start?",
    answer:
      "We connect read-only to your GL and bank feeds, load last year’s close files, and Closewell drafts your policy library for you to review.",
  },
  {
    question: "How is it priced?",
    answer: "A flat monthly fee per entity, so adding reviewers never costs extra.",
  },
];

export const controllerFaq: FaqItem[] = [
  {
    question: "How quickly can we get started?",
    answer:
      "Most teams connect in a day and run their first prepared close within a month. We start read-only, alongside your current close, so nothing changes until you’re ready.",
  },
  {
    question: "Does Closewell replace my ERP?",
    answer:
      "No. Closewell connects to NetSuite, Sage Intacct, QuickBooks Online, Xero and other ledgers and works on top of them. No migration and no IT project.",
  },
  {
    question: "What does “grounded” mean?",
    answer:
      "Every answer and entry Closewell produces is built from your own records. It cites the ledger entries, documents and policy it relied on, so anyone can check the work.",
  },
  {
    question: "What size of company is Closewell for?",
    answer:
      "Finance teams of two to thirty people, usually at companies with several entities or a close that takes more than five working days.",
  },
  {
    question: "How secure is it?",
    answer:
      "Closewell is read-only by default, encrypts data in transit and at rest, supports SSO and role-based access, and never uses your data to train shared models.",
  },
  {
    question: "What support do we get after launch?",
    answer:
      "Each customer gets a named onboarding lead with a finance background, a shared Slack channel, and a monthly review of your policy library.",
  },
  {
    question: "What if our data is messy?",
    answer:
      "Closewell expects it. It flags duplicates, missing documents and odd coding as it indexes your books, and lists them for your team instead of guessing.",
  },
  {
    question: "What happens when Closewell is unsure?",
    answer:
      "It asks. Whenever confidence is low or a case falls outside a written policy, Closewell sends it to the right reviewer with the evidence and its reasoning.",
  },
  {
    question: "Do we need to change our close process?",
    answer:
      "No. Closewell learns the process you already run, including your checklist, templates and owners, and prepares work inside it.",
  },
  {
    question: "How is this different from our ERP’s reporting?",
    answer:
      "Your ERP records transactions. Closewell does the work on top of them, like reconciling, drafting entries and explaining variances, and answers questions with citations.",
  },
];
