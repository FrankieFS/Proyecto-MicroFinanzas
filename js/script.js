// Estado
let state = {
    businessType: 'panaderia',
    businessName: 'Panadería El Trigal',
    theme: 'light',
    transactions: [],
    employees: [],
    budgets: {
        'materia-prima': 500,
        'servicios': 150,
        'nomina': 800,
        'otros': 200
    },
    savingsGoals: [],
    cashRegister: {
        isOpen: false,
        openingBalance: 0,
        transactions: [],
        openDate: null,
        notes: ''
    }
};

// Estas categorías son datos proporcionados por una semilla de la IA
const businessCategories = {
    panaderia: {
        income: ['Venta de Pan', 'Venta de Pasteles', 'Pedidos Especiales', 'Servicio Cafetería'],
        expense: ['Compra de Harina', 'Compra de Azúcar y Levadura', 'Gas para Horno', 'Mantenimiento Horno', 'Moldes y Utensilios']
    },
    restaurante: {
        income: ['Almuerzos Diarios', 'Platos a la Carta', 'Bebidas y Postres', 'Eventos / Catering'],
        expense: ['Carnes y Mariscos', 'Abarrotes y Verduras', 'Material Desechable', 'Alquiler Vajilla', 'Gas de Cocina']
    },
    taller: {
        income: ['Servicio de Mano de Obra', 'Venta de Repuestos', 'Alineación y Balanceo', 'Diagnóstico Computarizado'],
        expense: ['Lubricantes y Filtros', 'Repuestos Mecánicos', 'Herramientas Nuevas', 'Limpieza y Desengrasantes', 'Epps y Guantes']
    },
    ropa: {
        income: ['Venta Ropa Casual', 'Venta Calzado', 'Venta de Accesorios', 'Pedidos Especiales'],
        expense: ['Lotes de Ropa', 'Bolsas y Etiquetas', 'Publicidad y Redes', 'Alquiler Percheros', 'Decoración Vitrina']
    },
    general: {
        income: ['Otros Ingresos'],
        expense: ['alquiler-local', 'servicios-basicos', 'nomina', 'otros-gastos']
    }
};

// Nombres de negocios para renderizar en el sitio
const categoryNames = {
    // Panaderia
    'Venta de Pan': 'Venta de Pan',
    'Venta de Pasteles': 'Venta de Pasteles',
    'Pedidos Especiales': 'Pedidos Especiales',
    'Servicio Cafetería': 'Servicio Cafetería',
    'Compra de Harina': 'Compra de Harina (Materia Prima)',
    'Compra de Azúcar y Levadura': 'Azúcar y Levadura (Materia Prima)',
    'Gas para Horno': 'Gas para Horno (Servicios)',
    'Mantenimiento Horno': 'Mantenimiento Horno (Otros)',
    'Moldes y Utensilios': 'Moldes y Utensilios (Otros)',
    
    // Restaurante
    'Almuerzos Diarios': 'Almuerzos Diarios',
    'Platos a la Carta': 'Platos a la Carta',
    'Bebidas y Postres': 'Bebidas y Postres',
    'Eventos / Catering': 'Eventos / Catering',
    'Carnes y Mariscos': 'Carnes y Mariscos (Materia Prima)',
    'Abarrotes y Verduras': 'Abarrotes y Verduras (Materia Prima)',
    'Material Desechable': 'Desechables (Otros)',
    'Alquiler Vajilla': 'Alquiler de Vajilla (Otros)',
    'Gas de Cocina': 'Gas de Cocina (Servicios)',

    // Taller
    'Servicio de Mano de Obra': 'Servicio Mano de Obra',
    'Venta de Repuestos': 'Venta de Repuestos',
    'Alineación y Balanceo': 'Alineación y Balanceo',
    'Diagnóstico Computarizado': 'Diagnóstico Computarizado',
    'Lubricantes y Filtros': 'Lubricantes y Filtros (Materia Prima)',
    'Repuestos Mecánicos': 'Repuestos Mecánicos (Materia Prima)',
    'Herramientas Nuevas': 'Herramientas Nuevas (Otros)',
    'Limpieza y Desengrasantes': 'Limpieza y Desengrasantes (Otros)',
    'Epps y Guantes': 'Equipos de Protección (Otros)',

    // Ropa
    'Venta Ropa Casual': 'Venta Ropa Casual',
    'Venta Calzado': 'Venta Calzado',
    'Venta de Accesorios': 'Venta de Accesorios',
    'Lotes de Ropa': 'Lotes de Ropa (Materia Prima)',
    'Bolsas y Etiquetas': 'Bolsas y Etiquetas (Otros)',
    'Publicidad y Redes': 'Publicidad y Redes (Otros)',
    'Alquiler Percheros': 'Alquiler Percheros (Otros)',
    'Decoración Vitrina': 'Decoración Vitrina (Otros)',

    // General
    'Otros Ingresos': 'Otros Ingresos',
    'alquiler-local': 'Alquiler de Local',
    'servicios-basicos': 'Servicios Básicos (Luz/Agua/Internet)',
    'nomina': 'Pago de Nómina (Empleados)',
    'otros-gastos': 'Otros Gastos'
};

// grupos de subcategorías ('materia-prima', 'servicios', 'nomina', 'otros')
function getBudgetCategory(category) {
    const catLower = category.toLowerCase();
    if (catLower.includes('harina') || catLower.includes('azúcar') || catLower.includes('carne') || 
        catLower.includes('abarrote') || catLower.includes('lubricante') || catLower.includes('repuesto') || 
        catLower.includes('ropa') || catLower.includes('materia')) {
        return 'materia-prima';
    } else if (catLower.includes('gas') || catLower.includes('servicio') || catLower.includes('luz') || 
               catLower.includes('agua') || catLower.includes('internet') || catLower === 'servicios-basicos') {
        return 'servicios';
    } else if (catLower === 'nomina' || catLower.includes('nómina') || catLower.includes('empleado') || catLower.includes('pago')) {
        return 'nomina';
    } else {
        return 'otros';
    }
}

// Datos de la semilla
const seedTransactions = [
    { id: 'tx-1', date: '2026-06-01', type: 'income', category: 'Venta de Pan', description: 'Venta matutina pan de agua', qty: 250, price: 0.15, total: 37.50 },
    { id: 'tx-2', date: '2026-06-02', type: 'income', category: 'Venta de Pasteles', description: 'Pastel de tres leches especial', qty: 2, price: 25.00, total: 50.00 },
    { id: 'tx-3', date: '2026-06-02', type: 'expense', category: 'Compra de Harina', description: 'Saco de harina trigo 50kg', qty: 3, price: 42.00, total: 126.00 },
    { id: 'tx-4', date: '2026-06-03', type: 'expense', category: 'Compra de Azúcar y Levadura', description: 'Azúcar quintal y levadura seca', qty: 1, price: 65.00, total: 65.00 },
    { id: 'tx-5', date: '2026-06-04', type: 'income', category: 'Venta de Pan', description: 'Contrato desayuno escolar municipal', qty: 400, price: 0.12, total: 48.00 },
    { id: 'tx-6', date: '2026-06-05', type: 'expense', category: 'Gas para Horno', description: 'Carga de gas industrial 15kg', qty: 2, price: 18.50, total: 37.00 },
    { id: 'tx-7', date: '2026-06-05', type: 'expense', category: 'servicios-basicos', description: 'Planilla de luz eléctrica CNEL', qty: 1, price: 48.30, total: 48.30 },
    { id: 'tx-8', date: '2026-06-06', type: 'income', category: 'Servicio Cafetería', description: 'Consumo mesas cafetería fin de semana', qty: 1, price: 84.50, total: 84.50 },
    { id: 'tx-9', date: '2026-06-07', type: 'expense', category: 'nomina', description: 'Pago Nómina: Luis Castillo (Ayudante)', qty: 40, price: 4.50, total: 180.00 }
];

const seedEmployees = [
    { id: 'emp-1', name: 'Luis Castillo', role: 'Ayudante de Panadería', hourlyRate: 4.50, payments: [{ date: '2026-06-07', hours: 40, amount: 180.00 }] },
    { id: 'emp-2', name: 'Ana Peralta', role: 'Cajera / Atención Cliente', hourlyRate: 4.00, payments: [] }
];

const seedSavingsGoals = [
    { id: 'goal-1', name: 'Compra de Batidora Industrial', targetAmount: 850.00, currentSavings: 320.00, targetDate: '2026-08-31' },
    { id: 'goal-2', name: 'Reparación Vitrina Exhibidora', targetAmount: 200.00, currentSavings: 150.00, targetDate: '2026-06-30' }
];

