
                // --- Search functionality for world clocks ---
                let clockSearchTerm = '';
                function filterClocks() {
                    const term = clockSearchTerm.trim().toLowerCase();
                    const items = document.querySelectorAll('.clock-item');
                    let anyVisible = false;
                    items.forEach(item => {
                        const city = item.querySelector('.clock-city').textContent.toLowerCase();
                        const country = item.querySelector('.clock-country').textContent.toLowerCase();
                        if (!term || city.includes(term) || country.includes(term)) {
                            item.style.display = '';
                            anyVisible = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    // Optionally, hide show-more button if search is active
                    document.getElementById('show-more-clocks').style.display = term ? 'none' : '';
                }
                document.addEventListener('DOMContentLoaded', function() {
                    const searchInput = document.getElementById('clock-search');
                    const searchBtn = document.getElementById('clock-search-btn');
                    searchInput.addEventListener('input', function(e) {
                        clockSearchTerm = e.target.value;
                        filterClocks();
                    });
                    searchBtn.addEventListener('click', function() {
                        clockSearchTerm = searchInput.value;
                        filterClocks();
                    });
                    searchInput.addEventListener('keypress', function(e) {
                        if (e.key === 'Enter') {
                            clockSearchTerm = searchInput.value;
                            filterClocks();
                        }
                    });
                });
        // Theme handling
        function toggleTheme() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const icon = document.querySelector('.theme-toggle i');
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        }

        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
        }

        // World Clock Data
        const worldClocks = [
            { city: 'Phnom Penh', country: 'Cambodia', timezone: 'Asia/Phnom_Penh', flag: '🇰🇭' },
            { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
            { city: 'Ho Chi Minh', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
            { city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
            { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
            { city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷' },
            { city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
            { city: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰' },
            { city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', flag: '🇦🇪' },
            { city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
            { city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
            { city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
            { city: 'London', country: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
            { city: 'Paris', country: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
            { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
            { city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
            { city: 'New York', country: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
            { city: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
            { city: 'Chicago', country: 'United States', timezone: 'America/Chicago', flag: '🇺🇸' },
            { city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
            { city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
            { city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
            { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
            { city: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿' }
        ];

        // International Holidays 2026
        const holidays = [
            { date: '2026-01-01', name: 'New Year\'s Day', type: 'International', flag: '🌍' },
            { date: '2026-01-26', name: 'Australia Day', type: 'Australia', flag: '🇦🇺' },
            { date: '2026-02-14', name: 'Valentine\'s Day', type: 'International', flag: '❤️' },
            { date: '2026-02-17', name: 'Chinese New Year', type: 'Asia', flag: '🧧' },
            { date: '2026-03-17', name: 'St. Patrick\'s Day', type: 'Ireland', flag: '🇮🇪' },
            { date: '2026-04-05', name: 'Easter Sunday', type: 'Christian', flag: '🐰' },
            { date: '2026-05-01', name: 'International Workers\' Day', type: 'International', flag: '👷' },
            { date: '2026-05-10', name: 'Mother\'s Day', type: 'International', flag: '💐' },
            { date: '2026-06-21', name: 'Father\'s Day', type: 'International', flag: '👔' },
            { date: '2026-07-04', name: 'Independence Day', type: 'United States', flag: '🇺🇸' },
            { date: '2026-07-14', name: 'Bastille Day', type: 'France', flag: '🇫🇷' },
            { date: '2026-10-31', name: 'Halloween', type: 'International', flag: '🎃' },
            { date: '2026-11-26', name: 'Thanksgiving', type: 'United States', flag: '🦃' },
            { date: '2026-12-25', name: 'Christmas Day', type: 'Christian', flag: '🎄' },
            { date: '2026-12-31', name: 'New Year\'s Eve', type: 'International', flag: '🎆' }
        ];

        // Render World Clocks
        let clocksExpanded = false;
        const initialClocksCount = 6;

        function renderClocks() {
            const container = document.getElementById('clocks-container');
            container.innerHTML = worldClocks.map((clock, index) => `
                <div class="clock-item${index >= initialClocksCount && !clocksExpanded ? ' hidden' : ''}" data-index="${index}">
                    <div class="clock-city">${clock.flag} ${clock.city}</div>
                    <div class="clock-country">${clock.country}</div>
                    <div class="clock-time" id="clock-${clock.timezone.replace(/\//g, '-')}">${getTimeForTimezone(clock.timezone)}</div>
                    <div class="clock-date">${getDateForTimezone(clock.timezone)}</div>
                    <div class="clock-offset">${getOffsetForTimezone(clock.timezone)}</div>
                </div>
            `).join('');
            updateShowMoreButton();
        }

        function toggleClocks() {
            clocksExpanded = !clocksExpanded;
            const items = document.querySelectorAll('.clock-item');
            items.forEach((item, index) => {
                if (index >= initialClocksCount) {
                    item.classList.toggle('hidden', !clocksExpanded);
                }
            });
            updateShowMoreButton();
        }

        function updateShowMoreButton() {
            const btn = document.getElementById('show-more-clocks');
            const hiddenCount = worldClocks.length - initialClocksCount;
            if (clocksExpanded) {
                btn.innerHTML = '<i class="fas fa-chevron-up"></i><span>Show less</span>';
            } else {
                btn.innerHTML = `<i class="fas fa-chevron-down"></i><span>Show more clocks (${hiddenCount} more)</span>`;
            }
        }

        function getTimeForTimezone(timezone) {
            return new Date().toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        }

        function getDateForTimezone(timezone) {
            return new Date().toLocaleDateString('en-US', {
                timeZone: timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }

        function getOffsetForTimezone(timezone) {
            const now = new Date();
            const utc = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
            const tz = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
            const diff = (tz - utc) / (1000 * 60 * 60);
            const sign = diff >= 0 ? '+' : '';
            return `UTC${sign}${diff}`;
        }

        function updateClocks() {
            worldClocks.forEach(clock => {
                const el = document.getElementById(`clock-${clock.timezone.replace(/\//g, '-')}`);
                if (el) {
                    el.textContent = getTimeForTimezone(clock.timezone);
                }
            });
        }

        // Calendar
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        function renderCalendar() {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

            document.getElementById('calendar-month-year').textContent = 
                `${monthNames[currentMonth]} ${currentYear}`;

            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

            const today = new Date();
            const container = document.getElementById('calendar-days');
            let html = '';

            // Previous month days
            for (let i = firstDay - 1; i >= 0; i--) {
                html += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
            }

            // Current month days
            for (let day = 1; day <= daysInMonth; day++) {
                const isToday = day === today.getDate() && 
                               currentMonth === today.getMonth() && 
                               currentYear === today.getFullYear();
                html += `<div class="calendar-day${isToday ? ' today' : ''}">${day}</div>`;
            }

            // Next month days
            const totalCells = firstDay + daysInMonth;
            const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
            for (let i = 1; i <= remainingCells; i++) {
                html += `<div class="calendar-day other-month">${i}</div>`;
            }

            container.innerHTML = html;
        }

        function prevMonth() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        }

        function nextMonth() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        }

        function goToToday() {
            const today = new Date();
            currentMonth = today.getMonth();
            currentYear = today.getFullYear();
            renderCalendar();
        }

        // Render Holidays
        function renderHolidays() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const upcomingHolidays = holidays
                .filter(h => new Date(h.date) >= today)
                .slice(0, 5);

            const container = document.getElementById('holidays-list');
            container.innerHTML = upcomingHolidays.map(holiday => {
                const date = new Date(holiday.date);
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return `
                    <div class="holiday-item">
                        <div class="holiday-flag">${holiday.flag}</div>
                        <div class="holiday-date">
                            <div class="holiday-day">${date.getDate()}</div>
                            <div class="holiday-month">${monthNames[date.getMonth()]}</div>
                        </div>
                        <div class="holiday-info">
                            <h4>${holiday.name}</h4>
                            <p>${holiday.type}</p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Time Zone Info
        function updateTimezoneInfo() {
            const now = new Date();
            
            // Timezone name
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            document.getElementById('local-timezone').textContent = timezone;

            // UTC Offset
            const offset = -now.getTimezoneOffset() / 60;
            const sign = offset >= 0 ? '+' : '';
            document.getElementById('utc-offset').textContent = `UTC${sign}${offset}`;

            // Week number
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const weekNo = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
            document.getElementById('week-number').textContent = `Week ${weekNo}`;

            // Day of year
            const dayOfYear = Math.floor((now - startOfYear) / 86400000) + 1;
            document.getElementById('day-of-year').textContent = `Day ${dayOfYear} of 365`;
        }

        // Initialize
        renderClocks();
        renderCalendar();
        renderHolidays();
        updateTimezoneInfo();

        // Update clocks every second
        setInterval(updateClocks, 1000);
    
