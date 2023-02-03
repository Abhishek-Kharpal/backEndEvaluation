const utilService = require('../services/utilService');

exports.createCompanies = async (req,res)=>{
  const companies=await utilService.saveCompanies(req.body);
  const response = [];
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const basicCompany = await utilService.saveCompanyDetails(company);
    const instanceOfCompany=await utilService.getPerformanceIndex(company.sectorName,company.companyId);
    response.push(instanceOfCompany);
  }
  res.status(201).json(response);
};