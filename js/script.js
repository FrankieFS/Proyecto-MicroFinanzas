// Estado
let state = {
  businessType: "panaderia",
  businessName: "Panadería El Trigal",
  theme: "light",
  transactions: [],
  employees: [],
  budgets: {
    "materia-prima": 500,
    servicios: 150,
    nomina: 800,
    otros: 200,
  },
  savingsGoals: [],
  cashRegister: {
    isOpen: false,
    openingBalance: 0,
    transactions: [],
    openDate: null,
    notes: "",
  },
};

// Estas categorías son datos proporcionados por una semilla de la IA
const businessCategories = {
  panaderia: {
    income: [
      "Venta de Pan",
      "Venta de Pasteles",
      "Pedidos Especiales",
      "Servicio Cafetería",
    ],
    expense: [
      "Compra de Harina",
      "Compra de Azúcar y Levadura",
      "Gas para Horno",
      "Mantenimiento Horno",
      "Moldes y Utensilios",
    ],
  },
  restaurante: {
    income: [
      "Almuerzos Diarios",
      "Platos a la Carta",
      "Bebidas y Postres",
      "Eventos / Catering",
    ],
    expense: [
      "Carnes y Mariscos",
      "Abarrotes y Verduras",
      "Material Desechable",
      "Alquiler Vajilla",
      "Gas de Cocina",
    ],
  },
  taller: {
    income: [
      "Servicio de Mano de Obra",
      "Venta de Repuestos",
      "Alineación y Balanceo",
      "Diagnóstico Computarizado",
    ],
    expense: [
      "Lubricantes y Filtros",
      "Repuestos Mecánicos",
      "Herramientas Nuevas",
      "Limpieza y Desengrasantes",
      "Epps y Guantes",
    ],
  },
  ropa: {
    income: [
      "Venta Ropa Casual",
      "Venta Calzado",
      "Venta de Accesorios",
      "Pedidos Especiales",
    ],
    expense: [
      "Lotes de Ropa",
      "Bolsas y Etiquetas",
      "Publicidad y Redes",
      "Alquiler Percheros",
      "Decoración Vitrina",
    ],
  },
  general: {
    income: ["Otros Ingresos"],
    expense: ["alquiler-local", "servicios-basicos", "nomina", "otros-gastos"],
  },
};

// Nombres de negocios para renderizar en el sitio
const categoryNames = {
  // Panaderia
  "Venta de Pan": "Venta de Pan",
  "Venta de Pasteles": "Venta de Pasteles",
  "Pedidos Especiales": "Pedidos Especiales",
  "Servicio Cafetería": "Servicio Cafetería",
  "Compra de Harina": "Compra de Harina (Materia Prima)",
  "Compra de Azúcar y Levadura": "Azúcar y Levadura (Materia Prima)",
  "Gas para Horno": "Gas para Horno (Servicios)",
  "Mantenimiento Horno": "Mantenimiento Horno (Otros)",
  "Moldes y Utensilios": "Moldes y Utensilios (Otros)",

  // Restaurante
  "Almuerzos Diarios": "Almuerzos Diarios",
  "Platos a la Carta": "Platos a la Carta",
  "Bebidas y Postres": "Bebidas y Postres",
  "Eventos / Catering": "Eventos / Catering",
  "Carnes y Mariscos": "Carnes y Mariscos (Materia Prima)",
  "Abarrotes y Verduras": "Abarrotes y Verduras (Materia Prima)",
  "Material Desechable": "Desechables (Otros)",
  "Alquiler Vajilla": "Alquiler de Vajilla (Otros)",
  "Gas de Cocina": "Gas de Cocina (Servicios)",

  // Taller
  "Servicio de Mano de Obra": "Servicio Mano de Obra",
  "Venta de Repuestos": "Venta de Repuestos",
  "Alineación y Balanceo": "Alineación y Balanceo",
  "Diagnóstico Computarizado": "Diagnóstico Computarizado",
  "Lubricantes y Filtros": "Lubricantes y Filtros (Materia Prima)",
  "Repuestos Mecánicos": "Repuestos Mecánicos (Materia Prima)",
  "Herramientas Nuevas": "Herramientas Nuevas (Otros)",
  "Limpieza y Desengrasantes": "Limpieza y Desengrasantes (Otros)",
  "Epps y Guantes": "Equipos de Protección (Otros)",

  // Ropa
  "Venta Ropa Casual": "Venta Ropa Casual",
  "Venta Calzado": "Venta Calzado",
  "Venta de Accesorios": "Venta de Accesorios",
  "Lotes de Ropa": "Lotes de Ropa (Materia Prima)",
  "Bolsas y Etiquetas": "Bolsas y Etiquetas (Otros)",
  "Publicidad y Redes": "Publicidad y Redes (Otros)",
  "Alquiler Percheros": "Alquiler Percheros (Otros)",
  "Decoración Vitrina": "Decoración Vitrina (Otros)",

  // General
  "Otros Ingresos": "Otros Ingresos",
  "alquiler-local": "Alquiler de Local",
  "servicios-basicos": "Servicios Básicos (Luz/Agua/Internet)",
  nomina: "Pago de Nómina (Empleados)",
  "otros-gastos": "Otros Gastos",
};

