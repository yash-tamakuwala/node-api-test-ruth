const User = require("../models/users");

module.exports = {
    signup: (req, res) => {
        const objUser = req.body;

        User.create(objUser, (err, small) => {
            if (err) {
                return res.status(412).send({
                    success: false,
                    message: err
                })
            }
            return res.status(200).json({
                success: true,
                message: "signup successful"
            });
        });
    }
}
