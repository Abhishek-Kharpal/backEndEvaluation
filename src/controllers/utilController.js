const utilService = require('../services/utilService');

exports.createCompanies = async (req,res)=>{
  const companies=await utilService.saveCompanies(req.body);
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const basicCompany = await utilService.saveCompanyDetails(company);
    const instanceOfCompany=await utilService.getPerformanceIndex(company.sectorName,company.companyId);
    companies[i] = instanceOfCompany;
  }
  res.status(201).json(companies);
};