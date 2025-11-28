import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Chat } from './components/Chat';
import { LawsView } from './components/LawsView';
import { RightsView } from './components/RightsView';
import { ProfileView } from './components/ProfileView';
import { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);

  // Background gradient decoration - Updated for Professional/Safe feel
  const Background = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-200/40 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-100/30 blur-[100px] delay-700 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-sky-100/30 blur-[100px] delay-1000 animate-pulse-slow"></div>
    </div>
  );

  return (
    <div className="min-h-screen text-slate-900 selection:bg-brand-100 selection:text-brand-900 font-sans">
      <Background />
      <Header 
        onReset={() => setAppState(AppState.LANDING)} 
        onShowLaws={() => setAppState(AppState.LAWS)}
        onShowProfile={() => setAppState(AppState.PROFILE)}
      />
      
      <main className="pt-16 min-h-screen flex flex-col">
        {appState === AppState.LANDING && (
          <Hero 
            onStart={() => setAppState(AppState.CHAT)} 
            onShowRights={() => setAppState(AppState.RIGHTS)}
          />
        )}
        
        {appState === AppState.CHAT && (
          <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <Chat onBack={() => setAppState(AppState.LANDING)} />
          </div>
        )}

        {appState === AppState.LAWS && (
           <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <LawsView onBack={() => setAppState(AppState.LANDING)} />
          </div>
        )}

        {appState === AppState.RIGHTS && (
           <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <RightsView onBack={() => setAppState(AppState.LANDING)} />
          </div>
        )}

        {appState === AppState.PROFILE && (
           <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <ProfileView onBack={() => setAppState(AppState.LANDING)} />
          </div>
        )}
      </main>

      {/* Footer */}
      {appState === AppState.LANDING && (
        <footer className="py-10 text-center text-slate-400 text-sm font-medium border-t border-slate-100/50 flex flex-col items-center gap-6">
          <p>© 2025 بيئة عمل آمنة. جميع الحقوق محفوظة.</p>
        </footer>
      )}
    </div>
  );
}

export default App;