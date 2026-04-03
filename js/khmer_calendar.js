/**
 * Khmer Calendar - ប្រតិទិនខ្មែរ
 * Lunisolar calendar calculations for Cambodia
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== KHMER DATA ====================
    
    // Khmer numerals
    const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    
    // Khmer month names
    const khmerMonths = [
        { km: 'មិគសិរ', en: 'Mik Ser', approx: 'Nov-Dec' },
        { km: 'បុស្ស', en: 'Bos', approx: 'Dec-Jan' },
        { km: 'មាឃ', en: 'Meak', approx: 'Jan-Feb' },
        { km: 'ផល្គុន', en: 'Phalkun', approx: 'Feb-Mar' },
        { km: 'ចេត្រ', en: 'Chetr', approx: 'Mar-Apr' },
        { km: 'វិសាខ', en: 'Visak', approx: 'Apr-May' },
        { km: 'ជេស្ឋ', en: 'Chesth', approx: 'May-Jun' },
        { km: 'អាសាឍ', en: 'Asath', approx: 'Jun-Jul' },
        { km: 'ស្រាពណ៍', en: 'Srap', approx: 'Jul-Aug' },
        { km: 'ភទ្របទ', en: 'Phutrobot', approx: 'Aug-Sep' },
        { km: 'អស្សុជ', en: 'Assoch', approx: 'Sep-Oct' },
        { km: 'កត្តិក', en: 'Kadeuk', approx: 'Oct-Nov' }
    ];

    // Khmer weekday names
    const khmerWeekdays = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
    const khmerWeekdaysShort = ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'];

    // Khmer animal zodiac (12-year cycle)
    const khmerZodiac = [
        { km: 'ជូត', en: 'Rat', emoji: '🐀' },
        { km: 'ឆ្លូវ', en: 'Ox', emoji: '🐂' },
        { km: 'ខាល', en: 'Tiger', emoji: '🐅' },
        { km: 'ថោះ', en: 'Rabbit', emoji: '🐇' },
        { km: 'រោង', en: 'Dragon', emoji: '🐉' },
        { km: 'ម្សាញ់', en: 'Snake', emoji: '🐍' },
        { km: 'មមី', en: 'Horse', emoji: '🐴' },
        { km: 'មមែ', en: 'Goat', emoji: '🐐' },
        { km: 'វក', en: 'Monkey', emoji: '🐵' },
        { km: 'រកា', en: 'Rooster', emoji: '🐓' },
        { km: 'ច', en: 'Dog', emoji: '🐕' },
        { km: 'កុរ', en: 'Pig', emoji: '🐖' }
    ];

    // Khmer era cycle (10-year cycle)
    const khmerEra = ['ឯកស័ក', 'ទោស័ក', 'ត្រីស័ក', 'ចត្វាស័ក', 'បញ្ចស័ក', 'ឆស័ក', 'សប្តស័ក', 'អដ្ឋស័ក', 'នព្វស័ក', 'សំរឹទ្ធិស័ក'];

    // Cambodian public holidays 2026
    const holidays2026 = [
        { date: '2026-01-01', km: 'ទិវាចូលឆ្នាំសកល', en: 'International New Year' },
        { date: '2026-01-07', km: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍', en: 'Victory Day' },
        { date: '2026-02-13', km: 'ពិធីបុណ្យមាឃបូជា', en: 'Meak Bochea Day' },
        { date: '2026-03-08', km: 'ទិវានារីអន្តរជាតិ', en: 'International Women\'s Day' },
        { date: '2026-04-13', km: 'ចូលឆ្នាំខ្មែរ', en: 'Khmer New Year' },
        { date: '2026-04-14', km: 'ចូលឆ្នាំខ្មែរ', en: 'Khmer New Year' },
        { date: '2026-04-15', km: 'ចូលឆ្នាំខ្មែរ', en: 'Khmer New Year' },
        { date: '2026-04-16', km: 'ចូលឆ្នាំខ្មែរ (ថែម)', en: 'Khmer New Year (Extra)' },
        { date: '2026-05-01', km: 'ទិវាពលកម្មអន្តរជាតិ', en: 'Labor Day' },
        { date: '2026-05-04', km: 'ពិធីបុណ្យវិសាខបូជា', en: 'Visak Bochea Day' },
        { date: '2026-05-14', km: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', en: 'Royal Ploughing Ceremony' },
        { date: '2026-05-18', km: 'ទិវាជាតិនៃការចងចាំ', en: 'National Day of Remembrance' },
        { date: '2026-06-01', km: 'ទិវាកុមារអន្តរជាតិ', en: 'International Children\'s Day' },
        { date: '2026-06-18', km: 'ព្រះរាជពិធីថ្វាយព្រះភ្លើង', en: 'Queen Mother Birthday' },
        { date: '2026-09-24', km: 'ទិវារដ្ឋធម្មនុញ្ញ', en: 'Constitution Day' },
        { date: '2026-10-15', km: 'ទិវាប្រារព្ធពិធីបុណ្យភ្ជុំបិណ្ឌ', en: 'Pchum Ben Day' },
        { date: '2026-10-29', km: 'ព្រះរាជពិធីគ្រងរាជ្យ​', en: 'Coronation Day' },
        { date: '2026-10-31', km: 'ព្រះរាជពិធីថ្វាយព្រះភ្លើង​ ព្រះមហាក្សត្រ', en: 'King Father Birthday' },
        { date: '2026-11-09', km: 'ទិវាឯករាជ្យជាតិ', en: 'Independence Day' },
        { date: '2026-11-10', km: 'ពិធីបុណ្យអកអំបុក​ (បុណ្យអំបុក)', en: 'Water Festival (Bon Om Touk)' },
        { date: '2026-11-11', km: 'ពិធីបុណ្យអកអំបុក​', en: 'Water Festival' },
        { date: '2026-11-12', km: 'ពិធីបុណ្យអកអំបុក​', en: 'Water Festival' },
        { date: '2026-12-10', km: 'ទិវាសិទ្ធិមនុស្សអន្តរជាតិ', en: 'Human Rights Day' }
    ];

    // ==================== UTILITY FUNCTIONS ====================

    // Convert number to Khmer numerals
    function toKhmerNumeral(num) {
        return String(num).split('').map(d => khmerNumerals[parseInt(d)]).join('');
    }

    // Get Buddhist Era year
    function getBuddhistYear(gregorianYear) {
        return gregorianYear + 543;
    }

    // Get Khmer zodiac animal for a year
    function getKhmerZodiac(year) {
        // Khmer New Year is in April, so before April use previous year
        const adjustedYear = year;
        const index = (adjustedYear - 4) % 12;
        return khmerZodiac[index >= 0 ? index : index + 12];
    }

    // Get Khmer era (Sak) for a year
    function getKhmerEra(year) {
        const index = (year - 1) % 10;
        return khmerEra[index >= 0 ? index : index + 10];
    }

    // Approximate Khmer month from Gregorian date
    function getApproxKhmerMonth(date) {
        const month = date.getMonth();
        const day = date.getDate();
        
        // Approximate mapping (Khmer months are lunar, this is simplified)
        const mapping = [
            { gMonth: 0, khMonth: 2 },   // Jan -> Meak
            { gMonth: 1, khMonth: 3 },   // Feb -> Phalkun
            { gMonth: 2, khMonth: 4 },   // Mar -> Chetr
            { gMonth: 3, khMonth: 5 },   // Apr -> Visak
            { gMonth: 4, khMonth: 6 },   // May -> Chesth
            { gMonth: 5, khMonth: 7 },   // Jun -> Asath
            { gMonth: 6, khMonth: 8 },   // Jul -> Srap
            { gMonth: 7, khMonth: 9 },   // Aug -> Phutrobot
            { gMonth: 8, khMonth: 10 },  // Sep -> Assoch
            { gMonth: 9, khMonth: 11 },  // Oct -> Kadeuk
            { gMonth: 10, khMonth: 0 },  // Nov -> Mik Ser
            { gMonth: 11, khMonth: 1 }   // Dec -> Bos
        ];
        
        // Adjust for days (if after 15th, might be next month)
        let khMonth = mapping[month].khMonth;
        if (day > 20) {
            khMonth = (khMonth + 1) % 12;
        }
        
        return khmerMonths[khMonth];
    }

    // Calculate moon phase (simplified)
    function getMoonPhase(date) {
        // Synodic month is ~29.53 days
        // Reference new moon: January 29, 2025
        const refNewMoon = new Date(2025, 0, 29);
        const daysSinceNew = Math.floor((date - refNewMoon) / (1000 * 60 * 60 * 24));
        const lunarAge = ((daysSinceNew % 29.53) + 29.53) % 29.53;
        
        if (lunarAge < 1.85) return { phase: 'new', km: 'ថ្មី', emoji: '🌑', day: 0 };
        if (lunarAge < 7.38) {
            const day = Math.ceil(lunarAge);
            return { phase: 'waxing', km: `កើត ${toKhmerNumeral(day)}`, emoji: '🌒', day };
        }
        if (lunarAge < 9.23) return { phase: 'first-quarter', km: 'កើត ៨', emoji: '🌓', day: 8 };
        if (lunarAge < 14.77) {
            const day = Math.ceil(lunarAge - 7);
            return { phase: 'waxing-gibbous', km: `កើត ${toKhmerNumeral(day + 7)}`, emoji: '🌔', day: day + 7 };
        }
        if (lunarAge < 16.62) return { phase: 'full', km: 'ពេញបូណ៌មី', emoji: '🌕', day: 15 };
        if (lunarAge < 22.15) {
            const day = Math.ceil(lunarAge - 14.77);
            return { phase: 'waning', km: `រោច ${toKhmerNumeral(day)}`, emoji: '🌖', day };
        }
        if (lunarAge < 24) return { phase: 'last-quarter', km: 'រោច ៨', emoji: '🌗', day: 8 };
        const day = Math.ceil(lunarAge - 22);
        return { phase: 'waning-crescent', km: `រោច ${toKhmerNumeral(day + 7)}`, emoji: '🌘', day: day + 7 };
    }

    // Get Khmer day in month (lunar day)
    function getKhmerLunarDay(date) {
        const moon = getMoonPhase(date);
        return moon;
    }

    // Format full Khmer date
    function formatKhmerDate(date) {
        const weekday = khmerWeekdays[date.getDay()];
        const moon = getMoonPhase(date);
        const khMonth = getApproxKhmerMonth(date);
        const zodiac = getKhmerZodiac(date.getFullYear());
        const era = getKhmerEra(date.getFullYear());
        
        return `ថ្ងៃ${weekday} ${moon.km} ខែ${khMonth.km} ឆ្នាំ${zodiac.km} ${era}`;
    }

    // ==================== DOM ELEMENTS ====================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const khmerDateFull = document.getElementById('khmer-date-full');
    const gregorianDateEl = document.getElementById('gregorian-date');
    const buddhistYearEl = document.getElementById('buddhist-year');
    const zodiacAnimalEl = document.getElementById('zodiac-animal');
    const moonPhaseEl = document.getElementById('moon-phase');
    const currentMonthDisplay = document.getElementById('current-month-display');
    const calendarGrid = document.getElementById('calendar-grid');
    const monthsGrid = document.getElementById('months-grid');
    const holidayList = document.getElementById('holiday-list');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    // ==================== STATE ====================
    let currentDisplayDate = new Date();
    let isDarkMode = localStorage.getItem('theme') === 'dark';

    // ==================== INITIALIZATION ====================
    function init() {
        applyTheme(isDarkMode ? 'dark' : 'light');
        updateTodayDisplay();
        renderCalendar();
        renderMonthsReference();
        renderHolidays();
        setupEventListeners();
    }

    // ==================== THEME ====================
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
        isDarkMode = theme === 'dark';
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
    
    function applyColorTheme(color) {
        document.documentElement.setAttribute('data-color', color);
        localStorage.setItem('colorTheme', color);
    }

    // Initialize color theme
    const savedColorTheme = localStorage.getItem('colorTheme') || 'default';
    applyColorTheme(savedColorTheme);

    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            applyTheme(e.newValue || 'light');
        }
        if (e.key === 'colorTheme') {
            applyColorTheme(e.newValue || 'default');
        }
    });

    // ==================== UPDATE TODAY DISPLAY ====================
    function updateTodayDisplay() {
        const today = new Date();
        
        // Full Khmer date
        khmerDateFull.textContent = formatKhmerDate(today);
        
        // Gregorian date
        gregorianDateEl.textContent = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Buddhist year
        const be = getBuddhistYear(today.getFullYear());
        buddhistYearEl.textContent = `ព.ស. ${toKhmerNumeral(be)}`;
        
        // Zodiac
        const zodiac = getKhmerZodiac(today.getFullYear());
        zodiacAnimalEl.textContent = `ឆ្នាំ${zodiac.km} (${zodiac.en}) ${zodiac.emoji}`;
        
        // Moon phase
        const moon = getMoonPhase(today);
        moonPhaseEl.textContent = `${moon.emoji} ${moon.km}`;
    }

    // ==================== RENDER CALENDAR ====================
    function renderCalendar() {
        const year = currentDisplayDate.getFullYear();
        const month = currentDisplayDate.getMonth();
        
        // Update header
        const khMonth = getApproxKhmerMonth(new Date(year, month, 15));
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthDisplay.textContent = `ខែ${khMonth.km} - ${monthNames[month]} ${year}`;
        
        // Clear grid
        calendarGrid.innerHTML = '';
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();
        
        // Previous month days
        const prevMonthLast = new Date(year, month, 0);
        const prevMonthDays = prevMonthLast.getDate();
        
        // Add previous month days
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const dayNum = prevMonthDays - i;
            const dayDate = new Date(year, month - 1, dayNum);
            const dayEl = createDayElement(dayDate, true);
            calendarGrid.appendChild(dayEl);
        }
        
        // Add current month days
        const today = new Date();
        for (let day = 1; day <= totalDays; day++) {
            const dayDate = new Date(year, month, day);
            const isToday = dayDate.toDateString() === today.toDateString();
            const dayEl = createDayElement(dayDate, false, isToday);
            calendarGrid.appendChild(dayEl);
        }
        
        // Add next month days to fill grid
        const totalCells = startDayOfWeek + totalDays;
        const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayDate = new Date(year, month + 1, day);
            const dayEl = createDayElement(dayDate, true);
            calendarGrid.appendChild(dayEl);
        }
    }

    function createDayElement(date, isOtherMonth, isToday = false) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        
        if (isOtherMonth) dayEl.classList.add('other-month');
        if (isToday) dayEl.classList.add('today');
        if (date.getDay() === 0) dayEl.classList.add('sunday');
        
        // Check if holiday
        const dateStr = date.toISOString().split('T')[0];
        const holiday = holidays2026.find(h => h.date === dateStr);
        if (holiday) {
            dayEl.classList.add('holiday');
            dayEl.title = `${holiday.km}\n${holiday.en}`;
        }
        
        // Gregorian day
        const gregDay = document.createElement('span');
        gregDay.className = 'gregorian-day';
        gregDay.textContent = date.getDate();
        dayEl.appendChild(gregDay);
        
        // Khmer lunar day
        const moon = getMoonPhase(date);
        const khmerDay = document.createElement('span');
        khmerDay.className = 'khmer-day';
        khmerDay.textContent = toKhmerNumeral(date.getDate());
        dayEl.appendChild(khmerDay);
        
        // Moon phase indicator (for special days)
        if (moon.phase === 'full' || moon.phase === 'new') {
            const moonIndicator = document.createElement('span');
            moonIndicator.className = 'moon-phase';
            moonIndicator.textContent = moon.emoji;
            dayEl.appendChild(moonIndicator);
        }
        
        return dayEl;
    }

    // ==================== RENDER MONTHS REFERENCE ====================
    function renderMonthsReference() {
        monthsGrid.innerHTML = '';
        
        const currentKhMonth = getApproxKhmerMonth(new Date());
        
        khmerMonths.forEach((month, index) => {
            const card = document.createElement('div');
            card.className = 'month-card';
            if (month.km === currentKhMonth.km) card.classList.add('current');
            
            card.innerHTML = `
                <div class="khmer-name">${month.km}</div>
                <div class="english-name">${month.en} (${month.approx})</div>
            `;
            
            monthsGrid.appendChild(card);
        });
    }

    // ==================== RENDER HOLIDAYS ====================
    function renderHolidays() {
        holidayList.innerHTML = '';
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Filter upcoming holidays
        const upcoming = holidays2026
            .filter(h => new Date(h.date) >= today)
            .slice(0, 5); // Show next 5 holidays
        
        upcoming.forEach(holiday => {
            const date = new Date(holiday.date);
            const item = document.createElement('div');
            item.className = 'holiday-item';
            
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            item.innerHTML = `
                <div class="holiday-date">
                    <div class="day">${date.getDate()}</div>
                    <div class="month">${monthNames[date.getMonth()]}</div>
                </div>
                <div class="holiday-info">
                    <div class="holiday-name">${holiday.km}</div>
                    <div class="holiday-name-en">${holiday.en}</div>
                </div>
            `;
            
            holidayList.appendChild(item);
        });
        
        if (upcoming.length === 0) {
            holidayList.innerHTML = '<p style="text-align: center; color: var(--accent-color);">No upcoming holidays this year</p>';
        }
    }

    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        // Dark mode toggle
        darkModeToggle.addEventListener('click', () => {
            applyTheme(isDarkMode ? 'light' : 'dark');
        });
        
        // Month navigation
        prevMonthBtn.addEventListener('click', () => {
            currentDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // ==================== START ====================
    init();
});
