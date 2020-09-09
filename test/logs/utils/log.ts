import fs from 'fs';

export interface UnsupportedTypeLog {
  header: string;
  created: string;
  usedBy: string;
}

export const getLogsByCreateMockFileName: (
  fileName: string
) => UnsupportedTypeLog[] = (fileName: string) => {
  const logErrorFile: string = fs.readFileSync('./tsAutoMock.log', 'utf-8');
  const logs: UnsupportedTypeLog[] = [];
  const lines: string[] = logErrorFile
    .split('\n')
    .filter((line: string) => !!line);

  for (let i: number = 0; i < lines.length; i += 3) {
    logs.push({
      header: lines[i],
      created: lines[i + 1],
      usedBy: lines[i + 2],
    });
  }

  return logs.filter(
    (log: UnsupportedTypeLog) => log.created.indexOf(fileName) > -1
  );
};
