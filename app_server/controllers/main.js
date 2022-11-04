/* GET Homepage */
const index = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Main';
    res.render('index', { title: pageTitle });
};
module.exports = {
    index
};