
const createLargeArray = (size, fill) => {
    return new Promise((resolve) => {
        const chunkSize = 1e6;
        const totalChunks = Math.ceil(size / chunkSize);
        const result = [];

        let currentChunk = 0;

        const createChunk = () => {
            const end = Math.min((currentChunk + 1) * chunkSize, size);
            for (let i = currentChunk * chunkSize; i < end; i++) {
                result[i] = fill;
            }
            currentChunk++;

            if (currentChunk < totalChunks) {
                setImmediate(createChunk);
            } else {
                resolve(result);
            }
        };

        createChunk();
    });
};

const handleLoopingArrayWithPromise = (array, operationOnEachItem) => {

    return new Promise((resolve, reject) => {
        try {
            let i = 0;
            const limit = array?.length;
            let result = []

            const loopChunk = async () => {
                const chunkSize = 1e6;
                while (i < limit) {
                    i++;
                    result.push(operationOnEachItem(array[i]))
                    if (i % chunkSize === 0) {
                        setImmediate(loopChunk);
                        return;
                    }
                }
                resolve(result[0]);
            };
            loopChunk();
        } catch (error) {
            reject(error);
        }
    });
}

const handleLoopingArrayWithAsync = async (array, operationOnEachItem) => {
    try {
        let i = 0;
        const limit = array?.length;
        let result = [];

        const loopChunk = async () => {
            const chunkSize = 1e6;
            while (i < limit) {
                result.push(operationOnEachItem(array[i]));
                i++;

                if (i % chunkSize === 0) {
                    await new Promise(resolve => setImmediate(resolve));
                }
            }
            return result[0];
        };

        return await loopChunk();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    handleLoopingArrayWithPromise,
    handleLoopingArrayWithAsync,
    createLargeArray
}