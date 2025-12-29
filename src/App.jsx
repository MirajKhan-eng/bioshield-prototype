import React, { useState, useEffect } from 'react';
import { 
  // Navigation & UI
  LayoutDashboard, ArrowLeft, User, Bell, Plus, Minus,
  // Categories
  Heart, Car, ShieldAlert, Leaf, 
  // Healthcare Icons
  Phone, Activity, MapPin, Ambulance, Stethoscope, Bed, Shield,
  // Traffic Icons
  Truck, AlertCircle, Navigation, Clock, Zap, Bus, AlertTriangle,
  // Environment Icons
  Wind, Speaker, Trees, Droplets
} from 'lucide-react';

// --- 1. DATA: GENERIC ZONES (Defined Global) ---
const coords = {
  zone1: { x: 18, y: 45, name: "Industrial Zone A" },
  zone2: { x: 25, y: 55, name: "Tech Park District" },
  zone3: { x: 25, y: 32, name: "North Sector" },
  zone4: { x: 45, y: 40, name: "Central Hub" },
  zone5: { x: 80, y: 25, name: "Eastern Belt" },
  zone6: { x: 50, y: 65, name: "South Region" }
};

// --- 2. SHARED COMPONENT: MAP WIDGET ---
const MapWidget = ({ title, type }) => {
  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <div className="flex gap-2">
              <button onClick={handleZoomOut} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Minus size={16}/></button>
              <button onClick={handleZoomIn} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Plus size={16}/></button>
          </div>
      </div>
      
      <div className="relative w-full flex-1 min-h-[300px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group">
          {/* WRAPPER FOR ZOOM */}
          <div className="w-full h-full relative transition-transform duration-300 origin-center" style={{ transform: `scale(${zoom})` }}>
              
              {/* MAP IMAGE */}
              <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Maharashtra_Districts.png/1024px-Maharashtra_Districts.png" 
                  alt="Map" 
                  className="w-full h-full object-contain opacity-60 grayscale"
              />

              {/* SVG LAYER FOR ROUTES */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {type === 'traffic' && (
                      <>
                          <line x1={`${coords.zone1.x}%`} y1={`${coords.zone1.y}%`} x2={`${coords.zone2.x}%`} y2={`${coords.zone2.y}%`} stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                          <line x1={`${coords.zone1.x}%`} y1={`${coords.zone1.y}%`} x2={`${coords.zone3.x}%`} y2={`${coords.zone3.y}%`} stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                          <line x1={`${coords.zone2.x}%`} y1={`${coords.zone2.y}%`} x2={`${coords.zone6.x}%`} y2={`${coords.zone6.y}%`} stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
                      </>
                  )}
              </svg>

              {/* MARKERS */}
              {Object.keys(coords).map(key => {
                  const pos = coords[key];
                  let colorClass = 'bg-blue-500';
                  let label = pos.name;
                  let show = true;

                  if (type === 'traffic') {
                      if (key === 'zone1' || key === 'zone2') { colorClass = 'bg-red-500 animate-pulse'; label = "Jam"; } 
                      else if (key === 'zone6') { colorClass = 'bg-yellow-500'; label = "Slow"; } 
                      else { colorClass = 'bg-green-500'; label = "Clear"; }
                  } else if (type === 'healthcare') {
                      if (key === 'zone1') { colorClass = 'bg-green-500'; label = "12 Beds"; } 
                      else if (key === 'zone2') { colorClass = 'bg-yellow-500'; label = "Busy"; } 
                      else if (key === 'zone5') { colorClass = 'bg-red-500'; label = "Full"; } 
                      else { show = false; }
                  } else if (type === 'environment') {
                      if (key === 'zone1') { colorClass = 'bg-red-500'; label = "AQI 320"; } 
                      else if (key === 'zone2') { colorClass = 'bg-yellow-500'; label = "AQI 150"; } 
                      else { colorClass = 'bg-green-500'; label = "AQI 45"; }
                  } else {
                       if (key === 'zone1') { colorClass = 'bg-red-500'; label = "Alert"; }
                  }

                  if (!show) return null;

                  return (
                      <div key={key} className="absolute flex flex-col items-center" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}>
                          <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg mb-1 ${colorClass}`}></div>
                          <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold shadow-sm border border-slate-200 whitespace-nowrap">
                              {label}
                          </div>
                      </div>
                  )
              })}
          </div>
      </div>
    </div>
  )
}

// --- 3. HEALTHCARE PAGE COMPONENT ---
const HealthcareView = ({ onBack }) => {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: "City General Hospital", distance: "2.3 km", icu: 12, general: 45, emergency: 8, status: "Available" },
    { id: 2, name: "North Medical Center", distance: "3.7 km", icu: 6, general: 32, emergency: 4, status: "Available" },
    { id: 3, name: "South Care Hospital", distance: "5.1 km", icu: 0, general: 18, emergency: 2, status: "Limited" },
  ]);

  const [ambulances] = useState([
    { id: "AMB-247", station: "Station Alpha", status: "Available", eta: null },
    { id: "AMB-148", station: "Downtown", status: "En Route", eta: "4 min" },
    { id: "AMB-392", station: "Station Beta", status: "Available", eta: null },
  ]);

  // Real-time Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setHospitals(prev => prev.map(h => ({
        ...h,
        general: Math.max(0, h.general + (Math.random() > 0.5 ? 1 : -1)),
        icu: Math.max(0, h.icu + (Math.random() > 0.8 ? -1 : 0))
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-1">
            <ArrowLeft size={16}/> Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold text-slate-900">Healthcare & Emergency Services</h2>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white flex justify-between items-center shadow-lg cursor-pointer hover:scale-[1.01] transition">
        <div>
          <h2 className="text-2xl font-bold mb-1">Emergency Assistance</h2>
          <p className="opacity-90">Press for immediate medical emergency response</p>
        </div>
        <div className="bg-white/20 rounded-full p-4 w-16 h-16 flex items-center justify-center animate-pulse">
          <Phone size={28} fill="currentColor" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="text-blue-500" size={20}/> Hospital Bed Availability
            </h3>
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="border border-slate-100 rounded-lg p-4 hover:shadow-md transition bg-slate-50/50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-slate-900">{hospital.name}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin size={12} className="mr-1" /> {hospital.distance}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      hospital.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{hospital.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-2 rounded border border-slate-100">
                      <p className="text-xs text-gray-500">ICU Beds</p>
                      <p className={`text-xl font-bold ${hospital.icu < 2 ? 'text-red-500' : 'text-slate-800'}`}>{hospital.icu}</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-100">
                      <p className="text-xs text-gray-500">General</p>
                      <p className="text-xl font-bold text-slate-800">{hospital.general}</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-100">
                      <p className="text-xs text-gray-500">Emergency</p>
                      <p className="text-xl font-bold text-slate-800">{hospital.emergency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[400px]">
             <MapWidget title="Nearby Hospitals & Clinics" type="healthcare" />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Ambulance className="text-green-600" size={20}/> Ambulance Fleet
            </h3>
            <div className="space-y-3">
              {ambulances.map((amb) => (
                <div key={amb.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <p className="font-bold text-sm text-slate-800">{amb.id}</p>
                    <p className="text-xs text-gray-500">{amb.station}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      amb.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>{amb.status}</span>
                    {amb.eta && <p className="text-xs text-blue-600 font-bold mt-1">ETA: {amb.eta}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
             <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="text-orange-500" size={20}/> Health Alerts
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
                <p className="text-sm font-bold text-yellow-800">Flu Season Advisory</p>
                <p className="text-xs text-yellow-700 mt-1">Get vaccinated at nearby clinics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. TRAFFIC PAGE COMPONENT ---
const TrafficView = ({ onBack }) => {
  const [trafficStats, setTrafficStats] = useState({ flow: 68, incidents: 3, speed: 42, signals: 247 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficStats(prev => ({
        ...prev,
        speed: Math.max(20, Math.min(80, prev.speed + Math.floor(Math.random() * 5) - 2)),
        flow: Math.max(40, Math.min(99, prev.flow + Math.floor(Math.random() * 3) - 1))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
       <div>
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-1"><ArrowLeft size={16}/> Back to Dashboard</button>
          <h2 className="text-2xl font-bold text-slate-900">Traffic & Transportation</h2>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl p-5 text-white shadow-md bg-gradient-to-r from-orange-500 to-red-500">
          <p className="text-sm opacity-90 mb-1">Traffic Flow</p>
          <h2 className="text-4xl font-bold">{trafficStats.flow}%</h2>
          <p className="text-xs mt-3 opacity-80">Medium Congestion</p>
        </div>
        <div className="rounded-xl p-5 text-white shadow-md bg-gradient-to-r from-pink-500 to-rose-600">
          <p className="text-sm opacity-90 mb-1">Active Incidents</p>
          <h2 className="text-4xl font-bold">{trafficStats.incidents}</h2>
          <p className="text-xs mt-3 opacity-80">2 Critical, 1 Medium</p>
        </div>
        <div className="rounded-xl p-5 text-white shadow-md bg-gradient-to-r from-blue-400 to-blue-600">
          <p className="text-sm opacity-90 mb-1">Avg Speed</p>
          <div className="flex items-end gap-1"><h2 className="text-4xl font-bold">{trafficStats.speed}</h2><span className="mb-1">km/h</span></div>
          <p className="text-xs mt-3 opacity-80">Citywide average</p>
        </div>
        <div className="rounded-xl p-5 text-white shadow-md bg-gradient-to-r from-emerald-400 to-green-600">
          <p className="text-sm opacity-90 mb-1">Signal Status</p>
          <h2 className="text-4xl font-bold">{trafficStats.signals}</h2>
          <p className="text-xs mt-3 opacity-80">98.8% Operational</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-[500px]">
           <MapWidget title="Real-Time Traffic Map" type="traffic" />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" size={18}/> Active Incidents
            </h3>
            <div className="space-y-4">
               <div className="p-4 rounded-lg border-l-4 bg-red-50 border-red-500">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-800 text-sm">Accident</span>
                    <span className="text-xs text-gray-500">5 min ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">Highway 101, Exit 15</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white bg-red-500">High Severity</span>
                </div>
                <div className="p-4 rounded-lg border-l-4 bg-yellow-50 border-yellow-500">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-800 text-sm">Road Block</span>
                    <span className="text-xs text-gray-500">12 min ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">Main St & 5th Ave</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white bg-yellow-500">Medium</span>
                </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-6">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Navigation size={18}/> Emergency Routing
            </h3>
            <p className="text-xs text-blue-700 mb-4">
              1 emergency vehicle en route - priority signals activated
            </p>
            <div className="flex items-center gap-3 mb-2">
              <Clock size={16} className="text-blue-500"/>
              <span className="text-sm font-bold text-blue-900">ETA: 4 minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <Navigation size={16} className="text-blue-500"/>
              <span className="text-sm text-blue-800">Route: Main St → Highway 101</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap className="text-green-500" size={18}/> Traffic Signal Status</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
                  <div><p className="font-bold text-sm">TS-001 <span className="text-xs font-normal text-gray-500">Main St & 1st Ave</span></p></div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Operational</span>
               </div>
            </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Bus className="text-purple-500" size={18}/> Public Transport Live</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
                  <div>
                    <p className="font-bold text-sm">Bus 42 <span className="text-xs font-normal text-gray-500">Downtown - Airport</span></p>
                    <p className="text-xs text-gray-400">Next arrival: 3 min</p>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">On Time</span>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- 5. MAIN APP COMPONENT ---
function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex items-center justify-between">
         <div>
           <h2 className="text-2xl font-bold text-slate-900">BioShield Central</h2>
           <p className="text-slate-500">Live Risk Monitoring System</p>
         </div>
         <button onClick={() => window.location.href="tel:112"} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-red-200">
           <Phone size={18}/> Emergency SOS
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div onClick={() => setActiveTab('Healthcare')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition">
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-2 text-slate-700 font-bold"><Heart className="text-green-500"/> Healthcare</div>
             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Stable</span>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm">
             <div><p className="text-slate-500">Bed Availability</p><p className="font-bold text-lg">85%</p></div>
             <div><p className="text-slate-500">Active Units</p><p className="font-bold text-lg">12</p></div>
           </div>
         </div>
         <div onClick={() => setActiveTab('Traffic')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition">
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-2 text-slate-700 font-bold"><Car className="text-orange-500"/> Traffic</div>
             <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded font-bold">Alert</span>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm">
             <div><p className="text-slate-500">Congestion</p><p className="font-bold text-lg">High</p></div>
             <div><p className="text-slate-500">Incidents</p><p className="font-bold text-lg">2</p></div>
           </div>
         </div>
         <div onClick={() => setActiveTab('Disaster')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition">
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-2 text-slate-700 font-bold"><ShieldAlert className="text-blue-500"/> Safety</div>
             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Secure</span>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm">
             <div><p className="text-slate-500">Risk Level</p><p className="font-bold text-lg">Low</p></div>
             <div><p className="text-slate-500">Shelters</p><p className="font-bold text-lg">15</p></div>
           </div>
         </div>
         <div onClick={() => setActiveTab('Environment')} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition">
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-2 text-slate-700 font-bold"><Leaf className="text-yellow-500"/> Environment</div>
             <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-bold">Warning</span>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm">
             <div><p className="text-slate-500">Avg AQI</p><p className="font-bold text-lg">145</p></div>
             <div><p className="text-slate-500">Pollution Alerts</p><p className="font-bold text-lg">3</p></div>
           </div>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
           <MapWidget title="Live Threat Map" type="all" />
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-slate-800 flex items-center gap-2"><Bell size={18}/> Priority Alerts</h3>
             <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">1 Critical</span>
           </div>
           <div className="space-y-3">
             <div className="bg-red-50 border border-red-100 p-3 rounded-lg">
               <div className="flex justify-between text-xs text-red-400 mb-1">
                 <span className="flex items-center gap-1 font-bold"><AlertTriangle size={12}/> Traffic Accident</span>
                 <span>2 min ago</span>
               </div>
               <p className="text-sm text-red-800 font-medium">South Highway Blocked</p>
             </div>
             <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
               <div className="flex justify-between text-xs text-yellow-600 mb-1">
                 <span className="flex items-center gap-1 font-bold"><Wind size={12}/> AQI Spike</span>
                 <span>15 min ago</span>
               </div>
               <p className="text-sm text-yellow-800 font-medium">Industrial Zone A: Hazardous</p>
             </div>
           </div>
         </div>
       </div>
    </div>
  );

  const renderEnvironment = () => (
    <div className="space-y-6 animate-fade-in">
        <button onClick={() => setActiveTab('Dashboard')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-2"><ArrowLeft size={16}/> Back to Dashboard</button>
        <h2 className="text-2xl font-bold text-slate-900">Environment & Pollution Monitoring</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white">
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-5 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-blue-100 text-sm mb-1"><Wind size={16}/> Avg AQI</div>
                <div className="text-4xl font-bold mb-1">89</div>
                <div className="text-blue-100 text-xs">Moderate - Region Wide</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-purple-100 text-sm mb-1"><Speaker size={16}/> Noise Level</div>
                <div className="text-4xl font-bold mb-1">62 dB</div>
                <div className="text-purple-200 text-xs">Acceptable Range</div>
            </div>
             <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-green-100 text-sm mb-1"><Trees size={16}/> Green Cover</div>
                <div className="text-4xl font-bold mb-1">34%</div>
                <div className="text-green-200 text-xs">Stable</div>
            </div>
             <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-5 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-cyan-100 text-sm mb-1"><Droplets size={16}/> Humidity</div>
                <div className="text-4xl font-bold mb-1">72%</div>
                <div className="text-cyan-200 text-xs">High Chance of Rain</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Air Quality Index by Zone</h3>
                <div className="space-y-6 mb-8">
                    <div>
                        <div className="flex justify-between mb-1 text-sm font-bold text-slate-700"><span>Industrial Zone A</span><span className="text-red-500">145 AQI</span></div>
                        <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{width: '75%'}}></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1 text-sm font-bold text-slate-700"><span>North Sector</span><span className="text-yellow-500">85 AQI</span></div>
                        <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{width: '45%'}}></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1 text-sm font-bold text-slate-700"><span>Eastern Belt</span><span className="text-green-500">55 AQI</span></div>
                        <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div></div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <MapWidget title="Pollution Heatmap" type="environment" />
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">BS</div>
          <div><h1 className="font-bold text-lg leading-tight">BioShield</h1><p className="text-xs text-slate-500">Public Safety</p></div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={() => setActiveTab('Dashboard')} className={`flex items-center gap-2 hover:text-blue-600 ${activeTab === 'Dashboard' ? 'text-blue-600' : ''}`}><LayoutDashboard size={18}/> Dashboard</button>
          <button onClick={() => setActiveTab('Healthcare')} className={`flex items-center gap-2 hover:text-blue-600 ${activeTab === 'Healthcare' ? 'text-blue-600' : ''}`}><Heart size={18}/> Healthcare</button>
          <button onClick={() => setActiveTab('Traffic')} className={`flex items-center gap-2 hover:text-blue-600 ${activeTab === 'Traffic' ? 'text-blue-600' : ''}`}><Car size={18}/> Traffic</button>
          <button onClick={() => setActiveTab('Environment')} className={`flex items-center gap-2 hover:text-blue-600 ${activeTab === 'Environment' ? 'text-blue-600' : ''}`}><Leaf size={18}/> Environment</button>
        </div>
        <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-2 rounded-full relative">
                <Bell size={18} className="text-slate-600"/>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center border border-slate-300"><User size={16} className="text-slate-500"/></div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Healthcare' && <HealthcareView onBack={() => setActiveTab('Dashboard')} />}
        {activeTab === 'Traffic' && <TrafficView onBack={() => setActiveTab('Dashboard')} />}
        {activeTab === 'Environment' && renderEnvironment()}
        {activeTab === 'Disaster' && (
             <div className="space-y-6 animate-fade-in">
                <button onClick={() => setActiveTab('Dashboard')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-2"><ArrowLeft size={16}/> Back to Dashboard</button>
                <h2 className="text-2xl font-bold text-slate-900">Disaster Management</h2>
                <div className="bg-white p-12 rounded-xl text-center border border-slate-200 shadow-sm">
                    <ShieldAlert size={64} className="mx-auto text-green-500 mb-4"/>
                    <h3 className="text-xl font-bold text-slate-800">No Active Disasters</h3>
                    <p className="text-slate-500">Monitoring regional seismic and weather activity...</p>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}

export default App;