// grupos de subcategorías ('materia-prima', 'servicios', 'nomina', 'otros')
function getBudgetCategory(category) {
  const catLower = category.toLowerCase();
  if (
    catLower.includes("harina") ||
    catLower.includes("azúcar") ||
    catLower.includes("carne") ||
    catLower.includes("abarrote") ||
    catLower.includes("lubricante") ||
    catLower.includes("repuesto") ||
    catLower.includes("ropa") ||
    catLower.includes("materia")
  ) {
    return "materia-prima";
  } else if (
    catLower.includes("gas") ||
    catLower.includes("servicio") ||
    catLower.includes("luz") ||
    catLower.includes("agua") ||
    catLower.includes("internet") ||
    catLower === "servicios-basicos"
  ) {
    return "servicios";
  } else if (
    catLower === "nomina" ||
    catLower.includes("nómina") ||
    catLower.includes("empleado") ||
    catLower.includes("pago")
  ) {
    return "nomina";
  } else {
    return "otros";
  }
}

// 2. Datos de la semilla
const seedTransactions = [
  {
    id: "tx-1",
    date: "2026-06-01",
    type: "income",
    category: "Venta de Pan",
    description: "Venta matutina pan de agua",
    qty: 250,
    price: 0.15,
    total: 37.5,
  },
  {
    id: "tx-2",
    date: "2026-06-02",
    type: "income",
    category: "Venta de Pasteles",
    description: "Pastel de tres leches especial",
    qty: 2,
    price: 25.0,
    total: 50.0,
  },
  {
    id: "tx-3",
    date: "2026-06-02",
    type: "expense",
    category: "Compra de Harina",
    description: "Saco de harina trigo 50kg",
    qty: 3,
    price: 42.0,
    total: 126.0,
  },
  {
    id: "tx-4",
    date: "2026-06-03",
    type: "expense",
    category: "Compra de Azúcar y Levadura",
    description: "Azúcar quintal y levadura seca",
    qty: 1,
    price: 65.0,
    total: 65.0,
  },
  {
    id: "tx-5",
    date: "2026-06-04",
    type: "income",
    category: "Venta de Pan",
    description: "Contrato desayuno escolar municipal",
    qty: 400,
    price: 0.12,
    total: 48.0,
  },
  {
    id: "tx-6",
    date: "2026-06-05",
    type: "expense",
    category: "Gas para Horno",
    description: "Carga de gas industrial 15kg",
    qty: 2,
    price: 18.5,
    total: 37.0,
  },
  {
    id: "tx-7",
    date: "2026-06-05",
    type: "expense",
    category: "servicios-basicos",
    description: "Planilla de luz eléctrica CNEL",
    qty: 1,
    price: 48.3,
    total: 48.3,
  },
  {
    id: "tx-8",
    date: "2026-06-06",
    type: "income",
    category: "Servicio Cafetería",
    description: "Consumo mesas cafetería fin de semana",
    qty: 1,
    price: 84.5,
    total: 84.5,
  },
  {
    id: "tx-9",
    date: "2026-06-07",
    type: "expense",
    category: "nomina",
    description: "Pago Nómina: Luis Castillo (Ayudante)",
    qty: 40,
    price: 4.5,
    total: 180.0,
  },
];

const seedEmployees = [
  {
    id: "emp-1",
    name: "Luis Castillo",
    role: "Ayudante de Panadería",
    hourlyRate: 4.5,
    payments: [{ date: "2026-06-07", hours: 40, amount: 180.0 }],
  },
  {
    id: "emp-2",
    name: "Ana Peralta",
    role: "Cajera / Atención Cliente",
    hourlyRate: 4.0,
    payments: [],
  },
];

const seedSavingsGoals = [
  {
    id: "goal-1",
    name: "Compra de Batidora Industrial",
    targetAmount: 850.0,
    currentSavings: 320.0,
    targetDate: "2026-08-31",
  },
  {
    id: "goal-2",
    name: "Reparación Vitrina Exhibidora",
    targetAmount: 200.0,
    currentSavings: 150.0,
    targetDate: "2026-06-30",
  },
];

