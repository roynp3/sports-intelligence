import { useState, useEffect } from 'react';

// ============================================
// CURRENTS SPORTS INTELLIGENCE LAYER
// A Currents Media Solutions Product
// ============================================

// Static data: ZIP to DMA mapping
const ZIP_TO_DMA = {
  '10001': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '10002': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '10003': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '10010': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '10011': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '10012': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '10013': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '10014': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '07030': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '11201': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '11211': { dma: 501, name: 'New York', teams: ['NYK', 'BKN', 'NYY', 'NYM', 'NYR', 'NYI', 'NJD'] },
  '90001': { dma: 803, name: 'Los Angeles', teams: ['LAL', 'LAC', 'LAD', 'LAA', 'LAK'] },
  '90012': { dma: 803, name: 'Los Angeles', teams: ['LAL', 'LAC', 'LAD', 'LAA', 'LAK'] },
  '90024': { dma: 803, name: 'Los Angeles', teams: ['LAL', 'LAC', 'LAD', 'LAA', 'LAK'] },
  '90028': { dma: 803, name: 'Los Angeles', teams: ['LAL', 'LAC', 'LAD', 'LAA', 'LAK'] },
  '90210': { dma: 803, name: 'Los Angeles', teams: ['LAL', 'LAC', 'LAD', 'LAA', 'LAK'] },
  '90401': { dma: 803, name: 'Los Angeles', teams: ['LAL', 'LAC', 'LAD', 'LAA', 'LAK'] },
  '91101': { dma: 803, name: 'Los Angeles', teams: ['LAL', 'LAC', 'LAD', 'LAA', 'LAK'] },
  '60601': { dma: 602, name: 'Chicago', teams: ['CHI', 'CHC', 'CWS'] },
  '60602': { dma: 602, name: 'Chicago', teams: ['CHI', 'CHC', 'CWS'] },
  '60614': { dma: 602, name: 'Chicago', teams: ['CHI', 'CHC', 'CWS'] },
  '60657': { dma: 602, name: 'Chicago', teams: ['CHI', 'CHC', 'CWS'] },
  '33101': { dma: 528, name: 'Miami-Ft. Lauderdale', teams: ['MIA', 'FLA'] },
  '33139': { dma: 528, name: 'Miami-Ft. Lauderdale', teams: ['MIA', 'FLA'] },
  '33301': { dma: 528, name: 'Miami-Ft. Lauderdale', teams: ['MIA', 'FLA'] },
  '33131': { dma: 528, name: 'Miami-Ft. Lauderdale', teams: ['MIA', 'FLA'] },
  '85001': { dma: 753, name: 'Phoenix', teams: ['PHX', 'ARI'] },
  '85004': { dma: 753, name: 'Phoenix', teams: ['PHX', 'ARI'] },
  '85251': { dma: 753, name: 'Phoenix', teams: ['PHX', 'ARI'] },
  '85281': { dma: 753, name: 'Phoenix', teams: ['PHX', 'ARI'] },
  '80202': { dma: 751, name: 'Denver', teams: ['DEN', 'COL'] },
  '80203': { dma: 751, name: 'Denver', teams: ['DEN', 'COL'] },
  '80204': { dma: 751, name: 'Denver', teams: ['DEN', 'COL'] },
  '80206': { dma: 751, name: 'Denver', teams: ['DEN', 'COL'] },
  '77001': { dma: 618, name: 'Houston', teams: ['HOU'] },
  '77002': { dma: 618, name: 'Houston', teams: ['HOU'] },
  '77019': { dma: 618, name: 'Houston', teams: ['HOU'] },
  '77030': { dma: 618, name: 'Houston', teams: ['HOU'] },
  '53201': { dma: 617, name: 'Milwaukee', teams: ['MIL'] },
  '53202': { dma: 617, name: 'Milwaukee', teams: ['MIL'] },
  '53203': { dma: 617, name: 'Milwaukee', teams: ['MIL'] },
  '55401': { dma: 613, name: 'Minneapolis-St. Paul', teams: ['MIN'] },
  '55402': { dma: 613, name: 'Minneapolis-St. Paul', teams: ['MIN'] },
  '55403': { dma: 613, name: 'Minneapolis-St. Paul', teams: ['MIN'] },
  '70112': { dma: 622, name: 'New Orleans', teams: ['NO'] },
  '70113': { dma: 622, name: 'New Orleans', teams: ['NO'] },
  '70116': { dma: 622, name: 'New Orleans', teams: ['NO'] },
  '02101': { dma: 506, name: 'Boston', teams: ['BOS'] },
  '02102': { dma: 506, name: 'Boston', teams: ['BOS'] },
  '02116': { dma: 506, name: 'Boston', teams: ['BOS'] },
  '94102': { dma: 807, name: 'San Francisco-Oakland-San Jose', teams: ['GSW'] },
  '94103': { dma: 807, name: 'San Francisco-Oakland-San Jose', teams: ['GSW'] },
  '94105': { dma: 807, name: 'San Francisco-Oakland-San Jose', teams: ['GSW'] },
  '19101': { dma: 504, name: 'Philadelphia', teams: ['PHI'] },
  '19102': { dma: 504, name: 'Philadelphia', teams: ['PHI'] },
  '19103': { dma: 504, name: 'Philadelphia', teams: ['PHI'] },
  '75201': { dma: 623, name: 'Dallas-Ft. Worth', teams: ['DAL'] },
  '75202': { dma: 623, name: 'Dallas-Ft. Worth', teams: ['DAL'] },
  '75204': { dma: 623, name: 'Dallas-Ft. Worth', teams: ['DAL'] },
  '30301': { dma: 524, name: 'Atlanta', teams: ['ATL'] },
  '30303': { dma: 524, name: 'Atlanta', teams: ['ATL'] },
  '30308': { dma: 524, name: 'Atlanta', teams: ['ATL'] },
  '20001': { dma: 511, name: 'Washington, DC', teams: ['WAS'] },
  '20002': { dma: 511, name: 'Washington, DC', teams: ['WAS'] },
  '20003': { dma: 511, name: 'Washington, DC', teams: ['WAS'] },
  '23219': { dma: 556, name: 'Richmond-Petersburg', teams: [] },
  '23220': { dma: 556, name: 'Richmond-Petersburg', teams: [] },
  '23221': { dma: 556, name: 'Richmond-Petersburg', teams: [] },
  '23223': { dma: 556, name: 'Richmond-Petersburg', teams: [] },
};

