const fs = require('fs');

function nodeFileSystem() {
    return {
        get(path) {
            return new Promise((res, rej) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        return rej(err);
                    }

                    res(data);
                });
            });
        },
        write(path, data) {
            return new Promise((res, rej) => {
                fs.writeFile(path, data, (err) => {
                    if (err) {
                        return rej(err);
                    }

                    res();
                });
            });
        }
    };
}

module.exports = nodeFileSystem;
