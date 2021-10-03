// Name: Minku An, Student Number: 101219882

// Question-2
function resolvedPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = {'message': 'delayed success!'}
            resolve(success);
        }, 500);
    });
};

function rejectedPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let exception = {'message': 'delayed exception!'};
            reject(exception);
        }, 500)
    })
}

resolvedPromise().then(resolveData => console.log(resolveData));
rejectedPromise().catch(err => console.log(err));
