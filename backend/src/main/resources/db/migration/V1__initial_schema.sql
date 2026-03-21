-- ============================================
-- V1: Initial database schema
-- ============================================

CREATE TABLE recipes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    servings INTEGER NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    full_meal BOOLEAN NOT NULL DEFAULT false,
    time_to_cook INTEGER,
    comments TEXT,
    source VARCHAR(500),
    tried BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE ingredients (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    recipe_id BIGINT NOT NULL,
    CONSTRAINT fk_ingredients_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE recipe_instructions (
    recipe_id BIGINT NOT NULL,
    instruction TEXT,
    instruction_order INTEGER NOT NULL,
    PRIMARY KEY (recipe_id, instruction_order),
    CONSTRAINT fk_instructions_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
