import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { AuthPage } from './components/AuthPage';
import { HomePage } from './components/HomePage';
import { JournalPage } from './components/JournalPage';
import { CalendarPage } from './components/CalendarPage';
import { InsightsPage } from './components/InsightsPage';
import { FavoritesPage } from './components/FavoritesPage';
import { ToolsPage } from './components/ToolsPage';
import { SettingsPage } from './components/SettingsPage';
import { CommunityPage } from './components/CommunityPage';
import { ProfilePage } from './components/ProfilePage';
import { HistoryPage } from './components/HistoryPage';
import { ChallengesPage } from './components/ChallengesPage';
import PricingPage from './components/PricingPage';
import { ResourcesPage } from './components/ResourcesPage';
import { ChaptersPage } from './components/ChaptersPage';
import { CaregiverPage } from './components/CaregiverPage';
import { TherapistSupportPage } from './components/TherapistSupportPage';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { GoalsPage } from './components/GoalsPage';
import { SpiritualSupportPage } from './components/SpiritualSupportPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import DataDeletionPage from './components/DataDeletionPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import MissionVisionPage from './components/MissionVisionPage';
import ForTeensPage from './components/ForTeensPage';
import ForSchoolCounselorsPage from './components/ForSchoolCounselorsPage';
import OnboardingPage from './components/OnboardingPage';
import { InstallAppButton } from './components/InstallAppButton';
import MainLayout from './components/MainLayout';
import { IssuesGridPage } from './components/IssuesGridPage';
import { SavedToolsPage } from './components/SavedToolsPage';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'onboarding' | 'home' | 'auth' | 'journal' | 'calendar' | 'insights' | 'tools' | 'favorites' | 'settings' | 'community' | 'profile' | 'history' | 'challenges' | 'pricing' | 'resources' | 'chapters' | 'caregiver' | 'therapist-support' | 'analytics' | 'goals' | 'spiritual-support' | 'privacy' | 'terms' | 'data-deletion' | 'about' | 'contact' | 'faq' | 'mission-vision' | 'teens' | 'school-counselors' | 'issues-grid' | 'saved-tools'>('home');
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!loading && !hasInitialized) {
      if (user) {
        setCurrentPage('journal');
      } else {
        setCurrentPage('home');
      }
      setHasInitialized(true);
    }
  }, [user, loading, hasInitialized]);

  useEffect(() => {
    if (!hasInitialized || loading) return;

    if (user && (currentPage === 'auth' || currentPage === 'onboarding')) {
      setCurrentPage('journal');
    }
  }, [user, currentPage, hasInitialized, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const pagesWithLayout = ['home', 'about', 'faq', 'contact', 'mission-vision', 'privacy', 'terms', 'data-deletion', 'therapist-support', 'teens', 'school-counselors'];
  const shouldUseLayout = pagesWithLayout.includes(currentPage);

  const renderPage = () => {
    if (!hasInitialized) {
      return null;
    }

    if (currentPage === 'onboarding') {
      return (
        <OnboardingPage
          onFinish={() => setCurrentPage('auth')}
          onSkip={() => setCurrentPage('auth')}
        />
      );
    }
    if (currentPage === 'home') {
      return <HomePage onStartJournal={() => setCurrentPage('auth')} onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'auth') {
      return <AuthPage />;
    }
    if (!user) {
      return <HomePage onStartJournal={() => setCurrentPage('auth')} onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'journal') {
      return <JournalPage onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'calendar') {
      return <CalendarPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'insights') {
      return <InsightsPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'favorites') {
      return <FavoritesPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'tools') {
      return <ToolsPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'settings') {
      return <SettingsPage onBack={() => setCurrentPage('home')} onNavigate={(page) => setCurrentPage(page as any)} />;
    }
    if (currentPage === 'community') {
      return <CommunityPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'profile') {
      return <ProfilePage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'history') {
      return <HistoryPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'challenges') {
      return <ChallengesPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'pricing') {
      return <PricingPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'resources') {
      return <ResourcesPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'chapters') {
      return <ChaptersPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'caregiver') {
      return <CaregiverPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'therapist-support') {
      return <TherapistSupportPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'analytics') {
      return <AnalyticsDashboard onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'goals') {
      return <GoalsPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'spiritual-support') {
      return <SpiritualSupportPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'privacy') {
      return <PrivacyPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'terms') {
      return <TermsPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'data-deletion') {
      return <DataDeletionPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'about') {
      return <AboutPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'contact') {
      return <ContactPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'faq') {
      return <FAQPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'mission-vision') {
      return <MissionVisionPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'teens') {
      return <ForTeensPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'school-counselors') {
      return <ForSchoolCounselorsPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'issues-grid') {
      return <IssuesGridPage onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'saved-tools') {
      return <SavedToolsPage onBack={() => setCurrentPage('home')} />;
    }
    return <div>Feature coming soon</div>;
  };

  return (
    <>
      {shouldUseLayout ? (
        <MainLayout onNavigate={setCurrentPage}>
          {renderPage()}
        </MainLayout>
      ) : (
        renderPage()
      )}
      <InstallAppButton />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
