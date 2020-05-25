module.exports = {
  allowBreakingChanges: [
    `feat`,
    `fix`,
    `build`
  ],
  allowCustomScopes: true,
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  messages: {
    body: `Provide a LONGER description of the change (optional). Use "|" to break new line:\n`,
    breaking: `List any BREAKING CHANGES (optional):\n`,
    confirmCommit: `Are you sure you want to proceed with the commit above ?`,
    customScope: `SCOPE of this change:`,
    scope: `\nSCOPE of this change (optional):`,
    subject: `Write a SHORT, IMPERATIVE tense subject of the change:\n`,
    type: `Select the type of change that you are committing:`
  },
  skipQuestions: [ `footer` ],
  subjectLimit: 144,
  // Any changes should also me made on the [semantic config](#/.github/semantic.yml)
  types: [
    {
      name: `feat:     A new feature`,
      value: `feat`
    },
    {
      name: `fix:      A bug fix`,
      value: `fix`
    },
    {
      name: `style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)`,
      value: `style`
    },
    {
      name: `refactor: A code change that neither fixes a bug nor adds a feature`,
      value: `refactor`
    },
    {
      name: `perf:     A code change that improves performance`,
      value: `perf`
    },
    {
      name: `test:     Adding missing tests or correcting existing tests`,
      value: `test`
    },
    {
      name: `build:    Changes that affect the build system, CI configuration or external dependencies`,
      value: `build`
    },
    {
      name: `chore:    Anything else`,
      value: `chore`
    }
  ]
};