// Inicializamos los datos desde el LocalStorage del sitio
function initAppState() {
    const savedState = localStorage.getItem('microfinanzas_ec_state');
    if (savedState) {
        try {
            state = JSON.parse(savedState);
        } catch (e) {
            console.error("Error al cargar estado de LocalStorage, usando semilla por defecto", e);
            loadSeedData();
        }
    } else {
        loadSeedData();
    }
    
    // Esto aplica el tema
    applyTheme(state.theme);
}

function loadSeedData() {
    state.businessType = 'panaderia';
    state.businessName = 'Panadería El Trigal';
    state.theme = 'light';
    state.transactions = [...seedTransactions];
    state.employees = [...seedEmployees];
    state.savingsGoals = [...seedSavingsGoals];
    state.budgets = {
        'materia-prima': 500,
        'servicios': 150,
        'nomina': 800,
        'otros': 200
    };
    state.cashRegister = {
        isOpen: false,
        openingBalance: 0,
        transactions: [],
        openDate: null,
        notes: ''
    };
    saveState();
}

function saveState() {
    localStorage.setItem('microfinanzas_ec_state', JSON.stringify(state));
}

// Sistema de Toast para la carga de los contenedores
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast-custom toast-${type}`;
    
    let icon = 'bi-check-circle-fill text-success-custom';
    if (type === 'danger') icon = 'bi-x-circle-fill text-danger-custom';
    if (type === 'warning') icon = 'bi-exclamation-triangle-fill text-warning-custom';
    
    toast.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="bi ${icon} fs-5"></i>
            <span class="fw-medium text-secondary" style="font-size: 0.9rem;">${message}</span>
        </div>
        <button type="button" class="btn-close ms-2" style="font-size: 0.75rem;" aria-label="Close"></button>
    `;
    
    toast.querySelector('.btn-close').addEventListener('click', () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    });
    
    container.appendChild(toast);

    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// Controlador del tema
function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.className = 'bi bi-sun-fill text-warning';
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) {
            themeIcon.className = 'bi bi-moon-stars';
        }
    }
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    saveState();
    applyTheme(state.theme);
    showToast(`Modo ${state.theme === 'light' ? 'Claro' : 'Oscuro'} activado con éxito`, 'success');
}


let currentActiveScreen = 'dashboard';

function navigateTo(screenId) {
    currentActiveScreen = screenId;

    document.querySelectorAll('.sidebar-link').forEach(link => {
        if (link.getAttribute('data-screen') === screenId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const bizBadgeName = document.getElementById('current-business-name');
    if (bizBadgeName) {
        bizBadgeName.innerText = state.businessName;
    }

    renderScreen(screenId);

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('show');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Esto carga los contenedores dinámicos cuando se hace click
function renderScreen(screenId) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    switch (screenId) {
        case 'dashboard':
            renderDashboard(contentArea);
            break;
        case 'business-selector':
            renderBusinessSelector(contentArea);
            break;
        case 'add-transaction':
            renderAddTransaction(contentArea);
            break;
        case 'history':
            renderHistory(contentArea);
            break;
        case 'payroll':
            renderPayroll(contentArea);
            break;
        case 'income-report':
            renderIncomeReport(contentArea);
            break;
        case 'expense-report':
            renderExpenseReport(contentArea);
            break;
        case 'budgets':
            renderBudgets(contentArea);
            break;
        case 'margin-calculator':
            renderMarginCalculator(contentArea);
            break;
        case 'tax-calculator':
            renderTaxCalculator(contentArea);
            break;
        case 'saving-goals':
            renderSavingGoals(contentArea);
            break;
        case 'cash-register':
            renderCashRegister(contentArea);
            break;
        case 'faq':
            renderFAQ(contentArea);
            break;
        case 'team-info':
            renderTeamInfo(contentArea);
            break;
        case 'settings':
            renderSettings(contentArea);
            break;
        default:
            contentArea.innerHTML = `<div class="alert alert-warning">Sección "${screenId}" no encontrada.</div>`;
    }
}

// Pantallas
// 1. DashBoard
function renderDashboard(container) {
    let totalIncomes = 0;
    let totalExpenses = 0;
    let payrollCost = 0;
    
    state.transactions.forEach(t => {
        if (t.type === 'income') totalIncomes += t.total;
        else if (t.type === 'expense') {
            totalExpenses += t.total;
            if (t.category === 'nomina') {
                payrollCost += t.total;
            }
        }
    });
    
    const balance = totalIncomes - totalExpenses;
    
    // Estructura HTML dinámica dentro del .JS
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
                <div class="card-premium ${balance >= 0 ? 'card-info' : 'card-danger'} h-100">
                    <div class="card-icon-wrapper ${balance >= 0 ? 'bg-primary-light text-primary' : 'bg-danger-light text-danger-custom'}">
                        <i class="bi ${balance >= 0 ? 'bi-cash-coin' : 'bi-exclamation-triangle'}"></i>
                    </div>
                    <span class="text-muted fw-semibold d-block mb-1" style="font-size: 0.85rem;">SALDO DISPONIBLE</span>
                    <h2 class="fw-bold mb-0 ${balance >= 0 ? 'text-primary' : 'text-danger-custom'}">$${balance.toFixed(2)}</h2>
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
                                ${state.transactions.slice(-5).reverse().map(t => `
                                    <tr>
                                        <td>${t.date}</td>
                                        <td>
                                            <div class="fw-semibold">${t.description}</div>
                                            <small class="text-muted">${t.qty} x $${t.price.toFixed(2)}</small>
                                        </td>
                                        <td>
                                            <span class="badge badge-custom ${t.type === 'income' ? 'badge-income' : (t.category === 'nomina' ? 'badge-payroll' : 'badge-expense')}">
                                                ${categoryNames[t.category] || t.category}
                                            </span>
                                        </td>
                                        <td class="text-end fw-bold ${t.type === 'income' ? 'text-success-custom' : 'text-danger-custom'}">
                                            ${t.type === 'income' ? '+' : '-'}$${t.total.toFixed(2)}
                                        </td>
                                    </tr>
                                `).join('') || `<tr><td colspan="4" class="text-center text-muted py-4">No hay transacciones registradas.</td></tr>`}
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
                    
                    ${Object.keys(state.budgets).map(categoryKey => {
                        let spent = 0;
                        state.transactions.forEach(t => {
                            if (t.type === 'expense' && getBudgetCategory(t.category) === categoryKey) {
                                spent += t.total;
                            }
                        });
                        
                        const limit = state.budgets[categoryKey];
                        const pct = Math.min((spent / limit) * 100, 100);
                        
                        let colorClass = 'bg-success';
                        if (pct >= 80 && pct < 100) colorClass = 'bg-warning';
                        else if (pct >= 100) colorClass = 'bg-danger';
                        
                        const categoryTitles = {
                            'materia-prima': 'Materia Prima / Insumos',
                            'servicios': 'Servicios Básicos & Combustible',
                            'nomina': 'Nómina de Personal',
                            'otros': 'Gastos Varios'
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
                    }).join('')}
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

    let selectedType = state.businessType;
    const cards = container.querySelectorAll('.business-type-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.getAttribute('data-type');
        });
    });

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

        document.getElementById('current-business-name').innerText = newName;
        
        showToast('¡Configuración del negocio guardada con éxito!', 'success');
        navigateTo('dashboard');
    });
}


// 3. Nueva Transacción
function renderAddTransaction(container) {
    // Determine categories based on active business type
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
    
    // Function to rebuild category list based on type selected
    function populateCategories() {
        const type = typeSelect.value;
        const list = type === 'income' ? categoriesInc : categoriesExp;
        
        categorySelect.innerHTML = list.map(c => `
            <option value="${c}">${categoryNames[c] || c}</option>
        `).join('');
    }
    
    // Auto-calculate subtotal
    function calculateSubtotal() {
        const qty = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        totalInput.value = (qty * price).toFixed(2);
    }
    
    typeSelect.addEventListener('change', populateCategories);
    qtyInput.addEventListener('input', calculateSubtotal);
    priceInput.addEventListener('input', calculateSubtotal);
    
    // Initial calls
    populateCategories();
    calculateSubtotal();
    
    // Handle form submit
    container.querySelector('#add-transaction-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const date = container.querySelector('#tx-date').value;
        const type = typeSelect.value;
        const category = categorySelect.value;
        const description = container.querySelector('#tx-description').value.trim();
        const qty = parseFloat(qtyInput.value);
        const price = parseFloat(priceInput.value);
        const total = parseFloat(totalInput.value);
        
        // Simple HTML5-like Native JS validation
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
        
        // Check if cash register is open, and add to session cash flow
        if (state.cashRegister.isOpen) {
            state.cashRegister.transactions.push(newTx);
        }
        
        saveState();
        showToast('¡Transacción registrada exitosamente!', 'success');
        navigateTo('history');
    });
}


