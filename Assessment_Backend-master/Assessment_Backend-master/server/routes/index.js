const sampleRoute = require('./sampleRoute');

module.exports = (app) => {
    app.use('/api', sampleRoute)
};