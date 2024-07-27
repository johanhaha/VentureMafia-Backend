# Node.js API Documentation

## Overview

This Node.js API provides endpoints to retrieve information for Venture Mafia about organisations, their alumni, subsequent organisations, and the relationships between these entities. The application is structured using Express for routing and PostgreSQL for database interactions.

## Project Structure

- `app.js`: Main entry point of the application.
- `controllers.js`: Contains controller functions that handle HTTP requests and responses.
- `routes.js`: Defines the API endpoints and associates them with the appropriate controller functions.
- `services.js`: Contains service functions that interact with the database and process data.
- `db.js`: Database configuration and connection setup.
- `columnMapping.js`: Maps database column names to response object keys to serve frontend structure.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd venture_mafia
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the PostgreSQL database and update the database configuration in `db.js`.

### Running the Application

Start the backend-server:

```bash
cd venture_mafia_backend
npm start
```

Start the web app:

```bash
cd venture_mafia
npm start
```

The APIs will be running on `http://localhost:3000`.
The web app will be running on `http://localhost:3001`.

## API Endpoints

### 1. Get Target Organisation Information

- **Endpoint**: `/target_org/:uuid`
- **Method**: GET
- **Description**: Retrieves information about the target organisation based on the provided UUID.
- **Response**:
  - `message`: Information message
  - `data`: Organisation details or an error message
    - Returned columns:
      - `orgUuid`: Organisation UUID
      - `orgName`: Organisation name
      - `orgCountryCode`: 3 character country code of the organisation
      - `orgRegion`: Organisation HQ region
      - `orgCity`: Organisation HQ city
      - `shortDescription`: Organisation short description
      - `totalFundingUsd`: Total amount of funding in USD
      - `foundedOn`: Date when the organisation was founded
      - `orgLogoUrl`: URL for organisation logo
      - `exitType`: Type of exit for the organisation (ex. acquisition, IPO)
      - `exitDate`: Date of the exit
      - `exitValuation`: Valuation at exit
      - `acquirerUuid`: UUID of the acquirerer organisation
      - `acquirerName`: Name of the acquirer organisation
      - `acquisitionType`: Type of acquistion (ex. acquisition, acqui-hire, LBO)

### 2. Get Alumni Information

- **Endpoint**: `/alumni_info/:uuid`
- **Method**: GET
- **Description**: Retrieves information about alumni associated with the target organisation based on the provided UUID.
- **Response**:
  - `message`: Information message
  - `data`: List of alumni details or an error message
  - Returned columns:
    - `personUuid`: Person UUID
    - `personName`: Person name
    - `jobTitle`: Person job title
    - `jobType`: Person job type (ex. executive, board member, investor)
    - `startedOn`: Date when persons tarted at organisation
    - `endedOn`: Date when persons ended at organisation
    - `personLogoUrl`: URL to person profile picture

### 3. Get Subsequent Organisations Information

- **Endpoint**: `/subsequent_orgs_info/:uuid`
- **Method**: GET
- **Description**: Retrieves information about all subsequent organisations where alumni of the target organisation have worked, based on the provided target organisation UUID.
- **Response**:
  - `message`: Information message
  - `data`: List of subsequent organisations details or an error message
  - Returned columns:
    - `orgUuid`: Organisation UUID
    - `orgName`: Organisation name
    - `orgCountryCode`: 3 character country code of the organisation
    - `orgRegion`: Organisation HQ region
    - `orgCity`: Organisation HQ city
    - `shortDescription`: Organisation short description
    - `totalFundingUsd`: Total amount of funding in USD
    - `foundedOn`: Date when the organisation was founded
    - `orgLogoUrl`: URL for organisation logo
    - `exitType`: Type of exit for the organisation (ex. acquisition, IPO)
    - `exitDate`: Date of the exit
    - `exitValuation`: Valuation at exit
    - `acquirerUuid`: UUID of the acquirerer organisation
    - `acquirerName`: Name of the acquirer organisation
    - `acquisitionType`: Type of acquistion (ex. acquisition, acqui-hire, LBO)

