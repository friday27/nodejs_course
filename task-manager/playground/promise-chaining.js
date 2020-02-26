//work with mongoose and promise chaining
require('../src/db/mongoose.js');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5e53e2f36132a3048a865279', {age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age}); //ES6 shorthand syntax
    const count = await User.countDocuments({age});
    return count;
};

updateAgeAndCount('5e4e3577b3d8297673098062', 100).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});