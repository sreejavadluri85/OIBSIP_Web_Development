
/* =========================================
   THERMO - Temperature Converter
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // HTML elements
    const temperatureInput = document.getElementById("temperatureInput");
    const temperatureUnit = document.getElementById("temperatureUnit");
    const errorMessage = document.getElementById("errorMessage");

    const convertBtn = document.getElementById("convertBtn");
    const resetBtn = document.getElementById("resetBtn");

    const celsiusResult = document.getElementById("celsiusResult");
    const fahrenheitResult = document.getElementById("fahrenheitResult");
    const kelvinResult = document.getElementById("kelvinResult");

    const copyAllBtn = document.getElementById("copyAllBtn");

    const historyList = document.getElementById("historyList");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    const scaleValue = document.getElementById("scaleValue");
    const scaleMarker = document.getElementById("scaleMarker");

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    // Storage keys
    const HISTORY_KEY = "thermoHistory";
    const THEME_KEY = "thermoTheme";

    // Current conversion results
    let currentResults = null;

    // Toast notification
    function showToast(message) {
        let toast = document.getElementById("thermoToast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "thermoToast";

            Object.assign(toast.style, {
                position: "fixed",
                bottom: "25px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#a78bfa",
                color: "#0b1220",
                padding: "12px 22px",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "14px",
                zIndex: "9999",
                opacity: "0",
                transition: "opacity 0.25s ease",
                pointerEvents: "none"
            });

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = "1";

        clearTimeout(toast.hideTimer);

        toast.hideTimer = setTimeout(() => {
            toast.style.opacity = "0";
        }, 2200);
    }

    // Format values
    function formatValue(value) {
        return Number(value.toFixed(2)).toString();
    }

    // Convert input temperature to Celsius
    function toCelsius(value, unit) {
        if (unit === "celsius") {
            return value;
        }

        if (unit === "fahrenheit") {
            return (value - 32) * 5 / 9;
        }

        if (unit === "kelvin") {
            return value - 273.15;
        }

        return value;
    }

    // Convert Celsius to all units
    function convertFromCelsius(celsius) {
        return {
            celsius: celsius,
            fahrenheit: (celsius * 9 / 5) + 32,
            kelvin: celsius + 273.15
        };
    }

    // Get unit symbol
    function getUnitSymbol(unit) {
        const symbols = {
            celsius: "°C",
            fahrenheit: "°F",
            kelvin: "K"
        };

        return symbols[unit] || "°C";
    }

    // Get temperature description
    function getTemperatureDescription(celsius) {
        if (celsius < 0) {
            return "Freezing conditions";
        }

        if (celsius < 15) {
            return "Cold temperature";
        }

        if (celsius < 25) {
            return "Cool and comfortable";
        }

        if (celsius < 35) {
            return "Warm temperature";
        }

        if (celsius < 100) {
            return "Hot temperature";
        }

        return "Boiling point or above";
    }

    // Validate temperature
    function validateTemperature(value, unit) {
        if (value === "" || !Number.isFinite(Number(value))) {
            return "Please enter a valid temperature.";
        }

        const celsius = toCelsius(Number(value), unit);

        if (celsius < -273.15) {
            return "Temperature cannot be below absolute zero.";
        }

        return "";
    }

    // Update result cards
    function updateResults(results) {
        celsiusResult.textContent = `${formatValue(results.celsius)} °C`;
        fahrenheitResult.textContent = `${formatValue(results.fahrenheit)} °F`;
        kelvinResult.textContent = `${formatValue(results.kelvin)} K`;
    }

    // Update temperature guide
    function updateGuide(celsius) {
        const description = getTemperatureDescription(celsius);

        scaleValue.textContent =
            `${description} · ${formatValue(celsius)} °C`;

        // Position marker between -50°C and 150°C
        const percentage = Math.min(
            100,
            Math.max(0, ((celsius + 50) / 200) * 100)
        );

        scaleMarker.style.left = `${percentage}%`;
    }

    // Clear displayed results
    function clearResults() {
        celsiusResult.textContent = "--";
        fahrenheitResult.textContent = "--";
        kelvinResult.textContent = "--";

        scaleValue.textContent = "Waiting for input";
        scaleMarker.style.left = "0%";

        currentResults = null;
    }

    // Save conversion history
    function getHistory() {
        try {
            const history = JSON.parse(
                localStorage.getItem(HISTORY_KEY) || "[]"
            );

            return Array.isArray(history) ? history : [];
        } catch {
            return [];
        }
    }

    function saveHistory(item) {
        const history = getHistory();

        history.unshift(item);

        // Keep only the latest 10 conversions
        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(history.slice(0, 10))
        );

        renderHistory();
    }

    // Display history
    function renderHistory() {
        const history = getHistory();

        historyList.innerHTML = "";

        if (history.length === 0) {
            const empty = document.createElement("p");
            empty.className = "empty-history";
            empty.textContent =
                "Your conversion history will appear here.";

            historyList.appendChild(empty);
            return;
        }

        history.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "history-item";

            const details = document.createElement("div");
            details.className = "history-details";

            const inputText = document.createElement("strong");
            inputText.textContent =
                `${item.input} ${item.symbol} → ${formatValue(item.celsius)} °C`;

            const resultText = document.createElement("p");
            resultText.textContent =
                `${formatValue(item.fahrenheit)} °F  |  ${formatValue(item.kelvin)} K`;

            details.append(inputText, resultText);

            const useButton = document.createElement("button");
            useButton.type = "button";
            useButton.className = "history-use-btn";
            useButton.textContent = "Use again";

            useButton.addEventListener("click", () => {
                temperatureInput.value = item.input;
                temperatureUnit.value = item.unit;
                performConversion(false);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });

            row.append(details, useButton);
            historyList.appendChild(row);
        });
    }

    // Perform conversion
    function performConversion(save = true) {
        const inputValue = temperatureInput.value.trim();
        const selectedUnit = temperatureUnit.value;

        errorMessage.textContent = "";

        const validationError = validateTemperature(
            inputValue,
            selectedUnit
        );

        if (validationError) {
            errorMessage.textContent = validationError;
            clearResults();
            return;
        }

        const numericValue = Number(inputValue);
        const celsius = toCelsius(numericValue, selectedUnit);
        const results = convertFromCelsius(celsius);

        currentResults = results;

        updateResults(results);
        updateGuide(celsius);

        if (save) {
            saveHistory({
                input: numericValue,
                unit: selectedUnit,
                symbol: getUnitSymbol(selectedUnit),
                celsius: results.celsius,
                fahrenheit: results.fahrenheit,
                kelvin: results.kelvin,
                date: new Date().toISOString()
            });
        }
    }

    // Convert button
    convertBtn.addEventListener("click", () => {
        performConversion(true);
    });

    // Live conversion while typing
    temperatureInput.addEventListener("input", () => {
        if (temperatureInput.value.trim() === "") {
            errorMessage.textContent = "";
            clearResults();
            return;
        }

        performConversion(false);
    });

    temperatureUnit.addEventListener("change", () => {
        if (temperatureInput.value.trim() !== "") {
            performConversion(false);
        }
    });

    // Enter key conversion
    temperatureInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            performConversion(true);
        }
    });

    // Preset buttons
    document.querySelectorAll(".preset-btn").forEach(button => {
        button.addEventListener("click", () => {
            temperatureInput.value = button.dataset.value;

            // Preset values in this HTML are all Celsius.
            temperatureUnit.value = "celsius";

            performConversion(true);
        });
    });

    // Reset button
    resetBtn.addEventListener("click", () => {
        temperatureInput.value = "";
        temperatureUnit.value = "celsius";

        errorMessage.textContent = "";

        clearResults();
        showToast("Converter reset.");
    });

    // Copy individual result
    document.querySelectorAll(".copy-btn").forEach(button => {
        button.addEventListener("click", async () => {
            if (!currentResults) {
                showToast("Convert a temperature first.");
                return;
            }

            const key = button.dataset.copy;

            const values = {
                celsius: `${formatValue(currentResults.celsius)} °C`,
                fahrenheit: `${formatValue(currentResults.fahrenheit)} °F`,
                kelvin: `${formatValue(currentResults.kelvin)} K`
            };

            await copyText(values[key]);
        });
    });

    // Copy all results
    copyAllBtn.addEventListener("click", async () => {
        if (!currentResults) {
            showToast("Convert a temperature first.");
            return;
        }

        const text = [
            `Celsius: ${formatValue(currentResults.celsius)} °C`,
            `Fahrenheit: ${formatValue(currentResults.fahrenheit)} °F`,
            `Kelvin: ${formatValue(currentResults.kelvin)} K`
        ].join("\n");

        await copyText(text);
    });

    // Clipboard helper
    async function copyText(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";

                document.body.appendChild(textarea);
                textarea.select();

                const copied = document.execCommand("copy");
                textarea.remove();

                if (!copied) {
                    throw new Error("Copy failed");
                }
            }

            showToast("Copied successfully!");
        } catch {
            showToast("Unable to copy. Please try again.");
        }
    }

    // Clear history
    clearHistoryBtn.addEventListener("click", () => {
        localStorage.removeItem(HISTORY_KEY);
        renderHistory();
        showToast("Conversion history cleared.");
    });

    // Theme management
    function applyTheme(theme) {
        const isLight = theme === "light";

        document.body.classList.toggle("light-theme", isLight);

        themeIcon.textContent = isLight ? "☾" : "☀";

        localStorage.setItem(THEME_KEY, theme);
    }

    themeToggle.addEventListener("click", () => {
        const isLight =
            document.body.classList.contains("light-theme");

        applyTheme(isLight ? "dark" : "light");
    });

    // Initialize app
    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";

    applyTheme(savedTheme === "light" ? "light" : "dark");

    renderHistory();
    clearResults();

});
