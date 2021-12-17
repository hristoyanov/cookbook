import { render, screen } from '@testing-library/react';

import AlertWindow from './AlertWindow';


describe('AlertWindow Component', () => {
    test('Displays correct title', () => {
        render(
            <AlertWindow title="Test Title" show={true} />
        );

        expect(document.querySelector('.alert-window-header-title').textContent).toBe('Test Title');
    });
});