// Inicializamos los datos desde el LocalStorage del sitio
function initAppState() {
  const savedState = localStorage.getItem("microfinanzas_ec_state");
  if (savedState) {
    try {
      state = JSON.parse(savedState);
    } catch (e) {
      console.error(
        "Error al cargar estado de LocalStorage, usando semilla por defecto",
        e,
      );
      loadSeedData();
    }
  } else {
    loadSeedData();
  }

  // Esto aplica el tema
  applyTheme(state.theme);
}

function loadSeedData() {
  state.businessType = "panaderia";
  state.businessName = "Panadería El Trigal";
  state.theme = "light";
  state.transactions = [...seedTransactions];
  state.employees = [...seedEmployees];
  state.savingsGoals = [...seedSavingsGoals];
  state.budgets = {
    "materia-prima": 500,
    servicios: 150,
    nomina: 800,
    otros: 200,
  };
  state.cashRegister = {
    isOpen: false,
    openingBalance: 0,
    transactions: [],
    openDate: null,
    notes: "",
  };
  saveState();
}

function saveState() {
  localStorage.setItem("microfinanzas_ec_state", JSON.stringify(state));
}

// Sistema de Toast para la carga de los contenedores
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-custom toast-${type}`;

  let icon = "bi-check-circle-fill text-success-custom";
  if (type === "danger") icon = "bi-x-circle-fill text-danger-custom";
  if (type === "warning")
    icon = "bi-exclamation-triangle-fill text-warning-custom";

  toast.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="bi ${icon} fs-5"></i>
            <span class="fw-medium text-secondary" style="font-size: 0.9rem;">${message}</span>
        </div>
        <button type="button" class="btn-close ms-2" style="font-size: 0.75rem;" aria-label="Close"></button>
    `;

  toast.querySelector(".btn-close").addEventListener("click", () => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}
// Controlador del tema Claro/Oscuro
function applyTheme(theme) {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (theme === "dark") {
    body.classList.add("dark-mode");
    if (themeIcon) {
      themeIcon.className = "bi bi-sun-fill text-warning";
    }
  } else {
    body.classList.remove("dark-mode");
    if (themeIcon) {
      themeIcon.className = "bi bi-moon-stars";
    }
  }
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  saveState();
  applyTheme(state.theme);
  showToast(
    `Modo ${state.theme === "light" ? "Claro" : "Oscuro"} activado con éxito`,
    "success",
  );
}

// Controlador de navegación entre pantallas
let currentActiveScreen = "dashboard";

function navigateTo(screenId) {
  currentActiveScreen = screenId;

  //Actualizar el estado de los enlaces en la barra lateral
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    if (link.getAttribute("data-screen") === screenId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Actualizar el nombre del negocio en el badge del header
  const bizBadgeName = document.getElementById("current-business-name");
  if (bizBadgeName) {
    bizBadgeName.innerText = state.businessName;
  }

  // Cargar la pantalla correspondiente
  renderScreen(screenId);

  // Cerrar sidebar en móviles después de navegar
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.remove("show");
  }

  // Scroll para que el usuario siempre vea el inicio de la nueva pantalla
  window.scrollTo({ top: 0, behavior: "instant" });
}

// Navegación entre pantallas
function renderScreen(screenId) {
  const contentArea = document.getElementById("content-area");
  if (!contentArea) return;

  switch (screenId) {
    case "dashboard":
      renderDashboard(contentArea);
      break;
    case "business-selector":
      renderBusinessSelector(contentArea);
      break;
    case "add-transaction":
      renderAddTransaction(contentArea);
      break;
    case "history":
      renderHistory(contentArea);
      break;
    case "payroll":
      renderPayroll(contentArea);
      break;
    case "income-report":
      renderIncomeReport(contentArea);
      break;
    case "expense-report":
      renderExpenseReport(contentArea);
      break;
    case "budgets":
      renderBudgets(contentArea);
      break;
    case "margin-calculator":
      renderMarginCalculator(contentArea);
      break;
    case "tax-calculator":
      renderTaxCalculator(contentArea);
      break;
    case "saving-goals":
      renderSavingGoals(contentArea);
      break;
    case "cash-register":
      renderCashRegister(contentArea);
      break;
    case "faq":
      renderFAQ(contentArea);
      break;
    case "team-info":
      renderTeamInfo(contentArea);
      break;
    case "settings":
      renderSettings(contentArea);
      break;
    default:
      contentArea.innerHTML = `<div class="alert alert-warning">Sección "${screenId}" no encontrada.</div>`;
  }
}

