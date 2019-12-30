console.log('utils.js');

const name = 'Mike';

const add = function(a, b) {
    return a + b;
};

//export the var (It can be shared across files)
module.exports = add;