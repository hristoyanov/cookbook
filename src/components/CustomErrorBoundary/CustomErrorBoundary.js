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
                <h1>Something went wrong. It happens.</h1>
            );
        }

        return this.props.children;
    }
}

export default CustomErrorBoundary;
