// Name: Minku An, Student Number: 101219882

// Question-3
var fs = require('fs');
var path = require('path');
const log_dir = path.join(__dirname, 'Logs');
// const log_dir = `${__dirname}/Logs`;

if(!fs.existsSync(log_dir)){
    let count = 10;
    let textInfo = "This is a log file";

    fs.mkdirSync(log_dir, {
        recursive: true
    });

    // Change current process 
    process.chdir(log_dir);

    for (let i = 1; i <= count; i++){
        fs.writeFileSync(`log${i}.txt`, `${textInfo} ${i}`, (err) => {
            if(err) throw err;
        })
        // output the files names to console
        console.log(`log${i}.txt`);
    }
}



// GitHub link
// https://github.com/minQAn/101219882_comp3123_test1






