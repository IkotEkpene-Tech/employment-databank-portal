import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "@/features/home";
import { NotFoundPage } from "@/features/not-found";
import {
  RegisterPage,
  VerifyEmailPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "@/features/auth";
import { DashboardPage } from "@/features/dashboard";
import { EmploymentRegistrationPage } from "@/features/employment-registration";
import {
  EmploymentAccessPage,
  AccessPaymentStatusPage,
} from "@/features/employment-access";
import { PrivacyPolicyPage, TermsPage } from "@/features/legal";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />

    {/* Account */}
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/verify-email" element={<VerifyEmailPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/login/otp"
      element={<Navigate to="/login?tab=otp" replace />}
    />
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
);
