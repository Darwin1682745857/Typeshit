// Universal Theme Synchronization & Tab Color Fix
(function() {
    function getCSSVariable(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    function updateTabColor() {
        setTimeout(() => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            let tabColor = getCSSVariable('--primary-color') || '#4f6ef7';
            
            // If the primary color isn't available or we want a specific dark mode tab color
            if (isDark && !getCSSVariable('--primary-color')) tabColor = '#0f172a';

            let metaTheme = document.querySelector('meta[name="theme-color"]');
            if (!metaTheme) {
                metaTheme = document.createElement('meta');
                metaTheme.name = 'theme-color';
                document.head.appendChild(metaTheme);
            }
            metaTheme.content = tabColor;
        }, 100); // slight delay to allow CSS to recalculate after attribute change
    }

    function syncThemeFromStorage() {
        const theme = localStorage.getItem('theme') || 'light';
        const color = localStorage.getItem('colorTheme') || 'default';
        
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        document.documentElement.setAttribute('data-color', color);
        updateTabColor();
    }

    // Apply strictly on initial script load
    syncThemeFromStorage();

    // Re-apply when DOM is fully built to ensure CSS properties are loaded
    window.addEventListener('DOMContentLoaded', updateTabColor);
    window.addEventListener('load', updateTabColor);

    // Sync instantly when other tabs change local storage
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme' || e.key === 'colorTheme') {
            syncThemeFromStorage();
        }
    });

    // Observe local DOM changes (e.g. from inline scripts in current tab)
    const observer = new MutationObserver((mutations) => {
        let needsUpdate = false;
        mutations.forEach(m => {
            if (m.attributeName === 'data-theme' || m.attributeName === 'data-color') {
                needsUpdate = true;
            }
        });
        if (needsUpdate) updateTabColor();
    });
    
    // Once DOM is interactive, observe HTML element
    if (document.documentElement) {
        observer.observe(document.documentElement, { attributes: true });
    }
})();

