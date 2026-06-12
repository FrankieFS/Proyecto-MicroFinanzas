
// Controlador del tema Claro/Oscuro
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



// Navegación entre pantallas
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

// PANTALLAS
// DASHBOARD PRINCIPAL
function renderDashboard(container) {
    // Math indicators
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
                        // Calcular cuánto se ha gastado en esta categoría
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


// 7. Eventos y lógica de inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar estado y aplicar tema guardado
    initAppState();
    
    // Configurar botón de toggle de tema
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    
    // Renderizar pantalla inicial (Dashboard)
    navigateTo('dashboard');
});
