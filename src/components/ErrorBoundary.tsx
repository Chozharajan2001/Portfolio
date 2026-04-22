import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl border border-red-500/30 backdrop-blur-sm text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
                        >
                            <AlertTriangle className="w-10 h-10 text-red-400" />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-red-400 mb-4">Something Went Wrong</h2>
                        <p className="text-gray-300 mb-6">
                            An unexpected error occurred. Don't worry, you can try reloading the page.
                        </p>

                        {this.state.error && (
                            <details className="mb-6 text-left">
                                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 mb-2">
                                    Error Details
                                </summary>
                                <pre className="text-xs text-red-300 bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                                    {this.state.error.message}
                                </pre>
                            </details>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={this.handleRetry}
                            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-semibold text-white flex items-center justify-center space-x-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            <span>Reload Page</span>
                        </motion.button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
