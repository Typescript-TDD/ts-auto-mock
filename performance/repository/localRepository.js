const fileSystem = require('../core/fs/fileSystem');
const path = require('path');

function localRepository(url, fileName) {
    const fileUrl = path.join(url, fileName);

    fileSystem.createFolder(url);

    if (!fileSystem.exist(fileUrl)) {
        fileSystem.writeFileSync(fileUrl, JSON.stringify({}));
    }

    return {
        async get() {
            const file = fileSystem.readFileSync(fileUrl);
            return JSON.parse(file);
        },
        async update(results) {
            fileSystem.writeFileSync(fileUrl, JSON.stringify(results));
        },
    }
}
module.exports = localRepository;