// 4. Historial de Movimientos / Transacciones
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

// CRUD Global
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


// 5 Nómina de los Empleados
function renderPayroll(container) {
    container.innerHTML = `
        <div class="row g-4">
            <!-- Left Side: Employee List -->
            <div class="col-lg-7">
                <div class="card card-premium h-100">
                    <h3 class="fw-bold mb-1"><i class="bi bi-people-fill me-2"></i>Nómina y Pago de Empleados</h3>
                    <p class="text-muted">Calcula el pago del personal por horas y regístralo automáticamente como gasto operativo.</p>
                    
                    <div class="table-responsive mt-3">
                        <table class="table table-hover align-middle mb-0" style="font-size: 0.9rem;">
                            <thead class="table-light">
                                <tr>
                                    <th>Colaborador</th>
                                    <th>Cargo</th>
                                    <th class="text-end">Tarifa / Hora</th>
                                    <th class="text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${state.employees.map(emp => `
                                    <tr>
                                        <td>
                                            <div class="fw-bold text-primary">${emp.name}</div>
                                            <small class="text-muted">Último Pago: ${emp.payments.length > 0 ? '$' + emp.payments[emp.payments.length - 1].amount.toFixed(2) + ' (' + emp.payments[emp.payments.length - 1].date + ')' : 'Ninguno'}</small>
                                        </td>
                                        <td><span class="badge bg-secondary">${emp.role}</span></td>
                                        <td class="text-end fw-semibold">$${emp.hourlyRate.toFixed(2)}</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-success btn-premium w-100" onclick="payEmployeePrompt('${emp.id}')">
                                                <i class="bi bi-cash me-1"></i>Calcular Pago
                                            </button>
                                        </td>
                                    </tr>
                                `).join('') || `<tr><td colspan="4" class="text-center text-muted py-4">No hay empleados registrados.</td></tr>`}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Right Side: Add Employee Form -->
            <div class="col-lg-5">
                <div class="card card-premium">
                    <h4 class="fw-bold mb-3"><i class="bi bi-person-plus-fill me-2"></i>Registrar Colaborador</h4>
                    <form id="add-employee-form" novalidate>
                        <div class="mb-3">
                            <label for="emp-name" class="form-label">Nombre del Colaborador</label>
                            <input type="text" class="form-control" id="emp-name" placeholder="Ej. Ana Belén Flores" required>
                        </div>
                        <div class="mb-3">
                            <label for="emp-role" class="form-label">Cargo / Función</label>
                            <input type="text" class="form-control" id="emp-role" placeholder="Ej. Pastelera o Repartidor" required>
                        </div>
                        <div class="mb-3">
                            <label for="emp-rate" class="form-label">Tarifa por Hora de Trabajo ($)</label>
                            <input type="number" class="form-control" id="emp-rate" min="0.01" step="any" placeholder="4.50" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-premium btn-premium-primary w-100 mt-2">
                            <i class="bi bi-plus-circle me-1"></i>Agregar a Plantilla
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Pay Calculation Area (Toggled dynamically) -->
        <div id="payroll-calculator-section" class="card card-premium mt-4 d-none">
            <!-- Will load here via JS -->
        </div>
    `;
    
    // Agregar Empleados
    container.querySelector('#add-employee-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#emp-name').value.trim();
        const role = container.querySelector('#emp-role').value.trim();
        const rate = parseFloat(container.querySelector('#emp-rate').value);
        
        if (!name || !role || isNaN(rate) || rate <= 0) {
            showToast('Formulario de empleado incompleto o incorrecto', 'danger');
            return;
        }
        
        const newEmp = {
            id: 'emp-' + Date.now(),
            name,
            role,
            hourlyRate: rate,
            payments: []
        };
        
        state.employees.push(newEmp);
        saveState();
        showToast(`Empleado ${name} registrado con éxito`, 'success');
        renderPayroll(container);
    });
}

