// const square = function (n) {
//     return n * n;
// };

// const square = (n) => {
//     return n * n;
// };

// const square = (n) => n * n;

// for(let i=0; i<=10; i++) {
//     console.log(square(i));
// }

const event = {
    name: 'Birthday Party',
    guestList: ['Ann', 'Beth', 'Celia'],
    //original
    // printGuestList: function() {
    //     console.log('Guest list for ' + this.name);
    // }

    //won't work
    //arrow functions don't bind their own "this" value
    // printGuestList = () =>  {
    //     console.log('Guest list for ' + this.name);
    // }

    //more concise + original
    //ES6 style
    printGuestList() {
        console.log('Guest list for ' + this.name);

        /*
            In this case,
            if we use standard function, this will not point to event,
            thus we will get "Ann is attending undefined".
            The solution is to use arrow function 
            so the value of 'this' will remain.
        */
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
        });
    }
};
event.printGuestList();