import webpack, {
  StatsCompilation,
  StatsError,
  StatsModule,
  StatsModuleReason,
} from 'webpack';
import config from './webpack.js';

function flatMap<A, B>(arr: A[], f: (value: A) => B[]): B[] {
  return arr.map(f).reduce(function (a, b) {
    return a.concat(b);
  }, []);
}

describe('build', () => {
  let originalInterval: number;

  beforeAll(() => {
    originalInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it('should not import typescript other than in transformer', (done: DoneFn) => {
    webpack(config, (err, stats) => {
      if (!stats) {
        fail('Stats not generated');
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
      const statsAsJson: StatsCompilation = stats!.toJson();

      if (err || statsAsJson?.errors?.length) {
        fail(
          err ||
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
            statsAsJson!
              .errors!.map((statErr: StatsError) => JSON.stringify(statErr))
              .join('\n')
        );
      }

      const modulesImportingTypescript: StatsModuleReason[] =
        getModulesImportingTypescript(statsAsJson);

      expect(modulesImportingTypescript.length).toBe(
        1,
        `Only one transformer.ts should import typescript, but found:\n${modulesImportingTypescript
          .map((m: StatsModuleReason) => m.module)
          .join(', ')}`
      );
      expect(modulesImportingTypescript[0].module).toBe(
        './src/transformer/transformer.ts'
      );
      done();
    });
  });

  function getModulesImportingTypescript(
    statsAsJson: StatsCompilation
  ): StatsModuleReason[] {
    return flatMap(
      statsAsJson.modules?.filter(
        (x: StatsModule) => x.identifier === 'external "typescript"'
      ) || [],
      (x: StatsModule) => x.reasons || []
    );
  }

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalInterval;
  });
});
