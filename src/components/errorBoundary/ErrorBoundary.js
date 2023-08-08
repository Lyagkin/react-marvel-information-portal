import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);

    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <h2>Something go wrong! Please reload your app!</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
