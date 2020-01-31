import { SystemFileReader } from '../../../../utils/dataFileSystem/dataFileSystemReader';

export function browserFileReader(): SystemFileReader {
    return {
        get(path: string) {
            return fetch(path).then(t => t.json());
        }
    };
}
