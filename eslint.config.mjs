import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

const publicApiPatterns = [
  {
    regex: "^@(app|pages|widgets|features)/[^/]+/(?!types$|model$|api$|hooks$|lib$|styles$).*",
    message: "Импорты допустимы только из корня слайса или его публичных папок: types, model, api, hooks, lib, styles.",
  },
  {
    regex: "^@entities/[^/]+/(?!types$|ui$|model$|api$|hooks$|lib$).*",
    message: "Импорты из entities допустимы только из корня слайса или его публичных папок.",
  },
  {
    regex: "^@shared/(?!icons/)[^/]+/.*",
    message: "Импорты из shared допустимы только из его публичных папок первого уровня.",
  },
];

const noRestrictedImports = (patterns = []) => ["error", { patterns: [...publicApiPatterns, ...patterns] }];

const restrictUpperLayers = (layers) => ({
  regex: `^@(${layers.join("|")})(?:/|$)`,
  message: "Нижний слой не может импортировать код из вышестоящего слоя.",
});

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-restricted-imports": noRestrictedImports(),
      "no-warning-comments": "error",
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/html-indent": "off",
      "vue/attributes-order": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/first-attribute-linebreak": "off",
    },
  },
  {
    files: ["src/pages/**/*.{ts,vue}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictUpperLayers(["app"])]),
    },
  },
  {
    files: ["src/widgets/**/*.{ts,vue}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictUpperLayers(["app", "pages"])]),
    },
  },
  {
    files: ["src/features/**/*.{ts,vue}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictUpperLayers(["app", "pages", "widgets"])]),
    },
  },
  {
    files: ["src/entities/**/*.{ts,vue}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictUpperLayers(["app", "pages", "widgets", "features"])]),
    },
  },
  {
    files: ["src/shared/**/*.{ts,vue}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([
        restrictUpperLayers(["app", "pages", "widgets", "features", "entities"]),
      ]),
    },
  }
);