### 4. Get Relations

- **Endpoint**: `/relations/:uuid`
- **Method**: GET
- **Description**: Retrieves relations between alumni and subsequent organisations for the target organisation based on the provided target organisation UUID.
- **Response**:
  - `message`: Information message
  - `data`: List of relations or an error message
  - Returned columns:
    - `personUuid`: Person UUID
    - `orgUuid`: Subsequent organisation UUID
    - `relationType`: Relationship type between person and subsequent organisation (ex. executive, investor, board member, advisor)
    - `jobTitleSubsequent`: Person job title at subsequent company

## Database Configuration

### db.js

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  user: "your_username",
  host: "your_host",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

## Column Mapping

### columnMapping.js

```javascript
const targetOrgInfoColumnMapping = {
  db_column1: "mapped_column1",
  db_column2: "mapped_column2",
  // Add other column mappings
};

const alumniInfoColumnMapping = {
  db_column1: "mapped_column1",
  db_column2: "mapped_column2",
  // Add other column mappings
};

const subsequentOrgsInfoColumnMapping = {
  db_column1: "mapped_column1",
  db_column2: "mapped_column2",
  // Add other column mappings
};

const relationsColumnMapping = {
  db_column1: "mapped_column1",
  db_column2: "mapped_column2",
  // Add other column mappings
};

module.exports = {
  targetOrgInfoColumnMapping,
  alumniInfoColumnMapping,
  subsequentOrgsInfoColumnMapping,
  relationsColumnMapping,
};
```

# Database Setup

```SQL
CREATE TABLE alumni_master (
    record_uuid UUID PRIMARY KEY,
    person_uuid UUID,
    org_uuid_target UUID REFERENCES orgs_info(org_uuid),
    started_on_target DATE,
    ended_on_target DATE,
    job_title_target VARCHAR(255),
    job_type_target VARCHAR(255),
    org_name_target VARCHAR(255),
    org_country_code_target CHAR(3),
    org_city_target VARCHAR(255),
    founded_on_target DATE,
    person_name VARCHAR(255),
    person_logo_url TEXT,
    org_uuid_subsequent UUID,
    started_on_subsequent DATE,
    ended_on_subsequent DATE,
    job_title_subsequent VARCHAR(255),
    relation_type VARCHAR(255),
    org_name_subsequent VARCHAR(255),
    org_country_code_subsequent CHAR(3),
    org_city_subsequent VARCHAR(255),
    founded_on_subsequent DATE,
    short_description_subsequent TEXT,
    total_funding_usd_subsequent BIGINT,
    org_logo_url_subsequent TEXT,
    acquirer_uuid_subsequent UUID,
    exit_type_subsequent VARCHAR(11),
    acquirer_name_subsequent VARCHAR(255),
    exit_date_subsequent DATE,
    acquisition_type_subsequent VARCHAR(17),
    exit_valuation_subsequent BIGINT
);

CREATE TABLE orgs_info (
    org_uuid UUID PRIMARY KEY,
    org_name VARCHAR(255),
    org_country_code CHAR(3),
    org_region VARCHAR(255),
    org_city VARCHAR(255),
    short_description TEXT,
    total_funding_usd BIGINT,
    founded_on DATE,
    org_logo_url TEXT,
    acquirer_uuid UUID,
    exit_type VARCHAR(11),
    acquirer_name VARCHAR(255),
    exit_date DATE,
    acquisition_type VARCHAR(17),
    exit_valuation BIGINT
);

\COPY orgs_info FROM './targetOrgs_full.csv' DELIMITER ',' CSV HEADER;

\COPY alumni_master FROM './alumni_master_full.csv' DELIMITER ',' CSV HEADER;

CREATE USER venture_mafia_api PASSWORD 'aPiPAss221'
```

To clean database:

```SQL
TRUNCATE TABLE orgs_info CASCADE;
```