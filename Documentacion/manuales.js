/* Datos del Centro de documentación ALMA / XDR.
   Para agregar un manual: copia un bloque de "manuales", cambia id/titulo y elige:
   cat (categoría), fase (empezar|instalar|configurar|operar|solucionar|referencia|labs),
   aud (["preventa"], ["cliente"] o ambos) y estado (disponible|borrador|elaboracion|planeado).
   - Con contenido: usa "secciones": [{ titulo, contenido: `<p>HTML…</p>` }]
   - Sin contenido aún: usa "esquema": ["tema 1", "tema 2"]
   Usa &lt; y &gt; para marcadores como &lt;TU_ID_CLIENTE&gt;. */
window.ALMA_DOCS = {
  SITIO: "../ALMA_XDR_VOX_DEI_v12.html",
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
      estado: "planeado",
      desc: "Cómo leer el portal del cliente y la consola SOC: resumen, tipos de ataque, alertas y reportes.",
      esquema: ["Portal del cliente y consola SOC", "Modo Simple y Modo Avanzado", "Resumen, tipos de ataque y alertas recientes", "Reportes en PDF"]
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
      estado: "planeado",
      desc: "Qué significa cada tipo de alerta y qué hacer, qué escalar y cuándo.",
      esquema: ["Escaneo y reconocimiento", "Fuerza bruta y accesos repetidos", "Denegación de servicio", "Qué hacer, qué escalar y cuándo"]
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
      aud: ["preventa"],
      estado: "planeado",
      desc: "Respuestas rápidas y definiciones de los términos que usa ALMA.",
      esquema: ["Preguntas frecuentes", "Glosario: SIEM, XDR, NIDS, SDN, ECS"]
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
    }
  ]
};
