# MicroFinanzas EC - Gestión Financiera Inteligente

**MicroFinanzas EC** es una aplicación web de una sola página (SPA) diseñada para ayudar a microempresarios, trabajadores autónomos y locales comerciales en Ecuador (tales como panaderías, restaurantes, talleres mecánicos y tiendas de ropa) a gestionar de forma sencilla, eficiente y ordenada sus finanzas diarias. El objetivo principal del proyecto es solucionar la problemática común de mezclar el dinero diario de ventas con el capital operativo personal, proporcionando herramientas interactivas de control, cálculo y educación financiera.

Este proyecto ha sido desarrollado como la evaluación final (Proyecto Web Integrador) de la asignatura **Lenguaje Frontend** en el **Semestre Cuarto (4to)**.

---

## 👥 Integrantes del Equipo
*   **Juan Cruz** — Co-autor de la lógica de negocio, enrutador dinámico SPA, persistencia de datos local y cálculos tributarios.
*   **Franklin Fierro** — Co-autor del diseño visual, estilización CSS premium, animación, transiciones responsivas y modo claro/oscuro.

---

## 🛠️ Tecnologías Utilizadas
La aplicación está construida utilizando tecnologías frontend estándar y puras para garantizar velocidad, accesibilidad y compatibilidad:

1.  **HTML5 Semántico:** Estructura limpia y accesible de la interfaz de usuario.
2.  **CSS3 Puro Personalizado:** Sistema de diseño con variables HSL para temas claro/oscuro, sombras, bordes redondeados y micro-animaciones dinámicas.
3.  **Bootstrap v5.3.3:** Framework CSS para layouts responsivos estructurados, tipografías y componentes interactivos como modales, tomas de toast y selectores adaptivos.
4.  **Bootstrap Icons v1.11.3:** Set de iconos limpios y modernos.
5.  **Vanilla JavaScript (JS Puro):** Lógica modular completa para enrutamiento SPA, transacciones CRUD, cálculos automatizados y almacenamiento local persistente.
6.  **Web Storage API (LocalStorage):** Persistencia total de datos de transacciones, colaboradores y configuraciones sin base de datos externa.

---

## 📂 Estructura del Proyecto
El proyecto sigue una estructura limpia y fácil de entender:
```text
MicroFinanzas EC/
│
├── index.html          # Estructura principal y plantillas de modales de la SPA
├── css/
│   └── styles.css      # Estilos personalizados (claro/oscuro, sidebar, cards)
├── js/
│   └── app.js          # Cerebro del sistema (Router, CRUD, Calculadoras, Datos Semilla)
├── img/
│   └── logo.png        # Logo de la aplicación
├── pdf proyecto.pdf    # Especificaciones del proyecto académico
└── README.md           # Este documento de especificaciones e instrucciones
```

---

## 🚀 Instrucciones de Instalación y Ejecución
La aplicación no requiere bases de datos locales ni procesos de compilación complejos. Sigue estos pasos para ejecutarla:

1.  **Descarga/Clonación:** Descarga la carpeta comprimida `.zip` y extráela en tu computadora.
2.  **Ejecución:**
    *   **Opción A (Recomendada):** Simplemente haz doble clic sobre el archivo `index.html` para abrirlo directamente en cualquier navegador moderno (Chrome, Edge, Firefox, Safari).
    *   **Opción B (Servidor Local):** Si usas Visual Studio Code, puedes hacer clic derecho en `index.html` y seleccionar **"Open with Live Server"** para ejecutarlo en un servidor de desarrollo local (ej. `http://127.0.0.1:5500/index.html`).

---

## 📌 Detalle de las 15 Pantallas / Funcionalidades Implementadas
La aplicación cuenta con una barra de navegación lateral dinámica para cambiar de pantalla en tiempo real sin recargar la página:

1.  **Dashboard Principal:** Vista general con tarjetas de resumen financiero (Ingresos, Gastos, Saldo Disponible y Gastos de Nómina), historial de transacciones recientes y un monitor de consumo de presupuestos.
2.  **Selector de Negocio:** Permite configurar el nombre del negocio y su tipo de actividad comercial (Panadería, Restaurante, Taller Mecánico, Tienda de Ropa), lo cual adapta de forma automática las categorías de ingresos y gastos predeterminadas.
3.  **Nueva Transacción:** Formulario de registro de movimientos financieros con campos autocalculados (Cantidad x Precio Unitario = Total), validaciones de seguridad nativas (HTML5 + JS) y carga adaptativa de categorías.
4.  **Historial de Movimientos:** Tabla interactiva para administrar transacciones (CRUD: lectura, edición y eliminación mediante modales de confirmación), con un buscador en tiempo real por descripción y filtros por tipo y fecha.
5.  **Nómina de Empleados:** Módulo para administrar colaboradores, registrar horas laboradas, calcular sueldos según tarifa por hora y registrar el gasto directamente en la caja con un solo clic.
6.  **Reporte de Ingresos:** Visualización del acumulado total de ventas del negocio con un análisis gráfico porcentual por categoría.
7.  **Reporte de Egresos:** Visualización del gasto acumulado general con avisos si se sobrepasan los límites estipulados de presupuesto.
8.  **Planificador de Presupuestos:** Configuración de techos de gasto mensuales por categoría (Materia prima, servicios, nómina, otros) con alertas visuales (verde: sano, amarillo: advertencia del 80%, rojo: límite excedido).
9.  **Calculadora de Margen:** Herramienta comercial para ingresar el costo del producto y calcular el precio de venta ideal con el margen deseado, sumándole el IVA del 15% de Ecuador.
10. **Calculadora de Impuestos:** Proyección anual de ingresos con cálculo del impuesto progresivo RIMPE (Régimen Simplificado para Negocios Populares y Emprendedores) y balance neto del diferencial de IVA.
11. **Metas de Ahorro:** Creación de metas financieras con barra de progreso interactiva para depositar y retirar fondos acumulados hacia objetivos del negocio (ej. comprar maquinaria).
12. **Caja Diaria:** Sistema de arqueo diario para apertura de caja con efectivo inicial, flujo de transacciones en efectivo del turno y registro de cierre con cálculo automático de faltantes o sobrantes.
13. **Preguntas Frecuentes (FAQ):** Acordeón interactivo con guías didácticas sobre educación financiera básica y regulaciones tributarias de Ecuador.
14. **Acerca del Equipo:** Pantalla con la información académica del proyecto, integrantes (Juan y Franklin) e institución educativa.
15. **Configuración y Datos:** Panel de control para alternar modo claro/oscuro, borrar todos los datos de LocalStorage de forma segura, restaurar datos iniciales de prueba y exportar/importar toda la base de datos en un archivo `.json`.

---

## 💳 Créditos y Recursos Externos
*   **Fuentes:** [Google Fonts - Outfit](https://fonts.google.com/specimen/Outfit)
*   **Iconos:** [Bootstrap Icons](https://icons.getbootstrap.com/)
*   **Framework CSS:** [Bootstrap v5.3](https://getbootstrap.com/)
*   **Institución:** Instituto Superior Tecnológico Liceo Cristiano
*   **Docente:** Ing. Richard Suárez Jácome