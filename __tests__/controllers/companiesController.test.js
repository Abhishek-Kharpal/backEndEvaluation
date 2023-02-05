const utilController = require('../../src/controllers/utilController');
const utilService = require('../../src/services/utilService');
describe('utilController', () => {

  describe('createCompanies',()=>{
    it('should create a list of companies',async ()=>{
      jest.spyOn(utilService,'saveCompanies').mockResolvedValue([
        {
          'companyId': '1',
          'sectorName': 'Consulting',
          'rank': 10000
        }
      ]);
      jest.spyOn(utilService,'saveCompanyDetails').mockResolvedValue({
        'companyId': '1',
        'score': 0,
        'address': ''
      });
      jest.spyOn(utilService,'getPerformanceIndex').mockResolvedValue({
        'companyId': '1',
        'score': 10
      });
      const mockRes = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      };
      await utilController.createCompanies({
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      }, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.status().json).toHaveBeenCalledWith([{
        'companyId': '1',
        'score': 10
      }]);
    });
  });

});