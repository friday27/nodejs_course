
const factorial = function(n) {
    if(n <= 1)  return 1;
    return helper(n, 1);
};

const helper = function(n, ans) {
    if(n == 0)  return ans;
    return helper(n-1, ans*n);
}

module.exports = factorial;

/*
    app.js

    // const fac = require('./practice.js');
    // for(let i=0; i<=10; i++) {
    //     console.log('factorial('+i+') = '+fac(i));
    // }
*/