const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const utilRouter = require('./src/routes/utilRouter');

app.use('/api',utilRouter);
// app.use('/api/companies',companiesRouter);

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});