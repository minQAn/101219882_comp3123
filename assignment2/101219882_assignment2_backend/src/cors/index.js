const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,  // Some lagacy browswers (IE11, various SamrtTVs) choke on 204
}


module.exports = cors(corsOptions);