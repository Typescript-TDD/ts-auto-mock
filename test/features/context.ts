// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/typedef
const frameworkContext = require.context('./', true, /\.test\.ts$/);
frameworkContext.keys().map(frameworkContext);
