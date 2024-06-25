const fs = require('fs').promises;
const path = require('path');

const getTargetOrgInfo = async (uuid) => {
  try {
    const filePath = path.join(__dirname, '../data', `targetOrg_${uuid}.json`);
    console.log(`Reading file from path: ${filePath}`);
    const data = await fs.readFile(filePath, 'utf8');
    return { message: `Information for target organisation with UUID: ${uuid}`, data: JSON.parse(data) };
  } catch (error) {
    console.error('There has been a problem with reading the file:', error);
    return { error: 'Failed to fetch data' };
  }
};

const getAlumniInfo = async (uuid) => {
  try {
    const filePath = path.join(__dirname, '../data', `alumniInfo_${uuid}.json`);
    console.log(`Reading file from path: ${filePath}`);
    const data = await fs.readFile(filePath, 'utf8');
    return { message: `Alumni information for target organisation with UUID: ${uuid}`, data: JSON.parse(data) };
  } catch (error) {
    console.error('There has been a problem with reading the file:', error);
    return { error: 'Failed to fetch data' };
  }
};

const getSubsequentOrgsInfo = async (uuid) => {
  try {
    const filePath = path.join(__dirname, '../data', `subsequentOrgsInfo_${uuid}.json`);
    console.log(`Reading file from path: ${filePath}`);
    const data = await fs.readFile(filePath, 'utf8');
    return { message: `Subsequent organisations for alumni of target organisation with UUID: ${uuid}`, data: JSON.parse(data) };
  } catch (error) {
    console.error('There has been a problem with reading the file:', error);
    return { error: 'Failed to fetch data' };
  }
};

const getRelations = async (uuid) => {
  try {
    const filePath = path.join(__dirname, '../data', `relations_${uuid}.json`);
    console.log(`Reading file from path: ${filePath}`);
    const data = await fs.readFile(filePath, 'utf8');
    return { message: `Relations between alumni and subsequent companies for target organisation with UUID: ${uuid}`, data: JSON.parse(data) };
  } catch (error) {
    console.error('There has been a problem with reading the file:', error);
    return { error: 'Failed to fetch data' };
  }
};

module.exports = {
  getTargetOrgInfo,
  getAlumniInfo,
  getSubsequentOrgsInfo,
  getRelations
};
