const fs = require("fs");
const files = [
    "index.html",
    "pages/dashboard.html",
    "pages/schedule.html",
    "pages/timer.html",
    "pages/todo.html",
    "pages/khmer_calendar.html",
    "pages/world_calendar.html"
];

for(const file of files) {
    if(!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, "utf8");
    
    // Remove the sidebar-toggle button
    content = content.replace(/<button id="sidebar-toggle"[\s\S]*?<\/button>/, "");
    
    // Remove the javascript for sidebar toggling
    content = content.replace(/const sidebarToggle = document\.getElementById\(\x27sidebar-toggle\x27\);[\s\S]*?sidebar\.classList\.add\(\x27sidebar-open\x27\);\s*\}/, "");
    
    fs.writeFileSync(file, content);
}
console.log("HTML cleanups done.");

