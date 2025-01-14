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

const exampleSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "productName": {
      "description": "Name of the product",
      "type": "string"
    },
    "price": {
      "description": "The price of the product",
      "type": "number",
      "exclusiveMinimum": 0
    },
    "tags": {
      "description": "Tags for the product",
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "dimensions": {
      "type": "object",
      "properties": {
        "length": {
          "type": "number"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": ["length", "width", "height"]
    }
  },
  "required": ["productId", "productName", "price"]
}
const formattedSchema = generateRandomData(exampleSchema);
console.log(formattedSchema);


module.exports = { generateRandomData };