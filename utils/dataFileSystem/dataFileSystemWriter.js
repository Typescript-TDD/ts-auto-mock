const fs = require('fs');

function dataFileSystemWriter(dataPath) {
    if (!dataPath) {
        throw new Error('dataPath must be specified to use dataFileSystemWriter');
    }

    const dataFileSystemReader = require('./dataFileSystemReader')(dataPath, require('./nodeFileReader')());
    const listPath = `${dataPath}/list.json`;

    return {
        async addData(fileId, header, data) {
            if(!fs.existsSync(dataPath))
                fs.mkdirSync(dataPath);

            const fileList = await dataFileSystemReader.getDataIds();
            const filename = `${fileId}.json`;
            fileList.push({ id: filename, ...header });
            fs.writeFileSync(listPath, JSON.stringify(fileList));
            fs.writeFileSync(`${dataPath}/${filename}`, JSON.stringify(data));
        }
    }
}

module.exports = dataFileSystemWriter;
