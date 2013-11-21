README
======

jsIBAN is a library helps you generating/validating IBAN code from an account bank.

## Install

### Bower

Execute next command:

```bower install jsIBAN```

### Clone from Github

```git clone git://github.com/markitosgv/jsIBAN.git .```

## Setup

Include jsIBAN.js in your webpage:

```html
<script src="jsIBAN.js"></script>
```

## Usage

### Generate

To generate a **IBAN ES** code and save in a variable:

```javascript
var acc = "01230345010000067890"
var iban = genIBAN(acc,"ES");
```
Country codes can queried [here](http://www.nordea.com/Our+services/International+products+and+services/Cash+Management/IBAN+countries/908462.html)

### Check

```javascript
if (validateIBAN(iban) == true) {
    console.log("valid");
} else {
    console.log("invalid");
}
```
