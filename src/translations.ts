export interface Language {
  code: string;
  name: string;
  flag: string; // Emoji flag representation
}

export const languages: Language[] = [
  { code: "EN", name: "English", flag: "🇺🇸" },
  { code: "HI", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "FR", name: "Français", flag: "🇫🇷" }
];

export const translations: Record<string, Record<string, string>> = {
  EN: {
    // Navigation
    home: "HOME",
    commands: "COMMANDS",
    team: "TEAM",
    stats: "STATS",
    support: "SUPPORT",
    tos: "TOS",
    privacy: "PRIVACY",
    faq: "FAQ",
    backToHome: "Back to home",
    backToTop: "Back to top",
    welcome_title: "Welcome to xtra!",
    welcome_subtitle: "The Next-Gen Discord bot built to protect, engage, and elevate your community. Discover seamless moderation, crystal-clear music playbacks, custom leveling cards, and more.",
    welcome_btn: "Explore Features",

    // Hero Section
    hero_title: "xtra",
    hero_subtitle: "The ultimate all-in-one Discord bot experience. Packed with premium security, robust moderation, high-fidelity music, leveling systems, and over 1,099+ interactive commands.",
    add_to_discord: "ADD TO DISCORD",
    join_support: "SUPPORT",
    
    // Stats Landing Row
    stat_servers: "SERVERS",
    stat_users: "USERS",
    stat_commands: "COMMANDS",
    sources_heading: "SOURCES USED IN XTRA",

    // Core Features
    core_features: "CORE FEATURES",
    
    feature_security_title: "Security & Antibot",
    feature_security_desc: "High-end server protection. Guard your server with advanced antibot shields, custom verification systems, and role locking.",
    
    feature_automod_title: "Automod & Filters",
    feature_automod_desc: "Powerful filter automation. Prevent toxic communication, eliminate malicious link sharing, and moderate spam instantly.",
    
    feature_music_title: "High-Fidelity Music",
    feature_music_desc: "Crystal-clear audio. Play songs or entire playlists directly from Spotify, YouTube, SoundCloud, Deezer, and JioSaavn.",
    
    feature_ticket_title: "Interactive Tickets",
    feature_ticket_desc: "Organized support loops. Set up clean interactive panels, allow users to open tickets, and keep rich transcript logs.",
    
    feature_levels_title: "Leveling Systems",
    feature_levels_desc: "Engage your community. Award virtual experience points, configure custom level milestones, and customize level-up cards.",
    
    feature_logging_title: "Rich Mod Logging",
    feature_logging_desc: "Complete audit control. Track detailed moderation activity, message edits, deleted content, and member updates automatically.",

    // FAQ Section Header
    faq_title: "FREQUENTLY ASKED QUESTIONS",

    // FAQ questions & answers
    faq_q1: "How do I add xtra to my server?",
    faq_a1: "You can add xtra to your server by clicking the 'Add to Discord' button at the top of this website or in the menu. Ensure you have 'Manage Server' permissions on the target server to authorize the bot's integration.",
    faq_q2: "What music sources does xtra support?",
    faq_a2: "xtra supports high-fidelity music playback from major streaming sources including Spotify, YouTube, SoundCloud, Deezer, JioSaavn, and Apple Music. Use the play command with any song name, direct URL, or playlist link.",
    faq_q3: "Is xtra free to use?",
    faq_a3: "Yes, all core modules including automated security, high-fidelity music playback, ticket logs, and leveling systems are 100% free. We also offer optional premium subscriptions for extra configuration slots and cosmetic perks.",
    faq_q4: "How do I configure the leveling system?",
    faq_a4: "Simply type the `?level` command in your server to view, configure, and manage all available leveling and ranking commands.",
    faq_q5: "What is 24/7 mode and how do I enable it?",
    faq_a5: "24/7 mode allows xtra to stay in your voice channel permanently. This is a premium-only feature and can be easily enabled by typing the command `?247 enable`.",
    faq_q6: "How do I set up welcome & leave embeds?",
    faq_a6: "You can set up and customize beautiful welcome and leave greetings for your server by using the `?greet` command.",
    faq_q7: "Is my server secure with xtra's Antibot feature?",
    faq_a7: "Absolutely. xtra features a highly robust automated firewall that blocks unauthorized bot accounts, deters invite link spammers, monitors aggressive behavior, and keeps your server community secure 24/7.",
    faq_q8: "How do I create a custom ticket-based help desk?",
    faq_a8: "You can set up and deploy an interactive support ticket system in your channels using the command `?ticket`.",
    faq_q9: "How do I report a bug or suggest features?",
    faq_a9: "We would love to hear your feedback! Click the 'Support Server' links in our footer or menu to join our official Discord server, where you can submit details directly in the feedback and bug channels.",
    faq_q10: "Where can I find a complete list of commands?",
    faq_a10: "You can get a comprehensive list of all 1,099+ available commands and helpful guidelines by typing `?help` directly in your server.",

    // Footer
    footer_desc: "The ultimate Discord bot - delivering premium security, robust moderation, high-fidelity music, leveling systems, and over 1,099+ interactive commands.",
    footer_quick_links: "QUICK LINKS",
    footer_resources: "RESOURCES",
    footer_legal: "LEGAL",
    footer_support_server: "Support Server",
    footer_add_to_discord: "Add to Discord",
    footer_vote: "Vote on Top.gg",
    footer_terms: "Terms of Service",
    footer_privacy: "Privacy Policy",
    footer_copyright: "© 2026 xtra Bot. made by xtra devlopment team"
  },
  HI: {
    // Navigation
    home: "होम",
    commands: "कमांड्स",
    team: "टीम",
    stats: "आंकड़े",
    support: "सपोर्ट",
    tos: "शर्तें",
    privacy: "गोपनीयता",
    faq: "सवाल-जवाब",
    backToHome: "होम पर वापस जाएं",
    backToTop: "ऊपर जाएं",
    welcome_title: "xtra में आपका स्वागत है!",
    welcome_subtitle: "आपके समुदाय को सुरक्षित रखने, जोड़ने और आगे बढ़ाने के लिए बनाया गया अगली पीढ़ी का डिस्कॉर्ड बॉट। निर्बाध मॉडरेशन, क्रिस्टल-क्लियर संगीत और बहुत कुछ का अनुभव करें।",
    welcome_btn: "विशेषताएं देखें",

    // Hero Section
    hero_title: "xtra",
    hero_subtitle: "सर्वश्रेष्ठ ऑल-इन-वन डिस्कॉर्ड बॉट अनुभव। प्रीमियम सुरक्षा, मजबूत मॉडरेशन, हाई-फिडेलिटी म्यूजिक, लेवलिंग सिस्टम और 1,099+ से अधिक इंटरैक्टिव कमांड से लैस।",
    add_to_discord: "डिस्कॉर्ड में जोड़ें",
    join_support: "सपोर्ट पाएं",
    
    // Stats Landing Row
    stat_servers: "सर्वर",
    stat_users: "यूज़र",
    stat_commands: "कमांड्स",
    sources_heading: "XTRA में इस्तेमाल किए गए स्रोत",

    // Core Features
    core_features: "मुख्य विशेषताएं",
    
    feature_security_title: "सुरक्षा और एंटीबॉट",
    feature_security_desc: "हाई-एंड सर्वर सुरक्षा। उन्नत एंटीबॉट शील्ड, कस्टम सत्यापन प्रणाली और रोल लॉकिंग के साथ अपने सर्वर को सुरक्षित रखें।",
    
    feature_automod_title: "ऑटोमॉड और फिल्टर्स",
    feature_automod_desc: "शक्तिशाली फ़िल्टर स्वचालन। जहरीले संदेशों को रोकें, हानिकारक लिंक शेयरिंग को समाप्त करें, और स्पैम को तुरंत नियंत्रित करें।",
    
    feature_music_title: "हाई-फिडेलिटी म्यूजिक",
    feature_music_desc: "एकदम साफ ऑडियो। Spotify, YouTube, SoundCloud, Deezer और JioSaavn से सीधे गाने या पूरी प्लेलिस्ट चलाएं।",
    
    feature_ticket_title: "इंटरैक्टिव टिकटिंग",
    feature_ticket_desc: "व्यवस्थित सहायता। स्वच्छ इंटरैक्टिव पैनल सेट करें, यूज़र्स को टिकट खोलने की अनुमति दें और पूर्ण ट्रांसक्रिप्ट लॉग रखें।",
    
    feature_levels_title: "लेवलिंग सिस्टम",
    feature_levels_desc: "अपने समुदाय को सक्रिय रखें। वर्चुअल एक्सपीरियंस पॉइंट्स (XP) दें, कस्टम स्तर मील के पत्थर सेट करें और लेवल-अप कार्ड कस्टमाइज़ करें।",
    
    feature_logging_title: "गहन मॉड लॉगिंग",
    feature_logging_desc: "पूर्ण ऑडिट नियंत्रण। विस्तृत मॉडरेशन गतिविधि, संदेश संपादन, हटाए गए कंटेंट और सदस्य अपडेट को स्वचालित रूप से ट्रैक करें।",

    // FAQ Section Header
    faq_title: "अक्सर पूछे जाने वाले सवाल",

    // FAQ questions & answers
    faq_q1: "मैं अपने सर्वर में xtra कैसे जोड़ूं?",
    faq_a1: "आप इस वेबसाइट के शीर्ष पर या मेनू में 'डिस्कॉर्ड में जोड़ें' बटन पर क्लिक करके अपने सर्वर में xtra जोड़ सकते हैं। सुनिश्चित करें कि बॉट के एकीकरण को अधिकृत करने के लिए आपके पास लक्षित सर्वर पर 'सर्वर प्रबंधित करें' (Manage Server) अनुमति हो।",
    faq_q2: "xtra कौन से संगीत स्रोतों का समर्थन करता है?",
    faq_a2: "xtra मुख्य संगीत स्ट्रीमिंग स्रोतों का समर्थन करता है जिसमें Spotify, YouTube, SoundCloud, Deezer, JioSaavn और Apple Music शामिल हैं। किसी भी गाने के नाम, सीधे यूआरएल, या प्लेलिस्ट लिंक के साथ play कमांड का उपयोग करें।",
    faq_q3: "क्या xtra का उपयोग करना मुफ्त है?",
    faq_a3: "हाँ, स्वचालित सुरक्षा, हाई-फिडेलिटी म्यूजिक प्लेबैक, टिकट लॉग और लेवलिंग सिस्टम सहित सभी मुख्य मॉड्यूल 100% मुफ्त हैं। हम अतिरिक्त स्लॉट और विशेष सुविधाओं के लिए वैकल्पिक प्रीमियम सदस्यता भी प्रदान करते हैं।",
    faq_q4: "मैं लेवलिंग सिस्टम को कैसे कॉन्फ़िगर करूं?",
    faq_a4: "अपने सर्वर में उपलब्ध सभी लेवलिंग और रैंकिंग कमांड को देखने, कॉन्फ़िगर करने और प्रबंधित करने के लिए बस `?level` कमांड टाइप करें।",
    faq_q5: "24/7 मोड क्या है और मैं इसे कैसे सक्षम करूं?",
    faq_a5: "24/7 मोड xtra को आपके वॉयस चैनल में स्थायी रूप से रहने की अनुमति देता है। यह केवल-प्रीमियम सुविधा है और इसे `?247 enable` कमांड टाइप करके आसानी से सक्षम किया जा सकता है।",
    faq_q6: "मैं स्वागत और प्रस्थान (welcome & leave) संदेश कैसे सेट करूं?",
    faq_a6: "आप `?greet` कमांड का उपयोग करके अपने सर्वर के लिए सुंदर स्वागत और प्रस्थान संदेशों को सेट और कस्टमाइज़ कर सकते हैं।",
    faq_q7: "क्या मेरा सर्वर xtra के एंटीबॉट फीचर के साथ सुरक्षित है?",
    faq_a7: "बिल्कुल। xtra में एक बेहद मजबूत स्वचालित फ़ायरवॉल है जो अनधिकृत बॉट खातों को ब्लॉक करता है, आमंत्रण लिंक स्पैमर्स को रोकता है, और आपके सर्वर समुदाय को 24/7 सुरक्षित रखता है।",
    faq_q8: "मैं एक कस्टम टिकट-आधारित सहायता डेस्क कैसे बनाऊं?",
    faq_a8: "आप `?ticket` कमांड का उपयोग करके अपने चैनलों में एक इंटरैक्टिव सहायता टिकट सिस्टम स्थापित और तैनात कर सकते हैं।",
    faq_q9: "मैं बग की रिपोर्ट या नई सुविधाओं का सुझाव कैसे दे सकता हूं?",
    faq_a9: "हम आपकी प्रतिक्रिया जानना पसंद करेंगे! हमारे आधिकारिक डिस्कॉर्ड सर्वर में शामिल होने के लिए हमारे फ़ूटर या मेनू में 'सपोर्ट सर्वर' लिंक पर क्लिक करें, जहाँ आप सीधे प्रतिक्रिया और बग चैनल में विवरण सबमिट कर सकते हैं।",
    faq_q10: "मुझे कमांड की पूरी सूची कहाँ मिल सकती है?",
    faq_a10: "आप सीधे अपने सर्वर में `?help` टाइप करके सभी 1,099+ उपलब्ध कमांड और सहायक गाइड की एक व्यापक सूची प्राप्त कर सकते हैं।",

    // Footer
    footer_desc: "परम डिस्कॉर्ड बॉट - जो आपको प्रदान करता है प्रीमियम सुरक्षा, मजबूत मॉडरेशन, हाई-फिडेलिटी म्यूजिक, लेवलिंग सिस्टम और 1,099+ से अधिक इंटरैक्टिव कमांड।",
    footer_quick_links: "त्वरित लिंक",
    footer_resources: "संसाधन",
    footer_legal: "कानूनी",
    footer_support_server: "सपोर्ट सर्वर",
    footer_add_to_discord: "डिस्कॉर्ड में जोड़ें",
    footer_vote: "Top.gg पर वोट करें",
    footer_terms: "सेवा की शर्तें",
    footer_privacy: "गोपनीयता नीति",
    footer_copyright: "© 2026 xtra बॉट। xtra डेवलपमेंट टीम द्वारा निर्मित"
  },
  ES: {
    // Navigation
    home: "INICIO",
    commands: "COMANDOS",
    team: "EQUIPO",
    stats: "ESTADOS",
    support: "SOPORTE",
    tos: "TÉRMINOS",
    privacy: "PRIVACIDAD",
    faq: "FAQ",
    backToHome: "Volver al inicio",
    backToTop: "Volver arriba",
    welcome_title: "¡Bienvenido a xtra!",
    welcome_subtitle: "El bot de Discord de última generación diseñado para proteger, involucrar y elevar a tu comunidad. Descubre moderación perfecta, música nítida y más.",
    welcome_btn: "Explorar características",

    // Hero Section
    hero_title: "xtra",
    hero_subtitle: "La experiencia definitiva de bot de Discord todo en uno. Equipado con seguridad premium, moderación robusta, música de alta fidelidad, sistemas de niveles y más de 1,099 comandos interactivos.",
    add_to_discord: "AÑADIR A DISCORD",
    join_support: "SOPORTE",
    
    // Stats Landing Row
    stat_servers: "SERVIDORES",
    stat_users: "USUARIOS",
    stat_commands: "COMANDOS",
    sources_heading: "FUENTES UTILIZADAS EN XTRA",

    // Core Features
    core_features: "CARACTERÍSTICAS",
    
    feature_security_title: "Seguridad y Anti-Bot",
    feature_security_desc: "Protección de alta gama para servidores. Proteja su servidor con escudos avanzados anti-bot, sistemas de verificación personalizados y bloqueo de roles.",
    
    feature_automod_title: "Auto-Moderación",
    feature_automod_desc: "Automatización de filtros potentes. Evite la comunicación tóxica, elimine el intercambio de enlaces maliciosos y modere el spam al instante.",
    
    feature_music_title: "Música de Alta Fidelidad",
    feature_music_desc: "Audio nítido y claro. Reproduzca canciones o listas completas directamente desde Spotify, YouTube, SoundCloud, Deezer y JioSaavn.",
    
    feature_ticket_title: "Soporte Interactivo",
    feature_ticket_desc: "Soporte organizado. Configure paneles interactivos limpios, permita a los usuarios abrir tickets y mantenga registros completos de transcripciones.",
    
    feature_levels_title: "Sistemas de Niveles",
    feature_levels_desc: "Fomente la interacción. Otorgue puntos de experiencia virtuales, configure hitos de nivel personalizados y personalice tarjetas de nivelación.",
    
    feature_logging_title: "Registros de Moderación",
    feature_logging_desc: "Control de auditoría completo. Rastree de forma automática la actividad de moderación, ediciones de mensajes, contenido eliminado y actualizaciones de miembros.",

    // FAQ Section Header
    faq_title: "PREGUNTAS FRECUENTES",

    // FAQ questions & answers
    faq_q1: "¿Cómo añado xtra a mi servidor?",
    faq_a1: "Puede añadir xtra a su servidor haciendo clic en el botón 'Añadir a Discord' en la parte superior de este sitio web o en el menú. Asegúrese de tener permisos de 'Gestionar Servidor' en el servidor de destino para autorizar la integración.",
    faq_q2: "¿Qué fuentes de música admite xtra?",
    faq_a2: "xtra admite la reproducción de música de alta fidelidad de las principales plataformas, incluidas Spotify, YouTube, SoundCloud, Deezer, JioSaavn y Apple Music. Use el comando play con cualquier nombre de canción, URL directa o enlace de lista de reproducción.",
    faq_q3: "¿xtra es de uso gratuito?",
    faq_a3: "Sí, todos los módulos principales, incluyendo la seguridad automatizada, la reproducción de música, los tickets de soporte y el sistema de niveles, son 100% gratuitos. También ofrecemos suscripciones premium opcionales para configuraciones adicionales y ventajas cosméticas.",
    faq_q4: "¿Cómo configuro el sistema de niveles?",
    faq_a4: "Simplemente escriba el comando `?level` en su servidor para ver, configurar y administrar todos los comandos de niveles y rangos disponibles.",
    faq_q5: "¿Qué es el modo 24/7 y cómo lo activo?",
    faq_a5: "El modo 24/7 permite que xtra permanezca en su canal de voz permanentemente. Esta es una característica premium y se puede habilitar fácilmente escribiendo el comando `?247 enable`.",
    faq_q6: "¿Cómo configuro los mensajes de bienvenida y despedida?",
    faq_a6: "Puede configurar y personalizar hermosos mensajes de bienvenida y despedida para su servidor utilizando el comando `?greet`.",
    faq_q7: "¿Es seguro mi servidor con la función Antibot de xtra?",
    faq_a7: "Absolutamente. xtra cuenta con un firewall automatizado muy robusto que bloquea cuentas de bots no autorizadas, disuade a los spammers de enlaces de invitación, monitorea comportamientos agresivos y mantiene segura a su comunidad 24/7.",
    faq_q8: "¿Cómo creo un sistema de soporte basado en tickets?",
    faq_a8: "Puede configurar e implementar un sistema interactivo de tickets de soporte en sus canales utilizando el comando `?ticket`.",
    faq_q9: "¿Cómo informo sobre un error o sugiero características?",
    faq_a9: "¡Nos encantaría conocer sus comentarios! Haga clic en los enlaces de 'Servidor de Soporte' en nuestro pie de página o en el menú para unirse a nuestro servidor oficial de Discord, donde puede enviar detalles directamente.",
    faq_q10: "¿Dónde puedo encontrar una lista completa de comandos?",
    faq_a10: "Puede obtener una lista completa de los más de 1,099 comandos disponibles y guías útiles escribiendo `?help` directamente en su servidor.",

    // Footer
    footer_desc: "El bot de Discord definitivo: ofrece seguridad premium, moderación robusta, música de alta fidelidad, sistemas de niveles y más de 1,099 comandos interactivos.",
    footer_quick_links: "ENLACES RÁPIDOS",
    footer_resources: "RECURSOS",
    footer_legal: "LEGAL",
    footer_support_server: "Servidor de Soporte",
    footer_add_to_discord: "Añadir a Discord",
    footer_vote: "Votar en Top.gg",
    footer_terms: "Términos de Servicio",
    footer_privacy: "Política de Privacidad",
    footer_copyright: "© 2026 xtra Bot. creado por el equipo de desarrollo de xtra"
  },
  DE: {
    // Navigation
    home: "START",
    commands: "BEFEHLE",
    team: "TEAM",
    stats: "STATUS",
    support: "SUPPORT",
    tos: "AGB",
    privacy: "DATENSCHUTZ",
    faq: "FAQ",
    backToHome: "Zurück zur Startseite",
    backToTop: "Nach oben",
    welcome_title: "Willkommen bei xtra!",
    welcome_subtitle: "Der Discord-Bot der nächsten Generation zum Schutz, zur Einbindung und zur Aufwertung deiner Community. Entdecke erstklassige Moderation, glasklare Musik und mehr.",
    welcome_btn: "Funktionen erkunden",

    // Hero Section
    hero_title: "xtra",
    hero_subtitle: "Das ultimative All-in-One-Discord-Bot-Erlebnis. Ausgestattet mit Premium-Sicherheit, robuster Moderation, High-Fidelity-Musik, Levelsystemen und über 1.099 interaktiven Befehlen.",
    add_to_discord: "ZU DISCORD HINZUFÜGEN",
    join_support: "SUPPORT",
    
    // Stats Landing Row
    stat_servers: "SERVER",
    stat_users: "BENUTZER",
    stat_commands: "BEFEHLE",
    sources_heading: "IN XTRA VERWENDETE QUELLEN",

    // Core Features
    core_features: "HAUPTMERKMALE",
    
    feature_security_title: "Sicherheit & Antibot",
    feature_security_desc: "Hochwertiger Serverschutz. Schützen Sie Ihren Server mit fortschrittlichen Antibot-Schilden, benutzerdefinierten Verifizierungssystemen und Rollensperren.",
    
    feature_automod_title: "Automod & Filter",
    feature_automod_desc: "Leistungsstarke Filterautomatisierung. Verhindern Sie toxische Kommunikation, eliminieren Sie die Freigabe bösartiger Links und moderieren Sie Spam sofort.",
    
    feature_music_title: "High-Fidelity-Musik",
    feature_music_desc: "Kristallklarer Sound. Spielen Sie Songs oder ganze Playlists direkt von Spotify, YouTube, SoundCloud, Deezer und JioSaavn ab.",
    
    feature_ticket_title: "Interaktive Tickets",
    feature_ticket_desc: "Organisierter Support. Richten Sie saubere interaktive Support-Panels ein, ermöglichen Sie Benutzern das Öffnen von Tickets und speichern Sie detaillierte Protokolle.",
    
    feature_levels_title: "Levelsysteme",
    feature_levels_desc: "Aktivieren Sie Ihre Community. Vergeben Sie virtuelle Erfahrungspunkte, konfigurieren Sie benutzerdefinierte Level-Meilensteine und passen Sie Level-Up-Karten an.",
    
    feature_logging_title: "Detaillierte Protokollierung",
    feature_logging_desc: "Vollständige Überwachungskontrolle. Verfolgen Sie detaillierte Moderationsaktivitäten, Nachrichtenänderungen, gelöschte Inhalte und Mitglieder-Updates automatisch.",

    // FAQ Section Header
    faq_title: "HÄUFIG GESTELLTE FRAGEN",

    // FAQ questions & answers
    faq_q1: "Wie füge ich xtra zu meinem Server hinzu?",
    faq_a1: "Sie können xtra zu Ihrem Server hinzufügen, indem Sie auf die Schaltfläche 'Zu Discord hinzufügen' oben auf dieser Website oder im Menü klicken. Stellen Sie sicher, dass Sie über die Berechtigung 'Server verwalten' auf dem Zielserver verfügen.",
    faq_q2: "Welche Musikquellen unterstützt xtra?",
    faq_a2: "xtra unterstützt die High-Fidelity-Musikwiedergabe von großen Streaming-Quellen wie Spotify, YouTube, SoundCloud, Deezer, JioSaavn und Apple Music. Verwenden Sie den Befehl play mit einem beliebigen Songnamen oder Link.",
    faq_q3: "Ist xtra kostenlos zu verwenden?",
    faq_a3: "Ja, alle Kernmodule wie automatisierte Sicherheit, Musikwiedergabe, Support-Tickets und Levelsysteme sind zu 100 % kostenlos. Wir bieten auch optionale Premium-Abonnements für zusätzliche Funktionen an.",
    faq_q4: "Wie konfiguriere ich das Levelsystem?",
    faq_a4: "Geben Sie einfach den Befehl `?level` auf Ihrem Server ein, um alle verfügbaren Level- und Ranking-Befehle anzuzeigen und zu verwalten.",
    faq_q5: "Was ist der 24/7-Modus und wie aktiviere ich ihn?",
    faq_a5: "Der 24/7-Modus ermöglicht es xtra, dauerhaft in Ihrem Sprachkanal zu bleiben. Dies ist eine Premium-Funktion und kann einfach durch Eingabe des Befehls `?247 enable` aktiviert werden.",
    faq_q6: "Wie richte ich Willkommens- und Abschiedsnachrichten ein?",
    faq_a6: "Sie können schöne Willkommens- und Abschiedsgrüße für Ihren Server mit dem Befehl `?greet` einrichten und anpassen.",
    faq_q7: "Ist mein Server mit der Antibot-Funktion von xtra sicher?",
    faq_a7: "Absolut. xtra verfügt über eine hochrobuste automatisierte Firewall, die nicht autorisierte Bot-Konten blockiert, Einladungslink-Spammer abwehrt, aggressives Verhalten überwacht und Ihre Community rund um die Uhr schützt.",
    faq_q8: "Wie erstelle ich ein benutzerdefiniertes Ticket-Support-System?",
    faq_a8: "Sie können ein interaktives Support-Ticket-System in Ihren Kanälen einrichten, indem Sie den Befehl `?ticket` verwenden.",
    faq_q9: "Wie melde ich einen Fehler oder schlage Funktionen vor?",
    faq_a9: "Wir freuen uns über Ihr Feedback! Klicken Sie auf die Links 'Support-Server' in unserer Fußzeile oder im Menü, um unserem offiziellen Discord-Server beizutreten.",
    faq_q10: "Wo finde ich eine vollständige Liste aller Befehle?",
    faq_a10: "Eine vollständige Liste aller über 1.099 verfügbaren Befehle und hilfreiche Richtlinien erhalten Sie, indem Sie direkt auf Ihrem Server `?help` eingeben.",

    // Footer
    footer_desc: "Der ultimative Discord-Bot - bietet erstklassige Sicherheit, robuste Moderation, erstklassige Musik, Levelsysteme und über 1.099 interaktive Befehle.",
    footer_quick_links: "SCHNELLZUGRIFF",
    footer_resources: "RESSOURCEN",
    footer_legal: "RECHTLICHES",
    footer_support_server: "Support-Server",
    footer_add_to_discord: "Zu Discord hinzufügen",
    footer_vote: "Auf Top.gg wählen",
    footer_terms: "Nutzungsbedingungen",
    footer_privacy: "Datenschutzerklärung",
    footer_copyright: "© 2026 xtra Bot. Erstellt vom xtra-Entwicklungsteam"
  },
  FR: {
    // Navigation
    home: "ACCUEIL",
    commands: "COMMANDES",
    team: "ÉQUIPE",
    stats: "STATS",
    support: "SUPPORT",
    tos: "CGU",
    privacy: "PRIVACY",
    faq: "FAQ",
    backToHome: "Retour à l'accueil",
    backToTop: "Retour en haut",
    welcome_title: "Bienvenue sur xtra !",
    welcome_subtitle: "Le bot Discord de nouvelle génération conçu pour protéger, engager et élever votre communauté. Découvrez une modération fluide, une musique cristalline et plus encore.",
    welcome_btn: "Explorer les fonctionnalités",

    // Hero Section
    hero_title: "xtra",
    hero_subtitle: "L'expérience ultime de bot Discord tout-en-un. Doté d'une sécurité premium, d'une modération robuste, d'une musique haute fidélité, de systèmes de niveaux et de plus de 1 099 commandes interactives.",
    add_to_discord: "AJOUTER À DISCORD",
    join_support: "SUPPORT",
    
    // Stats Landing Row
    stat_servers: "SERVEURS",
    stat_users: "UTILISATEURS",
    stat_commands: "COMMANDES",
    sources_heading: "SOURCES UTILISÉES DANS XTRA",

    // Core Features
    core_features: "FONCTIONNALITÉS",
    
    feature_security_title: "Sécurité & Antibot",
    feature_security_desc: "Protection de serveur haut de gamme. Protégez votre serveur avec des boucliers antibot avancés, des systèmes de vérification personnalisés et le verrouillage des rôles.",
    
    feature_automod_title: "Automod & Filtres",
    feature_automod_desc: "Automatisation puissante des filtres. Prévenez la communication toxique, éliminez le partage de liens malveillants et modérez instantanément le spam.",
    
    feature_music_title: "Musique Haute Fidélité",
    feature_music_desc: "Un son d'une clarté cristalline. Lancez des chansons ou des playlists entières directement depuis Spotify, YouTube, SoundCloud, Deezer et JioSaavn.",
    
    feature_ticket_title: "Tickets Interactifs",
    feature_ticket_desc: "Support organisé. Configurez des panneaux interactifs clairs, permettez aux utilisateurs d'ouvrir des tickets et conservez des rapports complets.",
    
    feature_levels_title: "Systèmes de Niveaux",
    feature_levels_desc: "Impliquez votre communauté. Attribuez des points d'expérience virtuels, configurez des jalons personnalisés et personnalisez les cartes de niveau.",
    
    feature_logging_title: "Logs de Modération",
    feature_logging_desc: "Contrôle total d'audit. Suivez automatiquement l'activité de modération, les modifications de messages, le contenu supprimé et les mises à jour.",

    // FAQ Section Header
    faq_title: "FOIRE AUX QUESTIONS",

    // FAQ questions & answers
    faq_q1: "Comment ajouter xtra à mon serveur ?",
    faq_a1: "Vous pouvez ajouter xtra à votre serveur en cliquant sur le bouton 'Ajouter à Discord' en haut de ce site ou dans le menu. Assurez-vous d'avoir les permissions 'Gérer le serveur' sur le serveur cible pour autoriser l'intégration.",
    faq_q2: "Quelles sources de musique xtra prend-il en charge ?",
    faq_a2: "xtra prend en charge la lecture de musique haute fidélité à partir des principales plateformes, notamment Spotify, YouTube, SoundCloud, Deezer, JioSaavn et Apple Music. Utilisez la commande play avec n'importe quel nom de chanson ou URL.",
    faq_q3: "L'utilisation de xtra est-elle gratuite ?",
    faq_a3: "Oui, tous les modules de base, y compris la sécurité automatisée, la lecture de musique, les tickets et les niveaux, sont 100% gratuits. Nous proposons également des abonnements premium optionnels pour des fonctionnalités exclusives.",
    faq_q4: "Comment configurer le système de niveaux ?",
    faq_a4: "Tapez simplement la commande `?level` sur votre serveur pour afficher, configurer et gérer toutes les commandes de niveaux disponibles.",
    faq_q5: "Qu'est-ce que le mode 24/7 et comment l'activer ?",
    faq_a5: "Le mode 24/7 permet à xtra de rester dans votre salon vocal de façon permanente. Il s'agit d'une fonctionnalité premium disponible avec le commande `?247 enable`.",
    faq_q6: "Comment configurer les messages de bienvenue et de départ ?",
    faq_a6: "Vous pouvez configurer et personnaliser de magnifiques messages de bienvenue et de départ pour votre serveur en utilisant la commande `?greet`.",
    faq_q7: "Mon serveur est-il sécurisé avec la fonction Antibot de xtra ?",
    faq_a7: "Absolument. xtra dispose d'un pare-feu automatisé très robuste qui bloque les comptes de bots non autorisés, décourage les spams de liens d'invitation et maintient votre communauté en sécurité 24h/24.",
    faq_q8: "Comment créer un centre d'aide interactif par ticket ?",
    faq_a8: "Vous pouvez configurer et déployer un système de ticket de support interactif dans vos salons à l'aide de la commande `?ticket`.",
    faq_q9: "Comment signaler un bug ou suggérer des fonctionnalités ?",
    faq_a9: "Nous aimerions recevoir vos commentaires ! Cliquez sur les liens 'Serveur de Support' dans notre pied de page ou notre menu pour rejoindre notre serveur Discord officiel.",
    faq_q10: "Où puis-je trouver une liste complète des commandes ?",
    faq_a10: "Vous pouvez obtenir une liste complète des plus de 1 099 commandes disponibles et des guides utiles en tapant `?help` directement sur votre serveur.",

    // Footer
    footer_desc: "Le bot Discord ultime - offrant une sécurité premium, une modération robuste, une musique haute fidélité, des systèmes de niveaux et plus de 1 099 commandes.",
    footer_quick_links: "LIENS RAPIDES",
    footer_resources: "RESSOURCES",
    footer_legal: "LÉGAL",
    footer_support_server: "Serveur de Support",
    footer_add_to_discord: "Ajouter à Discord",
    footer_vote: "Voter sur Top.gg",
    footer_terms: "Conditions d'utilisation",
    footer_privacy: "Politique de confidentialité",
    footer_copyright: "© 2026 xtra Bot. créé par l'équipe de développement de xtra"
  }
};
