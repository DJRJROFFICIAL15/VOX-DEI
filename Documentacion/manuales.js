/* Datos del Centro de documentación ALMA / XDR.
   Para agregar un manual: copia un bloque de "manuales", cambia id/titulo y elige:
   cat (categoría), fase (empezar|instalar|configurar|operar|solucionar|referencia|labs),
   aud (["preventa"], ["cliente"] o ambos) y estado (disponible|borrador|elaboracion|planeado).
   - Con contenido: usa "secciones": [{ titulo, contenido: `<p>HTML…</p>` }]
   - Sin contenido aún: usa "esquema": ["tema 1", "tema 2"]
   Usa &lt; y &gt; para marcadores como &lt;TU_ID_CLIENTE&gt;. */
window.ALMA_DOCS = {
  SITIO: "../index.html",
  pdfs: {
    usuario: { titulo: "Manual de Usuario", desc: "Portal de cliente: dashboard, alertas, eventos, estadísticas y reportes.", archivo: "PDF/MANUAL_USUARIO.pdf", info: "PDF · 29 páginas" },
    admin: { titulo: "Manual de Administrador", desc: "Organizaciones, usuarios, roles, agentes, auditoría y mantenimiento.", archivo: "PDF/MANUAL_ADMINISTRADOR.pdf", info: "PDF · 47 páginas" }
  },
  fases: [
    {
      id: "empezar",
      nombre: "Empezar"
    },
    {
      id: "instalar",
      nombre: "Instalar"
    },
    {
      id: "configurar",
      nombre: "Configurar"
    },
    {
      id: "operar",
      nombre: "Operar"
    },
    {
      id: "solucionar",
      nombre: "Solucionar problemas"
    },
    {
      id: "referencia",
      nombre: "Referencia"
    },
    {
      id: "labs",
      nombre: "Labs"
    }
  ],
  categorias: [
    {
      id: "c1",
      nombre: "01. Primeros pasos"
    },
    {
      id: "c2",
      nombre: "02. Perímetro y conectividad"
    },
    {
      id: "c3",
      nombre: "03. Detección (Suricata)"
    },
    {
      id: "c4",
      nombre: "04. SIEM y datos"
    },
    {
      id: "c5",
      nombre: "05. Operación y respuesta"
    },
    {
      id: "c6",
      nombre: "06. Labs y tutoriales"
    },
    {
      id: "c7",
      nombre: "07. Solución de problemas"
    },
    {
      id: "c8",
      nombre: "08. Referencia"
    }
  ],
  manuales: [
    {
      id: "bienvenida",
      titulo: "Bienvenida y Portal SOC de PLATAFORMA ALMA",
      cat: "c1",
      fase: "empezar",
      aud: ["preventa", "cliente"],
      estado: "disponible",
      desc: `Introducción al ecosistema de supervisión de Vox Dei, diseñado para otorgar soberanía sobre la telemetría de seguridad y respuesta inmediata ante incidentes.`,
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>
                                PLATAFORMA ALMA consolida la telemetría perimetral y de host en un motor XDR unificado. La arquitectura del cliente se comunica mediante canales cifrados bidireccionales con el SOC central operado por analistas de Vox Dei.
                            </p>
                            <div class="cmd">
                                [Cliente LAN] ---> [Sensor OPNsense + Suricata] ---> [Túnel WireGuard] ---> [SIEM OpenSearch (Vox Dei)]
                            </div>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: `<ul>
                                <li><strong>Hardware del Sensor:</strong> Mínimo 4 vCPU, 8 GB RAM, 100 GB NVMe para almacenamiento local de logs en búfer.</li>
                                <li><strong>Conectividad:</strong> Salida WAN dedicada con IP fija o DDNS para terminación de túnel VPN WireGuard.</li>
                                <li><strong>Permisos:</strong> Acceso root/administrador al appliance perimetral para instalación de agentes Beats.</li>
                            </ul>`
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<p>Ejecute el script de aprovisionamiento inicial provisto por Vox Dei para vincular su nodo:</p>
                            <div class="code">
                                <div class="code-h">
                                    <span>instalar-agente.sh</span>
                                    <button onclick="copyCodeSnippet(this)" class="copy">
                                         Copiar
                                    </button>
                                </div>
                                <pre><code>curl -fsSLO https://&lt;URL_DE_DESCARGA&gt;/&lt;INSTALADOR&gt;
sha256sum -c &lt;ARCHIVO_CHECKSUM&gt;
sudo bash ./&lt;INSTALADOR&gt; --client-id="&lt;TU_ID_CLIENTE&gt;"</code></pre>
                            </div>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: `<p>El panel del cliente en línea permite supervisar el estado de salud de los sensores en tiempo real mediante indicadores de latencia y tasa de eventos por segundo (EPS).</p>`
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: `<p>Si el sensor no reporta al SOC central:</p>
                            <div class="cmd">
                                sudo systemctl status alma-agent.service
                            </div>`
        }
      ]
    },
    {
      id: "credenciales",
      titulo: "Accesos, MFA y tokens de API",
      cat: "c1",
      fase: "configurar",
      aud: ["cliente"],
      estado: "borrador",
      desc: `Administración de tokens de API, certificados de cliente y políticas de control de acceso basado en roles (RBAC).`,
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>El acceso al portal de clientes de PLATAFORMA ALMA requiere autenticación multifactor (MFA) obligatoria basada en TOTP y certificados X.509 firmados por la CA interna de Vox Dei.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Dispositivo móvil compatible con Google Authenticator o FreeOTP para el alta de tokens MFA.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<p>Generación de un token de API para integración automatizada con SOAR:</p>
                            <div class="code">
                                <div class="code-h">
                                    <span>API Token Generation</span>
                                    <button onclick="copyCodeSnippet(this)" class="copy"> Copiar</button>
                                </div>
                                <pre><code>curl -X POST https://&lt;HOST_API&gt;/&lt;RUTA_DE_TOKEN&gt;   -H "Content-Type: application/json"   -d '{"client_key": "YOUR_KEY", "secret": "YOUR_SECRET"}'</code></pre>
                            </div>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Auditoría permanente de inicios de sesión y revocación inmediata de credenciales comprometidas.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: `<p>Si pierde su código MFA, contacte al canal de soporte prioritario de Vox Dei para reinicio asistido de token.</p>`
        }
      ]
    },
    {
      id: "opnsense-setup",
      titulo: "Despliegue del sensor perimetral OPNsense",
      cat: "c2",
      fase: "instalar",
      aud: ["cliente"],
      estado: "disponible",
      desc: `Procedimiento formal para la instalación del firewall perimetral OPNsense optimizado como sensor primario para PLATAFORMA ALMA.`,
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>OPNsense actúa como pasarela de filtrado y tap de red pasivo/activo, enviando telemetría de flujo y eventos de seguridad al colector ALMA.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Interfaces de red físicas separadas (WAN, LAN, OPT1 para DMZ).</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<p>Habilite el plugin <code>os-telemetry-client</code> desde la interfaz web de OPNsense en Sistema > Firmware > Plugins.</p>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Supervisión de uso de CPU y memoria RAM en el dashboard de OPNsense.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: "<p>Verifique el estado del daemon syslog con <code>clog /var/log/syslog.log</code>.</p>"
        }
      ]
    },
    {
      id: "wireguard-vpn",
      titulo: "Túneles WireGuard VPN Cifrados",
      cat: "c2",
      fase: "configurar",
      aud: ["cliente"],
      estado: "disponible",
      desc: `Establecimiento de enlaces seguros punto a punto entre las sucursales del cliente y el centro de análisis SOC Vox Dei.`,
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>WireGuard ofrece cifrado de alto rendimiento con curvas elípticas (ChaCha20/Poly1305) para aislar el canal de telemetría de la red pública.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Puerto UDP 51820 abierto en el enrutador de borde WAN.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<div class="code">
                                <div class="code-h">
                                    <span>wg0.conf</span>
                                    <button onclick="copyCodeSnippet(this)" class="copy"> Copiar</button>
                                </div>
                                <pre><code>[Interface]
PrivateKey = CLIENT_PRIVATE_KEY
Address = 10.200.50.2/32

[Peer]
PublicKey = SOC_SERVER_PUBLIC_KEY
Endpoint = &lt;ENDPOINT_SOC&gt;:51820
AllowedIPs = 10.200.0.0/16
PersistentKeepalive = 25</code></pre>
                            </div>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Compruebe el intercambio de paquetes con <code>wg show</code> en la consola.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: "<p>Si el túnel no levanta, compruebe que no existan reglas bloqueando el puerto UDP 51820 en la WAN.</p>"
        }
      ]
    },
    {
      id: "suricata-engine",
      titulo: "Motor de Detección Suricata NIDS",
      cat: "c3",
      fase: "referencia",
      aud: ["preventa", "cliente"],
      estado: "disponible",
      desc: `Funcionamiento del motor de inspección profunda de paquetes (DPI) y análisis heurístico integrado en el perímetro.`,
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>Suricata procesa cada paquete de red comparándolo con bases de firmas actualizadas (origen y licencia según el despliegue) y generando alertas en formato JSON estructurado.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Soporte para Netmap o PCAP en las interfaces físicas designadas.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: "<p>Ajuste las redes protegidas en <code>suricata.yaml</code> bajo la variable <code>HOME_NET</code>.</p>"
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Monitoreo de rendimiento de hilos con <code>suricatasc -c top</code>.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: "<p>Si consume demasiada CPU, ajuste el tamaño de las listas hash en la configuración del motor.</p>"
        }
      ]
    },
    {
      id: "suricata-rules",
      titulo: "Creación de Reglas de Detección Personalizadas",
      cat: "c3",
      fase: "configurar",
      aud: ["cliente"],
      estado: "disponible",
      desc: "Metodología para desarrollar firmas de detección adaptadas a los servicios críticos de su organización.",
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>Las reglas permiten aislar patrones específicos de tráfico malicioso en la capa de aplicación (HTTP, TLS, SSH, DNS).</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Acceso al directorio <code>/usr/local/etc/suricata/rules/</code>.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<div class="code">
                                <div class="code-h">
                                    <span>alma-custom.rules</span>
                                    <button onclick="copyCodeSnippet(this)" class="copy"> Copiar</button>
                                </div>
                                <pre><code>alert tcp any any -> $HOME_NET 443 (msg:"ALMA: Intento de Conexion a C2 Conocido";     flow:to_server,established;     content:"/malware/beacon"; depth:20;     classtype:trojan-activity; sid:999901; rev:1;)</code></pre>
                            </div>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Valide la sintaxis antes de recargar con <code>suricata -T -c suricata.yaml</code>.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: "<p>Si la regla no salta, revise que el SID no esté duplicado con las reglas predeterminadas.</p>"
        }
      ]
    },
    {
      id: "opensearch-pipeline",
      titulo: "Pipeline de Ingesta y Indexación con Logstash",
      cat: "c4",
      fase: "referencia",
      aud: ["cliente"],
      estado: "disponible",
      desc: "Gestión de flujos de datos normalizados bajo taxonomía ECS (Elastic Common Schema) hacia OpenSearch.",
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>Logstash recibe los eventos de los Beats perimetrales, parsea formatos complejos y aplica enriquecimiento geográfico IP antes de la indexación.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>OpenJDK 17 o superior y mínimo 4 GB de Heap asignados a Logstash.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<div class="code">
                                <div class="code-h">
                                    <span>pipeline.conf</span>
                                    <button onclick="copyCodeSnippet(this)" class="copy"> Copiar</button>
                                </div>
                                <pre><code>input { beats { port => 5044 } }
filter { json { source => "message" } }
output {
  opensearch {
    hosts => ["https://&lt;HOST_OPENSEARCH&gt;:9200"]
    index => "alma-client-logs-%{+YYYY.MM.dd}"
  }
}</code></pre>
                            </div>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Supervise la cola persistente de Logstash para evitar pérdida de datos ante picos de tráfico.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: "<p>Errores de parseo JSON se registran en <code>/var/log/logstash/logstash-plain.log</code>.</p>"
        }
      ]
    },
    {
      id: "lab-simulacion",
      titulo: "Laboratorio 1: Simulación de Ataque y Respuesta",
      cat: "c6",
      fase: "labs",
      aud: ["preventa", "cliente"],
      estado: "disponible",
      desc: `Guía práctica estilo EVE-NG para validar la detección de un escaneo de puertos agresivo y mitigación automática. Ejecutar solo en un laboratorio propio o con autorización.`,
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>En este laboratorio simulado se ejecuta un escaneo Nmap controlado contra una IP de prueba dentro del perímetro monitorizado.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Entorno de pruebas aislado (Sandbox) con sensores ALMA activos.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<p>Ejecute la simulación desde su host de pruebas:</p>
                            <div class="code">
                                <div class="code-h">
                                    <span>Lab Execution</span>
                                    <button onclick="copyCodeSnippet(this)" class="copy"> Copiar</button>
                                </div>
                                <pre><code>nmap -sS -T4 -p 1-1000 192.168.50.100</code></pre>
                            </div>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: `<p>Observe la aparición inmediata de la alerta de escaneo en el panel del SOC ALMA en pocos segundos (el tiempo exacto debe medirse en su entorno).</p>`
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: "<p>Si la alerta no aparece, compruebe que la interfaz monitoreada tenga activada la captura promiscua.</p>"
        }
      ]
    },
    {
      id: "lab-incidentes",
      titulo: "Laboratorio 2: Respuesta a Alertas SSH Bruteforce",
      cat: "c6",
      fase: "labs",
      aud: ["cliente"],
      estado: "disponible",
      desc: `Procedimiento paso a paso para neutralizar un ataque de fuerza bruta automatizado contra servidores SSH. Ejecutar solo en un laboratorio propio o con autorización.`,
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>Identificación de múltiples intentos fallidos de autenticación y bloqueo automático mediante fail2ban integrado en ALMA.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Servicio SSH habilitado en entorno de pruebas controlado.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<p>Simule el ataque con <code>hydra -l root -P passwords.txt ssh://192.168.50.100</code>. Úselo únicamente en un laboratorio propio y con autorización.</p>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Verifique el bloqueo de la IP atacante en la tabla de firewall perimetral.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: "<p>Consulte los logs de bloqueo con <code>grep \"Ban\" /var/log/fail2ban.log</code>.</p>"
        }
      ]
    },
    {
      id: "troubleshooting-red",
      titulo: "Diagnóstico Avanzado de Conectividad y Sensores",
      cat: "c7",
      fase: "solucionar",
      aud: ["cliente"],
      estado: "disponible",
      desc: "Herramientas de diagnóstico de red y resolución de incidencias en nodos de la plataforma.",
      secciones: [
        {
          titulo: "1. Descripción y Arquitectura",
          contenido: `<p>Metodología sistemática para aislar fallas de conectividad entre los sensores perimetrales y los colectores centrales.</p>`
        },
        {
          titulo: "2. Requisitos de Instalación",
          contenido: "<p>Acceso SSH de emergencia a la consola del sensor.</p>"
        },
        {
          titulo: "3. Guía de Configuración",
          contenido: `<p>Comprobación de conectividad TLS hacia el colector:</p>
                            <div class="code">
                                <div class="code-h">
                                    <span>Diagnostics</span>
                                    <button onclick="copyCodeSnippet(this)" class="copy"> Copiar</button>
                                </div>
                                <pre><code>openssl s_client -connect &lt;HOST_COLECTOR&gt;:9200 -servername &lt;HOST_COLECTOR&gt;</code></pre>
                            </div>`
        },
        {
          titulo: "4. Operación y Monitoreo",
          contenido: "<p>Revisión continua de latencias de red mediante sondas ICMP automatizadas.</p>"
        },
        {
          titulo: "5. Solución de Problemas (Troubleshooting)",
          contenido: `<p>Si persiste el fallo de ruta, reinicie el servicio de red local con <code>sudo systemctl restart networking</code>.</p>`
        }
      ]
    },
    {
      id: "planes",
      titulo: "Planes, implementación y piloto",
      cat: "c1",
      fase: "empezar",
      aud: ["preventa"],
      estado: "planeado",
      desc: "Qué incluye cada plan, cómo es la implementación y cómo funciona el piloto antes de pasar a producción.",
      esquema: ["Qué incluye cada plan (Esencial, Profesional y Empresarial)", "Proceso de implementación", "Piloto en Modo Monitoreo, sin contención activa", "Hardware: a costo y propiedad del cliente", "Qué no incluye y cambios de alcance"]
    },
    {
      id: "guia-portal",
      titulo: "Guía del portal y del dashboard",
      cat: "c1",
      fase: "operar",
      aud: ["cliente"],
      estado: "disponible",
      pdf: "usuario",
      desc: `Recorrido por el portal del cliente: acceso, dashboard, servidores, exposición y reportes.`,
      secciones: [
        {
          titulo: "1. Acceso al portal",
          contenido: `<p>Abre la dirección del portal e introduce tu <strong>correo o usuario</strong> y tu <strong>contraseña</strong>; el icono del ojo muestra u oculta la contraseña. Pulsa <strong>Entrar</strong>. Si es tu primer acceso con una contraseña temporal, el sistema te pedirá cambiarla (mínimo 12 caracteres).</p><figure class="fg"><a href="img/portal/portal-01-login.webp" target="_blank" rel="noopener"><img src="img/portal/portal-01-login.webp" alt="Pantalla de inicio de sesión de VOX DEI" loading="lazy"></a><figcaption>Pantalla de inicio de sesión.</figcaption></figure>`
        },
        {
          titulo: "2. El dashboard",
          contenido: `<p>Es la primera pantalla. Arriba aparecen el buscador (atajo <code>/</code>), el indicador de estado ("Sin ataques activos" cuando no hay alertas medias o superiores recientes), la campana con el número de alertas pendientes y tu menú de usuario.</p>
<ul><li><strong>Selector de periodo:</strong> 1 h, 24 h, 7 d o Todo, y el botón <strong>PDF</strong> para descargar el reporte.</li><li><strong>Cifras clave:</strong> alertas críticas, alertas altas, eventos analizados y servidores conectados, con su tendencia contra el periodo anterior.</li><li><strong>Alertas por hora y severidad:</strong> pulsa una barra para ver sus alertas.</li><li><strong>Necesitan atención:</strong> lista de alertas con severidad, número de repeticiones, explicación y los botones <em>Ver</em>, <em>Posponer</em> y <em>Leer más</em>.</li></ul><figure class="fg"><a href="img/portal/portal-02-dashboard-resumen.webp" target="_blank" rel="noopener"><img src="img/portal/portal-02-dashboard-resumen.webp" alt="Dashboard con resumen de 24 horas" loading="lazy"></a><figcaption>Resumen de 24 horas, alertas por hora y panel "Necesitan atención".</figcaption></figure><figure class="fg"><a href="img/portal/portal-25-dashboard-atencion.webp" target="_blank" rel="noopener"><img src="img/portal/portal-25-dashboard-atencion.webp" alt="Panel Necesitan atención desplazado" loading="lazy"></a><figcaption>El panel de la derecha se desplaza: las alertas más antiguas aparecen al bajar.</figcaption></figure>`
        },
        {
          titulo: "3. Topología de ataques, tipos y puertos",
          contenido: `<p>La <strong>Topología de ataques</strong> dibuja de izquierda a derecha el origen y el objetivo de cada flujo; el grosor de la línea indica cuántas alertas tiene y el color su severidad. Pasa el cursor para aislar un flujo, pulsa un nodo o flujo para filtrar el dashboard, y usa <code>Ctrl</code> + rueda para acercar.</p><figure class="fg"><a href="img/portal/portal-03-topologia-ataques.webp" target="_blank" rel="noopener"><img src="img/portal/portal-03-topologia-ataques.webp" alt="Topología de ataques origen a objetivo" loading="lazy"></a><figcaption>Topología de ataques: origen → objetivo en 24 horas.</figcaption></figure><p>Debajo están <strong>Tipos de ataque</strong> (con el detalle por categoría), <strong>Puertos atacados</strong> (los escaneos se resumen aparte para que no tapen los ataques dirigidos) y <strong>Orígenes geográficos</strong>, que solo ubica IPs públicas.</p><figure class="fg"><a href="img/portal/portal-04-tipos-puertos-origenes.webp" target="_blank" rel="noopener"><img src="img/portal/portal-04-tipos-puertos-origenes.webp" alt="Tipos de ataque, puertos atacados y orígenes geográficos" loading="lazy"></a><figcaption>Tipos de ataque, puertos atacados y mapa de orígenes.</figcaption></figure>`
        },
        {
          titulo: "4. Eventos en tiempo real",
          contenido: `<p><strong>Eventos por tipo</strong> grafica conexiones, DNS, web, alertas IDS y hosts por hora. Debajo, <strong>Eventos en tiempo real</strong> lista hora, tipo, fuente, destino, descripción y severidad. Con <strong>Pausar</strong> congelas la tabla para leer con calma y con <strong>Buscar y filtrar</strong> abres el buscador de eventos.</p><figure class="fg"><a href="img/portal/portal-05-eventos-tiempo-real.webp" target="_blank" rel="noopener"><img src="img/portal/portal-05-eventos-tiempo-real.webp" alt="Eventos por tipo y eventos en tiempo real" loading="lazy"></a><figcaption>Gráfica de eventos por tipo y tabla en tiempo real.</figcaption></figure>`
        },
        {
          titulo: "5. Menú lateral",
          contenido: `<p>Pulsa el icono de las tres rayas para abrir el menú. Incluye: <strong>Mi dashboard</strong>, <strong>Mis servidores</strong>, <strong>Exposición</strong>, <strong>Mis alertas</strong>, <strong>Mapa de amenazas</strong>, <strong>Mis eventos</strong>, <strong>Mis estadísticas</strong>, <strong>Machine Learning</strong>, <strong>Mis reportes</strong> y, en Cuenta, <strong>Mi cuenta</strong>.</p><figure class="fg"><a href="img/portal/portal-06-menu-lateral.webp" target="_blank" rel="noopener"><img src="img/portal/portal-06-menu-lateral.webp" alt="Menú lateral del portal" loading="lazy"></a><figcaption>Menú lateral desplegado.</figcaption></figure>`
        },
        {
          titulo: "6. Mis servidores",
          contenido: `<p>Muestra el estado de cada agente: conectado (<em>En línea</em>) si envió su heartbeat en los últimos 2 minutos, el servidor y el agente, el sistema operativo, las IPs, la última comunicación y los eventos y alertas de las últimas 24 horas. Los números son enlaces: te llevan a los eventos o alertas de ese servidor.</p><figure class="fg"><a href="img/portal/portal-07-mis-servidores.webp" target="_blank" rel="noopener"><img src="img/portal/portal-07-mis-servidores.webp" alt="Página Mis servidores" loading="lazy"></a><figcaption>Estado de los agentes y actividad de 24 horas.</figcaption></figure>`
        },
        {
          titulo: "7. Exposición",
          contenido: `<p>Resume la superficie de ataque de tus servidores a partir de una "foto" periódica que toma el agente:</p>
<ul><li><strong>Servidores supervisados:</strong> riesgo, estado del agente, última foto, puertos, expuestos, hallazgos y último cambio.</li><li><strong>Servicios y protocolos expuestos:</strong> puertos accesibles desde la red.</li><li><strong>Hallazgos y riesgos:</strong> reglas fijas del SIEM sobre servicios peligrosos expuestos, SSH, cortafuegos y procesos.</li><li><strong>Cambios en la superficie:</strong> últimos 7 días; la primera foto de cada servidor es la línea base y no cuenta como cambio.</li></ul><figure class="fg"><a href="img/portal/portal-08-exposicion.webp" target="_blank" rel="noopener"><img src="img/portal/portal-08-exposicion.webp" alt="Página de exposición" loading="lazy"></a><figcaption>Si no hay fotos todavía, las tarjetas indican que no hay datos.</figcaption></figure>`
        },
        {
          titulo: "8. Mapa de amenazas",
          contenido: `<p>Ubica en un mapa las IP de origen de las alertas. Arriba hay cinco contadores: alertas, alertas con ubicación, alertas sin datos geográficos, IP de origen y países. En el mapa, el tamaño de cada círculo indica cuántas alertas tiene, el color es la severidad máxima y los números agrupan ubicaciones cercanas. A la derecha, <strong>Ubicaciones</strong> lista las tres con más alertas (elige una para ver sus IP) y <strong>Por país</strong> las agrupa.</p><figure class="fg"><a href="img/portal/portal-22-mapa-amenazas.webp" target="_blank" rel="noopener"><img src="img/portal/portal-22-mapa-amenazas.webp" alt="Mapa de amenazas con ubicaciones y países" loading="lazy"></a><figcaption>Mapa de origen de las alertas, ubicaciones y desglose por país.</figcaption></figure><p><strong>Cómo interpretarlo:</strong> la ubicación sale de una base GeoIP local y es una estimación del punto de salida a internet de la IP, no la posición de una persona. VPN, proxies, NAT o Tor la cambian, y en una inundación con orígenes falsificados los países no significan nada. Las IP internas, reservadas o sin datos no se dibujan y se cuentan en "Sin datos geográficos".</p>`
        },
        {
          titulo: "9. Mis eventos",
          contenido: `<p>Es el registro detallado de todo lo que ven Suricata y los agentes. Indica cuántos eventos hay en el periodo y la página en la que estás. Busca por IP, dominio, firma, usuario, hash o archivo, y filtra por <strong>Tipo</strong>, <strong>Fuente</strong>, <strong>Severidad (IDS)</strong>, <strong>Periodo</strong> y <strong>Servidor</strong>; pulsa <strong>Buscar</strong>. La casilla <strong>En vivo</strong> actualiza la tabla cada 10 segundos. Al seleccionar una fila, el panel <strong>Detalle del evento</strong> muestra todos sus campos.</p><figure class="fg"><a href="img/portal/portal-23-mis-eventos.webp" target="_blank" rel="noopener"><img src="img/portal/portal-23-mis-eventos.webp" alt="Página Mis eventos" loading="lazy"></a><figcaption>Filtros, tabla de eventos y panel de detalle.</figcaption></figure><p><strong>Ejemplo:</strong> si recibes una alerta de fuerza bruta, busca la IP de origen aquí para ver todos sus intentos y no solo los que generaron la alerta.</p>`
        },
        {
          titulo: "10. Reportes",
          contenido: `<p>En <strong>Mis reportes</strong> descargas el <strong>reporte de ataques en PDF</strong> (alertas por severidad, tipos, cadena de ataque, orígenes y recomendaciones) y las <strong>alertas en CSV</strong> (hasta 5,000, con fecha, severidad, estado, regla, tipo y técnica MITRE). Elige el periodo y pulsa <em>Descargar</em>. Cada descarga queda registrada.</p><figure class="fg"><a href="img/portal/portal-19-mis-reportes.webp" target="_blank" rel="noopener"><img src="img/portal/portal-19-mis-reportes.webp" alt="Página Mis reportes" loading="lazy"></a><figcaption>Tarjetas de descarga de PDF y CSV.</figcaption></figure><figure class="fg"><a href="img/portal/portal-20-reporte-pdf.webp" target="_blank" rel="noopener"><img src="img/portal/portal-20-reporte-pdf.webp" alt="Ejemplo de reporte de ataques en PDF" loading="lazy"></a><figcaption>Primera página del reporte PDF de 24 horas.</figcaption></figure>`
        },
        {
          titulo: "11. Atajos de teclado",
          contenido: `<ul><li><code>/</code> enfoca el buscador.</li><li><code>j</code> / <code>k</code> recorren los eventos de la tabla.</li><li><code>a</code> abre Mis alertas.</li></ul>`
        }
      ]
    },
    {
      id: "agente-instalacion",
      titulo: "Instalación del agente",
      cat: "c2",
      fase: "instalar",
      aud: ["cliente"],
      estado: "elaboracion",
      desc: "Instalación y verificación del agente en los equipos protegidos.",
      esquema: ["Requisitos del equipo", "Descarga y verificación del instalador", "Instalación del agente", "Verificación del heartbeat"]
    },
    {
      id: "alertas-playbook",
      titulo: "Cómo interpretar y responder alertas",
      cat: "c5",
      fase: "operar",
      aud: ["cliente"],
      estado: "disponible",
      pdf: "usuario",
      desc: `Dónde ver las alertas, el correo de aviso, qué significa cada severidad y cómo responder.`,
      secciones: [
        {
          titulo: "1. Dónde ver las alertas",
          contenido: `<p>En <strong>Mis alertas</strong> las cuatro tarjetas (Críticas, Altas, Medias y Bajas) muestran el total, su porcentaje y la tendencia de 7 días; al pulsar una filtras por esa severidad. Los filtros permiten buscar por texto, severidad, estado, tipo de ataque, origen, periodo y servidor. La tabla indica fecha, severidad, tipo, regla, detalle, técnica MITRE y estado, y el botón <strong>Exportar CSV</strong> descarga lo filtrado.</p><figure class="fg"><a href="img/portal/portal-09-mis-alertas.webp" target="_blank" rel="noopener"><img src="img/portal/portal-09-mis-alertas.webp" alt="Página Mis alertas" loading="lazy"></a><figcaption>Tarjetas por severidad, filtros y tabla de alertas.</figcaption></figure>`
        },
        {
          titulo: "2. Aviso por correo",
          contenido: `<p>Cuando hay alertas importantes el SIEM envía un correo con el asunto <em>[VOX DEI] N alta: …</em>. Incluye <strong>Qué pasa</strong> y <strong>Qué hacer</strong> en lenguaje claro, además del equipo, la organización, el destino, la técnica, la fase, el MITRE ATT&amp;CK, la regla, el registro que la originó, la primera vez y cuántas repeticiones se agruparon.</p><figure class="fg"><a href="img/portal/portal-10-correo-alerta.webp" target="_blank" rel="noopener"><img src="img/portal/portal-10-correo-alerta.webp" alt="Correo de alerta de VOX DEI" loading="lazy"></a><figcaption>Ejemplo de correo con explicación y datos de la alerta.</figcaption></figure>`
        },
        {
          titulo: "3. Página Ataques y cadena de ataque",
          contenido: `<p>Si tu rol tiene el permiso <code>attacks:read</code> (ver ataques, cadena y perfil de origen), tendrás la página <strong>Ataques</strong>. Se actualiza cada 30 segundos y permite elegir 1 h, 24 h o 7 d, además de descargar el <strong>Reporte PDF</strong>.</p>
<ul><li><strong>Cadena de ataque:</strong> seis fases, de menor a mayor gravedad, cada una con su cuenta y su código MITRE: reconocimiento (TA0043), acceso inicial (TA0001), credenciales (TA0006), persistencia (TA0003), comando y control (TA0011) e impacto (TA0040). Pulsa una fase para filtrar; más color significa más actividad.</li><li><strong>Resumen en lenguaje claro:</strong> la página indica cuál es la fase más avanzada observada y si por ahora son solo intentos.</li><li><strong>Línea de tiempo de ataques:</strong> pulsa una barra para ver sus alertas o una fase de la leyenda para ocultarla.</li></ul><figure class="fg"><a href="img/portal/portal-24-ataques-cadena.webp" target="_blank" rel="noopener"><img src="img/portal/portal-24-ataques-cadena.webp" alt="Página Ataques con la cadena de ataque" loading="lazy"></a><figcaption>Cadena de ataque por fases y línea de tiempo.</figcaption></figure>`
        },
        {
          titulo: "4. Severidades",
          contenido: `<ul>
<li><strong>Crítica:</strong> ataque real con impacto probable. Atender de inmediato.</li>
<li><strong>Alta:</strong> ataque claro o intento serio. Revisar hoy.</li>
<li><strong>Media:</strong> actividad sospechosa. Vigilar y revisar si se repite.</li>
<li><strong>Baja:</strong> informativa; importa si se combina con otras.</li>
</ul>`
        },
        {
          titulo: "5. Flujo de 5 pasos",
          contenido: `<ol>
<li><strong>Lee el detalle:</strong> abre la regla para ver la explicación "Qué significa" y "Qué hacer".</li>
<li><strong>Identifica origen y objetivo:</strong> IP de origen (interna o externa) y servidor atacado.</li>
<li><strong>Revisa los eventos relacionados:</strong> son la evidencia; busca patrones.</li>
<li><strong>Decide:</strong> si es legítimo, márcala como <em>Falso positivo</em>; si es real, bloquea la IP en tu firewall o escala a tu administrador.</li>
<li><strong>Documenta:</strong> cambia el estado a <em>En revisión</em> o <em>Cerrada</em> y, si hace falta, abre un incidente.</li>
</ol>`
        },
        {
          titulo: "6. Estados de una alerta",
          contenido: `<p><strong>Abierta</strong> (sin revisar), <strong>En revisión</strong> (alguien investiga), <strong>Cerrada</strong> (resuelta) y <strong>Falso positivo</strong> (actividad legítima; deja de contar en KPIs y gráficas).</p>`
        },
        {
          titulo: "7. Cadena de ataque",
          contenido: `<p>Las alertas se ubican en una fase, de menos a más grave: reconocimiento, acceso inicial, credenciales, persistencia, comando y control (C2) e impacto. Cada alerta incluye las técnicas MITRE ATT&amp;CK asociadas.</p>`
        },
        {
          titulo: "8. Cuándo escalar",
          contenido: `<ul><li>Un servidor lleva más de 15 minutos desconectado.</li><li>Un servidor sin alertas empieza a generar muchas.</li><li>El indicador de ataque persiste o hay alertas críticas.</li><li>El agente cambia entre conectado y desconectado sin motivo.</li></ul>`
        }
      ]
    },
    {
      id: "modo-monitoreo",
      titulo: "Modo Monitoreo y contención activa",
      cat: "c5",
      fase: "operar",
      aud: ["preventa", "cliente"],
      estado: "planeado",
      desc: "Diferencia entre observar y contener, cómo se activa la contención y cómo se revierte.",
      esquema: ["Qué hace el Modo Monitoreo", "Qué cambia con la contención activa", "Cómo activarla y cómo revertirla", "Impacto esperado en la red"]
    },
    {
      id: "requisitos",
      titulo: "Requisitos y compatibilidad",
      cat: "c8",
      fase: "referencia",
      aud: ["preventa"],
      estado: "planeado",
      desc: "Qué necesita tu infraestructura para usar ALMA.",
      esquema: ["Sistemas operativos y versiones", "Requisitos de red y puertos", "Hardware del sensor", "Límites conocidos"]
    },
    {
      id: "seguridad-privacidad",
      titulo: "Seguridad y privacidad de los datos",
      cat: "c8",
      fase: "referencia",
      aud: ["preventa"],
      estado: "planeado",
      desc: "Qué datos se recolectan, dónde se guardan y cómo se protegen.",
      esquema: ["Qué datos se recolectan", "Dónde se almacenan y por cuánto tiempo", "Cifrado en tránsito", "Quién tiene acceso"]
    },
    {
      id: "faq-glosario",
      titulo: "Preguntas frecuentes y glosario",
      cat: "c8",
      fase: "referencia",
      aud: ["preventa","cliente"],
      estado: "disponible",
      pdf: "usuario",
      desc: `Respuestas rápidas y definiciones de los términos que usa la plataforma.`,
      secciones: [
        {
          titulo: "Preguntas frecuentes",
          contenido: `<ul>
<li><strong>¿Cada cuánto se actualiza el dashboard?</strong> Cada 10 segundos.</li>
<li><strong>¿Cómo sé si un agente está desconectado?</strong> En Mis servidores aparece en rojo; se considera desconectado si no envía heartbeat en 5 minutos.</li>
<li><strong>¿Puedo marcar una alerta como falso positivo?</strong> Sí, con el permiso <code>alerts:update</code>.</li>
<li><strong>¿Qué pasa si pierdo mi contraseña?</strong> Tu administrador te asigna una temporal que debes cambiar al entrar.</li>
<li><strong>¿Por qué no veo la sección Usuarios?</strong> Solo el Admin de Cliente la tiene.</li>
<li><strong>¿Qué pasa tras 5 intentos fallidos?</strong> La cuenta se bloquea 15 minutos (valores por defecto).</li>
</ul>`
        },
        {
          titulo: "Glosario",
          contenido: `<ul>
<li><strong>SIEM:</strong> sistema que recopila, analiza y correlaciona eventos de seguridad.</li>
<li><strong>Evento:</strong> actividad registrada en la red o en un servidor.</li>
<li><strong>Alerta:</strong> notificación generada cuando un evento cumple una regla.</li>
<li><strong>Agente:</strong> programa instalado en un servidor que envía eventos al SIEM.</li>
<li><strong>Heartbeat:</strong> señal periódica que indica que el agente está vivo.</li>
<li><strong>Suricata:</strong> sensor de red que analiza tráfico con firmas.</li>
<li><strong>MITRE ATT&amp;CK:</strong> base de conocimiento de tácticas y técnicas de atacantes.</li>
<li><strong>Falso positivo:</strong> alerta causada por actividad legítima.</li>
<li><strong>C2:</strong> servidor del atacante que da órdenes al malware.</li>
<li><strong>Alcance (scope):</strong> qué organizaciones y activos puede ver un usuario.</li>
</ul>`
        }
      ]
    },
    {
      id: "notas-version",
      titulo: "Notas de versión y compatibilidad",
      cat: "c8",
      fase: "referencia",
      aud: ["cliente"],
      estado: "planeado",
      desc: "Cambios entre versiones y compatibilidad entre componentes.",
      esquema: ["Cambios por versión", "Matriz de compatibilidad"]
    },
    {
      id: "admin-usuarios-roles",
      titulo: "Administración de usuarios, roles y alcance",
      cat: "c1",
      fase: "configurar",
      aud: ["cliente"],
      estado: "disponible",
      pdf: "admin",
      desc: `Organizaciones, usuarios, roles personalizados, alcance y reglas contra escalada de privilegios.`,
      secciones: [
        {
          titulo: "1. Modelo de seguridad",
          contenido: `<p>El acceso se controla con tres conceptos: <strong>usuario</strong> (cuenta con credenciales), <strong>rol</strong> (conjunto de permisos; cada usuario tiene exactamente uno) y <strong>alcance</strong> (qué organizaciones y activos ve). Cada consulta a OpenSearch se filtra por el alcance del usuario y ningún parámetro de la URL puede saltarse ese filtro.</p>`
        },
        {
          titulo: "2. Organizaciones (solo superadmin)",
          contenido: `<ul><li>Se crean en <strong>Clientes y organizaciones</strong> con nombre, correo de contacto y notas internas.</li><li>El nombre es único.</li><li><strong>Suspender</strong> cierra las sesiones de sus usuarios y conserva los datos; <strong>reactivar</strong> devuelve el acceso en el siguiente inicio de sesión.</li></ul>`
        },
        {
          titulo: "3. Usuarios",
          contenido: `<ul><li>Alta en <strong>Usuarios → Nuevo usuario</strong>: nombre, correo, rol, organización o alcance y contraseña inicial (mínimo 12 caracteres, con cambio obligatorio).</li><li>Se puede editar, bloquear/desbloquear, restablecer contraseña y cerrar sesiones. Al cambiar rol o alcance se cierran sus sesiones.</li><li>No puedes cambiar tu propio rol, bloquearte, ni bloquear o degradar al último superadministrador activo.</li></ul>`
        },
        {
          titulo: "4. Roles y permisos",
          contenido: `<p>Roles del sistema: <code>superadmin</code>, <code>analyst</code> y <code>client</code> (no editables). Puedes crear roles propios con un subconjunto de tus permisos, por ejemplo:</p>
<ul><li><strong>Auditor:</strong> <code>dashboard:read</code>, <code>events:read</code>, <code>events:export</code>, <code>alerts:read</code>, <code>statistics:read</code>, <code>reports:read</code>, <code>reports:export</code>, <code>assets:read</code>.</li><li><strong>Administrador de cliente:</strong> los del rol client más <code>users:*</code> y <code>roles:read</code>/<code>roles:manage</code>.</li></ul>
<p>No se puede borrar un rol que tenga usuarios asignados.</p>`
        },
        {
          titulo: "5. Anti escalada de privilegios",
          contenido: `<p>Nadie puede otorgar un permiso que no tiene, un admin de cliente solo gestiona usuarios de su organización y no puede restablecer la contraseña de alguien con más permisos. Estas reglas se validan en el servidor, no en el navegador.</p>`
        },
        {
          titulo: "6. Alcance",
          contenido: `<p>Hay tres formas: <code>scope:global</code> (todo, solo superadmin), por organización o por activo. Un usuario sin alcance asignado puede iniciar sesión pero no verá datos.</p>`
        }
      ]
    },
    {
      id: "admin-agentes-activos",
      titulo: "Activos y agentes: inventario y enrolamiento",
      cat: "c2",
      fase: "instalar",
      aud: ["cliente"],
      estado: "disponible",
      pdf: "admin",
      desc: `Inventario de activos, tokens de enrolamiento, aprobación, revocación y rotación de credenciales.`,
      secciones: [
        {
          titulo: "1. Inventario de activos",
          contenido: `<p>Cada activo tiene organización, hostname, tipo, sistema operativo, ID de agente, IPs y estado. El inventario es la base del aislamiento: los eventos de agente se asignan a la organización de su activo, y los eventos de red (Suricata) a la del activo cuya IP coincida con el origen o destino. Si un activo no está en el inventario, solo lo ve quien tenga <code>scope:global</code>.</p>`
        },
        {
          titulo: "2. Registrar, editar y retirar",
          contenido: `<p>Se registra en <strong>Servidores y agentes</strong>. Al cambiar la organización de un activo, el historial no se reasigna. En lugar de borrar, conviene usar el estado <strong>Retirado</strong>: deja de recibir datos pero conserva el historial bien asignado.</p>`
        },
        {
          titulo: "3. Enrolar un agente",
          contenido: `<p>Se genera un token de un solo uso (validez de 1 hora, 24 horas o 7 días), con la opción de exigir aprobación. El token solo se muestra una vez.</p>
<div class="cmd">docker compose exec web python manage.py enrollment-token --hostname srv-01 --hours 24</div>`
        },
        {
          titulo: "4. Estados del agente",
          contenido: `<ul><li><strong>Pendiente:</strong> enrolado, esperando aprobación; no envía eventos.</li><li><strong>Conectado:</strong> envía heartbeats.</li><li><strong>Desconectado:</strong> sin heartbeat en 5 minutos.</li><li><strong>Revocado:</strong> no puede enviar eventos y no se reactiva; hay que enrolar uno nuevo.</li></ul><p>Con <strong>Rotar credencial</strong> el agente cambia su credencial en el siguiente heartbeat; úsalo si sospechas que fue comprometida.</p>`
        },
        {
          titulo: "5. Buenas prácticas",
          contenido: `<ul><li>Registra todos los servidores, incluso sin agente.</li><li>Mantén las IPs actualizadas.</li><li>Usa nombres de host consistentes.</li><li>Revisa periódicamente los agentes desconectados.</li></ul>`
        }
      ]
    },
    {
      id: "admin-auditoria-mantenimiento",
      titulo: "Auditoría, almacenamiento y mantenimiento",
      cat: "c5",
      fase: "operar",
      aud: ["cliente"],
      estado: "disponible",
      pdf: "admin",
      desc: `Auditoría administrativa, política de acceso, retención de datos, copias de seguridad y revisiones periódicas.`,
      secciones: [
        {
          titulo: "1. Auditoría",
          contenido: `<p>Registra inicios de sesión, cambios en organizaciones, usuarios, roles, activos, agentes y reglas, cambios de configuración, exportaciones, limpiezas de datos y accesos denegados. Nunca guarda contraseñas ni tokens. Se filtra por acción, usuario, resultado y periodo, y se conserva indefinidamente en MongoDB.</p>`
        },
        {
          titulo: "2. Investigar un cambio sospechoso",
          contenido: `<p><strong>Usuario no autorizado:</strong> filtra por la acción <code>user.create</code> y revisa quién lo creó, cuándo y desde qué IP. <strong>Acceso a otra organización:</strong> filtra por resultado <em>Denegado</em>.</p>`
        },
        {
          titulo: "3. Política de acceso (superadmin)",
          contenido: `<p>Por defecto: 5 intentos fallidos, bloqueo de 15 minutos y sesiones de 8 horas. Los cambios aplican a nuevos intentos y nuevas sesiones.</p>`
        },
        {
          titulo: "4. Fuentes de datos: sensor y agentes",
          contenido: `<p>La página <strong>Fuentes de datos</strong> tiene dos pestañas, <em>Sensor</em> y <em>Agentes</em>. En el sensor Suricata verás su estado (activo), la captura, cuándo llegó el último evento, los eventos de la última hora y el camino que siguen: <code>eve.json → Fluent Bit → OpenSearch (suricata-*)</code>. También lista los tipos de evento de la última hora (flow, tls, dns, alert).</p>
<p><strong>Protecciones activas:</strong></p>
<ul><li><strong>Vigilante:</strong> si Suricata deja de analizar, lo reinicia solo en aproximadamente 1 minuto.</li><li><strong>Filtro de inundaciones:</strong> descarta conexiones falsificadas y limita las conexiones a 200 por segundo; las alertas nunca se limitan.</li><li><strong>Rotación de eve.json:</strong> al pasar de 300 MB se rota y solo se guarda una copia.</li></ul>
<p>Más abajo, <strong>Agentes en hosts</strong> resume cuántos agentes están en línea (por ejemplo, 1 de 1).</p><figure class="fg"><a href="img/admin/admin-01-fuentes-datos.webp" target="_blank" rel="noopener"><img src="img/admin/admin-01-fuentes-datos.webp" alt="Página Fuentes de datos" loading="lazy"></a><figcaption>Estado del sensor de red Suricata y de los agentes.</figcaption></figure>`
        },
        {
          titulo: "5. Almacenamiento",
          contenido: `<p>Los eventos de red y de agentes se retienen 30 días; alertas y heartbeats, de forma indefinida. Desde Fuentes de datos → Limpieza puedes borrar ruido, borrar por antigüedad y compactar para recuperar espacio en disco.</p>`
        },
        {
          titulo: "6. Comandos de mantenimiento",
          contenido: `<div class="cmd">docker compose ps<br>docker compose logs opensearch<br>docker compose exec web python manage.py status</div><p>Respalda MongoDB con <code>mongodump</code>, OpenSearch con snapshots y copia <code>.env</code>, <code>docker-compose.yml</code>, <code>detection/rules/</code>, <code>suricata/</code> y <code>nginx/certs/</code>.</p>`
        },
        {
          titulo: "7. Revisiones periódicas",
          contenido: `<ul><li><strong>Diaria:</strong> sensor, agentes, alertas críticas y espacio en disco.</li><li><strong>Semanal:</strong> auditoría de 7 días, agentes desconectados y reglas ruidosas.</li><li><strong>Mensual:</strong> política de acceso, roles, retención y copia de seguridad.</li><li><strong>Trimestral:</strong> inventario, organizaciones y usuarios, actualización.</li></ul>`
        }
      ]
    },
    {
      id: "sdn-panel-noc",
      titulo: "Panel ALMA SDN NOC: topología, telemetría y políticas",
      cat: "c2",
      fase: "operar",
      aud: ["cliente"],
      estado: "disponible",
      desc: `Recorrido paso a paso por el panel SDN: topología, tráfico, controlador OS-Ken, telemetría, VXLAN, políticas y historial.`,
      secciones: [
        {
          titulo: "1. Qué es el panel y cómo se entra",
          contenido: `<p>ALMA SDN NOC es el panel para vigilar la red definida por software: el controlador OS-Ken, los switches Open vSwitch y el túnel VXLAN. El menú lateral tiene cuatro secciones: <strong>Topología</strong>, <strong>Monitoreo</strong>, <strong>Infraestructura</strong> y <strong>Administración SDN</strong>.</p>
<p>Hay dos modos, y se ven en la tarjeta "Modo" de la parte superior:</p>
<ul><li><strong>Lectura:</strong> sin sesión. Solo permite consultar; el panel lateral pide la contraseña administrativa.</li><li><strong>Administración:</strong> tras pulsar <em>Iniciar sesión</em> con la contraseña administrativa. Habilita la aplicación de políticas OpenFlow y el botón <em>Cerrar sesión</em>.</li></ul><figure class="fg"><a href="img/sdn/sdn-01-topologia-lectura.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-01-topologia-lectura.webp" alt="Topología SDN en modo lectura" loading="lazy"></a><figcaption>Modo lectura: el panel lateral pide la contraseña administrativa.</figcaption></figure><figure class="fg"><a href="img/sdn/sdn-02-topologia-administracion.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-02-topologia-administracion.webp" alt="Topología SDN en modo administración" loading="lazy"></a><figcaption>Modo administración: la tarjeta indica "Políticas OpenFlow - acceso autenticado".</figcaption></figure>`
        },
        {
          titulo: "2. Leer la topología",
          contenido: `<p>Arriba hay cuatro tarjetas: switches conectados (se actualiza cada 5 segundos), estado del controlador (OpenFlow, TCP 6653), modo de acceso y políticas activas.</p>
<ol><li>En la parte superior está el controlador <strong>Debian - alma-services</strong> (OS-Ken, OpenFlow 1.3, GCP).</li><li>Debajo, los dos switches <strong>OVS Ikkiland</strong> y <strong>OVS node1</strong>, cada uno con su DPID y estado.</li><li>Entre ellos, el enlace <strong>VXLAN - VNI 100</strong> con la tasa inferida en cada sentido.</li><li>Abajo, los hosts con su IP, puerto, TX y RX. Verde significa "Tráfico observado"; "Sin tráfico reciente" indica un host callado.</li></ol>
<p>Las líneas punteadas son <strong>sesiones de control OpenFlow</strong>, no enlaces de datos.</p>`
        },
        {
          titulo: "3. Topología completa e inspector de dispositivos",
          contenido: `<ol><li>Pulsa <strong>Ver topología completa</strong> (arriba a la derecha de la tarjeta de topología).</li><li>Se abre una vista ampliada con ALMA-SERVICES, IKKILAND y NODE1, cada uno con su estado.</li><li>Selecciona un switch para ver en el <strong>Inspector de dispositivos</strong> su DPID, estado y telemetría.</li><li>Con <strong>Ver telemetría completa</strong> saltas al detalle del switch.</li></ol><figure class="fg"><a href="img/sdn/sdn-03-topologia-completa.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-03-topologia-completa.webp" alt="Topología completa sin selección" loading="lazy"></a><figcaption>Vista ampliada antes de seleccionar un switch; el inspector aparece vacío.</figcaption></figure><figure class="fg"><a href="img/sdn/sdn-04-inspector-switch.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-04-inspector-switch.webp" alt="Inspector con IKKILAND seleccionado" loading="lazy"></a><figcaption>Con IKKILAND seleccionado se muestran DPID, estado y telemetría.</figcaption></figure>`
        },
        {
          titulo: "4. Trayectoria del tráfico",
          contenido: `<p>Dentro de la topología completa, la tarjeta <strong>Trayectoria del tráfico</strong> dibuja el recorrido de una comunicación: hosts, puertos, switches y el túnel VXLAN. Selecciona una comunicación de la tabla de conexiones; con <strong>−</strong>, <strong>+</strong> y el porcentaje ajustas el zoom, y <strong>Limpiar ruta</strong> borra la selección.</p><figure class="fg"><a href="img/sdn/sdn-05-trayectoria-trafico.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-05-trayectoria-trafico.webp" alt="Trayectoria del tráfico" loading="lazy"></a><figcaption>Sin comunicación seleccionada se muestra la estructura base: dos OVS y cuatro hosts.</figcaption></figure>`
        },
        {
          titulo: "5. Tráfico en tiempo real",
          contenido: `<p>Muestra la velocidad de paquetes recibidos (RX) y enviados (TX). El selector <strong>Paquetes/s | Mbps</strong> cambia la unidad. En la gráfica, RX va en azul y TX en plata discontinuo; también se indica el valor máximo y cuántas mediciones se muestran.</p><figure class="fg"><a href="img/sdn/sdn-06-trafico-tiempo-real.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-06-trafico-tiempo-real.webp" alt="Gráfica de tráfico de red en tiempo real" loading="lazy"></a><figcaption>Gráfica en paquetes por segundo con las últimas mediciones.</figcaption></figure>`
        },
        {
          titulo: "6. Conexiones de red",
          contenido: `<p>La tabla lista cada comunicación observada con origen, destino, protocolo, paquetes, bytes, pps, transferencia, observaciones del destino, trayectoria y un botón <strong>Ver ruta</strong> que la dibuja en la topología. La captura es pasiva, por ventanas de 60 segundos, y <strong>las trayectorias son inferidas</strong>.</p><figure class="fg"><a href="img/sdn/sdn-07-conexiones-red.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-07-conexiones-red.webp" alt="Tabla de conexiones de red" loading="lazy"></a><figcaption>Resumen de la ventana: comunicaciones, paquetes, bytes, pps y kbps.</figcaption></figure>`
        },
        {
          titulo: "7. Controlador y telemetría del switch",
          contenido: `<p>La tarjeta del controlador muestra framework (OS-Ken), protocolo (OpenFlow 1.3), puerto (TCP 6653) y switches conectados. Más abajo, <strong>Estado de la red SDN</strong> resume el controlador y cada switch.</p><figure class="fg"><a href="img/sdn/sdn-08-controlador-os-ken.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-08-controlador-os-ken.webp" alt="Controlador OS-Ken en línea" loading="lazy"></a><figcaption>Controlador reportado como conectado, con 2 switches.</figcaption></figure><p>En <strong>Telemetría del switch seleccionado</strong> hay dos pestañas, <em>Puertos</em> y <em>Flujos OpenFlow</em>. Se ve cuántos puertos reporta y los paquetes recibidos y enviados por puerto (interno LOCAL, VXLAN hacia Node1, puerto de pruebas y puerto 3).</p><figure class="fg"><a href="img/sdn/sdn-09-telemetria-switch.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-09-telemetria-switch.webp" alt="Telemetría del switch Ikkiland" loading="lazy"></a><figcaption>Los contadores son acumulados, no velocidades.</figcaption></figure><p><strong>Importante:</strong> los contadores son acumulados y el estado "Conectado" de un switch no confirma la conectividad de extremo a extremo.</p>`
        },
        {
          titulo: "8. Monitor VXLAN y políticas OpenFlow",
          contenido: `<p>El <strong>Monitor VXLAN</strong> muestra los paquetes RX y TX del túnel Ikkiland ↔ Node1 (VNI 100) y si hay tráfico reciente.</p>
<p>En <strong>Administración SDN</strong> (requiere sesión administrativa) se aplica una política así:</p>
<ol><li>Elige el <strong>switch</strong>.</li><li>Elige el <strong>tipo de política</strong> (por ejemplo ICMP o TCP).</li><li>Elige la <strong>acción</strong>: Bloquear o Desbloquear.</li><li>Escribe la <strong>IP de origen</strong> y la <strong>IP de destino</strong>.</li><li>Pulsa <strong>Aplicar política</strong>.</li></ol>
<p>A la derecha, <strong>Redirección automática TCP</strong> muestra el servicio virtual, el modo automático, los servidores principal y secundario, los fallos consecutivos (0/3) y las recuperaciones (0/5).</p><figure class="fg"><a href="img/sdn/sdn-10-vxlan-politicas.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-10-vxlan-politicas.webp" alt="Monitor VXLAN y administración SDN" loading="lazy"></a><figcaption>Monitor VXLAN, formulario de políticas y redirección automática TCP.</figcaption></figure>`
        },
        {
          titulo: "9. Historial de cambios",
          contenido: `<p>Registro persistente de las operaciones OpenFlow: operaciones totales, confirmadas, sin confirmar y con error. Puedes buscar por IP, switch o política, filtrar por resultado y abrir los <strong>Detalles</strong> de cada fila (fecha, rol, switch, acción, protocolo, origen, destino, puerto y resultado). Revísalo después de aplicar una política para comprobar que quedó <em>Instalada</em> o <em>Eliminada</em>.</p><figure class="fg"><a href="img/sdn/sdn-11-historial-cambios.webp" target="_blank" rel="noopener"><img src="img/sdn/sdn-11-historial-cambios.webp" alt="Historial de cambios OpenFlow" loading="lazy"></a><figcaption>Contadores de operaciones y tabla de bloqueos y desbloqueos.</figcaption></figure>`
        }
      ]
    },
    {
      id: "estadisticas-red",
      titulo: "Estadísticas y tráfico de red",
      cat: "c4",
      fase: "operar",
      aud: ["cliente"],
      estado: "disponible",
      pdf: "usuario",
      desc: `Técnicas, fases de ataque, mapa de calor, orígenes, protocolos, puertos y dominios.`,
      secciones: [
        {
          titulo: "1. Embudo de detección y tipos de ataque",
          contenido: `<p>La página <strong>Mis estadísticas</strong> se actualiza cada minuto y permite elegir 24 h o 7 d. El embudo <em>De todo el tráfico a lo que importa</em> muestra cómo se reduce el volumen: eventos analizados (lo que vieron Suricata y los agentes), firmas de Suricata (coincidencias con alguna firma), alertas del SIEM (lo que las reglas consideran un ataque) y, al final, las alertas críticas o altas, que son las que hay que atender.</p>
<p><strong>Tipos de ataque</strong> cuenta ataques y no firmas: si varias firmas detectan la misma conexión, cuenta una sola vez. Se muestra como dona por tipo y en una gráfica por hora.</p><figure class="fg"><a href="img/portal/portal-21-estadisticas-embudo.webp" target="_blank" rel="noopener"><img src="img/portal/portal-21-estadisticas-embudo.webp" alt="Embudo de detección y tipos de ataque" loading="lazy"></a><figcaption>Embudo de detección y tipos de ataque por hora.</figcaption></figure>`
        },
        {
          titulo: "2. Técnicas y puertos atacados",
          contenido: `<p>En <strong>Mis estadísticas</strong>, <em>Técnicas detectadas</em> cuenta ataques distintos por técnica (por ejemplo anomalía de red o ping de descubrimiento). <em>Puertos atacados</em> muestra los ataques dirigidos a un puerto; los escaneos se resumen debajo, indicando qué IP probó cuántos puertos y cuáles.</p><figure class="fg"><a href="img/portal/portal-11-estadisticas-tecnicas-puertos.webp" target="_blank" rel="noopener"><img src="img/portal/portal-11-estadisticas-tecnicas-puertos.webp" alt="Técnicas detectadas y puertos atacados" loading="lazy"></a><figcaption>Técnicas detectadas y resumen de escaneos de puertos.</figcaption></figure>`
        },
        {
          titulo: "3. Alertas: severidad, fase y reglas",
          contenido: `<ul><li><strong>Alertas por hora y severidad:</strong> distribución por hora, con opción de ver como tabla.</li><li><strong>Por fase de la cadena de ataque:</strong> de menos a más grave; un atacante que llega a las fases de abajo ya pasó de intentar a conseguir algo.</li><li><strong>Reglas que más alertan:</strong> detecta reglas ruidosas o muy activas.</li><li><strong>¿A qué horas llegan las alertas?:</strong> mapa de calor de los últimos 7 días, útil para ver patrones nocturnos o automatizados.</li></ul><figure class="fg"><a href="img/portal/portal-12-estadisticas-alertas.webp" target="_blank" rel="noopener"><img src="img/portal/portal-12-estadisticas-alertas.webp" alt="Alertas por hora, fase y reglas" loading="lazy"></a><figcaption>Alertas por hora, fase de ataque, reglas y mapa de calor.</figcaption></figure>`
        },
        {
          titulo: "4. Quién ataca y a qué",
          contenido: `<p><strong>Orígenes con más alertas</strong> marca cada IP como <em>Interna</em> o <em>Externa</em>, y <strong>Equipos más atacados</strong> muestra los destinos. Un origen interno puede ser un equipo comprometido, así que conviene revisarlo aunque no sea una IP pública.</p><figure class="fg"><a href="img/portal/portal-13-estadisticas-origenes.webp" target="_blank" rel="noopener"><img src="img/portal/portal-13-estadisticas-origenes.webp" alt="Orígenes con más alertas y equipos más atacados" loading="lazy"></a><figcaption>Orígenes internos y externos y equipos más atacados.</figcaption></figure>`
        },
        {
          titulo: "5. Tráfico de la red",
          contenido: `<p>Lo que Suricata ve pasar por la interfaz, para saber qué es normal y notar lo raro:</p>
<ul><li><strong>Protocolos:</strong> TLS, mDNS, DNS, DHCP… "Sin identificar" son conexiones que no llegaron a intercambiar datos reconocibles.</li><li><strong>Puertos de destino:</strong> los más usados.</li><li><strong>Dominios más consultados:</strong> un pico hacia un dominio desconocido puede indicar malware.</li></ul><figure class="fg"><a href="img/portal/portal-14-estadisticas-trafico.webp" target="_blank" rel="noopener"><img src="img/portal/portal-14-estadisticas-trafico.webp" alt="Protocolos, puertos y dominios" loading="lazy"></a><figcaption>Protocolos, puertos de destino y dominios más consultados.</figcaption></figure>`
        }
      ]
    },
    {
      id: "ml-anomalias",
      titulo: "Machine Learning: detección de anomalías",
      cat: "c4",
      fase: "operar",
      aud: ["cliente"],
      estado: "disponible",
      pdf: "usuario",
      desc: `Cómo funciona el modelo Isolation Forest, cómo leer la puntuación y cómo se compara con las reglas.`,
      secciones: [
        {
          titulo: "1. Qué es y cómo se lee",
          contenido: `<p>La página <strong>Machine Learning</strong> usa un modelo <em>Isolation Forest</em> que aprende cómo es el tráfico normal de tu red y marca los flujos que se salen del patrón. Complementa a las reglas, porque no necesita conocer el ataque de antemano. El selector 24h, 7d y 30d cambia el periodo y la página se actualiza sola cada minuto.</p>
<ul><li><strong>Ataques detectados hoy y este mes</strong> (ataques distintos, no firmas repetidas).</li><li><strong>MTTD:</strong> tiempo medio desde el primer evento hasta la alerta.</li><li><strong>Detectado por ML:</strong> qué parte de las alertas vino del modelo.</li></ul><figure class="fg"><a href="img/portal/portal-15-ml-resumen.webp" target="_blank" rel="noopener"><img src="img/portal/portal-15-ml-resumen.webp" alt="Resumen de Machine Learning" loading="lazy"></a><figcaption>Indicadores del modelo y estado de entrenamiento.</figcaption></figure>`
        },
        {
          titulo: "2. El modelo",
          contenido: `<p>La tarjeta <strong>El modelo</strong> indica el estado (Activo), la fecha de entrenamiento, los flujos usados y la última vuelta. Se reentrena cada 24 horas con los últimos 7 días, evalúa cada 30 segundos en ventanas de 3 minutos, usa 15 variables por flujo, 200 árboles y emite como máximo una alerta por origen cada 10 minutos.</p>`
        },
        {
          titulo: "3. Reglas contra ML",
          contenido: `<p>La gráfica <em>Alertas por hora, reglas y ML</em> y la tabla <em>Comparativa</em> muestran cuántas alertas, qué porcentaje, cuántos ataques y qué MTTD tiene cada origen. El MTTD del ML es mayor porque incluye la espera de su ventana: agrupa los flujos anómalos de un origen antes de alertar.</p><figure class="fg"><a href="img/portal/portal-16-ml-reglas-vs-ml.webp" target="_blank" rel="noopener"><img src="img/portal/portal-16-ml-reglas-vs-ml.webp" alt="Comparativa entre reglas y machine learning" loading="lazy"></a><figcaption>Alertas por hora separadas por reglas y ML, y comparativa.</figcaption></figure>`
        },
        {
          titulo: "4. Lo que detectó el ML",
          contenido: `<p>Muestra las alertas del modelo (regla ML-001) por severidad, por fase MITRE ATT&amp;CK y el top 10 de orígenes anómalos. Pulsa un sector o una barra para ver las alertas correspondientes.</p><figure class="fg"><a href="img/portal/portal-17-ml-detecciones.webp" target="_blank" rel="noopener"><img src="img/portal/portal-17-ml-detecciones.webp" alt="Detecciones del modelo ML" loading="lazy"></a><figcaption>Detecciones por severidad, fase y orígenes anómalos.</figcaption></figure>`
        },
        {
          titulo: "5. Últimas anomalías y puntuación",
          contenido: `<p>La tabla lista hora, severidad, origen → destino, fase, número de flujos, puntuación y estado. La puntuación es la del modelo: <strong>cuanto más negativa, más se sale de lo normal</strong> (menor que −0,10 se considera media y menor que −0,20, alta).</p><figure class="fg"><a href="img/portal/portal-18-ml-ultimas-anomalias.webp" target="_blank" rel="noopener"><img src="img/portal/portal-18-ml-ultimas-anomalias.webp" alt="Tabla de últimas anomalías" loading="lazy"></a><figcaption>Últimas anomalías con puntuación del modelo.</figcaption></figure><p>Al final, <strong>Atención de las alertas</strong> resume cuántas siguen abiertas y cuántas se resolvieron.</p>`
        }
      ]
    }
  ]
};
