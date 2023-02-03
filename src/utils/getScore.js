const getPerformanceData = async (sectorName,id) => {
  const target = `http://54.167.46.10/sector?name=${sectorName}`;
  const response = await fetch(target,{
    method: 'get',
    headers: {
      'content-type': 'application/json'
    }
  });
  const data =await response.json();
  const getScore = (data,id)=>{
    const filterData = data.filter((item)=>item.companyId===id);
    const cpi = parseInt(filterData[0].performanceIndex[0].value);
    const cf = parseInt(filterData[0].performanceIndex[1].value);
    const mau = parseInt(filterData[0].performanceIndex[2].value);
    const roic = parseInt(filterData[0].performanceIndex[3].value);
    const score =parseInt(((cpi*10)+(cf/10000)+(mau*10)+roic)/4);
    return score;
  };
  return getScore(data,id);
};

module.exports = getPerformanceData;