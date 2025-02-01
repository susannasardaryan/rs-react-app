import { Component, ErrorInfo} from "react"

type State = {
    hasError: boolean
}
class ErrorBoundary extends Component<React.PropsWithChildren<{}>, State> {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({hasError : true});
        console.error(error, errorInfo);
    }
    

    render() {
        if(this.state.hasError){
            return <h1>There is something wrong</h1>
        }

        return this.props.children
    }
}

export default ErrorBoundary