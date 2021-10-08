// Name: Minku An, Student Number: 101219882

// Question1
// Input
const mixedArray = ['PIZZA', 10, true, 25, false, 'Wings'];

// Function 
const lowerCaseWords = (mixedArray) => {    
    return new Promise(function(resolve, reject){  
        let resolvedData = [];   
        let rejectedData = [];   
        mixedArray.map(element => {
            if(typeof(element) === "string"){
                resolvedData.push(element.toLowerCase());
                resolve(resolvedData);
            } else {
                rejectedData.push(element);
                reject(rejectedData);
            }
        })      
          
    })
};

lowerCaseWords(mixedArray)
    .then(resolvedData => {
        console.log(resolvedData);
    })
    .catch(err => {
        console.log(`RejectedData: [${err}]`);
    });



// GitHub link
// https://github.com/minQAn/101219882_comp3123_test1



