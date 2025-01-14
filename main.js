/**
 * Generate a random value based on a JSON Schema.
 * @param {Object} schema - JSON Schema defining the data structure and constraints.
 * @returns {*} Randomly generated data object adhering to the schema.
 */
function generateRandomData(schema) {
  if (!schema || typeof schema !== 'object') {
      throw new Error('Invalid schema provided');
  }

  switch (schema.type) {
      case 'integer':
          return generateRandomInteger(schema);
      case 'number':
          return generateRandomNumber(schema);
      case 'string':
          return generateRandomString(schema);
      case 'boolean':
          return Math.random() < 0.5;
      case 'array':
          return generateRandomArray(schema);
      case 'object':
          return generateRandomObject(schema);
      default:
          throw new Error(`Unsupported schema type: ${schema.type}`);
  }
}

// Generate random integer within constraints
function generateRandomInteger(schema) {
  const min = schema.minimum ?? Number.MIN_SAFE_INTEGER;
  const max = schema.maximum ?? Number.MAX_SAFE_INTEGER;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random number within constraints
function generateRandomNumber(schema) {
  const min = schema.minimum ?? Number.MIN_VALUE;
  const max = schema.maximum ?? Number.MAX_VALUE;
  return Math.random() * (max - min) + min;
}

// Generate random string within length constraints
function generateRandomString(schema) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const minLength = schema.minLength ?? 1;
  const maxLength = schema.maxLength ?? 20;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

// Generate random array within constraints
function generateRandomArray(schema) {
  const minItems = schema.minItems ?? 1;
  const maxItems = schema.maxItems ?? 10;
  const length = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
  const itemsSchema = schema.items;

  if (!itemsSchema) throw new Error('Array schema must define an "items" property');

  const unique = schema.uniqueItems ?? false;
  const result = [];
  while (result.length < length) {
      const item = generateRandomData(itemsSchema);
      if (!unique || !result.includes(item)) {
          result.push(item);
      }
  }
  return result;
}

// Generate random object based on properties schema
function generateRandomObject(schema) {
  const result = {};
  const properties = schema.properties || {};
  const required = schema.required || [];

  Object.entries(properties).forEach(([key, valueSchema]) => {
      if (required.includes(key) || Math.random() > 0.5) {
          result[key] = generateRandomData(valueSchema);
      }
  });

  return result;
}

// Examples 

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

module.exports = { generateRandomData };