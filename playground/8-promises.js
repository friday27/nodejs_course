// //callback function
// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         callback(undefined, [1,2,7]);
//     }, 2000);
// };

// doWorkCallback((error, result) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log(result);
// });

//usually created by library
//If things went well, use resolve function, otherwise reject function.
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7,2,1]);
        // reject('Thins went wrong!');
        // resolve([9,9,9]); //won't be executed
    }, 2000)
});

//resolve -> then
//reject -> catch
doWorkPromise.then((result) => {
    console.log('Success!', result);
}).catch((error) => {
    console.log('Error!', error);
});