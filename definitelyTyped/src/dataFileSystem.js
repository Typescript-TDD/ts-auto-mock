const fs = require('fs');

function dataFileSystem(dataType) {
    if (!dataType) {
        throw new Error('dataType has to be specified when initialising dataFileSystem');
    }

    const dataPath = `../data/${dataType}`;
    const listPath = `${dataPath}/list.json`;

    return {
        getDataIds() {
            if (fs.existsSync(listPath)) {
                const fileList = fs.readFileSync(listPath);
                return JSON.parse(fileList);
            }

            return [];
        },
        addData(fileId, data) {
            if(!fs.existsSync(dataPath))
                fs.mkdirSync(dataPath);

            const fileList = this.getDataIds();
            const filename = `${fileId}.json`;
            fileList.push({ filename, date: new Date().toISOString() });
            fs.writeFileSync(listPath, JSON.stringify(fileList));
            fs.writeFileSync(`${dataPath}/${filename}`, JSON.stringify(data));
        },
        getAllData() {
            const dataIds = this.getDataIds();
            const allData = [];

            for(let i = 0; i < dataIds.length; i++) {
                allData.push(this.getData(dataIds[i]));
            }

            return allData;
        },
        getData(id) {
            const toParse = fs.readFileSync(`${dataPath}/${id}`);
            const data = JSON.parse(toParse);

            return { id: id, data: data };
        }
    }
}

module.exports = dataFileSystem;
