"use strict";

const validators = require("./src/validators");
const EventEmitter = require("events");

module.exports = class Form extends EventEmitter {
  constructor(fields) {
    super();
    this.fields = fields;
    this.validators = Object.assign({}, validators);
    this.result = {};
    this.valid = true;
    return this;
  }

  validator(name, func) {
    this.validators[name] = func;
    return this;
  }

  validate(body, continueOnFail) {
    this.fields.forEach((field) => {
      field.value = field.value || body[field.name];
      this.validateField(field.name, field.value, continueOnFail);
    });

    this.valid ? this.emit("valid", this.result) : this.emit("invalid", this.result);
    return this;
  }

  validateField(name, value, continueOnFail) {
    var field = this.fields.find((field) => {
      return field.name == name;
    });

    field.value = field.value || value;

    var result = this.result[field.name] = {
      valid: true,
      value: field.value,
      succeeded: [],
      failed: []
    }

    const loop = continueOnFail ? Array.prototype.forEach : Array.prototype.some;

    loop.call(Object.keys(field.validators), (validatorName) => {
      const validator = this.validators[validatorName];

      if (typeof validator !== "function") {
        throw new Error("Validator \"" + validatorName.trim() + "\" (" + typeof validator + ") is not defined or not a function.");
      }

      if (validator(field.value, field.validators[validatorName])) {
        result.succeeded.push(validatorName);
        return false;
      } else {
        result.failed.push(validatorName);
        result.valid = this.valid = false;
        return true;
      }
    });

    if (result.valid) {
      this.emit("valid field", field.name, result);
    } else {
      this.emit("invalid field", field.name, result);
    }
    return this;
  }
}