window.payEmployeePrompt = function(id) {
    const emp = state.employees.find(e => e.id === id);
    if (!emp) return;
    
    const calcSection = document.getElementById('payroll-calculator-section');
    calcSection.classList.remove('d-none');
    calcSection.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="fw-bold mb-0 text-success-custom"><i class="bi bi-calculator-fill me-2"></i>Calcular Nómina: ${emp.name}</h4>
            <button class="btn-close" onclick="document.getElementById('payroll-calculator-section').classList.add('d-none')"></button>
        </div>
        <div class="row align-items-end">
            <div class="col-md-4 mb-3">
                <label class="form-label">Horas Laboradas en el Período</label>
                <input type="number" class="form-control" id="calc-hours" min="1" value="40" required>
            </div>
            <div class="col-md-3 mb-3">
                <label class="form-label">Tarifa por Hora ($)</label>
                <input type="text" class="form-control" value="$${emp.hourlyRate.toFixed(2)}" readonly>
            </div>
            <div class="col-md-3 mb-3">
                <label class="form-label">Total a Pagar</label>
                <div class="fs-4 fw-bold text-danger-custom" id="payroll-calc-result">$${(40 * emp.hourlyRate).toFixed(2)}</div>
            </div>
            <div class="col-md-2 mb-3">
                <button class="btn btn-danger btn-premium w-100" id="btn-confirm-payroll-payment">
                    <i class="bi bi-wallet2 me-1"></i>Pagar y Registrar Gasto
                </button>
            </div>
        </div>
    `;
    
    const hoursInput = document.getElementById('calc-hours');
    hoursInput.addEventListener('input', () => {
        const h = parseFloat(hoursInput.value) || 0;
        document.getElementById('payroll-calc-result').innerText = `$${(h * emp.hourlyRate).toFixed(2)}`;
    });
    
    document.getElementById('btn-confirm-payroll-payment').addEventListener('click', () => {
        const h = parseFloat(hoursInput.value);
        if (isNaN(h) || h <= 0) {
            showToast('Las horas trabajadas deben ser un número positivo', 'danger');
            return;
        }
        
        const totalAmount = h * emp.hourlyRate;
        const dateStr = new Date().toISOString().split('T')[0];
        
        emp.payments.push({
            date: dateStr,
            hours: h,
            amount: totalAmount
        });
        
        const newTx = {
            id: 'tx-' + Date.now(),
            date: dateStr,
            type: 'expense',
            category: 'nomina',
            description: `Pago Nómina: ${emp.name} (${h} hrs)`,
            qty: 1,
            price: totalAmount,
            total: totalAmount
        };
        
        state.transactions.push(newTx);
        saveState();
        
        showToast(`Pago por $${totalAmount.toFixed(2)} registrado en gastos de nómina`, 'success');
        calcSection.classList.add('d-none');
        
        renderPayroll(document.getElementById('content-area'));
    });
};

// 6. Reporte de Ingresos
function renderIncomeReport(container) {
    let incomeTotal = 0;
    const categoryTotals = {};
    const incomes = [];
    
    state.transactions.forEach(t => {
        if (t.type === 'income') {
            incomeTotal += t.total;
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.total;
            incomes.push(t);
        }
    });
    
    container.innerHTML = `
        <div class="card card-premium mb-4 bg-success-light border-success-subtle">
            <div class="d-flex align-items-center gap-3">
                <div class="fs-1 text-success-custom"><i class="bi bi-graph-up-arrow"></i></div>
                <div>
                    <h2 class="fw-bold mb-0 text-success-custom">Reporte de Ventas e Ingresos</h2>
                    <p class="text-muted mb-0">Total acumulado de entradas financieras de tu local comercial.</p>
                </div>
            </div>
            <h1 class="fw-black mt-3 mb-0 text-success-custom">$${incomeTotal.toFixed(2)}</h1>
        </div>
        
        <div class="row g-4">
            <!-- Category breakdown -->
            <div class="col-md-5">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold mb-3">Ventas por Categoría</h4>
                    ${Object.keys(categoryTotals).map(cat => {
                        const amt = categoryTotals[cat];
                        const pct = incomeTotal > 0 ? (amt / incomeTotal) * 100 : 0;
                        return `
                            <div class="mb-3">
                                <div class="d-flex justify-content-between text-secondary" style="font-size: 0.85rem;">
                                    <span class="fw-semibold">${categoryNames[cat] || cat}</span>
                                    <span>$${amt.toFixed(2)} (${pct.toFixed(1)}%)</span>
                                </div>
                                <div class="progress mt-1" style="height: 8px;">
                                    <div class="progress-bar bg-success" style="width: ${pct}%"></div>
                                </div>
                            </div>
                        `;
                    }).join('') || '<p class="text-muted text-center py-4">No hay registros de ingresos.</p>'}
                </div>
            </div>
            
            <!-- Incomes list -->
            <div class="col-md-7">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold mb-3">Detalle de Ventas</h4>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" style="font-size: 0.9rem;">
                            <thead class="table-light">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th class="text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${incomes.reverse().map(t => `
                                    <tr>
                                        <td>${t.date}</td>
                                        <td>
                                            <div class="fw-bold">${t.description}</div>
                                            <small class="text-muted">${categoryNames[t.category] || t.category} • Cant: ${t.qty}</small>
                                        </td>
                                        <td class="text-end fw-bold text-success-custom">$${t.total.toFixed(2)}</td>
                                    </tr>
                                `).join('') || '<tr><td colspan="3" class="text-center text-muted py-4">Sin ingresos registrados.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// 7. Reporte de Egresos
function renderExpenseReport(container) {
    let expenseTotal = 0;
    const categoryTotals = {};
    const expenses = [];
    
    state.transactions.forEach(t => {
        if (t.type === 'expense') {
            expenseTotal += t.total;
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.total;
            expenses.push(t);
        }
    });
    
    container.innerHTML = `
        <div class="card card-premium mb-4 bg-danger-light border-danger-subtle">
            <div class="d-flex align-items-center gap-3">
                <div class="fs-1 text-danger-custom"><i class="bi bi-graph-down-arrow"></i></div>
                <div>
                    <h2 class="fw-bold mb-0 text-danger-custom">Reporte de Costos y Egresos</h2>
                    <p class="text-muted mb-0">Total acumulado de salidas y gastos operativos del negocio.</p>
                </div>
            </div>
            <h1 class="fw-black mt-3 mb-0 text-danger-custom">$${expenseTotal.toFixed(2)}</h1>
        </div>
        
        <div class="row g-4">
            <!-- Category breakdown -->
            <div class="col-md-5">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold mb-3">Gastos por Categoría</h4>
                    ${Object.keys(categoryTotals).map(cat => {
                        const amt = categoryTotals[cat];
                        const pct = expenseTotal > 0 ? (amt / expenseTotal) * 100 : 0;
                        return `
                            <div class="mb-3">
                                <div class="d-flex justify-content-between text-secondary" style="font-size: 0.85rem;">
                                    <span class="fw-semibold">${categoryNames[cat] || cat}</span>
                                    <span>$${amt.toFixed(2)} (${pct.toFixed(1)}%)</span>
                                </div>
                                <div class="progress mt-1" style="height: 8px;">
                                    <div class="progress-bar bg-danger" style="width: ${pct}%"></div>
                                </div>
                            </div>
                        `;
                    }).join('') || '<p class="text-muted text-center py-4">No hay registros de egresos.</p>'}
                </div>
            </div>
            
            <!-- Expenses list -->
            <div class="col-md-7">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold mb-3">Detalle de Costos</h4>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" style="font-size: 0.9rem;">
                            <thead class="table-light">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th class="text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${expenses.reverse().map(t => `
                                    <tr>
                                        <td>${t.date}</td>
                                        <td>
                                            <div class="fw-bold">${t.description}</div>
                                            <small class="text-muted">${categoryNames[t.category] || t.category} • Cant: ${t.qty}</small>
                                        </td>
                                        <td class="text-end fw-bold text-danger-custom">$${t.total.toFixed(2)}</td>
                                    </tr>
                                `).join('') || '<tr><td colspan="3" class="text-center text-muted py-4">Sin egresos registrados.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 
// 8. Planificador de Presupuestos
function renderBudgets(container) {
    container.innerHTML = `
        <div class="card card-premium mb-4">
            <h2 class="fw-bold mb-1"><i class="bi bi-wallet2 me-2"></i>Límites de Presupuesto Mensual</h2>
            <p class="text-muted">Establece límites financieros máximos de egresos para evitar pérdidas operativas y recibir alertas automáticas.</p>
            
            <form id="budget-settings-form" class="row g-3 mt-2">
                <div class="col-md-6 col-lg-3">
                    <label for="limit-materia" class="form-label">Materia Prima / Insumos ($)</label>
                    <input type="number" class="form-control" id="limit-materia" value="${state.budgets['materia-prima']}" min="0" required>
                </div>
                <div class="col-md-6 col-lg-3">
                    <label for="limit-servicios" class="form-label">Servicios & Combustibles ($)</label>
                    <input type="number" class="form-control" id="limit-servicios" value="${state.budgets['servicios']}" min="0" required>
                </div>
                <div class="col-md-6 col-lg-3">
                    <label for="limit-nomina" class="form-label">Nómina de Empleados ($)</label>
                    <input type="number" class="form-control" id="limit-nomina" value="${state.budgets['nomina']}" min="0" required>
                </div>
                <div class="col-md-6 col-lg-3">
                    <label for="limit-otros" class="form-label">Gastos Varios / Otros ($)</label>
                    <input type="number" class="form-control" id="limit-otros" value="${state.budgets['otros']}" min="0" required>
                </div>
                <div class="col-12 mt-3 text-end">
                    <button type="submit" class="btn btn-primary btn-premium btn-premium-primary">
                        <i class="bi bi-save me-1"></i>Actualizar Presupuestos
                    </button>
                </div>
            </form>
        </div>
        
        <h4 class="fw-bold mb-3"><i class="bi bi-shield-check me-2"></i>Estado de Límites de Gasto</h4>
        <div class="row g-4" id="budget-indicators">
            <!-- Loaded dynamically in budgetRenderIndicators -->
        </div>
    `;
    
    function budgetRenderIndicators() {
        const indicatorContainer = container.querySelector('#budget-indicators');
        
        const categoryTitles = {
            'materia-prima': 'Materia Prima / Insumos',
            'servicios': 'Servicios Básicos & Combustible',
            'nomina': 'Nómina de Personal',
            'otros': 'Gastos Varios'
        };
        
        indicatorContainer.innerHTML = Object.keys(state.budgets).map(categoryKey => {
            let spent = 0;
            state.transactions.forEach(t => {
                if (t.type === 'expense' && getBudgetCategory(t.category) === categoryKey) {
                    spent += t.total;
                }
            });
            
            const limit = state.budgets[categoryKey];
            const pct = Math.min((spent / limit) * 100, 100);
            
            let statusBadge = '';
            let cardBorder = '';
            
            if (spent >= limit) {
                statusBadge = '<span class="badge bg-danger text-white">LÍMITE EXCEDIDO</span>';
                cardBorder = 'border-danger';
            } else if (pct >= 80) {
                statusBadge = '<span class="badge bg-warning text-dark">ALERTA 80%</span>';
                cardBorder = 'border-warning';
            } else {
                statusBadge = '<span class="badge bg-success text-white">PRESUPUESTO SANO</span>';
            }
            
            return `
                <div class="col-md-6 col-lg-3">
                    <div class="card card-premium ${cardBorder} h-100 d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="fw-bold text-secondary" style="font-size: 0.9rem;">${categoryNames[categoryKey] || categoryTitles[categoryKey]}</span>
                                ${statusBadge}
                            </div>
                            <h3 class="fw-bold text-primary mb-1">$${spent.toFixed(2)}</h3>
                            <p class="text-muted mb-3" style="font-size: 0.8rem;">Establecido: $${limit.toFixed(2)}</p>
                        </div>
                        
                        <div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar ${spent >= limit ? 'bg-danger' : (pct >= 80 ? 'bg-warning' : 'bg-success')}" style="width: ${pct}%"></div>
                            </div>
                            <small class="text-muted d-block text-end mt-1" style="font-size: 0.75rem;">Consumo: ${pct.toFixed(0)}%</small>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    budgetRenderIndicators();

    container.querySelector('#budget-settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        state.budgets['materia-prima'] = parseFloat(container.querySelector('#limit-materia').value) || 0;
        state.budgets['servicios'] = parseFloat(container.querySelector('#limit-servicios').value) || 0;
        state.budgets['nomina'] = parseFloat(container.querySelector('#limit-nomina').value) || 0;
        state.budgets['otros'] = parseFloat(container.querySelector('#limit-otros').value) || 0;
        
        saveState();
        showToast('Presupuestos actualizados con éxito', 'success');
        budgetRenderIndicators();
    });
}

