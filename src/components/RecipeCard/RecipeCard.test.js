import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import RecipeCard from './RecipeCard';


const testRecipe = {
    id: 1,
    name: 'testRecipe',
    imageURL: 'https://test-site.com/test-image.jpg',
    prepTime: 60,
    likes: ['a', 'b', 'c'],
    comments: ['d', 'e', 'f', 'g']
}

describe('RecipeCard Component', () => {
    test('Displays correct recipe name', () => {
        render(
            <BrowserRouter>
                <RecipeCard {...testRecipe} />
            </BrowserRouter>
        );

        expect(screen.getByRole('heading')).toHaveTextContent('testRecipe');
    });

    test('Displays correct recipe url', () => {
        render(
            <BrowserRouter>
                <RecipeCard {...testRecipe} />
            </BrowserRouter>
        );

        expect(screen.getByAltText('recipe-img')).toHaveAttribute('src', 'https://test-site.com/test-image.jpg');
    });

    test('Displays correct recipe preparation time', () => {
        render(
            <BrowserRouter>
                <RecipeCard {...testRecipe} />
            </BrowserRouter>
        );

        expect(document.querySelector('.recipes-list-item-prep-time').textContent).toBe('60 minutes');
    });

    test('Displays correct recipe likes/comments count', () => {
        render(
            <BrowserRouter>
                <RecipeCard {...testRecipe} />
            </BrowserRouter>
        );

        expect(document.querySelector('.recipes-list-item-likes-comments-count').textContent).toBe(' 3 /  4');
    });

    test('Details link has correct path to recipe details', () => {
        render(
            <BrowserRouter>
                <RecipeCard {...testRecipe} />
            </BrowserRouter>
        );

        expect(screen.getByText('Details').closest('a')).toHaveAttribute('href', '/recipes/1/details');
    });
});
