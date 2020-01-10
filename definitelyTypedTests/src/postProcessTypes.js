const fs = require('fs');
const execPromise = require('../../utils/exec/execPromise');

console.log('.Removing DefinitelyTyped submodule');

if (fs.existsSync('../DefinitelyTyped')) {
  console.log('.DefinitelyTyped submodule found');
  execPromise('git rm --cached ../DefinitelyTyped')
    .then(() => console.log('.DefinitelyTyped submodule removed'))
    .catch(() => {
      console.error('.DefinitelyTyped submodule could not be removed');
      process.exit(1);
    });
} else {
  console.error('.DefinitelyTyped submodule not found and can\'t be removed');
  process.exit(1);
}