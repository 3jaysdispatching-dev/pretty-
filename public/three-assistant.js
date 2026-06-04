/**
 * THREE AI Assistant
 * Intelligent dispatch management chatbot
 */

class THREEAssistant {
    constructor() {
        this.name = "THREE";
        this.version = "1.0.0";
        this.isOpen = false;
        this.messages = [];
        this.context = {
            user: "dispatcher",
            activeLoads: 0,
            activeDrivers: 0,
            totalRevenue: 0
        };
        this.init();
    }

    init() {
        this.createWidget();
        this.setupEventListeners();
        this.logWelcome();
    }

    createWidget() {
        // Container
        const container = document.createElement('div');
        container.id = 'three-assistant';
        container.className = 'three-assistant-container';
        container.innerHTML = `
            <div class="three-chat-widget">
                <!-- Header -->
                <div class="three-header">
                    <div class="three-header-left">
                        <img src="/logo.svg" alt="THREE" class="three-logo">
                        <div class="three-header-text">
                            <h3>THREE</h3>
                            <span class="three-status">Online</span>
                        </div>
                    </div>
                    <button class="three-close-btn" id="threeCloseBtn">✕</button>
                </div>

                <!-- Messages -->
                <div class="three-messages" id="threeMessages">
                    <div class="three-message assistant">
                        <div class="three-avatar">⬢</div>
                        <div class="three-bubble">
                            Hey there! I'm THREE, your intelligent dispatch assistant. How can I help optimize your fleet today?
                        </div>
                    </div>
                </div>

                <!-- Input -->
                <div class="three-input-area">
                    <input 
                        type="text" 
                        id="threeInput" 
                        class="three-input" 
                        placeholder="Ask me about loads, drivers, routes..."
                        autocomplete="off"
                    >
                    <button class="three-send-btn" id="threeSendBtn">→</button>
                </div>

                <!-- Quick Actions -->
                <div class="three-quick-actions">
                    <button class="three-action-btn" data-action="status">Fleet Status</button>
                    <button class="three-action-btn" data-action="routes">Optimize Routes</button>
                    <button class="three-action-btn" data-action="alerts">Show Alerts</button>
                </div>
            </div>

            <!-- Toggle Button (when minimized) -->
            <button class="three-toggle-btn" id="threeToggleBtn">
                <img src="/logo.svg" alt="THREE" class="three-logo-mini">
            </button>
        `;

        document.body.appendChild(container);
    }

    setupEventListeners() {
        // Send message
        document.getElementById('threeSendBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('threeInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Close/minimize
        document.getElementById('threeCloseBtn').addEventListener('click', () => this.minimize());
        document.getElementById('threeToggleBtn').addEventListener('click', () => this.maximize());

        // Quick actions
        document.querySelectorAll('.three-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickAction(e.target.dataset.action));
        });
    }

