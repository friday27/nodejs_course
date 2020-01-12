// setTimeout(() => {
//     console.log('2 seconds are up!');
// }, 2000);

// //synchronous
// const names = ['Andrew', 'Jane', 'Alex'];
// const shortNames = names.filter((name) => {
//     // if (name.length <= 4)
//     //     console.log(name);
//     return name.length <= 4;
// });

// //make it asynchrous
// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         };
//         callback(data);
//     }, 2000);
// };

// geocode('Xindian', (data) => {
//     console.log(data);
// });

//challenge
const add = (a, b, callback) => {
    setTimeout(() => {
        const sum = a + b;
        callback(sum);
    }, 2000);
};

add(1, 4, (sum) => {
    console.log(sum);
});