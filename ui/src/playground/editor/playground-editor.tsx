import React, { useEffect, useState } from 'react';
import { Sandbox, SandboxConfig } from '../typings/sandbox';
import { TypeScriptWorker } from '../typings/tsWorker';
declare type Monaco = typeof import("monaco-editor");
declare type SandboxFactory = typeof import("../typings/sandbox");

export function PlaygroundEditor(props: { onSandboxCreated: any }): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [sandbox, setSandbox] = useState<Sandbox>();

  useEffect(() => {
    loadSandbox((sb) => {
      setSandbox(sb);
      props.onSandboxCreated(sb);
    });
  }, []);

  useEffect(() => {
    if (!sandbox) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
    sandbox.editor.focus();
  }, [sandbox]);

  return <div>
    { isLoading ?
      (<div id="loader">LOADING...</div>) :
      undefined
    }
    <div id="monaco-editor-embed" style={{ height: '500px' }}></div>
  </div>;
}

function loadSandbox(setSandbox: (value: any) => void) {
  requirePlaygroundDependencies().then(([monaco, sandboxFactory]) => {
    const initialCode = `interface MyInterface {
  prop1: string;
  prop2: number;
}

createMock<MyInterface>();
`;

    const sandboxConfig: Partial<SandboxConfig> = {
      text: initialCode,
      compilerOptions: {},
      domID: 'monaco-editor-embed'
    };

    const sandbox: Sandbox = sandboxFactory.createTypeScriptSandbox(sandboxConfig, monaco, (window as any).ts);
    sandbox.monaco.editor.setTheme('vs-dark');

    setSandbox(sandbox);
  });
}
  
function requirePlaygroundDependencies(): Promise<[Monaco, SandboxFactory]> {
  if (!!(window as any).playgroundDependencies) {
    return Promise.resolve((window as any).playgroundDependencies);
  }
  
  return new Promise(resolve => {
    const getLoaderScript = document.createElement('script');
    getLoaderScript.src = 'https://www.typescriptlang.org/js/vs.loader.js';
    getLoaderScript.async = true;
    getLoaderScript.onload = () => {
      // Now the loader is ready, tell require where it can get the version of monaco, and the sandbox
      // This version uses the latest version of the sandbox, which is used on the TypeScript website

      // For the monaco version you can use unpkg or the TypeSCript web infra CDN
      // You can see the available releases for TypeScript here:
      // https://typescript.azureedge.net/indexes/releases.json
      //
      const myRequired = (global as any)['req' + 'uire'];

      myRequired.config({
        paths: {
          vs: 'https://typescript.azureedge.net/cdn/4.0.5/monaco/min/vs',
          sandbox: 'https://www.typescriptlang.org/js/sandbox',
        },
        // This is something you need for monaco to work
        ignoreDuplicateModules: ['vs/editor/editor.main'],
      });

      // Grab a copy of monaco, TypeScript and the sandbox
      myRequired(['vs/editor/editor.main', 'vs/language/typescript/tsWorker', 'sandbox/index'], (
        main: Monaco,
        _tsWorker: TypeScriptWorker,
        sandboxFactory: SandboxFactory
      ) => {
        const isOK = main && (window as any).ts && sandboxFactory
        if (!isOK) {
          console.error('Could not get all the dependencies of sandbox set up!')
          console.error('main', !!main, 'ts', !!(window as any).ts, 'sandboxFactory', !!sandboxFactory)
          return
        }

        (window as any).playgroundDependencies = [main, sandboxFactory];
        resolve((window as any).playgroundDependencies);
      })
    };

    document.body.appendChild(getLoaderScript);
  });
}