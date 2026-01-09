
import React, { useState, useRef } from 'react';
import { Mail, Lock, User, ChevronRight, ArrowLeft, Camera, Upload, MapPin, Ruler, Weight, Calendar } from 'lucide-react';
import { BikeType, RiderLevel, UserProfile } from '../types';

interface AuthProps {
  onAuthSuccess: (user: UserProfile) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    bikeType: BikeType.MTB,
    level: RiderLevel.BEGINNER,
    avatar: '',
    city: '',
    country: '',
    birthDate: '',
    weight: 0,
    height: 0
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usersStr = localStorage.getItem('velopro_database_users');
    const users: UserProfile[] = usersStr ? JSON.parse(usersStr) : [];

    if (isLogin) {
      // Lógica de Login: Busca no "banco de dados" local
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onAuthSuccess(user);
      } else {
        setError('E-mail ou senha incorretos.');
      }
    } else {
      // Lógica de Cadastro
      if (users.some(u => u.email === formData.email)) {
        setError('Este e-mail já está cadastrado.');
        return;
      }
      if (users.some(u => u.username === formData.username)) {
        setError('Este username já está em uso.');
        return;
      }

      const newUser: UserProfile = {
        id: `u_${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatar: formData.avatar || 'https://picsum.photos/id/64/200/200',
        birthDate: formData.birthDate,
        city: formData.city,
        country: formData.country,
        weight: formData.weight,
        height: formData.height,
        bikeType: formData.bikeType,
        level: formData.level,
        followers: 0,
        following: 0
      };

      users.push(newUser);
      localStorage.setItem('velopro_database_users', JSON.stringify(users));
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-[40px] shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center font-black italic text-3xl mx-auto mb-4 shadow-lg shadow-emerald-500/20">V</div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">VeloPro</h1>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? 'Bem-vindo de volta, ciclista.' : `Passo ${step} de 3 - ${step === 1 ? 'Conta' : step === 2 ? 'Perfil' : 'Esporte'}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isLogin ? (
            <>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="E-mail"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="password" 
                    placeholder="Senha"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
                <div className="text-right">
                  <button type="button" className="text-xs text-emerald-500 font-bold hover:underline">Esqueceu a senha?</button>
                </div>
              </div>
            </>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="Nome Completo"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="Username"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="email" 
                      placeholder="E-mail"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="password" 
                      placeholder="Senha"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    <span>PRÓXIMO</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <button onClick={() => setStep(1)} className="flex items-center text-xs text-slate-500 gap-1 mb-2">
                    <ArrowLeft size={14} /> Voltar
                  </button>
                  
                  <div className="flex flex-col items-center mb-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 rounded-full bg-slate-900 border-2 border-dashed border-slate-700 flex items-center justify-center cursor-pointer relative group overflow-hidden"
                    >
                      {formData.avatar ? (
                        <img src={formData.avatar} className="w-full h-full object-cover" alt="Avatar preview" />
                      ) : (
                        <Camera className="text-slate-500 group-hover:text-emerald-500 transition-colors" size={32} />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Upload size={20} className="text-white" />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-2 tracking-widest">Foto de Perfil</p>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="date" 
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-10 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="number" 
                        placeholder="Peso (kg)"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-10 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                        value={formData.weight || ''}
                        onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative col-span-2">
                      <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="number" 
                        placeholder="Altura (cm)"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-10 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                        value={formData.height || ''}
                        onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full bg-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    <span>PRÓXIMO</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <button onClick={() => setStep(2)} className="flex items-center text-xs text-slate-500 gap-1 mb-2">
                    <ArrowLeft size={14} /> Voltar
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="text" 
                        placeholder="Cidade"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-9 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        required
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input 
                        type="text" 
                        placeholder="País"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-9 pr-4 focus:border-emerald-500 outline-none transition-all text-sm"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Tipo de Bike</label>
                    <select 
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 px-4 focus:border-emerald-500 outline-none transition-all text-sm appearance-none"
                      value={formData.bikeType}
                      onChange={(e) => setFormData({...formData, bikeType: e.target.value as BikeType})}
                    >
                      {Object.values(BikeType).map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Seu Nível</label>
                    <select 
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 px-4 focus:border-emerald-500 outline-none transition-all text-sm appearance-none"
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value as RiderLevel})}
                    >
                      {Object.values(RiderLevel).map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all mt-4"
                  >
                    <span>FINALIZAR</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}

          {isLogin && (
            <button 
              type="submit"
              className="w-full bg-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all mt-6"
            >
              <span className="uppercase">ENTRAR</span>
              <ChevronRight size={18} />
            </button>
          )}
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
              setError('');
            }}
            className="text-sm text-slate-400"
          >
            {isLogin ? 'Não tem uma conta?' : 'Já possui conta?'} <span className="text-emerald-500 font-bold underline ml-1">Clique aqui</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
