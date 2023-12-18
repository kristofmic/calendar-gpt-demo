import { useEffect } from 'react';

export function useOnEscape(onEscape: () => void) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onEscape();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onEscape]);
}
