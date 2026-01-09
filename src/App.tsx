import { Routes, Route } from "react-router-dom";
import { MarketingLayout } from "./layout/MarketingLayout";
import { AdminLayout } from "./layout/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { ProductPage } from "./pages/ProductPage";
import { AiPage } from "./pages/AiPage";
import { ResultsPage } from "./pages/ResultsPage";
import { AboutPage } from "./pages/AboutPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { PagesEditor } from "./pages/admin/PagesEditor";
import { ArticlesManager } from "./pages/admin/ArticlesManager";
import { ContactSubmissions } from "./pages/admin/ContactSubmissions";
import { SEOEditor } from "./pages/admin/SEOEditor";
import { GTMEditor } from "./pages/admin/GTMEditor";
import { ImageManager } from "./pages/admin/ImageManager";
import { GTMHead } from "./components/GTMHead";
import { SEOHead } from "./components/SEOHead";
import { useScrollTracking } from "./hooks/useScrollTracking";
import { BuilderPage } from "./pages/BuilderPage";
import { BuilderEditor } from "./pages/admin/BuilderEditor";

function AppContent() {
  useScrollTracking();

  return (
    <>
      <GTMHead />
      <SEOHead />
    <Routes>
      {/* Public Marketing Routes */}
      <Route
        path="/*"
        element={
          <MarketingLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/ai" element={<AiPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/news/:id" element={<ArticleDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </MarketingLayout>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/pages" element={<PagesEditor />} />
                <Route path="/articles" element={<ArticlesManager />} />
                <Route path="/contact" element={<ContactSubmissions />} />
                <Route path="/seo" element={<SEOEditor />} />
                <Route path="/gtm" element={<GTMEditor />} />
                <Route path="/images" element={<ImageManager />} />
                <Route path="/builder" element={<BuilderEditor />} />
                <Route path="/settings" element={<div className="p-8 text-slate-50">Settings - Coming Soon</div>} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}


