const fs = require('fs');
const ncp = require('ncp').ncp;
const del = require('del');

function fileSystem() {
    return {
        createFolder: (folder) => {
            if(!fs.existsSync(folder))
                fs.mkdirSync(folder);
        },
        writeFileAsync(fileName, data) {
            return fs.writeFileSync(fileName, data);
        },
        readFileAsync(fileName) {
          return fs.readFileSync(fileName);
        },
        copyFolder(source, destination) {
            return new Promise(function(resolve, reject) {
                ncp(source, destination, function (err) {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                });
            });
        },
        deleteFolder(folder) {
            return del([folder], {
                force: true
            });
        }
    }
}

module.exports = fileSystem();