// RSN to streaming platform mapping
const RSN_STREAMING = {
  'FanDuel SN Sun': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'DirecTV Stream'], adSupported: true },
  'FanDuel SN WI': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'DirecTV Stream'], adSupported: true },
  'FanDuel SN North': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'DirecTV Stream'], adSupported: true },
  'FanDuel SN Southwest': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'DirecTV Stream'], adSupported: true },
  'FanDuel SN South': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'DirecTV Stream'], adSupported: true },
  'Space City Home Network': { platforms: ['DirecTV Stream', 'fuboTV'], adSupported: true },
  'CHSN': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'DirecTV Stream'], adSupported: true },
  'Altitude': { platforms: ['DirecTV Stream (limited)'], adSupported: true, note: 'Limited vMVPD carriage' },
  'MSG': { platforms: ['fuboTV', 'DirecTV Stream'], adSupported: true },
  'YES Network': { platforms: ['Amazon Prime', 'DirecTV Stream'], adSupported: true },
  'NBC Sports Boston': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV'], adSupported: true },
  'NBC Sports Bay Area': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV'], adSupported: true },
  'NBC Sports Philadelphia': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV'], adSupported: true },
  'Monumental Sports': { platforms: ['Monumental Sports Network App'], adSupported: true },
  'NBA League Pass': { platforms: ['NBA App', 'Amazon Prime (add-on)'], adSupported: false },
  'ESPN': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'Sling TV', 'DirecTV Stream'], adSupported: true },
  'TNT': { platforms: ['Hulu + Live TV', 'YouTube TV', 'Sling TV', 'DirecTV Stream', 'Max'], adSupported: true },
  'ABC': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'Free (antenna)'], adSupported: true },
  'NBC': { platforms: ['Peacock', 'Hulu + Live TV', 'YouTube TV', 'fuboTV'], adSupported: true },
  'FOX': { platforms: ['Hulu + Live TV', 'YouTube TV', 'fuboTV', 'Free (antenna)'], adSupported: true },
  'CBS': { platforms: ['Paramount+', 'Hulu + Live TV', 'YouTube TV', 'fuboTV'], adSupported: true },
};

