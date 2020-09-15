export type PresetFilter = {
  name: string;
  regex: RegExp;
};

export const ErrorPresetFilters = [
  {
    name: 'Maximum call stack',
    regex: /maximum call stack/i,
  },
  {
    name: 'Duplicate identifier',
    regex: /duplicate identifier/i,
  },
  {
    name: 'Interface incorrectly extends',
    regex: /incorrectly extends interface/i,
  },
  {
    name: 'Failed to determine the return value',
    regex: /failed to determine the return value of declare function/i,
  },
  {
    name: 'Subsequent variable same type',
    regex: /subsequent variable declarations must have the same type/i,
  },
  {
    name: 'Type checker failed to look up',
    regex: /type checker failed to look up a symbol for/i,
  },
  {
    name: 'Cannot redeclare block-scoped variable',
    regex: /Cannot redeclare block-scoped variable/i,
  },
  {
    name: 'Cannot find name',
    regex: /Cannot find name/i,
  },
  {
    name: 'Cannot simultaneously extend types',
    regex: /cannot simultaneously extend types/i,
  },
  {
    name: "Cannot read property 'declarations' of undefined",
    regex: /Cannot read property 'declarations' of undefined/i,
  },
  {
    name: 'Can only be default-imported using flag',
    regex: /can only be default-imported using the/i,
  },
  {
    name: 'No type was declared for',
    regex: /No type was declared for/i,
  },
  {
    name: 'An export assignment cannot be used in a module',
    regex: /An export assignment cannot be used in a module with other exported elements/i,
  },
  {
    name: 'No default export',
    regex: /has no default export. Did you mean to use/i,
  },
  {
    name: 'Private identifiers are only available when targeting',
    regex: /Private identifiers are only available when targeting/i,
  },
  {
    name: "The transformer couldn't determine a property value for",
    regex: /The transformer couldn't determine a property value for/i,
  },
  {
    name: "Cannot read property 'length' of undefined",
    regex: /Cannot read property 'length' of undefined/i,
  },
  {
    name: 'Namespace has no exported member',
    regex: /Namespace [^\n]+? has no exported member/i,
  },
];
