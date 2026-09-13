const installation = {
    "installation.title": "Guía de instalación de Git",
    "installation.subtitle": "Primeros pasos con Git",
    "installation.intro":
        "Esta guía te ayudará a instalar y configurar Git en tu sistema operativo. Elige tu plataforma a continuación para comenzar.",
    "installation.download": "Descargar Git",
    "installation.moreDistros": "Más distribuciones de Linux",

    // Windows
    "installation.windows.title": "Instalación de Git en Windows",
    "installation.windows.download": "Descargar Git para Windows",
    "installation.windows.step1": "Visita el sitio oficial de Git en git-scm.com/downloads.",
    "installation.windows.step2": "Haz clic en el enlace de descarga para Windows.",
    "installation.windows.step3": "La descarga debería iniciarse automáticamente.",
    "installation.windows.install": "Instalar Git en Windows",
    "installation.windows.step4": "Ejecuta el archivo ejecutable descargado.",
    "installation.windows.step5":
        "Sigue el asistente de instalación. Las opciones predeterminadas son generalmente adecuadas para la mayoría de los usuarios.",
    "installation.windows.step6":
        "Durante la instalación, selecciona 'Use Git from the Windows Command Prompt' para agregar Git a tu PATH.",
    "installation.windows.step7": "Completa el proceso de instalación y haz clic en 'Finish'.",

    // Linux
    "installation.linux.title": "Instalación de Git en Linux",
    "installation.linux.debian": "Debian/Ubuntu y derivados",
    "installation.linux.fedora": "Fedora/RHEL/CentOS",
    "installation.linux.arch": "Arch Linux",

    // Mac
    "installation.mac.title": "Instalación de Git en macOS",
    "installation.mac.option1": "Opción 1: Herramientas de línea de comandos",
    "installation.mac.option1Desc":
        "La forma más sencilla de instalar Git en Mac es abrir la Terminal y escribir 'git --version'. Si Git no está instalado, se te pedirá que instales las Herramientas de línea de comandos.",
    "installation.mac.option2": "Opción 2: Descargar el instalador de Git",
    "installation.mac.step1": "Visita el sitio oficial de Git en git-scm.com/downloads.",
    "installation.mac.step2": "Haz clic en el enlace de descarga para macOS.",
    "installation.mac.step3": "Instala el paquete descargado siguiendo las instrucciones.",
    "installation.mac.brew": "Opción 3: Usar Homebrew",
    "installation.mac.brewDesc": "Si tienes Homebrew instalado, puedes instalar Git con los siguientes comandos:",

    // Configuración común
    "installation.config": "Configurar Git",
    "installation.configDesc":
        "Después de la instalación, debes configurar tu nombre de usuario y dirección de correo electrónico. Esta información se usa en cada commit de Git.",
    "installation.verification": "Verificar la instalación",
    "installation.verificationDesc":
        "Para confirmar que Git se instaló correctamente, abre una terminal o símbolo del sistema y ejecuta:",

    // Generación de claves SSH
    "installation.ssh.title": "Generar claves SSH",
    "installation.ssh.intro":
        "Las claves SSH permiten una conexión segura a servicios de alojamiento de Git como GitHub, GitLab o Bitbucket sin introducir contraseñas en cada push/pull.",
    "installation.ssh.generate": "Crear clave SSH",
    "installation.ssh.generateDesc":
        "Ejecuta el siguiente comando para crear una nueva clave SSH. Reemplaza la dirección de correo con la tuya:",
    "installation.ssh.saveLocation": "Confirmar ubicación de guardado",
    "installation.ssh.saveLocationDesc":
        "Cuando se te pregunte dónde guardar la clave, presiona Enter para usar la ubicación predeterminada:",
    "installation.ssh.passphrase": "Contraseña (opcional)",
    "installation.ssh.passphraseDesc":
        "Puedes introducir una contraseña para mayor seguridad o presionar Enter para continuar:",
    "installation.ssh.copyKey": "Copiar clave pública",
    "installation.ssh.copyKeyDesc":
        "Copia el contenido de tu clave SSH pública al portapapeles:",
    "installation.ssh.windows.copyKey": "Para Windows (Git Bash/PowerShell):",
    "installation.ssh.mac.copyKey": "Para macOS:",
    "installation.ssh.linux.copyKey": "Para Linux:",

    // Conexión con GitHub/GitLab
    "installation.github.title": "Conectar con GitHub",
    "installation.github.intro":
        "GitHub es el servicio de alojamiento de Git más popular. Así es como agregar tu clave SSH:",
    "installation.github.step1": "Ve a GitHub.com e inicia sesión en tu cuenta",
    "installation.github.step2": "Haz clic en tu foto de perfil (arriba a la derecha) → Configuración",
    "installation.github.step3": "Haz clic en 'SSH and GPG keys' en la barra lateral izquierda",
    "installation.github.step4": "Haz clic en 'New SSH key'",
    "installation.github.step5": "Introduce un título descriptivo (p. ej., 'Mi portátil')",
    "installation.github.step6": "Pega tu clave SSH copiada en el campo 'Key'",
    "installation.github.step7": "Haz clic en 'Add SSH key'",
    "installation.github.test": "Probar la conexión",
    "installation.github.testDesc": "Prueba la conexión SSH con GitHub usando este comando:",
    "installation.github.testSuccess": "Si la conexión es exitosa, verás un mensaje de bienvenida de GitHub.",

    "installation.gitlab.title": "Conectar con GitLab",
    "installation.gitlab.intro":
        "GitLab es otra plataforma popular de alojamiento de Git. Así es como agregar tu clave SSH:",
    "installation.gitlab.step1": "Ve a GitLab.com e inicia sesión en tu cuenta",
    "installation.gitlab.step2": "Haz clic en tu foto de perfil (arriba a la derecha) → Editar perfil",
    "installation.gitlab.step3": "Haz clic en 'SSH Keys' en la barra lateral izquierda",
    "installation.gitlab.step4": "Pega tu clave SSH en el campo 'Key'",
    "installation.gitlab.step5": "Introduce un título descriptivo",
    "installation.gitlab.step6": "Selecciona una fecha de vencimiento (opcional pero recomendado)",
    "installation.gitlab.step7": "Haz clic en 'Add key'",
    "installation.gitlab.test": "Probar la conexión",
    "installation.gitlab.testDesc": "Prueba la conexión SSH con GitLab:",

    // Configuración del primer repositorio
    "installation.firstRepo.title": "Configurar el primer repositorio",
    "installation.firstRepo.intro":
        "Una vez que Git esté configurado y la conexión SSH establecida, puedes comenzar a trabajar:",
    "installation.firstRepo.clone": "Clonar un repositorio existente",
    "installation.firstRepo.cloneDesc": "Para clonar un repositorio existente de GitHub/GitLab:",
    "installation.firstRepo.create": "Crear un nuevo repositorio",
    "installation.firstRepo.createDesc": "Para crear un nuevo repositorio local:",
    "installation.firstRepo.connect": "Conectar repositorio local con remoto",
    "installation.firstRepo.connectDesc": "Para conectar un repositorio local a uno remoto:",

    // Solución de problemas
    "installation.troubleshooting.title": "Solución de problemas",
    "installation.troubleshooting.intro":
        "Aquí encontrarás soluciones a los problemas más comunes durante la instalación y configuración de Git:",
    "installation.troubleshooting.commandNotFound": "Error: comando 'git' no encontrado",
    "installation.troubleshooting.commandNotFoundSolution":
        "• Verifica que Git se instaló correctamente\n• Asegúrate de que Git esté agregado a tu PATH\n• Reinicia la terminal o el símbolo del sistema\n• En Windows: usa Git Bash o agrega Git manualmente al PATH",
    "installation.troubleshooting.permissionDenied": "Error: Permiso denegado (publickey)",
    "installation.troubleshooting.permissionDeniedSolution":
        "• Verifica que tu clave SSH esté correctamente agregada a GitHub/GitLab\n• Asegúrate de usar la URL de clonación SSH (no HTTPS)\n• Prueba la conexión SSH con 'ssh -T git@github.com'\n• Verifica que el agente SSH esté en ejecución: 'ssh-add -l'",
    "installation.troubleshooting.httpsToSsh": "Cambiar de HTTPS a SSH",
    "installation.troubleshooting.httpsToSshSolution":
        "Si ya clonaste un repositorio con HTTPS, puedes cambiar a autenticación SSH:",
    "installation.troubleshooting.sslError": "Error de certificado SSL",
    "installation.troubleshooting.sslErrorSolution":
        "En redes corporativas o servidores proxy pueden ocurrir problemas de SSL:\n• Temporal: 'git config --global http.sslVerify false' (no recomendado)\n• Mejor: configura Git para tu proxy o usa el certificado corporativo",
    "installation.troubleshooting.lineEndingIssues": "Problemas con los finales de línea",
    "installation.troubleshooting.lineEndingIssuesSolution":
        "En equipos con sistemas operativos mixtos:\n• Windows: 'git config --global core.autocrlf true'\n• macOS/Linux: 'git config --global core.autocrlf input'\n• Alternativa: usa el archivo .gitattributes para un control preciso",
    "installation.troubleshooting.mergeConflicts": "Primeros auxilios para conflictos de fusión",
    "installation.troubleshooting.mergeConflictsSolution":
        "• Usa 'git status' para ver los archivos afectados\n• Edita los archivos manualmente o usa una herramienta de fusión\n• Tras editar: 'git add .' y 'git commit'\n• Si no estás seguro: 'git merge --abort' para cancelar la fusión",

    // Detalles de plataforma ampliados
    "installation.windows.enhanced.title": "Instalación detallada en Windows",
    "installation.windows.enhanced.prereq": "Requisitos previos",
    "installation.windows.enhanced.prereqDesc":
        "• Windows 7 o superior\n• Permisos de administrador para la instalación\n• Acceso a internet para la descarga",
    "installation.windows.enhanced.installerOptions": "Opciones importantes del instalador",
    "installation.windows.enhanced.installerOptionsDesc":
        "Durante la instalación, elige estas opciones:\n• 'Git from the command line and also from 3rd-party software'\n• 'Use bundled OpenSSH'\n• 'Use the OpenSSL library'\n• 'Checkout Windows-style, commit Unix-style line endings'\n• 'Use Windows' default console window'",
    "installation.windows.enhanced.postInstall": "Después de la instalación",
    "installation.windows.enhanced.postInstallDesc":
        "• Git Bash está disponible en el menú contextual (clic derecho en carpetas)\n• Git GUI proporciona una interfaz gráfica\n• También se puede usar Windows Terminal o PowerShell",

    "installation.linux.enhanced.title": "Instalación detallada en Linux",
    "installation.linux.enhanced.package": "Usando el gestor de paquetes",
    "installation.linux.enhanced.packageDesc":
        "La instalación mediante el gestor de paquetes es el método recomendado para Linux:",
    "installation.linux.enhanced.source": "Compilar desde el código fuente (avanzado)",
    "installation.linux.enhanced.sourceDesc":
        "Para la versión más reciente o configuraciones especiales:",
    "installation.linux.enhanced.sourceSteps":
        "# Instalar dependencias (Ubuntu/Debian)\nsudo apt-get install make libssl-dev libghc-zlib-dev libcurl4-gnutls-dev libncurses5-dev autoconf build-essential\n\n# Descargar el código fuente de Git\nwget https://github.com/git/git/archive/v2.43.0.tar.gz\ntar -zxf v2.43.0.tar.gz\ncd git-2.43.0\n\n# Compilar e instalar\nmake configure\n./configure --prefix=/usr/local\nmake all\nsudo make install",

    "installation.mac.enhanced.title": "Instalación detallada en macOS",
    "installation.mac.enhanced.xcode": "Herramientas de línea de comandos de Xcode",
    "installation.mac.enhanced.xcodeDesc":
        "El método más sencillo para usuarios de macOS:\n• Abre la Terminal (Aplicaciones → Utilidades → Terminal)\n• Escribe 'git --version'\n• Si Git no está instalado, se te pedirá que lo instales\n• Haz clic en 'Instalar' para instalar las Herramientas de línea de comandos",
    "installation.mac.enhanced.homebrew": "Homebrew (recomendado)",
    "installation.mac.enhanced.homebrewDesc":
        "Homebrew es un gestor de paquetes para macOS que simplifica la gestión de herramientas para desarrolladores:",
    "installation.mac.enhanced.homebrewSteps":
        "# Instalar Homebrew (si aún no está presente)\n/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"\n\n# Instalar Git\nbrew install git\n\n# Actualizar Git (más adelante)\nbrew upgrade git",
    "installation.mac.enhanced.macports": "MacPorts (alternativa)",
    "installation.mac.enhanced.macportsDesc":
        "Si usas MacPorts:\n• sudo port install git +universal\n• sudo port install git-flow (opcional)",

    // Configuración adicional
    "installation.additionalSettings.title": "Configuración adicional",
    "installation.additionalSettings.intro":
        "Aquí tienes algunas configuraciones adicionales recomendadas para optimizar el uso de Git:",
    "installation.additionalSettings.lineEndings": "Configurar los finales de línea",
    "installation.additionalSettings.lineEndingsDesc":
        "Los distintos sistemas operativos manejan los finales de línea de manera diferente. Configura Git para gestionarlos correctamente:",
    "installation.additionalSettings.defaultBranch": "Establecer el nombre de rama predeterminado",
    "installation.additionalSettings.defaultBranchDesc":
        "Los flujos de trabajo modernos de Git suelen usar 'main' como nombre de rama predeterminado en lugar de 'master':",
    "installation.additionalSettings.editor": "Configurar el editor predeterminado",
    "installation.additionalSettings.editorDesc":
        "Establece tu editor de texto preferido para los mensajes de commit de Git y otras operaciones:",

    // Recursos
    "installation.resources.title": "Recursos adicionales",
    "installation.resources.download": "Descargar",
    "installation.resources.gui": "Clientes GUI para Git",
    "installation.resources.githubDesktop": "Cliente Git simple y fácil de usar, desarrollado por GitHub",
    "installation.resources.gitkraken": "Potente cliente Git con historial de commits visual",
    "installation.resources.sourcetree": "Cliente Git gratuito para Windows y Mac",
    "installation.resources.editors": "Editores de código compatibles con Git",
    "installation.resources.vscode": "Editor de código gratuito con soporte Git integrado",
    "installation.resources.atom": "Editor de código gratuito con integración Git",
    "installation.resources.sublime": "Editor de texto popular con plugins de Git",
    "installation.resources.docs": "Documentación",
    "installation.resources.officialDocs": "Documentación oficial de Git",
    "installation.resources.proGitBook": "Libro Pro Git (gratuito)",
    "installation.resources.githubGuide": "Guía de GitHub para configurar Git",
};

export default installation;
