# Translation System Documentation

This document explains how the translation system in GitGud works and how to add translations for new languages or extend existing ones.

## Translation Architecture

GitGud uses a key-based translation system implemented through React Context. The main components are:

- **LanguageContext**: Context provider for current language and translation function
- **Translation Files**: Organized by language and category
- **Translation Keys**: Consistent keys across all languages

## Translation Files Structure

Translations are organized in the `src/translations` directory:

```
src/translations/
├── index.ts            # Main export file that combines all translations
├── en/                 # English translations
│   ├── common.ts       # Common UI elements
│   ├── faq.ts          # FAQ page text
│   ├── home.ts         # Home page text
│   ├── installation.ts # Installation page text
│   ├── levels.ts       # Level text and descriptions
│   ├── playground.ts   # Playground page text
│   └── terminal.ts     # Terminal UI and messages
└── de/                 # German translations (same structure as English)
    ├── common.ts
    └── ...
```

## Adding a New Language

To add a new language, follow these steps:

1. **Create a new language folder** in `src/translations/`:

    ```
    mkdir src/translations/fr  # For French
    ```

2. **Create translation files** for each category, copying the structure from the English version:

    ```
    cp src/translations/en/*.ts src/translations/fr/
    ```

3. **Translate all values** in each file, keeping the keys exactly the same.

4. **Add the language to the exports** in `src/translations/index.ts`:

    ```typescript
    import commonFr from "./fr/common";
    import levelsFr from "./fr/levels";
    // ... import other French translation files

    export const translations = {
        en: {
            /* existing English translations */
        },
        de: {
            /* existing German translations */
        },
        fr: {
            ...commonFr,
            ...levelsFr,
            // ... spread other French translation objects
        },
    };
    ```

5. **Add language selection option** in the UI (optional, as this might be handled automatically).

## Translation File Format

Each translation file exports an object with key-value pairs:

```typescript
const common = {
    "nav.home": "Home",
    "nav.terminal": "Terminal",
    // ...more translations
};

export default common;
```

When translated to another language (e.g., German):

```typescript
const common = {
    "nav.home": "Startseite",
    "nav.terminal": "Terminal",
    // ...more translations
};

export default common;
```

## Naming Conventions

Translation keys follow these conventions:

1. **Hierarchical Naming**: Use dots to create a hierarchy

    - `category.subcategory.element`
    - Example: `level.gitTerminal`, `faq.whatIsGit.question`

2. **Namespacing by Feature**: Group related items together
    - `home.*` for home page elements
    - `terminal.*` for terminal messages
    - `level.*` for level UI elements
    - `stage.*.level*.element` for specific level content

## Using Translations in Code

The translation function `t()` is used to retrieve translations based on the current language:

```typescript
import { useLanguage } from "~/contexts/LanguageContext";

function MyComponent() {
    const { t, language } = useLanguage();

    return (
        <div>
            <h1>{t("section.title")}</h1>
            <p>{t("section.description")}</p>
        </div>
    );
}
```

### Handling Variables in Translations

For translations with variables, use placeholders with curly braces:

```typescript
// In translation file
"welcome.message": "Hello, {name}! Welcome to level {level}."

// In code
const message = t("welcome.message").replace("{name}", userName).replace("{level}", levelNumber);
```

## Translation for Levels Content

Level content uses translation keys for all user-facing strings. The keys follow this pattern:

```
stageid.level#.elementtype.elementname
```

For example:

```
intro.level1.name: "Initialize Git"
intro.level1.hint1: "Use the git init command"
intro.level1.story.title: "Welcome to the Team"
```

When adding a new level, ensure you add all required translations for all supported languages.

## Testing Translations

When adding or modifying translations:

1. Switch between languages in the UI to ensure all elements are translated
2. Check for missing translations, which will appear as the key itself
3. Verify text fits in the UI elements without breaking layouts
4. Check special characters render correctly
5. Ensure dynamic content with variables is properly formatted

## Missing Translation Fallback

If a translation is missing for the current language, the system will:

1. Try to find the key in the English translations
2. If not found in English, return the key itself as a fallback

This ensures the UI never breaks due to missing translations, but helps identify untranslated strings.
