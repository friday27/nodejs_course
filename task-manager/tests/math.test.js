const {calTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math');

test('Should calculate total with tip', () => {
    const total = calTip(10, .3);
    expect(total).toBe(13); // assertion
});

test('Should calculate total with default tip', () => {
    const total = calTip(10);
    expect(total).toBe(12); // assertion
});

test('Should convert 32 F to 0 C', () => {
    const celsius = fahrenheitToCelsius(32);
    expect(celsius).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
    const fehrenheit = celsiusToFahrenheit(0);
    expect(fehrenheit).toBe(32);
});

// Testing async code
// Method 1. Add a keyword and call it at the end of async code
// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });

// Method 2. Use then() and a keyword
test('Should add 2 numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

// Method 3. Use async/await -> the most common way!
test('Should add 2 numbers async/await', async () => {
    const sum = await add(10, 17);
    expect(sum).toBe(27);
});