    sendMessage() {
        const input = document.getElementById('threeInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Generate response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'assistant');
        }, 500);
    }

    generateResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        // Keyword-based responses
        if (msg.includes('hello') || msg.includes('hi')) {
            return "👋 Hey! What can I help you with? I can provide fleet status, optimize routes, show alerts, or help with dispatch management.";
        }

        if (msg.includes('status') || msg.includes('how many')) {
            return `📊 Fleet Status:\n• Active Drivers: ${this.context.activeDrivers}\n• Pending Loads: ${this.context.activeLoads}\n• Today's Revenue: $${this.context.totalRevenue.toLocaleString()}\n\nEverything running smoothly!`;
        }

        if (msg.includes('route') || msg.includes('optimize')) {
            return "🗺️ Route Optimization: I've analyzed all active loads. Top 3 optimizations:\n1. Consolidate loads 4 & 7 (same destination)\n2. Reassign driver 3 to load 5 (shorter distance)\n3. Adjust pickup order for route 2 (+5% efficiency)";
        }

        if (msg.includes('alert') || msg.includes('problem') || msg.includes('issue')) {
            return "⚠️ Current Alerts:\n• Driver 2 approaching HOS limit (2 hours)\n• Load 8 delayed (traffic on I-95)\n• Vehicle 5 maintenance due in 3 days\n\nNeed help addressing any of these?";
        }

        if (msg.includes('driver')) {
            return "👤 Driver Information:\nWhich driver would you like to know about? I can show:\n• Current location & status\n• HOS remaining\n• Current load assignment\n• Performance metrics";
        }

        if (msg.includes('load')) {
            return "📦 Load Management:\nWhat would you like to do?\n• Create new load\n• Track existing load\n• Find available drivers\n• Optimize assignments";
        }

        if (msg.includes('billing') || msg.includes('invoice') || msg.includes('revenue')) {
            return "💰 Billing & Revenue:\nToday's summary:\n• Total Revenue: $2,450\n• Average Load Value: $204\n• Driver Payouts: $1,225\n• Margin: 50%";
        }

        if (msg.includes('help')) {
            return "ℹ️ I can help you with:\n• Fleet status & monitoring\n• Route optimization\n• Load & driver management\n• Revenue & billing\n• HOS & compliance tracking\n• Alert management\n\nWhat would you like help with?";
        }

        // Default response
        return "🤖 I understand you're asking about: \"" + userMessage + "\"\n\nI can help with fleet management, route optimization, driver tracking, and billing. What would you like to focus on?";
    }

    handleQuickAction(action) {
        const actions = {
            status: "📊 Fleet Status:\n• Active Drivers: 6\n• Pending Loads: 12\n• On-Time Rate: 94%\n• Revenue Today: $2,450",
            routes: "🗺️ Route Optimization:\nAnalyzing 12 active loads...\n✓ Consolidated loads 4 & 7\n✓ Reassigned driver 3\n✓ Optimized pickup sequence\n\nEstimated improvement: +8% efficiency",
            alerts: "⚠️ Active Alerts:\n🔴 Driver 2: HOS limit in 2 hours\n🟡 Load 8: Delayed 15 minutes\n🔵 Vehicle 5: Maintenance due soon"
        };

        this.addMessage(actions[action] || "Action unavailable", 'assistant');
    }

    addMessage(text, sender) {
        const messagesDiv = document.getElementById('threeMessages');
        const messageEl = document.createElement('div');
        messageEl.className = `three-message ${sender}`;
        
        if (sender === 'assistant') {
            messageEl.innerHTML = `
                <div class="three-avatar">⬢</div>
                <div class="three-bubble">${this.escapeHtml(text).replace(/\n/g, '<br>')}</div>
            `;
        } else {
            messageEl.innerHTML = `
                <div class="three-bubble user-bubble">${this.escapeHtml(text).replace(/\n/g, '<br>')}</div>
                <div class="three-avatar">👤</div>
            `;
        }

        messagesDiv.appendChild(messageEl);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        this.messages.push({ text, sender, timestamp: new Date() });
    }

    minimize() {
        document.querySelector('.three-chat-widget').style.display = 'none';
        document.getElementById('threeToggleBtn').style.display = 'flex';
    }

    maximize() {
        document.querySelector('.three-chat-widget').style.display = 'flex';
        document.getElementById('threeToggleBtn').style.display = 'none';
        document.getElementById('threeInput').focus();
    }

    logWelcome() {
        console.log('%c⬢ THREE AI Assistant v1.0.0 initialized', 'color: #9D4EDD; font-size: 16px; font-weight: bold;');
        console.log('%cIntelligent Fleet Dispatch Management', 'color: #00D9FF; font-size: 12px;');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // API to update context from main app
    updateContext(context) {
        this.context = { ...this.context, ...context };
    }

    getMessages() {
        return this.messages;
    }

    clearMessages() {
        document.getElementById('threeMessages').innerHTML = `
            <div class="three-message assistant">
                <div class="three-avatar">⬢</div>
                <div class="three-bubble">
                    Chat cleared. How can I help you today?
                </div>
            </div>
        `;
        this.messages = [];
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.threeAssistant = new THREEAssistant();
});
