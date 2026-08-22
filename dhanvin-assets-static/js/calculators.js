/* Dhanvin Assets - Financial Calculators Engines */

document.addEventListener("DOMContentLoaded", () => {
  initCalculatorsTabs();
  initSipCalculator();
  initEmiCalculator();
  initRetirementCalculator();
  initEducationCalculator();
  initGoalPlanner();
});

/* Helper: Currency Formatter (INR) */
function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
}

function formatShortINR(val) {
  if (val >= 10000000) {
    return `${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `${(val / 100000).toFixed(1)} Lakh`;
  }
  return formatINR(val);
}

/* Tab Swapping logic in calculators.html */
function initCalculatorsTabs() {
  const tabs = document.querySelectorAll(".calc-tab-btn");
  const sections = document.querySelectorAll(".calculator-section");

  if (tabs.length === 0) return;

  const switchTab = (tabId) => {
    tabs.forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("bg-[#4B2E83]", "text-white", "dark:bg-[#D4AF37]", "dark:text-[#1b0e36]", "scale-105", "shadow-md");
        btn.classList.remove("text-gray-500", "hover:text-[#4B2E83]");
      } else {
        btn.classList.remove("bg-[#4B2E83]", "text-white", "dark:bg-[#D4AF37]", "dark:text-[#1b0e36]", "scale-105", "shadow-md");
        btn.classList.add("text-gray-500", "hover:text-[#4B2E83]");
      }
    });

    sections.forEach(sec => {
      if (sec.id === `${tabId}-calc-section`) {
        sec.classList.remove("hidden");
      } else {
        sec.classList.add("hidden");
      }
    });
  };

  // Initial tab loading from hash or default
  const hash = window.location.hash.replace("#", "");
  const defaultTab = ["sip", "emi", "retirement", "education", "goal"].includes(hash) ? hash : "sip";
  switchTab(defaultTab);

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
      window.location.hash = tabId;
    });
  });
}

/* 1. SIP Calculator */
function initSipCalculator() {
  const invInput = document.getElementById("sip-investment");
  const rateInput = document.getElementById("sip-rate");
  const yearsInput = document.getElementById("sip-years");

  if (!invInput) return;

  const calculate = () => {
    const P = Number(invInput.value);
    const returnRate = Number(rateInput.value);
    const years = Number(yearsInput.value);

    // Update labels
    document.getElementById("label-sip-investment").textContent = formatINR(P);
    document.getElementById("label-sip-rate").textContent = `${returnRate}%`;
    document.getElementById("label-sip-years").textContent = `${years} Years`;

    const i = returnRate / 12 / 100;
    const n = years * 12;

    // SIP Compound Formula: M = P * [ ((1+i)^n - 1) / i ] * (1+i)
    const totalWealth = Math.round(P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i)));
    const totalInvested = P * n;
    const estReturns = Math.max(0, totalWealth - totalInvested);

    // Update display fields
    document.getElementById("sip-res-invested").textContent = formatINR(totalInvested);
    document.getElementById("sip-res-returns").textContent = formatINR(estReturns);
    document.getElementById("sip-res-total").textContent = formatINR(totalWealth);

    // Update charts
    drawDonut("sip-donut", totalInvested, estReturns, "Returns");
    drawSipLineChart("sip-chart-svg", P, i, years, totalWealth);
  };

  invInput.addEventListener("input", calculate);
  rateInput.addEventListener("input", calculate);
  yearsInput.addEventListener("input", calculate);

  calculate(); // Run once initially
}

/* 2. EMI Calculator */
function initEmiCalculator() {
  const amtInput = document.getElementById("emi-amount");
  const rateInput = document.getElementById("emi-rate");
  const yearsInput = document.getElementById("emi-years");

  if (!amtInput) return;

  const calculate = () => {
    const P = Number(amtInput.value);
    const returnRate = Number(rateInput.value);
    const years = Number(yearsInput.value);

    // Update labels
    document.getElementById("label-emi-amount").textContent = formatINR(P);
    document.getElementById("label-emi-rate").textContent = `${returnRate}%`;
    document.getElementById("label-emi-years").textContent = `${years} Years`;

    const r = returnRate / 12 / 100;
    const n = years * 12;

    if (P <= 0 || r <= 0 || n <= 0) return;

    // EMI Formula: EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalPayable = emi * n;
    const totalInterest = Math.max(0, totalPayable - P);

    // Update display fields
    document.getElementById("emi-res-pay").textContent = `${formatINR(emi)} / month`;
    document.getElementById("emi-res-principal").textContent = formatShortINR(P);
    document.getElementById("emi-res-interest").textContent = formatShortINR(totalInterest);
    document.getElementById("emi-res-total").textContent = formatShortINR(totalPayable);

    // Update donut chart
    drawDonut("emi-donut", P, totalInterest, "Interest");
  };

  amtInput.addEventListener("input", calculate);
  rateInput.addEventListener("input", calculate);
  yearsInput.addEventListener("input", calculate);

  calculate();
}

/* 3. Retirement Calculator */
function initRetirementCalculator() {
  const expInput = document.getElementById("ret-expenses");
  const curAgeInput = document.getElementById("ret-cur-age");
  const retAgeInput = document.getElementById("ret-age");
  const lifeInput = document.getElementById("ret-life");
  const infInput = document.getElementById("ret-inflation");

  if (!expInput) return;

  const calculate = () => {
    const curExp = Number(expInput.value);
    const curAge = Number(curAgeInput.value);
    const retireAge = Number(retAgeInput.value);
    const life = Number(lifeInput.value);
    const inflationRate = Number(infInput.value);

    // Make sure retirement age is greater than current age
    if (retireAge <= curAge) {
      retAgeInput.value = curAge + 1;
      return calculate();
    }

    // Update labels
    document.getElementById("label-ret-expenses").textContent = formatINR(curExp);
    document.getElementById("label-ret-cur-age").textContent = `${curAge} Yrs`;
    document.getElementById("label-ret-age").textContent = `${retireAge} Yrs`;
    document.getElementById("label-ret-life").textContent = `${life} Yrs`;
    document.getElementById("label-ret-inflation").textContent = `${inflationRate}%`;

    const yearsToRetire = retireAge - curAge;
    const retirementDuration = life - retireAge;
    const inf = inflationRate / 100;

    // Future expenses at retirement
    const futureExpenses = Math.round(curExp * Math.pow(1 + inf, yearsToRetire));
    const futureAnnualExpenses = futureExpenses * 12;

    // Real returns post retirement (assuming 8% return and 7% inflation)
    const postReturn = 8 / 100;
    const realPostReturn = (1 + postReturn) / (1 + inf) - 1;

    let targetCorpus = 0;
    if (Math.abs(realPostReturn) < 0.0001) {
      targetCorpus = futureAnnualExpenses * retirementDuration;
    } else {
      targetCorpus = Math.round(
        futureAnnualExpenses * ((1 - Math.pow(1 + realPostReturn, -retirementDuration)) / realPostReturn)
      );
    }

    // Required monthly SIP (assuming 12% pre retirement yields)
    const rPre = 12 / 12 / 100;
    const nPre = yearsToRetire * 12;
    let requiredSip = 0;
    if (nPre > 0) {
      const denominator = ((Math.pow(1 + rPre, nPre) - 1) / rPre) * (1 + rPre);
      requiredSip = Math.round(targetCorpus / denominator);
    }

    // Update display fields
    document.getElementById("ret-res-corpus").textContent = formatShortINR(targetCorpus);
    document.getElementById("ret-res-future-exp").textContent = `${formatINR(futureExpenses)} / mo`;
    document.getElementById("ret-res-sip").textContent = `${formatINR(requiredSip)} / month`;
  };

  [expInput, curAgeInput, retAgeInput, lifeInput, infInput].forEach(el => {
    el.addEventListener("input", calculate);
  });

  calculate();
}

/* 4. Child Education Calculator */
function initEducationCalculator() {
  const costInput = document.getElementById("edu-cost");
  const childAgeInput = document.getElementById("edu-child-age");
  const collegeAgeInput = document.getElementById("edu-college-age");
  const infInput = document.getElementById("edu-inflation");

  if (!costInput) return;

  const calculate = () => {
    const curCost = Number(costInput.value);
    const childAge = Number(childAgeInput.value);
    const collegeAge = Number(collegeAgeInput.value);
    const infRate = Number(infInput.value);

    if (collegeAge <= childAge) {
      collegeAgeInput.value = childAge + 1;
      return calculate();
    }

    // Update labels
    document.getElementById("label-edu-cost").textContent = formatINR(curCost);
    document.getElementById("label-edu-child-age").textContent = `${childAge} Yrs`;
    document.getElementById("label-edu-college-age").textContent = `${collegeAge} Yrs`;
    document.getElementById("label-edu-inflation").textContent = `${infRate}%`;

    const yearsToGoal = collegeAge - childAge;
    const inf = infRate / 100;

    const futureCost = Math.round(curCost * Math.pow(1 + inf, yearsToGoal));

    // Required monthly SIP (assuming 12% returns)
    const r = 12 / 12 / 100;
    const n = yearsToGoal * 12;
    let requiredSip = 0;
    if (n > 0) {
      const denominator = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      requiredSip = Math.round(futureCost / denominator);
    }

    // Update displays
    document.getElementById("edu-res-cost").textContent = formatINR(futureCost);
    document.getElementById("edu-res-sip").textContent = `${formatINR(requiredSip)} / month`;
  };

  [costInput, childAgeInput, collegeAgeInput, infInput].forEach(el => {
    el.addEventListener("input", calculate);
  });

  calculate();
}

/* 5. Goal Planner */
function initGoalPlanner() {
  const goalAmtInput = document.getElementById("goal-amount");
  const goalYearsInput = document.getElementById("goal-years");
  const goalRateInput = document.getElementById("goal-rate");
  const goalButtons = document.querySelectorAll(".goal-select-btn");

  if (!goalAmtInput) return;

  const goalConfigs = {
    house: { min: 1000000, max: 50000000, defAmt: 8000000, maxYrs: 30, defYrs: 12, defRate: 12, label: "Dream Home" },
    car: { min: 300000, max: 10000000, defAmt: 1500000, maxYrs: 10, defYrs: 5, defRate: 12, label: "Premium Car" },
    retirement: { min: 5000000, max: 100000000, defAmt: 30000000, maxYrs: 40, defYrs: 25, defRate: 12, label: "Retirement Fund" },
    emergency: { min: 100000, max: 3000000, defAmt: 600000, maxYrs: 5, defYrs: 3, defRate: 8, label: "Emergency Vault" },
    vacation: { min: 100000, max: 5000000, defAmt: 800000, maxYrs: 7, defYrs: 3, defRate: 10, label: "World Tour" },
    education: { min: 500000, max: 20000000, defAmt: 4000000, maxYrs: 25, defYrs: 15, defRate: 12, label: "Child Education" },
    business: { min: 500000, max: 30000000, defAmt: 5000000, maxYrs: 15, defYrs: 7, defRate: 13, label: "Business Capital" },
  };

  let activeGoal = "house";

  const calculate = () => {
    const target = Number(goalAmtInput.value);
    const years = Number(goalYearsInput.value);
    const rate = Number(goalRateInput.value);

    // Update labels
    document.getElementById("label-goal-amount").textContent = formatShortINR(target);
    document.getElementById("label-goal-years").textContent = `${years} Years`;
    document.getElementById("label-goal-rate").textContent = `${rate}%`;

    const r = rate / 100 / 12;
    const n = years * 12;

    let requiredSip = 0;
    if (r > 0 && n > 0) {
      const denominator = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      requiredSip = Math.round(target / denominator);
    }

    // Update displays
    document.getElementById("goal-res-title").textContent = goalConfigs[activeGoal].label;
    document.getElementById("goal-res-sip").textContent = `${formatINR(requiredSip)} / month`;
    document.getElementById("goal-res-target").textContent = formatINR(target);
    document.getElementById("goal-res-years").textContent = `${years} Years`;
  };

  const selectGoal = (goalKey) => {
    activeGoal = goalKey;
    const config = goalConfigs[goalKey];

    // Reset range boundaries dynamically
    goalAmtInput.min = config.min;
    goalAmtInput.max = config.max;
    goalAmtInput.value = config.defAmt;
    goalAmtInput.step = (config.max - config.min) / 100;

    goalYearsInput.max = config.maxYrs;
    goalYearsInput.value = config.defYrs;

    goalRateInput.value = config.defRate;

    // Toggle button styles
    goalButtons.forEach(btn => {
      if (btn.getAttribute("data-goal") === goalKey) {
        btn.classList.add("bg-[#4B2E83]", "text-white", "dark:bg-[#D4AF37]", "dark:text-[#1b0e36]", "scale-105", "shadow-md");
        btn.classList.remove("bg-white/40", "dark:bg-[#1b0e36]/20", "text-gray-600");
      } else {
        btn.classList.remove("bg-[#4B2E83]", "text-white", "dark:bg-[#D4AF37]", "dark:text-[#1b0e36]", "scale-105", "shadow-md");
        btn.classList.add("bg-white/40", "dark:bg-[#1b0e36]/20", "text-gray-600");
      }
    });

    calculate();
  };

  goalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectGoal(btn.getAttribute("data-goal"));
    });
  });

  [goalAmtInput, goalYearsInput, goalRateInput].forEach(el => {
    el.addEventListener("input", calculate);
  });

  // Init
  selectGoal("house");
}

/* Helper: Draw SVG Donut Chart */
function drawDonut(svgId, investedVal, returnsVal, returnsLabel) {
  const svg = document.getElementById(svgId);
  if (!svg) return;

  const total = investedVal + returnsVal;
  const returnsPercent = Math.round((returnsVal / total) * 100) || 0;
  const investedPercent = 100 - returnsPercent;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const investedDash = (investedPercent / 100) * circumference;
  const returnsDash = (returnsPercent / 100) * circumference;

  // Clear previous markup inside SVG
  svg.innerHTML = `
    <circle cx="60" cy="60" r="${radius}" fill="transparent" stroke="currentColor" stroke-width="10" class="text-purple-50 dark:text-gray-800" />
    <circle cx="60" cy="60" r="${radius}" fill="transparent" stroke="#4b2e83" stroke-width="10" stroke-dasharray="${investedDash} ${circumference}" class="dark:stroke-[#D4AF37]" />
    <circle cx="60" cy="60" r="${radius}" fill="transparent" stroke="#2448d8" stroke-width="10" stroke-dasharray="${returnsDash} ${circumference}" stroke-dashoffset="-${investedDash}" />
    <text x="60" y="58" text-anchor="middle" class="font-manrope font-bold text-sm fill-black dark:fill-white" dominant-baseline="central">${returnsPercent}%</text>
    <text x="60" y="74" text-anchor="middle" class="font-poppins text-[8px] font-bold fill-[#2448d8] dark:fill-[#D4AF37]" dominant-baseline="central">${returnsLabel}</text>
  `;
}

/* Helper: Draw SVG Line Chart */
function drawSipLineChart(svgId, monthlyInvest, monthlyRate, totalYears, maxVal) {
  const svg = document.getElementById(svgId);
  if (!svg) return;

  const svgWidth = 500;
  const svgHeight = 220;
  const padding = 40;
  const width = svgWidth - padding * 2;
  const height = svgHeight - padding * 2;

  // Generate coordinate points (sample 10 points)
  const points = [];
  for (let y = 1; y <= totalYears; y++) {
    const m = y * 12;
    const invested = monthlyInvest * m;
    const wealth = Math.round(monthlyInvest * (((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate)));
    points.push({ year: y, invested, wealth });
  }

  const getX = (index) => padding + (index / (points.length - 1)) * width;
  const getY = (val) => padding + height - (val / maxVal) * height;

  if (points.length === 0) return;

  let investedPath = `M ${getX(0)} ${getY(points[0].invested)}`;
  let totalPath = `M ${getX(0)} ${getY(points[0].wealth)}`;

  for (let i = 1; i < points.length; i++) {
    investedPath += ` L ${getX(i)} ${getY(points[i].invested)}`;
    totalPath += ` L ${getX(i)} ${getY(points[i].wealth)}`;
  }

  const investedArea = `${investedPath} L ${getX(points.length - 1)} ${padding + height} L ${getX(0)} ${padding + height} Z`;
  const totalArea = `${totalPath} L ${getX(points.length - 1)} ${padding + height} L ${getX(0)} ${padding + height} Z`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4b2e83" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#4b2e83" stop-opacity="0.0" />
      </linearGradient>
      <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2448d8" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#d4af37" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    <!-- Grid Lines -->
    <line x1="${padding}" y1="${padding}" x2="${svgWidth - padding}" y2="${padding}" stroke="currentColor" class="text-gray-100 dark:text-gray-800" stroke-dasharray="4 4" />
    <line x1="${padding}" y1="${padding + height / 2}" x2="${svgWidth - padding}" y2="${padding + height / 2}" stroke="currentColor" class="text-gray-100 dark:text-gray-800" stroke-dasharray="4 4" />
    <line x1="${padding}" y1="${padding + height}" x2="${svgWidth - padding}" y2="${padding + height}" stroke="currentColor" class="text-gray-100 dark:text-gray-800" />
    
    <!-- Closed Area Gradients -->
    <path d="${totalArea}" fill="url(#totalGrad)" />
    <path d="${investedArea}" fill="url(#investedGrad)" />

    <!-- Trajectory Lines -->
    <path d="${totalPath}" fill="none" stroke="#2448d8" stroke-width="3" stroke-linecap="round" />
    <path d="${investedPath}" fill="none" stroke="#4b2e83" stroke-width="2" class="dark:stroke-[#D4AF37]" stroke-linecap="round" />

    <!-- Labels -->
    <text x="${getX(0)}" y="${svgHeight - 12}" text-anchor="middle" class="text-[9px] font-manrope font-semibold fill-gray-400">Yr 1</text>
    <text x="${getX(Math.floor(points.length / 2))}" y="${svgHeight - 12}" text-anchor="middle" class="text-[9px] font-manrope font-semibold fill-gray-400">Yr ${Math.floor(totalYears / 2)}</text>
    <text x="${getX(points.length - 1)}" y="${svgHeight - 12}" text-anchor="middle" class="text-[9px] font-manrope font-semibold fill-gray-400">Yr ${totalYears}</text>
  `;
}
