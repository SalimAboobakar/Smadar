import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import critical pages (loaded immediately)
import LandingPage from "./pages/LandingPage";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Lazy load heavy pages for better performance
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const InvestorDashboard = React.lazy(() => import("./pages/InvestorDashboard"));
const VoterPage = React.lazy(() => import("./pages/VoterPage"));
const InvestmentPage = React.lazy(() => import("./pages/InvestmentPage"));
const EnhancedDashboard = React.lazy(() => import("./pages/EnhancedDashboard"));
const MarketPage = React.lazy(() => import("./pages/MarketPage"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="/investor"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <InvestorDashboard />
                </Suspense>
              }
            />
            <Route
              path="/voter"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <VoterPage />
                </Suspense>
              }
            />
            <Route
              path="/investment"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <InvestmentPage />
                </Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <EnhancedDashboard />
                </Suspense>
              }
            />
            <Route
              path="/market"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <MarketPage />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
