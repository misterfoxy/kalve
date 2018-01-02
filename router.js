const Authentication = require('./controllers/authentication');
const ProofRequest = require("./controllers/proofrequest");
const passportService = require("./services/passport.js");
const passport = require("passport");

//ensure passport uses jwt auth, not cookie auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    app.get('/', requireAuth, function( req, res){
        res.send({ message: 'Super secret code is ABC123' });
    });
    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup)
    app.post('/proofrequest', ProofRequest.submitProof);
    
};