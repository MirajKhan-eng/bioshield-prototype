import React, { useState } from 'react';
import { 
  LayoutDashboard, Heart, Car, ShieldAlert, Leaf, Bell, 
  Phone, AlertTriangle, Wind, User, ArrowLeft, Stethoscope, 
  Ambulance, Bed, Clock, Speaker, Droplets, Trees, Plus, Minus
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [zoom, setZoom] = useState(1);

  // --- ZOOM CONTROLS ---
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  // --- LOCATION COORDINATES (Now mapped to Generic Zones) ---
  const coords = {
    zone1: { x: 18, y: 45, name: "Industrial Zone A" },
    zone2: { x: 25, y: 55, name: "Tech Park District" },
    zone3: { x: 25, y: 32, name: "North Sector" },
    zone4: { x: 45, y: 40, name: "Central Hub" },
    zone5: { x: 80, y: 25, name: "Eastern Belt" },
    zone6: { x: 50, y: 65, name: "South Region" }
  };

  // --- VIEWS ---

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
       {/* HEADER */}
       <div className="flex items-center justify-between">
         <div>
           <h2 className="text-2xl font-bold text-slate-900">BioShield Central</h2>
           <p className="text-slate-500">Live Risk Monitoring System</p>
         </div>
         <button onClick={() => window.location.href="tel:112"} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-red-200">
           <Phone size={18}/> Emergency SOS
         </button>
       </div>

       {/* STAT CARDS */}
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

       {/* MAP SECTION */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
           <MapWidget title="Live Threat Map" type="all" coords={coords} />
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
        
        {/* TOP CARDS */}
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
            {/* ... other cards kept same ... */}
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

            {/* MAP */}
            <div className="lg:col-span-1">
                <MapWidget title="Pollution Heatmap" type="environment" coords={coords} />
            </div>
        </div>
    </div>
  );

  const renderHealthcare = () => (
    <div className="space-y-6 animate-fade-in">
        <button onClick={() => setActiveTab('Dashboard')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-2"><ArrowLeft size={16}/> Back to Dashboard</button>
        <h2 className="text-2xl font-bold text-slate-900">Healthcare Capacity</h2>
        
        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-green-500">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-2"><Stethoscope size={14}/> Emergencies</div>
                <div className="text-3xl font-bold text-slate-800">3</div>
             </div>
             {/* ... other cards ... */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <MapWidget title="Hospital Bed Map" type="healthcare" coords={coords} />
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Hospital Status</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded border">
                        <div>
                            <div className="font-bold text-sm">Central General</div>
                            <div className="text-xs text-slate-500">General Ward</div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Available</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded border">
                        <div>
                            <div className="font-bold text-sm">Tech Park Clinic</div>
                            <div className="text-xs text-slate-500">Trauma Center</div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-bold">Busy</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded border">
                        <div>
                            <div className="font-bold text-sm">North District Hospital</div>
                            <div className="text-xs text-slate-500">ICU Unit</div>
                        </div>
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">Full</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderTraffic = () => (
    <div className="space-y-6 animate-fade-in">
        <button onClick={() => setActiveTab('Dashboard')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-2"><ArrowLeft size={16}/> Back to Dashboard</button>
        <h2 className="text-2xl font-bold text-slate-900">Traffic & Route Analysis</h2>
        
        {/* Colorful Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-xl shadow-lg">
                <div className="text-orange-100 text-sm mb-1">Traffic Flow</div>
                <div className="text-4xl font-bold mb-1">68%</div>
                <div className="text-orange-200 text-xs">Medium Congestion</div>
            </div>
            {/* ... other cards ... */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <MapWidget title="Live Congestion Map" type="traffic" coords={coords} />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Active Incidents</h3>
                <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-red-50 border-red-100">
                        <div className="flex justify-between text-xs text-red-500 mb-1"><span>Accident</span><span>5 min ago</span></div>
                        <div className="font-bold text-red-900 text-sm">Highway 4 South</div>
                        <div className="text-xs bg-red-200 text-red-800 px-1 rounded w-fit mt-1">Blocked</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  // --- REUSABLE MAP WIDGET (SVG ON IMAGE) ---
  const MapWidget = ({ title, type, coords }) => {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-full">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">{title}</h3>
            <div className="flex gap-2">
                <button onClick={handleZoomOut} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Minus size={16}/></button>
                <button onClick={handleZoomIn} className="p-1 bg-slate-100 rounded hover:bg-slate-200"><Plus size={16}/></button>
            </div>
        </div>
        
        <div className="relative w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
            {/* WRAPPER FOR ZOOM */}
            <div className="w-full h-full relative transition-transform duration-300 origin-center" style={{ transform: `scale(${zoom})` }}>
                
                {/* 1. MAP IMAGE */}
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Maharashtra_Districts.png/1024px-Maharashtra_Districts.png" 
                    alt="Map" 
                    className="w-full h-full object-contain opacity-60 grayscale"
                />

                {/* 2. SVG LAYER FOR ROUTES */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {type === 'traffic' && (
                        <>
                            {/* Route 1 (Red) */}
                            <line x1={`${coords.zone1.x}%`} y1={`${coords.zone1.y}%`} x2={`${coords.zone2.x}%`} y2={`${coords.zone2.y}%`} stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                            {/* Route 2 (Green) */}
                            <line x1={`${coords.zone1.x}%`} y1={`${coords.zone1.y}%`} x2={`${coords.zone3.x}%`} y2={`${coords.zone3.y}%`} stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                            {/* Route 3 (Yellow) */}
                            <line x1={`${coords.zone2.x}%`} y1={`${coords.zone2.y}%`} x2={`${coords.zone6.x}%`} y2={`${coords.zone6.y}%`} stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
                        </>
                    )}
                </svg>

                {/* 3. MARKERS - Now Categorized by Data, not Name */}
                {Object.keys(coords).map(key => {
                    const pos = coords[key];
                    
                    // Logic for marker style based on type
                    let colorClass = 'bg-blue-500';
                    let label = pos.name;
                    let show = true;

                    // Customize what we show based on the active tab
                    if (type === 'traffic') {
                        // Randomize traffic status
                        if (key === 'zone1' || key === 'zone2') {
                            colorClass = 'bg-red-500 animate-pulse';
                            label = "Jam";
                        } else if (key === 'zone6') {
                            colorClass = 'bg-yellow-500';
                            label = "Slow";
                        } else {
                            colorClass = 'bg-green-500';
                            label = "Clear";
                        }
                    } else if (type === 'healthcare') {
                        // Randomize hospital status
                        if (key === 'zone1') {
                            colorClass = 'bg-green-500';
                            label = "12 Beds";
                        } else if (key === 'zone2') {
                            colorClass = 'bg-yellow-500';
                            label = "Busy";
                        } else if (key === 'zone5') {
                            colorClass = 'bg-red-500';
                            label = "Full";
                        } else {
                            // Don't show markers for places with no hospital data
                            show = false; 
                        }
                    } else if (type === 'environment') {
                        // Randomize AQI status
                        if (key === 'zone1') {
                            colorClass = 'bg-red-500';
                            label = "AQI 320";
                        } else if (key === 'zone2') {
                            colorClass = 'bg-yellow-500';
                            label = "AQI 150";
                        } else {
                            colorClass = 'bg-green-500';
                            label = "AQI 45";
                        }
                    } else {
                        // Default Dashboard view - Show generic status
                         if (key === 'zone1') { colorClass = 'bg-red-500'; label = "Alert"; }
                    }

                    if (!show) return null;

                    return (
                        <div 
                            key={key}
                            className="absolute flex flex-col items-center"
                            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg mb-1 ${colorClass}`}></div>
                            
                            {/* The Label showing the DATA (AQI/Traffic), not the city name */}
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* NAVIGATION */}
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

      {/* MAIN CONTENT AREA */}
      <main className="p-6 max-w-7xl mx-auto">
        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Traffic' && renderTraffic()}
        {activeTab === 'Environment' && renderEnvironment()}
        {activeTab === 'Healthcare' && renderHealthcare()}
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