// 
// 9. Calculadora de Ganancias
function renderMarginCalculator(container) {
    container.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="card card-premium h-100">
                    <h3 class="fw-bold mb-1"><i class="bi bi-calculator me-2"></i>Calculadora de Margen de Ganancia</h3>
                    <p class="text-muted mb-4">Calcula el precio de venta ideal de tu producto o servicio para asegurar la rentabilidad de tu negocio.</p>
                    
                    <div class="mb-3">
                        <label for="calc-cost" class="form-label">Costo de Producción / Adquisición ($)</label>
                        <input type="number" class="form-control form-control-lg" id="calc-cost" min="0.01" step="any" placeholder="0.00" value="10.00">
                    </div>
                    <div class="mb-3">
                        <label for="calc-margin" class="form-label">Porcentaje de Ganancia Deseado (%)</label>
                        <input type="number" class="form-control form-control-lg" id="calc-margin" min="1" max="500" value="30">
                    </div>
                </div>
            </div>
            
            <div class="col-lg-6">
                <div class="card card-premium bg-primary-light border-primary-subtle h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h4 class="fw-bold text-primary mb-3"><i class="bi bi-list-stars me-2"></i>Precio Sugerido de Venta</h4>
                        
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-secondary fw-semibold">Ganancia Neta por Venta:</span>
                            <span class="fs-4 fw-bold text-success-custom" id="result-profit">$3.00</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-secondary fw-semibold">Precio de Venta Sugerido:</span>
                            <span class="fs-3 fw-bold text-primary" id="result-selling">$13.00</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="text-secondary fw-semibold">Con IVA Incluido (15% Ecuador):</span>
                            <span class="fs-2 fw-black text-primary" id="result-iva">$14.95</span>
                        </div>
                    </div>
                    
                    <div class="border-top border-primary-subtle pt-3 mt-3">
                        <small class="text-muted d-block"><i class="bi bi-info-circle me-1"></i><strong>Consejo Financiero:</strong> El precio sugerido se calcula dividiendo el costo para (1 - Margen %), que es la fórmula estándar de margen sobre precio de venta, no sobre costo.</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const costInput = container.querySelector('#calc-cost');
    const marginInput = container.querySelector('#calc-margin');
    
    function runMargenCalc() {
        const cost = parseFloat(costInput.value) || 0;
        const margin = parseFloat(marginInput.value) || 0;
        
        if (cost <= 0 || margin < 0 || margin >= 100) {
            container.querySelector('#result-profit').innerText = '$0.00';
            container.querySelector('#result-selling').innerText = '$0.00';
            container.querySelector('#result-iva').innerText = '$0.00';
            return;
        }

        const sellingPrice = cost / (1 - (margin / 100));
        const profit = sellingPrice - cost;
        const sellingWithIva = sellingPrice * 1.15; // 15% IVA Ecuador
        
        container.querySelector('#result-profit').innerText = `$${profit.toFixed(2)}`;
        container.querySelector('#result-selling').innerText = `$${sellingPrice.toFixed(2)}`;
        container.querySelector('#result-iva').innerText = `$${sellingWithIva.toFixed(2)}`;
    }
    
    costInput.addEventListener('input', runMargenCalc);
    marginInput.addEventListener('input', runMargenCalc);
    
    runMargenCalc();
}


// 10. Calculadora de Impuestos
function renderTaxCalculator(container) {
    let totalIncomes = 0;
    state.transactions.forEach(t => { if (t.type === 'income') totalIncomes += t.total; });
    
    container.innerHTML = `
        <div class="card card-premium mb-4">
            <h2 class="fw-bold mb-1"><i class="bi bi-percent me-2"></i>Calculadora de Impuestos de Ecuador</h2>
            <p class="text-muted">Estima tus obligaciones fiscales de acuerdo al nuevo Régimen RIMPE (Negocios Populares / Emprendedores) y el IVA (15%).</p>
            
            <div class="row mt-4 align-items-center">
                <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">Tus Ingresos Registrados Actuales en la App:</label>
                    <div class="fs-2 fw-black text-success-custom">$${totalIncomes.toFixed(2)}</div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="projected-annual-income" class="form-label">Ingreso Anual Proyectado / Estimado ($)</label>
                    <input type="number" class="form-control form-control-lg" id="projected-annual-income" value="${(totalIncomes * 12 || 12000).toFixed(2)}" placeholder="12000">
                </div>
            </div>
        </div>
        
        <div class="row g-4">
            <!-- Rimpe card -->
            <div class="col-md-6">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold text-primary mb-3"><i class="bi bi-diagram-3 me-2"></i>Régimen RIMPE</h4>
                    <div class="mb-3">
                        <span class="text-muted d-block mb-1">Rango del Impuesto:</span>
                        <strong class="fs-5 text-secondary" id="rimpe-regimen">Rimpe Negocios Populares</strong>
                    </div>
                    <div class="mb-3">
                        <span class="text-muted d-block mb-1">Impuesto Anual Estimado a Pagar al SRI:</span>
                        <strong class="fs-3 text-danger-custom" id="rimpe-tax-value">$5.00</strong>
                    </div>
                    <small class="text-muted d-block mt-3"><i class="bi bi-info-circle me-1"></i>El Régimen RIMPE grava a Negocios Populares (ingresos hasta $20,000) con cuotas progresivas fijas desde $0 hasta $60. Ingresos de $20,001 a $300,000 tributan como RIMPE Emprendedores.</small>
                </div>
            </div>
            
            <!-- IVA card -->
            <div class="col-md-6">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold text-primary mb-3"><i class="bi bi-receipt me-2"></i>Diferencial de IVA (15%)</h4>
                    
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-secondary">IVA Cobrado (15% en Ventas):</span>
                        <span class="fw-bold text-success-custom" id="iva-collected">$0.00</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-secondary">IVA Pagado (15% en Gastos):</span>
                        <span class="fw-bold text-danger-custom" id="iva-paid">$0.00</span>
                    </div>
                    <hr class="my-2">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="fw-bold text-secondary">Saldo Neto IVA a Declarar:</span>
                        <span class="fs-4 fw-black text-primary" id="iva-net">$0.00</span>
                    </div>
                    <small class="text-muted d-block"><i class="bi bi-info-circle me-1"></i>Cálculo estimado basado en el 15% del total de ingresos y egresos registrados actualmente en la aplicación.</small>
                </div>
            </div>
        </div>
    `;
    
    const projectedInput = container.querySelector('#projected-annual-income');
    
    function calculateSRITaxes() {
        const annualIncome = parseFloat(projectedInput.value) || 0;
        
        let regimen = 'RIMPE Excluido (Sujeto a Régimen General)';
        let tax = 0;
        
        // SRI
        if (annualIncome <= 2500) {
            regimen = 'RIMPE Negocios Populares';
            tax = 0;
        } else if (annualIncome <= 5000) {
            regimen = 'RIMPE Negocios Populares';
            tax = 5;
        } else if (annualIncome <= 10000) {
            regimen = 'RIMPE Negocios Populares';
            tax = 15;
        } else if (annualIncome <= 15000) {
            regimen = 'RIMPE Negocios Populares';
            tax = 35;
        } else if (annualIncome <= 20000) {
            regimen = 'RIMPE Negocios Populares';
            tax = 60;
        } else if (annualIncome <= 300000) {
            regimen = 'RIMPE Emprendedores';
            // Tabla Progresiva Simple
            if (annualIncome <= 75000) {
                tax = (annualIncome - 20000) * 0.01 + 60;
            } else {
                tax = (annualIncome - 75000) * 0.02 + 610;
            }
        }
        
        container.querySelector('#rimpe-regimen').innerText = regimen;
        container.querySelector('#rimpe-tax-value').innerText = `$${tax.toFixed(2)}`;
        
        // Calcula el iva en tiempo real
        let collectedIva = 0;
        let paidIva = 0;
        
        state.transactions.forEach(t => {

            if (t.category !== 'nomina' && t.category !== 'servicios-basicos') {
                if (t.type === 'income') {

                    collectedIva += t.total - (t.total / 1.15);
                } else {
                    paidIva += t.total - (t.total / 1.15);
                }
            }
        });
        
        const netIva = collectedIva - paidIva;
        
        container.querySelector('#iva-collected').innerText = `$${collectedIva.toFixed(2)}`;
        container.querySelector('#iva-paid').innerText = `$${paidIva.toFixed(2)}`;
        container.querySelector('#iva-net').innerText = (netIva >= 0 ? '+' : '') + `$${netIva.toFixed(2)}`;
        container.querySelector('#iva-net').className = `fs-4 fw-black ${netIva >= 0 ? 'text-primary' : 'text-success-custom'}`;
    }
    
    projectedInput.addEventListener('input', calculateSRITaxes);
    
    calculateSRITaxes();
}


