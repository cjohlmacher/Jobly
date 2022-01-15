const { sqlForPartialUpdate, sqlForFilter } = require('./sql')

describe('create SQL query for UPDATE', () => {
    test('creates SQL statement for UPDATE', () => {
        const result = sqlForPartialUpdate(
            {firstName: 'Aliya', age: 32},
            {firstName: "first_name"}
        );
        expect(result).toEqual({
            setCols: `"first_name"=$1, "age"=$2`, 
            values: ['Aliya',32]
        });
    });
    test('throws error if no data', () => {
        try{
            sqlForPartialUpdate({},{});
        } catch (err) {
            expect(err.message).toBe('No data');
        };
    });
});

describe('create SQL query with filter', () => {
    test('creates SQL statement with all filters', () => {
        const result = sqlForFilter({
            name: 'Davis-Davis',
            minEmployees: 10,
            maxEmployees: 50
        });
        expect(result).toBe(`SELECT handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl" FROM companies WHERE name = 'Davis-Davis' AND num_employees >= 10 AND num_employees <= 50 ORDER BY name`)
    });
    test('creates SQL statement with name only', () => {
        const result = sqlForFilter({
            name: 'Davis-Davis',
        });
        expect(result).toBe(`SELECT handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl" FROM companies WHERE name = 'Davis-Davis' ORDER BY name`);
    });
    test('creates SQL statement with minEmployees only', () => {
        const result = sqlForFilter({
            minEmployees: 10
        });
        expect(result).toBe(`SELECT handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl" FROM companies WHERE num_employees >= 10 ORDER BY name`);
    });
    test('creates SQL statement with maxEmployees only', () => {
        const result = sqlForFilter({
            maxEmployees: 50
        });
        expect(result).toBe(`SELECT handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl" FROM companies WHERE num_employees <= 50 ORDER BY name`);
    });
    test('creates SQL statement with name and minEmployees only', () => {
        const result = sqlForFilter({
            name: 'Davis-Davis',
            minEmployees: 10
        });
        expect(result).toBe(`SELECT handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl" FROM companies WHERE name = 'Davis-Davis' AND num_employees >= 10 ORDER BY name`);
    });
    test('throws error if no filters', () => {
        try {
            sqlForFilter({})
        } catch(err) {
            expect(err.message).toBe('No data');
        };
    });
});