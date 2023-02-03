const db = require('../../database/models/index');
const getCsv = require('../utils/getCsv');
const getCompany = require('../utils/getCompany');
const getPerformanceData = require('../utils/getScore');

exports.saveCompanies = async ({urlLink})=>{
  const listofCompanies = await getCsv(urlLink);
  const companiesCreated = [];
  listofCompanies.forEach(async (company,index)=>{
    if(index===0){
      return;
    }
    const instanceOfCompany=await db.listOfCompanies.create({
      companyId: company[0],
      sectorName: company[1],
      rank: 100000
    });
    await companiesCreated.push(instanceOfCompany);
  });
  return companiesCreated;
};

exports.saveCompanyDetails = async (company)=>{
  const instanceOfCompany = await getCompany(company.companyId);
  await delete instanceOfCompany.tags;
  const addCompanyDetails = await db.company.create({
    ...instanceOfCompany,
    companyID: company.id,
    score: 0
  });
  return addCompanyDetails;
};

exports.getPerformanceIndex = async (sector,id)=>{
  const score = await getPerformanceData(sector,id);
  const company = await db.company.findOne({
    where: {
      companyId: id
    }
  });
  await company.update({
    score: score
  });
  return company;
};
