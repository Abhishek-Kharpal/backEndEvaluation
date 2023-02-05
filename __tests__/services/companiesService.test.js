const getCsv = require('../../src/utils/getCsv');
const db = require('../../database/models/index');
const utilService = require('../../src/services/utilService');
const getCompany = require('../../src/utils/getCompany');
const getPerformanceData = require('../../src/utils/getScore');
describe('utilService',()=>{

  describe('saveCompanies',()=>{
    it('should return the list of companies saved in current request',async ()=>{
      const getCsvData = {
        'getCsv': getCsv
      };
      jest.spyOn(getCsvData,'getCsv').mockResolvedValue([
        ['1','Consulting']
      ]);
      jest.spyOn(db.listOfCompanies,'create').mockResolvedValue({
        'companyId': '1',
        'sectorName': 'Consulting',
        'rank': 10000
      });
      const companies = await utilService.saveCompanies({
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
      });
      expect(companies).toBeInstanceOf(Array);
    });
  });

  describe('saveCompanyDetails',()=>{
    it('should return the company object',async ()=>{
      const getCompanyData = {
        'getCompany': getCompany
      };
      jest.spyOn(getCompanyData,'getCompany').mockResolvedValue({
        'companyId': '1',
        'score': 0,
        'address': ''
      });
      jest.spyOn(db.company,'create').mockResolvedValue({
        'companyId': '1',
        'score': 0,
        'address': ''
      });
      const company = await utilService.saveCompanyDetails({
        'companyId': '1',
        'score': 0,
        'address': ''
      });
      expect(company).toBeInstanceOf(Object);
    });
  });

  describe('getPerformanceIndex',()=>{
    it('should return company object with the performance index of the company',async ()=>{
      const getPerformance= {
        'getPerformanceData': getPerformanceData
      };  
      jest.spyOn(getPerformance,'getPerformanceData').mockResolvedValue(10);
      jest.spyOn(db.company,'update').mockResolvedValue({
        'companyId': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        'score': 10
      });
      const company = await utilService.getPerformanceIndex('Software','46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc');
      expect(company).toBeInstanceOf(Object);
    });
  });
});
