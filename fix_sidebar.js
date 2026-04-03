const fs = require('fs');
const path = require('path');

function findHtml(dir) {
    let results = [];
    fs.readdirSync(dir).forEach(file => {
        let full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) results = results.concat(findHtml(full));
        else if (full.endsWith('.html')) results.push(full);
    });
    return results;
}

const files = findHtml('d:/Personality/portfolio/First-Schedule');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Extract the exact theme button block
    const btnRegex = /<button id="dark-mode-toggle"[^>]*>[\s\S]*?<\/button>/;
    const btnMatch = content.match(btnRegex);
    
    if (btnMatch) {
        const themeBtn = btnMatch[0];
        
        // Remove the sidebar-bottom div section and any empty spaces before </aside>
        content = content.replace(/<div class="sidebar-bottom">[\s\S]*?<\/div>\s*<\/aside>/g, '</aside>');
        
        // Replace the nav open tag with the new injected theme button + divider
        const navOpenRegex = /<nav class="sidebar-nav">/;
        if (content.match(navOpenRegex)) {
            const replacement = `<nav class="sidebar-nav">\n            ${themeBtn}\n            <div class="sidebar-divider" style="margin: 8px 16px 16px; border-bottom: 1px solid var(--border-color); opacity: 0.5;"></div>`;
            content = content.replace(navOpenRegex, replacement);
            console.log("Updated: " + file);
        }
    }
    fs.writeFileSync(file, content);
});