// Team abbreviation to full market mapping
const TEAM_MARKETS = {
  'MIA': { name: 'Miami Heat', dma: 528, rsn: 'FanDuel SN Sun' },
  'PHX': { name: 'Phoenix Suns', dma: 753, rsn: 'Arizona Family 3TV' },
  'CHI': { name: 'Chicago Bulls', dma: 602, rsn: 'CHSN' },
  'HOU': { name: 'Houston Rockets', dma: 618, rsn: 'Space City Home Network' },
  'MIN': { name: 'Minnesota Timberwolves', dma: 613, rsn: 'FanDuel SN North' },
  'MIL': { name: 'Milwaukee Bucks', dma: 617, rsn: 'FanDuel SN WI' },
  'DEN': { name: 'Denver Nuggets', dma: 751, rsn: 'Altitude' },
  'NO': { name: 'New Orleans Pelicans', dma: 622, rsn: 'Gulf Coast SN' },
  'NOP': { name: 'New Orleans Pelicans', dma: 622, rsn: 'Gulf Coast SN' },
  'NYK': { name: 'New York Knicks', dma: 501, rsn: 'MSG' },
  'BKN': { name: 'Brooklyn Nets', dma: 501, rsn: 'YES Network' },
  'LAL': { name: 'Los Angeles Lakers', dma: 803, rsn: 'Spectrum SN' },
  'LAC': { name: 'Los Angeles Clippers', dma: 803, rsn: 'KTLA' },
  'BOS': { name: 'Boston Celtics', dma: 506, rsn: 'NBC Sports Boston' },
  'GSW': { name: 'Golden State Warriors', dma: 807, rsn: 'NBC Sports Bay Area' },
  'PHI': { name: 'Philadelphia 76ers', dma: 504, rsn: 'NBC Sports Philadelphia' },
  'DAL': { name: 'Dallas Mavericks', dma: 623, rsn: 'FanDuel SN Southwest' },
  'ATL': { name: 'Atlanta Hawks', dma: 524, rsn: 'FanDuel SN South' },
  'WAS': { name: 'Washington Wizards', dma: 511, rsn: 'Monumental Sports' },
  'CLE': { name: 'Cleveland Cavaliers', dma: 510, rsn: 'FanDuel SN Ohio' },
  'OKC': { name: 'Oklahoma City Thunder', dma: 650, rsn: 'FanDuel SN Oklahoma' },
  'SAC': { name: 'Sacramento Kings', dma: 862, rsn: 'NBC Sports California' },
  'ORL': { name: 'Orlando Magic', dma: 534, rsn: 'FanDuel SN Florida' },
  'IND': { name: 'Indiana Pacers', dma: 527, rsn: 'FanDuel SN Indiana' },
  'MEM': { name: 'Memphis Grizzlies', dma: 640, rsn: 'FanDuel SN Southeast' },
  'SAS': { name: 'San Antonio Spurs', dma: 641, rsn: 'FanDuel SN Southwest' },
  'POR': { name: 'Portland Trail Blazers', dma: 820, rsn: 'Root Sports NW' },
  'UTA': { name: 'Utah Jazz', dma: 770, rsn: 'KJZZ' },
  'CHA': { name: 'Charlotte Hornets', dma: 517, rsn: 'FanDuel SN Southeast' },
  'DET': { name: 'Detroit Pistons', dma: 505, rsn: 'FanDuel SN Detroit' },
  'TOR': { name: 'Toronto Raptors', dma: 0, rsn: 'Sportsnet' },
};

