
import React from 'react';
import { Home, Compass, PlayCircle, Trophy, User } from 'lucide-react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'explore', icon: Compass, label: 'Explorar' },
    { id: 'ride', icon: PlayCircle, label: 'Pedalar', primary: true },
    { id: 'challenges', icon: Trophy, label: 'Desafios' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 flex justify-around items-center px-2 py-3 pb-6 md:hidden z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.primary) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative -top-6 flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isActive ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
                  <Icon size={32} />
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 flex-col p-6 z-50">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold italic text-white">V</div>
          <h1 className="text-xl font-bold tracking-tight">VeloPro</h1>
        </div>
        
        <div className="space-y-2 flex-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-500 font-semibold' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-slate-800/50 rounded-2xl">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Plano Atual</p>
          <p className="text-sm font-semibold text-white mb-3">VeloPro Free</p>
          <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-xs font-bold text-white shadow-lg">
            ASSINAR PREMIUM
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
