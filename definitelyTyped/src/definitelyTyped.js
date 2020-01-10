const path = require('path');
const fs = require('fs');

function definitelyTyped() {
  const definitelyTypedFolder = path.join('.', 'DefinitelyTyped');

  return {
    folder: definitelyTypedFolder,
    typesFolder: path.join(definitelyTypedFolder, 'types'),
    getTypes() {
      return this._types || (this._types = fs.readdirSync(this.typesFolder, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name));
    }
  }
}

module.exports = definitelyTyped;
