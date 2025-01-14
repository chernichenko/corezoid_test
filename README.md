# JSON Schema Random Data Generator

## Overview
This utility generates random data objects conforming to a given JSON Schema. The implementation adheres to constraints defined within the schema, such as data types, min/max values, required properties, and more.

## Features
- Supports `string`, `integer`, `number`, `boolean`, `array`, and `object` types.
- Enforces constraints: `minLength`, `maxLength`, `minimum`, `maximum`, `minItems`, `maxItems`, `uniqueItems`, and `required`.
- No external dependencies.

## Usage
```javascript
const schema1 = {
  type: 'integer',
  minimum: 5,
  maximum: 15
};

const randomInteger = generateRandomData(schema1);
console.log(randomInteger);

const schema2 = {
  type: 'string',
  minLength: 3,
  maxLength: 8
};

const randomString = generateRandomData(schema2);
console.log(randomString);

const schema3 = {
  type: 'boolean'
};

const randomBoolean = generateRandomData(schema3);
console.log(randomBoolean);

const schema4 = {
  type: 'array',
  minItems: 3,
  maxItems: 5,
  items: {
      type: 'integer',
      minimum: 1,
      maximum: 10
  }
};

const randomArray = generateRandomData(schema4);
console.log(randomArray);

const schema5 = {
  type: 'object',
  properties: {
      name: { type: 'string', minLength: 4, maxLength: 10 },
      age: { type: 'integer', minimum: 18, maximum: 60 },
      isActive: { type: 'boolean' }
  },
  required: ['name', 'age']
};

const randomObject = generateRandomData(schema5);
console.log(randomObject);

const schema6 = {
  type: 'object',
  properties: {
      user: {
          type: 'object',
          properties: {
              id: { type: 'integer', minimum: 1000, maximum: 9999 },
              username: { type: 'string', minLength: 5, maxLength: 12 }
          },
          required: ['id', 'username']
      },
      status: { type: 'string', enum: ['active', 'inactive', 'suspended'] }
  },
  required: ['user']
};

const nestedObject = generateRandomData(schema6);
console.log(nestedObject);

const schema7 = {
  type: 'array',
  minItems: 3,
  maxItems: 6,
  uniqueItems: true,
  items: {
      type: 'integer',
      minimum: 1,
      maximum: 20
  }
};

const uniqueArray = generateRandomData(schema7);
console.log(uniqueArray);

const schema8 = {
  type: 'array',
  minItems: 2,
  maxItems: 4,
  items: {
      type: 'object',
      properties: {
          title: { type: 'string', minLength: 3, maxLength: 10 },
          completed: { type: 'boolean' }
      },
      required: ['title']
  }
};

const randomArrayObjects = generateRandomData(schema8);
console.log(randomArrayObjects);

const schema9 = {
  type: 'string',
  enum: ['red', 'green', 'blue', 'yellow']
};

const randomEnum = generateRandomData(schema9);
console.log(randomEnum);

const schema10 = {
  type: 'object',
  properties: {
      firstName: { type: 'string', minLength: 3 },
      lastName: { type: 'string', minLength: 3 },
      age: { type: 'integer', minimum: 18, maximum: 80 }
  },
  required: ['firstName']
};

const optionalPropsObject = generateRandomData(schema10);
console.log(optionalPropsObject);