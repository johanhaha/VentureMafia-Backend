const services = require('../services/services');

exports.getAvailableOrgs = async (req, res) => {
  const data = await services.getAvailableOrgs();
  res.json(data);
};

exports.getTargetOrgInfo = async (req, res) => {
  const uuid = req.params.uuid;
  const data = await services.getTargetOrgInfo(uuid);
  res.json(data);
};

exports.getAlumniInfo = async (req, res) => {
  const uuid = req.params.uuid;
  const data = await services.getAlumniInfo(uuid);
  res.json(data);
};

exports.getSubsequentOrgsInfo = async (req, res) => {
  const uuid = req.params.uuid;
  const data = await services.getSubsequentOrgsInfo(uuid);
  res.json(data);
};

exports.getRelations = async (req, res) => {
  const uuid = req.params.uuid;
  const data = await services.getRelations(uuid);
  res.json(data);
};
