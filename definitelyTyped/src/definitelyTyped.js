const path = require('path');
const fs = require('fs');

function definitelyTyped(rootPath) {
  return {
    folder: 'DefinitelyTyped',
    typesFolder: path.join('DefinitelyTyped', "types"),
    getTypes() {
      return this._types || (this._types = fs.readdirSync(path.join(rootPath, this.typesFolder), {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name));
    }
  }
}

module.exports = definitelyTyped;
