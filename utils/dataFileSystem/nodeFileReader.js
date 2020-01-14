const fs = require('fs');

function nodeFileReader() {
    return {
        get(path) {
            return new Promise((res, rej) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        return rej(err);
                    }

                    res(JSON.parse(data));
                });
            });
        }
    };
}

module.exports = nodeFileReader;
