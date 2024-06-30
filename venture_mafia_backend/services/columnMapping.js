const targetOrgInfoColumnMapping = {
    'org_uuid': 'orgUuid',
    'org_name': 'orgName',
    'org_country_code': 'orgCountryCode',
    'org_region': 'orgRegion',
    'org_city': 'orgCity',
    'short_description': 'shortDescription',
    'total_funding_usd': 'totalFundingUsd',
    'founded_on': 'foundedOn',
    'org_logo_url': 'orgLogoUrl',
    'exit_type': 'exitType',
    'exit_date': 'exitDate',
    'exit_valuation': 'exitValuation',
    'acquirer_uuid': 'acquirerUuid',
    'acquirer_name': 'acquirerName',
    'acquisition_type': 'acquisitionType'
};

const alumniInfoColumnMapping = {
    'person_uuid': 'personUuid',
    'person_name': 'personName',
    'job_title_target': 'jobTitle',
    'job_type_target': 'jobType',
    'started_on_target': 'startedOn',
    'ended_on_target': 'endedOn',
    'person_logo_url': 'personLogoUrl'
};

const subsequentOrgsInfoColumnMapping = {
    'org_uuid_subsequent': 'orgUuid',
    'org_name_subsequent': 'orgName',
    'org_country_code_subsequent': 'orgCountryCode',
    'org_city_subsequent': 'orgCity',
    'short_description_subsequent': 'shortDescription',
    'total_funding_usd_subsequent': 'totalFundingUsd',
    'founded_on_subsequent': 'foundedOn',
    'org_logo_url_subsequent': 'orgLogoUrl',
    'exit_type_subsequent': 'exitType',
    'exit_date_subsequent': 'exitDate',
    'exit_valuation_subsequent': 'exitValuation',
    'acquirer_uuid_subsequent': 'acquirerUuid',
    'acquirer_name_subsequent': 'acquirerName',
    'acquisition_type_subsequent': 'acquisitionType'
};

const relationsColumnMapping = {
    'person_uuid': 'personUuid',
    'org_uuid_subsequent': 'orgUuid',
    'relation_type': 'relationType',
    'job_title_subsequent': 'jobTitleSubsequent'
};

module.exports = {
    targetOrgInfoColumnMapping,
    alumniInfoColumnMapping,
    subsequentOrgsInfoColumnMapping,
    relationsColumnMapping
};