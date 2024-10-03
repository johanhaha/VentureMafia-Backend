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

Start local database:

`psql -U  johan.torssell -d venture_mafia`

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

CREATE TABLE available_orgs (
    org_uuid UUID PRIMARY KEY,
    org_name VARCHAR(255)
);

\COPY available_orgs FROM './available_orgs.csv' DELIMITER ',' CSV HEADER;

\COPY orgs_info FROM './targetOrgs_full.csv' DELIMITER ',' CSV HEADER;

\COPY alumni_master FROM './alumni_master_full.csv' DELIMITER ',' CSV HEADER;

CREATE USER venture_mafia_api PASSWORD 'aPiPAss221'
```

Clean database: `TRUNCATE TABLE orgs_info CASCADE;`

Remove record: `DELETE FROM available_orgs WHERE org_uuid = '{org_uuid}';`

Add record: `INSERT INTO available_orgs (org_uuid, org_name) VALUES ('{org_uuid}', '{org_name}');`

Add person to existing organisation (one experience at a time): `insert into alumni_master (record_uuid,person_uuid,org_uuid_target,started_on_target,ended_on_target,job_title_target,job_type_target,org_name_target,org_country_code_target,org_city_target,founded_on_target,person_name,person_logo_url,org_uuid_subsequent,started_on_subsequent,ended_on_subsequent,job_title_subsequent,relation_type,org_name_subsequent,org_country_code_subsequent,org_city_subsequent,founded_on_subsequent,short_description_subsequent,total_funding_usd_subsequent,org_logo_url_subsequent,acquirer_uuid_subsequent,exit_type_subsequent,acquirer_name_subsequent,exit_date_subsequent,acquisition_type_subsequent,exit_valuation_subsequent) values ('{record_uuid}','{person_uuid}','{org_uuid_target}','{started_on_target}','{ended_on_target}','{job_title_target}','{job_type_target}','{org_name_target}','{org_country_code_target}','{org_city_target}','{founded_on_target}','{person_name}','{person_logo_url}','{org_uuid_subsequent}','{started_on_subsequent}',{ended_on_subsequent},'{job_title_subsequent}','{relation_type}','{org_name_subsequent}','{org_country_code_subsequent}','{org_city_subsequent}','{founded_on_subsequent}','{short_description_subsequent}',{total_funding_usd_subsequent},'{org_logo_url_subsequent}','{acquirer_uuid_subsequent}',{exit_type_subsequent},'{acquirer_name_subsequent}',{exit_date_subsequent},{acquisition_type_subsequent},{exit_valuation_subsequent})`

# Database Analytics


```SQL
-- Unique persons
SELECT COUNT(DISTINCT person_name) AS unique_person_count
FROM alumni_master
WHERE org_name_target = 'iZettle';

-- Unique subsequent companies
SELECT COUNT(DISTINCT org_name_subsequent) AS unique_org_count
FROM alumni_master
WHERE org_name_target = 'iZettle';

-- Total funding subsequent companies
SELECT SUM(total_funding_usd_subsequent) AS total_funding_sum
FROM (
    SELECT DISTINCT org_uuid_subsequent, total_funding_usd_subsequent
    FROM alumni_master
    WHERE org_name_target = 'iZettle'
) AS unique_orgs;

-- Most well funded subsequent companies
SELECT DISTINCT(org_name_subsequent), total_funding_usd_subsequent
FROM alumni_master
WHERE org_name_target = 'iZettle' AND total_funding_usd_subsequent IS NOT NULL
ORDER BY total_funding_usd_subsequent DESC
LIMIT 10;

-- Exit types subsequent companies
SELECT exit_type_subsequent, COUNT(*) AS exit_type_count
FROM (
    SELECT DISTINCT org_uuid_subsequent, exit_type_subsequent
    FROM alumni_master
    WHERE org_name_target = 'iZettle'
) AS unique_orgs
GROUP BY exit_type_subsequent;

-- Total exit value subsequent companies
SELECT SUM(exit_valuation_subsequent) AS total_exit_sum
FROM (
    SELECT DISTINCT org_uuid_subsequent, exit_valuation_subsequent
    FROM alumni_master
    WHERE org_name_target = 'iZettle'
) AS unique_orgs;

-- Largest exits subsequent companies
SELECT org_name_subsequent, exit_type_subsequent, exit_valuation_subsequent, exit_date_subsequent, acquirer_name_subsequent
FROM (
    SELECT DISTINCT org_name_subsequent, exit_type_subsequent, exit_valuation_subsequent, exit_date_subsequent, acquirer_name_subsequent
    FROM alumni_master
    WHERE org_name_target = 'Netscape' AND exit_valuation_subsequent IS NOT NULL
) AS unique_orgs
ORDER BY exit_valuation_subsequent DESC;

-- Subsequent engagement count
SELECT 
    person_name, 
    COUNT(DISTINCT org_uuid_subsequent) AS subsequent_engagement_count,
    COUNT(DISTINCT CASE WHEN relation_type = 'executive' THEN org_uuid_subsequent END) AS executive_engagement_count,
    COUNT(DISTINCT CASE WHEN relation_type = 'investor' THEN org_uuid_subsequent END) AS investor_engagement_count,
    COUNT(DISTINCT CASE WHEN relation_type = 'board_member' THEN org_uuid_subsequent END) AS board_member_engagement_count,
    COUNT(DISTINCT CASE WHEN relation_type = 'advisor' THEN org_uuid_subsequent END) AS advisor_engagement_count
FROM alumni_master
WHERE org_name_target = 'iZettle'
GROUP BY person_name
ORDER BY subsequent_engagement_count DESC;

-- Companies with most alumni connected
SELECT org_name_subsequent, COUNT(DISTINCT person_uuid) AS alumni_count
FROM alumni_master
WHERE org_name_target = 'iZettle'
GROUP BY org_name_subsequent
ORDER BY alumni_count DESC
LIMIT 10;
```