// Sample games data (fallback)
const SAMPLE_GAMES = [
  {
    id: 'sample1',
    date: new Date().toISOString(),
    name: 'Phoenix Suns at Miami Heat',
    competitions: [{
      status: { type: { completed: false } },
      competitors: [
        { homeAway: 'home', team: { abbreviation: 'MIA', shortDisplayName: 'Heat' } },
        { homeAway: 'away', team: { abbreviation: 'PHX', shortDisplayName: 'Suns' } }
      ],
      broadcasts: [{ names: ['FanDuel SN Sun', 'Arizona Family 3TV'] }],
      geoBroadcasts: [
        { market: { type: 'Home' }, media: { shortName: 'FanDuel SN Sun' }, type: { shortName: 'TV' } },
        { market: { type: 'Away' }, media: { shortName: 'Arizona Family 3TV' }, type: { shortName: 'TV' } }
      ]
    }]
  },
  {
    id: 'sample2',
    date: new Date().toISOString(),
    name: 'Chicago Bulls at Houston Rockets',
    competitions: [{
      status: { type: { completed: false } },
      competitors: [
        { homeAway: 'home', team: { abbreviation: 'HOU', shortDisplayName: 'Rockets' } },
        { homeAway: 'away', team: { abbreviation: 'CHI', shortDisplayName: 'Bulls' } }
      ],
      broadcasts: [{ names: ['Space City Home Network', 'CHSN'] }],
      geoBroadcasts: [
        { market: { type: 'Home' }, media: { shortName: 'Space City Home Network' }, type: { shortName: 'TV' } },
        { market: { type: 'Away' }, media: { shortName: 'CHSN' }, type: { shortName: 'TV' } }
      ]
    }]
  },
  {
    id: 'sample3',
    date: new Date().toISOString(),
    name: 'Denver Nuggets at New Orleans Pelicans',
    competitions: [{
      status: { type: { completed: false } },
      competitors: [
        { homeAway: 'home', team: { abbreviation: 'NO', shortDisplayName: 'Pelicans' } },
        { homeAway: 'away', team: { abbreviation: 'DEN', shortDisplayName: 'Nuggets' } }
      ],
      broadcasts: [{ names: ['Altitude', 'Gulf Coast SN'] }],
      geoBroadcasts: [
        { market: { type: 'Home' }, media: { shortName: 'Gulf Coast SN' }, type: { shortName: 'TV' } },
        { market: { type: 'Away' }, media: { shortName: 'Altitude' }, type: { shortName: 'TV' } }
      ]
    }]
  }
];

