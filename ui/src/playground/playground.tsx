import { editor,  } from 'monaco-editor';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../core/useDebounce/useDebounce';
import { PlaygroundEditor } from './editor/playground-editor';
import { createCompiler } from './output/helpers/compiler';
import { PlaygroundOutput } from './output/playground-output';
import { Sandbox } from './typings/sandbox';
import { js as beautify } from 'js-beautify';

import * as Repository from "ts-auto-mock/repository";
import * as Extension from "ts-auto-mock/extension";
import * as Merge from "ts-auto-mock/merge";
import * as Random from "ts-auto-mock/random";

type AsyncValue<T> = T extends Promise<infer R> ? R : never;

export function Playground(): JSX.Element {
  const [sandbox, setSandbox] = useState<Sandbox>();
  const [js, setJs] = useState('');
  const [modelVersion, setModelVersion] = useState<number>();
  const [compiler, setCompiler] = useState<AsyncValue<ReturnType<typeof createCompiler>>>();
  
  function onSandboxCreated(createdSandbox: Sandbox) {
    setSandbox(createdSandbox);
  }

  useEffect(() => {
    if (!sandbox) {
      return;
    }

    const calls = [];

    const ɵRepository = {
      ɵRepository: {
        instance: {
          registerFactory: Repository.ɵRepository.instance.registerFactory.bind(Repository.ɵRepository.instance),
          getFactory(key: string) {
            return (generics: object) => {
              calls.push({ key, generics });
              return Repository.ɵRepository.instance.getFactory(key)(generics);
            };
          }
        }
      }
    };
    const ɵExtension = Extension;
    const ɵMerge = Merge;
    const ɵRandom = Random;

    // remove all imports
    const jsFile = `
    "use strict";
    ɵRepository.ɵRepository.instance.registerFactory("@MyInterface_1", function(t) {
      return (function() {
        var d = {},
          m = {
            "prop1": "",
            "prop2": 0
          };
        Object.defineProperty(m, ɵExtension.ɵMarker.instance.get(), {
          value: !0
        });
        return m;
      })();
    });
    "use strict";
    ɵRepository.ɵRepository.instance.getFactory("@MyInterface_1")([]);`;

    eval(jsFile);

    if (calls.length) {
      // mostra interattivo
    }

    createCompiler(sandbox)
      .then(setCompiler)
      .then(() => compileJsOnChange(sandbox));

    return () => {
      sandbox.editor.getModel()?.dispose();
    };
  }, [sandbox]);

  const debouncedModelVersion = useDebounce(modelVersion, 1000);

  useEffect(() => {
    if (!compiler || !sandbox || debouncedModelVersion === undefined) {
      return;
    }

    compiler.run()
      .then((newJs: string) => {
        console.info('Beautifying js');
        return beautify(newJs, { indent_size: 2 });
      })
      .then((formattedJs: string) => {
        console.info('Colorizying js');
        return sandbox.monaco.editor.colorize(formattedJs, 'typescript', {});
      })
      .then((coloredJs: string) => {
        console.info('Updating js');
        setJs(coloredJs);
      });
  }, [debouncedModelVersion, sandbox, compiler]);
  
  function compileJsOnChange(sandbox: Sandbox) {
    sandbox.editor.onDidChangeModelContent((changedEvent: editor.IModelContentChangedEvent) => {
      console.log("Model changed");
      setModelVersion(changedEvent.versionId);
    });

    setModelVersion(0);
  }

  return <div style={{display: 'flex'}}>
    <div style={{flex: '1'}}>
      <PlaygroundEditor onSandboxCreated={onSandboxCreated} />
    </div>
    <div style={{flex: '1'}}>
      { sandbox ? (<PlaygroundOutput js={js} />) : undefined }
    </div>
  </div>;
}
