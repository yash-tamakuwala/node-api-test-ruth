const Validator = require('../helpers/validate');

const signup = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "username": "required|string|exist:User,username",
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const createpost = async (req, res, next) => {
    const validationRule = {
        "userid": "required|string",
        "description": "required|string",
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const editpost = async (req, res, next) => {
    const validationRule = {
        "_id": "required|string|validate_id:_id",
        "description": "required|string",
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const deletepost = async (req, res, next) => {
    const validationRule = {
        "_id": "required|string|validate_id:_id",
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const ratingpost = async (req, res, next) => {
    const validationRule = {
        "postid": "required|string|validate_id:postid",
        'objRating.userid': 'required|string|validate_id:userid',
        'objRating.rating': 'required|integer',
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    signup,
    createpost,
    editpost,
    deletepost,
    ratingpost
};