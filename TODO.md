Frontend:

(If using Claude Code, maybe a TDD approach?)

- Add "Low FODMAP" - check mark field (also to model in backend)
- Make check marks visible on recipe-details page (Full Meal, Tried Before, Low FODMAP)
- Add obvious validation to Add / Edit Recipe page; right now it is not obvious which fields are required to create / update a recipe
- Add dropdown based on Meal Type (update in backend - see below)
- Fix bug on existing recipes that can't be updated (all the old ones seems to be weird in this regard)
- Introduce filtering
- Update design of About page to be more aligned with Home page.

Backend:
Add Enum for Meal Type (as with quantity)