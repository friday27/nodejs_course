//import module (fs = file system)
const fs = require('fs');

filename = 'notes.txt';
//write data into the file
// fs.writeFileSync(filename, 'This file is created by Node.js');

/*
    Challenge: Append a message to notes.txt

    1. Use appendFileSync to append to the file
    2. Run the script
    3. Check your work by opening the file and viewing the appended txt
*/

fs.appendFileSync(filename, '\nMy favorite character of Harry Potter series is "Luna Lovegood"!');