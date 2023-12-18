import React from 'react';

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            error,
            hasError: true,
        };
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        // TODO - add remote logging and monitoring
        console.error(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // TODO - add better rendering, particularly between dev and prod environments
            <p>{`Rendering error: ${this.state.error?.message}\n${this.state.error?.stack}`}</p>;
        }

        return this.props.children;
    }
}