// ==========================================
// EPIC FEATURE: GLOBAL COMMAND PALETTE & WIDGETS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Create the UI
    const paletteBackdrop = document.createElement("div");
    paletteBackdrop.id = "cmd-palette-backdrop";
    Object.assign(paletteBackdrop.style, {
        display: "none", position: "fixed", inset: "0", background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)", zIndex: "999999", alignItems: "flex-start",
        justifyContent: "center", paddingTop: "12vh", opacity: "0", transition: "opacity 0.2s"
    });

    const paletteBox = document.createElement("div");
    paletteBox.id = "cmd-palette";
    Object.assign(paletteBox.style, {
        background: "var(--card-bg-color, #ffffff)", width: "90%", maxWidth: "600px",
        borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        border: "1px solid var(--primary-color, rgba(255,255,255,0.1))",
        color: "var(--text-color, #1e293b)", transform: "scale(0.95)",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)", overflow: "hidden", outline: "none"
    });

    const searchHeader = document.createElement("div");
    Object.assign(searchHeader.style, {
        padding: "16px 20px", borderBottom: "1px solid var(--border-color, #e2e8f0)",
        display: "flex", alignItems: "center", gap: "14px"
    });

    searchHeader.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color, #64748b);">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="cmd-input" placeholder="Search pages, tools, themes..." autocomplete="off" spellcheck="false"
            style="width: 100%; background: transparent; border: none; outline: none; font-size: 1.15rem; color: inherit; font-family: inherit;">
        <span style="font-size: 0.7rem; padding: 4px 8px; background: var(--bg-color, #f8fafc); border: 1px solid var(--border-color, #e2e8f0); border-radius: 6px; color: var(--accent-color, #64748b); font-weight: bold;">ESC</span>
    `;

    const resultsContainer = document.createElement("div");
    resultsContainer.id = "cmd-results";
    Object.assign(resultsContainer.style, {
        maxHeight: "350px", overflowY: "auto", padding: "10px", margin: "0"
    });

    paletteBox.appendChild(searchHeader);
    paletteBox.appendChild(resultsContainer);
    paletteBackdrop.appendChild(paletteBox);
    document.body.appendChild(paletteBackdrop);

    // 2. Data Source (Commands & Navigation)
    const commands = [
        { title: "Dashboard Overview", desc: "Go to main summary dashboard", icon: "fa-chart-pie", action: "dashboard.html" },
        { title: "Task Manager", desc: "Open daily schedule planner", icon: "fa-list-check", action: "schedule.html" },
        { title: "To-Do List", desc: "Manage simple checklist items", icon: "fa-check-square", action: "todo.html" },
        { title: "Focus Timer (Pomodoro)", desc: "Start a deep work session", icon: "fa-crosshairs", action: "timer.html" },
        { title: "Khmer Calendar", desc: "View traditional events & phases", icon: "fa-compass", action: "khmer_calendar.html" },
        { title: "Global Time Zones", desc: "Check world clocks", icon: "fa-globe-americas", action: "world_calendar.html" },
        { title: "Homepage", desc: "Back to starting page", icon: "fa-home", action: "homepage.html" },
        { title: "Toggle Dark Mode", desc: "Switch between light and dark themes", icon: "fa-moon", action: () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            localStorage.setItem("theme", isDark ? "light" : "dark");
            window.dispatchEvent(new Event("storage"));
            closePalette();
        }},
        { title: "Theme: Ocean Blue", desc: "Change accent to deep blue", icon: "fa-tint", action: () => { localStorage.setItem("colorTheme", "default"); window.dispatchEvent(new Event("storage")); closePalette(); } },
        { title: "Theme: Emerald Green", desc: "Change accent to nature green", icon: "fa-leaf", action: () => { localStorage.setItem("colorTheme", "green"); window.dispatchEvent(new Event("storage")); closePalette(); } },
        { title: "Theme: Sunset Orange", desc: "Change accent to warm orange", icon: "fa-fire", action: () => { localStorage.setItem("colorTheme", "orange"); window.dispatchEvent(new Event("storage")); closePalette(); } },
        { title: "Theme: Royal Purple", desc: "Change accent to elegant purple", icon: "fa-crown", action: () => { localStorage.setItem("colorTheme", "purple"); window.dispatchEvent(new Event("storage")); closePalette(); } },
        { title: "Theme: Rose Pink", desc: "Change accent to vibrant pink", icon: "fa-heart", action: () => { localStorage.setItem("colorTheme", "pink"); window.dispatchEvent(new Event("storage")); closePalette(); } }
    ];

    let activeIndex = 0;
    const input = document.getElementById("cmd-input");

    // 3. Logic & Interactions
    function togglePalette() {
        if (paletteBackdrop.style.display === "none") {
            paletteBackdrop.style.display = "flex";
            setTimeout(() => {
                paletteBackdrop.style.opacity = "1";
                paletteBox.style.transform = "scale(1)";
                input.value = "";
                renderResults();
                input.focus();
            }, 10);
        } else {
            closePalette();
        }
    }

    function closePalette() {
        paletteBackdrop.style.opacity = "0";
        paletteBox.style.transform = "scale(0.95)";
        setTimeout(() => { paletteBackdrop.style.display = "none"; }, 200);
    }

    function renderResults(query = "") {
        resultsContainer.innerHTML = "";
        const lowerQuery = query.toLowerCase();
        
        let filtered = commands.filter(c => c.title.toLowerCase().includes(lowerQuery) || c.desc.toLowerCase().includes(lowerQuery));
        if (!query) filtered = commands;

        if (filtered.length === 0) {
            resultsContainer.innerHTML = \`<div style="padding:20px; text-align:center; color:var(--accent-color); font-style:italic;">No results found for "\${query}"</div>\`;
            return;
        }

        activeIndex = 0;
        filtered.forEach((cmd, idx) => {
            const item = document.createElement("div");
            item.style.cssText = \`display: flex; align-items: center; gap: 14px; padding: 12px 16px; margin-bottom: 4px; border-radius: 10px; cursor: pointer; transition: all 0.15s; background: \${idx === activeIndex ? "var(--current-highlight, rgba(0,0,0,0.05))" : "transparent"}; color: \${idx === activeIndex ? "var(--primary-color)" : "inherit"}; border-left: 3px solid \${idx === activeIndex ? "var(--primary-color)" : "transparent"};\`;
            
            // Hover logic
            item.onmouseover = () => {
                Array.from(resultsContainer.children).forEach(c => {
                   c.style.background = "transparent"; c.style.color = "inherit"; c.style.borderLeftColor = "transparent";
                });
                item.style.background = "var(--current-highlight, rgba(0,0,0,0.05))";
                item.style.color = "var(--primary-color)";
                item.style.borderLeftColor = "var(--primary-color)";
                activeIndex = idx;
            };

            const iconClass = cmd.icon;
            
            item.innerHTML = \`
                <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(120,120,120,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                   <i class="fas \${iconClass}"></i>
                </div>
                <div style="flex:1;">
                    <div style="font-weight: 600; font-size: 0.95rem;">\${cmd.title}</div>
                    <div style="font-size: 0.8rem; color: var(--accent-color, #64748b); opacity: 0.8;">\${cmd.desc}</div>
                </div>
                \${idx === activeIndex ? '<i class="fas fa-arrow-right" style="font-size:0.8rem; opacity:0.5;"></i>' : ''}
            \`;

            item.onclick = () => executeCommand(cmd);
            resultsContainer.appendChild(item);
        });
    }

    function executeCommand(cmd) {
        if (typeof cmd.action === "string") {
            const currentPath = window.location.pathname;
            if (currentPath.includes("pages/")) {
                if (cmd.action === "homepage.html" || cmd.action === "index.html") {
                    window.location.href = "../" + cmd.action;
                } else {
                    window.location.href = cmd.action;
                }
            } else {
                if (cmd.action === "homepage.html" || cmd.action === "index.html") {
                    window.location.href = cmd.action;
                } else {
                    window.location.href = "pages/" + cmd.action;
                }
            }
        } else {
            cmd.action();
        }
    }

    // Keyboard Listeners
    window.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            togglePalette();
        }
        
        if (paletteBackdrop.style.display !== "none") {
            const items = resultsContainer.children;
            if (e.key === "Escape") closePalette();
            else if (e.key === "ArrowDown") {
                e.preventDefault();
                activeIndex = (activeIndex + 1) % items.length;
                items[activeIndex].dispatchEvent(new Event("mouseover"));
                items[activeIndex].scrollIntoView({block: "nearest"});
            }
            else if (e.key === "ArrowUp") {
                e.preventDefault();
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                items[activeIndex].dispatchEvent(new Event("mouseover"));
                items[activeIndex].scrollIntoView({block: "nearest"});
            }
            else if (e.key === "Enter" && items.length > 0) {
                e.preventDefault();
                items[activeIndex].click();
            }
        }
    });

    input.addEventListener("input", (e) => renderResults(e.target.value));
    paletteBackdrop.addEventListener("mousedown", (e) => {
        if(e.target === paletteBackdrop) closePalette();
    });
    
    // --- Dynamic Time-based Greeting & Daily Quote (if elements exist) ---
    const titleElem = document.getElementById("greeting-title");
    if(titleElem) {
        const hour = new Date().getHours();
        let greeting = "Good Evening";
        if (hour < 12) greeting = "Good Morning";
        else if (hour < 18) greeting = "Good Afternoon";
        titleElem.innerHTML = \`👋 \${greeting}!\`;
    }

    // List of Random Productivity Quotes
    const quotes = [
        { text: "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.", author: "Paul J. Meyer" },
        { text: "Focus entirely on the task at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
        { text: "It’s not always that we need to do more but rather that we need to focus on less.", author: "Nathan W. Morris" },
        { text: "Don’t mistake activity with achievement.", author: "John Wooden" },
        { text: "The key is in not spending time, but in investing it.", author: "Stephen R. Covey" },
        { text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.", author: "Stephen King" },
        { text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." }
    ];

    const quoteText = document.getElementById("daily-quote-text");
    const quoteAuthor = document.getElementById("daily-quote-author");
    if (quoteText && quoteAuthor) {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const dailyQuote = quotes[dayOfYear % quotes.length];
        quoteText.innerHTML = \`"\${dailyQuote.text}"\`;
        quoteAuthor.innerHTML = \`— \${dailyQuote.author.toUpperCase()}\`;
    }
});
