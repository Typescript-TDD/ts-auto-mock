import { Sandbox } from '../../typings/sandbox';
import { transformerWrapperFix } from './transformer';
import { addDepToMonaco, getContentAndDependenciesContent } from './ts-dependencies';

export async function createCompiler(sandbox: Sandbox) {
  const programTsAutoMockFiles: Map<string, string> = new Map();
  let busy = true;
  let nextCompile = false;

  const depsContent: { content: string, path: string }[] = await getContentAndDependenciesContent();

  console.groupCollapsed("Dependencies");
  depsContent
    .forEach(dep => {
      addDepToMonaco(sandbox, dep.content, dep.path);
      programTsAutoMockFiles.set(dep.path, dep.content);
    });
  console.groupEnd();

  busy = false;

  return {
    run: async function() {
      if (busy) {
        console.log("Tried to run, busy");
        nextCompile = true;
        return;
      }

      nextCompile = true;
      while (nextCompile) {
        console.log("Running compilation");
        nextCompile = false;
        busy = true;

        const { program, system } = await sandbox.setupTSVFS(programTsAutoMockFiles);

        const sourceFile = program.getSourceFile(sandbox.filepath);
        try {
          program.emit(sourceFile, undefined, undefined, false, {
            after: [
              transformerWrapperFix(program, { cacheBetweenTests: false, debug: 'console' })
            ]
          });
        } catch(e) {
          console.error("Transformer error", e);
        }

        busy = false;
        return system.readFile("/input.js");
      }
    }
  };
}
