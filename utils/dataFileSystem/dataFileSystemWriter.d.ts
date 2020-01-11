export interface DataWriter<TData, THeader> {
  addData(header: THeader, data: TData[]): Promise<void>;
  updateData(fileId: string, header: THeader, data: TData[]): Promise<void>;
}

export default function dataFileSystemWriter<THeader, TData>(dataPath: string): DataWriter<THeader, TData>;
