import { Component } from 'react';


class CustomErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error) {
        console.log(error);
    }

    render() {
        if (this.state.error) {
            return (
                <div className="error-page-container">
                    <h1 className="error-page-heading">Something broke.</h1>
                    <p className="error-page-text">Go back to the main page and pretend it didn't happen.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default CustomErrorBoundary;
