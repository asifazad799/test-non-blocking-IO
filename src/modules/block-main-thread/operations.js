const { createLargeArray, handleLoopingArrayWithAsync } = require("./helpers");

const blockv1 = async (block, res) => {
    return new Promise((resolve, reject) => {
        try {
            if (block) {
                // for (let i = 0; i < 10000000000; i++) { }
                setImmediate(() => {
                    for (let i = 0; i < 10000000000; i++) { }
                    return resolve({ message: 'done' });
                });

            } else {
                resolve({ message: 'done' });
            }
        } catch (error) {
            return reject({ error: error })
        }
    })
}

const blockv2 = async (blockParam, res) => {
    return new Promise((resolve, reject) => {
        try {
            if (blockParam) {
                let i = 0;
                const limit = 1e9; // Reduced for demonstration

                // Function that performs part of the loop and defers the rest
                const loopChunk = () => {
                    const chunkSize = 1e6;  // Process 1 million iterations at a time

                    while (i < limit) {
                        i++;
                        if (i % chunkSize === 0) {
                            // Yield control back to the event loop every chunkSize iterations
                            setImmediate(loopChunk);
                            return;
                        }
                    }
                    console.log('asif');

                    // When the loop finishes, resolve the promise
                    resolve({ message: 'done' });
                };

                // Start processing the loop in chunks
                loopChunk();
            } else {
                resolve({ message: 'nothing to block' });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const blockv3 = async (block) => {
    try {
        if (block) {
            let list = await createLargeArray(1e8, 1);

            const proccesEach = (arrayItem) => {
                return arrayItem + 2
            };

            const result = await handleLoopingArrayWithAsync(list, proccesEach)
            return result

        } else {
            return { message: 'done' }
        }
    } catch (error) {
        return error
    }
}
module.exports = {
    blockv1,
    blockv2,
    blockv3
}