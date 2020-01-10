const path = require('path');
const fs = require('fs');
const execPromise = require('../../utils/exec/execPromise');

console.log('.Removing DefinitelyTyped submodule');

const submodulePath = path.join('..', 'DefinitelyTyped');

if (fs.existsSync(submodulePath)) {
  console.log('.DefinitelyTyped submodule found');
  execPromise(`cd .. && ls && git rm --cached ${path.join(".", "DefinitelyTyped")}`)
    .then(() => console.log('.DefinitelyTyped submodule removed'))
    .catch((error) => {
      console.error('.DefinitelyTyped submodule could not be removed');
      console.error(error.error);
      console.error(error.stdout);
      process.exit(1);
    });
} else {
  console.error('.DefinitelyTyped submodule not found and can\'t be removed');
  process.exit(1);
}