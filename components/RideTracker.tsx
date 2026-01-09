
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Map as MapIcon, Layers, Navigation, ChevronUp } from 'lucide-react';
import { LocationPoint } from '../types';

interface RideTrackerProps {
  onFinish: (data: any) => void;
}

const RideTracker: React.FC<RideTrackerProps> = ({ onFinish }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [points, setPoints] = useState<LocationPoint[]>([]);
  const [elevation, setElevation] = useState(0);
  
  // Fix: Use number type for setInterval reference in browser environment
  const timerRef = useRef<number | null>(null);
  const geoWatchRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      // Fix: Use window.setInterval to ensure it returns a number in browser environment
      timerRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);

      if ("geolocation" in navigator) {
        geoWatchRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            const newPoint: LocationPoint = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              timestamp: pos.timestamp,
              altitude: pos.coords.altitude || undefined
            };
            
            setPoints(prev => {
              if (prev.length > 0) {
                const last = prev[prev.length - 1];
                // Simple distance calculation (mocking complexity)
                const d = calculateDistance(last.latitude, last.longitude, newPoint.latitude, newPoint.longitude);
                setDistance(total => total + d);
              }
              return [...prev, newPoint];
            });

            const currentSpeed = (pos.coords.speed || 0) * 3.6; // m/s to km/h
            setSpeed(currentSpeed);
          },
          (err) => console.error(err),
          { enableHighAccuracy: true }
        );
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (geoWatchRef.current) navigator.geolocation.clearWatch(geoWatchRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (geoWatchRef.current) navigator.geolocation.clearWatch(geoWatchRef.current);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    if (seconds > 0) {
      setAvgSpeed((distance / (seconds / 3600)) || 0);
    }
  }, [seconds, distance]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // Haversine formula simplified for mockup
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins < 10 && hrs > 0 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsPaused(!isPaused);
  const handleStop = () => {
    onFinish({ distance, duration: seconds, avgSpeed, elevation, points });
    setIsActive(false);
    setSeconds(0);
    setDistance(0);
    setPoints([]);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[60] flex flex-col md:pl-64">
      {/* Map Background Placeholder */}
      <div className="flex-1 bg-slate-900 relative">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/1200')] opacity-30 bg-cover bg-center grayscale contrast-125"></div>
        
        {/* Real-time Map Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] gps-pulse"></div>
        </div>

        {/* Floating Metrics Overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <div className="glass-panel p-4 rounded-3xl flex flex-col items-center min-w-[100px]">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ritmo</span>
             <span className="text-xl font-black mono italic">{speed > 0 ? (60 / speed).toFixed(2) : '--'}</span>
          </div>
          <div className="glass-panel p-4 rounded-3xl flex flex-col items-center min-w-[100px]">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ganhos</span>
             <span className="text-xl font-black mono italic">+{elevation}m</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-900/90 backdrop-blur-3xl p-6 rounded-t-[40px] border-t border-slate-800 shadow-2xl relative">
        <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto mb-6"></div>
        
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Distância (km)</p>
            <p className="text-5xl font-black italic tracking-tighter mono">{distance.toFixed(2)}</p>
          </div>
          <div className="text-center border-l border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Tempo Total</p>
            <p className="text-5xl font-black italic tracking-tighter mono">{formatTime(seconds)}</p>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-8">
          {!isActive ? (
            <button 
              onClick={handleStart}
              className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform active:scale-90"
            >
              <Play size={44} fill="white" className="text-white ml-2" />
            </button>
          ) : (
            <>
              <button 
                onClick={handlePause}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isPaused ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {isPaused ? <Play size={24} fill="currentColor" /> : <Pause size={24} />}
              </button>
              
              <button 
                onDoubleClick={handleStop}
                className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-transform active:scale-90"
              >
                <div className="flex flex-col items-center text-white">
                  <Square size={32} fill="white" />
                  <span className="text-[10px] font-bold mt-1 uppercase">Hold</span>
                </div>
              </button>

              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                <Navigation size={24} />
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center text-[10px] text-slate-600 font-medium uppercase tracking-widest">
           Sinal de GPS estável • {points.length} Pontos capturados
        </div>
      </div>
    </div>
  );
};

export default RideTracker;