// 11. Planes de Ahorro
function renderSavingGoals(container) {
    container.innerHTML = `
        <div class="row g-4">
            <!-- Add Goal form -->
            <div class="col-lg-5">
                <div class="card card-premium">
                    <h3 class="fw-bold mb-1"><i class="bi bi-piggy-bank me-2"></i>Nueva Meta de Ahorro</h3>
                    <p class="text-muted mb-3">Define objetivos específicos para invertir en herramientas o infraestructura de tu negocio.</p>
                    
                    <form id="add-goal-form" novalidate>
                        <div class="mb-3">
                            <label for="goal-name" class="form-label">Nombre del Objetivo</label>
                            <input type="text" class="form-control" id="goal-name" placeholder="Ej. Horno Pastelero Nuevo" required>
                        </div>
                        <div class="mb-3">
                            <label for="goal-target" class="form-label">Monto Objetivo ($)</label>
                            <input type="number" class="form-control" id="goal-target" min="1" step="any" placeholder="850.00" required>
                        </div>
                        <div class="mb-3">
                            <label for="goal-date" class="form-label">Fecha Límite</label>
                            <input type="date" class="form-control" id="goal-date" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-premium btn-premium-primary w-100 mt-2">
                            <i class="bi bi-plus-circle me-1"></i>Crear Meta
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Goals List -->
            <div class="col-lg-7">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold mb-3"><i class="bi bi-clipboard-data me-2"></i>Metas Activas</h4>
                    
                    <div class="d-flex flex-column gap-3" id="goals-list-container">
                        <!-- Rendered by savingsRenderGoalsList -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const listContainer = container.querySelector('#goals-list-container');
    
    function savingsRenderGoalsList() {
        listContainer.innerHTML = state.savingsGoals.map(goal => {
            const pct = Math.min((goal.currentSavings / goal.targetAmount) * 100, 100);
            return `
                <div class="border rounded p-3 shadow-sm bg-secondary-custom">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h5 class="fw-bold mb-0 text-primary">${goal.name}</h5>
                            <small class="text-muted"><i class="bi bi-calendar-event me-1"></i>Límite: ${goal.targetDate}</small>
                        </div>
                        <div class="text-end">
                            <strong class="fs-5 text-secondary">$${goal.currentSavings.toFixed(2)}</strong>
                            <small class="text-muted d-block">Meta: $${goal.targetAmount.toFixed(2)}</small>
                        </div>
                    </div>
                    
                    <div class="progress mb-3" style="height: 10px; border-radius: 5px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    
                    <!-- Actions -->
                    <div class="row g-2 align-items-center">
                        <div class="col-sm-6 col-md-5">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" placeholder="Monto" id="input-amt-${goal.id}" min="0.01" step="any">
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-7 d-flex gap-1 justify-content-end">
                            <button class="btn btn-sm btn-success btn-premium" onclick="depositSavings('${goal.id}')"><i class="bi bi-plus"></i> Ahorrar</button>
                            <button class="btn btn-sm btn-outline-danger btn-premium" onclick="withdrawSavings('${goal.id}')"><i class="bi bi-dash"></i> Retirar</button>
                            <button class="btn btn-sm btn-outline-secondary btn-premium" onclick="deleteSavingGoal('${goal.id}')" title="Eliminar"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
        }).join('') || '<p class="text-muted text-center py-5">No has definido metas de ahorro aún.</p>';
    }
    
    savingsRenderGoalsList();
    
    container.querySelector('#add-goal-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#goal-name').value.trim();
        const target = parseFloat(container.querySelector('#goal-target').value);
        const date = container.querySelector('#goal-date').value;
        
        if (!name || isNaN(target) || target <= 0 || !date) {
            showToast('Por favor completa todos los campos del objetivo de ahorro', 'danger');
            return;
        }
        
        const newGoal = {
            id: 'goal-' + Date.now(),
            name,
            targetAmount: target,
            currentSavings: 0,
            targetDate: date
        };
        
        state.savingsGoals.push(newGoal);
        saveState();
        showToast(`Meta "${name}" creada exitosamente`, 'success');
        
        renderSavingGoals(container);
    });
    
    window.depositSavings = function(id) {
        const goal = state.savingsGoals.find(g => g.id === id);
        const input = document.getElementById(`input-amt-${id}`);
        const val = parseFloat(input.value);
        
        if (isNaN(val) || val <= 0) {
            showToast('Por favor ingresa un monto válido para depositar', 'danger');
            return;
        }
        
        goal.currentSavings += val;
        saveState();
        showToast(`Aporte de $${val.toFixed(2)} registrado en "${goal.name}"`, 'success');
        renderSavingGoals(container);
    };
    
    window.withdrawSavings = function(id) {
        const goal = state.savingsGoals.find(g => g.id === id);
        const input = document.getElementById(`input-amt-${id}`);
        const val = parseFloat(input.value);
        
        if (isNaN(val) || val <= 0) {
            showToast('Por favor ingresa un monto válido para retirar', 'danger');
            return;
        }
        
        if (val > goal.currentSavings) {
            showToast('No tienes suficientes ahorros acumulados en esta meta', 'danger');
            return;
        }
        
        goal.currentSavings -= val;
        saveState();
        showToast(`Retiro de $${val.toFixed(2)} registrado de "${goal.name}"`, 'warning');
        renderSavingGoals(container);
    };
    
    window.deleteSavingGoal = function(id) {
        state.savingsGoals = state.savingsGoals.filter(g => g.id !== id);
        saveState();
        showToast('Meta de ahorro eliminada', 'warning');
        renderSavingGoals(container);
    };
}


