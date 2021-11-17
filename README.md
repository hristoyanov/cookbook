# Cookbook

An application for sharing cooking recipes. Users can view, create and like recipes.

## Basic functionality

### Non-registered users:
- Can only view public recipes/other users' public recipes.

### Registered users:
- Can create their own recipes.
- View other users' public recipes.
- Like recipes.
- View recipes they have liked.
- Edit their own recipes.
- Delete their own recipes.
- Set public/private status for their recipes (Determines recipe visibility to other users).

## Creating an account
The application uses Firebase Authentication - users sign up/sign in using an email and choose a display name (username).

## Creating a recipe
Users need to provide:
- Recipe name
- Image URL
- List of ingredients
- Preparation time
- preparation - description of how to actually prepare the dish
- Recipe status (public/private)

All recipes are public by default.