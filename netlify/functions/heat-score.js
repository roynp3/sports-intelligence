const googleTrends = require('google-trends-api');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { teams } = JSON.parse(event.body || '{}');
    
    if (!teams || !Array.isArray(teams) || teams.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Teams array required' })
      };
    }

    // Fetch interest over time for the past 7 days
    const results = await googleTrends.interestOverTime({
      keyword: teams,
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      geo: 'US'
    });

    const data = JSON.parse(results);
    
    // Calculate heat scores from the timeline data
    const timelineData = data.default?.timelineData || [];
    
    // Get average interest for each team
    const teamScores = {};
    teams.forEach((team, index) => {
      const values = timelineData.map(point => point.value[index] || 0);
      const avg = values.length > 0 
        ? values.reduce((a, b) => a + b, 0) / values.length 
        : 0;
      
      // Recent values (last 2 data points) vs overall average
      const recentValues = values.slice(-2);
      const recentAvg = recentValues.length > 0
        ? recentValues.reduce((a, b) => a + b, 0) / recentValues.length
        : 0;
      
      // Heat multiplier: is it trending up?
      const trendMultiplier = avg > 0 ? recentAvg / avg : 1;
      
      teamScores[team] = {
        average: Math.round(avg),
        recent: Math.round(recentAvg),
        trending: trendMultiplier > 1.1 ? 'up' : trendMultiplier < 0.9 ? 'down' : 'stable',
        score: Math.round(avg * Math.max(trendMultiplier, 1))
      };
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        teams: teamScores,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Google Trends error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch trends data',
        details: error.message 
      })
    };
  }
};
