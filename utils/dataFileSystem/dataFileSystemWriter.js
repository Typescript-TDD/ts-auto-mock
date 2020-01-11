const fs = require('fs');
const uuid = require('../uuid/uuid');

function dataFileSystemWriter(dataPath) {
    if (!dataPath) {
        throw new Error('dataPath must be specified to use dataFileSystemWriter');
    }

    const dataFileSystemReader = require('./dataFileSystemReader')(dataPath, require('./nodeFileReader')());
    const listPath = `${dataPath}/list.json`;

    function updateListAndEntry(fileList, filename, data) {
        fs.writeFileSync(listPath, JSON.stringify(fileList));
        fs.writeFileSync(`${dataPath}/${filename}`, JSON.stringify(data));
    }

    return {
        async addData(header, data) {
            if(!fs.existsSync(dataPath))
                fs.mkdirSync(dataPath);

            const fileList = await dataFileSystemReader.getDataIds();
            const filename = `${uuid()}.json`;
            fileList.push({ id: filename, ...header });
            updateListAndEntry(fileList, filename, data);
        },

        async updateData(fileId, header, data) {
            const fileList = await dataFileSystemReader.getDataIds();
            const entryById = fileList.find((data) => data.id === fileId);

            Object.assign(entryById, header);

            const fileData = await dataFileSystemReader.getData(fileId);
            Array.prototype.push.apply(fileData.data, data);

            updateListAndEntry(fileList, fileId, fileData.data);
        }
    }
}

module.exports = dataFileSystemWriter;
