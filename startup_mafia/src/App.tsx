import React from "react";
import logo from "./logo.svg";
import "./App.css";

import alumniNetwork from './data/alumni_network.json';


// Define enums for categorized fields
enum RelationType {
  Executive = "executive",
  BoardMember = "board_member",
  Investor = "investor",
  Advisor = "advisor",
}

enum OrgCountryCode {
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
interface AlumniNetwork {
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

// Function to get data for a target organisation
function getData(target_org: string): AlumniNetwork[] {
  console.log(target_org)

  // Map the imported JSON to the AlumniNetwork type, converting enum strings to actual enums
  return alumniNetwork.map(entry => ({
    ...entry,
    relationType: RelationType[entry.relationType as keyof typeof RelationType],
    orgCountryCode: OrgCountryCode[entry.orgCountryCode as keyof typeof OrgCountryCode],
    foundedOn: entry.foundedOn.toString(), // Convert foundedOn to string if necessary
  }));
}

console.log(getData('PayPal'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
