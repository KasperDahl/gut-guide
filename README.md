# gut-guide

# backend

./gradlew bootRun

# frontend

ng serve

com.kasper.gutguide
├── controller
│ └── RecipeController
├── service
│ ├── RecipeService (interface)
│ └── RecipeServiceImpl
├── repository
│ └── RecipeRepository
├── model/entity
│ ├── Recipe
│ ├── Ingredient
│ └── Category
├── dto
│ ├── RecipeDTO (for API responses)
│ └── CreateRecipeRequest (for API requests)
└── exception
└── RecipeNotFoundException
