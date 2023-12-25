import fs from 'fs';

export interface UnsupportedTypeLog {
  header: string;
  created: string;
  usedBy: string;
}

export const getLogsByCreateMockFileName: (
  fileName: string,
) => Promise<UnsupportedTypeLog[]> = async (fileName: string) => {
  const logErrorFile: string = await ensureGetLogFileContent();
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
    (log: UnsupportedTypeLog) => log.created.indexOf(fileName) > -1,
  );
};

/**
  On Windows the log file is empty for the first test, if that happens we wait 10 ms to fetch it again.
  After few tests 10 ms is enough time. It's still a random amount of time but luckily this is useful only for
  local development since build servers are usually Unix.
 */
async function ensureGetLogFileContent(): Promise<string> {
  return await fetchAgainIfEmpty('./tsAutoMock.log');
}

async function fetchAgainIfEmpty(filepath: string): Promise<string> {
  let logErrorFile: string = fs.readFileSync(filepath, 'utf-8');
  if (logErrorFile === '') {
    await waitSomeAmountOfTime();
    logErrorFile = fs.readFileSync(filepath, 'utf-8');
  }
  return logErrorFile;
}

async function waitSomeAmountOfTime(): Promise<void> {
  await new Promise((r: Function) => setTimeout(() => r(), 10));
}
