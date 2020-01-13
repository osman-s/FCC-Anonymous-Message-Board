const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

module.exports = function(app) {
  app.use(helmet());
  app.use(compression());
  app.use(cors());
};

// app.use(helmet.frameguard({action: 'deny'}));
// app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
// var ninetyDaysInSeconds = 90*24*60*60;
// app.use(helmet.hsts({maxAge: ninetyDaysInSeconds}))
// app.use(helmet.ieNoOpen())
// app.use(helmet.xssFilter())
// app.use(helmet.noSniff())
// app.use(helmet.dnsPrefetchControl())
// app.use(helmet.noCache())
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", 'trusted-cdn.com']
//   }
// }));
