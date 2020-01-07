const path = require('path');
const fs = require('fs');

function definitelyTyped(rootPath) {
  return {
    folder: path.join(rootPath, 'DefinitelyTyped'),
    typesFolder: path.join(rootPath, 'DefinitelyTyped', "types"),
    getTypes() {
      return this._types || (this._types = fs.readdirSync(this.typesFolder, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name));
    }
  }
}

module.exports = definitelyTyped;
