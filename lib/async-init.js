'use strict';

function asyncInit() {
    const queue = [];
    let instance;
    let initing = false;

    function processQueue(type, result) {
        while (queue.length > 0) {
            queue.shift()[type](result);
        }
    }

    return function initiator(fn) {
        if (instance) {
            return instance;
        }

        if (initing) {
            return new Promise((resolve, reject) => {
                queue.push({
                    resolve,
                    reject
                });
            });
        }

        initing = true;

        return new Promise((resolve, reject) => {
            fn()
                .then(result => {
                    instance = result;
                    resolve(instance);
                    initing = false;
                    processQueue('resolve', instance);
                })
                .catch(error => {
                    reject(error);
                    initing = false;
                    processQueue('reject', error);
                });
        });
    };
}

module.exports = asyncInit;
