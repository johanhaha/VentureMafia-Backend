import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { AlumniNetwork, RelationType, OrgCountryCode } from './interfaces';

import alumniNetworkRaw from './data/alumni_network.json';

// Function to get data for a target organisation
function getData(target_org: string): AlumniNetwork[] {
  console.log(target_org)

  // Map the imported JSON to the AlumniNetwork type, converting enum strings to actual enums
  return alumniNetworkRaw.map(entry => ({
    ...entry,
    relationType: RelationType[entry.relationType as keyof typeof RelationType],
    orgCountryCode: OrgCountryCode[entry.orgCountryCode as keyof typeof OrgCountryCode],
    foundedOn: entry.foundedOn.toString(), // Convert foundedOn to string if necessary
  }));
}

const alumniNetwork = getData('PayPal');

var filtered = alumniNetwork.filter((entry) => entry.personName == 'Elon Musk').map(entry => entry.jobTitle);

console.log(filtered);




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
