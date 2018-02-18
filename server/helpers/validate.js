const { Validator } = require('jsonschema');
const validator = new Validator();

function getValidationErrors(data, scheme) {
    const validationResult = validator.validate(data, scheme);
    if (validationResult.valid) {
        return [];
    }
    return validationResult.errors.map(({ property, schema }) => {
        return {
            property,
            description: schema.description,
        };
    });
}

module.exports = {
    getValidationErrors,
};
