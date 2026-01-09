
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { CHALLENGES } from '../constants';
import { Target, Zap, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  user?: any;
}

const statsData = [
  { day: 'Seg', km: 0 },
  { day: 'Ter', km: 0 },
  { day: 'Qua', km: 0 },
  { day: 'Qui', km: 0 },
  { day: 'Sex', km: 0 },
  { day: 'Sab', km: 0 },
  { day: 'Dom', km: 0 },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const firstName = user?.name ? user.name.split(' ')[0].toUpperCase() : 'CICLISTA';

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-100 uppercase">BEM VINDO, {firstName}</h1>
          <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
            <Calendar size={14} /> {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Zap size={24} className="text-white" />
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total KM', val: '0', unit: 'km', color: 'text-emerald-400' },
          { label: 'Atividades', val: '0', unit: 'rides', color: 'text-blue-400' },
          { label: 'Elevação', val: '0', unit: 'm', color: 'text-amber-400' },
          { label: 'Kcal', val: '0', unit: 'kcal', color: 'text-rose-400' },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl hover:border-slate-700 transition-all cursor-default group">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 group-hover:text-slate-400">{s.label}</p>
            <p className={`text-2xl font-black italic tracking-tighter ${s.color}`}>
              {s.val} <span className="text-xs font-normal text-slate-500">{s.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-[32px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-300 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-500" />
            Atividade Semanal
          </h3>
          <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-3 py-1 rounded-full">Iniciando jornada</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statsData}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #1e293b', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                }}
              />
              <Bar dataKey="km" radius={[6, 6, 6, 6]} barSize={32}>
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={'#1e293b'} className="hover:fill-emerald-400 transition-colors" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="space-y-4">
        <h3 className="font-black italic tracking-tighter text-xl text-slate-100 flex items-center gap-2">
          <Target size={20} className="text-orange-500" />
          DESAFIOS ATIVOS
        </h3>
        {CHALLENGES.map(challenge => (
          <div key={challenge.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center gap-4 group cursor-pointer hover:border-slate-700">
            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              {challenge.rewardIcon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-100">{challenge.title}</h4>
              <p className="text-xs text-slate-500 mb-2">{challenge.description}</p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                  style={{ width: `0%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black italic text-emerald-500 mono">
                0%
              </p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">0/{challenge.goal} KM</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default Dashboard;
