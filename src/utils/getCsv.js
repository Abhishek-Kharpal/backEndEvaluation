const getCsv = async (urlLink) => {
  try {
    const target = urlLink;
    const res = await fetch(target, {
      method: 'get',
      headers: {
        'content-type': 'text/csv'
      }
    });
    if (res.status === 200) {
      const data = await res.text();
      const csvData =[];
      const lines = data.split('\n');
      lines.forEach((line) => {
        const row = line.split(',');
        csvData.push(row);
      });
      return csvData;
    } 
    else 
    {
      throw new Error(`Error code ${res.status}`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getCsv;