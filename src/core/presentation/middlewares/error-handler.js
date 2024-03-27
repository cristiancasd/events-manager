"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const __1 = require("../..");
const constants_1 = require("../../shared/constants");
// error handler
const errorHandler = (err, req, res, next) => {
    if (err instanceof __1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(500).send({
        errors: [{ message: constants_1.somethingWrongMessage }]
    });
};
exports.errorHandler = errorHandler;
