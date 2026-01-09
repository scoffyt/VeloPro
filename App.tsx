
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ActivityFeed from './components/ActivityFeed';
import Dashboard from './components/Dashboard';
import RideTracker from './components/RideTracker';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { MOCK_ACTIVITIES } from './constants';
import { Activity, BikeType, Privacy, UserProfile } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('velopro_current_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('velopro_current_user');
      }
    }
  }, []);

  const handleAuthSuccess = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('velopro_current_user', JSON.stringify(userData));
    setActiveTab('feed');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('velopro_current_user');
  };

  const handleFinishRide = (data: any) => {
    const newActivity: Activity = {
      id: `a${Date.now()}`,
      userId: user?.id || 'u1',
      userName: user?.name || 'Atleta',
      userAvatar: user?.avatar || 'https://picsum.photos/id/64/200/200',
      title: 'Pedalada de Tarde',
      type: user?.bikeType || BikeType.GRAVEL,
      distance: data.distance,
      duration: data.duration,
      avgSpeed: data.avgSpeed,
      maxSpeed: data.avgSpeed * 1.5,
      elevation: data.elevation,
      calories: Math.floor(data.distance * 30),
      points: data.points,
      date: new Date().toISOString(),
      privacy: Privacy.PUBLIC,
      likes: 0,
      comments: 0
    };
    setActivities([newActivity, ...activities]);
    setActiveTab('feed');
  };

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <ActivityFeed activities={activities} />;
      case 'explore':
        return (
          <div className="flex items-center justify-center h-[80vh] text-slate-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800 text-3xl">
                 🌍
              </div>
              <p className="font-bold italic tracking-tighter uppercase">MAPA DE EXPLORAÇÃO EM BREVE</p>
            </div>
          </div>
        );
      case 'challenges':
        return <Dashboard user={user} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      case 'ride':
        return <RideTracker onFinish={handleFinishRide} />;
      default:
        return <ActivityFeed activities={activities} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 relative">
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center font-black italic text-[10px]">V</div>
            <h1 className="font-black italic tracking-tighter text-lg uppercase">VeloPro</h1>
          </div>
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-[10px]">
               🔔
             </div>
             <img src={user?.avatar} className="w-8 h-8 rounded-full border border-slate-800 object-cover" />
          </div>
        </header>

        <div className="pb-20 md:pb-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
