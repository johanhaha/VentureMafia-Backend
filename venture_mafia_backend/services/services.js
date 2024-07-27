const client = require("./db");
const {
  targetOrgInfoColumnMapping,
  alumniInfoColumnMapping,
  subsequentOrgsInfoColumnMapping,
  relationsColumnMapping,
} = require("./columnMapping");

const options = [
  { value: "96ab87ca-00b5-2ebc-f218-86262954e320", label: "PayPal" },
  { value: "a367b036-5952-5435-7541-ad7ee8869e24", label: "Tesla" },
  { value: "df662812-7f97-0b43-9d3e-12f64f504fbb", label: "Meta" },
  { value: "022417b5-4980-6c54-0f3c-6736bbbb1a5e", label: "Spotify" },
  { value: "2cc3a5de-2303-aa00-cd1a-50bd96420392", label: "Klarna" },
  { value: "34035c51-8f16-4836-8f02-103392479a92", label: "Northvolt" },
  { value: "7b74b50c-4468-b7ec-2ff9-bf3286a399c9", label: "Kry" },
  { value: "d39bb6dc-582d-4878-a224-005497e03766", label: "Voi" },
  { value: "439d3478-40fa-e6bc-9b71-f1bfa8296f52", label: "Epidemic Sound" },
  { value: "6093de34-5382-f34c-a207-efa92470048b", label: "iZettle" },
  { value: "fd80725f-53fc-7009-9878-aeecf1e9ffbb", label: "Microsoft" },
  { value: "6acfa7da-1dbd-936e-d985-cf07a1b27711", label: "Google" },
  { value: "eef9eab2-4c50-f0a3-12b8-ce721fa2cc81", label: "YouTube" },
  { value: "cc68526b-b2d7-4f7f-cfa7-d93b23716027", label: "Netscape" },
  { value: "2c23e7ad-4441-5320-fdf9-5aa7007fec0b", label: "PwC" },
  { value: "b3a7efa7-e3d3-2d4c-962c-b9fdb1da496f", label: "Opsware" },
  { value: "1eb37109-3b93-01a9-177f-fee2cb1bfcdc", label: "Uber" },
  { value: "9a0e860a-7743-28e2-05c0-2b08646d0fe1", label: "Skype" },
  { value: "988b8953-a085-8de4-babb-fae5bb895761", label: "Foodpanda" },
  { value: "643d60b4-bfa8-ee61-3316-5af0d8325f33", label: "Excite" },
  { value: "0d5171b3-68b3-37c3-cb50-8cd8ccb8930b", label: "Accenture" },
  { value: "4b724583-6013-30ca-88b0-35e5c6e71ad5", label: "Epinions" },
  { value: "297df5af-da41-a709-7df2-7e7f04e53454", label: "Zynga" },
  { value: "e56b0ceb-bb30-bbec-805e-d5dc7412dcb1", label: "eBay" },
  { value: "a6b663d3-586a-ad04-924c-1ca87763b2fb", label: "FreeCharge" },
  { value: "08639f0b-56fd-997f-5c9d-0ca3b5d9672b", label: "Justin.tv" },
  { value: "1966bb69-4bc9-1077-c181-fe3d67509160", label: "Pobts" },
  { value: "86da6213-5b43-6419-4047-472102ccf66f", label: "LinkedIn" },
  { value: "f5c477fa-6e8c-3d64-4f2d-3603e5cc3340", label: "Salesforce" },
  { value: "31fc3998-a1f1-2e5b-6358-f8d068fa9f71", label: "Delivery Hero" },
  { value: "6f7ea63a-f820-733a-702b-82e75d0ac15f", label: "Wimdu" },
  { value: "70756e51-3859-a1ae-8edb-d7eeaf5ed342", label: "Xing" },
  { value: "ffd3825c-ac83-fa1e-0d5b-538c08904cb6", label: "Wunderlist" },
  { value: "04f52814-77e2-b2c9-2d9a-4299dbb62455", label: "Rocket Internet" },
  { value: "dd92791e-2081-c3fc-f0a1-f1e2633dadcd", label: "dreamfab" },
  {
    value: "a6f5492b-1215-6c03-205f-1efb9913f2e2",
    label: "Infineon Technologies",
  },
  { value: "36027bbe-4f12-f224-f90f-2ff31c0294af", label: "Team Global" },
  { value: "0a9eae4d-a269-646c-0cad-cf5b559b74b6", label: "Zalando" },
  { value: "251270ba-b3b8-6135-ed82-6657e1c8b046", label: "N26" },
  { value: "d6862036-0c09-5ec5-cfc7-ea48d8de59da", label: "Datadog" },
  { value: "e7e3805e-3997-6000-a068-b667c249dbc5", label: "Alcatel-Lucent" },
  { value: "24aeb98f-6cd3-f55b-1575-72eec5ba2403", label: "Amen.fr" },
  { value: "1e8e57cf-9c81-a082-7512-723473e81dbb", label: "Veepee" },
  { value: "1bbcec66-242d-4650-b582-47305d6f3d87", label: "folk" },
  { value: "b485a6e1-2cc8-3388-d949-240863fdccf8", label: "KelDoc" },
];

