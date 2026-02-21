export enum CreditCardNetwork {
  VISA = "visa",
  MASTERCARD = "mastercard",
  AMERICAN_EXPRESS = "american_express",
}

export enum CreditCardIssuer {
  SCOTIABANK = "scotiabank",
  BMO = "bmo",
  TD = "td",
  RBC = "rbc",
  CIBC = "cibc",
  NATIONAL_BANK = "national_bank",
  MBNA = "mbna",
  DESJARDINS = "desjardins",
  AMERICAN_EXPRESS = "american_express",
  CAPITAL_ONE = "capital_one",
  BRIM = "brim",
  ROGERS = "rogers",
  TANGERINE = "tangerine",
  WEALTHSIMPLE = "wealthsimple",
  SIMPLII = "simplii",
  PC_FINANCIAL = "pc_financial",
  NEO = "neo",
  VANCITY = "vancity",
  CANADIAN_TIRE = "canadian_tire",
  WALMART = "walmart",
  HOME_TRUST = "home_trust",
  KOHO = "koho",
}

export enum Programs {
  TD_REWARDS = "td_rewards",
  BMO_REWARDS = "bmo_rewards",
  AIR_MILES = "air_miles",
  AEROPLAN = "aeroplan",
  WESTJET = "westjet",
  CASHBACK = "cashback",
  AMERICAN_EXPRESS_MEMBERSHIP_REWARDS = "american_express_membership_rewards",
}

export const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // MS

export enum CashbackCategory {
  GROCERIES = "groceries",
  GAS = "gas",
  DINING = "dining",
  TRAVEL = "travel",
  ENTERTAINMENT = "entertainment",
  DRUGSTORES = "drugstores",
  TRANSIT = "transit",
  RECURRING_BILLS = "recurring_bills",
  EVERYTHING_ELSE = "everything_else",
}