const mongoose = require('mongoose'); //.set('debug', true);
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips - list all the trips
const tripsList = async (req, res) => {
    Trip
        .find({}) // Empty filter for all trips 
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    Trip
        .find({ 'code': req.params.tripCode }) 
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

// POST: /trips - Add a trip
const tripsAddTrip = async (req, res) => {
    // Console messages for testing and debugging
    console.log("Inside tripsAddTrip");
    console.log(req);
    // getUser is a wrapper for authentication
    getUser(req, res,
        (req, res) => {
            Trip
                .create({
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                (err, trip) => {
                    if (err) {
                        return res
                            .status(400) // bad request, invalid content
                            .json(err);
                    } else {
                        return res
                            .status(201) // created
                            .json(trip);
                    }
                });
        }
    );
}




// PUT: /trips/:tripCode - Updates the information of a single trip
const tripsUpdateTrip = async (req, res) => {
    // Console messages for testing and debugging
    console.log("Inside tripsUpdateTrip");
    console.log(req.auth.email)
    // getUser is a wrapper for authentication
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({'code': req.params.tripCode },{ 
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error 
                        .json(err);
                });
        }
    );
}

const getUser = (req, res, callback) => {
    // Console message for debugging and testing
    console.log(req.auth);
    // If there is a auth section with an email variable inside, find the user associated with that email
    if (req.auth && req.auth.email) {
        User
            .findOne({ email: req.auth.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err) {
                    console.log(err);
                    return res 
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};
 

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};
