export function dataFileSystemReader(dataPath, fileReader) {
    if (!dataPath) {
        throw new Error('dataPath must be specified to use dataFileSystemReader');
    }

    const listPath = `${dataPath}/list.json`;

    return {
        async getDataIds() {
            try {
                return await fileReader.get(listPath);
            } catch {
                return [];
            }
        },
        async getAllData() {
            const dataIds = await this.getDataIds();
            const allData = [];

            for(let i = 0; i < dataIds.length; i++) {
                allData.push(await this.getData(dataIds[i]));
            }

            return allData;
        },
        async getData(id) {
            const data = await fileReader.get(`${dataPath}/${id}`);

            return { id: id, data: data };
        }
    }
}
