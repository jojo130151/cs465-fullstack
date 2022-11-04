/* GET Homepage */
const index = (req, res) => {
    pageTitle = process.env.npm_package_description;
    res.render('index', { title: pageTitle });
};
module.exports = {
    index
};