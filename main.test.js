const { generateRandomData } = require('./main');

describe('generateRandomData', () => {
    test('Generates an integer within the given range', () => {
        const schema = { type: 'integer', minimum: 5, maximum: 10 };
        const value = generateRandomData(schema);
        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(5);
        expect(value).toBeLessThanOrEqual(10);
    });

    test('Generates a number within the given range', () => {
        const schema = { type: 'number', minimum: 1.5, maximum: 5.5 };
        const value = generateRandomData(schema);
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(1.5);
        expect(value).toBeLessThanOrEqual(5.5);
    });

    test('Generates a string within the given length', () => {
        const schema = { type: 'string', minLength: 3, maxLength: 8 };
        const value = generateRandomData(schema);
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThanOrEqual(3);
        expect(value.length).toBeLessThanOrEqual(8);
    });

    test('Generates a boolean value', () => {
        const schema = { type: 'boolean' };
        const value = generateRandomData(schema);
        expect(typeof value).toBe('boolean');
    });

    test('Generates an array with correct constraints', () => {
        const schema = {
            type: 'array',
            minItems: 2,
            maxItems: 5,
            items: { type: 'integer', minimum: 1, maximum: 10 }
        };
        const value = generateRandomData(schema);
        expect(Array.isArray(value)).toBe(true);
        expect(value.length).toBeGreaterThanOrEqual(2);
        expect(value.length).toBeLessThanOrEqual(5);
        value.forEach(item => {
            expect(Number.isInteger(item)).toBe(true);
            expect(item).toBeGreaterThanOrEqual(1);
            expect(item).toBeLessThanOrEqual(10);
        });
    });

    test('Generates a unique array when uniqueItems is true', () => {
        const schema = {
            type: 'array',
            minItems: 3,
            maxItems: 5,
            uniqueItems: true,
            items: { type: 'integer', minimum: 1, maximum: 20 }
        };
        const value = generateRandomData(schema);
        expect(Array.isArray(value)).toBe(true);
        expect(new Set(value).size).toBe(value.length);
    });

    test('Generates an object with required properties', () => {
        const schema = {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 3, maxLength: 10 },
                age: { type: 'integer', minimum: 18, maximum: 60 },
            },
            required: ['name', 'age']
        };
        const value = generateRandomData(schema);
        expect(typeof value).toBe('object');
        expect(value).toHaveProperty('name');
        expect(value).toHaveProperty('age');
        expect(typeof value.name).toBe('string');
        expect(value.name.length).toBeGreaterThanOrEqual(3);
        expect(value.name.length).toBeLessThanOrEqual(10);
        expect(Number.isInteger(value.age)).toBe(true);
        expect(value.age).toBeGreaterThanOrEqual(18);
        expect(value.age).toBeLessThanOrEqual(60);
    });

    test('Handles nested object schemas', () => {
        const schema = {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', minimum: 1, maximum: 100 },
                        username: { type: 'string', minLength: 5, maxLength: 10 }
                    },
                    required: ['id', 'username']
                }
            },
            required: ['user']
        };
        const value = generateRandomData(schema);
        expect(value).toHaveProperty('user');
        expect(value.user).toHaveProperty('id');
        expect(value.user).toHaveProperty('username');
        expect(Number.isInteger(value.user.id)).toBe(true);
        expect(value.user.id).toBeGreaterThanOrEqual(1);
        expect(value.user.id).toBeLessThanOrEqual(100);
        expect(typeof value.user.username).toBe('string');
        expect(value.user.username.length).toBeGreaterThanOrEqual(5);
        expect(value.user.username.length).toBeLessThanOrEqual(10);
    });
});