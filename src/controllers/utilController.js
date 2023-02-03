const utilService = require('../services/utilService');

exports.createCompanies = async (req,res)=>{
  const companies = await utilService.saveCompanies(req.body);
  const companiesWithDetails = [];
  companies.forEach(async (company)=>{
    await console.log(company);
    const basicCompany = await utilService.saveCompanyDetails(company);
    const instanceOfCompany=await utilService.getPerformanceIndex(company.sector,basicCompany.companyId);
    await companiesWithDetails.push(instanceOfCompany);
  });
  res.status(201).json(companiesWithDetails);
};