const Validator = require('validatorjs');
const Models = require("../models");
const ObjectId = require('mongodb').ObjectID;

Validator.registerAsync('exist', function (value, attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');

    //split table and column
    let attArr = attribute.split(",");

    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;

    //define custom error message
    let msg = (column == "username") ? `${column} has already been taken` : `${column} already exist`
    //check if incoming value already exists in the database
    Models[table].valueExists({ [column]: value }).then((result) => {
        if (result) {
            passes(false, msg); // return false if value exists
            return;
        }
        passes();
    })
});

Validator.registerAsync('validate_id', function (value, attribute, req, passes) {
    //define custom error message
    let msg = `${attribute} is invalid`
    //check if incoming value already exists in the database
    try {
        var result = new ObjectId(value).toString() === value;

        if (!result) {
            passes(false, msg); // return false if value exists
            return;
        }
        passes();
    } catch {
        passes(false, msg); // return false if value exists
        return;
    }

});

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages)
    // validation.test(() => callback(null, true), () => callback(validation.errors, false));
    validation.passes(() => callback(null, true));

    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
