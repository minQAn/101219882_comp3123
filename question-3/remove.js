// Name: Minku An, Student Number: 101219882

// Question-3
var fs = require('fs');
var path = require('path');
const log_dir = path.join(__dirname, 'Logs');
// console.log(log_dir);
// const log_dir = `${__dirname}/Logs`;


if(fs.existsSync(log_dir)){
    // Change current process 
    process.chdir(log_dir);

    var all_files = fs.readdirSync(log_dir); // get list of all files in a folder
    if(all_files.length > 0){        
        all_files.forEach(file => {
            fs.unlinkSync(file, err => { // unlink: remove file
                if(err) throw err;
            })
            console.log(`delete files... ${file}`); 
        })
    };
    fs.rmdirSync(log_dir); // remove directory    
} else {
    console.log(`The Directory does not exist.`);
}
