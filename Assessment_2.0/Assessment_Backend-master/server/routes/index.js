const myRoutes = require('./myRoutes');

module.exports = (app) => {
    app.use('/api', myRoutes)
};