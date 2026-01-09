
import React from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, TrendingUp, Zap } from 'lucide-react';
import { Activity } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden mb-4 hover:border-slate-700 transition-colors">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={activity.userAvatar} className="w-10 h-10 rounded-full border border-slate-700" alt={activity.userName} />
          <div>
            <h3 className="font-semibold text-sm">{activity.userName}</h3>
            <p className="text-xs text-slate-500">{formatDistanceToNow(new Date(activity.date), { addSuffix: true, locale: ptBR })}</p>
          </div>
        </div>
        <div className="text-xs font-bold px-3 py-1 bg-slate-800 rounded-full text-slate-400">
          {activity.type}
        </div>
      </div>

      <div className="px-4 pb-2">
        <h4 className="text-lg font-bold mb-3">{activity.title}</h4>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-800/50 p-3 rounded-xl">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Distância</p>
            <p className="text-lg font-bold text-emerald-400 mono">{activity.distance.toFixed(1)} <span className="text-xs font-normal text-slate-400">km</span></p>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Elevação</p>
            <p className="text-lg font-bold text-amber-400 mono">{activity.elevation} <span className="text-xs font-normal text-slate-400">m</span></p>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Tempo</p>
            <p className="text-lg font-bold text-blue-400 mono">{Math.floor(activity.duration / 60)} <span className="text-xs font-normal text-slate-400">min</span></p>
          </div>
        </div>
      </div>

      <div className="h-48 bg-slate-800 relative group cursor-pointer overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${activity.id}/600/300`} 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
          alt="Map" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white flex items-center space-x-1">
            <TrendingUp size={12} className="text-emerald-500" />
            <span>SPEED: {activity.avgSpeed} km/h</span>
          </div>
          <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white flex items-center space-x-1">
            <Zap size={12} className="text-orange-500" />
            <span>{activity.calories} KCAL</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between border-t border-slate-800/50">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1.5 text-slate-400 hover:text-rose-500 transition-colors">
            <Heart size={20} />
            <span className="text-sm font-medium">{activity.likes}</span>
          </button>
          <button className="flex items-center space-x-1.5 text-slate-400 hover:text-blue-400 transition-colors">
            <MessageCircle size={20} />
            <span className="text-sm font-medium">{activity.comments}</span>
          </button>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="max-w-2xl mx-auto py-4 px-4 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black italic tracking-tighter uppercase text-emerald-500">FEED GLOBAL</h2>
        <div className="flex space-x-2">
          <button className="text-xs font-bold px-3 py-1.5 bg-emerald-500 rounded-lg">SEGUE</button>
          <button className="text-xs font-bold px-3 py-1.5 bg-slate-800 text-slate-400 rounded-lg">VOCÊ</button>
        </div>
      </div>
      
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}

      <div className="h-24 md:hidden"></div>
    </div>
  );
};

export default ActivityFeed;