const mapColumns = (row, columnMapping) => {
  const mappedData = {};
  for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
    if (row[dbColumn] !== undefined) {
      mappedData[mappedColumn] = row[dbColumn];
    }
  }
  return mappedData;
};

const getAvailableOrgs = async () => {
  try {
    const mappedData = options;

    return {
      message: `Available organisations in Venture Mafia`,
      data: mappedData,
    };
  } catch (error) {
    console.error(
      "There has been a problem with fetching data from the database:",
      error
    );
    return { error: "Failed to fetch data" };
  }
};

const getTargetOrgInfo = async (uuid) => {
  try {
    const query = "SELECT * FROM orgs_info WHERE org_uuid = $1";
    const values = [uuid];

    const res = await client.query(query, values);

    if (res.rows.length === 0) {
      return {
        error: `No information found for target organisation with UUID: ${uuid}`,
      };
    }

    const mappedData = res.rows.map((row) =>
      mapColumns(row, targetOrgInfoColumnMapping)
    );
    return {
      message: `Information for target organisation with UUID: ${uuid}`,
      data: mappedData[0],
    };
  } catch (error) {
    console.error(
      "There has been a problem with fetching data from the database:",
      error
    );
    return { error: "Failed to fetch data" };
  }
};

const getAlumniInfo = async (uuid) => {
  try {
    const columns = Object.keys(alumniInfoColumnMapping).join(", ");
    const query = `SELECT DISTINCT ON (person_uuid) ${columns} FROM alumni_master WHERE org_uuid_target = $1`;
    const values = [uuid];

    const res = await client.query(query, values);

    if (res.rows.length === 0) {
      return { error: `No information found for alumni with UUID: ${uuid}` };
    }

    const mappedData = res.rows.map((row) =>
      mapColumns(row, alumniInfoColumnMapping)
    );
    return {
      message: `Alumni information for target organisation with UUID: ${uuid}`,
      data: mappedData,
    };
  } catch (error) {
    console.error(
      "There has been a problem with fetching data from the database:",
      error
    );
    return { error: "Failed to fetch data" };
  }
};

const getSubsequentOrgsInfo = async (uuid) => {
  try {
    const columns = Object.keys(subsequentOrgsInfoColumnMapping).join(", ");
    const query = `SELECT DISTINCT ${columns} FROM alumni_master WHERE org_uuid_target = $1`;
    const values = [uuid];

    const res = await client.query(query, values);

    if (res.rows.length === 0) {
      return {
        error: `No information found for subsequent organisations with UUID: ${uuid}`,
      };
    }

    const mappedData = res.rows.map((row) =>
      mapColumns(row, subsequentOrgsInfoColumnMapping)
    );
    return {
      message: `Subsequent organisations for alumni of target organisation with UUID: ${uuid}`,
      data: mappedData,
    };
  } catch (error) {
    console.error(
      "There has been a problem with fetching data from the database:",
      error
    );
    return { error: "Failed to fetch data" };
  }
};

const getRelations = async (uuid) => {
  try {
    const columns = Object.keys(relationsColumnMapping).join(", ");
    const query = `SELECT DISTINCT ${columns} FROM alumni_master WHERE org_uuid_target = $1`;
    const values = [uuid];

    const res = await client.query(query, values);

    if (res.rows.length === 0) {
      return {
        error: `No relations found for target organisation with UUID: ${uuid}`,
      };
    }

    const mappedData = res.rows.map((row) =>
      mapColumns(row, relationsColumnMapping)
    );
    return {
      message: `Relations between alumni and subsequent companies for target organisation with UUID: ${uuid}`,
      data: mappedData,
    };
  } catch (error) {
    console.error(
      "There has been a problem with fetching data from the database:",
      error
    );
    return { error: "Failed to fetch data" };
  }
};

module.exports = {
  getAvailableOrgs,
  getTargetOrgInfo,
  getAlumniInfo,
  getSubsequentOrgsInfo,
  getRelations,
};
