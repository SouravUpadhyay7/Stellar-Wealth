document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initMainChart('3m');
    initAssetAllocationChart();
    initSectorBreakdownChart();
    renderStocksList();
    
    // Set up event listeners
    setupEventListeners();
});

// Main portfolio chart initialization
function initMainChart(timeframe) {
    const ctx = document.createElement('canvas');
    document.getElementById('mainChart').innerHTML = '';
    document.getElementById('mainChart').appendChild(ctx);
    
    const data = portfolioData[timeframe];
    
    // Format dates and extract values
    const labels = data.map(item => item.date);
    const values = data.map(item => item.value);
    
    // Calculate gradient
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(108, 92, 231, 0.5)');
    gradient.addColorStop(1, 'rgba(108, 92, 231, 0)');
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Portfolio Value ($)',
                data: values,
                borderColor: '#6c5ce7',
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#6c5ce7',
                pointHoverBackgroundColor: '#6c5ce7',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2,
                tension: 0.3,
                fill: true,
                backgroundColor: gradient
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 32, 53, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#b8c6db',
                    borderColor: 'rgba(108, 92, 231, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        maxTicksLimit: timeframe === '1w' ? 7 : 
                                       timeframe === '1m' ? 5 : 
                                       timeframe === '3m' ? 6 : 
                                       timeframe === '1y' ? 12 : 
                                       12,
                        maxRotation: 0
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        callback: function(value) {
                            return '$' + value.toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            });
                        }
                    }
                }
            }
        }
    });
}

// Asset allocation chart
function initAssetAllocationChart() {
    const ctx = document.createElement('canvas');
    document.getElementById('assetAllocationChart').innerHTML = '';
    document.getElementById('assetAllocationChart').appendChild(ctx);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: assetAllocationData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#b8c6db',
                        padding: 10,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 53, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#b8c6db',
                    borderColor: 'rgba(108, 92, 231, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}

// Sector breakdown chart
function initSectorBreakdownChart() {
    const ctx = document.createElement('canvas');
    document.getElementById('sectorBreakdownChart').innerHTML = '';
    document.getElementById('sectorBreakdownChart').appendChild(ctx);
    
    new Chart(ctx, {
        type: 'pie',
        data: sectorBreakdownData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#b8c6db',
                        padding: 10,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 32, 53, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#b8c6db',
                    borderColor: 'rgba(108, 92, 231, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}

// Render stocks list
function renderStocksList() {
    const stocksList = document.getElementById('stocksList');
    stocksList.innerHTML = '';
    
    stocksData.forEach(stock => {
        const stockItem = document.createElement('div');
        stockItem.className = 'stock-item';
        
        stockItem.innerHTML = `
            <div class="stock-details">
                <div class="stock-icon" style="background-color: ${stock.color}20; color: ${stock.color}">
                    ${stock.symbol.slice(0, 1)}
                </div>
                <div class="stock-info">
                    <div class="stock-symbol">${stock.symbol}</div>
                    <div class="stock-name">${stock.name}</div>
                </div>
            </div>
            <div class="stock-price">
                <div class="price">$${stock.currentPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</div>
                <div class="change ${stock.change >= 0 ? 'positive' : 'negative'}">
                    ${stock.change >= 0 ? '+' : ''}${stock.change}%
                </div>
            </div>
        `;
        
        stocksList.appendChild(stockItem);
    });
}

// Sort stocks based on different criteria
function sortStocks(criteria) {
    switch(criteria) {
        case 'value':
            stocksData.sort((a, b) => b.value - a.value);
            break;
        case 'performance':
            stocksData.sort((a, b) => b.change - a.change);
            break;
        case 'alphabetical':
            stocksData.sort((a, b) => a.symbol.localeCompare(b.symbol));
            break;
    }
    
    renderStocksList();
}

// Set up event listeners
function setupEventListeners() {
    // Time period buttons for the main chart
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            initMainChart(this.getAttribute('data-time'));
        });
    });
    
    // Sort options for stocks
    document.getElementById('sortOptions').addEventListener('change', function() {
        sortStocks(this.value);
    });
    
    // Add hover effects to the buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            if (this.classList.contains('primary-btn')) {
                this.style.boxShadow = '0 0 20px rgba(108, 92, 231, 0.8)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this.classList.contains('primary-btn')) {
                this.style.boxShadow = '0 0 10px rgba(108, 92, 231, 0.7)';
            }
        });
    });
    
    // Add hover effect to stock items
    document.addEventListener('click', function(e) {
        if (e.target.closest('.stock-item')) {
            console.log('Stock details view would open here');
            // Future functionality: open detailed stock view
        }
    });
    
    // Make watchlist items interactive
    document.querySelectorAll('.watchlist-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            this.style.cursor = 'pointer';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Animated glowing effect for the logo
    const logo = document.querySelector('.logo .glow');
    setInterval(() => {
        logo.style.textShadow = '0 0 15px rgba(108, 92, 231, 0.9)';
        setTimeout(() => {
            logo.style.textShadow = '0 0 10px rgba(108, 92, 231, 0.7)';
        }, 1000);
    }, 2000);
}