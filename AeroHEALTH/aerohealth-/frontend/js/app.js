
class AeroHealthAdvancedApp {
    constructor() {
        this.currentCity = 'Lucknow';
        this.backendUrl = 'http://localhost:8000';
        this.isOnline = navigator.onLine;
        this.initialized = false;
        this.lastUpdate = null;
        this.updateInterval = null;
        this.performanceMetrics = {};

        // Feature flags
        this.features = {
            globe3D: true,
            ultraAI: true,
            cityPrediction: true,
            healthPersonalization: true,
            offlineMode: true,
            realTimeUpdates: true
        };

        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing AeroHealth Ultimate Advanced...');

            this.setupEventListeners();
            this.initializeUI();
            await this.fetchSpaceData();
            this.startPerformanceMonitoring();
            this.setupKeyboardShortcuts();

            this.initialized = true;
            this.updateAdvancedStatus('Ultimate Advanced - All Systems Operational', '🚀');

            console.log('✅ AeroHealth Ultimate Advanced initialized successfully');
        } catch (error) {
            console.error('❌ Initialization error:', error);
            this.handleError(error, 'initialization');
        }
    }

    setupEventListeners() {
        // City selection
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            citySelect.addEventListener('change', () => {
                this.currentCity = citySelect.value;
                this.fetchSpaceData();
                this.showSpaceNotification(`🎯 Location updated to ${this.currentCity}`, 'info');
            });
        }

        // Chat input
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendChatMessage();
                }
            });

            chatInput.addEventListener('input', this.handleChatInputChange.bind(this));
        }

        // Network status monitoring
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showSpaceNotification('🌐 Connection restored', 'success');
            this.fetchSpaceData();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showSpaceNotification('📴 Offline mode activated', 'warning');
        });

        // Visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseUpdates();
            } else {
                this.resumeUpdates();
            }
        });

        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));

        // Scroll effects
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    initializeUI() {
        // Initialize advanced UI components
        this.initializeSpaceParticles();
        this.initializeAdvancedNav();
        this.initializeNotificationSystem();
        this.initializeThemeSystem();

        // Add initial welcome message
        this.addWelcomeMessage();
    }

    initializeSpaceParticles() {
        // Enhanced particle system
        const particlesContainer = document.getElementById('space-particles');
        if (!particlesContainer) return;

        // Create additional floating particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--aurora-cyan);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${0.3 + Math.random() * 0.4};
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 ${5 + Math.random() * 10}px var(--aurora-cyan);
            `;
            particlesContainer.appendChild(particle);
        }
    }

    initializeAdvancedNav() {
        // Enhanced navigation with smooth scrolling
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href');
                this.smoothScrollTo(target);
                this.updateActiveNavItem(item);
            });
        });

        // Auto-update active nav item on scroll
        this.setupScrollSpy();
    }

    initializeNotificationSystem() {
        // Enhanced notification container
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 90px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
    }

    initializeThemeSystem() {
        // Dynamic theme adjustments based on time
        const hour = new Date().getHours();
        if (hour < 6 || hour > 20) {
            document.documentElement.style.setProperty('--space-black', '#000008');
            document.documentElement.style.setProperty('--deep-space', '#0a0a12');
        }
    }

    addWelcomeMessage() {
        if (typeof addAdvancedChatMessage === 'function') {
            const welcomeMsg = `🌌 **Welcome to AeroHealth Ultimate Advanced!**\n\n🚀 **New Advanced Features:**\n• 🌍 **3D NASA Globe**: Interactive Earth with satellite tracking\n• 🧠 **Ultra AI**: 500+ cities intelligence with comparisons\n• 🔮 **Prediction Engine**: 7-day forecasts for any Indian city\n• 💚 **Health Intelligence**: Personalized recommendations\n\n**Try asking:**\n• "Compare Delhi vs Mumbai air quality"\n• "7-day forecast for Bangalore"\n• "Cleanest cities in India"\n• "NASA satellites monitoring Chennai"\n\nClick buttons above to activate 3D Globe and explore 500+ cities!`;

            setTimeout(() => addAdvancedChatMessage(welcomeMsg, 'bot'), 1000);
        }
    }

    async fetchSpaceData() {
        try {
            this.showLoading();

            let response;
            if (this.isOnline) {
                
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000);

                    response = await fetch(`${this.backendUrl}/api/v1/air-quality/current?city=${this.currentCity}`, {
                        signal: controller.signal,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`Backend responded with ${response.status}`);
                    }

                    const data = await response.json();
                    this.updateDashboardWithData(data);
                    this.updateAdvancedStatus('Connected to Enhanced Backend', '🛰️');

                } catch (backendError) {
                    console.warn('🔄 Backend unavailable, using advanced simulation:', backendError);
                    this.useAdvancedSimulation();
                    this.updateAdvancedStatus('Advanced Simulation Mode', '🧠');
                }
            } else {
                this.useAdvancedSimulation();
                this.updateAdvancedStatus('Offline Advanced Mode', '📴');
            }

            this.lastUpdate = new Date();
            this.hideLoading();

        } catch (error) {
            console.error('❌ Data fetch error:', error);
            this.handleError(error, 'data-fetch');
            this.useAdvancedSimulation();
            this.hideLoading();
        }
    }

    useAdvancedSimulation() {
        // Enhanced simulation with realistic data
        const cityData = this.getAdvancedCityData(this.currentCity);

        const simulatedData = {
            city: cityData.name,
            location: {
                latitude: cityData.lat,
                longitude: cityData.lon,
                country: "India",
                emoji: cityData.emoji,
                space_code: cityData.space_code,
                sector: cityData.sector
            },
            air_quality: {
                aqi: cityData.aqi,
                category: cityData.category,
                dominant_pollutant: "PM2.5",
                risk_level: cityData.risk_level,
                pm25_value: cityData.pm25
            },
            nasa_satellite: {
                average_aod: cityData.aod,
                latest_aod: (cityData.aod * (0.9 + Math.random() * 0.2)).toFixed(3),
                trend: cityData.trend,
                category: cityData.aod_category,
                visibility_km: cityData.visibility,
                health_impact: cityData.health_impact,
                data_range: "7 days advanced simulation",
                space_grade: "Ultimate modeling applied"
            },
            health_recommendations: {
                health_impact: cityData.health_summary,
                general_recommendations: cityData.recommendations,
                risk_level: cityData.risk_level,
                outdoor_activity_guidance: {
                    running: cityData.running_safety,
                    walking: cityData.walking_safety,
                    cycling: cityData.cycling_safety
                },
                sensitive_groups: [
                    "Children and teenagers",
                    "Adults over 65 years", 
                    "Pregnant women",
                    "People with respiratory conditions",
                    "People with cardiovascular disease"
                ]
            },
            space_interface: {
                cosmic_status: "Ultimate Advanced Edition active",
                detailed_intelligence: `Advanced analytics for ${cityData.name}`,
                space_code: cityData.space_code,
                sector: cityData.sector
            },
            timestamp: new Date().toISOString()
        };

        this.updateDashboardWithData(simulatedData);
    }

    getAdvancedCityData(cityName) {
        const cityDatabase = {
            "Lucknow": { 
                name: "Lucknow", lat: 26.8467, lon: 80.9462, emoji: "🏛️", 
                space_code: "LKO-001", sector: "Northern Sector",
                aqi: 68 + Math.floor(Math.random() * 30), 
                base_aod: 0.38
            },
            "Delhi": { 
                name: "Delhi", lat: 28.6139, lon: 77.2090, emoji: "🏛️", 
                space_code: "DEL-001", sector: "Capital Sector",
                aqi: 152 + Math.floor(Math.random() * 40), 
                base_aod: 0.65
            },
            "Mumbai": { 
                name: "Mumbai", lat: 19.0760, lon: 72.8777, emoji: "🌊", 
                space_code: "MUM-001", sector: "Western Sector",
                aqi: 89 + Math.floor(Math.random() * 25), 
                base_aod: 0.42
            },
            "Kolkata": { 
                name: "Kolkata", lat: 22.5726, lon: 88.3639, emoji: "🏙️", 
                space_code: "KOL-001", sector: "Eastern Sector",
                aqi: 134 + Math.floor(Math.random() * 35), 
                base_aod: 0.58
            },
            "Bangalore": { 
                name: "Bangalore", lat: 12.9716, lon: 77.5946, emoji: "🌳", 
                space_code: "BLR-001", sector: "Southern Sector",
                aqi: 76 + Math.floor(Math.random() * 20), 
                base_aod: 0.29
            },
            "Chennai": { 
                name: "Chennai", lat: 13.0827, lon: 80.2707, emoji: "🏖️", 
                space_code: "MAA-001", sector: "Coastal Sector",
                aqi: 82 + Math.floor(Math.random() * 18), 
                base_aod: 0.33
            },
            "Pune": { 
                name: "Pune", lat: 18.5204, lon: 73.8567, emoji: "🏔️", 
                space_code: "PUN-001", sector: "Western Hills",
                aqi: 91 + Math.floor(Math.random() * 22), 
                base_aod: 0.36
            },
            "Hyderabad": { 
                name: "Hyderabad", lat: 17.3850, lon: 78.4867, emoji: "💎", 
                space_code: "HYD-001", sector: "Deccan Sector",
                aqi: 78 + Math.floor(Math.random() * 20), 
                base_aod: 0.31
            },
            "Ahmedabad": { 
                name: "Ahmedabad", lat: 23.0225, lon: 72.5714, emoji: "🏭", 
                space_code: "AMD-001", sector: "Gujarat Sector",
                aqi: 118 + Math.floor(Math.random() * 28), 
                base_aod: 0.48
            },
            "Jaipur": { 
                name: "Jaipur", lat: 26.9124, lon: 75.7873, emoji: "🏰", 
                space_code: "JAI-001", sector: "Rajasthan Sector",
                aqi: 102 + Math.floor(Math.random() * 25), 
                base_aod: 0.41
            }
        };

        const city = cityDatabase[cityName] || cityDatabase["Lucknow"];
        const aqi = city.aqi;
        const aod = (city.base_aod * (0.85 + Math.random() * 0.3)).toFixed(3);

        // Generate realistic derived values
        let category, risk_level;
        if (aqi <= 50) {
            category = "Good";
            risk_level = "Low";
        } else if (aqi <= 100) {
            category = "Moderate";
            risk_level = "Low-Moderate";
        } else if (aqi <= 150) {
            category = "Unhealthy for Sensitive Groups";
            risk_level = "Moderate";
        } else if (aqi <= 200) {
            category = "Unhealthy";
            risk_level = "High";
        } else {
            category = "Very Unhealthy";
            risk_level = "Very High";
        }

        const visibility = Math.max(3, Math.round(50 / parseFloat(aod)));
        const pm25 = Math.round(aqi * 0.7 + Math.random() * 10);

        const trends = ['improving', 'stable', 'slightly increasing', 'decreasing'];
        const trend = trends[Math.floor(Math.random() * trends.length)];

        const aod_categories = ['Excellent', 'Good', 'Moderate', 'Fair', 'Poor'];
        const aod_category = aod < 0.2 ? 'Excellent' : aod < 0.3 ? 'Good' : aod < 0.4 ? 'Moderate' : aod < 0.5 ? 'Fair' : 'Poor';

        const health_impact = risk_level === 'Low' 
            ? `Excellent atmospheric conditions in ${city.name}! Perfect for all outdoor activities.`
            : risk_level === 'Low-Moderate' 
            ? `Good air quality in ${city.name}. Generally acceptable for most people.`
            : risk_level === 'Moderate'
            ? `Air quality in ${city.name} is concerning for sensitive groups. Monitor conditions.`
            : `Air quality in ${city.name} requires caution. Limit outdoor exposure.`;

        const recommendations = risk_level === 'Low'
            ? [`Outstanding conditions for outdoor activities in ${city.name}`, "Perfect for exercise and recreational activities", "Excellent conditions for children to play outside"]
            : risk_level === 'Low-Moderate'
            ? [`Normal outdoor activities recommended in ${city.name}`, "Sensitive individuals should monitor conditions", "Good for moderate exercise and activities"]
            : risk_level === 'Moderate'
            ? [`Limit prolonged outdoor activities in ${city.name}`, "Sensitive groups should wear masks", "Consider indoor alternatives during peak hours"]
            : [`Stay indoors in ${city.name} when possible`, "Avoid outdoor exercise", "Use air purifiers and N95 masks"];

        return {
            ...city,
            aqi,
            aod: parseFloat(aod),
            category,
            risk_level,
            pm25,
            trend,
            aod_category,
            visibility,
            health_impact,
            health_summary: health_impact,
            recommendations,
            running_safety: aqi <= 75 ? "Safe" : aqi <= 125 ? "Caution" : "Avoid",
            walking_safety: aqi <= 100 ? "Safe" : aqi <= 150 ? "Limited" : "Avoid",
            cycling_safety: aqi <= 75 ? "Safe" : aqi <= 125 ? "Caution" : "Avoid"
        };
    }

    updateDashboardWithData(data) {
        try {
            // Update NASA AOD data
            this.updateElement('nasa-aod-value', data.nasa_satellite.average_aod);
            this.updateElement('nasa-aod-category', data.nasa_satellite.category);
            this.updateElement('nasa-aod-trend', data.nasa_satellite.trend);
            this.updateElement('nasa-aod-visibility', `${data.nasa_satellite.visibility_km} km`);

            // Update AQI data with color coding
            const aqiElement = document.getElementById('aqi-value');
            if (aqiElement) {
                aqiElement.textContent = data.air_quality.aqi;
                aqiElement.className = `metric-value aqi-${this.getAQIClass(data.air_quality.aqi)}`;
            }

            this.updateElement('aqi-category', data.air_quality.category);
            this.updateElement('aqi-dominant', data.air_quality.dominant_pollutant);
            this.updateElement('aqi-risk', data.air_quality.risk_level);

            // Update health recommendations
            this.updateElement('health-impact', data.health_recommendations.health_impact);

            const recommendationsList = document.getElementById('health-recommendations');
            if (recommendationsList) {
                recommendationsList.innerHTML = data.health_recommendations.general_recommendations
                    .map(rec => `<li>${rec}</li>`)
                    .join('');
            }

            // Update status with location info
            this.updateAdvancedStatus(`${data.location.emoji} ${data.city} • AQI ${data.air_quality.aqi}`, '📊');

            // Add glow effects based on AQI
            this.updateVisualEffects(data.air_quality.aqi);

            // Store data for other components
            this.currentData = data;

        } catch (error) {
            console.error('❌ Dashboard update error:', error);
            this.handleError(error, 'dashboard-update');
        }
    }

    updateElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = 'fadeIn 0.5s ease-in';
        }
    }

    getAQIClass(aqi) {
        if (aqi <= 50) return 'good';
        if (aqi <= 100) return 'moderate';
        if (aqi <= 150) return 'usg';
        if (aqi <= 200) return 'unhealthy';
        return 'very-unhealthy';
    }

    updateVisualEffects(aqi) {
        const root = document.documentElement;

        if (aqi <= 50) {
            root.style.setProperty('--primary-glow', 'rgba(76, 175, 80, 0.3)');
        } else if (aqi <= 100) {
            root.style.setProperty('--primary-glow', 'rgba(255, 193, 7, 0.3)');
        } else if (aqi <= 150) {
            root.style.setProperty('--primary-glow', 'rgba(255, 152, 0, 0.3)');
        } else {
            root.style.setProperty('--primary-glow', 'rgba(244, 67, 54, 0.3)');
        }

        // Update particle colors
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach(particle => {
            particle.style.boxShadow = `0 0 ${5 + Math.random() * 10}px var(--primary-glow)`;
        });
    }

    showSpaceNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container') || document.body;

        const notification = document.createElement('div');
        notification.className = `space-notification notification-${type}`;

        const colors = {
            'success': '#4CAF50',
            'warning': '#FF9800',
            'error': '#F44336',
            'info': '#00D4FF'
        };

        const icons = {
            'success': '✅',
            'warning': '⚠️', 
            'error': '❌',
            'info': 'ℹ️'
        };

        notification.style.cssText = `
            position: relative;
            margin-bottom: 12px;
            padding: 16px 20px;
            background: var(--glass-gradient);
            backdrop-filter: blur(20px);
            color: var(--venus-white);
            border: 1px solid ${colors[type]};
            border-radius: 12px;
            box-shadow: 0 0 30px ${colors[type]}40;
            font-weight: 600;
            font-family: 'Orbitron', monospace;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(500px);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: all;
            cursor: pointer;
            animation: slideInRight 0.4s ease-out;
        `;

        notification.innerHTML = `
            <span style="font-size: 1.2em;">${icons[type]}</span>
            <span>${message}</span>
        `;

        notification.onclick = () => notification.remove();
        container.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            notification.style.transform = 'translateX(500px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, duration);
    }

    updateAdvancedStatus(text, icon) {
        const statusIcon = document.getElementById('status-icon');
        const statusText = document.getElementById('status-text');
        const statusBadge = document.getElementById('statusBadge');

        if (statusIcon) statusIcon.textContent = icon;
        if (statusText) statusText.textContent = text;

        if (statusBadge) {
            statusBadge.style.animation = 'pulse 0.3s ease-in';
            setTimeout(() => {
                statusBadge.style.animation = '';
            }, 300);
        }
    }

    showLoading() {
        const elements = ['nasa-aod-value', 'aqi-value'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = '<div class="spinner"></div>';
            }
        });
    }

    hideLoading() {
        // Loading will be replaced by actual data in updateDashboardWithData
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only trigger if not in input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.smoothScrollTo('#hero');
                        break;
                    case '2':
                        e.preventDefault();
                        this.smoothScrollTo('#features');
                        break;
                    case '3':
                        e.preventDefault();
                        this.smoothScrollTo('#dashboard');
                        break;
                    case '4':
                        e.preventDefault();
                        this.smoothScrollTo('#ai-chat');
                        break;
                    case '5':
                        e.preventDefault();
                        this.smoothScrollTo('#prediction');
                        break;
                    case '/':
                        e.preventDefault();
                        const chatInput = document.getElementById('chatInput');
                        if (chatInput) chatInput.focus();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.fetchSpaceData();
                        this.showSpaceNotification('🔄 Data refreshed manually', 'info');
                        break;
                }
            }

            if (e.key === 'Escape') {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) chatInput.blur();
            }
        });
    }

    smoothScrollTo(selector) {
        const target = document.querySelector(selector);
        if (target) {
            const offset = window.innerWidth < 768 ? 80 : 100;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavItem(activeItem) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');

        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = '#' + entry.target.id;
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === targetId) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    handleChatInputChange(e) {
        // Auto-resize chat input
        const input = e.target;
        input.style.height = 'auto';
        input.style.height = (input.scrollHeight) + 'px';

        // Show typing indicator for AI
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
            // Remove any typing indicators
        }, 1000);
    }

    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.onResize();
        }, 100);
    }

    onResize() {
        // Handle responsive adjustments
        const width = window.innerWidth;

        if (width < 768) {
            // Mobile adjustments
            this.optimizeForMobile();
        } else if (width < 1200) {
            // Tablet adjustments
            this.optimizeForTablet();
        } else {
            // Desktop adjustments
            this.optimizeForDesktop();
        }

        // Notify globe component if active
        if (window.nasaGlobe && window.globeActive) {
            window.nasaGlobe.resize();
        }
    }

    optimizeForMobile() {
        // Mobile-specific optimizations
        const root = document.documentElement;
        root.style.setProperty('--particle-count', '5');
        root.style.setProperty('--animation-duration', '4s');
    }

    optimizeForTablet() {
        // Tablet-specific optimizations
        const root = document.documentElement;
        root.style.setProperty('--particle-count', '8');
        root.style.setProperty('--animation-duration', '3s');
    }

    optimizeForDesktop() {
        // Desktop-specific optimizations
        const root = document.documentElement;
        root.style.setProperty('--particle-count', '12');
        root.style.setProperty('--animation-duration', '2s');
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);

        // Update navigation background opacity
        const nav = document.querySelector('.space-nav');
        if (nav) {
            const opacity = Math.min(0.95, scrollPercent * 2);
            nav.style.background = `rgba(0, 0, 17, ${opacity})`;
        }

        // Parallax effect for hero section
        const hero = document.querySelector('.hero-section');
        if (hero && scrollTop < window.innerHeight) {
            hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
    }

    startPerformanceMonitoring() {
        // Monitor performance metrics
        if ('performance' in window) {
            this.performanceObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        this.performanceMetrics.loadTime = entry.loadEventEnd - entry.loadEventStart;
                        this.performanceMetrics.domReady = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
                    }
                });
            });

            this.performanceObserver.observe({ entryTypes: ['navigation'] });
        }

        // Memory monitoring (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                this.performanceMetrics.memory = {
                    used: Math.round(memory.usedJSHeapSize / 1048576),
                    total: Math.round(memory.totalJSHeapSize / 1048576),
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576)
                };
            }, 30000);
        }
    }

    pauseUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    resumeUpdates() {
        if (!this.updateInterval) {
            this.updateInterval = setInterval(() => {
                this.fetchSpaceData();
            }, 300000); // 5 minutes
        }
    }

    handleError(error, context = 'general') {
        console.error(`❌ Error in ${context}:`, error);

        const errorMessages = {
            'initialization': 'System initialization error - some features may be limited',
            'data-fetch': 'Data unavailable - using advanced simulation mode',
            'dashboard-update': 'Display update error - refreshing interface',
            'ai-response': 'AI temporarily unavailable - please try again',
            'general': 'An unexpected error occurred - system remains operational'
        };

        this.showSpaceNotification(errorMessages[context] || errorMessages.general, 'warning');

        // Try to recover
        if (context === 'data-fetch') {
            setTimeout(() => this.fetchSpaceData(), 5000);
        }
    }

    // Public API methods for external components
    getCurrentData() {
        return this.currentData;
    }

    updateCity(cityName) {
        this.currentCity = cityName;
        this.fetchSpaceData();
        this.showSpaceNotification(`🎯 Location updated to ${cityName}`, 'info');
    }

    getPerformanceMetrics() {
        return this.performanceMetrics;
    }

    isFeatureEnabled(feature) {
        return this.features[feature] === true;
    }

    // Cleanup method
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        if (this.performanceObserver) {
            this.performanceObserver.disconnect();
        }

        // Remove event listeners
        window.removeEventListener('online', this.handleOnline);
        window.removeEventListener('offline', this.handleOffline);
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);

        console.log('🧹 AeroHealth Advanced App cleaned up');
    }
}

// Global function handlers for HTML onclick events
function fetchAirQualityData() {
    if (window.aeroHealthApp) {
        window.aeroHealthApp.fetchSpaceData();
    }
}

function fetchNASAData() {
    if (window.aeroHealthApp) {
        window.aeroHealthApp.fetchSpaceData();
    }
}

function suggestQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        chatInput.focus();
        chatInput.select();
    }
}

// Initialize the advanced application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded - Initializing AeroHealth Ultimate Advanced...');

    try {
        // Initialize main application
        window.aeroHealthApp = new AeroHealthAdvancedApp();

        // Global performance monitoring
        window.addEventListener('load', function() {
            setTimeout(() => {
                if ('performance' in window && performance.getEntriesByType) {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('🎯 Ultimate Advanced Performance:', {
                            'Load Time': Math.round(perfData.loadEventEnd - perfData.loadEventStart) + 'ms',
                            'DOM Ready': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart) + 'ms',
                            'Total Time': Math.round(perfData.loadEventEnd - perfData.navigationStart) + 'ms',
                            'Features': 'All Advanced Systems Loaded'
                        });
                    }
                }
            }, 1000);
        });

        // Global error handling
        window.addEventListener('error', function(e) {
            console.error('🚨 Global error:', e.error);
            if (window.aeroHealthApp) {
                window.aeroHealthApp.handleError(e.error, 'global');
            }
        });

        // Unhandled promise rejection handling
        window.addEventListener('unhandledrejection', function(e) {
            console.error('🚨 Unhandled promise rejection:', e.reason);
            if (window.aeroHealthApp) {
                window.aeroHealthApp.handleError(e.reason, 'promise');
            }
        });

        console.log('✅ AeroHealth Ultimate Advanced initialized successfully!');
        console.log('🌟 Features: 3D Globe, Ultra AI, 500+ Cities, Health Intelligence');

    } catch (error) {
        console.error('❌ Critical initialization error:', error);

        // Fallback initialization
        document.body.innerHTML += `
            <div style="
                position: fixed; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%);
                background: var(--glass-gradient);
                border: 1px solid var(--aurora-cyan);
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                color: var(--venus-white);
                font-family: 'Orbitron', monospace;
                z-index: 10000;
            ">
                <h3>🛰️ AeroHealth Ultimate Advanced</h3>
                <p>Loading advanced features...</p>
                <p>If this persists, please refresh the page.</p>
                <button onclick="location.reload()" style="
                    background: var(--aurora-gradient);
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    color: var(--space-black);
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                ">Refresh</button>
            </div>
        `;
    }
});

// Service worker registration for offline capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('🔄 Service Worker support available for offline mode');
    });
}
