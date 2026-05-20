import type { PolicyDocument } from "@/types/agent";

/**
 * The sample company's written accounting policies. Sections are marked with "§n" headings so the
 * retrieval layer can cite a specific section rather than a whole document.
 */
export const policyLibrary: PolicyDocument[] = [
  {
    id: "SHORT-PAY-01",
    title: "Customer short-payments",
    version: 2,
    owner: "Dana Reyes, Controller",
    updatedOn: "2026-09-12",
    body: `§1 Scope
Applies to customer receipts that settle an open invoice for less than the invoiced amount, where the remittance references the invoice.

§2 Automatic close
When the shortfall is $50.00 or less, or 5% or less of the invoice for freight customers, close the invoice and post the difference to 6150 Short-pay write-offs. No reviewer is required. Attach the bank line and remittance as evidence.

§3 Review threshold
Shortfalls above the automatic threshold stay open. Send the item to the Controller with the bank line, the invoice and the customer's payment history. Do not post a write-off until the Controller approves.

§4 Repeat short-payers
If the same customer short-pays three times in a quarter, flag the account to AR for a terms conversation, regardless of amount.`,
  },
  {
    id: "ACCRUE-01",
    title: "Month-end expense accruals",
    version: 2,
    owner: "Dana Reyes, Controller",
    updatedOn: "2026-09-02",
    body: `§1 Trigger
If a vendor has delivered services in the period and no invoice has been received by close Day 2, accrue the expense.

§2 Amount
Use the signed SOW or purchase order amount for the period. Where no SOW exists, use the trailing three-month average and state the basis in the memo.

§3 Entry
Debit the expense account the vendor is normally coded to; credit 2100 Accrued liabilities. Set an automatic reversal on Day 1 of the following period.

§4 Repeat vendors
Vendors accrued in each of the last three periods with invoices within 5% of the accrual may be accrued without review. Retainers above $25,000 always require Controller sign-off.`,
  },
  {
    id: "REV-REC-01",
    title: "Subscription and usage revenue (ASC 606)",
    version: 2,
    owner: "Owen Brooks, FP&A Lead",
    updatedOn: "2026-08-28",
    body: `§1 Recognition trigger
Revenue is recognized once a contract is signed by both parties and the service period has begun. Subscription fees are booked to 2400 Deferred revenue on invoice.

§2 Subscription fees
Recognize subscription fees ratably over the service term, normally 12 months, from 2400 Deferred revenue to 4010 Subscription revenue on the last day of each month.

§3 Usage and true-ups
Usage above the committed amount is recognized in the month it is consumed and booked to 4020 Usage revenue. True-ups of $10,000 or less are billed automatically; larger true-ups go to the Controller before invoicing.

§4 Amendments
Mid-term amendments that change price or scope are treated as a contract modification. Closewell drafts the memo and updated schedule for review before any entry posts.`,
  },
  {
    id: "PREPAID-01",
    title: "Prepaid expenses",
    version: 1,
    owner: "Priya Shah, Controller",
    updatedOn: "2026-07-30",
    body: `§1 Capitalization
Annual or multi-month payments of $5,000 or more for a service period longer than one month are capitalized to 1400 Prepaid expense.

§2 Amortization
Amortize straight-line over the service period, starting the month the service begins, to the expense account the vendor is normally coded to.

§3 Renewals billed in a single month
Annual renewals must not be expensed in the month billed. If a renewal was posted directly to expense, reclassify it to 1400 Prepaid expense and set up the amortization schedule.`,
  },
  {
    id: "FX-REVAL-01",
    title: "Foreign currency revaluation",
    version: 1,
    owner: "Owen Brooks, FP&A Lead",
    updatedOn: "2026-06-30",
    body: `§1 Monetary balances
Revalue foreign-currency monetary balances at the month-end closing rate published by the treasury desk. Book unrealized differences to 7900 FX gain / loss.

§2 Intercompany loans
Intercompany loans that are not expected to be settled are a judgment call. Closewell prepares the calculation under both treatments and sends it to the FP&A Lead; it does not post.`,
  },
  {
    id: "FLUX-01",
    title: "Flux review thresholds",
    version: 1,
    owner: "Dana Reyes, Controller",
    updatedOn: "2026-08-01",
    body: `§1 Thresholds
Explain any income statement line that moves more than 10% and more than $25,000 against the prior month, and any balance sheet line that moves more than $100,000.

§2 Commentary
Each explanation names the entries that drive the movement, states whether the item is recurring or one-time, and links the source documents.`,
  },
];

export function findPolicy(id: string): PolicyDocument | undefined {
  return policyLibrary.find((policy) => policy.id === id);
}