// 12. Caja Diaria
function renderCashRegister(container) {
    let sessionHtml = '';
    
    if (!state.cashRegister.isOpen) {
        sessionHtml = `
            <div class="text-center py-5">
                <i class="bi bi-lock text-muted" style="font-size: 4rem;"></i>
                <h4 class="fw-bold mt-3">La Caja Diaria está Cerrada</h4>
                <p class="text-muted">Abre la caja para registrar el balance de inicio del día y llevar control del flujo de caja físico.</p>
                
                <div class="row justify-content-center mt-4">
                    <div class="col-md-5">
                        <div class="card card-premium text-start">
                            <form id="open-cash-form">
                                <div class="mb-3">
                                    <label for="open-balance" class="form-label">Monto de Apertura (Efectivo en Caja $)</label>
                                    <input type="number" class="form-control form-control-lg text-center fw-bold" id="open-balance" min="0" value="50.00" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-premium btn-premium-primary w-100">
                                    <i class="bi bi-unlock-fill me-2"></i>Abrir Caja Diaria
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {

        let cashIn = 0;
        let cashOut = 0;
        
        state.cashRegister.transactions.forEach(t => {
            if (t.type === 'income') cashIn += t.total;
            else cashOut += t.total;
        });
        
        const expectedBalance = state.cashRegister.openingBalance + cashIn - cashOut;
        
        sessionHtml = `
            <div class="card card-premium mb-4 bg-success-light border-success-subtle">
                <div class="d-flex justify-content-between align-items-center flex-wrap g-3">
                    <div>
                        <span class="badge bg-success text-white mb-2">SESIÓN DE CAJA ACTIVA</span>
                        <h3 class="fw-bold mb-0 text-success-custom"><i class="bi bi-unlock-fill me-2"></i>Caja Abierta: ${state.cashRegister.openDate}</h3>
                    </div>
                    <div class="text-end">
                        <small class="text-muted">Fondo Inicial:</small>
                        <h4 class="fw-bold text-success-custom">$${state.cashRegister.openingBalance.toFixed(2)}</h4>
                    </div>
                </div>
            </div>
            
            <div class="row g-4">
                <!-- Status Details -->
                <div class="col-lg-5">
                    <div class="card card-premium h-100">
                        <h4 class="fw-bold mb-3"><i class="bi bi-calculator me-2"></i>Flujo y Arqueo de Caja</h4>
                        
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-secondary">Fondo de Apertura (Efectivo):</span>
                            <strong>$${state.cashRegister.openingBalance.toFixed(2)}</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-success-custom">(+) Ventas Registradas:</span>
                            <strong class="text-success-custom">+$${cashIn.toFixed(2)}</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-danger-custom">(-) Gastos Registrados:</span>
                            <strong class="text-danger-custom">-$${cashOut.toFixed(2)}</strong>
                        </div>
                        <hr class="my-2">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <span class="fw-bold text-secondary">Efectivo Esperado en Caja:</span>
                            <span class="fs-4 fw-bold text-primary">$${expectedBalance.toFixed(2)}</span>
                        </div>
                        
                        <!-- Close form -->
                        <form id="close-cash-form">
                            <div class="mb-3">
                                <label for="actual-balance" class="form-label fw-bold">Efectivo Real al Contar la Caja ($)</label>
                                <input type="number" class="form-control form-control-lg text-center text-primary fw-black" id="actual-balance" min="0" step="any" value="${expectedBalance.toFixed(2)}" required>
                            </div>
                            <div class="mb-3">
                                <label for="close-notes" class="form-label">Notas del Cierre (Opcional)</label>
                                <textarea class="form-control" id="close-notes" rows="2" placeholder="Ej. Faltaron $0.50 centavos por cambio..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-danger btn-premium w-100">
                                <i class="bi bi-lock-fill me-2"></i>Cerrar Caja y Registrar Cuadre
                            </button>
                        </form>
                    </div>
                </div>
                
                <!-- Session txs -->
                <div class="col-lg-7">
                    <div class="card card-premium h-100">
                        <h4 class="fw-bold mb-3"><i class="bi bi-receipt me-2"></i>Movimientos del Turno</h4>
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0" style="font-size: 0.9rem;">
                                <thead class="table-light">
                                    <tr>
                                        <th>Detalle</th>
                                        <th>Categoría</th>
                                        <th class="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${state.cashRegister.transactions.map(t => `
                                        <tr>
                                            <td>
                                                <div class="fw-bold">${t.description}</div>
                                                <small class="text-muted">${t.qty} un • $${t.price.toFixed(2)}</small>
                                            </td>
                                            <td>
                                                <span class="badge badge-custom ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">
                                                    ${categoryNames[t.category] || t.category}
                                                </span>
                                            </td>
                                            <td class="text-end fw-bold ${t.type === 'income' ? 'text-success-custom' : 'text-danger-custom'}">
                                                ${t.type === 'income' ? '+' : '-'}$${t.total.toFixed(2)}
                                            </td>
                                        </tr>
                                    `).join('') || '<tr><td colspan="3" class="text-center text-muted py-4">No se han registrado movimientos desde la apertura de caja.</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="card card-premium mb-4">
            <h2 class="fw-bold mb-1"><i class="bi bi-cash-coin me-2"></i>Caja Diaria y Cuadre de Caja</h2>
            <p class="text-muted">Apertura, arqueo y cierre diario para controlar que el efectivo físico coincida con tu balance del sistema.</p>
        </div>
        <div id="cash-session-area">${sessionHtml}</div>
    `;
    
    if (!state.cashRegister.isOpen) {
        container.querySelector('#open-cash-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const bal = parseFloat(container.querySelector('#open-balance').value);
            if (isNaN(bal) || bal < 0) {
                showToast('Monto de apertura no válido', 'danger');
                return;
            }
            
            state.cashRegister = {
                isOpen: true,
                openingBalance: bal,
                transactions: [],
                openDate: new Date().toLocaleString(),
                notes: ''
            };
            
            saveState();
            showToast('¡Caja Diaria abierta con éxito!', 'success');
            renderCashRegister(container);
        });
    } else {
        container.querySelector('#close-cash-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const actual = parseFloat(container.querySelector('#actual-balance').value);
            const notes = container.querySelector('#close-notes').value.trim();
            
            if (isNaN(actual) || actual < 0) {
                showToast('Monto de cierre no válido', 'danger');
                return;
            }
            
            let cashIn = 0;
            let cashOut = 0;
            state.cashRegister.transactions.forEach(t => {
                if (t.type === 'income') cashIn += t.total;
                else cashOut += t.total;
            });
            const expected = state.cashRegister.openingBalance + cashIn - cashOut;
            const diff = actual - expected;
            
            if (diff === 0) {
                showToast('¡Cierre exitoso! La caja cuadró perfectamente.', 'success');
            } else if (diff > 0) {
                showToast(`Cierre registrado. Caja con Sobrante de $${diff.toFixed(2)}`, 'warning');
            } else {
                showToast(`Cierre registrado. Caja con Faltante de $${Math.abs(diff).toFixed(2)}`, 'danger');
            }
            
            state.cashRegister = {
                isOpen: false,
                openingBalance: 0,
                transactions: [],
                openDate: null,
                notes: ''
            };
            
            saveState();
            renderCashRegister(container);
        });
    }
}


// 13. Preguntas FAQ
function renderFAQ(container) {
    container.innerHTML = `
        <div class="card card-premium mb-4">
            <h2 class="fw-bold mb-1"><i class="bi bi-question-octagon-fill me-2"></i>Preguntas Frecuentes</h2>
            <p class="text-muted mb-0">Consejos de educación financiera y guías para tu microempresa.</p>
        </div>
        
        <div class="accordion" id="faqAccordion">
            <!-- Item 1 -->
            <div class="accordion-item card card-premium p-0 mb-3" style="border: 1px solid var(--border-color); overflow:hidden;">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button fw-bold text-primary bg-transparent" style="box-shadow:none;" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ¿Por qué es un error mezclar el dinero diario del negocio con el dinero personal?
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-secondary" style="font-size: 0.95rem;">
                        Es el error número uno de los microempresarios. Al gastar el dinero de la caja diaria en gastos familiares (comida, alquiler familiar, ocio), se consume silenciosamente el <strong>capital operativo</strong> (dinero para recomprar harina, repuestos, telas). Esto provoca que el negocio se descapitalice y colapse aunque tenga muchas ventas.
                    </div>
                </div>
            </div>
            
            <!-- Item 2 -->
            <div class="accordion-item card card-premium p-0 mb-3" style="border: 1px solid var(--border-color); overflow:hidden;">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed fw-bold text-primary bg-transparent" style="box-shadow:none;" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        ¿Qué es el Capital Operativo o Capital de Trabajo?
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-secondary" style="font-size: 0.95rem;">
                        Es el dinero necesario para que el negocio funcione día a día. En una panadería, es el dinero para comprar los sacos de harina, azúcar y pagar la luz del horno. Si no proteges este capital, no podrás producir al día siguiente. La app te ayuda a ver tu <strong>saldo neto</strong> real, restando costos para saber cuánto dinero es verdaderamente ganancia.
                    </div>
                </div>
            </div>
            
            <!-- Item 3 -->
            <div class="accordion-item card card-premium p-0 mb-3" style="border: 1px solid var(--border-color); overflow:hidden;">
                <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed fw-bold text-primary bg-transparent" style="box-shadow:none;" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        ¿Cómo funciona la sección de Nómina de la aplicación?
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-secondary" style="font-size: 0.95rem;">
                        Permite registrar a tus colaboradores (empleados) y asignarles una tarifa de cobro por hora. Al ingresar las horas trabajadas en el período, la app calcula el sueldo a pagar y, al confirmar el pago, genera automáticamente una transacción de <strong>egreso bajo la categoría de Nómina</strong> en el historial financiero, facilitando el control de mano de obra.
                    </div>
                </div>
            </div>
            
            <!-- Item 4 -->
            <div class="accordion-item card card-premium p-0 mb-3" style="border: 1px solid var(--border-color); overflow:hidden;">
                <h2 class="accordion-header" id="headingFour">
                    <button class="accordion-button collapsed fw-bold text-primary bg-transparent" style="box-shadow:none;" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        ¿Qué es el régimen tributario RIMPE en Ecuador y cómo aplica a mi negocio?
                    </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-secondary" style="font-size: 0.95rem;">
                        El SRI (Servicio de Rentas Internas) clasifica a las personas naturales con ingresos anuales de hasta $20,000 como **RIMPE Negocios Populares**, quienes pagan una cuota fija al año (ej. $60 si ganan de 15k a 20k) y no deben declarar IVA. Negocios con ventas de $20,001 a $300,000 se clasifican como **RIMPE Emprendedores** y declaran IVA semestralmente y pagan impuesto progresivo según tabla del SRI.
                    </div>
                </div>
            </div>
            
            <!-- Item 5 -->
            <div class="accordion-item card card-premium p-0" style="border: 1px solid var(--border-color); overflow:hidden;">
                <h2 class="accordion-header" id="headingFive">
                    <button class="accordion-button collapsed fw-bold text-primary bg-transparent" style="box-shadow:none;" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        ¿Dónde se guardan mis datos y cómo puedo respaldarlos?
                    </button>
                </h2>
                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                    <div class="accordion-body text-secondary" style="font-size: 0.95rem;">
                        Todos tus movimientos se almacenan de forma local en tu navegador mediante <strong>LocalStorage</strong>. Esto significa que si cierras o recargas la página, tus datos seguirán allí. Para evitar pérdidas si cambias de computador, ve a la sección de <strong>Configuración y Datos</strong> para descargar una copia de seguridad en archivo JSON y cargarla cuando desees.
                    </div>
                </div>
            </div>
        </div>
    `;
}


