module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017
  },
  extends: 'eslint:recommended',
  env: {
    mocha: true,
    node: true,
    es6: true
  },
  rules: {
    // require or disallow use of semicolons instead of ASI
    "semi": ["error", "always", { "omitLastInOneLineBlock": true}],

    // disallow use of the Object constructor
    'no-new-object': 'error',

    // disallow use of the Array constructor
    'no-array-constructor': 'error',

    // suggest using of const declaration for variables that are never modified after declared
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: true,
    }],

    // disallow modifying variables that are declared using const
    'no-const-assign': 'error',

    // require let or const instead of var
    'no-var': 'error',

    // suggest using template literals instead of string concatenation
    // http://eslint.org/docs/rules/prefer-template
    'prefer-template': 'error',

    // enforce usage of spacing in template strings
    // http://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': 'error',

    // disallow use of new operator for Function object
    'no-new-func': 'error',

    // disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': 'error',

    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // rule: http://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
      ]
    }],

    // suggest using the spread operator instead of .apply()
    // http://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 'error',

    // suggest using arrow functions as callbacks
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],

    // require space before/after arrow function's arrow
    // http://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['error', { before: true, after: true }],

    // disallow parens in arrow function arguments with only one argument
    // http://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: false,
    }],

    // enforces no braces where they can be omitted
    // http://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': ['error', 'as-needed', {
      requireReturnForObjectLiteral: false,
    }],

    // disallow arrow functions where they could be confused with comparisons
    // http://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': ['error', {
      allowParens: true,
    }],

    // disallow unnecessary constructor
    // http://eslint.org/docs/rules/no-useless-constructor
    'no-useless-constructor': 'error',

    // disallow duplicate class members
    // http://eslint.org/docs/rules/no-dupe-class-members
    'no-dupe-class-members': 'error',

    // encourages use of dot notation whenever possible
    'dot-notation': ['error', { allowKeywords: true }],

    // allow just one var statement per function
    'one-var': ['error', 'never'],

    // require the use of === and !==
    // http://eslint.org/docs/rules/eqeqeq
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // disallow lexical declarations in case/default clauses
    // http://eslint.org/docs/rules/no-case-declarations.html
    'no-case-declarations': 'error',

    // disallow nested ternary expressions
    'no-nested-ternary': 'error',

    // disallow the use of Boolean literals in conditional expressions
    // also, prefer `a || b` over `a ? a : b`
    // http://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    // enforces spacing between keys and values in object literal properties
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],

    // require a space before & after certain keywords
    'keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true }
      }
    }],

    // require or disallow a space immediately following the // or /* in a comment
    // http://eslint.org/docs/rules/spaced-comment
    'spaced-comment': ['error', 'always', {
      line: {
        exceptions: ['-', '+'],
        markers: ['=', '!'], // space here to support sprockets directives
      },
      block: {
        exceptions: ['-', '+'],
        markers: ['=', '!'], // space here to support sprockets directives
        balanced: false,
      }
    }],

    // this option sets a specific tab width for your code
    // http://eslint.org/docs/rules/indent
    indent: ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      // MemberExpression: null,
      // CallExpression: {
      // parameters: null,
      // },
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      }
    }],

    // require or disallow space before blocks
    'space-before-blocks': 'error',

    // require or disallow space before function opening parenthesis
    // http://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],

    // require or disallow spaces inside parentheses
    'space-in-parens': ['error', 'never'],

    // require spaces around operators
    'space-infix-ops': 'error',

    // Require or disallow spaces before/after unary operators
    // http://eslint.org/docs/rules/space-unary-ops
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {
      },
    }],

    // enforces new line after each method call in the chain to make it
    // more readable and easy to maintain
    // http://eslint.org/docs/rules/newline-per-chained-call
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],

    // disallow whitespace before properties
    // http://eslint.org/docs/rules/no-whitespace-before-property
    'no-whitespace-before-property': 'error',


    // enforce padding within blocks
    'padded-blocks': ['error', 'never'],

    // enforce spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],

    // enforce spacing inside single-line blocks
    // http://eslint.org/docs/rules/block-spacing
    'block-spacing': ['error', 'always'],

    // enforce one true brace style
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // require camel case names
    camelcase: ['error', { properties: 'never' }],

    // enforce or disallow capitalization of the first letter of a comment
    // http://eslint.org/docs/rules/capitalized-comments
    'capitalized-comments': ['off', 'never', {
      line: {
        ignorePattern: '.*',
        ignoreInlineComments: true,
        ignoreConsecutiveComments: true,
      },
      block: {
        ignorePattern: '.*',
        ignoreInlineComments: true,
        ignoreConsecutiveComments: true,
      },
    }],

    // enforce spacing before and after comma
    'comma-spacing': ['error', { before: false, after: true }],

    // enforce one true comma style
    'comma-style': ['error', 'last'],

    // require padding inside curly braces
    'object-curly-spacing': ['error', 'always'],

    // specify the maximum length of a line in your program
    // http://eslint.org/docs/rules/max-len
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    // enforce spacing before and after semicolons
    'semi-spacing': ['error', { before: false, after: true }],

    // require a capital letter for constructors
    'new-cap': ['error', {
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false,
      capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
    }],

    // disallow dangling underscores in identifiers
    'no-underscore-dangle': ['error', { allowAfterThis: false }],

    // disallow redundant return; keywords
    // http://eslint.org/docs/rules/no-useless-return
    'no-useless-return': 'error',

    // disallow use of the with statement
    'no-with': 'error',

    // disallow unnecessary string escaping
    // http://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': 'error',

    // disallow useless string concatenation
    // http://eslint.org/docs/rules/no-useless-concat
    'no-useless-concat': 'error',

    // restrict what can be thrown as an exception
    'no-throw-literal': 'error',

    // disallow use of assignment in return statement
    'no-return-assign': 'error',

    // disallow redundant `return await`
    'no-return-await': 'error',

    // disallow use of `javascript:` urls.
    'no-script-url': 'error',

    // disallow self assignment
    // http://eslint.org/docs/rules/no-self-assign
    'no-self-assign': 'error',

    // disallow comparisons where both sides are exactly the same
    'no-self-compare': 'error',

    // disallow declaring the same variable more then once
    'no-redeclare': 'error',

    // disallow usage of __proto__ property
    'no-proto': 'error',

    // disallow use of multiple spaces
    'no-multi-spaces': 'error',
  }
};