function App() {
  const [zipCode, setZipCode] = useState('');
  const [market, setMarket] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState('nba');
  const [dataSource, setDataSource] = useState('loading');

  const fetchGames = async (league) => {
    setLoading(true);
    try {
      const sportPath = league === 'nba' ? 'basketball/nba' : 
                        league === 'nfl' ? 'football/nfl' :
                        league === 'mlb' ? 'baseball/mlb' :
                        league === 'nhl' ? 'hockey/nhl' : 'basketball/nba';
      
      const response = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/${sportPath}/scoreboard`
      );
      const data = await response.json();
      
      if (data.events && data.events.length > 0) {
        setGames(data.events);
        setDataSource('live');
      } else {
        setGames(SAMPLE_GAMES);
        setDataSource('sample');
      }
    } catch (err) {
      setGames(SAMPLE_GAMES);
      setDataSource('sample');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGames(selectedLeague);
  }, [selectedLeague]);

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const marketData = ZIP_TO_DMA[zipCode];
    if (marketData) {
      setMarket(marketData);
    } else {
      setMarket({ dma: 0, name: 'Out of Sample Area', teams: [] });
    }
  };

  const getAvailabilityStatus = (game, userMarket) => {
    if (!userMarket) return { status: 'unknown', message: 'Enter ZIP to check availability' };
    
    const competition = game.competitions?.[0];
    if (!competition) return { status: 'unknown', message: 'No data' };

    const homeTeam = competition.competitors?.find(c => c.homeAway === 'home')?.team?.abbreviation;
    const awayTeam = competition.competitors?.find(c => c.homeAway === 'away')?.team?.abbreviation;
    
    const broadcasts = competition.geoBroadcasts || [];
    const nationalBroadcast = broadcasts.find(b => 
      b.market?.type === 'National' || 
      ['ESPN', 'TNT', 'ABC', 'NBC', 'FOX', 'CBS'].includes(b.media?.shortName)
    );

    const homeMarket = TEAM_MARKETS[homeTeam];
    const awayMarket = TEAM_MARKETS[awayTeam];
    const isInHomeMarket = homeMarket?.dma === userMarket.dma;
    const isInAwayMarket = awayMarket?.dma === userMarket.dma;

    if (nationalBroadcast) {
      return {
        status: 'national',
        message: 'National broadcast — available everywhere',
        networks: [nationalBroadcast.media?.shortName],
        platforms: RSN_STREAMING[nationalBroadcast.media?.shortName]?.platforms || ['Check local listings'],
        adSupported: true
      };
    }

    if (isInHomeMarket || isInAwayMarket) {
      const localRSN = isInHomeMarket ? homeMarket?.rsn : awayMarket?.rsn;
      return {
        status: 'in-market',
        message: `In-market — Local RSN coverage available`,
        networks: broadcasts.map(b => b.media?.shortName).filter(Boolean),
        platforms: RSN_STREAMING[localRSN]?.platforms || ['Check local provider'],
        adSupported: true
      };
    }

    return {
      status: 'out-of-market',
      message: 'Out-of-market — League streaming only',
      networks: ['League Pass'],
      platforms: ['NBA League Pass', 'ESPN+', 'Amazon Prime'],
      adSupported: false,
      note: 'Subscription required'
    };
  };

  const formatGameTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen text-slate-200" style={{ backgroundColor: '#0a1628' }}>
      {/* Hero Header with Background */}
      <header className="relative overflow-hidden border-b border-cyan-900/30">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1628]/60 to-[#0a1628]" />
        
        <div className="relative z-10 px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Currents Media Solutions" 
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`text-[10px] px-3 py-1.5 rounded font-medium border ${
                dataSource === 'live' 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' 
                  : 'bg-slate-800/50 text-slate-400 border-slate-700'
              }`}>
                {dataSource === 'live' ? '● LIVE DATA' : '○ SAMPLE DATA'}
              </span>
              <span className="text-[10px] tracking-wider px-3 py-1.5 bg-slate-800/50 rounded text-slate-400 border border-slate-700">
                BETA
              </span>
            </div>
          </div>
          
          <div className="mt-8 mb-4 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-light text-white tracking-wide">
              Sports Intelligence Layer
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
              Where can advertisers actually reach sports fans—by market, by moment, and by platform?
            </p>
          </div>
        </div>
      </header>

      {/* Market Input Section */}
      <section className="px-4 sm:px-6 py-6 border-b border-cyan-900/20" style={{ backgroundColor: '#0d1d33' }}>
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          <div className="flex-1">
            <form onSubmit={handleZipSubmit} className="flex flex-col gap-3">
              <label className="text-[11px] tracking-[0.15em] text-cyan-400/70 uppercase">Your Market</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="Enter ZIP Code"
                  className="px-4 py-3 text-base bg-slate-900/50 border border-cyan-900/30 rounded-lg text-white outline-none focus:border-cyan-500/50 focus:bg-slate-900/70 w-full sm:w-44 transition-all"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 text-[11px] font-semibold tracking-wider rounded-lg text-white transition-all whitespace-nowrap hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
                  }}
                >
                  SET LOCATION
                </button>
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed">
                Try: 10001 (NYC) • 90210 (LA) • 60601 (Chicago) • 33139 (Miami) • 80202 (Denver)
              </div>
            </form>
          </div>
          
          {market && (
            <div className="px-5 py-4 rounded-lg border-l-4 border-cyan-500 min-w-72" style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)' }}>
              <div className="text-[10px] tracking-[0.15em] text-cyan-400/70 mb-2 uppercase">Designated Market Area</div>
              <div className="text-xl font-medium text-white">{market.name}</div>
              <div className="text-sm text-slate-400 mt-1">DMA {market.dma}</div>
              {market.teams.length > 0 ? (
                <div className="text-[11px] text-slate-500 mt-2">
                  Blackout teams: {market.teams.slice(0, 5).join(', ')}{market.teams.length > 5 ? '...' : ''}
                </div>
              ) : (
                <div className="text-[11px] text-cyan-400 mt-2">
                  ✓ No local blackouts — all games available via streaming
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* League Selector */}
      <section className="px-4 sm:px-6 border-b border-cyan-900/20 overflow-x-auto" style={{ backgroundColor: '#0a1628' }}>
        <div className="flex min-w-max max-w-7xl mx-auto">
          {['nba', 'nfl', 'mlb', 'nhl'].map(league => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={`px-6 sm:px-8 py-4 text-sm font-medium tracking-[0.1em] transition-all border-b-2 ${
                selectedLeague === league 
                  ? 'text-cyan-400 border-cyan-500' 
                  : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              {league.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <section className="px-4 sm:px-6 py-8" style={{ backgroundColor: '#0a1628' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">Today's Games</h2>
            <span className="text-xs text-slate-600">{games.length} events</span>
          </div>

          {loading && (
            <div className="text-center py-16 text-slate-500">
              <div className="inline-block w-8 h-8 border-2 border-slate-700 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
              <div>Loading games...</div>
            </div>
          )}

          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))' }}>
            {games.map(game => {
              const competition = game.competitions?.[0];
              const homeTeam = competition?.competitors?.find(c => c.homeAway === 'home');
              const awayTeam = competition?.competitors?.find(c => c.homeAway === 'away');
              const availability = getAvailabilityStatus(game, market);
              const isComplete = competition?.status?.type?.completed;

              return (
                <div 
                  key={game.id} 
                  className="rounded-xl p-5 border transition-all hover:border-cyan-800/50"
                  style={{ 
                    backgroundColor: '#0d1d33',
                    borderColor: 'rgba(8, 145, 178, 0.15)'
                  }}
                >
                  {/* Game Header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] text-slate-400 tracking-wide">
                      {isComplete ? 'FINAL' : formatGameTime(game.date)}
                    </span>
                    <span 
                      className="text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 
                          availability.status === 'national' ? 'rgba(34, 197, 94, 0.2)' :
                          availability.status === 'in-market' ? 'rgba(6, 182, 212, 0.2)' :
                          availability.status === 'out-of-market' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                        color: 
                          availability.status === 'national' ? '#4ade80' :
                          availability.status === 'in-market' ? '#22d3ee' :
                          availability.status === 'out-of-market' ? '#fbbf24' : '#94a3b8',
                      }}
                    >
                      {availability.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>

                  {/* Matchup */}
                  <div className="flex items-center justify-center gap-6 py-4 border-y mb-4" style={{ borderColor: 'rgba(8, 145, 178, 0.15)' }}>
                    <div className="flex flex-col items-center gap-1 min-w-20">
                      <span className="text-2xl font-bold text-white">{awayTeam?.team?.abbreviation}</span>
                      <span className="text-[11px] text-slate-500">{awayTeam?.team?.shortDisplayName}</span>
                      {isComplete && <span className="text-lg font-semibold text-cyan-400 mt-1">{awayTeam?.score}</span>}
                    </div>
                    <div className="text-sm text-slate-600">@</div>
                    <div className="flex flex-col items-center gap-1 min-w-20">
                      <span className="text-2xl font-bold text-white">{homeTeam?.team?.abbreviation}</span>
                      <span className="text-[11px] text-slate-500">{homeTeam?.team?.shortDisplayName}</span>
                      {isComplete && <span className="text-lg font-semibold text-cyan-400 mt-1">{homeTeam?.score}</span>}
                    </div>
                  </div>

                  {/* Broadcast Section */}
                  <div className="mb-4">
                    <div className="text-[10px] tracking-[0.15em] text-slate-600 mb-2 uppercase">Broadcast</div>
                    <div className="flex flex-wrap gap-2">
                      {(competition?.broadcasts || []).map((b, i) => (
                        <span key={i} className="text-[11px] px-3 py-1 rounded-full text-slate-300" style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)' }}>
                          {b.names?.join(', ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability Section */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(10, 22, 40, 0.7)' }}>
                    <div className="text-sm text-slate-200 mb-2">{availability.message}</div>
                    {availability.platforms?.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] tracking-wide text-slate-500 uppercase">Streaming:</span>
                        {availability.platforms.slice(0, 3).map((p, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded text-slate-400" style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)' }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className={`text-[11px] ${availability.adSupported ? 'text-cyan-400' : 'text-amber-400'}`}>
                      {availability.adSupported ? '✓ Ad-supported inventory available' : '✗ No ad inventory (subscription only)'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {games.length === 0 && !loading && (
            <div className="text-center py-16 text-slate-500">
              No games scheduled. Try switching leagues or check back later.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 border-t" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.15)' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <img 
              src="/logo.png" 
              alt="Currents Media Solutions" 
              className="h-8 w-auto opacity-70"
            />
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
              <span className="text-slate-600 tracking-wide uppercase">Data:</span>
              <span>ESPN API</span>
              <span className="text-slate-700">•</span>
              <span>Nielsen DMA</span>
              <span className="text-slate-700">•</span>
              <span>RSN Mapping</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 leading-relaxed">
            © 2026 Currents Media Solutions. Media strategy for the modern information environment.
          </div>
          <a 
            href="https://www.currentsmediasolutions.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[11px] text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            www.currentsmediasolutions.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
