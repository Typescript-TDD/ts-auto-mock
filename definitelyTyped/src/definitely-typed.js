const path = require('path');
const fs = require('fs');

module.exports = {
    folder: 'DefinitelyTyped',
    typesFolder: path.join('DefinitelyTyped', "types"),
    getTypes() {
        return fs.readdirSync(this.typesFolder, {withFileTypes: true})
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    }
};
