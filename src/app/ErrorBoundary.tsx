import { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";
import { Button } from "@/shared/ui";

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrap>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page and try again.</p>
          <Button onClick={() => window.location.assign("/")}>Go home</Button>
        </Wrap>
      );
    }
    return this.props.children;
  }
}
