const Consultant = require('../models/consultantModel');

const editProfile = (req, res, next) => {
    Consultant.findOne({ user_id: req.params.id }).then((consultant) => {
        consultant.first_name = req.body.first_name === undefined ? consultant.first_name : req.body.first_name;
        consultant.last_name = req.body.last_name === undefined ? consultant.last_name : req.body.last_name;
        consultant.display_picture = req.body.display_picture === undefined ? consultant.display_picture : req.body.display_picture;
        consultant.phone_no = req.body.phone_no === undefined ? consultant.phone_no : req.body.phone_no;
        consultant.address = req.body.address === undefined ? consultant.address : req.body.address;
        consultant.active_days = req.body.active_days === undefined ? consultant.active_days : req.body.active_days;
        consultant.profile_built = true;
        // start_time: req.body.start_time === undefined ? consultant.start_time : req.body.start_time,
        // end_time: req.body.end_time === undefined ? consultant.end_time : req.body.end_time,

        consultant.save().then((consultant) => {
            res.json(consultant);
        }).catch((err) => next(err));
    }).catch((err) => next(err));
}

const getProfile = (req, res, next) => {
    Consultant.findOne({ user_id: req.params.id }).then((consultant) => {
        if (consultant === null) {
            return res.status(404).json({
                error: true,
                msg: 'Requested resource does not exist'
            });
        }
        console.log(consultant.first_name);
        res.status(200).json(consultant);
    }).catch((err) => next(err));
}

const getAllProfiles = (req, res, next) => {
    Consultant.find({ profile_built: true }).then((consultants) => {
        console.log(consultants);
        res.status(200).json(consultants);
    }).catch((err) => next(err));
}

module.exports = {
    editProfile,
    getProfile,
    getAllProfiles,
}