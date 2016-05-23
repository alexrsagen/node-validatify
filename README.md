# node-validation

Extremely simple form and input validation for Node.js

## Install
```
npm install validatify --save
```

## Usage
```javascript
var Form = require("validatify");
```

## Example
```javascript
// Initialize a new Form
var myForm = new Form([{
    name: "email",
    validators: {
        required: true,
        email: true
    }
}, {
    name: "password",
    validators: {
        required: true,
        minlength: 8
    }
}, {
    name: "exampleField",
    validators: {
        required: true,
        containsString: "string to test for"
    }
}]);

// Add a custom validator to myForm
myForm.validator("containsString", function (value, string) {
    return value.indexOf(string) > -1;
});

// Listen for "valid" event
myForm.on("valid", function (result) {
    console.log(result);
});

// Listen for "invalid" event
myForm.on("invalid", function (result) {
    // Should not run, as the values we are providing are valid.
    console.log(result);
});

// Run validation
myForm.validate({
    email: "example@example.com",
    password: "this is a string over 8 characters long",
    exampleField: "this field contains the string to test for"
});
```

#### Chaining
All functions support chaining, so you can write your code however you want!
```javascript
new Form([{
    name: "email",
    validators: {
        required: true,
        email: true
    }
}])
.on("valid", function (result) {
    console.log(result);
})
.on("invalid", function (result) {
    // should not be called because the email is valid
    console.log(result);
})
.validate({email: "example@example.com"});
```

## API
#### Form(`fields`)
* `fields` - An array containing all the fields to iterate over and validate.

    Example

    ```javascript
    [
      	{
            name: "email",
            validators: {
                required: true,
                email: true
            }
      	},
      	{
            name: "password",
            validators: {
                required: true,
                minlength: 8
            }
      	}
    ]
    ```

#### .validate(`values`, `continueOnFail`)
* `values` - An object containing the values for all the fields passed to the constructor.
* `continueOnFail` - Optional boolean that when true executes all validators, and does not stop at first failed validator

    Example

    ```javascript
    {
        email: "example@example.com",
        password: "an example password",
    }
    ```

#### .validateField(`field`, `value`, `continueOnFail`)
* `field` - Name of the field we want to validate.

    Example

    ```javascript
    "email"
    ```
* `value` - Value of the field specified.

    Example

    ```javascript
    "example@example.com"
    ```
* `continueOnFail` - Optional boolean that when true executes all validators, and does not stop at first failed validator

#### .validator(`name`, `validator`)
* `name` - Name of the validator to add (this can also be used to overwrite default validators)
* `validator` - Function that should return either true or false based on the value and argument

    Example

    ```javascript
    new Form([
        {
            name: "someField",
            validators: {
                newValidator: "this is the expectedValue argument"
            }
        }
    ])
    .validator("newValidator", function (value, expectedValue) {
        return value == expectedValue;
    })
    .on("invalid", function (result) {
        // This will run, because the input will fail our new validator's check.
        console.log(result);
    })
    .validateField("someField", "this is not the expected string")
    ```

#### .on(`event`, `callback`)
* `event` - Name of the event to listen for, can be any of the below:

    * `valid`
    * `valid field`
    * `invalid`
    * `invalid field`

* `callback` - Function that only gets called on any event

    Example

    ```javascript
    function (result) {
        console.log(result);
    }
    ```

## Validators
These are the default validators, however you can add your own easily. ([Here's how](#validatorname-validator)).

### Usage
This is an example of what you would pass to the Form constructor.

```javascript
[
    {
        name: "someField",
        validators: {
            validatorName: validatorArgument
        }
    }
]
```

### Validator names and usages
* `number` - Checks if input is a number [Source](src/validators.js#L3-L10)
* `boolean` - Checks if input is either "true" or "false" as a string [Source](src/validators.js#L12-L19)
* `string` - Checks if input is a string [Source](src/validators.js#L21-L28)
* `integer` - Checks if input is a number without decimals [Source](src/validators.js#L30-L37)
* `float` - Checks if input is a number with decimals [Source](src/validators.js#L39-L46)
* `alphanumeric` - Checks if input is a string and contains only alphanumeric characters [Source](src/validators.js#L48-L55)
* `email` - Checks if input is an email address [Source](src/validators.js#L58-L70)
* `defined` - Checks if input is defined [Source](src/validators.js#L72-L79)
* `required` - Checks if value is defined and not empty [Source](src/validators.js#L81-L88)
* `range` - Checks if value is a number within a range defined as an array [Source](src/validators.js#L90-L100)
* `min` - Checks if value is a number more than or equal to the min setpoint [Source](src/validators.js#L102-L110)
* `max`- Checks if value is a number less than or equal to the max setpoint [Source](src/validators.js#L112-L120)
* `minlength` - Checks if value as a string has a length more than or equal to the min setpoint [Source](src/validators.js#L122-L131)
* `maxlength` - Checks if value as a string has a length less than or equal to the max setpoint [Source](src/validators.js#L133-L142)
* `length` - Checks if value as a string has a length equal to the setpoint [Source](src/validators.js#L144-L152)
* `regex` - Checks if input matches a regex [Source](src/validators.js#L154-L162)
