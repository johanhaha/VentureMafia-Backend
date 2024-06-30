const client = require("./db");
const {
  targetOrgInfoColumnMapping,
  alumniInfoColumnMapping,
  subsequentOrgsInfoColumnMapping,
  relationsColumnMapping,
} = require("./columnMapping");

const mapColumns = (row, columnMapping) => {
  const mappedData = {};
  for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
    if (row[dbColumn] !== undefined) {
      mappedData[mappedColumn] = row[dbColumn];
    }
  }
  return mappedData;
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
  getTargetOrgInfo,
  getAlumniInfo,
  getSubsequentOrgsInfo,
  getRelations,
};
