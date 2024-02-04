// Define enums for categorized fields
export enum RelationType {
  Executive = "executive",
  BoardMember = "board_member",
  Investor = "investor",
  Advisor = "advisor",
}

export enum OrgCountryCode {
  // Example country codes - replace with actual codes as needed
  USA = "USA",
  CAN = "CAN",
  CYM = "CYM",
  DEU = "DEU",
  NDL = "NLD",
  PAN = "PAN",
  GBR = "GBR",
}

/* // Assuming CategoryList has predefined categories, define them in this enum
enum CategoryList {
  Category1 = "category1",
  Category2 = "category2",
  // Add more categories as needed
} */

// AlumniNetwork includes all information about the alumnis and the companies they ahve a relationship to
export interface AlumniNetwork {
  personUuid: string;
  personName: string;
  jobTitle: string;
  personLogoUrl: string;
  orgUuid: string;
  relationType: RelationType;
  jobTitleSubsequent: string;
  orgName: string;
  orgCountryCode: OrgCountryCode;
  // categoryList: CategoryList;
  totalFundingUsd: number;
  foundedOn: string;
}