# JSON Schema Random Data Generator

## Overview
This utility generates random data objects conforming to a given JSON Schema. The implementation adheres to constraints defined within the schema, such as data types, min/max values, required properties, and more.

## Features
- Supports `string`, `integer`, `number`, `boolean`, `array`, and `object` types.
- Enforces constraints: `minLength`, `maxLength`, `minimum`, `maximum`, `minItems`, `maxItems`, `uniqueItems`, and `required`.
- No external dependencies.

## Usage
```javascript
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3, maxLength: 8 },
    age: { type: 'integer', minimum: 18, maximum: 99 },
    tags: {
      type: 'array',
      items: { type: 'string', minLength: 2, maxLength: 5 },
      minItems: 2,
      maxItems: 4,
    },
  },
  required: ['name', 'age'],
};

const randomObject = generateRandomData(schema);
console.log(randomObject);