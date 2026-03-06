import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Disclaimer from './pages/Disclaimer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminLeads from './pages/AdminLeads'
import AdminLeadDetail from './pages/AdminLeadDetail'
import AdminSettings from './pages/AdminSettings'
import AdminNotifications from './pages/AdminNotifications'
import AdminContactForm from './pages/admin/AdminContactForm'
import AdminSiteInfo from './pages/AdminSiteInfo'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

// Layout for public pages (with header/footer)
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/disclaimer" element={<PublicLayout><Disclaimer /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/terms-of-service" element={<PublicLayout><TermsOfService /></PublicLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/admin/leads/:id" element={<AdminLeadDetail />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/contact-form" element={<AdminContactForm />} />
        <Route path="/admin/site-info" element={<AdminSiteInfo />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </div>
  )
}

export default App
