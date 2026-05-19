export const TEXT = {
  es: {
    projects: {
      proline: {
        slug: 'proline',
        descripcion:
          'Proline es una plataforma de comunidades deportivas construida alrededor de un loop de gamificación: los fans completan misiones diarias, acumulan puntos y compiten por su pasión. No es una red social tradicional — es un sistema de recompensas para aficionados reales.',
        rolYContexto: {
          rol: 'Frontend Developer & UI/UX Designer',
          periodo: '2025 – presente',
          resumen:
            'Entré al proyecto con ownership total: desde la definición visual en Figma hasta la implementación en Next.js. Sin hand-off, sin intermediarios — diseño y código bajo la misma responsabilidad.',
        },
        desafios: [
          {
            titulo: 'Cero sistema de diseño heredado',
            descripcion:
              'El producto no tenía tokens, componentes base ni convenciones de estilo establecidas. Todo tenía que construirse desde cero sin bloquear el desarrollo de features.',
          },
          {
            titulo: 'Deuda técnica en estilos',
            descripcion:
              'La base de CSS existente era inconsistente y difícil de escalar. Migrar a SCSS/BEM sin romper lo ya construido requirió una estrategia incremental y cuidadosa.',
          },
          {
            titulo: 'Next.js 15 Server / Client Components',
            descripcion:
              'Una incompatibilidad crítica entre Server y Client Components en CommunityPage generaba errores de hidratación en producción que eran difíciles de reproducir localmente.',
          },
          {
            titulo: 'Datos multi-deporte sin API unificada',
            descripcion:
              'El producto consume datos de múltiples deportes desde fuentes distintas. Sin una capa de abstracción, cada módulo tenía lógica de integración dispersa y frágil.',
          },
          {
            titulo: 'Validación de producto con métricas reales',
            descripcion:
              'El equipo necesitaba tomar decisiones de producto basadas en comportamiento real de usuarios, sin herramientas de analytics ni A/B testing configuradas.',
          },
        ],
        decisionesClaveYResultados: [
          {
            decision: 'Design system desde tokens',
            detalle:
              'Establecí los fundamentos del sistema de diseño de Proline desde cero: tokens de color (--PlPrimary #00A1E1, --PlAccent #FFAA00), tipografía, espaciado y variantes de componente documentadas en Figma y Storybook.',
            resultado:
              'Base consistente que permitió escalar a 40+ componentes reutilizables sin regresiones visuales entre módulos.',
          },
          {
            decision: 'Atomic Design + Storybook como contrato visual',
            detalle:
              'Adopté Atomic Design para estructurar la librería de componentes y Storybook como entorno de documentación y testing visual aislado del resto de la app.',
            resultado:
              'Reducción de ~18 hrs de desarrollo por sprint al eliminar revisiones manuales de regresión visual y facilitar onboarding de nuevos componentes.',
          },
          {
            decision: 'Patrón BFF con React Query',
            detalle:
              'Diseñé una capa Backend for Frontend con React Query para centralizar el fetching, caching y sincronización de datos, sacando esa lógica de los componentes.',
            resultado:
              'Vistas con alta frecuencia de actualización sin re-renders innecesarios y una capa de datos predecible y testeable.',
          },
          {
            decision: 'SportsDataService como abstracción multi-fuente',
            detalle:
              'Construí un servicio centralizado que normaliza datos de distintas APIs deportivas antes de exponerlos al frontend, independientemente del deporte o la fuente.',
            resultado:
              'Integración de nuevos deportes sin tocar la lógica de los componentes — el contrato de datos es siempre el mismo.',
          },
          {
            decision: 'Migración de GrowthBook a PostHog',
            detalle:
              'Evalué las limitaciones de GrowthBook para el volumen y los casos de uso de Proline y lideré la migración a PostHog, integrando analytics y A/B testing en una sola herramienta.',
            resultado:
              'El equipo de producto ganó visibilidad real del comportamiento de usuarios y la capacidad de lanzar experimentos sin depender de desarrollo para la configuración.',
          },
          {
            decision: 'Git worktrees para desarrollo paralelo',
            detalle:
              'Adopté Git worktrees para trabajar en múltiples branches simultáneamente sin cambiar de contexto en el mismo directorio de trabajo.',
            resultado:
              'Eliminación de conflictos de estado entre features en curso y ciclos de review más rápidos al poder comparar implementaciones en paralelo.',
          },
        ],
      },

      xcamp: {
        slug: 'xcamp',
        descripcion:
          'Xcamp es una plataforma educativa con flujos de onboarding y aprendizaje multi-paso. El producto ya estaba en producción con una base de usuarios activa cuando entré al proyecto.',
        rolYContexto: {
          rol: 'Frontend Angular Developer & UI/UX Designer',
          periodo: '2025',
          resumen:
            'Llegué a un codebase Angular 17 existente con deuda técnica visual, inconsistencias responsivas y sin convenciones claras de componentes. El reto no era construir desde cero — era mejorar sin romper.',
        },
        desafios: [
          {
            titulo: 'Codebase sin convenciones establecidas',
            descripcion:
              'Los componentes existentes tenían lógica duplicada, estilos en línea mezclados con SCSS y nomenclatura inconsistente, lo que dificultaba entender el alcance de cualquier cambio.',
          },
          {
            titulo: 'Sin responsividad en flujos críticos',
            descripcion:
              'Los flujos multi-paso principales no funcionaban correctamente en mobile ni tablet. Eran los flujos de mayor conversión del producto y cualquier cambio tenía riesgo alto.',
          },
          {
            titulo: 'Diseño y desarrollo desconectados',
            descripcion:
              'No existían flujos documentados en Figma. Los cambios se implementaban directamente sobre el código, generando desalineación entre lo que el diseño esperaba y lo que se entregaba.',
          },
        ],
        decisionesClaveYResultados: [
          {
            decision: 'Auditoría de componentes antes de tocar código',
            detalle:
              'Antes de modificar nada, mapeé los 30+ componentes existentes para identificar duplicación de lógica, inconsistencias visuales y dependencias ocultas.',
            resultado:
              'Un plan de refactor con prioridades claras que evitó romper funcionalidad en producción y redujo un 40% la duplicación de código CSS.',
          },
          {
            decision: 'Definir flujos en Figma antes de implementar',
            detalle:
              'Establecí el proceso de documentar 8+ flujos end-to-end en Figma antes de escribir una línea de código, creando un contrato visual entre diseño y desarrollo.',
            resultado:
              'Reducción de iteraciones de revisión y alineación clara de expectativas, acelerando la entrega de cada flujo.',
          },
          {
            decision: 'Migración responsiva progresiva con SCSS/BEM',
            detalle:
              'Refactoricé estilos clave adoptando SCSS con BEM como convención, y migré los flujos multi-paso críticos a diseño responsivo mobile-first sin afectar la experiencia desktop.',
            resultado:
              'Flujos principales funcionando correctamente en todos los breakpoints y una base de estilos que el equipo adoptó como estándar para nuevos desarrollos.',
          },
          {
            decision: 'Creación de ~15 componentes nuevos alineados al design system',
            detalle:
              'Construí componentes nuevos siguiendo las convenciones establecidas, documentando su API y casos de uso para reducir la curva de adopción del equipo.',
            resultado:
              'Consistencia visual y funcional entre módulos nuevos y existentes, con componentes que el equipo pudo reutilizar sin modificaciones.',
          },
        ],
      },

      freelance: {
        label: 'proyectos freelance',
        clinica: {
          slug: 'clinica-pos',
          descripcion:
            'App de gestión integral para una clínica de medicina funcional en CDMX. El cliente operaba completamente en papel: expedientes físicos, cobros manuales y sin trazabilidad de inventario.',
          rolYContexto: {
            rol: 'Fullstack Developer (freelance)',
            periodo: '2023 – 2024',
            resumen:
              'Fui el único desarrollador del proyecto, responsable de la arquitectura, el diseño, el desarrollo y el despliegue. El cliente no tenía experiencia técnica, así que también gestioné la definición de requerimientos y el proceso de adopción.',
          },
          desafios: [
            {
              titulo: 'Requerimientos ambiguos y cambiantes',
              descripcion:
                'El cliente no sabía con precisión qué necesitaba hasta que veía algo funcionando. Los requerimientos evolucionaban constantemente durante el desarrollo.',
            },
            {
              titulo: 'Datos médicos sensibles',
              descripcion:
                'La app maneja expedientes clínicos de pacientes reales. El control de acceso y la integridad de los datos no podían ser un afterthought — tenían que estar resueltos desde el diseño.',
            },
            {
              titulo: 'POS con lógica de cobro compleja',
              descripcion:
                'Los cobros incluían pagos parciales, saldos pendientes entre consultas y mezcla de productos con servicios. Una lógica incorrecta impactaba directamente en los ingresos del cliente.',
            },
          ],
          decisionesClaveYResultados: [
            {
              decision: 'Stack MERN con arquitectura por módulos',
              detalle:
                'Elegí MongoDB por la flexibilidad del esquema para expedientes clínicos — la estructura de cada paciente variaba según tratamiento. Separé la app en módulos independientes (expedientes, POS, inventario, cobros) para poder entregar valor incremental.',
              resultado:
                'Sistema en producción con 4 módulos funcionales, 200+ pacientes registrados y adopción real por parte del equipo de la clínica.',
            },
            {
              decision: 'RBAC con JWT desde el inicio',
              detalle:
                'Implementé control de acceso por roles (médico, recepcionista, admin) usando JWT antes de construir cualquier módulo, para no tener que retrofitear permisos en un sistema ya construido.',
              resultado:
                'Datos de pacientes protegidos por rol desde el primer día. Cero incidentes de acceso no autorizado durante el periodo de adopción.',
            },
            {
              decision: 'Sincronización en tiempo real entre POS e inventario',
              detalle:
                'Diseñé el flujo de venta para que cada ticket actualice el inventario de forma síncrona antes de confirmar la transacción, evitando inconsistencias de stock.',
              resultado:
                'Sincronización de tickets menor a 100ms con stock siempre consistente, eliminando discrepancias entre lo vendido y lo disponible.',
            },
          ],
        },

        coLabora: {
          slug: 'co-labora',
          descripcion:
            'Plataforma de descubrimiento y renta de espacios de coworking. Los anfitriones publican sus espacios y los usuarios los encuentran, reservan y pagan directamente en la plataforma.',
          rolYContexto: {
            rol: 'Fullstack Developer (freelance)',
            periodo: '2023 – 2024',
            resumen:
              'Llevé el proyecto completo de Figma a producción como único desarrollador. Tomé decisiones de arquitectura, integré servicios de terceros y gestioné el despliegue.',
          },
          desafios: [
            {
              titulo: 'Múltiples integraciones de terceros críticas',
              descripcion:
                'Google Maps, Stripe y SendGrid tenían que funcionar de forma confiable y coordinada. Un fallo en cualquiera de ellas rompía flujos centrales del producto.',
            },
            {
              titulo: 'Gestión de imágenes a escala',
              descripcion:
                'Los anfitriones suben múltiples fotos por espacio. Sin optimización, el tiempo de carga y el costo de almacenamiento escalarían rápidamente.',
            },
            {
              titulo: 'Flujo de reserva con estados complejos',
              descripcion:
                'Una reserva pasa por múltiples estados (disponible, pendiente, confirmada, cancelada) con lógica de negocio diferente en cada uno y notificaciones asociadas.',
            },
          ],
          decisionesClaveYResultados: [
            {
              decision: 'AWS S3 + Sharp para imágenes',
              detalle:
                'Implementé un pipeline de carga que redimensiona automáticamente las imágenes con Sharp antes de subirlas a S3, generando variantes optimizadas para distintos contextos de visualización.',
              resultado:
                'Tiempos de carga reducidos significativamente y costo de almacenamiento controlado desde el primer usuario.',
            },
            {
              decision: 'Stripe con manejo explícito de estados de pago',
              detalle:
                'Implementé el flujo de Stripe manejando explícitamente cada estado posible (succeeded, failed, requires_action) con feedback claro al usuario y actualización automática del estado de reserva.',
              resultado:
                'Cero reservas confirmadas con pago fallido. Flujo de checkout robusto con recuperación automática de errores transitorios.',
            },
            {
              decision: 'SendGrid para notificaciones transaccionales',
              detalle:
                'Configuré notificaciones automáticas en cada cambio de estado de reserva: confirmación, recordatorio 24 hrs antes, cancelación y solicitud de reseña post-estancia.',
              resultado:
                'Comunicación automatizada entre anfitriones y usuarios sin intervención manual, reduciendo fricciones del proceso de reserva.',
            },
          ],
        },
      },
    },
  },

  en: {
    projects: {
      proline: {
        slug: 'proline',
        description:
          'Proline is a sports communities platform built around a gamification loop: fans complete daily missions, earn points and compete for their passion. It is not a traditional social network — it is a rewards system for real supporters.',
        roleAndContext: {
          role: 'Frontend Developer & UI/UX Designer',
          period: '2025 – present',
          summary:
            'I joined the project with full ownership: from visual definition in Figma to implementation in Next.js. No hand-off, no intermediaries — design and code under the same responsibility.',
        },
        challenges: [
          {
            title: 'No inherited design system',
            description:
              'The product had no tokens, no base components and no established style conventions. Everything had to be built from scratch without blocking feature development.',
          },
          {
            title: 'Technical debt in styles',
            description:
              'The existing CSS base was inconsistent and hard to scale. Migrating to SCSS/BEM without breaking what was already built required a careful, incremental strategy.',
          },
          {
            title: 'Next.js 15 Server / Client Components',
            description:
              'A critical incompatibility between Server and Client Components in CommunityPage was causing hydration errors in production that were hard to reproduce locally.',
          },
          {
            title: 'Multi-sport data with no unified API',
            description:
              'The product consumes data from multiple sports across different sources. Without an abstraction layer, each module had scattered and fragile integration logic.',
          },
          {
            title: 'Product validation with real metrics',
            description:
              'The team needed to make product decisions based on real user behavior, with no analytics or A/B testing tools configured.',
          },
        ],
        keyDecisionsAndResults: [
          {
            decision: 'Design system built from tokens',
            detail:
              'I established the foundations of Proline\'s design system from scratch: color tokens (--PlPrimary #00A1E1, --PlAccent #FFAA00), typography, spacing and component variants documented in Figma and Storybook.',
            result:
              'A consistent foundation that allowed scaling to 40+ reusable components without visual regressions across modules.',
          },
          {
            decision: 'Atomic Design + Storybook as a visual contract',
            detail:
              'I adopted Atomic Design to structure the component library and Storybook as a documentation and visual testing environment isolated from the rest of the app.',
            result:
              'A reduction of ~18 dev hours per sprint by eliminating manual visual regression reviews and simplifying new component onboarding.',
          },
          {
            decision: 'BFF pattern with React Query',
            detail:
              'I designed a Backend for Frontend layer with React Query to centralize data fetching, caching and synchronization, moving that logic out of the components.',
            result:
              'High-frequency update views with no unnecessary re-renders and a predictable, testable data layer.',
          },
          {
            decision: 'SportsDataService as a multi-source abstraction',
            detail:
              'I built a centralized service that normalizes data from different sports APIs before exposing it to the frontend, regardless of sport or source.',
            result:
              'New sports can be integrated without touching component logic — the data contract is always the same.',
          },
          {
            decision: 'Migration from GrowthBook to PostHog',
            detail:
              'I assessed GrowthBook\'s limitations for Proline\'s volume and use cases and led the migration to PostHog, consolidating analytics and A/B testing into a single tool.',
            result:
              'The product team gained real visibility into user behavior and the ability to launch experiments without depending on development for configuration.',
          },
          {
            decision: 'Git worktrees for parallel development',
            detail:
              'I adopted Git worktrees to work on multiple branches simultaneously without switching context in the same working directory.',
            result:
              'Eliminated state conflicts between in-progress features and faster review cycles by being able to compare implementations in parallel.',
          },
        ],
      },

      xcamp: {
        slug: 'xcamp',
        description:
          'Xcamp is an educational platform with multi-step onboarding and learning flows. The product was already in production with an active user base when I joined.',
        roleAndContext: {
          role: 'Frontend Angular Developer & UI/UX Designer',
          period: '2025',
          summary:
            'I joined an existing Angular 17 codebase carrying visual technical debt, responsive inconsistencies and no clear component conventions. The challenge was not to build from scratch — it was to improve without breaking.',
        },
        challenges: [
          {
            title: 'Codebase with no established conventions',
            description:
              'Existing components had duplicated logic, inline styles mixed with SCSS and inconsistent naming, making it hard to understand the scope of any change.',
          },
          {
            title: 'No responsive support on critical flows',
            description:
              'The main multi-step flows did not work correctly on mobile or tablet. These were the highest-conversion flows in the product and any change carried high risk.',
          },
          {
            title: 'Design and development disconnected',
            description:
              'No flows were documented in Figma. Changes were implemented directly in code, creating misalignment between what design expected and what was delivered.',
          },
        ],
        keyDecisionsAndResults: [
          {
            decision: 'Component audit before touching code',
            detail:
              'Before modifying anything, I mapped all 30+ existing components to identify logic duplication, visual inconsistencies and hidden dependencies.',
            result:
              'A prioritized refactor plan that avoided breaking production functionality and reduced CSS code duplication by 40%.',
          },
          {
            decision: 'Define flows in Figma before implementing',
            detail:
              'I established the process of documenting 8+ end-to-end flows in Figma before writing a single line of code, creating a visual contract between design and development.',
            result:
              'Fewer review iterations and clear expectation alignment, accelerating delivery for each flow.',
          },
          {
            decision: 'Progressive responsive migration with SCSS/BEM',
            detail:
              'I refactored key styles adopting SCSS with BEM as convention and migrated the critical multi-step flows to mobile-first responsive design without affecting the desktop experience.',
            result:
              'Main flows working correctly at every breakpoint and a style foundation the team adopted as the standard for new development.',
          },
          {
            decision: 'Creation of ~15 new components aligned to the design system',
            detail:
              'I built new components following the established conventions, documenting their API and use cases to reduce the team\'s adoption curve.',
            result:
              'Visual and functional consistency between new and existing modules, with components the team could reuse without modifications.',
          },
        ],
      },

      freelance: {
        label: 'freelance projects',
        clinica: {
          slug: 'clinica-pos',
          description:
            'A comprehensive management app for a functional-medicine clinic in Mexico City. The client operated entirely on paper: physical records, manual billing and no inventory tracking.',
          roleAndContext: {
            role: 'Fullstack Developer (freelance)',
            period: '2023 – 2024',
            summary:
              'I was the sole developer on the project, responsible for architecture, design, development and deployment. Since the client had no technical background, I also managed requirements definition and the adoption process.',
          },
          challenges: [
            {
              title: 'Ambiguous and evolving requirements',
              description:
                'The client did not know precisely what they needed until they saw something working. Requirements kept evolving throughout the build.',
            },
            {
              title: 'Sensitive medical data',
              description:
                'The app handles real patient clinical records. Access control and data integrity could not be an afterthought — they had to be solved at the design level.',
            },
            {
              title: 'POS with complex billing logic',
              description:
                'Billing included partial payments, outstanding balances across visits and a mix of products and services. Incorrect logic directly impacted the client\'s revenue.',
            },
          ],
          keyDecisionsAndResults: [
            {
              decision: 'MERN stack with modular architecture',
              detail:
                'I chose MongoDB for schema flexibility with clinical records — each patient\'s structure varied by treatment. I split the app into independent modules (records, POS, inventory, billing) to deliver incremental value.',
              result:
                'A production system with 4 functional modules, 200+ registered patients and real adoption by the clinic\'s team.',
            },
            {
              decision: 'RBAC with JWT from day one',
              detail:
                'I implemented role-based access control (doctor, receptionist, admin) using JWT before building any module, to avoid retrofitting permissions into an already-built system.',
              result:
                'Patient data protected by role from day one. Zero unauthorized access incidents during the adoption period.',
            },
            {
              decision: 'Real-time sync between POS and inventory',
              detail:
                'I designed the sales flow to update inventory synchronously before confirming the transaction, preventing stock inconsistencies.',
              result:
                'Ticket sync under 100ms with always-consistent stock, eliminating discrepancies between what was sold and what was available.',
            },
          ],
        },

        coLabora: {
          slug: 'co-labora',
          description:
            'A coworking space discovery and rental platform. Hosts publish their spaces and users find, book and pay directly on the platform.',
          roleAndContext: {
            role: 'Fullstack Developer (freelance)',
            period: '2023 – 2024',
            summary:
              'I took the entire project from Figma to production as the sole developer, making architecture decisions, integrating third-party services and managing deployment.',
          },
          challenges: [
            {
              title: 'Multiple critical third-party integrations',
              description:
                'Google Maps, Stripe and SendGrid had to work reliably and in coordination. A failure in any of them broke core product flows.',
            },
            {
              title: 'Image management at scale',
              description:
                'Hosts upload multiple photos per space. Without optimization, load times and storage costs would scale quickly.',
            },
            {
              title: 'Booking flow with complex states',
              description:
                'A booking moves through multiple states (available, pending, confirmed, cancelled) with different business logic at each stage and associated notifications.',
            },
          ],
          keyDecisionsAndResults: [
            {
              decision: 'AWS S3 + Sharp for images',
              detail:
                'I built an upload pipeline that automatically resizes images with Sharp before pushing them to S3, generating optimized variants for different display contexts.',
              result:
                'Significantly reduced load times and controlled storage costs from the first user.',
            },
            {
              decision: 'Stripe with explicit payment state handling',
              detail:
                'I implemented the Stripe flow explicitly handling every possible state (succeeded, failed, requires_action) with clear user feedback and automatic booking status updates.',
              result:
                'Zero bookings confirmed with a failed payment. Robust checkout flow with automatic recovery from transient errors.',
            },
            {
              decision: 'SendGrid for transactional notifications',
              detail:
                'I configured automatic notifications on every booking state change: confirmation, 24-hour reminder, cancellation and post-stay review request.',
              result:
                'Automated communication between hosts and users with no manual intervention, reducing friction in the booking process.',
            },
          ],
        },
      },
    },
  },
};