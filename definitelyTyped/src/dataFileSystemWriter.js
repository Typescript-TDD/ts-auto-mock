const fs = require('fs');
const dataFileSystemReader = require('./dataFileSystemReader')(require('./nodeFileSystem'));

function dataFileSystemWriter() {
    const dataPath = process.env.DEFINITELY_TYPED_DATA_URL; //`../data/${dataType}`;

    if (!dataPath) {
        throw new Error('Environment variable DEFINITELY_TYPED_DATA_URL must be specified to use dataFileSystemReader');
    }

    const listPath = `${dataPath}/list.json`;

    return {
        async addData(fileId, data) {
            if(!fs.existsSync(dataPath))
                fs.mkdirSync(dataPath);

            const fileList = await dataFileSystemReader.getDataIds();
            const filename = `${fileId}.json`;
            fileList.push({ filename, date: new Date().toISOString() });
            fs.writeFileSync(listPath, JSON.stringify(fileList));
            fs.writeFileSync(`${dataPath}/${filename}`, JSON.stringify(data));
        }
    }
}

module.exports = dataFileSystemWriter;
