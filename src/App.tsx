import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import AddVehicleView from './views/AddVehicleView';
import DiagnosisView from './views/DiagnosisView';
import BookingView from './views/BookingView';
import WalletView from './views/WalletView';
import LoginView from './views/LoginView';
import StudioView from './views/StudioView';
import MarketView from './views/MarketView';
import AppointmentsView from './views/AppointmentsView';
import { NotificationProvider } from './components/NotificationSystem';
import { ThemeProvider } from './components/ThemeProvider';
import { useEffect } from 'react';
import React from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <>
      <ScrollToTop />
      {isAuthPage ? (
        <Routes>
          <Route path="/login" element={<LoginView />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/add-vehicle" element={<AddVehicleView />} />
            <Route path="/diagnosis" element={<DiagnosisView />} />
            <Route path="/bookings" element={<BookingView />} />
            <Route path="/wallet" element={<WalletView />} />
            <Route path="/studio" element={<StudioView />} />
            <Route path="/market" element={<MarketView />} />
            <Route path="/appointments" element={<AppointmentsView />} />
            {/* Redirect unknown routes to login for demo purposes, or home */}
            <Route path="*" element={<HomeView />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="live-car-theme">
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}
