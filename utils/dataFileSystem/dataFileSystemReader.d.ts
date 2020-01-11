export interface SystemFileReader {
  get<T>(path: string): Promise<T>;
}

export interface RunDataIdBase {
  id: string;
}

export type RunDataId<THeader> = RunDataIdBase & THeader;

export interface RunData<THeader, TData> {
  id: string;
  header: THeader;
  data: TData[];
}

export interface DataReader<THeader, TData> {
  getDataIds(): Promise<RunDataId<THeader>[]>;
  getAllData(): Promise<RunData<THeader, TData>[]>;
  getData(id: string): Promise<RunData<THeader, TData>>;
}

export default function dataFileSystemReader<THeader, TData>(dataPath: string, fileReader: SystemFileReader): DataReader<THeader, TData>;
