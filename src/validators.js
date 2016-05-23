module.exports = exports = {};

/**
 * Checks if input is a number
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.number = function (value) {
  return !isNaN(value);
}

/**
 * Checks if input is either "true" or "false" as a string
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.boolean = function (value) {
  return exports.string(value) && /^false$|^true$/.test(value);
}

/**
 * Checks if input is a string
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.string = function (value) {
  return typeof value === "string";
}

/**
 * Checks if input is a number without decimals
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.integer = function (value) {
  return !isNaN(value) && isFinite(value);
}

/**
 * Checks if input is a number with decimals
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.float = function (value) {
  return !isNaN(value) && !isFinite(value);
}

/**
 * Checks if input is a string and contains only alphanumeric characters
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.alphanumeric = function (value) {
  return exports.string(value) && /^[a-zA-Z0-9]*$/.test(value);
}


/**
 * an unneccesarily comprehensive email regex
 */
var emailRegex = /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

/**
 * Checks if input is an email address
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.email = function (value) {
  return exports.string(value) && exports.maxlength(value, 254) && emailRegex.test(value);
}

/**
 * Checks if input is defined
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.defined = function (value) {
  return value !== undefined && typeof value !== "undefined";
}

/**
 * Checks if value is defined and not empty
 * @param value - Field value
 * @returns {boolean} - Result
 */
exports.required = function (value) {
  return exports.defined(value) && value.toString().trim() !== "";
}

/**
 * Checks if value is a number within a range defined as an array
 * @param value - Field value
 * @param {number[]} range - Range array
 * @param {number} range[0] - Minimum value
 * @param {number} range[1] - Maximum value
 * @returns {boolean} - Result
 */
exports.range = function (value, range) {
  return !isNaN(value) && value >= range[0] && value <= range[1];
}

/**
 * Checks if value is a number more than or equal to the min setpoint
 * @param value - Field value
 * @param {number} min - Minimum value
 * @returns {boolean} - Result
 */
exports.min = function (value, min) {
  return !isNaN(value) && value >= min;
}

/**
 * Checks if value is a number less than or equal to the max setpoint
 * @param value - Field value
 * @param {number} max - Maximum value
 * @returns {boolean} - Result
 */
exports.max = function (value, max) {
  return !isNaN(value) && value <= max;
}

/**
 * Checks if value as a string has a length more than or equal to the min setpoint
 * @param value - Field value
 * @param {number} - Minimum length
 * @returns {boolean} - Result
 */
exports.minlength = function (value, minlength) {
  return exports.defined(value) && value.toString().length >= minlength;
}
exports.minLength = exports.minlength;

/**
 * Checks if value as a string has a length less than or equal to the max setpoint
 * @param value - Field value
 * @param {number} - Maximum length
 * @returns {boolean} - Result
 */
exports.maxlength = function (value, maxlength) {
  return exports.defined(value) && value.toString().length <= maxlength;
}
exports.maxLength = exports.maxlength;

/**
 * Checks if value as a string has a length equal to the setpoint
 * @param value - Field value
 * @param {number} length - Fixed length
 * @returns {boolean} - Result
 */
exports.length = function (value, length) {
  return exports.defined(value) && value.toString().length === length;
}

/**
 * Checks if input matches a regex
 * @param value - Field value
 * @param {RegExp} regex - Regex to match
 * @returns {boolean} - Result
 */
exports.regex = function (value, regex) {
  return exports.defined(value) && regex.test(value);
}
