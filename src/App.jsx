import React, { useState, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { APP_PASSWORD, DMA_DATA, US_STATES, TEAMS_DATA, LEAGUE_API_PATHS, STREAMING_PLATFORMS, DEFAULT_VENDOR_DATA } from './data.js';

// Icons
const Icons = {
  Lock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Calendar: () => <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Check: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>,
  X: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  ChevronDown: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  Table: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
};

// Login Screen
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    if (password === APP_PASSWORD) {
      localStorage.setItem('currents_auth', 'true');
      onLogin();
    } else {
      setError('Invalid password');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0a1628' }}>
      <div className="fixed inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%230891b2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="relative w-full max-w-md animate-slide-up" style={{ animationFillMode: 'forwards' }}>
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Currents Media Solutions" className="h-16 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold" style={{ fontFamily: '"DM Sans", sans-serif', color: '#f8fafc' }}>Sports Media Planner</h1>
          <p className="text-sm mt-2" style={{ color: '#64748b' }}>Internal Planning Tool</p>
        </div>
        <div className="rounded-xl p-8 border" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium tracking-wider mb-2" style={{ color: '#94a3b8' }}>PASSWORD</label>
              <div className="relative">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-3 rounded-lg" style={{ backgroundColor: '#1e293b', border: error ? '1px solid #ef4444' : '1px solid #334155', color: '#f8fafc' }} autoFocus />
                <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b' }}><Icons.Lock /></div>
              </div>
              {error && <p className="text-sm mt-2 text-red-400">{error}</p>}
            </div>
            <button type="submit" disabled={loading || !password} className="w-full py-3 px-4 rounded-lg font-medium text-white disabled:opacity-50" style={{ backgroundColor: '#0891b2' }}>
              {loading ? 'Authenticating...' : 'Access Platform'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs mt-6" style={{ color: '#475569' }}>© 2026 Currents Media Solutions</p>
      </div>
    </div>
  );
}

// MultiSelect
function MultiSelect({ label, options, selected, onChange, placeholder, selectAllLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filteredOptions = options.filter(opt => opt.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative">
      <label className="block text-xs font-medium tracking-wider mb-2" style={{ color: '#94a3b8' }}>{label}</label>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-3 rounded-lg text-left flex items-center justify-between" style={{ backgroundColor: '#1e293b', border: isOpen ? '1px solid #0891b2' : '1px solid #334155', color: selected.length > 0 ? '#f8fafc' : '#64748b' }}>
        <span className="truncate">{selected.length === 0 ? placeholder : selected.length === options.length ? 'All Selected' : `${selected.length} selected`}</span>
        <Icons.ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-lg border overflow-hidden" style={{ backgroundColor: '#1e293b', borderColor: '#334155', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <div className="p-2 border-b" style={{ borderColor: '#334155' }}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 rounded text-sm" style={{ backgroundColor: '#0d1d33', border: '1px solid #334155', color: '#f8fafc' }} />
          </div>
          <button type="button" onClick={() => onChange(selected.length === options.length ? [] : options.map(o => o.code || o.id))} className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-700/50" style={{ color: '#0891b2', borderBottom: '1px solid #334155' }}>
            <div className="w-4 h-4 rounded border flex items-center justify-center" style={{ borderColor: selected.length === options.length ? '#0891b2' : '#475569', backgroundColor: selected.length === options.length ? '#0891b2' : 'transparent' }}>{selected.length === options.length && <Icons.Check />}</div>
            {selectAllLabel || 'Select All'}
          </button>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((opt) => {
              const value = opt.code || opt.id;
              const isSelected = selected.includes(value);
              return (
                <button key={value} type="button" onClick={() => onChange(isSelected ? selected.filter(v => v !== value) : [...selected, value])} className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-700/50" style={{ color: '#f8fafc' }}>
                  <div className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0" style={{ borderColor: isSelected ? '#0891b2' : '#475569', backgroundColor: isSelected ? '#0891b2' : 'transparent' }}>{isSelected && <Icons.Check />}</div>
                  <span className="truncate">{opt.name}</span>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setIsOpen(false)} className="w-full px-4 py-2 text-sm font-medium border-t" style={{ borderColor: '#334155', color: '#0891b2', backgroundColor: '#0d1d33' }}>Done</button>
        </div>
      )}
    </div>
  );
}

// Admin Panel
function AdminPanel({ vendorData, setVendorData, onClose }) {
  const updateVendor = (platform, field, value) => {
    const newData = { ...vendorData, platforms: { ...vendorData.platforms, [platform]: { ...vendorData.platforms[platform], [field]: value, lastUpdated: new Date().toISOString() } } };
    if (field === 'netCPM' && value) newData.platforms[platform].grossCPM = Math.round(parseFloat(value) / 0.85 * 100) / 100;
    setVendorData(newData);
    localStorage.setItem('currents_vendor_data', JSON.stringify(newData));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl border" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.3)' }}>
        <div className="sticky top-0 px-6 py-4 border-b flex items-center justify-between z-10" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.15)' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#f8fafc' }}>Admin: Vendor Data</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-700" style={{ color: '#64748b' }}><Icons.X /></button>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries(vendorData.platforms).map(([platform, data]) => (
            <div key={platform} className="p-4 rounded-lg border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
              <h3 className="font-medium mb-3" style={{ color: '#f8fafc' }}>{platform}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" value={data.vendors.join(', ')} onChange={(e) => updateVendor(platform, 'vendors', e.target.value.split(',').map(v => v.trim()).filter(v => v))} placeholder="Vendors" className="px-3 py-2 rounded text-sm" style={{ backgroundColor: '#0d1d33', border: '1px solid #334155', color: '#f8fafc' }} />
                <input type="number" step="0.01" value={data.netCPM || ''} onChange={(e) => updateVendor(platform, 'netCPM', e.target.value ? parseFloat(e.target.value) : null)} placeholder="Net CPM" className="px-3 py-2 rounded text-sm" style={{ backgroundColor: '#0d1d33', border: '1px solid #334155', color: '#f8fafc' }} />
                <input type="number" step="0.01" value={data.grossCPM || ''} onChange={(e) => updateVendor(platform, 'grossCPM', e.target.value ? parseFloat(e.target.value) : null)} placeholder="Gross CPM" className="px-3 py-2 rounded text-sm" style={{ backgroundColor: '#0d1d33', border: '1px solid #334155', color: '#f8fafc' }} />
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <button onClick={() => { const blob = new Blob([JSON.stringify(vendorData, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'vendor_data.json'; a.click(); }} className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}>Export JSON</button>
            <button onClick={() => { setVendorData(DEFAULT_VENDOR_DATA); localStorage.setItem('currents_vendor_data', JSON.stringify(DEFAULT_VENDOR_DATA)); }} className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard
function Dashboard({ onLogout }) {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedDMAs, setSelectedDMAs] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [vendorData, setVendorData] = useState(() => { const saved = localStorage.getItem('currents_vendor_data'); return saved ? JSON.parse(saved) : DEFAULT_VENDOR_DATA; });

  const dmasForSelectedStates = useMemo(() => selectedStates.length === 0 ? Object.entries(DMA_DATA) : Object.entries(DMA_DATA).filter(([_, dma]) => selectedStates.includes(dma.state)), [selectedStates]);
  const dmaOptions = useMemo(() => dmasForSelectedStates.map(([code, dma]) => ({ code, name: `${dma.name} (${code})` })), [dmasForSelectedStates]);

  const fetchGames = useCallback(async () => {
    if (!selectedTeam) { setError('Please select a team'); return; }
    setLoading(true); setError(null); setHasSearched(true);
    try {
      const [league, teamId] = selectedTeam.split('-');
      const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${LEAGUE_API_PATHS[league]}/teams/${teamId}/schedule`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      let events = data.events || [];
      if (dateStart || dateEnd) events = events.filter(e => { const d = new Date(e.date); return (!dateStart || d >= new Date(dateStart)) && (!dateEnd || d <= new Date(dateEnd + 'T23:59:59')); });
      setGames(events.map(event => {
        const comp = event.competitions?.[0];
        const linearNetworks = [], streamingPlatforms = [];
        [...(comp?.broadcasts || []), ...(comp?.geoBroadcasts || [])].forEach(b => {
          const names = b.names || (b.media?.shortName ? [b.media.shortName] : []);
          names.forEach(n => { if (!linearNetworks.includes(n)) { linearNetworks.push(n); (STREAMING_PLATFORMS[n]?.streamers || []).forEach(s => { if (!streamingPlatforms.includes(s)) streamingPlatforms.push(s); }); } });
        });
        return { id: event.id, name: event.name, shortName: event.shortName, date: event.date, venue: comp?.venue, linearNetworks, streamingPlatforms };
      }));
    } catch (err) { setError(err.message); setGames([]); }
    setLoading(false);
  }, [selectedTeam, dateStart, dateEnd]);

  const exportToExcel = () => {
    if (!games.length) return;
    const ws = XLSX.utils.json_to_sheet(games.map(g => ({ Date: new Date(g.date).toLocaleDateString(), Time: new Date(g.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), Game: g.name, Venue: g.venue?.fullName || '', 'Linear Networks': g.linearNetworks.join(', '), 'Streaming': g.streamingPlatforms.join(', '), Vendors: [...new Set(g.streamingPlatforms.flatMap(p => vendorData.platforms[p]?.vendors || []))].join(', ') })));
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Media Plan'); XLSX.writeFile(wb, `media_plan_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a1628' }}>
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Currents" className="h-10" />
            <div><h1 className="text-lg font-semibold" style={{ color: '#f8fafc' }}>Sports Media Planner</h1><p className="text-xs" style={{ color: '#64748b' }}>v1.0</p></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowAdmin(true)} className="p-2 rounded-lg" style={{ color: '#64748b' }}><Icons.Settings /></button>
            <button onClick={onLogout} className="p-2 rounded-lg" style={{ color: '#64748b' }}><Icons.Logout /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <section className="rounded-xl border p-6 mb-8" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.2)' }}>
          <h2 className="text-sm font-semibold tracking-wider mb-6" style={{ color: '#94a3b8' }}>QUERY PARAMETERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-medium tracking-wider mb-2" style={{ color: '#94a3b8' }}>TEAM</label>
              <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="w-full px-4 py-3 rounded-lg" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: selectedTeam ? '#f8fafc' : '#64748b' }}>
                <option value="">Select Team</option>
                <optgroup label="NFL">{TEAMS_DATA.nfl.map(t => <option key={`NFL-${t.id}`} value={`NFL-${t.id}`}>{t.name}</option>)}</optgroup>
                <optgroup label="NBA">{TEAMS_DATA.nba.map(t => <option key={`NBA-${t.id}`} value={`NBA-${t.id}`}>{t.name}</option>)}</optgroup>
                <optgroup label="MLB">{TEAMS_DATA.mlb.map(t => <option key={`MLB-${t.id}`} value={`MLB-${t.id}`}>{t.name}</option>)}</optgroup>
                <optgroup label="NHL">{TEAMS_DATA.nhl.map(t => <option key={`NHL-${t.id}`} value={`NHL-${t.id}`}>{t.name}</option>)}</optgroup>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium tracking-wider mb-2" style={{ color: '#94a3b8' }}>DATE RANGE</label>
              <div className="flex gap-2">
                <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} className="flex-1 px-3 py-3 rounded-lg text-sm" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} />
                <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} className="flex-1 px-3 py-3 rounded-lg text-sm" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} />
              </div>
            </div>
            <MultiSelect label="STATES" options={US_STATES} selected={selectedStates} onChange={setSelectedStates} placeholder="Filter by state" selectAllLabel="Select All" />
            <MultiSelect label="DMAS" options={dmaOptions} selected={selectedDMAs} onChange={setSelectedDMAs} placeholder="Filter by DMA" selectAllLabel="Select All" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button onClick={fetchGames} disabled={loading || !selectedTeam} className="px-6 py-3 rounded-lg font-medium text-white disabled:opacity-50 flex items-center gap-2" style={{ backgroundColor: '#0891b2' }}>
              {loading ? 'Searching...' : <><Icons.Search /> Search Games</>}
            </button>
            {games.length > 0 && <button onClick={exportToExcel} className="px-4 py-2 rounded-lg text-sm flex items-center gap-2" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}><Icons.Table /> Excel</button>}
          </div>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </section>

        {hasSearched && (
          <section className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.2)' }}>
            <div className="px-6 py-4 border-b flex justify-between" style={{ borderColor: 'rgba(8, 145, 178, 0.15)' }}>
              <h2 className="text-sm font-semibold tracking-wider" style={{ color: '#94a3b8' }}>RESULTS</h2>
              <span className="text-sm" style={{ color: '#64748b' }}>{games.length} games</span>
            </div>
            {games.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr style={{ backgroundColor: '#1e293b' }}>
                    {['DATE', 'TIME', 'GAME', 'VENUE', 'LINEAR', 'STREAMING', 'VENDORS'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: '#94a3b8' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {games.map(game => {
                      const d = new Date(game.date);
                      const vendors = [...new Set(game.streamingPlatforms.flatMap(p => vendorData.platforms[p]?.vendors || []))];
                      return (
                        <tr key={game.id} className="border-t hover:bg-slate-800/30" style={{ borderColor: '#1e293b' }}>
                          <td className="px-4 py-3 text-sm" style={{ color: '#f8fafc' }}>{d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                          <td className="px-4 py-3 text-sm" style={{ color: '#94a3b8' }}>{d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</td>
                          <td className="px-4 py-3 text-sm font-medium" style={{ color: '#f8fafc' }}>{game.shortName || game.name}</td>
                          <td className="px-4 py-3 text-sm" style={{ color: '#94a3b8' }}>{game.venue?.fullName || '—'}</td>
                          <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{game.linearNetworks.length ? game.linearNetworks.map(n => <span key={n} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(8, 145, 178, 0.15)', color: '#0891b2' }}>{n}</span>) : '—'}</div></td>
                          <td className="px-4 py-3"><div className="flex flex-wrap gap-1 max-w-xs">{game.streamingPlatforms.length ? game.streamingPlatforms.slice(0, 4).map(p => <span key={p} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1e293b', color: '#a855f7' }}>{p}</span>) : '—'}{game.streamingPlatforms.length > 4 && <span className="text-xs" style={{ color: '#64748b' }}>+{game.streamingPlatforms.length - 4}</span>}</div></td>
                          <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{vendors.length ? vendors.map(v => <span key={v} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>{v}</span>) : '—'}</div></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : <div className="px-6 py-12 text-center" style={{ color: '#64748b' }}>No games found</div>}
          </section>
        )}

        {!hasSearched && (
          <div className="rounded-xl border p-12 text-center" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.15)' }}>
            <Icons.Calendar />
            <h3 className="text-lg font-medium mt-4" style={{ color: '#f8fafc' }}>Select a team to get started</h3>
            <p className="text-sm mt-2" style={{ color: '#64748b' }}>Choose a team and date range to view schedule and streaming info.</p>
          </div>
        )}
      </main>

      <footer className="border-t py-6" style={{ borderColor: 'rgba(8, 145, 178, 0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3"><img src="/logo.png" alt="Currents" className="h-6 opacity-60" /><span className="text-xs" style={{ color: '#475569' }}>© 2026 Currents Media Solutions</span></div>
          <a href="https://www.currentsmediasolutions.com" target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: '#0891b2' }}>www.currentsmediasolutions.com</a>
        </div>
      </footer>

      {showAdmin && <AdminPanel vendorData={vendorData} setVendorData={setVendorData} onClose={() => setShowAdmin(false)} />}
    </div>
  );
}

// Main App
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('currents_auth') === 'true');
  if (!isAuthenticated) return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  return <Dashboard onLogout={() => { localStorage.removeItem('currents_auth'); setIsAuthenticated(false); }} />;
}
