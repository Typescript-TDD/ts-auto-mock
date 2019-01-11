const context = require.context('./../', true, /\.test\.ts$/);
context.keys().map(context);