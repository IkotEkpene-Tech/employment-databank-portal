import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "@/features/home";
import { NotFoundPage } from "@/features/not-found";
import { PageLoader } from "@/shared/components";

// Only the landing page (and the always-needed shell above) ships in the
// main bundle — everything else below is its own chunk, fetched on first
// visit to that route instead of up front. Keeps the initial JS payload
// small for the page every visitor hits.
const RegisterPage = lazy(() => import("@/features/auth").then((m) => ({ default: m.RegisterPage })));
const VerifyEmailPage = lazy(() => import("@/features/auth").then((m) => ({ default: m.VerifyEmailPage })));
const LoginPage = lazy(() => import("@/features/auth").then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import("@/features/auth").then((m) => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import("@/features/auth").then((m) => ({ default: m.ResetPasswordPage })));

const PrivacyPolicyPage = lazy(() => import("@/features/legal").then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import("@/features/legal").then((m) => ({ default: m.TermsPage })));

const DashboardPage = lazy(() => import("@/features/dashboard").then((m) => ({ default: m.DashboardPage })));
const EmploymentAccessPage = lazy(() =>
  import("@/features/employment-access").then((m) => ({ default: m.EmploymentAccessPage })),
);
const AccessPaymentStatusPage = lazy(() =>
  import("@/features/employment-access").then((m) => ({ default: m.AccessPaymentStatusPage })),
);
const EmploymentRegistrationPage = lazy(() =>
  import("@/features/employment-registration").then((m) => ({ default: m.EmploymentRegistrationPage })),
);

const RouteFallback = () => <PageLoader fullScreen title="Loading..." />;

export const AppRoutes = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Account */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/otp" element={<Navigate to="/login?tab=otp" replace />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Legal */}
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply"
        element={
          <ProtectedRoute>
            <EmploymentAccessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply/payment-status"
        element={
          <ProtectedRoute>
            <AccessPaymentStatusPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employment-registration"
        element={
          <ProtectedRoute>
            <EmploymentRegistrationPage />
          </ProtectedRoute>
        }
      />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
