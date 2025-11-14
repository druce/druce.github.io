---
id: 7152
title: 'An AI Maturity Framework'
date: 2025-11-02T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7152
permalink: /2025/11/ai-maturity
categories: AI
tags: AI

---
> _A 12-dimension assessment of your company's AI maturity and readiness, and a roadmap for developing an AI strategy_

<!--more-->


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
    .subtitle {
        text-align: center;
        color: #718096;
        margin-bottom: 30px;
        font-size: 1.1em;
    }
    .chart-container {
        position: relative;
        height: 700px;
        margin: 30px auto;
    }
    .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
        margin: 30px 0;
        padding: 20px;
        background: #f7fafc;
        border-radius: 12px;
    }
    .slider-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 200px;
    }
    .slider-label {
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 8px;
        font-size: 0.9em;
        text-align: center;
    }
    input[type="range"] {
        width: 180px;
        height: 6px;
        border-radius: 5px;
        background: #e2e8f0;
        outline: none;
        -webkit-appearance: none;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    input[type="range"]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .value-display {
        margin-top: 5px;
        font-size: 0.85em;
        color: #4a5568;
        font-weight: 500;
    }
    .legend {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 12px;
        margin-top: 30px;
        padding: 20px;
        background: #f7fafc;
        border-radius: 12px;
    }
    .legend-item {
        display: flex;
        align-items: center;
        font-size: 0.85em;
        color: #2d3748;
        padding: 8px;
        background: white;
        border-radius: 6px;
    }
    .legend-number {
        font-weight: bold;
        margin-right: 8px;
        color: #667eea;
        min-width: 20px;
    }
    .maturity-levels {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin: 20px 0;
        padding: 15px;
        background: #edf2f7;
        border-radius: 8px;
    }
    .maturity-level {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: #2d3748;
    }
    .level-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    .level-1 { background: #fc8181; }
    .level-2 { background: #f6ad55; }
    .level-3 { background: #68d391; }
    .level-4 { background: #4299e1; }
    .buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
    }
    button {
        padding: 12px 24px;
        font-size: 1em;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .reset-btn {
        background: #e53e3e;
        color: white;
    }
    .reset-btn:hover {
        background: #c53030;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .sample-btn {
        background: #48bb78;
        color: white;
    }
    .sample-btn:hover {
        background: #38a169;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
</style>

<div class="container">
    <div class="maturity-levels">
        <div class="maturity-level">
            <div class="level-indicator level-1"></div>
            <span>Level 1: Crawl</span>
        </div>
        <div class="maturity-level">
            <div class="level-indicator level-2"></div>
            <span>Level 2: Walk</span>
        </div>
        <div class="maturity-level">
            <div class="level-indicator level-3"></div>
            <span>Level 3: Run</span>
        </div>
        <div class="maturity-level">
            <div class="level-indicator level-4"></div>
            <span>Level 4: Fly</span>
        </div>
    </div>

    <div class="chart-container">
        <canvas id="radarChart"></canvas>
    </div>

    <div class="controls" id="sliders"></div>

    <div class="buttons">
        <button class="reset-btn" onclick="resetValues()">Reset All</button>
        <button class="sample-btn" onclick="loadSample()">Load Sample Assessment</button>
    </div>

    <div class="legend" id="legend"></div>
</div>

<script>
    const dimensions = [
        { id: 1, short: "Strategic Vision", full: "Strategic Vision & Leadership" },
        { id: 2, short: "Data Engineering", full: "Data Engineering & Quality" },
        { id: 3, short: "Technology Platforms", full: "Technology Platforms & Infrastructure" },
        { id: 4, short: "Controls & Monitoring", full: "Controls, Monitoring, Observability" },
        { id: 5, short: "Governance", full: "Governance" },
        { id: 6, short: "Security", full: "Security and Threat Management" },
        { id: 7, short: "Teams & Talent", full: "Teams, Talent, Organizational Design" },
        { id: 8, short: "Training & Education", full: "Training and Education" },
        { id: 9, short: "Use Cases", full: "Use Cases" },
        { id: 10, short: "Analytics & MLOps", full: "Analytics, AI Development & MLOps" },
        { id: 11, short: "External Partnerships", full: "External Partnerships" },
        { id: 12, short: "Process Implementation", full: "Process Implementation" }
    ];

    const maturityLevels = ["Crawl", "Walk", "Run", "Fly"];
    let chartData = new Array(12).fill(1);

    // Create sliders
    const slidersContainer = document.getElementById('sliders');
    dimensions.forEach((dim, index) => {
        const sliderGroup = document.createElement('div');
        sliderGroup.className = 'slider-group';
        sliderGroup.innerHTML = `
            <div class="slider-label">${dim.id}. ${dim.short}</div>
            <input type="range" min="1" max="4" value="1" step="1" 
                   id="slider${index}" onchange="updateChart(${index}, this.value)">
            <div class="value-display" id="value${index}">Level 1: Crawl</div>
        `;
        slidersContainer.appendChild(sliderGroup);
    });

    // Create legend
    const legendContainer = document.getElementById('legend');
    dimensions.forEach(dim => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <span class="legend-number">${dim.id}.</span>
            <span>${dim.full}</span>
        `;
        legendContainer.appendChild(legendItem);
    });

    // Create chart
    const ctx = document.getElementById('radarChart').getContext('2d');
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dimensions.map(d => `${d.id}. ${d.short}`),
            datasets: [{
                label: 'Maturity Level',
                data: chartData,
                fill: true,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 4,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return value === 0 ? '' : `L${value}`;
                        },
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        color: '#2d3748'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const level = context.parsed.r;
                            return `${dimensions[context.dataIndex].full}: Level ${level} (${maturityLevels[level-1]})`;
                        }
                    }
                }
            }
        }
    });

    function updateChart(index, value) {
        chartData[index] = parseInt(value);
        radarChart.data.datasets[0].data = chartData;
        radarChart.update();
        document.getElementById(`value${index}`).textContent = 
            `Level ${value}: ${maturityLevels[value-1]}`;
    }

    function resetValues() {
        chartData = new Array(12).fill(1);
        radarChart.data.datasets[0].data = chartData;
        radarChart.update();
        dimensions.forEach((_, index) => {
            document.getElementById(`slider${index}`).value = 1;
            document.getElementById(`value${index}`).textContent = 'Level 1: Crawl';
        });
    }

    function loadSample() {
        const sampleData = [3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2];
        chartData = sampleData;
        radarChart.data.datasets[0].data = chartData;
        radarChart.update();
        dimensions.forEach((_, index) => {
            document.getElementById(`slider${index}`).value = sampleData[index];
            document.getElementById(`value${index}`).textContent = 
                `Level ${sampleData[index]}: ${maturityLevels[sampleData[index]-1]}`;
        });
    }
</script>