// PANTALLAS
// 1. DASHBOARD PRINCIPAL
function renderDashboard(container) {
  // Math indicators
  let totalIncomes = 0;
  let totalExpenses = 0;
  let payrollCost = 0;

  state.transactions.forEach((t) => {
    if (t.type === "income") totalIncomes += t.total;
    else if (t.type === "expense") {
      totalExpenses += t.total;
      if (t.category === "nomina") {
        payrollCost += t.total;
      }
    }
  });

  const balance = totalIncomes - totalExpenses;

  // Estructura del dashboard en HTML dinámico
  container.innerHTML = `
        <!-- Welcome Banner -->
        <div class="welcome-banner">
            <div class="banner-decorations"><i class="bi bi-wallet2"></i></div>
            <h1 class="fw-bold mb-1">¡Hola, bienvenido a ${state.businessName}!</h1>
            <p class="lead mb-0">Controla tus finanzas, evita mezclar dinero y haz crecer tu negocio popular.</p>
        </div>
        
        <!-- Summary Indicators Row -->
        <div class="row g-4 mb-4">
            <!-- Total Income Card -->
            <div class="col-xl-3 col-md-6">
                <div class="card-premium card-success h-100">
                    <div class="card-icon-wrapper bg-success-light text-success-custom">
                        <i class="bi bi-arrow-up-right-circle-fill"></i>
                    </div>
                    <span class="text-muted fw-semibold d-block mb-1" style="font-size: 0.85rem;">INGRESOS TOTALES</span>
                    <h2 class="fw-bold mb-0 text-success-custom">$${totalIncomes.toFixed(2)}</h2>
                </div>
            </div>
            <!-- Total Expense Card -->
            <div class="col-xl-3 col-md-6">
                <div class="card-premium card-danger h-100">
                    <div class="card-icon-wrapper bg-danger-light text-danger-custom">
                        <i class="bi bi-arrow-down-left-circle-fill"></i>
                    </div>
                    <span class="text-muted fw-semibold d-block mb-1" style="font-size: 0.85rem;">EGRESOS TOTALES</span>
                    <h2 class="fw-bold mb-0 text-danger-custom">$${totalExpenses.toFixed(2)}</h2>
                </div>
            </div>
            <!-- Net Balance Card -->
            <div class="col-xl-3 col-md-6">
                <div class="card-premium ${balance >= 0 ? "card-info" : "card-danger"} h-100">
                    <div class="card-icon-wrapper ${balance >= 0 ? "bg-primary-light text-primary" : "bg-danger-light text-danger-custom"}">
                        <i class="bi ${balance >= 0 ? "bi-cash-coin" : "bi-exclamation-triangle"}"></i>
                    </div>
                    <span class="text-muted fw-semibold d-block mb-1" style="font-size: 0.85rem;">SALDO DISPONIBLE</span>
                    <h2 class="fw-bold mb-0 ${balance >= 0 ? "text-primary" : "text-danger-custom"}">$${balance.toFixed(2)}</h2>
                </div>
            </div>
            <!-- Payroll Cost Card -->
            <div class="col-xl-3 col-md-6">
                <div class="card-premium card-warning h-100">
                    <div class="card-icon-wrapper bg-warning-light text-warning-custom">
                        <i class="bi bi-people-fill"></i>
                    </div>
                    <span class="text-muted fw-semibold d-block mb-1" style="font-size: 0.85rem;">GASTO DE NÓMINA</span>
                    <h2 class="fw-bold mb-0 text-warning-custom">$${payrollCost.toFixed(2)}</h2>
                </div>
            </div>
        </div>
        
        <div class="row g-4">
            <!-- Recent Activity List -->
            <div class="col-lg-7">
                <div class="card card-premium h-100">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="card-title fw-bold mb-0"><i class="bi bi-clock-history me-2"></i>Actividad Reciente</h4>
                        <button class="btn btn-sm btn-outline-primary" onclick="navigateTo('history')">Ver Todo</button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" style="font-size: 0.9rem;">
                            <thead class="table-light">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Detalle</th>
                                    <th>Categoría</th>
                                    <th class="text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                  state.transactions
                                    .slice(-5)
                                    .reverse()
                                    .map(
                                      (t) => `
                                    <tr>
                                        <td>${t.date}</td>
                                        <td>
                                            <div class="fw-semibold">${t.description}</div>
                                            <small class="text-muted">${t.qty} x $${t.price.toFixed(2)}</small>
                                        </td>
                                        <td>
                                            <span class="badge badge-custom ${t.type === "income" ? "badge-income" : t.category === "nomina" ? "badge-payroll" : "badge-expense"}">
                                                ${categoryNames[t.category] || t.category}
                                            </span>
                                        </td>
                                        <td class="text-end fw-bold ${t.type === "income" ? "text-success-custom" : "text-danger-custom"}">
                                            ${t.type === "income" ? "+" : "-"}$${t.total.toFixed(2)}
                                        </td>
                                    </tr>
                                `,
                                    )
                                    .join("") ||
                                  `<tr><td colspan="4" class="text-center text-muted py-4">No hay transacciones registradas.</td></tr>`
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Quick budget tracker -->
            <div class="col-lg-5">
                <div class="card card-premium h-100">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="card-title fw-bold mb-0"><i class="bi bi-wallet-fill me-2"></i>Monitoreo de Presupuestos</h4>
                        <button class="btn btn-sm btn-outline-primary" onclick="navigateTo('budgets')">Configurar</button>
                    </div>
                    
                    ${Object.keys(state.budgets)
                      .map((categoryKey) => {
                        // Calcular cuánto se ha gastado en esta categoría
                        let spent = 0;
                        state.transactions.forEach((t) => {
                          if (
                            t.type === "expense" &&
                            getBudgetCategory(t.category) === categoryKey
                          ) {
                            spent += t.total;
                          }
                        });

                        const limit = state.budgets[categoryKey];
                        const pct = Math.min((spent / limit) * 100, 100);

                        let colorClass = "bg-success";
                        if (pct >= 80 && pct < 100) colorClass = "bg-warning";
                        else if (pct >= 100) colorClass = "bg-danger";

                        const categoryTitles = {
                          "materia-prima": "Materia Prima / Insumos",
                          servicios: "Servicios Básicos & Combustible",
                          nomina: "Nómina de Personal",
                          otros: "Gastos Varios",
                        };

                        return `
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <span class="fw-semibold text-secondary" style="font-size: 0.85rem;">${categoryTitles[categoryKey]}</span>
                                    <span class="text-muted" style="font-size: 0.8rem;">
                                        <strong>$${spent.toFixed(2)}</strong> de $${limit.toFixed(2)}
                                    </span>
                                </div>
                                <div class="progress" style="height: 10px; border-radius: 5px;">
                                    <div class="progress-bar ${colorClass}" role="progressbar" style="width: ${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
            </div>
        </div>
    `;
}

// 2. Selector de Negocios
function renderBusinessSelector(container) {
    container.innerHTML = `
        <div class="card card-premium mb-4">
            <h2 class="fw-bold mb-1"><i class="bi bi-shop-window me-2"></i>Selector de Tipo de Negocio</h2>
            <p class="text-muted">Selecciona tu categoría. Esto adaptará automáticamente los ingresos y gastos predeterminados de tu aplicación para que no mezcles transacciones.</p>
            
            <form id="business-config-form" class="mt-3">
                <div class="mb-4">
                    <label for="business-name-input" class="form-label">Nombre de tu Negocio / Local Comercial</label>
                    <input type="text" class="form-control form-control-lg" id="business-name-input" value="${state.businessName}" placeholder="Ej. Restaurante Don Pepe" required>
                </div>
                
                <h5 class="fw-bold mb-3">Tipo de Actividad Comercial</h5>
                
                <div class="row g-3 mb-4">
                    <!-- Bakery -->
                    <div class="col-md-6 col-xl-3">
                        <div class="card h-100 business-type-card p-3 shadow-sm ${state.businessType === 'panaderia' ? 'selected' : ''}" data-type="panaderia">
                            <div class="d-flex align-items-center gap-3">
                                <div class="fs-1 text-primary"><i class="bi bi-egg-fried"></i></div>
                                <div>
                                    <h6 class="fw-bold mb-0">Panadería / Pastelería</h6>
                                    <small class="text-muted">Venta de pan, dulces, insumos de repostería.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Restaurant -->
                    <div class="col-md-6 col-xl-3">
                        <div class="card h-100 business-type-card p-3 shadow-sm ${state.businessType === 'restaurante' ? 'selected' : ''}" data-type="restaurante">
                            <div class="d-flex align-items-center gap-3">
                                <div class="fs-1 text-primary"><i class="bi bi-cup-hot"></i></div>
                                <div>
                                    <h6 class="fw-bold mb-0">Restaurante / Cafetería</h6>
                                    <small class="text-muted">Platos preparados, catering, bebidas diarias.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Mechanical Workshop -->
                    <div class="col-md-6 col-xl-3">
                        <div class="card h-100 business-type-card p-3 shadow-sm ${state.businessType === 'taller' ? 'selected' : ''}" data-type="taller">
                            <div class="d-flex align-items-center gap-3">
                                <div class="fs-1 text-primary"><i class="bi bi-wrench-adjustable"></i></div>
                                <div>
                                    <h6 class="fw-bold mb-0">Taller Mecánico / Ruedas</h6>
                                    <small class="text-muted">Reparaciones, repuestos, servicios técnicos.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Clothing Store -->
                    <div class="col-md-6 col-xl-3">
                        <div class="card h-100 business-type-card p-3 shadow-sm ${state.businessType === 'ropa' ? 'selected' : ''}" data-type="ropa">
                            <div class="d-flex align-items-center gap-3">
                                <div class="fs-1 text-primary"><i class="bi bi-tags-fill"></i></div>
                                <div>
                                    <h6 class="fw-bold mb-0">Tienda de Ropa / Bazar</h6>
                                    <small class="text-muted">Moda, calzado, accesorios, prendas locales.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary btn-premium btn-premium-primary">
                    <i class="bi bi-save me-2"></i>Guardar Configuración
                </button>
            </form>
        </div>
    `;
    
    // Esto selecciona las tarjetas
    let selectedType = state.businessType;
    const cards = container.querySelectorAll('.business-type-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.getAttribute('data-type');
        });
    });
    
    // Enviar formulario
    container.querySelector('#business-config-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = container.querySelector('#business-name-input').value.trim();
        if (!newName) {
            showToast('El nombre del negocio no puede estar vacío', 'danger');
            return;
        }
        
        state.businessName = newName;
        state.businessType = selectedType;
        saveState();
        
        // Actualiza el navbar con los componentes
        document.getElementById('current-business-name').innerText = newName;
        
        showToast('¡Configuración del negocio guardada con éxito!', 'success');
        navigateTo('dashboard');
    });
}


// Pantalla 3 Nueva Transacción
function renderAddTransaction(container) {
    // Determina las categorias
    const categoriesInc = [...businessCategories[state.businessType].income, ...businessCategories.general.income];
    const categoriesExp = [...businessCategories[state.businessType].expense, ...businessCategories.general.expense];
    
    container.innerHTML = `
        <div class="card card-premium">
            <h2 class="fw-bold mb-1"><i class="bi bi-plus-circle-fill me-2"></i>Registrar Movimiento Financiero</h2>
            <p class="text-muted">Ingresa las ventas o los gastos operativos para mantener tus cuentas claras.</p>
            
            <form id="add-transaction-form" class="mt-3" novalidate>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="tx-date" class="form-label">Fecha del Movimiento</label>
                        <input type="date" class="form-control" id="tx-date" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="tx-type" class="form-label">Tipo de Movimiento</label>
                        <select class="form-select" id="tx-type" required>
                            <option value="income">Ingreso (Venta / Cobros)</option>
                            <option value="expense">Egreso (Pagos / Gastos)</option>
                        </select>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="tx-category" class="form-label">Categoría del Negocio</label>
                        <select class="form-select" id="tx-category" required>
                            <!-- Dynamically loaded -->
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="tx-description" class="form-label">Descripción o Detalle</label>
                        <input type="text" class="form-control" id="tx-description" placeholder="Ej. Venta pastel de bodas o Harina 2 sacos" required>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="tx-qty" class="form-label">Cantidad / Items</label>
                        <input type="number" class="form-control" id="tx-qty" min="1" step="any" value="1" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="tx-price" class="form-label">Precio Unitario ($)</label>
                        <input type="number" class="form-control" id="tx-price" min="0.01" step="any" placeholder="0.00" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="tx-total" class="form-label">Total Calculado ($)</label>
                        <input type="number" class="form-control" id="tx-total" value="0.00" readonly>
                    </div>
                </div>
                
                <div class="mt-4 d-flex gap-2">
                    <button type="submit" class="btn btn-primary btn-premium btn-premium-primary">
                        <i class="bi bi-check2-circle me-2"></i>Registrar en Caja
                    </button>
                    <button type="button" class="btn btn-secondary btn-premium" onclick="navigateTo('dashboard')">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;
    
    const typeSelect = container.querySelector('#tx-type');
    const categorySelect = container.querySelector('#tx-category');
    const qtyInput = container.querySelector('#tx-qty');
    const priceInput = container.querySelector('#tx-price');
    const totalInput = container.querySelector('#tx-total');
    
    function populateCategories() {
        const type = typeSelect.value;
        const list = type === 'income' ? categoriesInc : categoriesExp;
        
        categorySelect.innerHTML = list.map(c => `
            <option value="${c}">${categoryNames[c] || c}</option>
        `).join('');
    }
    
    // Autocalcular el subtotal
    function calculateSubtotal() {
        const qty = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        totalInput.value = (qty * price).toFixed(2);
    }
    
    typeSelect.addEventListener('change', populateCategories);
    qtyInput.addEventListener('input', calculateSubtotal);
    priceInput.addEventListener('input', calculateSubtotal);
    
    // Llamadas iniciales
    populateCategories();
    calculateSubtotal();
    
    container.querySelector('#add-transaction-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const date = container.querySelector('#tx-date').value;
        const type = typeSelect.value;
        const category = categorySelect.value;
        const description = container.querySelector('#tx-description').value.trim();
        const qty = parseFloat(qtyInput.value);
        const price = parseFloat(priceInput.value);
        const total = parseFloat(totalInput.value);
        
        // Estas son validaciones por si los campos estan vacíos
        if (!date) {
            showToast('Por favor, selecciona una fecha válida.', 'danger');
            return;
        }
        if (!description) {
            showToast('El detalle de la transacción es obligatorio.', 'danger');
            return;
        }
        if (isNaN(qty) || qty <= 0) {
            showToast('La cantidad debe ser mayor que cero.', 'danger');
            return;
        }
        if (isNaN(price) || price <= 0) {
            showToast('El precio debe ser un número positivo.', 'danger');
            return;
        }
        
        const newTx = {
            id: 'tx-' + Date.now(),
            date,
            type,
            category,
            description,
            qty,
            price,
            total
        };
        
        state.transactions.push(newTx);
        
        if (state.cashRegister.isOpen) {
            state.cashRegister.transactions.push(newTx);
        }
        
        saveState();
        showToast('¡Transacción registrada exitosamente!', 'success');
        navigateTo('history');
    });
}


