export interface SystemFileReader {
  get<T>(path: string): Promise<T>;
}

export interface RunDataId {
  id: string;
  date: string;
}

export interface TypeRunData {
  item: string;
  response: string;
  message?: string;
}

export interface RunData {
  id: string;
  data: TypeRunData[];
}

export interface DataReader {
  getDataIds(): Promise<RunDataId[]>;
  getAllData(): Promise<TypeRunData[]>;
  getData(id: string): Promise<RunData>
}


export function dataFileSystemReader(dataPath: string, fileReader: SystemFileReader): DataReader;
