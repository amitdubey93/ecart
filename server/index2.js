const app = require('./config/express');
const config = require('./config/config');

// initialize mongoose
require('./config/mongoose');

//listen to the port

app.listen(config.port,()=> {
    console.log(`server is running at port ${config.port} (${config.env})`);
});