// 4. Crud de Historial de Movimientos
function renderHistory(container) {
    container.innerHTML = `
        <div class="card card-premium mb-4">
            <div class="row align-items-center g-3">
                <div class="col-md-6">
                    <h2 class="fw-bold mb-1"><i class="bi bi-journal-text me-2"></i>Historial de Movimientos</h2>
                    <p class="text-muted mb-0">Listado, edición y filtros de ingresos y gastos de tu negocio.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <button class="btn btn-primary btn-premium btn-premium-primary" onclick="navigateTo('add-transaction')">
                        <i class="bi bi-plus-circle me-1"></i>Nuevo Registro
                    </button>
                </div>
            </div>
            
            <hr class="my-3">
            
            <!-- Filter Bar -->
            <div class="row g-2">
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text bg-secondary border-color text-muted"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" id="search-input" placeholder="Buscar por detalle...">
                    </div>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filter-type">
                        <option value="all">Todos los Movimientos</option>
                        <option value="income">Solo Ingresos (Ventas)</option>
                        <option value="expense">Solo Egresos (Gastos)</option>
                        <option value="payroll">Solo Nómina</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <input type="date" class="form-control" id="filter-date" placeholder="Filtrar por fecha">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-outline-secondary w-100 btn-premium" id="clear-filters-btn">
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Table Card -->
        <div class="card card-premium p-0" style="overflow: hidden;">
            <div class="table-responsive">
                <table class="table table-custom table-hover align-middle mb-0" id="transactions-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Categoría</th>
                            <th>Detalle / Cantidad</th>
                            <th class="text-end">P. Unitario</th>
                            <th class="text-end">Total</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        <!-- JS renders lines here -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    const tableBody = container.querySelector('#table-body');
    const searchInput = container.querySelector('#search-input');
    const filterType = container.querySelector('#filter-type');
    const filterDate = container.querySelector('#filter-date');
    const clearBtn = container.querySelector('#clear-filters-btn');
    
    function filterAndRenderTable() {
        const query = searchInput.value.toLowerCase();
        const type = filterType.value;
        const date = filterDate.value;
        
        const filtered = state.transactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(query) || t.category.toLowerCase().includes(query);
            const matchesType = type === 'all' ? true : 
                                (type === 'payroll' ? t.category === 'nomina' : t.type === type);
            const matchesDate = !date ? true : t.date === date;
            return matchesSearch && matchesType && matchesDate;
        });
        
        const displayList = [...filtered].reverse();
        
        tableBody.innerHTML = displayList.map(t => `
            <tr>
                <td class="fw-semibold text-secondary" style="font-size: 0.85rem;">${t.date}</td>
                <td>
                    <span class="badge badge-custom ${t.type === 'income' ? 'badge-income' : (t.category === 'nomina' ? 'badge-payroll' : 'badge-expense')}">
                        ${t.type === 'income' ? 'INGRESO' : 'EGRESO'}
                    </span>
                </td>
                <td class="fw-medium">${categoryNames[t.category] || t.category}</td>
                <td>
                    <div class="fw-semibold text-primary-custom">${t.description}</div>
                    <small class="text-muted">Cantidad: ${t.qty}</small>
                </td>
                <td class="text-end fw-medium">$${t.price.toFixed(2)}</td>
                <td class="text-end fw-bold ${t.type === 'income' ? 'text-success-custom' : 'text-danger-custom'}">
                    $${t.total.toFixed(2)}
                </td>
                <td class="text-center">
                    <div class="d-flex justify-content-center gap-2">
                        <button class="btn btn-sm btn-outline-primary py-1 px-2" onclick="editTransaction('${t.id}')" title="Editar">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger py-1 px-2" onclick="deleteTransactionPrompt('${t.id}')" title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('') || `<tr><td colspan="7" class="text-center py-5 text-muted">No se encontraron movimientos registrados con esos filtros.</td></tr>`;
    }
    
    searchInput.addEventListener('input', filterAndRenderTable);
    filterType.addEventListener('change', filterAndRenderTable);
    filterDate.addEventListener('change', filterAndRenderTable);
    
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterType.value = 'all';
        filterDate.value = '';
        filterAndRenderTable();
    });
    
    filterAndRenderTable();
}

