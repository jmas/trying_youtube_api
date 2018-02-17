const { Validator } = require('jsonschema');
const validator = new Validator();

function getValidationErrors(data, scheme) {
    const validationResult = validator.validate(data, scheme);
    if (validationResult.valid) {
        return [];
    }
    return validationResult.errors.map(({ argument, message }) => {
        return {
            property: argument,
            message: scheme.properties[argument].description,
        };
    });
}

module.exports = {
    getValidationErrors,
};
