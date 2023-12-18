import '../../lib/gpt';
import { getStore } from '../../store';
import { ErrorBoundary } from '../ErrorBoundary';
import { AppBody } from './Body';
import React from 'react';
import { Provider } from 'react-redux';

export function App() {
    return (
        <ErrorBoundary>
            <Provider store={getStore()}>
                <AppBody />
            </Provider>
        </ErrorBoundary>
    );
}
