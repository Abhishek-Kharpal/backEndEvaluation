const getCsv = require('../../src/utils/getCsv');
describe('getCsv',()=>{
  it('should return a message containing error code when url is bad',async ()=>{
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});
    await getCsv('http://httpstat.us/404');
    expect(consoleSpy).toHaveBeenCalledWith(new Error('Error code 404'));
  });
});