// CRUD global
let activeDeleteId = null;
window.deleteTransactionPrompt = function(id) {
    activeDeleteId = id;
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show();
};

document.getElementById('confirm-delete-btn').addEventListener('click', () => {
    if (activeDeleteId) {
        state.transactions = state.transactions.filter(t => t.id !== activeDeleteId);
        saveState();
        showToast('Registro eliminado con éxito', 'warning');
        
        const modalEl = document.getElementById('confirmDeleteModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        
        if (currentActiveScreen === 'history') {
            renderScreen('history');
        } else {
            navigateTo('dashboard');
        }
    }
});

let activeEditId = null;
window.editTransaction = function(id) {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;
    
    activeEditId = id;
    document.getElementById('edit-tx-id').value = id;
    document.getElementById('edit-tx-date').value = tx.date;
    document.getElementById('edit-tx-type').value = tx.type;
    document.getElementById('edit-tx-description').value = tx.description;
    document.getElementById('edit-tx-qty').value = tx.qty;
    document.getElementById('edit-tx-price').value = tx.price;
    document.getElementById('edit-tx-total').value = tx.total.toFixed(2);
    
    const categoriesInc = [...businessCategories[state.businessType].income, ...businessCategories.general.income];
    const categoriesExp = [...businessCategories[state.businessType].expense, ...businessCategories.general.expense];
    const selectCat = document.getElementById('edit-tx-category');
    
    function populateEditCategories() {
        const type = document.getElementById('edit-tx-type').value;
        const list = type === 'income' ? categoriesInc : categoriesExp;
        selectCat.innerHTML = list.map(c => `
            <option value="${c}" ${tx.category === c ? 'selected' : ''}>${categoryNames[c] || c}</option>
        `).join('');
    }
    
    populateEditCategories();
    
    document.getElementById('edit-tx-type').addEventListener('change', populateEditCategories);
    
    const qtyInput = document.getElementById('edit-tx-qty');
    const priceInput = document.getElementById('edit-tx-price');
    const totalInput = document.getElementById('edit-tx-total');
    
    function calcEditTotal() {
        const q = parseFloat(qtyInput.value) || 0;
        const p = parseFloat(priceInput.value) || 0;
        totalInput.value = (q * p).toFixed(2);
    }
    
    qtyInput.addEventListener('input', calcEditTotal);
    priceInput.addEventListener('input', calcEditTotal);
    
    const modal = new bootstrap.Modal(document.getElementById('editTransactionModal'));
    modal.show();
};

document.getElementById('save-edit-tx-btn').addEventListener('click', () => {
    if (activeEditId) {
        const txIndex = state.transactions.findIndex(t => t.id === activeEditId);
        if (txIndex === -1) return;
        
        const date = document.getElementById('edit-tx-date').value;
        const type = document.getElementById('edit-tx-type').value;
        const category = document.getElementById('edit-tx-category').value;
        const description = document.getElementById('edit-tx-description').value.trim();
        const qty = parseFloat(document.getElementById('edit-tx-qty').value);
        const price = parseFloat(document.getElementById('edit-tx-price').value);
        
        if (!date || !description || isNaN(qty) || qty <= 0 || isNaN(price) || price <= 0) {
            showToast('Por favor rellene el formulario de edición correctamente', 'danger');
            return;
        }
        
        state.transactions[txIndex] = {
            id: activeEditId,
            date,
            type,
            category,
            description,
            qty,
            price,
            total: qty * price
        };
        
        saveState();
        showToast('Transacción modificada correctamente', 'success');
        
        const modalEl = document.getElementById('editTransactionModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        
        renderScreen(currentActiveScreen);
    }
});

// 7. Eventos y lógica de inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar estado y aplicar tema guardado
  initAppState();

  // Configurar botón de toggle de tema
  document
    .getElementById("theme-toggle-btn")
    .addEventListener("click", toggleTheme);

  // Controles por si se quiere abrir o cerrar la barra lateral en dispositivos móviles
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarBtn = document.getElementById("sidebar-toggle");
  const closeSidebarBtn = document.getElementById("sidebar-close");

  if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.add("show");
    });
  }

  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
  }

  // Navegar entre pantallas al hacer clic en los enlaces de la barra lateral
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetScreen = link.getAttribute("data-screen");
      navigateTo(targetScreen);
    });
  });

  // Renderizar pantalla inicial (Dashboard)
  navigateTo("dashboard");
});
