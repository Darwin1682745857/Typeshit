const fs = require("fs");
let css = fs.readFileSync("css/style.css", "utf8");

// Main Wrapper padding adjust for floating pill
css = css.replace(/\.main-wrapper \{\s*margin-left: 0;\s*padding-top: 70px;/, `.main-wrapper {\n    margin-left: 0;\n    padding-top: 110px;`);

// Find the sidebar block and replace completely
css = css.replace(/\.sidebar \{\s*position: fixed;\s*top: 0;\s*left: 0;\s*width: 100%;\s*height: 70px;\s*background: var\(--card-bg-color\);\s*border-bottom: 1px solid var\(--border-color\);\s*border-right: none;\s*display: flex;\s*flex-direction: row;\s*align-items: center;\s*padding: 0 24px;\s*z-index: 150;\s*transition: all var\(--transition-speed\);\s*box-shadow: 0 2px 15px rgba\(0, 0, 0, 0\.02\);\s*\}/, `.sidebar {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 1200px;
    height: 64px;
    background: var(--bg-surface, var(--card-bg-color));
    backdrop-filter: blur(12px);
    border-radius: 100px;
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    z-index: 150;
    transition: all var(--transition-speed);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(15, 23, 42, 0.02);
}`);

// Sidebar tab styling modifications to fit a pill
// Remove background hover from sidebar-nav entirely? No, let the tabs handle it
css = css.replace(/\.sidebar-nav \{\s*display: flex;\s*flex-direction: row;\s*gap: 8px;\s*flex: 1;\s*padding: 0;\s*\}/, `.sidebar-nav {
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 0;
    justify-content: center;
    flex: 1;
}`);

// Modify sidebar tab active indicator
css = css.replace(/\.sidebar-tab\.active::before \{[\s\S]*?width: 30px;[\s\S]*?border-radius: 4px;\s*\}/, `.sidebar-tab.active::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 4px;
}`);

fs.writeFileSync("css/style.css", css);

