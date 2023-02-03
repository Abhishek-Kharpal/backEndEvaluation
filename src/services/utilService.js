const db = require('../../database/models/index');
const getCsv = require('../utils/getCsv');
const getCompany = require('../utils/getCompany');
const getPerformanceData = require('../utils/getScore');

exports.saveCompanies = async ({urlLink})=>{
  const listofCompanies = await getCsv(urlLink);
  const companies = await Promise.all(listofCompanies.map(async (company)=>{
    await db.listOfCompanies.create({
      companyId: company[0],
      sectorName: company[1],
      rank: 100000
    });
    const instanceOfCompany = {
      companyId: company[0],
      sectorName: company[1],
      rank: 100000
    };
    return instanceOfCompany;
  }));
  return companies;
};

exports.saveCompanyDetails = async (company)=>{
  const instanceOfCompany = await getCompany(company.companyId);
  await delete instanceOfCompany.tags;
  await delete instanceOfCompany.id;
  await db.company.create({
    ...instanceOfCompany,
    companyID: company.id,
    score: 0,
    address: ''
  });
  const addCompanyDetails = {
    ...instanceOfCompany,
    companyID: company.id,
    score: 0,
    address: ''
  };
  return addCompanyDetails;
};

exports.getPerformanceIndex = async (sector,id)=>{
  const score = await getPerformanceData(sector,id);
  const finalCompany=await db.company.update({
    score: score
  },
  {
    where: {
      companyId: id
    }
  });
  const instanceOfCompany = {
    ...finalCompany.dataValues
  };
  return instanceOfCompany;
};
