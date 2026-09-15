import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import ScrollToHash from "./ScrollToHash";
import { ComplaintWidget } from "@/features/complaints";
import { PageLoader } from "@/shared/components";
import { config } from "@/shared/lib";

const App = () => {
  if (config.maintenanceMode) {
    return (
      <PageLoader
        fullScreen
        title="We're currently down for maintenance"
        subtitle="Please check back shortly."
      />
    );
  }

  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <ScrollToHash />
          <AppRoutes />
          <ComplaintWidget />
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
