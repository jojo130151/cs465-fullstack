const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

/* internal method to render the travel list */
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTiitle = process.env.npm_package_description + ' - Travel';
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database!';
        }
    }
    res.render('travel',
        {
            title: pageTiitle,
            trips: responseBody,
            message
        }
    );
}

/* GET travel list view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    console.info('>> travelController.travelList is calling ' + requestOptions.url);
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );
};



// WAS OPTIONAL -- REVIEW
/* internal method to render the travel list */
/* const renderTravelDetails = (req, res, responseBody) => {
    let message = null;
    let pageTiitle = process.env.npm_package_description + ' - Details';
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No details exist in our database!';
        }
    }
    res.render('details',
        {
            title: pageTiitle,
            trips: responseBody,
            message
        }
    );
} */

/* GET travel details view */
/* const travelDetails = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    console.info('>> travelController.travelDetails is calling ' + requestOptions.url);
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );
}; */






module.exports = {
    travelList
};