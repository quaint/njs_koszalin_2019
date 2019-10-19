const dotenv = require('dotenv');
const _ = require( 'lodash');
const validconfig = dotenv.config({ path: '.env' });

if (validconfig.error) {
  throw 'The environment of file (.env) not found...';
}

const cfg = _.get(validconfig, 'parsed', null);
if (!cfg.PORT) {
  throw 'The environment is invalid ...';
}