// 14. EL EQUIPOOOO
function renderTeamInfo(container) {
    container.innerHTML = `
        <div class="card card-premium text-center mb-4 py-5 bg-primary-light border-primary-subtle">
            <h1 class="fw-black text-primary">Proyecto Web Integrador</h1>
            <p class="lead text-secondary">Evaluación Final de la Asignatura: <strong>Lenguaje Frontend</strong></p>
            <span class="badge bg-primary text-white py-2 px-3 fs-6">Semestre: Cuarto (4to) - Ciclo I - 2025/2026</span>
        </div>
        
        <div class="row g-4">
            <!-- Member 1 -->
            <div class="col-md-6">
                <div class="card card-premium text-center">
                    <div class="d-flex justify-content-center mb-3">
                        <div class="rounded-circle d-flex-center bg-primary text-white fs-1 shadow-sm" style="width: 80px; height: 80px;">
                            JC
                        </div>
                    </div>
                    <h3 class="fw-bold mb-1">Juan Cruz</h3>
                    <p class="text-primary fw-semibold">Desarrollador Frontend</p>
                    <hr class="my-3">
                    <p class="text-secondary" style="font-size: 0.9rem;">Estudiante de la carrera de Tecnología Superior en Desarrollo de Software. Co-autor de la lógica de negocio, enrutador SPA y persistencia LocalStorage.</p>
                </div>
            </div>
            
            <!-- Member 2 -->
            <div class="col-md-6">
                <div class="card card-premium text-center">
                    <div class="d-flex justify-content-center mb-3">
                        <div class="rounded-circle d-flex-center bg-primary text-white fs-1 shadow-sm" style="width: 80px; height: 80px;">
                            FF
                        </div>
                    </div>
                    <h3 class="fw-bold mb-1">Franklin Fierro</h3>
                    <p class="text-primary fw-semibold">Diseñador UI/UX & CSS</p>
                    <hr class="my-3">
                    <p class="text-secondary" style="font-size: 0.9rem;">Estudiante de la carrera de Tecnología Superior en Desarrollo de Software. Co-autor del diseño responsivo, estilización CSS premium y modo claro/oscuro.</p>
                </div>
            </div>
        </div>
        
        <div class="card card-premium mt-4 text-center">
            <h5 class="fw-bold mb-2">Información Institucional</h5>
            <p class="mb-1 text-secondary"><strong>Instituto:</strong> Instituto Superior Tecnológico Liceo Cristiano</p>
            <p class="mb-1 text-secondary"><strong>Docente Tutor:</strong> Ing. Richard Suárez Jácome</p>
            <p class="mb-0 text-secondary"><strong>Fecha de Exposición:</strong> 15 de Junio, 2026</p>
        </div>
    `;
}


// 15. Configuración de Datos
function renderSettings(container) {
    container.innerHTML = `
        <div class="card card-premium mb-4">
            <h2 class="fw-bold mb-1"><i class="bi bi-sliders me-2"></i>Configuración y Centro de Control</h2>
            <p class="text-muted">Gestiona el aspecto visual de la aplicación, respalda tu información o reinicia el sistema.</p>
        </div>
        
        <div class="row g-4">
            <!-- Visual preferences -->
            <div class="col-md-6">
                <div class="card card-premium h-100">
                    <h4 class="fw-bold mb-3"><i class="bi bi-palette me-2"></i>Preferencias Visuales</h4>
                    <p class="text-muted">Alterna el esquema de colores de la interfaz de usuario para trabajar cómodamente.</p>
                    <button class="btn btn-outline-primary btn-premium py-2" id="settings-theme-toggle-btn">
                        <i class="bi bi-moon-stars me-2"></i>Alternar Modo Claro / Oscuro
                    </button>
                </div>
            </div>
            
            <!-- Backup area -->
            <div class="col-md-6">
                <div class="card card-premium h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h4 class="fw-bold mb-3"><i class="bi bi-cloud-arrow-down me-2"></i>Copia de Seguridad</h4>
                        <p class="text-muted">Exporta todas las transacciones, empleados y configuraciones en un archivo para importarlo luego en cualquier navegador.</p>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-premium btn-premium-primary" id="btn-export-data">
                            <i class="bi bi-download me-2"></i>Exportar JSON
                        </button>
                        <button class="btn btn-outline-primary btn-premium" id="btn-import-trigger">
                            <i class="bi bi-upload me-2"></i>Importar JSON
                        </button>
                        <input type="file" id="input-import-file" class="d-none" accept=".json">
                    </div>
                </div>
            </div>
            
            <!-- Danger zone -->
            <div class="col-12">
                <div class="card card-premium border-danger">
                    <h4 class="fw-bold text-danger-custom mb-2"><i class="bi bi-exclamation-octagon-fill me-2"></i>Zona de Peligro</h4>
                    <p class="text-muted">Las siguientes acciones borrarán los datos de forma irreversible. Úsalo con precaución.</p>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-danger btn-premium" id="btn-trigger-reset">
                            <i class="bi bi-trash3 me-1"></i>Reinicio Total (Vaciar App)
                        </button>
                        <button class="btn btn-outline-warning text-dark btn-premium" id="btn-load-seed">
                            <i class="bi bi-arrow-counterclockwise me-1"></i>Restaurar Datos de Prueba
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Alternar el tema
    container.querySelector('#settings-theme-toggle-btn').addEventListener('click', toggleTheme);
    
    container.querySelector('#btn-trigger-reset').addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('confirmResetModal'));
        modal.show();
    });
    
    container.querySelector('#btn-load-seed').addEventListener('click', () => {
        if (confirm('¿Restaurar los datos de demostración de la panadería? Esto sobreescribirá tus datos actuales.')) {
            loadSeedData();
            showToast('Datos de demostración cargados correctamente.', 'success');
            navigateTo('dashboard');
        }
    });
    
    container.querySelector('#btn-export-data').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `respaldo_microfinanzas_${state.businessType}_2026.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast('Copia de seguridad exportada correctamente', 'success');
    });
    
    const importTrigger = container.querySelector('#btn-import-trigger');
    const fileInput = container.querySelector('#input-import-file');
    importTrigger.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const parsed = JSON.parse(evt.target.result);
                
                if (parsed.businessName && Array.isArray(parsed.transactions) && Array.isArray(parsed.employees)) {
                    state = parsed;
                    saveState();
                    showToast('Copia de seguridad restaurada correctamente', 'success');
                    navigateTo('dashboard');
                } else {
                    showToast('Archivo JSON de respaldo inválido o dañado.', 'danger');
                }
            } catch (err) {
                showToast('Error al leer el archivo JSON de respaldo', 'danger');
            }
        };
        reader.readAsText(file);
    });
}

document.getElementById('confirm-reset-btn').addEventListener('click', () => {
    localStorage.removeItem('microfinanzas_ec_state');
    
    state = {
        businessType: 'panaderia',
        businessName: 'Sin configurar',
        theme: 'light',
        transactions: [],
        employees: [],
        budgets: {
            'materia-prima': 500,
            'servicios': 150,
            'nomina': 800,
            'otros': 200
        },
        savingsGoals: [],
        cashRegister: {
            isOpen: false,
            openingBalance: 0,
            transactions: [],
            openDate: null,
            notes: ''
        }
    };
    saveState();

    const modalEl = document.getElementById('confirmResetModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    
    showToast('La aplicación se ha reiniciado por completo.', 'warning');
    navigateTo('business-selector');
});

// Eventos Inicializados
document.addEventListener('DOMContentLoaded', () => {
    initAppState();
    
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('sidebar-toggle');
    const closeSidebarBtn = document.getElementById('sidebar-close');
    
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.add('show');
        });
    }
    
    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }
    
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreen = link.getAttribute('data-screen');
            navigateTo(targetScreen);
        });
    });
    
    navigateTo('dashboard');
});