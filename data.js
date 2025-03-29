// Mock data for the financial dashboard

// Portfolio performance data - 3 months of daily data
const portfolioData = {
    '1w': generateTimeSeriesData(7, 140000, 147000),
    '1m': generateTimeSeriesData(30, 135000, 147000),
    '3m': generateTimeSeriesData(90, 130000, 147000),
    '1y': generateTimeSeriesData(365, 110000, 147000),
    'all': generateTimeSeriesData(1095, 80000, 147000)
};

// Top holdings data
const stocksData = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc',
        value: 28475.65,
        shares: 164,
        avgPrice: 148.32,
        currentPrice: 173.63,
        change: 2.41,
        color: '#4CD964'
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corp',
        value: 24356.48,
        shares: 56,
        avgPrice: 378.42,
        currentPrice: 437.78,
        change: 1.3,
        color: '#007AFF'
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc',
        value: 18406.00,
        shares: 100,
        avgPrice: 165.23,
        currentPrice: 184.06,
        change: 0.9,
        color: '#FF9500'
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc',
        value: 16940.80,
        shares: 120,
        avgPrice: 122.75,
        currentPrice: 141.17,
        change: 1.1,
        color: '#5856D6'
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corp',
        value: 13070.25,
        shares: 15,
        avgPrice: 712.45,
        currentPrice: 879.35,
        change: 2.8,
        color: '#34C759'
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc',
        value: 8910.50,
        shares: 50,
        avgPrice: 180.35,
        currentPrice: 178.21,
        change: -1.2,
        color: '#FF2D55'
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc',
        value: 7563.75,
        shares: 25,
        avgPrice: 264.85,
        currentPrice: 302.55,
        change: 1.5,
        color: '#AF52DE'
    }
];

// Asset allocation data
const assetAllocationData = {
    labels: ['US Stocks', 'International Stocks', 'Bonds', 'Cash', 'Commodities', 'Real Estate'],
    datasets: [{
        data: [68, 12, 8, 5, 4, 3],
        backgroundColor: [
            '#6c5ce7',
            '#00cec9',
            '#fdcb6e',
            '#0984e3',
            '#e84393',
            '#00b894'
        ],
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
    }]
};

// Sector breakdown data
const sectorBreakdownData = {
    labels: ['Technology', 'Consumer Cyclical', 'Financial Services', 'Healthcare', 'Communication', 'Energy', 'Others'],
    datasets: [{
        data: [42, 18, 12, 10, 8, 5, 5],
        backgroundColor: [
            '#6c5ce7',
            '#00cec9',
            '#fdcb6e',
            '#0984e3',
            '#e84393',
            '#00b894',
            '#636e72'
        ],
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
    }]
};

// Helper function to generate time series data
function generateTimeSeriesData(days, startValue, endValue) {
    const data = [];
    const volatility = 0.015; // Daily volatility
    let currentValue = startValue;
    const dailyChange = (endValue - startValue) / days;
    
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        // Add some randomness to the daily change
        const randomFactor = 1 + (Math.random() * 2 - 1) * volatility;
        currentValue += dailyChange * randomFactor;
        
        data.push({
            date: date.toISOString().split('T')[0],
            value: Math.round(currentValue * 100) / 100
        });
    }
    
    return data;
}