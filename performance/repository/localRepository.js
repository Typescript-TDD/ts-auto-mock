const fileSystem = require('../core/fs/fileSystem');
const path = require('path');

function localRepository(url, fileName) {
    const fileUrl = path.join(url, fileName);

    fileSystem.createFolder(url);

    if (!fileSystem.exist(fileUrl)) {
        fileSystem.writeFileAsync(fileUrl, JSON.stringify({}));
    }

    return {
        async get() {
            const file = fileSystem.readFileAsync(fileUrl);
            return JSON.parse(file);
        },
        async update(results) {
            fileSystem.writeFileAsync(fileUrl, JSON.stringify(results));
        },
    }
}
module.exports = localRepository;
