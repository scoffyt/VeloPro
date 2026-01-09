
import React from 'react';
import { Settings, MapPin, Ruler, Weight, User as UserIcon, LogOut, Calendar } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="relative group cursor-pointer">
          <img 
            src={user.avatar} 
            className="w-32 h-32 rounded-[40px] border-4 border-slate-800 shadow-2xl mb-4 group-hover:opacity-80 transition-opacity object-cover" 
            alt="Profile" 
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-2 bg-black/60 rounded-full text-white">
              <Settings size={20} />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-black italic tracking-tighter text-slate-100">{user.name.toUpperCase()}</h2>
        <p className="text-emerald-500 font-bold tracking-widest text-xs mb-4">@{user.username}</p>
        
        <div className="flex items-center space-x-2 text-slate-500 text-sm bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
          <MapPin size={14} className="text-rose-500" />
          <span>{user.city}, {user.country}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center">
          <p className="text-2xl font-black italic text-slate-100">{user.followers}</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Seguidores</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center">
          <p className="text-2xl font-black italic text-slate-100">{user.following}</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Seguindo</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] px-2">BIO & ESPECIFICAÇÕES</h3>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800/50">
          {[
            { label: 'Bike Principal', value: user.bikeType, icon: UserIcon },
            { label: 'Nível de Atleta', value: user.level, icon: UserIcon },
            { label: 'Nascimento', value: user.birthDate ? new Date(user.birthDate).toLocaleDateString('pt-BR') : '--', icon: Calendar },
            { label: 'Altura', value: `${user.height} cm`, icon: Ruler },
            { label: 'Peso', value: `${user.weight} kg`, icon: Weight },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-800/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-400">{item.label}</span>
              </div>
              <span className="text-sm font-bold text-slate-100">{item.value}</span>
            </div>
          ))}
        </div>

        <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] px-2 mt-8">RECORDES PESSOAIS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 p-5 rounded-3xl">
            <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest mb-1">Maior Distância</p>
            <p className="text-2xl font-black italic text-emerald-500 mono">0.0 km</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 p-5 rounded-3xl">
            <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest mb-1">Max Elevação</p>
            <p className="text-2xl font-black italic text-amber-500 mono">0 m</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-12 flex items-center justify-center space-x-3 text-rose-500 font-bold p-5 rounded-3xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut size={20} />
          <span>SAIR DA CONTA</span>
        </button>
      </div>

      <div className="h-24 md:hidden"></div>
    </div>
  );
};

export default Profile;
