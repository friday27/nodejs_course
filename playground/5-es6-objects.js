// Object property shorthand
const name = 'Emily';
const userAge = 18;

const user = {
    name, //shorthand syntax!
    age: userAge,
    location: 'Mars'
};

console.log(user);


// Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

// const label = product.label;
// const stock = product.stock;
// const {varName1[: newName], varName2, varName3 = default} = objName;
// const {label: productLabel, stock, rating = 5} = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);

// destructure the object in parameter list
const transaction = (type, {label, stock}) => {
    console.log(type, label, stock);
};

transaction('order', product);
