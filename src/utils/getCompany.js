const getCompany = async (id) => {
  const target = `http://54.167.46.10/company/${id}`;
  const response = await fetch(target,{
    method: 'get',
    headers: {
      'content-type': 'application/json'
    }
  });
  const data =await response.json();
  return data;
};

module.exports = getCompany;