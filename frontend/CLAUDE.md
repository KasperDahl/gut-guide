# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **frontend** portion of the Gut Guide application - a recipe management system built with Angular 20. The frontend communicates with a Spring Boot backend (located in `../backend`) to manage recipes, ingredients, and related data.

## Development Commands

### Running the Application

```bash
# Development server (frontend only)
ng serve

# Run both frontend and backend (from root directory)
npm run dev

# Production build
ng build
```

### Testing

```bash
# Run unit tests
ng test

# Run tests in watch mode
ng build --watch --configuration development
```

### Angular CLI

```bash
# Generate new component (will be placed in src/app/components by default)
ng generate component components/component-name

# Generate new service
ng generate service services/service-name

# Other Angular CLI commands
ng [command] --help
```

## Architecture

### Application Structure

- **Standalone Components**: This project uses Angular standalone components (no NgModules)
- **Routing**: Defined in `src/app/app.routes.ts` with lazy loading
- **State Management**: Uses RxJS Observables (no NgRx/state library)
- **HTTP Communication**: Services use Angular HttpClient to communicate with backend at `http://localhost:8080/api`

### Key Routes

- `/home` - Home page
- `/recipes` - Recipe listing page
- `/recipe/:name` - Recipe details (uses recipe name as parameter)
- `/add-recipe` - Add new recipe form
- `/about` - About page

### Data Flow

1. **Components** consume data from **Services** via Observables
2. **Services** (`RecipeService`, `LookupService`) make HTTP calls to backend REST API
3. **Models** (`Recipe`, `Ingredient`) define TypeScript interfaces
4. Components use **Angular Material** for UI (cards, grids, lists, icons, dialogs)

### Core Services

**RecipeService** (`src/app/services/recipe.service.ts`)
- Base URL: `http://localhost:8080/api/recipes`
- Methods: `getRecipes()`, `getRecipeById(id)`, `getRecipeByName(name)`, `createRecipe(recipe)`, `deleteRecipe(id)`
- Note: `getRecipeByName()` fetches all recipes then filters client-side (consider optimizing if dataset grows)

**LookupService** (`src/app/services/lookup.service.ts`)
- Base URL: `http://localhost:8080/api/lookup`
- Provides unit of measurement options for ingredients

### Recipe Model

```typescript
interface Recipe {
  id?: number;
  name: string;
  instructions: string[];      // Array of instruction steps
  ingredients: Ingredient[];
  servings: number;
  mealType: string;            // See MealType enum
  fullMeal: boolean;
  timeToCook: number;
  comments?: string;
  source?: string;
  tried: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Ingredient {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
}
```

### Component Generation Configuration

The project is configured to:
- Place new components in `src/app/components` by default (see `angular.json`)
- Use SCSS for styles
- Use standalone components

### Styling Architecture

The project uses a custom design system with Angular Material theming.

**Design Tokens** (`src/styles/_variables.scss`):
- Primary color: `#2563eb` (blue)
- Secondary color: `#64748b` (slate)
- Font: Georgia, 'Times New Roman', serif
- Border radius: 12px default (rounded, modern aesthetic)

**Style Files**:
- `src/styles/_variables.scss` - Custom Material palettes, design tokens (spacing, shadows, colors)
- `src/styles/_typography.scss` - Georgia font configuration, heading styles
- `src/styles/_buttons.scss` - Button system with mixins (primary, secondary, tertiary, danger, add, icon)
- `src/styles/_layout.scss` - Container, flexbox, grid, spacing utilities
- `src/styles/main.scss` - Entry point, Material theme application, component overrides
- `src/styles/index.scss` - Forwards all partials for component imports

**Using Styles in Components**:
```scss
@use 'index' as *;

.my-class {
  color: $color-primary;
  border-radius: $border-radius;
  @include button-primary; // Use button mixin
}
```

**Button Classes Available**:
- `.btn-primary` - Filled blue button
- `.btn-secondary` - Outlined button
- `.btn-tertiary` - Text-only button
- `.btn-danger` - Red destructive action button
- `.btn-add` - Dashed outline for "add new" actions
- `.btn-icon` - Small square icon button

### Build Budgets

**TODO: Optimize component style budgets** - The current `angular.json` has increased style budgets (12kb warning, 16kb error) because components import the full shared styles via `@use 'index' as *`. Once the Material implementation is complete, consider:
1. Tree-shaking unused Material components
2. Refactoring component styles to only import needed variables/mixins
3. Moving repeated styles to global stylesheet
4. Reducing budgets back to stricter limits

## Backend Integration

The frontend expects a Spring Boot backend running on `http://localhost:8080` with the following endpoints:

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/{id}` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `DELETE /api/recipes/{id}` - Delete recipe
- `GET /api/lookup/units` - Get available units of measurement

To run the full stack:
```bash
# From project root
npm run dev

# Or manually:
# Terminal 1: ./gradlew bootRun (from backend directory)
# Terminal 2: ng serve (from frontend directory)
```

Backend database console (H2 dev database): http://localhost:8080/h2-console

## Common Development Patterns

### Adding a New Page/Route

1. Generate component: `ng generate component components/new-page`
2. Add route to `src/app/app.routes.ts`
3. Add navigation link to `src/app/navbar/navbar.component.html` if needed

### Working with Forms

The `AddRecipeComponent` demonstrates the pattern for complex forms:
- Use `ReactiveFormsModule` with `FormBuilder`
- Use `FormArray` for dynamic lists (ingredients, instructions)
- Validate on submit with `markAllAsTouched()`

### Making API Calls

1. Inject the appropriate service (e.g., `RecipeService`)
2. Call service methods which return Observables
3. Subscribe in component or use async pipe in template
4. Example: `this.recipes$ = this.recipeService.getRecipes();` with `<div *ngFor="let recipe of recipes$ | async">`

### Deleting Resources

See `RecipeDetailsComponent.deleteRecipe()` for the pattern:
1. Open Material Dialog for confirmation
2. On confirmation, call service delete method
3. Navigate away after successful deletion

## Notes

- The project uses Angular 20 with the latest standalone component architecture
- TypeScript strict mode is enabled
- No linting configuration is currently set up
- The MealType enum defines allowed meal types: Breakfast, Baking, Lunch, Dinner, Snack
