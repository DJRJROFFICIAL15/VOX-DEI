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
      desc: `Cómo leer el portal del cliente: dashboard, servidores, alertas, eventos, estadísticas y reportes.`,
      secciones: [
        {
          titulo: "1. Qué es el portal",
          contenido: `<p>El portal del cliente muestra únicamente los datos de tu organización: estado de seguridad, alertas, eventos, servidores, estadísticas y reportes. Se accede desde el navegador con tu usuario y contraseña; la primera vez que entras con una contraseña temporal el sistema te obliga a cambiarla (mínimo 12 caracteres).</p>`
        },
        {
          titulo: "2. Menú lateral",
          contenido: `<ul>
<li><strong>Mi dashboard:</strong> resumen de seguridad y aviso de ataque en curso.</li>
<li><strong>Mis servidores:</strong> estado de los agentes (conectado, desconectado, sin agente).</li>
<li><strong>Mis alertas:</strong> detecciones con severidad, regla, técnica MITRE y estado.</li>
<li><strong>Mis eventos:</strong> registro detallado de red y servidores, con exportación a CSV.</li>
<li><strong>Mis estadísticas:</strong> embudo de detección, tendencias, mapa de calor y tráfico.</li>
<li><strong>Mis reportes:</strong> reporte de ataques en PDF y alertas/eventos en CSV.</li>
</ul>`
        },
        {
          titulo: "3. Leer el dashboard",
          contenido: `<ul>
<li><strong>Selector de periodo:</strong> 1 hora, 24 horas, 7 días o todo el historial.</li>
<li><strong>Banner de ataque:</strong> aparece en rojo o naranja si hubo alertas medias o superiores en los últimos 15 minutos.</li>
<li><strong>KPIs:</strong> alertas críticas, alertas altas, eventos analizados y servidores conectados, con tendencia contra el periodo anterior.</li>
<li><strong>Muchos eventos y pocas alertas</strong> indica que el sistema filtra bien el ruido; <strong>pocos eventos y muchas alertas</strong> puede indicar un ataque dirigido.</li>
</ul>`
        },
        {
          titulo: "4. Atajos de teclado",
          contenido: `<ul><li><code>/</code> enfoca el buscador.</li><li><code>j</code> / <code>k</code> recorren los eventos de la tabla.</li><li><code>a</code> abre Mis alertas.</li></ul>`
        },
        {
          titulo: "5. Reportes y exportación",
          contenido: `<p>Desde <strong>Mis reportes</strong> descargas el reporte de ataques en PDF (última hora, 24 horas o 7 días) y las alertas en CSV (hasta 5,000 registros). La exportación de eventos requiere el permiso <code>events:export</code>. Toda exportación queda registrada en la auditoría.</p>`
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
      desc: `Qué significa cada severidad, el flujo de 5 pasos ante una alerta y cuándo escalar.`,
      secciones: [
        {
          titulo: "1. Severidades",
          contenido: `<ul>
<li><strong>Crítica:</strong> ataque real con impacto probable. Atender de inmediato.</li>
<li><strong>Alta:</strong> ataque claro o intento serio. Revisar hoy.</li>
<li><strong>Media:</strong> actividad sospechosa. Vigilar y revisar si se repite.</li>
<li><strong>Baja:</strong> informativa; importa si se combina con otras.</li>
</ul>`
        },
        {
          titulo: "2. Flujo de 5 pasos",
          contenido: `<ol>
<li><strong>Lee el detalle:</strong> abre la regla para ver la explicación "Qué significa" y "Qué hacer".</li>
<li><strong>Identifica origen y objetivo:</strong> IP de origen (interna o externa) y servidor atacado.</li>
<li><strong>Revisa los eventos relacionados:</strong> son la evidencia; busca patrones.</li>
<li><strong>Decide:</strong> si es legítimo, márcala como <em>Falso positivo</em>; si es real, bloquea la IP en tu firewall o escala a tu administrador.</li>
<li><strong>Documenta:</strong> cambia el estado a <em>En revisión</em> o <em>Cerrada</em> y, si hace falta, abre un incidente.</li>
</ol>`
        },
        {
          titulo: "3. Estados de una alerta",
          contenido: `<p><strong>Abierta</strong> (sin revisar), <strong>En revisión</strong> (alguien investiga), <strong>Cerrada</strong> (resuelta) y <strong>Falso positivo</strong> (actividad legítima; deja de contar en KPIs y gráficas).</p>`
        },
        {
          titulo: "4. Cadena de ataque",
          contenido: `<p>Las alertas se ubican en una fase, de menos a más grave: reconocimiento, acceso inicial, credenciales, persistencia, comando y control (C2) e impacto. Cada alerta incluye las técnicas MITRE ATT&amp;CK asociadas.</p>`
        },
        {
          titulo: "5. Cuándo escalar",
          contenido: `<ul><li>Un servidor lleva más de 15 minutos desconectado.</li><li>Un servidor sin alertas empieza a generar muchas.</li><li>El banner de ataque persiste o hay alertas críticas.</li><li>El agente cambia entre conectado y desconectado sin motivo.</li></ul>`
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
          titulo: "4. Almacenamiento",
          contenido: `<p>Los eventos de red y de agentes se retienen 30 días; alertas y heartbeats, de forma indefinida. Desde Fuentes de datos → Limpieza puedes borrar ruido, borrar por antigüedad y compactar para recuperar espacio en disco.</p>`
        },
        {
          titulo: "5. Comandos de mantenimiento",
          contenido: `<div class="cmd">docker compose ps<br>docker compose logs opensearch<br>docker compose exec web python manage.py status</div><p>Respalda MongoDB con <code>mongodump</code>, OpenSearch con snapshots y copia <code>.env</code>, <code>docker-compose.yml</code>, <code>detection/rules/</code>, <code>suricata/</code> y <code>nginx/certs/</code>.</p>`
        },
        {
          titulo: "6. Revisiones periódicas",
          contenido: `<ul><li><strong>Diaria:</strong> sensor, agentes, alertas críticas y espacio en disco.</li><li><strong>Semanal:</strong> auditoría de 7 días, agentes desconectados y reglas ruidosas.</li><li><strong>Mensual:</strong> política de acceso, roles, retención y copia de seguridad.</li><li><strong>Trimestral:</strong> inventario, organizaciones y usuarios, actualización.</li></ul>`
        }
      ]
    }
  ]
};
