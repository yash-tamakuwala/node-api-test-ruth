const Posts = require("../models/posts");
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    createpost: (req, res) => {
        const objPost = req.body;

        Posts.create(objPost, (err, resData) => {
            if (err) {
                return res.status(412).send({
                    success: false,
                    message: err
                })
            }
            return res.status(200).json({
                success: true,
                message: "createpost successful"
            });
        });
    },

    editpost: (req, res) => {
        const objPost = req.body;

        Posts.updateOne({
            _id: ObjectId(objPost._id),
        }, {
            $set: objPost,
        }, (err, resData) => {
            if (err) {
                return res.status(412).send({
                    success: false,
                    message: err
                })
            }
            return res.status(200).json({
                success: true,
                message: "editpost successful"
            });
        });
    },

    deletepost: (req, res) => {
        Posts.deleteOne({
            _id: ObjectId(req.body._id)
        }, (err, resData) => {
            if (err) {
                return res.status(412).send({
                    success: false,
                    message: err
                })
            }
            return res.status(200).json({
                success: true,
                message: "deletepost successful"
            });
        });
    },

    ratingpost: (req, res) => {
        const objPostRating = req.body;

        Posts.findOne({
            'ratings.userid': objPostRating.objRating.userid,
            '_id': ObjectId(objPostRating.postid)
        }, (err, resData) => {
            if (err) {
                return res.status(412).send({
                    success: false,
                    message: err
                })
            }

            if (resData != null) {
                return res.status(412).send({
                    success: false,
                    message: "You have already rated for this post."
                })
            } else {
                Posts.updateOne({
                    _id: objPostRating.postid
                }, {
                    $addToSet: {
                        ratings: objPostRating.objRating
                    }
                }, (err, resData) => {
                    if (err) {
                        return res.status(412).send({
                            success: false,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: true,
                        message: "ratingpost successful"
                    });
                });
            }

        })

    },

    getallpost: (req, res) => {
        Posts.aggregate([
            { $addFields: { ratingAvg: { $avg: "$ratings.rating" } } }
        ], (err, resData) => {
            if (err) {
                return res.status(412).send({
                    success: false,
                    message: err
                })
            }

            return res.status(200).json({
                success: true,
                message: "ratingpost successful",
                data: resData
            });
        })
    }
}
