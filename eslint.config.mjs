import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import stylistic from "@stylistic/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules",
        "**/dist",
        "definitelyTypedTests/build",
        "**/.idea",
        "**/DefinitelyTyped",
        "commitizen.js",
        "commitlint.config.js",
        "config",
        "definitelyTypedTests",
        "dist",
        "node_modules",
        "performance",
        "ui",
        "utils",
        "test/reporter.js",
    ],
}, ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        import: fixupPluginRules(_import),
        prettier,
        "@stylistic": stylistic,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            project: "tsconfig.eslint.json",
        },
    },

    rules: {
        "@stylistic/semi": "error",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",

        "@typescript-eslint/naming-convention": ["error", {
            selector: "default",
            format: ["camelCase"],
        }, {
            selector: "function",
            format: ["PascalCase", "camelCase"],
        }, {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
        }, {
            selector: "parameter",
            format: ["camelCase"],
            leadingUnderscore: "allow",
        }, {
            selector: "property",
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "allow",
        }, {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
        }, {
            selector: "typeLike",
            format: ["PascalCase"],
        }, {
            selector: "enumMember",
            format: ["PascalCase"],
        }],

        "@typescript-eslint/typedef": ["error", {
            arrayDestructuring: true,
            objectDestructuring: true,
            variableDeclaration: true,
        }],

        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/consistent-type-assertions": "error",

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: false,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
        }],

        "@typescript-eslint/consistent-type-definitions": "off",

        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "explicit",

            overrides: {
                accessors: "explicit",
                methods: "explicit",
                properties: "explicit",
                parameterProperties: "explicit",
                constructors: "off",
            },
        }],

        "@typescript-eslint/interface-name-prefix": "off",

        "@stylistic/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },

            singleline: {
                delimiter: "semi",
                requireLast: false,
            },
        }],

        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@stylistic/quotes": ["error", "single"],
        "@typescript-eslint/triple-slash-reference": "error",
        "@stylistic/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "off",
        "@typescript-eslint/ban-ts-ignore": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "_",
        }],

        "arrow-body-style": "error",
        "arrow-parens": ["error", "as-needed"],
        camelcase: "off",
        "comma-dangle": ["error", "always-multiline"],
        complexity: "off",
        "constructor-super": "error",
        curly: "error",
        "dot-notation": "error",
        "eol-last": "error",
        eqeqeq: ["error", "smart"],
        "guard-for-in": "error",
        "id-blacklist": "off",
        "id-match": "off",
        "import/order": "error",
        "max-classes-per-file": "off",

        "max-len": ["error", {
            code: 200,
        }],

        "new-parens": "error",
        "no-bitwise": "off",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "warn",
        "no-debugger": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-shadow": "off",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "object-curly-spacing": ["error", "always"],
        "one-var": ["error", "never"],
        "prefer-arrow/prefer-arrow-functions": "off",
        "prefer-const": "error",
        "quote-props": ["error", "consistent-as-needed"],
        radix: "error",
        "spaced-comment": "error",
        "use-isnan": "error",
        "valid-typeof": "off",
        "brace-style": "error",

        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }],
    },
}];
