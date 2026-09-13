const levels = {
    // Level Page
    "level.gitTerminal": "Terminal Git",
    "level.currentChallenge": "Desafío Actual",
    "level.objectives": "Objetivos:",
    "level.showHints": "Mostrar Pistas",
    "level.hideHints": "Ocultar Pistas",
    "level.nextLevel": "Siguiente Nivel",
    "level.filesToEdit": "Archivos a Editar:",
    "level.workingTreeClean": "Árbol de trabajo limpio",
    "level.staged": "preparado",
    "level.modified": "modificado",
    "level.untracked": "sin seguimiento",
    "level.gitNotInitialized": "Git aún no está inicializado",
    "level.branch": "Rama",
    "level.gitStatus": "Estado de Git",
    "level.advancedOptions": "Opciones Avanzadas",
    "level.hideAdvancedOptions": "Ocultar Opciones Avanzadas",
    "level.resetLevel": "Reiniciar Nivel",
    "level.resetAllProgress": "Reiniciar Todo el Progreso",
    "level.resetConfirm": "¿Estás seguro de que quieres reiniciar todo tu progreso?",
    "level.resetOptions": "Opciones de Reinicio",
    "level.resetDescription": "Elige qué quieres reiniciar:",
    "level.resetAllConfirm": "¿Estás seguro de que quieres reiniciar TODO tu progreso? ¡Esto no se puede deshacer!",
    "level.level": "Nivel",
    "level.levelCompleted": "¡Nivel completado!",
    "level.realWorldContext": "Contexto del Mundo Real",
    "level.task": "Tu Tarea",
    "level.startCoding": "Empezar a Programar",
    "level.storyButton": "Ver Historia",
    "level.advancedModeOn": "Modo Avanzado (Activado)",
    "level.advancedModeOff": "Modo Avanzado (Desactivado)",
    "level.notFound": "Nivel no encontrado",
    "level.techModeOn": "Enfocarse en Comandos (Modo Técnico)",
    "level.storyModeOn": "Ver Contexto de Historia (Modo Historia)",
    "level.techModeDescription":
        "El modo técnico se centra en los comandos de Git sin historias ni contexto para una experiencia más rápida y directa.",
    "level.storyModeDescription":
        "El modo historia proporciona contexto del mundo real y explicaciones para ayudar a entender por qué y cómo se usan los comandos de Git.",
    "level.editFile": "Editar archivo",
    "level.deleteFile": "Eliminar archivo",
    "level.confirmDelete": "¿Estás seguro de que quieres eliminar {file}?",
    "level.hints": "Pistas",
    "level.tab.challenge": "Desafío",
    "level.tab.graph": "Grafo Git",

    // Level Visualizer (interactive commit graph)
    "visualizer.emptyTitle": "Tu historia de Git empieza aquí",
    "visualizer.emptyInitHint": "Inicializa un repositorio con `git init` y tu grafo de commits crecerá justo aquí.",
    "visualizer.emptyCommitHint": "Haz tu primer commit y observa cómo aparece tu ruta visual aquí.",
    "visualizer.branchFilterHint": "Haz clic para resaltar el historial de esta rama",
    "visualizer.zoomIn": "Acercar",
    "visualizer.zoomOut": "Alejar",
    "visualizer.fit": "Ajustar a la vista",
    "visualizer.mergeCommit": "Fusión",
    "visualizer.close": "Cerrar",
    "visualizer.interactHint": "Toca un commit para ver detalles · toca una rama para resaltar su ruta",

    // Level Content - Intro Stage
    "intro.name": "Introducción a Git",
    "intro.description": "Aprende los conceptos básicos de Git",

    "intro.level1.name": "Inicializar Git",
    "intro.level1.description": "Crear un nuevo repositorio Git",
    "intro.level1.objective1": "Inicializar un nuevo repositorio",
    "intro.level1.hint1": "Usa el comando `git init`",
    "intro.level1.hint2": "Esto crea un directorio oculto .git",
    "intro.level1.requirement1.description": "Inicializar un repositorio Git",
    "intro.level1.requirement1.success": "¡Bien hecho! Has creado un repositorio Git.",
    "intro.level1.story.title": "Bienvenido al Equipo",
    "intro.level1.story.narrative":
        "¡Bienvenido a tu nuevo trabajo como desarrollador en TechStart! Soy Alex, tu líder de equipo.\n\nEs tu primer día y queremos ayudarte a ser productivo rápidamente. Usamos Git para el control de versiones: nos ayuda a rastrear cambios en el código y a trabajar juntos como equipo.\n\nLo primero que debes hacer es crear un nuevo repositorio para tu proyecto de incorporación. Usamos el comando `git init` para esto.",
    "intro.level1.story.realWorldContext":
        "En los equipos de desarrollo reales, Git es esencial. Es la primera herramienta que configuras para un nuevo proyecto.",
    "intro.level1.story.taskIntroduction": "Vamos a crear un nuevo repositorio para tu proyecto.",

    "intro.level2.name": "Estado del Repositorio",
    "intro.level2.description": "Comprobar el estado de tu repositorio",
    "intro.level2.objective1": "Mostrar el estado de tu repositorio",
    "intro.level2.hint1": "Usa el comando `git status`",
    "intro.level2.hint2": "Este comando muestra el estado actual de tu repositorio",
    "intro.level2.requirement1.description": "Mostrar el estado del repositorio",
    "intro.level2.requirement1.success": "¡Perfecto! Ahora puedes ver el estado de tu repositorio.",
    "intro.level2.story.title": "¿Qué está pasando en tu Repositorio?",
    "intro.level2.story.narrative":
        "¡Genial! Has creado tu primer repositorio Git. El directorio oculto .git ahora contiene toda la información que Git necesita.\n\nAlex se acerca: \"¡Buen trabajo! A continuación deberías ver qué está pasando en tu repositorio. Con `git status` puedes comprobar el estado actual en cualquier momento.\"",
    "intro.level2.story.realWorldContext":
        "Los desarrolladores ejecutan `git status` varias veces al día para ver qué archivos han cambiado y cuáles están listos para el próximo commit.",
    "intro.level2.story.taskIntroduction": "Comprueba el estado de tu repositorio con `git status`.",

    "intro.level3.name": "Clonar Repositorios",
    "intro.level3.description": "Aprender a clonar repositorios existentes",
    "intro.level3.objective1": "Clonar un repositorio remoto",
    "intro.level3.objective2": "Navegar al repositorio clonado",
    "intro.level3.hint1": "Usa el comando `git clone <url>`",
    "intro.level3.hint2": "Después de clonar, usa `cd` para navegar a la carpeta del repositorio",
    "intro.level3.hint3": "La URL del repositorio puede ser cualquier URL válida de Git",
    "intro.level3.requirement1.description": "Clonar un repositorio remoto",
    "intro.level3.requirement1.success": "¡Genial! Has clonado el repositorio.",
    "intro.level3.requirement2.description": "Navegar al repositorio clonado usando cd",
    "intro.level3.requirement2.success": "¡Perfecto! Ahora estás dentro del repositorio clonado.",
    "intro.level3.story.title": "Unirse a un Proyecto Existente",
    "intro.level3.story.narrative":
        '¡Tu primera semana en TechStart va genial! Alex te llama con noticias emocionantes.\n\n"Tenemos un proyecto de equipo que necesita tu ayuda," dice. "El código ya está en nuestro servidor Git. Necesitarás clonarlo en tu máquina local para empezar a trabajar en él."\n\nExplica: "Cuando te unes a un proyecto existente, no empiezas desde cero. En cambio, clonas el repositorio remoto, lo que crea una copia completa en tu máquina, incluido todo el código, el historial y las ramas."\n\n"¡Piensa en ello como sacar un libro de la biblioteca, excepto que también obtienes todos los registros de la biblioteca! Usa `git clone <url-del-repositorio>` para empezar."\n\n"Una vez clonado, puedes navegar a la carpeta del proyecto con `cd <nombre-de-carpeta>` y empezar a trabajar de inmediato. Todo el historial y los cambios del proyecto están disponibles para ti."',
    "intro.level3.story.realWorldContext":
        "Clonar es cómo los desarrolladores se unen a proyectos existentes. Ya sea contribuyendo al código abierto o uniéndose a un nuevo equipo, git clone suele ser el primer comando que ejecutas.",
    "intro.level3.story.taskIntroduction": "Clona un repositorio y navega a él para empezar a trabajar en el proyecto.",

    // Level Content - Files Stage
    "files.name": "Operaciones con Archivos",
    "files.description": "Aprende a gestionar archivos con Git",

    "files.level1.name": "Preparar Cambios",
    "files.level1.description": "Añadir archivos al área de preparación",
    "files.level1.objective1": "Añadir todos los archivos al área de preparación",
    "files.level1.hint1": "Usa el comando `git add .`",
    "files.level1.hint2": "El punto representa 'todos los archivos en el directorio actual'",
    "files.level1.requirement1.description": "Añadir todos los archivos al área de preparación",
    "files.level1.requirement1.success": "¡Genial! Has añadido todos los archivos al área de preparación.",
    "files.level1.story.title": "Preparando Cambios en el Código",
    "files.level1.story.narrative":
        '"¡Oye!" llama Sarah, tu colega, "veo que ya has empezado con Git. Ahora deberías aprender cómo preparar cambios."\n\nExplica: "Cuando modificas archivos, necesitas decirle explícitamente a Git qué cambios deben incluirse en el próximo commit. Esto se llama \'preparar\' y funciona con `git add`."',
    "files.level1.story.realWorldContext":
        "El concepto de preparación es una característica poderosa de Git. Te permite hacer commit solo de los cambios seleccionados mientras otros pueden seguir en progreso.",
    "files.level1.story.taskIntroduction": "Añade todos los archivos al área de preparación con `git add .`.",

    "files.level2.name": "Confirmar Cambios",
    "files.level2.description": "Crear un commit con tus cambios",
    "files.level2.objective1": "Crear un commit con un mensaje",
    "files.level2.hint1": "Usa el comando `git commit -m 'Tu mensaje'`",
    "files.level2.hint2": "El mensaje debe describir tus cambios",
    "files.level2.requirement1.description": "Crear un commit con un mensaje",
    "files.level2.requirement1.success": "¡Excelente! Has creado un commit exitosamente.",
    "files.level2.story.title": "Tu Primer Commit",
    "files.level2.story.narrative":
        '"¡Buen trabajo!" dice Alex cuando ve tu progreso. "Has añadido los cambios al área de preparación. Ahora es el momento de tu primer commit."\n\nExplica: "Un commit es como una instantánea de tu proyecto en un momento específico del tiempo. Cada commit necesita un mensaje que describa qué se cambió. Esto es importante para la trazabilidad."',
    "files.level2.story.realWorldContext":
        "Los buenos mensajes de commit son extremadamente importantes en los equipos de desarrollo. Ayudan a todos a entender por qué se hizo un cambio, no solo qué cambió.",
    "files.level2.story.taskIntroduction": "Crea tu primer commit con un mensaje significativo.",

    "files.level3.name": "Eliminar Archivos",
    "files.level3.description": "Aprender a eliminar archivos de Git",
    "files.level3.objective1": "Eliminar un archivo tanto del directorio de trabajo como del índice",
    "files.level3.hint1": "Usa el comando `git rm <archivo>`",
    "files.level3.hint2": "Esto elimina el archivo de Git y también lo borra de tu directorio de trabajo",
    "files.level3.requirement1.description": "Eliminar un archivo usando Git",
    "files.level3.requirement1.success": "¡Bien hecho! Has eliminado el archivo de Git y de tu directorio de trabajo.",
    "files.level3.story.title": "Limpiando el Proyecto",
    "files.level3.story.narrative":
        '"Veo que has estado progresando bien," dice Alex mientras revisa tu trabajo. "Pero noto que hay algunos archivos temporales o borradores que ya no necesitamos. Deberíamos limpiar el repositorio."\n\nExplica: "Cuando quieras eliminar archivos que están siendo rastreados por Git, deberías usar `git rm` en lugar de simplemente borrarlos manualmente. Esto garantiza que Git rastree correctamente la eliminación."',
    "files.level3.story.realWorldContext":
        "Mantener los repositorios limpios eliminando archivos innecesarios es una buena práctica. El comando `git rm` garantiza que Git rastree la eliminación del archivo.",
    "files.level3.story.taskIntroduction": "Elimina el archivo innecesario del repositorio usando `git rm`.",

    // Level Content - Branches Stage
    "branches.name": "Trabajando con Ramas",
    "branches.description": "Aprender a trabajar con ramas",

    "branches.level1.name": "Ver Ramas",
    "branches.level1.description": "Mostrar todas las ramas en tu repositorio",
    "branches.level1.objective1": "Mostrar todas las ramas existentes",
    "branches.level1.hint1": "Usa el comando `git branch`",
    "branches.level1.hint2": "Esto muestra todas las ramas locales",
    "branches.level1.requirement1.description": "Mostrar todas las ramas",
    "branches.level1.requirement1.success": "¡Muy bien! Ahora puedes ver todas las ramas de tu repositorio.",
    "branches.level1.story.title": "Ramas de Código",
    "branches.level1.story.narrative":
        '"Es hora de algo más avanzado," dice Alex y dibuja un árbol con ramas en la pizarra. "Estas ramas son como las ramas de Git. Te permiten trabajar en diferentes versiones de tu código al mismo tiempo."\n\nContinúa: "Actualmente estás trabajando en la rama \'main\'. Primero veamos qué ramas tenemos."',
    "branches.level1.story.realWorldContext":
        "Las ramas son un concepto fundamental en Git. Permiten el desarrollo paralelo, el aislamiento de funcionalidades y el trabajo experimental sin afectar el código principal.",
    "branches.level1.story.taskIntroduction": "Muestra todas las ramas existentes con git branch.",

    "branches.level2.name": "Crear y Cambiar a una Rama",
    "branches.level2.description": "Crear una nueva rama y cambiar a ella",
    "branches.level2.objective1": "Crear una nueva rama llamada 'feature' y cambiar a ella",
    "branches.level2.hint1": "Usa el comando `git switch -c feature`",
    "branches.level2.hint2": "El indicador -c crea una nueva rama y cambia a ella en un solo paso",
    "branches.level2.requirement1.description": "Crear una nueva rama y cambiar a ella usando git switch -c",
    "branches.level2.requirement1.success":
        "¡Excelente! Has creado una nueva rama y cambiado a ella usando el moderno comando git switch.",
    "branches.level2.story.title": "Creación Moderna de Ramas",
    "branches.level2.story.narrative":
        '"¡Perfecto! Ahora queremos implementar una nueva funcionalidad," dice Alex. "Para esto, crearemos una nueva rama llamada \'feature\' para que nuestros cambios no afecten al código principal."\n\nTe muestra el enfoque moderno: "Git introdujo el comando `git switch` para hacer las operaciones de rama más claras. Usa `git switch -c feature` para crear y cambiar a la nueva rama en un solo paso. Esta es la forma moderna preferida en lugar del antiguo `git checkout -b`."',
    "branches.level2.story.realWorldContext":
        "En los equipos de desarrollo profesional, casi nunca se trabaja directamente en la rama principal. El comando `git switch`, introducido en Git 2.23, proporciona una forma más limpia e intuitiva de trabajar con ramas en comparación con el antiguo comando checkout.",
    "branches.level2.story.taskIntroduction":
        "Crea una nueva rama llamada 'feature' y cambia a ella usando `git switch -c`.",

    "branches.level3.name": "Cambiar Entre Ramas",
    "branches.level3.description": "Cambiar entre ramas existentes",
    "branches.level3.objective1": "Cambiar entre ramas",
    "branches.level3.hint1": "Usa el comando `git switch <rama>`",
    "branches.level3.hint2": "Esto cambia a una rama existente",
    "branches.level3.requirement1.description": "Cambiar a otra rama usando git switch",
    "branches.level3.requirement1.success": "¡Buen trabajo! Has cambiado entre ramas usando git switch.",
    "branches.level3.story.title": "Navegación entre Ramas",
    "branches.level3.story.narrative":
        '"Ahora que sabes cómo crear ramas, practiquemos movernos entre ellas," dice Sarah. "Esto es algo que harás constantemente en el trabajo real de desarrollo."\n\nExplica: "Puedes cambiar a cualquier rama existente usando `git switch <nombre-de-rama>`. Esto es mucho más claro que el antiguo `git checkout` que podía resultar confuso porque hacía muchas cosas diferentes."',
    "branches.level3.story.realWorldContext":
        "Cambiar entre ramas es una de las operaciones más comunes de Git. El comando dedicado `git switch` deja clara la intención y reduce la confusión en comparación con el comando checkout multiusos.",
    "branches.level3.story.taskIntroduction": "Practica cambiar a otra rama usando `git switch`.",

    "branches.level4.name": "Cambiar Ramas con Checkout",
    "branches.level4.description": "Aprender el comando clásico para cambiar de rama",
    "branches.level4.objective1": "Cambiar a otra rama con el comando clásico",
    "branches.level4.hint1": "Usa el comando `git checkout <nombre-de-rama>`",
    "branches.level4.hint2": "checkout es el comando más antiguo para cambiar de rama",
    "branches.level4.requirement1.description": "Cambiar a otra rama usando git checkout",
    "branches.level4.requirement1.success": "¡Genial! Ahora conoces las dos formas de cambiar de rama.",
    "branches.level4.story.title": "El Enfoque Clásico",
    "branches.level4.story.narrative":
        '"Es importante conocer git checkout también," explica Alex. "Aunque git switch es la forma moderna, verás checkout en proyectos antiguos, tutoriales y documentación todo el tiempo."\n\nAñade: "checkout puede hacer muchas cosas: cambiar ramas, restaurar archivos y más. Por eso Git introdujo switch y restore, para hacer las intenciones más claras."',
    "branches.level4.story.realWorldContext":
        "git checkout fue EL comando para operaciones de rama durante años. Muchos desarrolladores y herramientas todavía lo usan. Conocer ambos te hace más versátil en diferentes proyectos y equipos.",
    "branches.level4.story.taskIntroduction": "Cambia a otra rama usando el clásico comando git checkout.",

    "branches.level5.name": "Crear Rama con Switch",
    "branches.level5.description": "Crear y cambiar a una nueva rama en un solo paso",
    "branches.level5.objective1": "Crear una nueva rama",
    "branches.level5.hint1": "Usa el comando `git switch -c <nombre-nueva-rama>`",
    "branches.level5.hint2": "El indicador -c le dice a switch que cree una nueva rama",
    "branches.level5.requirement1.description": "Crear y cambiar a una nueva rama usando git switch -c",
    "branches.level5.requirement1.success": "¡Perfecto! Ahora dominas ambos métodos de creación de ramas.",
    "branches.level5.story.title": "Creación Rápida de Ramas",
    "branches.level5.story.narrative":
        "\"Otro truco útil,\" dice Sarah. \"Puedes usar 'git switch -c' para crear una nueva rama y cambiar a ella al mismo tiempo.\"\n\nExplica: \"Esta es la forma moderna en Git. El indicador -c significa 'crear' y hace exactamente lo mismo que el antiguo 'git checkout -b', pero es más claro e intuitivo.\"",
    "branches.level5.story.realWorldContext":
        "El patrón switch -c es el método moderno y recomendado para crear y cambiar de rama. Se introdujo en Git 2.23 para separar las operaciones de rama de otras funciones de checkout y hacerlas más intuitivas.",
    "branches.level5.story.taskIntroduction": "Crea una nueva rama usando git switch -c y cambia automáticamente a ella.",

    // Level Content - Merge Stage
    "merge.name": "Fusionar Ramas",
    "merge.description": "Aprender a fusionar ramas",

    "merge.level1.name": "Fusionar Rama de Funcionalidad",
    "merge.level1.description": "Fusionar una rama de funcionalidad en la rama de desarrollo",
    "merge.level1.objective1": "Fusionar la rama 'feature/user-auth' en la rama 'develop'",
    "merge.level1.hint1": "Ya estás en la rama develop",
    "merge.level1.hint2": "Usa `git merge feature/user-auth` para integrar la rama de funcionalidad",
    "merge.level1.requirement1.description": "Fusionar la rama de funcionalidad",
    "merge.level1.requirement1.success": "¡Excelente! La funcionalidad ha sido integrada en develop.",
    "merge.level1.story.title": "Revisión de Código e Integración",
    "merge.level1.story.narrative":
        '"¡Tu funcionalidad está lista!", dice Sarah, la líder del equipo. "Pero antes de enviarlo a main, necesitamos fusionarlo en la rama develop y probarlo."\n\nExplica: "En equipos profesionales, nunca fusionamos directamente en main. Primero feature → develop para pruebas, luego develop → main para producción."',
    "merge.level1.story.realWorldContext":
        "🔍 Buenas Prácticas: Pull Requests\n\nEn proyectos reales, ahora crearías un Pull Request (PR) o Merge Request (MR) en GitHub/GitLab:\n\n1️⃣ Subes tu rama de funcionalidad\n\n2️⃣ Abres un PR: feature/user-auth → develop\n\n3️⃣ Los miembros del equipo revisan tu código\n\n4️⃣ Después de la aprobación, el PR se fusiona\n\n¡Esto permite revisiones de código, discusiones y pruebas automáticas antes de fusionar! 🚀",
    "merge.level1.story.taskIntroduction":
        "Fusiona la rama 'feature/user-auth' en la rama 'develop' (ya estás en develop).",

    "merge.level2.name": "Despliegue a Producción",
    "merge.level2.description": "Fusionar el código probado en la rama principal",
    "merge.level2.objective1": "Fusionar la rama 'develop' en la rama 'main'",
    "merge.level2.hint1": "Ya estás en la rama main",
    "merge.level2.hint2": "Usa `git merge develop` para integrar el código probado",
    "merge.level2.requirement1.description": "Fusionar develop en main",
    "merge.level2.requirement1.success": "¡Perfecto! El código está ahora en producción.",
    "merge.level2.story.title": "Lanzamiento a Producción",
    "merge.level2.story.narrative":
        '"¡Increíble! La funcionalidad funciona perfectamente en develop y todas las pruebas están en verde," dice Sarah. "Ahora podemos fusionarlo en main y desplegarlo."\n\nÉnfatiza: "main es nuestra rama de producción. Solo el código probado y estable entra aquí. ¡Por eso probamos primero en develop!"',
    "merge.level2.story.realWorldContext":
        "Flujo de Trabajo Git Flow 🌊\n\n📦 main: Código listo para producción\n\n🔧 develop: Integración y pruebas\n\n✨ feature/*: Nuevas funcionalidades\n\nEste flujo de trabajo evita que el código no probado llegue a producción. ¡Muchos equipos también usan ramas de lanzamiento!",
    "merge.level2.story.taskIntroduction": "Fusiona la rama 'develop' en la rama 'main'.",

    "merge.level3.name": "Gestionar Conflictos de Fusión",
    "merge.level3.description": "Aprender a gestionar o abortar fusiones con conflictos",
    "merge.level3.objective1": "Abortar una fusión con conflictos",
    "merge.level3.hint1": "Usa el comando `git merge --abort`",
    "merge.level3.hint2": "Esto detendrá el proceso de fusión y volverá al estado anterior al inicio de la fusión",
    "merge.level3.requirement1.description": "Abortar una fusión con conflictos",
    "merge.level3.requirement1.success": "¡Buen trabajo! Has abortado exitosamente la operación de fusión.",
    "merge.level3.story.title": "Cuando las Fusiones Salen Mal",
    "merge.level3.story.narrative":
        '"A veces las fusiones no salen como estaba planeado," advierte Sarah. "Cuando la misma parte de un archivo ha sido cambiada de forma diferente en ambas ramas, ocurre un conflicto de fusión."\n\nExplica: "Tienes dos opciones: O resuelves el conflicto manualmente, o abortas la fusión con `git merge --abort` y te preparas mejor."',
    "merge.level3.story.realWorldContext":
        "Los conflictos de fusión son una parte común del desarrollo colaborativo. Saber cómo gestionarlos, ya sea resolviéndolos o abortando temporalmente, es una habilidad esencial.",
    "merge.level3.story.taskIntroduction": "Practica abortar una operación de fusión usando git merge --abort.",

    // Stash Stage
    "stash.name": "Git Stash",
    "stash.description": "Aprende a guardar temporalmente tus cambios",

    "stash.level1.name": "Guardar tu Trabajo",
    "stash.level1.description": "Aprender a guardar cambios temporalmente y cambiar entre ramas",
    "stash.level1.objective1": "Guardar tus cambios en progreso",
    "stash.level1.objective2": "Cambiar a la rama hotfix para gestionar el problema urgente",
    "stash.level1.objective3": "Volver a la rama feature para continuar tu trabajo",
    "stash.level1.objective4": "Restaurar tus cambios guardados",
    "stash.level1.hint1": "Usa 'git stash' para guardar temporalmente tus cambios",
    "stash.level1.hint2": "Cambia de rama con 'git switch <nombre-de-rama>' o 'git checkout <nombre-de-rama>'",
    "stash.level1.hint3": "Recupera tus cambios con 'git stash pop'",
    "stash.level1.hint4": "Comprueba la lista de stash con 'git stash list'",
    "stash.level1.requirement1.description": "Guardar tus cambios en progreso",
    "stash.level1.requirement1.success": "✅ ¡Genial! ¡Tus cambios están guardados de forma segura!",
    "stash.level1.requirement2.description": "Cambiar a la rama hotfix",
    "stash.level1.requirement2.success": "✅ ¡Perfecto! Ahora estás en la rama hotfix.",
    "stash.level1.requirement3.description": "Volver a la rama feature",
    "stash.level1.requirement3.success": "✅ ¡Bien! De vuelta a la rama feature.",
    "stash.level1.requirement4.description": "Restaurar tus cambios guardados",
    "stash.level1.requirement4.success": "✅ ¡Excelente! ¡Tus cambios han sido restaurados!",
    "stash.level1.story.title": "Interrupción de Emergencia",
    "stash.level1.story.narrative":
        "Estás completamente concentrado, trabajando en una nueva funcionalidad. Tu código está a medias, las pruebas están fallando, y de repente... ¡Slack explota! 💥\n\n\"URGENTE: ¡Producción está caída! ¡Necesito un hotfix AHORA!\" 🚨\n\nNo puedes confirmar este desastre, pero tampoco puedes dejarlo así. ¿Qué haces?\n\n**Entra git stash**: ¡tu botón de guardado de emergencia! 🎯\n\nPiensa en ello como pausar un videojuego. Tu trabajo se guarda en un lugar especial, tu espacio de trabajo queda limpio y puedes cambiar de tarea. Cuando vuelvas, solo dale a reanudar (git stash pop) y continúa exactamente donde lo dejaste.",
    "stash.level1.story.realWorldContext":
        "En el desarrollo real, las interrupciones ocurren constantemente. Los product managers necesitan 'cambios rápidos', aparecen errores en producción y los compañeros necesitan revisiones urgentes de código. Git stash es tu herramienta de supervivencia para cambiar de contexto sin perder el hilo.",
    "stash.level1.story.taskIntroduction":
        "Practiquemos el flujo de trabajo de stash: guarda tu trabajo, gestiona la emergencia, ¡luego reanudar!",

    "stash.level2.name": "Malabares con Múltiples Tareas",
    "stash.level2.description": "Dominar el cambio entre múltiples tareas usando stash",
    "stash.level2.objective1": "Guardar en stash tu trabajo incompleto actual",
    "stash.level2.objective2": "Cambiar a la rama main para crear una nueva rama de funcionalidad",
    "stash.level2.objective3": "Crear una nueva rama de funcionalidad",
    "stash.level2.objective4": "Volver a tu antigua rama de tarea",
    "stash.level2.objective5": "Restaurar tu trabajo guardado",
    "stash.level2.hint1": "Empieza guardando: git stash",
    "stash.level2.hint2": "Cambia a main: git switch main (o git checkout main)",
    "stash.level2.hint3": "Crea nueva rama: git switch -c feature/new-task (o git checkout -b feature/new-task)",
    "stash.level2.hint4": "Vuelve a la tarea antigua: git switch feature/old-task",
    "stash.level2.hint5": "Restaura el trabajo: git stash pop",
    "stash.level2.requirement1.description": "Guardar en stash tu trabajo incompleto",
    "stash.level2.requirement1.success": "✅ ¡Trabajo guardado! Listo para cambiar de tarea.",
    "stash.level2.requirement2.description": "Cambiar a la rama main",
    "stash.level2.requirement2.success": "✅ En la rama main ahora.",
    "stash.level2.requirement3.description": "Crear la rama feature/new-task",
    "stash.level2.requirement3.success": "✅ ¡Nueva rama creada!",
    "stash.level2.requirement4.description": "Volver a feature/old-task",
    "stash.level2.requirement4.success": "✅ De vuelta a tu tarea antigua.",
    "stash.level2.requirement5.description": "Restaurar tu trabajo guardado",
    "stash.level2.requirement5.success": "✅ ¡Perfecto! ¡Trabajo restaurado!",
    "stash.level2.story.title": "Maestro del Multitasking",
    "stash.level2.story.narrative":
        '"Oye, ¿puedes trabajar rápidamente en esta nueva petición de funcionalidad?", pregunta tu Product Owner.\n\nEstás en medio de otra tarea. Antes tendrías que confirmarlo todo o perder los cambios.\n\n"Stash es perfecto para esto," explica tu Desarrollador Senior Marc. "Guarda tu trabajo actual, crea una nueva rama para la nueva tarea y luego simplemente recupera el trabajo antiguo."',
    "stash.level2.story.realWorldContext":
        "**Stash en la Vida del Equipo**\n\nLos desarrolladores a menudo hacen malabares con múltiples tareas:\n\n- La planificación del sprint cambia las prioridades\n- Los errores urgentes interrumpen funcionalidades\n- Las revisiones de código requieren cambios de contexto\n- Las reuniones interrumpen el flujo\n\n**¡Git Stash hace que el cambio de contexto sea sencillo!**\n\nSin Stash tendrías que:\n- Confirmar código inacabado (malo para el historial)\n- Descartar cambios (trabajo perdido)\n- Quedarte en estado sucio (no puedes cambiar)\n\nCon Stash: Guarda, cambia, trabaja, vuelve — ¡todo limpio! ✨",
    "stash.level2.story.taskIntroduction":
        "Guarda tu trabajo en stash, cambia a main, crea una nueva rama, vuelve a la tarea antigua y recupera tu trabajo.",

    "stash.level3.name": "Gestionar los Stashes",
    "stash.level3.description": "Aprender a listar y gestionar entradas de stash",
    "stash.level3.objective1": "Ver todos los cambios guardados en stash",
    "stash.level3.objective2": "Restaurar el stash más reciente",
    "stash.level3.hint1": "Usa 'git stash list' para ver todos los stashes",
    "stash.level3.hint2": "Recupera el stash con 'git stash pop'",
    "stash.level3.hint3": "Los stashes se almacenan como una pila (LIFO - Último en entrar, primero en salir)",
    "stash.level3.requirement1.description": "Listar todas las entradas de stash",
    "stash.level3.requirement1.success": "✅ ¡Stashes mostrados!",
    "stash.level3.requirement2.description": "Recuperar el stash más reciente",
    "stash.level3.requirement2.success": "✅ ¡Stash restaurado!",
    "stash.level3.story.title": "Organización del Stash",
    "stash.level3.story.narrative":
        '"Espera, ¿dónde guardé esos cambios?", te preguntas.\n\n"Usa `git stash list`," dice Lisa. "Muestra todos los stashes guardados. Con `git stash pop` recuperas el último y lo elimina del stash."\n\nContinúa: "También existe `git stash apply`: aplica el stash pero lo conserva. ¡Útil cuando necesitas los mismos cambios varias veces!"',
    "stash.level3.story.realWorldContext":
        '**Comandos de Gestión de Stash**\n\n`git stash list` - Muestra todos los stashes\n\n`git stash pop` - Aplica y elimina el stash\n\n`git stash apply` - Aplica el stash, lo conserva\n\n`git stash drop` - Elimina un stash\n\n`git stash clear` - Elimina todos los stashes\n\n**Consejo Pro**: Nombra tus stashes con `git stash push -m "WIP: Funcionalidad X"`: ¡hace la lista más organizada!',
    "stash.level3.story.taskIntroduction": "Lista tus stashes y recupera el más reciente.",

    // Remote Stage
    "remote.name": "Repositorios Remotos",
    "remote.description": "Aprender a trabajar con repositorios remotos",

    // Remote Level 1
    "remote.level1.name": "Añadir Remotos",
    "remote.level1.description": "Conectarse a un repositorio remoto",
    "remote.level1.objective1": "Añadir un repositorio remoto",
    "remote.level1.hint1": "Usa el comando `git remote add <nombre> <url>`",
    "remote.level1.hint2": "La convención es nombrar tu remoto principal 'origin'",
    "remote.level1.requirement1.description": "Añadir un repositorio remoto",
    "remote.level1.requirement1.success": "¡Excelente! Has añadido un repositorio remoto.",
    "remote.level1.story.title": "Conectando Repositorios",
    "remote.level1.story.narrative":
        '"¡Buen progreso hasta ahora! Ahora es el momento de conectar tu repositorio local a uno remoto," dice Alex. "Esto te permitirá compartir tu código con el equipo y colaborar eficazmente."\n\nExplica: "El primer paso es añadir una conexión al repositorio remoto usando `git remote add`. Esto no transfiere ningún código todavía: solo crea la conexión."',
    "remote.level1.story.realWorldContext":
        "Los repositorios remotos son centrales para los flujos de trabajo de desarrollo colaborativo. La mayoría de los sistemas basados en Git como GitHub, GitLab y Bitbucket funcionan alojando repositorios remotos a los que se conectan los miembros del equipo.",
    "remote.level1.story.taskIntroduction": "Añade un remoto llamado 'origin' a tu repositorio.",

    // Remote Level 2
    "remote.level2.name": "Subir Commits al Remoto",
    "remote.level2.description": "Aprender cuándo y cómo subir tus commits",
    "remote.level2.objective1": "Subir tus commits locales al repositorio remoto",
    "remote.level2.objective2": "Entender la diferencia entre commit local y push remoto",
    "remote.level2.hint1": "Usa `git push origin main` para subir a la rama main",
    "remote.level2.hint2":
        "IMPORTANTE: ¡Haz push DESPUÉS de haber hecho un commit! Push sube tus commits, no archivos individuales.",
    "remote.level2.hint3": "Consejo: Usa `git log` para ver qué commits tienes",
    "remote.level2.requirement1.description": "Subir tus commits al remoto",
    "remote.level2.requirement1.success": "¡Perfecto! Tus commits ya están disponibles en el repositorio remoto.",
    "remote.level2.story.title": "Del Repositorio Local al Remoto",
    "remote.level2.story.narrative":
        '"Déjame mostrarte cómo funciona el flujo de trabajo de Git," dice Alex, dibujando un diagrama:\n\n1️⃣ Cambias archivos (Directorio de Trabajo)\n2️⃣ Los preparas con `git add` (Área de Preparación)\n3️⃣ Los confirmas con `git commit` (Repositorio Local)\n4️⃣ Los subes con `git push` (Repositorio Remoto)\n\n"Importante entender: ¡git push sube tus COMMITS, no archivos individuales! Debes hacer un commit antes de poder hacer push. Tus commits locales solo existen en tu ordenador hasta que los subes."',
    "remote.level2.story.realWorldContext":
        "La diferencia entre repositorio local y remoto es fundamental: Los commits locales solo existen en tu máquina. Solo a través de git push se vuelven visibles para tu equipo. Esto significa: ¡Puedes hacer tantos commits locales como quieras y luego subirlos todos de una vez!",
    "remote.level2.story.taskIntroduction":
        "Ya has hecho un commit. Ahora sube este commit al repositorio remoto usando `git push origin main`.",

    "remote.level3.name": "Subir Rama de Funcionalidad",
    "remote.level3.description": "Subir una rama de funcionalidad al repositorio remoto",
    "remote.level3.objective1": "Subir tu rama de funcionalidad con todos sus commits",
    "remote.level3.hint1": "Usa `git push origin <nombre-de-rama>`",
    "remote.level3.hint2": "También puedes usar `git push -u origin <nombre-de-rama>` para configurar el upstream",
    "remote.level3.requirement1.description": "Subir una rama de funcionalidad al remoto",
    "remote.level3.requirement1.success": "¡Excelente! Tu rama de funcionalidad ya está disponible en el repositorio remoto.",
    "remote.level3.story.title": "Compartiendo Funcionalidades",
    "remote.level3.story.narrative":
        '"Has estado trabajando en una nueva funcionalidad genial en una rama separada," dice Sarah. "Ahora es el momento de subir esta rama al repositorio remoto para que otros miembros del equipo puedan ver y revisar tu trabajo."\n\nExplica: "Cuando subes una rama por primera vez, deberías usar la opción -u (o --set-upstream). Esto vincula tu rama local con la rama remota, haciendo los futuros push y pull más fáciles."',
    "remote.level3.story.realWorldContext":
        "En equipos profesionales, las nuevas funcionalidades se desarrollan típicamente en ramas separadas y luego se suben para revisión antes de fusionarse en el código principal. Esta es una parte central del flujo de trabajo de pull request.",
    "remote.level3.story.taskIntroduction": "Sube tu rama de funcionalidad al repositorio remoto para que otros puedan verla.",

    // Reset Stage
    "reset.name": "Deshacer Commits",
    "reset.description": "Aprender a deshacer commits y retroceder en el historial",

    "reset.level1.name": "Soft Reset - Conservar Cambios",
    "reset.level1.description": "Volver a un commit anterior conservando tus cambios",
    "reset.level1.objective1": "Deshacer el último commit manteniendo los cambios preparados",
    "reset.level1.objective2": "Restablecer a HEAD (commit actual) para entender el concepto",
    "reset.level1.objective3": "Restablecer a un commit anterior específico usando la notación HEAD~n",
    "reset.level1.hint1": "Empieza sencillo: `git reset --soft HEAD~1` (deshacer el último commit)",
    "reset.level1.hint2": "Primero visualiza el historial de commits: `git log --oneline`",
    "reset.level1.hint3": "`git reset --soft HEAD` conserva todo tal cual (sin cambios)",
    "reset.level1.hint4": "`git reset --soft HEAD~2` retrocede 2 commits",
    "reset.level1.hint5": "¡Los archivos quedan preparados tras el reset --soft! Perfecto para corregir mensajes de commit",
    "reset.level1.hint6": "Usa `git status` para ver qué está preparado después del reset",
    "reset.level1.requirement1.description": "Deshacer el último commit usando --soft",
    "reset.level1.requirement1.success": "✅ ¡Bien! ¡El commit desapareció pero los archivos siguen preparados!",
    "reset.level1.requirement2.description": "Restablecer a HEAD para entender el concepto",
    "reset.level1.requirement2.success": "✅ ¡Perfecto! Restablecer a HEAD significa 'quedarse donde estás': ¡sin cambios!",
    "reset.level1.requirement3.description": "Restablecer a un commit anterior usando HEAD~n",
    "reset.level1.requirement3.success": "✅ ¡Excelente! ¡Has dominado la notación HEAD~n para los soft resets!",
    "reset.level1.story.title": "Entendiendo git reset --soft",
    "reset.level1.story.narrative": `🔄 **Understanding git reset --soft**

**The Situation:**
You're working on a feature and made 5 commits. But looking back, you realize:
- Commit 5: "Add database config" - Oops! This has sensitive credentials! 🔐
- Commit 4: "Update API endpoints" - This is good ✅
- Commit 3: "Add authentication" - Good ✅
- Commit 2: "Setup routing" - Good ✅
- Commit 1: "Initial project setup" - Good ✅

You need to undo commit 5, fix it, and commit again properly!

**What is git reset --soft?**
Think of Git commits like a stack of boxes 📦📦📦. Each box is a commit.

\`git reset --soft\` removes boxes from the top of the stack, BUT keeps all the items (your changes) on a staging table, ready to be packed into a new box!

**Three Ways to Use git reset --soft:**

**1. Reset to the previous commit (most common):**
\`git reset --soft HEAD~1\`
- HEAD = "where you are now" (the top box)
- ~1 = "go back 1 box"
- Result: Last commit removed, but changes stay staged!

**2. Reset to HEAD (educational - does nothing):**
\`git reset --soft HEAD\`
- This means "reset to where I already am"
- Nothing happens! Good for understanding the concept.

**3. Reset to an older commit:**
\`git reset --soft HEAD~3\`
- Goes back 3 commits
- All changes from those 3 commits stay staged
- Perfect for combining multiple commits into one!

**Your Mission:**

**Step 1:** Remove the last commit (the one with credentials)
\`git reset --soft HEAD~1\`
Check with \`git status\` - your files are still staged! ✨

**Step 2:** Try resetting to HEAD (educational)
\`git reset --soft HEAD\`
Notice: Nothing changed! You're already at HEAD.

**Step 3:** Go back further to practice
\`git reset --soft HEAD~2\`
Now you've removed 2 commits, but files are still staged!

**Remember:**
- 📦 Commits are removed from history
- ✅ Files stay in staging area
- 🎯 Perfect for fixing commit messages or combining commits
- ⚠️  Only use on commits you haven't pushed yet!

Let's practice these three techniques! 🚀`,
    "reset.level1.story.realWorldContext":
        "git reset --soft es muy útil cuando quieres corregir tu último commit sin perder el trabajo. Puedes editar los cambios y luego volver a confirmar.",
    "reset.level1.story.taskIntroduction":
        "Practica usando git reset --soft con diferentes objetivos: HEAD~1, HEAD y HEAD~2.",

    "reset.level2.name": "Hard Reset - Descartar Todo",
    "reset.level2.description": "Volver a un commit anterior y descartar todos los cambios",
    "reset.level2.objective1": "Descartar completamente el último commit con errores",
    "reset.level2.objective2": "Restablecer a HEAD para entender que no hace nada",
    "reset.level2.objective3": "Saltar varios commits atrás y descartar todo",
    "reset.level2.hint1": "⚠️ ADVERTENCIA: ¡--hard es DESTRUCTIVO! ¡Todos los cambios se pierden permanentemente!",
    "reset.level2.hint2": "Primero comprueba qué perderás: git log --oneline",
    "reset.level2.hint3": "git reset --hard HEAD~1 elimina el último commit Y todos los cambios",
    "reset.level2.hint4": "git reset --hard HEAD no hace nada (ya estás en HEAD)",
    "reset.level2.hint5": "git reset --hard HEAD~3 retrocede 3 commits, borra todo",
    "reset.level2.hint6": "Úsalo cuando quieras desechar código malo completamente",
    "reset.level2.hint7": "💡 En la vida real: ¡Solo usa --hard en código que no has subido!",
    "reset.level2.requirement1.description": "Descartar el último commit usando --hard",
    "reset.level2.requirement1.success": "💥 ¡Commit y todos los cambios destruidos! ¡Sin vuelta atrás!",
    "reset.level2.requirement2.description": "Restablecer a HEAD (educativo - no hace nada)",
    "reset.level2.requirement2.success": "✅ ¡Nada cambió: ya estás en HEAD!",
    "reset.level2.requirement3.description": "Descartar múltiples commits usando --hard",
    "reset.level2.requirement3.success": "💥 ¡Múltiples commits destruidos! ¡El espacio de trabajo está limpio de nuevo!",
    "reset.level2.story.title": "Entendiendo git reset --hard - LA OPCIÓN NUCLEAR",
    "reset.level2.story.narrative": `⚠️  **Understanding git reset --hard - THE NUCLEAR OPTION**

**The Situation:**
It's Friday evening. You've been experimenting with a new feature all day:
- Commit 6: "Try experimental algorithm v3" - Completely broken! 💀
- Commit 5: "Try experimental algorithm v2" - Still broken! 🐛
- Commit 4: "Try experimental algorithm v1" - Nope! ❌
- Commit 3: "Add user dashboard" - This was working! ✅
- Commit 2: "Add user authentication" - Good ✅
- Commit 1: "Initial project" - Good ✅

You realize: These experiments are garbage. You want them GONE. Forever. 💣

**What is git reset --hard?**
Remember the boxes metaphor? 📦📦📦

\`git reset --soft\` removed boxes but kept the items on the staging table.

\`git reset --hard\` removes boxes AND throws all items in the trash! 🗑️

**⚠️  CRITICAL: This is DESTRUCTIVE and PERMANENT!**
- Commits are deleted from history
- ALL file changes are deleted
- Working directory is cleaned
- Staging area is cleared
- **THERE IS NO UNDO!**

**Three Ways to Use git reset --hard:**

**1. Destroy the last commit (most common):**
\`git reset --hard HEAD~1\`
- Removes the last commit
- Deletes all changes in that commit
- Working directory looks like the previous commit
- ⚠️  Changes are GONE FOREVER!

**2. Reset to HEAD (educational - does nothing):**
\`git reset --hard HEAD\`
- Means "make my workspace look like HEAD"
- Since you're already at HEAD, nothing changes
- Good for understanding: HEAD = current position

**3. Destroy multiple commits:**
\`git reset --hard HEAD~4\`
- Goes back 4 commits
- All 4 commits are DELETED from history
- All changes in those commits are DELETED
- It's like they never existed! 👻

**When to Use --hard:**
- ✅ Experiment failed, throw it away
- ✅ Broke everything, need to start over
- ✅ Committed secrets/passwords by accident
- ❌ NOT on commits you've already pushed!
- ❌ NOT if you might need the changes later!

**Your Mission:**

**Step 1:** Destroy the last broken commit
\`git reset --hard HEAD~1\`
Check with \`git status\` - workspace is clean! 🧹

**Step 2:** Try resetting to HEAD (safe practice)
\`git reset --hard HEAD\`
Nothing happens - you're already there!

**Step 3:** Destroy multiple failed experiments
\`git reset --hard HEAD~3\`
All 3 bad commits are gone! It's like Friday never happened! 😅

**Remember:**
- 💥 This is the NUCLEAR OPTION
- 🗑️  Everything is deleted - commits AND changes
- ⏪ Can't be undone (unless you have the commit hash)
- 🎯 Only use when you're 100% sure
- ⚠️  NEVER use on pushed commits!

**Fun Fact:** Professional developers say "I'm going hard reset on this" when they want to start over completely! 🔥

Ready to practice safe destruction? Let's go! 💪`,
    "reset.level2.story.realWorldContext":
        "--hard reset es una herramienta poderosa pero peligrosa. Se usa cuando realmente necesitas empezar de cero. En equipos, ten cuidado con reset en commits ya subidos: puede confundir a los demás.",
    "reset.level2.story.taskIntroduction":
        "Practica la opción nuclear: usa git reset --hard para descartar commits y cambios completamente.",

    "reset.level3.name": "Restablecer a un Commit Específico",
    "reset.level3.description": "Volver a un commit específico en el historial",
    "reset.level3.objective1": "Ver el historial de commits e identificar el commit bueno",
    "reset.level3.objective2": "Restablecer a un commit específico usando su hash",
    "reset.level3.hint1": "Primero, comprueba tu historial de commits: git log --oneline",
    "reset.level3.hint2": "Cada commit tiene un hash único (como 'a1b2c3d')",
    "reset.level3.hint3": "git reset --soft <hash-commit> conserva los cambios preparados",
    "reset.level3.hint4": "git reset --hard <hash-commit> destruye todo después de ese commit",
    "reset.level3.hint5": "Los hashes de commit son IDs permanentes: HEAD~n es relativo",
    "reset.level3.hint6": "¡Consejo pro: Solo necesitas los primeros 7 caracteres del hash!",
    "reset.level3.hint7": "Encuentra 'Versión 2 - Buena versión' y usa su hash",
    "reset.level3.requirement1.description": "Ver el historial de commits para identificar el commit bueno",
    "reset.level3.requirement1.success": "✅ ¡Bien! ¡Ahora puedes ver todos los commits y sus hashes!",
    "reset.level3.requirement2.description": "Restablecer a un commit específico usando su hash",
    "reset.level3.requirement2.success": "🎯 ¡Perfecto! ¡Has dominado el restablecimiento a hashes de commits específicos!",
    "reset.level3.story.title": "Reset Avanzado: Usando Hashes de Commit",
    "reset.level3.story.narrative": `🎯 **Advanced Reset: Using Commit Hashes**

**The Situation:**
Your project has grown. You're now at commit 8, but you need to go back to commit 3.

Using \`HEAD~5\` to count back 5 commits is annoying and error-prone. What if someone adds a commit while you're working? The count changes!

**The Professional Solution: Commit Hashes**

Every commit has a unique ID (hash), like a fingerprint:
\`a1b2c3d - "Version 2 - Good version"\`

This hash NEVER changes! It's permanent and unique.

**Current Situation:**
- Commit 8: "Attempted fix v3" - Still broken! 💔
- Commit 7: "Attempted fix v2" - Nope! 🐛
- Commit 6: "Attempted fix v1" - Failed! ❌
- Commit 5: "Add broken feature" - Started the mess 🔥
- Commit 4: "Update styling" - Cosmetic ✨
- Commit 3: "Version 2 - GOOD VERSION" - Last known good state! ✅
- Commit 2: "Version 1" - Initial version ✅
- Commit 1: "Initial commit" - Foundation ✅

**Your Mission:**

**Step 1: Find the Good Commit**
Run: \`git log --oneline\`

You'll see something like:
\`\`\`
f7e8a9b Attempted fix v3
d6c7b8a Attempted fix v2
c5b6a7f Attempted fix v1
b4a5c6e Add broken feature
a3b4c5d Update styling
9a2b3c4 Version 2 - Good version  ← THIS ONE!
8a1b2c3 Version 1
7a0b1c2 Initial commit
\`\`\`

**Step 2: Reset to That Commit**
\`git reset --soft 9a2b3c4\`
(Use the actual hash you see!)

OR (more destructive):
\`git reset --hard 9a2b3c4\`

**HEAD~n vs Commit Hash:**

**Relative (HEAD~n):**
- \`HEAD~1\` = "previous commit"
- \`HEAD~5\` = "5 commits ago"
- ❌ Changes if new commits are added
- ✅ Quick for recent commits

**Absolute (Commit Hash):**
- \`git reset --soft a1b2c3d\`
- ✅ Permanent reference
- ✅ Never changes
- ✅ Professional approach
- 🎯 Best for going back to specific known-good states

**Pro Tips:**
- Only need first 7 characters: \`9a2b3c4\` instead of full hash
- You can copy hashes from \`git log\`
- Hashes work with ANY git command: \`git show a1b2c3d\`
- Save important commit hashes in notes for easy rollback!

**Real-World Scenario:**
"Hey team, if the deploy breaks, rollback to commit 9a2b3c4 - that's our last stable version!"

**In CI/CD Systems:**
Production deploys often use commit hashes for precise version control:
\`\`\`
deploy.sh --commit=9a2b3c4
\`\`\`

Let's practice professional-grade Git! 🚀`,
    "reset.level3.story.realWorldContext":
        "Usar hashes de commit es la forma profesional de referenciar puntos específicos en el historial. Son permanentes, inequívocos y funcionan en todos los repositorios de los miembros del equipo.",
    "reset.level3.story.taskIntroduction":
        "Usa git log para encontrar hashes de commits, luego usa git reset con un hash específico.",

    // Rebase Stage
    "rebase.name": "Rebase",
    "rebase.description": "Aprender a hacer rebase de ramas",

    // Rebase Level 1
    "rebase.level1.name": "Rebase Básico",
    "rebase.level1.description": "Aplicar commits de una rama sobre otra",
    "rebase.level1.objective1": "Hacer rebase de la rama actual sobre otra rama",
    "rebase.level1.hint1": "Estás en la rama feature: hazle rebase sobre main con: git rebase main",
    "rebase.level1.hint2": "Esto reescribe el historial aplicando tus commits encima de los últimos commits de main",
    "rebase.level1.hint3": "Usa 'git log --oneline' para ver el historial de commits después del rebase",
    "rebase.level1.requirement1.description": "Hacer rebase sobre otra rama",
    "rebase.level1.requirement1.success": "¡Buen trabajo! Has hecho rebase de la rama exitosamente.",
    "rebase.level1.story.title": "Creando un Historial Limpio",
    "rebase.level1.story.narrative":
        '"Veo que te estás familiarizando con las fusiones," dice Sarah. "Ahora exploremos un enfoque diferente para integrar cambios: el rebase."\n\nExplica: "Mientras que la fusión combina historiales, el rebase lo reescribe moviendo tus commits para que aparezcan después de los commits de otra rama. Esto crea un historial más lineal y limpio."',
    "rebase.level1.story.realWorldContext":
        "El rebase se prefiere a menudo cuando se quiere mantener un historial de proyecto limpio y lineal. Muchos equipos lo usan para integrar ramas de funcionalidades antes de fusionarlas a la rama principal.",
    "rebase.level1.story.taskIntroduction": "Estás en la rama feature. Hazle rebase sobre main usando: git rebase main",

    // Rebase Level 2
    "rebase.level2.name": "Gestionar Conflictos de Rebase",
    "rebase.level2.description": "Aprender a gestionar o abortar rebases con conflictos",
    "rebase.level2.objective1": "Abortar un rebase con conflictos",
    "rebase.level2.hint1": "Usa el comando `git rebase --abort`",
    "rebase.level2.hint2": "Esto detendrá el proceso de rebase y volverá al estado anterior al inicio del rebase",
    "rebase.level2.requirement1.description": "Abortar un rebase con conflictos",
    "rebase.level2.requirement1.success": "¡Excelente! Has abortado exitosamente la operación de rebase.",
    "rebase.level2.story.title": "Cuando los Rebases se Complican",
    "rebase.level2.story.narrative":
        '"Al igual que con las fusiones, el rebase puede generar conflictos," señala Alex. "Pero resolver conflictos durante un rebase puede ser más complejo porque Git aplica cada uno de tus commits uno a uno."\n\nContinúa: "Si estás en medio de un rebase y decides que es demasiado complejo o necesitas replantear tu enfoque, siempre puedes abortar el proceso."',
    "rebase.level2.story.realWorldContext":
        "Saber cuándo y cómo abortar un rebase es importante en el desarrollo del mundo real. A veces los conflictos son demasiado complejos para resolverlos de inmediato, o te das cuenta de que sería mejor una estrategia diferente.",
    "rebase.level2.story.taskIntroduction": "Practica abortar una operación de rebase usando git rebase --abort.",

    // Rebase Level 3
    "rebase.level3.name": "Rebase Interactivo",
    "rebase.level3.description": "Aprender a usar el rebase interactivo para modificar el historial de commits",
    "rebase.level3.objective1": "Iniciar una sesión de rebase interactivo",
    "rebase.level3.hint1": "Usa el comando `git rebase -i`",
    "rebase.level3.hint2": "El rebase interactivo te permite reordenar, editar, combinar o eliminar commits",
    "rebase.level3.requirement1.description": "Iniciar un rebase interactivo",
    "rebase.level3.requirement1.success": "¡Perfecto! Has iniciado una sesión de rebase interactivo.",
    "rebase.level3.story.title": "Limpiando el Historial",
    "rebase.level3.story.narrative":
        '"Tu funcionalidad se ve bien," dice Alex, revisando tu código. "Pero noto que tienes varios commits pequeños con correcciones de errores tipográficos y cambios menores. Antes de fusionar esto con main, limpiemos el historial de commits."\n\nExplica: "Git ofrece una poderosa herramienta llamada rebase interactivo que te permite modificar tu historial de commits. Puedes combinar commits pequeños, reformular mensajes de commit o incluso eliminar commits completamente."',
    "rebase.level3.story.realWorldContext":
        "El rebase interactivo se usa comúnmente para crear un historial de commits limpio y coherente antes de fusionar ramas de funcionalidades. Esto hace que el historial del código sea más legible y significativo.",
    "rebase.level3.story.taskIntroduction": "Inicia una sesión de rebase interactivo para modificar tu historial de commits.",

    // Rebase Level 4
    "rebase.level4.name": "Rebase sobre Main",
    "rebase.level4.description": "Aprender el flujo de trabajo de hacer rebase de ramas de funcionalidad sobre ramas main actualizadas",
    "rebase.level4.objective1": "Hacer rebase de tu rama de funcionalidad sobre la rama main actualizada",
    "rebase.level4.hint1": "Usa `git rebase main` mientras estás en tu rama de funcionalidad",
    "rebase.level4.hint2": "Esto aplicará los cambios de tu funcionalidad encima de los últimos cambios de la rama main",
    "rebase.level4.requirement1.description": "Hacer rebase de feature sobre main",
    "rebase.level4.requirement1.success": "¡Excelente! Has hecho rebase de tu rama de funcionalidad sobre la última rama main.",
    "rebase.level4.story.title": "Mantenerse al Día",
    "rebase.level4.story.narrative":
        '"Veo que mientras trabajabas en tu funcionalidad, alguien más ha subido cambios a la rama main," señala Sarah. "Antes de fusionar tu trabajo, deberías incorporar estos últimos cambios."\n\nContinúa: "En lugar de fusionar main en tu rama, lo que crea un commit de fusión, te recomiendo hacer rebase de tu rama sobre main. Esto mantiene el historial más limpio."',
    "rebase.level4.story.realWorldContext":
        "En entornos colaborativos, las ramas main se actualizan frecuentemente. Hacer rebase de las ramas de funcionalidad sobre main es un flujo de trabajo común que ayuda a evitar conflictos de fusión y mantiene las ramas de funcionalidad actualizadas.",
    "rebase.level4.story.taskIntroduction":
        "Haz rebase de tu rama de funcionalidad sobre la rama main actualizada para incorporar los últimos cambios.",

    // Advanced Stage
    "advanced.name": "Técnicas Avanzadas de Git",
    "advanced.description": "Dominar las características avanzadas y los flujos de trabajo de Git",

    // Advanced Level 1: Git Tags
    "advanced.level1.name": "Etiquetado de Versiones",
    "advanced.level1.description": "Aprender a marcar puntos importantes en el historial con etiquetas",
    "advanced.level1.objective1": "Crear una etiqueta anotada para un lanzamiento",
    "advanced.level1.objective2": "Listar todas las etiquetas en el repositorio",
    "advanced.level1.objective3": "Subir las etiquetas al repositorio remoto",
    "advanced.level1.hint1": "Crea una etiqueta anotada con: git tag -a v1.0.1 -m 'Lanzamiento de corrección de errores'",
    "advanced.level1.hint2": "Lista todas las etiquetas con: git tag",
    "advanced.level1.hint3": "Las etiquetas anotadas incluyen información del autor y un mensaje",
    "advanced.level1.hint4": "Las etiquetas se usan para marcar puntos de lanzamiento (v1.0, v2.0, etc.)",
    "advanced.level1.requirement1.description": "Crear una etiqueta de versión",
    "advanced.level1.requirement1.success": "¡Excelente! Has etiquetado este commit como punto de lanzamiento.",
    "advanced.level1.requirement2.description": "Listar todas las etiquetas para ver tu nueva etiqueta",
    "advanced.level1.requirement2.success": "¡Perfecto! Puedes ver todas las etiquetas en el repositorio.",
    "advanced.level1.requirement3.description": "Subir las etiquetas al repositorio remoto",
    "advanced.level1.requirement3.success": "¡Excelente! Tus etiquetas ya están disponibles para el equipo.",
    "advanced.level1.story.title": "Marcando Hitos",
    "advanced.level1.story.narrative":
        '"Estamos a punto de desplegar la versión 1.0 a producción," anuncia tu líder de equipo. "Antes de hacerlo, necesitamos etiquetar este commit. Las etiquetas son como marcadores en tu historial de Git: marcan puntos importantes como los lanzamientos."\n\nContinúa: "A diferencia de las ramas que se mueven con los nuevos commits, las etiquetas permanecen fijas. Esto significa que siempre podemos volver exactamente a lo que lanzamos en v1.0, incluso años después."\n\n"En los equipos profesionales, cada lanzamiento a producción se etiqueta. Es esencial para la depuración, las reversiones y los registros de cambios."',
    "advanced.level1.story.realWorldContext":
        "Las etiquetas son el estándar de la industria para marcar lanzamientos. Permiten el versionado semántico (v1.0.0), hacen las reversiones seguras y ayudan a los equipos a comunicarse sobre versiones específicas.",
    "advanced.level1.story.taskIntroduction":
        "Crea una etiqueta anotada para marcar este lanzamiento: git tag -a v1.0.1 -m 'Lanzamiento de corrección de errores'",

    // Advanced Level 2: Git Log Advanced
    "advanced.level2.name": "Historial de Commits Avanzado",
    "advanced.level2.description": "Dominar técnicas avanzadas para explorar el historial del repositorio",
    "advanced.level2.objective1": "Ver el historial de commits condensado",
    "advanced.level2.objective2": "Filtrar commits por autor o fecha",
    "advanced.level2.objective3": "Buscar en los mensajes de commit",
    "advanced.level2.hint1": "Ver el historial de commits en una línea con: git log --oneline",
    "advanced.level2.hint2": "Mostrar el historial de commits con grafo: git log --graph --oneline",
    "advanced.level2.hint3": "Limitar a los últimos N commits: git log --oneline -n 5",
    "advanced.level2.hint4": "Buscar en los mensajes de commit: git log --grep='fix'",
    "advanced.level2.requirement1.description": "Ver el historial de commits compacto",
    "advanced.level2.requirement1.success": "¡Perfecto! Has explorado el historial de commits.",
    "advanced.level2.requirement2.description": "Filtrar commits por autor",
    "advanced.level2.requirement2.success": "¡Genial! Ahora puedes encontrar commits de autores específicos.",
    "advanced.level2.requirement3.description": "Buscar en los mensajes de commit texto específico",
    "advanced.level2.requirement3.success": "¡Excelente! Ahora puedes buscar a través de los mensajes de commit.",
    "advanced.level2.story.title": "Explorando el Historial",
    "advanced.level2.story.narrative":
        '"Se introdujo un error en algún lugar de los últimos 50 commits," suspira tu colega. "¿Cómo lo encuentro?"\n\nTu desarrollador senior sonríe: "Git log es tu herramienta de detective. El formato predeterminado muestra todo, pero eso es abrumador. Déjame mostrarte las herramientas más potentes."\n\n"git log --oneline muestra cada commit en una línea, perfecto para escanear. Añade --graph para ver la estructura de ramas. Usa --grep para buscar mensajes de commit. Estas habilidades te convierten de usuario de Git en detective de Git."',
    "advanced.level2.story.realWorldContext":
        "Dominar git log es esencial para la depuración, la arqueología de código y para entender la evolución del proyecto. Los desarrolladores profesionales usan estas opciones a diario.",
    "advanced.level2.story.taskIntroduction": "Explora el historial de commits usando: git log --oneline",

    // Advanced Level 3: Git Show
    "advanced.level3.name": "Inspeccionar Commits",
    "advanced.level3.description": "Aprender a inspeccionar commits específicos en detalle",
    "advanced.level3.objective1": "Inspeccionar un commit específico usando su hash",
    "advanced.level3.hint1": "Primero usa 'git log --oneline' para encontrar un hash de commit",
    "advanced.level3.hint2": "Mostrar un commit específico: git show <hash-commit>",
    "advanced.level3.hint3": "git show muestra el mensaje del commit, autor, fecha y diferencias con los cambios del archivo",
    "advanced.level3.requirement1.description": "Inspeccionar un commit usando su hash",
    "advanced.level3.requirement1.success": "¡Genial! Has inspeccionado los detalles del commit y los cambios de archivo.",
    "advanced.level3.story.title": "Forense de Commits",
    "advanced.level3.story.narrative":
        '"Este commit rompió algo, pero no puedo decir qué cambió," dice tu compañero de equipo.\n\n"¡Usa git show!" respondes con confianza. "Te muestra todo sobre un commit: el mensaje, quién lo hizo, cuándo y, lo más importante, los cambios reales de código."\n\n"Es como una lupa para los commits. Esencial para revisiones de código, depuración y para entender qué cambiaron los colegas."',
    "advanced.level3.story.realWorldContext":
        "git show es una herramienta fundamental para la revisión de código y la depuración. Se usa constantemente en pull requests y al investigar problemas.",
    "advanced.level3.story.taskIntroduction": "Inspecciona el último commit usando: git show",

    // Workflow Stage
    "workflow.name": "Flujos de Trabajo de Git",
    "workflow.description": "Dominar los flujos de trabajo profesionales de Git y los patrones de colaboración",

    "workflow.level1.name": "Flujo de Trabajo con Ramas de Funcionalidad",
    "workflow.level1.description": "Aprender el flujo de trabajo estándar de la industria usado por equipos de todo el mundo",
    "workflow.level1.objective1": "Crear una rama de funcionalidad desde main",
    "workflow.level1.objective2": "Hacer commits con mensajes descriptivos",
    "workflow.level1.objective3": "Subir tu rama de funcionalidad al remoto",
    "workflow.level1.objective4": "Volver a la rama main",
    "workflow.level1.objective5": "Fusionar tu rama de funcionalidad de vuelta a main",
    "workflow.level1.objective6": "Completar el flujo de trabajo con rama de funcionalidad",
    "workflow.level1.hint1": "Empieza creando una rama de funcionalidad: 'git switch -c feature/user-auth'",
    "workflow.level1.hint2": "Modifica el archivo auth.js, luego usa 'git add' para preparar tus cambios",
    "workflow.level1.hint3": "Confirma con: 'git commit'",
    "workflow.level1.hint4": "Sube al remoto: 'git push origin feature/user-auth'",
    "workflow.level1.hint5": "Vuelve a main: 'git switch main'",
    "workflow.level1.hint6": "Finalmente fusiona: 'git merge feature/user-auth'",
    "workflow.level1.requirement1.description": "Crear una nueva rama de funcionalidad con 'git switch -c <rama>'",
    "workflow.level1.requirement1.success": "¡Rama de funcionalidad creada exitosamente!",
    "workflow.level1.requirement2.description": "Preparar tus cambios (¡primero modifica un archivo!)",
    "workflow.level1.requirement2.success": "¡Cambios preparados!",
    "workflow.level1.requirement3.description": "Confirmar tus cambios con un mensaje descriptivo",
    "workflow.level1.requirement3.success": "¡Cambios confirmados!",
    "workflow.level1.requirement4.description": "Subir tu rama de funcionalidad al remoto (git push origin <tu-rama>)",
    "workflow.level1.requirement4.success": "¡Rama de funcionalidad subida al remoto!",
    "workflow.level1.requirement5.description": "Volver a la rama main con 'git switch main'",
    "workflow.level1.requirement5.success": "¡Cambiado a la rama main!",
    "workflow.level1.requirement6.description": "Fusionar tu rama de funcionalidad en main",
    "workflow.level1.requirement6.success":
        "¡Funcionalidad fusionada exitosamente! Así es como los equipos reales integran nuevas funcionalidades.",
    "workflow.level1.story.title": "La Fábrica de Funcionalidades",
    "workflow.level1.story.narrative": `Eres desarrollador en TechCorp y el equipo sigue flujos de trabajo estrictos de Git. Tu manager Sarah acaba de asignarte una nueva funcionalidad: implementar la autenticación de usuarios.

"Recuerda," dice Sarah, "nunca hacemos commit directamente en main. Usa siempre ramas de funcionalidad y asegúrate de que tus commits cuenten una historia."

**¿Qué es una Rama de Funcionalidad?**
Una rama de funcionalidad es una rama separada donde desarrollas una nueva funcionalidad de forma aislada. Esto te permite:
- Trabajar sin afectar la rama main estable
- Que el código sea revisado antes de fusionarse
- Abandonar o modificar trabajo fácilmente sin impactar a otros

**El Flujo de Trabajo Completo:**
1. Crea una rama de funcionalidad desde main: \`git switch -c feature/user-auth\`
2. Modifica archivos y prepáralos con \`git add\`
3. Confirma los cambios con mensajes descriptivos
4. Sube tu rama al remoto: \`git push origin feature/user-auth\`
5. Vuelve a main: \`git switch main\`
6. Fusiona la funcionalidad: \`git merge feature/user-auth\`

**¿Qué son los Pull Requests (PRs)?**
En equipos reales, después del paso 4 (subir tu rama), crearías un **Pull Request** en GitHub/GitLab en lugar de fusionar directamente:

**Flujo de Trabajo de Pull Request:**
1. Subes tu rama de funcionalidad al repositorio remoto
2. En GitHub/GitLab, abres un Pull Request de \`feature/user-auth\` a \`main\`
3. Tus compañeros reciben una notificación
4. Revisan tu código, dejan comentarios y sugieren mejoras
5. Haces cambios basados en el feedback y vuelves a subir
6. Una vez aprobado, alguien fusiona el PR en main
7. ¡Tu funcionalidad ya es parte del código principal!

**Por Qué Importan los Pull Requests:**
- **Calidad del Código**: Múltiples ojos detectan errores y sugieren mejoras
- **Compartir Conocimiento**: El equipo conoce los cambios antes de que entren en producción
- **Documentación**: Las descripciones de los PRs explican POR QUÉ se hicieron los cambios
- **Discusión**: Las decisiones complejas se debaten y quedan registradas
- **Seguridad**: Evita que el código roto llegue a producción

En este nivel, simulamos el flujo de trabajo haciendo que subas y fusiones directamente para aprender los comandos de Git. ¡En proyectos reales, siempre usarías Pull Requests para la colaboración en equipo!`,
    "workflow.level1.story.realWorldContext":
        "El flujo de trabajo con rama de funcionalidad es el estándar de la industria. Los desarrolladores crean ramas aisladas, las suben a repositorios remotos (GitHub/GitLab), crean Pull Requests para revisión de código y fusionan después de la aprobación. Este enfoque colaborativo evita que el código inestable llegue a producción y mejora la calidad del código mediante la revisión entre pares.",
    "workflow.level1.story.taskIntroduction":
        "Domina el flujo de trabajo completo con rama de funcionalidad: crear, confirmar, subir y fusionar. Así es como los equipos profesionales lanzan funcionalidades cada día.",

    "workflow.level2.name": "Flujo de Trabajo de Hotfix",
    "workflow.level2.description": "Gestionar correcciones urgentes de producción con el flujo de trabajo de hotfix",
    "workflow.level2.objective1": "Crear una rama hotfix desde main",
    "workflow.level2.objective2": "Preparar y confirmar la corrección",
    "workflow.level2.objective3": "Volver a main",
    "workflow.level2.objective4": "Fusionar la rama hotfix",
    "workflow.level2.hint1": "Los hotfixes se ramifican directamente desde main/master",
    "workflow.level2.hint2": "Usa nombres descriptivos para hotfix como 'hotfix/parche-seguridad-critico'",
    "workflow.level2.hint3": "Los hotfixes deben fusionarse de vuelta tanto a main como a las ramas develop",
    "workflow.level2.hint4": "Siempre etiqueta los lanzamientos de hotfix para el seguimiento",
    "workflow.level2.requirement1.description": "Crear una rama hotfix para el problema de seguridad",
    "workflow.level2.requirement1.success": "¡Rama hotfix creada!",
    "workflow.level2.requirement2.description": "Preparar tus correcciones de seguridad",
    "workflow.level2.requirement2.success": "¡Correcciones de seguridad preparadas!",
    "workflow.level2.requirement3.description": "Confirmar el parche de seguridad crítico",
    "workflow.level2.requirement3.success": "¡Parche de seguridad confirmado!",
    "workflow.level2.requirement4.description": "Volver a la rama main",
    "workflow.level2.requirement4.success": "¡Cambiado a la rama main!",
    "workflow.level2.requirement5.description": "Fusionar el hotfix en main",
    "workflow.level2.requirement5.success": "¡Hotfix fusionado exitosamente!",
    "workflow.level2.story.title": "Código Rojo: Emergencia de Producción",
    "workflow.level2.story.narrative": `🚨 ¡URGENTE: ¡Producción está caída! 🚨

A las 2:47 AM, tu teléfono vibra con alertas. El sistema de pagos está fallando y los clientes no pueden completar sus compras. El rastreador de errores muestra que se introdujo una vulnerabilidad crítica de seguridad en el último lanzamiento.

Como desarrollador de guardia, necesitas:
1. Crear inmediatamente una rama hotfix: \`git switch -c hotfix/security-patch\`
2. Corregir el problema crítico de seguridad en el código
3. Preparar y confirmar tus correcciones
4. Volver a main: \`git switch main\`
5. Fusionar el hotfix: \`git merge hotfix/security-patch\`

Cada minuto le cuesta miles a la empresa. Esto es lo que separa a los desarrolladores junior de los senior: la calma bajo presión y conocer los flujos de trabajo de Git correctos.

El tiempo es dinero. ¡Vamos a arreglarlo!`,
    "workflow.level2.story.realWorldContext":
        "Los hotfixes de producción son críticos para mantener la estabilidad del sistema y requieren una ejecución inmediata y enfocada del flujo de trabajo.",
    "workflow.level2.story.taskIntroduction": "Domina el flujo de trabajo de hotfix para correcciones urgentes de producción.",

    "workflow.level3.name": "Dominio de Git Flow",
    "workflow.level3.description": "Dominar el flujo de trabajo completo de Git Flow con ramas de lanzamiento",
    "workflow.level3.objective1": "Crear una rama de lanzamiento desde develop",
    "workflow.level3.objective2": "Preparar y confirmar los cambios de lanzamiento",
    "workflow.level3.objective3": "Fusionar el lanzamiento en main",
    "workflow.level3.objective4": "Etiquetar la versión de lanzamiento",
    "workflow.level3.hint1": "Empieza en develop y crea la rama de lanzamiento: 'git switch -c release/2.0.0'",
    "workflow.level3.hint2": "Haz los ajustes finales y confirma la preparación del lanzamiento",
    "workflow.level3.hint3": "Cambia a main: 'git switch main'",
    "workflow.level3.hint4": "Fusiona el lanzamiento: 'git merge release/2.0.0'",
    "workflow.level3.hint5": "Etiqueta el lanzamiento: 'git tag v2.0.0'",
    "workflow.level3.hint6": "En proyectos reales, también fusionarías de vuelta a develop",
    "workflow.level3.requirement1.description": "Crear una rama de lanzamiento (p.ej., 'release/2.0.0')",
    "workflow.level3.requirement1.success": "¡Rama de lanzamiento creada!",
    "workflow.level3.requirement2.description": "Preparar los cambios de preparación del lanzamiento",
    "workflow.level3.requirement2.success": "¡Cambios de lanzamiento preparados!",
    "workflow.level3.requirement3.description": "Confirmar la preparación del lanzamiento con un mensaje claro",
    "workflow.level3.requirement3.success": "¡Preparación del lanzamiento confirmada!",
    "workflow.level3.requirement4.description": "Cambiar a la rama main para preparar la fusión del lanzamiento",
    "workflow.level3.requirement4.success": "¡Cambiado a main!",
    "workflow.level3.requirement5.description": "Fusionar tu rama de lanzamiento en main",
    "workflow.level3.requirement5.success": "¡Lanzamiento fusionado en main!",
    "workflow.level3.requirement6.description": "Etiquetar el lanzamiento con número de versión (p.ej., 'v2.0.0')",
    "workflow.level3.requirement6.success": "¡Lanzamiento etiquetado! ¡La versión 2.0.0 ya está en producción!",
    "workflow.level3.story.title": "El Gestor de Lanzamientos",
    "workflow.level3.story.narrative": `¡Felicidades! Has sido ascendido a Gestor de Lanzamientos en GitFlow Inc., una empresa que lanza software cada dos semanas como un reloj.

Tu trabajo es orquestar el lanzamiento de la versión 2.0, que incluye:
- Tres nuevas funcionalidades de diferentes equipos
- Dos correcciones críticas de errores
- Mejoras de rendimiento
- Documentación actualizada

**El Flujo de Trabajo de Lanzamiento:**

1. **Crear Rama de Lanzamiento**: Empieza desde develop y crea una rama de lanzamiento
   \`git switch -c release/2.0.0\`

2. **Preparativos Finales**: Actualiza números de versión, CHANGELOG, etc.
   - Edita los archivos necesarios
   - \`git add .\`
   - \`git commit -m "Preparar lanzamiento 2.0.0"\`

3. **Fusionar en Main**: Desplegar a producción
   - \`git switch main\`
   - \`git merge release/2.0.0\`

4. **Etiquetar el Lanzamiento**: Marca esta versión en el historial
   \`git tag v2.0.0\`

Esto crea un marcador permanente para este lanzamiento. En proyectos reales, también:
- Fusionarías de vuelta a develop para mantenerlo sincronizado
- Eliminarías la rama de lanzamiento
- Subirías todo al remoto
- Desplegarías a producción

¡Esto es gestión de Git a nivel empresarial. Bienvenido a las grandes ligas!`,
    "workflow.level3.story.realWorldContext":
        "Las ramas de lanzamiento se usan en Git Flow para preparar lanzamientos de producción. Permiten correcciones finales de errores y actualizaciones de documentación sin bloquear el desarrollo en curso. El lanzamiento se etiqueta para facilitar la referencia y la reversión si es necesario.",
    "workflow.level3.story.taskIntroduction":
        "Aprende el flujo de trabajo profesional de lanzamiento: ramificar, preparar, fusionar y etiquetar. Así es como los equipos lanzan software estable a producción.",

    // Teamwork Stage
    "teamwork.name": "Colaboración en Equipo",
    "teamwork.description": "Aprende a trabajar eficazmente con equipos usando técnicas de colaboración con Git",

    "teamwork.level1.name": "Conceptos Básicos de Colaboración en Equipo",
    "teamwork.level1.description": "Aprender a trabajar eficazmente con un equipo usando Git",
    "teamwork.level1.objective1": "Descargar el último código del equipo del remoto",
    "teamwork.level1.objective2": "Crear una nueva rama de funcionalidad para tu trabajo",
    "teamwork.level1.objective3": "Editar team.md y añadir tu nombre a la lista de miembros del equipo",
    "teamwork.level1.objective4": "Preparar tus cambios",
    "teamwork.level1.objective5": "Confirmar tus cambios",
    "teamwork.level1.objective6": "Subir tus cambios al repositorio remoto",
    "teamwork.level1.hint1": "Usa 'git pull origin main' para obtener el último código del equipo",
    "teamwork.level1.hint2": "Crea una nueva rama con 'git switch -c feature/TU-NOMBRE'",
    "teamwork.level1.hint3": "Edita el archivo team.md para añadir tu nombre y rol",
    "teamwork.level1.hint4": "Prepara todos los cambios con 'git add .'",
    "teamwork.level1.hint5": "Confirma con un mensaje claro: 'git commit -m \"Añadir mi perfil\"'",
    "teamwork.level1.hint6":
        "Sube tu rama con 'git push origin feature/TU-NOMBRE' o 'git push --set-upstream origin feature/TU-NOMBRE'",
    "teamwork.level1.requirement1.description": "Descargar los últimos cambios del repositorio del equipo",
    "teamwork.level1.requirement1.success": "¡Últimos cambios descargados exitosamente!",
    "teamwork.level1.requirement2.description": "Crear tu rama de funcionalidad para el perfil del equipo",
    "teamwork.level1.requirement2.success": "¡Rama de funcionalidad creada!",
    "teamwork.level1.requirement3.description": "Editar team.md y añadir tu nombre a la lista",
    "teamwork.level1.requirement3.success": "¡Archivo modificado! Tu nombre ha sido añadido.",
    "teamwork.level1.requirement4.description": "Preparar los cambios de tu perfil en el equipo",
    "teamwork.level1.requirement4.success": "¡Cambios preparados!",
    "teamwork.level1.requirement5.description": "Confirmar tu perfil del equipo con un mensaje descriptivo",
    "teamwork.level1.requirement5.success": "¡Perfil del equipo confirmado!",
    "teamwork.level1.requirement6.description": "Subir tus cambios al repositorio remoto",
    "teamwork.level1.requirement6.success": "¡Cambios subidos al remoto!",
    "teamwork.level1.story.title": "Bienvenido al Equipo de Desarrollo",
    "teamwork.level1.story.narrative": `🎉 ¡Felicidades! Acabas de ser contratado como desarrollador en InnovateCorp, una startup tecnológica de rápido crecimiento.

Tu líder de equipo, Alex, te guía en tu primer día:

"¡Bienvenido al equipo! Aquí usamos Git para todo. El código es nuestro espacio de trabajo compartido y todos contribuyen a él diariamente. Tu primera tarea es sencilla pero importante: añade tu perfil a nuestra página del equipo."

"Recuerda," continúa Alex, "somos 12 desarrolladores trabajando en este proyecto. Todos necesitamos estar sincronizados. Siempre haz \`git pull\` antes de hacer push, y asegúrate de que tus mensajes de commit sean claros para que el resto sepamos en qué estás trabajando."

Tu misión:
1. Obtén el último código del repositorio del equipo con \`git pull origin main\`
2. Crea tu rama de funcionalidad: \`git switch -c feature/team-profile\`
3. Añade tu perfil de desarrollador a la página del equipo
4. Prepara los cambios: \`git add .\`
5. Confirma tus cambios: \`git commit -m "Añadir mi perfil"\`
6. Sube tu rama: \`git push origin feature/team-profile\`

Esto es desarrollo en equipo real. ¡Hagamos tu primera contribución!`,
    "teamwork.level1.story.realWorldContext":
        "La colaboración en equipo es el corazón del desarrollo de software. Aprender a trabajar con repositorios compartidos es esencial para cualquier desarrollador.",
    "teamwork.level1.story.taskIntroduction":
        "Aprende los fundamentos del flujo de trabajo de Git basado en equipo y haz tu primera contribución colaborativa.",

    "teamwork.level2.name": "Gestionar Conflictos de Fusión en Equipos",
    "teamwork.level2.description": "Resolver conflictos de fusión que ocurren cuando múltiples desarrolladores trabajan en los mismos archivos",
    "teamwork.level2.objective1": "Preparar y confirmar tus cambios locales",
    "teamwork.level2.objective2": "Descargar los cambios remotos (genera conflicto)",
    "teamwork.level2.objective3": "Resolver los marcadores de conflicto de fusión",
    "teamwork.level2.objective4": "Preparar y confirmar la solución fusionada",
    "teamwork.level2.hint1": "Usa 'cat /src/auth/login.js' para ver tus cambios locales sin confirmar",
    "teamwork.level2.hint2": "Usa 'git status' para confirmar que el archivo está modificado",
    "teamwork.level2.hint3": "Confirma con 'git add /src/auth/login.js' luego 'git commit -m \"mensaje\"'",
    "teamwork.level2.hint4": "Descarga con 'git pull origin main': ¡esto generará el conflicto!",
    "teamwork.level2.hint5": "Busca los marcadores de conflicto: <<<<<<<, =======, >>>>>>>",
    "teamwork.level2.hint6": "Edita login.js para combinar tanto tus mejoras como las de Sarah",
    "teamwork.level2.hint7": "La mejor solución conserva AMBAS: la verificación de email de Sarah Y tus longitudes más estrictas",
    "teamwork.level2.hint8": "Después de resolver: 'git add .' luego 'git commit -m \"Resolver conflicto de fusión\"'",
    "teamwork.level2.requirement1.description": "Preparar tus cambios locales en login.js",
    "teamwork.level2.requirement1.success": "¡Cambios locales preparados!",
    "teamwork.level2.requirement2.description": "Confirmar primero tus cambios locales",
    "teamwork.level2.requirement2.success": "¡Cambios locales confirmados!",
    "teamwork.level2.requirement3.description": "Descargar los cambios de Sarah para generar el conflicto",
    "teamwork.level2.requirement3.success": "¡Cambios conflictivos descargados! Comprueba login.js para ver los marcadores de conflicto.",
    "teamwork.level2.requirement4.description": "Preparar la resolución del conflicto",
    "teamwork.level2.requirement4.success": "¡Resolución del conflicto preparada!",
    "teamwork.level2.requirement5.description": "Confirmar la resolución de la fusión",
    "teamwork.level2.requirement5.success": "¡Conflicto de fusión resuelto!",
    "teamwork.level2.story.title": "La Gran Crisis del Conflicto de Fusión",
    "teamwork.level2.story.narrative": `⚠️ ¡Bienvenido a tu primer conflicto de fusión!

**La Situación:**
Has estado trabajando esta mañana en \`/src/auth/login.js\`. Has mejorado la validación de contraseñas para que sea más estricta (mínimo 5 caracteres para el nombre de usuario, 10 para la contraseña). ¡Buen trabajo!

Pero mientras codificabas, ¡tu compañera Sarah también subió cambios al MISMO ARCHIVO! Ella añadió lógica de validación de email. Ahora ambos tenéis versiones diferentes de las mismas líneas de código.

**Tu Misión:**

**1. Comprueba tus cambios locales:** Ejecuta \`cat /src/auth/login.js\` para ver TUS mejoras (¡ya hechas, pero sin confirmar todavía!)

**2. Confirma PRIMERO tus cambios:**
\` git add /src/auth/login.js
git commit -m "Mejorar los requisitos de validación de contraseña"
\`

**3. Ahora intenta descargar los cambios de Sarah:**
\` git pull origin main \`

**4. 💥 ¡CONFLICTO DE FUSIÓN!** Git no puede fusionar automáticamente porque tú y Sarah modificasteis las mismas líneas. Verás marcadores de conflicto en el archivo:
\`<<<<<<< HEAD
(tus cambios)
=======
(cambios de Sarah)
>>>>>>> abc1234\`

**5. Resuelve el conflicto:**
- Edita \`/src/auth/login.js\` para combinar lo mejor de ambas versiones
- Elimina los marcadores de conflicto (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`)
- ¡Conserva tanto tu longitud de contraseña más estricta COMO la validación de email de Sarah!

**6. Completa la fusión:**
\`git add .
git commit -m "Fusionar la validación de email de Sarah con mis mejoras de contraseña"\`

**Consejo Pro:** ¡La mejor resolución a menudo combina ambos cambios! En este caso, conserva:
- La lógica de validación de email de Sarah (\`username.includes('@')\`)
- Tus requisitos de longitud más estrictos (\`username.length >= 5\` y \`password.length >= 10\`)

¡Esto es completamente normal en el desarrollo en equipo! Los conflictos de fusión ocurren cuando múltiples desarrolladores trabajan en el mismo código. La clave es resolverlos con cuidado.`,
    "teamwork.level2.story.realWorldContext":
        "Los conflictos de fusión son inevitables en el desarrollo en equipo. Aprender a resolverlos rápida y correctamente es una habilidad crucial.",
    "teamwork.level2.story.taskIntroduction":
        "Domina la resolución de conflictos de fusión para convertirte en un colaborador seguro en el equipo.",

    "teamwork.level3.name": "Flujo de Trabajo de Revisión de Código",
    "teamwork.level3.description": "Aprender a participar en revisiones de código y colaborar a través de pull requests",
    "teamwork.level3.objective1": "Crear una nueva rama de funcionalidad",
    "teamwork.level3.objective2": "Preparar tu trabajo completado",
    "teamwork.level3.objective3": "Confirmar con un mensaje claro",
    "teamwork.level3.objective4": "Subir tu rama para revisión del equipo",
    "teamwork.level3.hint1": "Crea una rama de funcionalidad: git switch -c feature/password-reset",
    "teamwork.level3.hint2": "Alternativa (clásica): git checkout -b feature/password-reset",
    "teamwork.level3.hint3": "Prepara todos los cambios: git add .",
    "teamwork.level3.hint4": 'Confirma con un mensaje descriptivo: git commit -m "Añadir funcionalidad de restablecimiento de contraseña"',
    "teamwork.level3.hint5": "Sube al remoto: git push origin feature/password-reset",
    "teamwork.level3.hint6": "Alternativa abreviada: git push -u origin feature/password-reset",
    "teamwork.level3.hint7":
        "Nota: Usa el nombre de la rama que creaste (no 'feature/password-reset' si elegiste un nombre diferente)",
    "teamwork.level3.requirement1.description": "Crear una rama para la demostración de revisión de código",
    "teamwork.level3.requirement1.success": "¡Rama de funcionalidad creada! ✨",
    "teamwork.level3.requirement2.description": "Preparar tu código para revisión",
    "teamwork.level3.requirement2.success": "¡Código preparado para revisión! 📦",
    "teamwork.level3.requirement3.description": "Confirmar con un mensaje claro y revisable",
    "teamwork.level3.requirement3.success": "¡Código confirmado con mensaje claro! 💬",
    "teamwork.level3.requirement4.description": "Subir tu rama para revisión de código",
    "teamwork.level3.requirement4.success":
        "¡Código subido para revisión del equipo! 🚀 ¡En equipos reales, ahora crearías un Pull Request!",
    "teamwork.level3.story.title": "La Cultura de la Revisión de Código",
    "teamwork.level3.story.narrative": `📝 ¡Bienvenido al Proceso de Revisión de Código de InnovateCorp!

**La Situación:**
Acabas de terminar de implementar la funcionalidad de restablecimiento de contraseña. ¡El código funciona perfectamente en tus pruebas locales! 🎉

Pero espera: en InnovateCorp, ningún código llega a producción sin una revisión de código. No es una cuestión de confianza, sino de calidad, de compartir conocimiento y de detectar errores antes de que los clientes los vean.

**Por Qué Importan las Revisiones de Código:**
- **Calidad:** Sarah podría detectar un problema de seguridad que se te pasó
- **Compartir Conocimiento:** Mike aprende de tu solución inteligente
- **Mejor Código:** Múltiples perspectivas hacen mejor software
- **Crecimiento del Equipo:** Todos se convierten en mejores desarrolladores

**Tu Tarea:**
Necesitas preparar tu funcionalidad de restablecimiento de contraseña para la revisión del equipo. Sigue el flujo de trabajo profesional:

**Paso 1: Crea una Rama de Funcionalidad**
¡Nunca trabajes directamente en \`main\`! Crea una rama dedicada para tu funcionalidad.

**Paso 2: Prepara tu Trabajo**
Añade tus archivos completados al área de preparación.

**Paso 3: Confirma con un Mensaje Claro**
Escribe un mensaje de commit que explique lo que construiste. Tus compañeros deberían entender tus cambios sin leer cada línea de código.

**Paso 4: Sube al Remoto**
Sube tu rama de funcionalidad para que el equipo pueda revisarla. En equipos reales, luego crearías un Pull Request en GitHub/GitLab.

**Recuerda:** La clave para las grandes revisiones de código es la comunicación clara. ¡El nombre de tu rama, los mensajes de commit y el código deben contar una historia!

¡Preparemos tu código para el equipo! 🚀`,
    "teamwork.level3.story.realWorldContext":
        "Las revisiones de código son una práctica estándar en el desarrollo profesional. Mejoran la calidad del código, detectan errores temprano y ayudan a los equipos a aprender unos de otros. La mayoría de las empresas usan Pull Requests (GitHub) o Merge Requests (GitLab) para este proceso.",
    "teamwork.level3.story.taskIntroduction":
        "Aprende el flujo de trabajo profesional para preparar código para revisión en equipo mediante ramas, commits y operaciones de push.",

    // Archaeology Stage
    "archaeology.name": "Arqueología de Git",
    "archaeology.description": "Investiga el historial de código y realiza forense de Git como un detective",

    // Mastery Stage
    "mastery.name": "Maestría en Git",
    "mastery.description": "Los desafíos definitivos de Git para verdaderos maestros",

    "mastery.level1.name": "Desafío de Fusión Multirrama",
    "mastery.level1.description": "Dominar fusiones complejas en múltiples ramas con conflictos",
    "mastery.level1.objective1": "Fusionar múltiples ramas de funcionalidad simultáneamente",
    "mastery.level1.objective2": "Resolver conflictos de fusión complejos",
    "mastery.level1.objective3": "Preparar los conflictos resueltos",
    "mastery.level1.objective4": "Completar la fusión múltiple",
    "mastery.level1.hint1": "Usa git merge para fusionar múltiples ramas a la vez",
    "mastery.level1.hint2": "Analiza cada conflicto con cuidado: pueden interactuar",
    "mastery.level1.hint3": "La mejor solución a menudo combina elementos de todas las ramas",
    "mastery.level1.hint4": "Prueba tu código fusionado antes de confirmar",
    "mastery.level1.requirement1.description": "Fusionar todas las ramas de funcionalidad en main",
    "mastery.level1.requirement1.success": "¡Fusión compleja iniciada! Ahora resuelve los conflictos.",
    "mastery.level1.requirement2.description": "Preparar todos los archivos resueltos",
    "mastery.level1.requirement2.success": "¡Conflictos resueltos y preparados!",
    "mastery.level1.requirement3.description": "Completar la fusión con un commit",
    "mastery.level1.requirement3.success": "¡Fusión de nivel maestro completada! ¡Has conquistado las fusiones múltiples!",
    "mastery.level1.story.title": "El Desafío de Integración",
    "mastery.level1.story.narrative":
        "Tres equipos han estado trabajando en paralelo para el lanzamiento trimestral. Cada equipo desarrolló funcionalidades críticas en ramas separadas. Ahora es el día de integración y eres el desarrollador principal responsable de fusionarlo todo. El desafío: las tres ramas modificaron archivos de utilidades compartidos. Debes fusionar todas las ramas y resolver los conflictos para crear un sistema coherente y funcional.",
    "mastery.level1.story.realWorldContext":
        "Las fusiones complejas multirrama son comunes en proyectos grandes con múltiples flujos de desarrollo paralelos. Dominar esta habilidad es esencial para los desarrolladores senior y los líderes técnicos.",
    "mastery.level1.story.taskIntroduction":
        "Fusiona tres ramas de funcionalidad con cambios superpuestos y resuelve todos los conflictos para crear una base de código unificada.",

    "mastery.level2.name": "Git Hooks y Automatización",
    "mastery.level2.description": "Implementar Git hooks para automatizar flujos de trabajo y aplicar estándares de calidad",
    "mastery.level2.objective1": "Crear hooks pre-commit para la calidad del código",
    "mastery.level2.objective2": "Configurar hooks post-commit para notificaciones",
    "mastery.level2.objective3": "Implementar hooks del lado del servidor",
    "mastery.level2.objective4": "Construir pipelines de flujo de trabajo automatizados",
    "mastery.level2.hint1": "Los hooks pre-commit se ejecutan antes de crear los commits",
    "mastery.level2.hint2": "Los hooks post-commit se ejecutan después de commits exitosos",
    "mastery.level2.hint3": "Usa códigos de salida para prevenir commits en los hooks pre-commit",
    "mastery.level2.hint4": "Los hooks del lado del servidor controlan qué se puede subir",
    "mastery.level2.requirement1.description": "Hacer ejecutable el hook pre-commit",
    "mastery.level2.requirement1.success": "¡Hook pre-commit activado!",
    "mastery.level2.requirement2.description": "Preparar archivos para probar el hook pre-commit",
    "mastery.level2.requirement2.success": "¡Archivos preparados!",
    "mastery.level2.requirement3.description": "Intentar un commit para activar las comprobaciones de calidad",
    "mastery.level2.requirement3.success": "¡Comprobaciones de calidad superadas!",
    "mastery.level2.story.title": "El Guardián de la Calidad",
    "mastery.level2.story.narrative": `⚡ Has sido ascendido a Ingeniero DevOps y tu primera misión es implementar el "Guardián de la Calidad": un sistema automatizado que impide que el código malo entre en el repositorio.

El equipo de desarrollo ha estado creciendo rápidamente y con el crecimiento llega la inconsistencia:
- Commits sin las pruebas adecuadas
- Violaciones del estilo de código
- Secretos confirmados accidentalmente
- Builds rotos subidos a main

Tu líder de equipo, Sarah, explica la visión:

"Necesitamos automatización para hacer cumplir nuestros estándares de calidad. Cada commit debería ser comprobado automáticamente para:
- Linting y estilo de código
- Paso de pruebas unitarias
- Vulnerabilidades de seguridad
- Estándares de mensajes de commit"

"Los Git hooks son perfectos para esto. Son scripts que se ejecutan en puntos específicos del flujo de trabajo de Git. Piensa en ellos como puertas de calidad por las que debe pasar el código."

El ecosistema de hooks:
- pre-commit: Ejecuta comprobaciones antes de crear los commits
- pre-push: Valida antes de subir al remoto
- post-commit: Envía notificaciones o activa builds
- Hooks del lado del servidor: Controla lo que se puede subir

Tu misión:
1. Implementar un hook pre-commit para comprobaciones de calidad
2. Configurar pruebas automatizadas y linting
3. Crear sistemas de notificación
4. Construir un pipeline de calidad completo

Este es trabajo de infraestructura que beneficiará a cada desarrollador de tu equipo. No solo estás escribiendo código: estás construyendo los cimientos de la calidad del código.`,
    "mastery.level2.story.realWorldContext":
        "Los Git hooks son esenciales para implementar garantía de calidad automatizada y automatización del flujo de trabajo en entornos de desarrollo profesional.",
    "mastery.level2.story.taskIntroduction":
        "Domina los Git hooks para construir sistemas de calidad automatizados que apliquen estándares y mejoren la productividad del equipo.",

    "mastery.level3.name": "Maestría en Git: El Desafío Final",
    "mastery.level3.description": "Combinar todas las técnicas avanzadas de Git para resolver un escenario complejo del mundo real",
    "mastery.level3.objective1": "Orquestar un lanzamiento complejo con múltiples hotfixes",
    "mastery.level3.objective2": "Gestionar reversiones de emergencia y recuperación",
    "mastery.level3.objective3": "Coordinar con múltiples equipos simultáneamente",
    "mastery.level3.objective4": "Demostrar maestría de todas las técnicas",
    "mastery.level3.hint1": "Este desafío combina todo lo que has aprendido",
    "mastery.level3.hint2": "Piensa estratégicamente sobre la gestión de ramas",
    "mastery.level3.hint3": "La comunicación es tan importante como las habilidades técnicas",
    "mastery.level3.hint4": "Documenta tus decisiones para el equipo",
    "mastery.level3.requirement1.description": "Crear una rama de reversión de emergencia",
    "mastery.level3.requirement1.success": "¡Procedimientos de emergencia iniciados!",
    "mastery.level3.requirement2.description": "Aplicar correcciones críticas con cherry-pick",
    "mastery.level3.requirement2.success": "¡Correcciones críticas aplicadas!",
    "mastery.level3.requirement3.description": "Etiquetar el lanzamiento de emergencia",
    "mastery.level3.requirement3.success": "¡Lanzamiento de emergencia etiquetado!",
    "mastery.level3.requirement4.description": "Subir las etiquetas del lanzamiento de emergencia",
    "mastery.level3.requirement4.success": "🎉 ¡MAESTRÍA ALCANZADA! ¡Ahora eres un Maestro de Git!",
    "mastery.level3.story.title": "El Desafío Definitivo de Git: Crisis del Black Friday",
    "mastery.level3.story.narrative": `🚨 BLACK FRIDAY, 2:00 AM - LA PRUEBA DEFINITIVA

Eres el Ingeniero DevOps Senior en MegaCorp y te enfrentas a la tormenta perfecta de desafíos de Git en el día de compras más grande del año.

La situación:
- Producción está parcialmente caída por un despliegue fallido
- Tres equipos diferentes subieron hotfixes simultáneamente
- El sistema de pagos está fallando de forma intermitente
- El soporte al cliente está desbordado
- El CEO pide actualizaciones cada hora
- El tráfico del Black Friday es 50 veces el nivel normal

Tu CTO convoca una reunión de emergencia:

"Para esto te contratamos. Todo lo que hemos construido, todo lo que hemos aprendido, llega a este momento. Necesitamos a alguien que pueda navegar operaciones complejas de Git bajo presión extrema."

El desafío implica:
1. **Reversión de Emergencia**: Revertir rápidamente el despliegue problemático
2. **Recuperación Selectiva**: Hacer cherry-pick solo de los cambios buenos
3. **Coordinación de Hotfixes**: Fusionar correcciones críticas de múltiples equipos
4. **Gestión de Lanzamientos**: Crear y desplegar parches de emergencia
5. **Comunicación del Equipo**: Coordinar entre desarrollo, QA y operaciones

Debes usar todas las técnicas de Git de tu arsenal:
- \`git rebase -i\` para limpiar commits desordenados
- \`git cherry-pick <hash-commit>\` para seleccionar solo las funcionalidades que funcionan (copia commits específicos de una rama a otra)
- Fusiones avanzadas con \`git merge\` para combinar los esfuerzos del equipo
- \`git bisect\` para encontrar el commit exacto del problema (búsqueda binaria en el historial para encontrar errores)
- \`git reflog\` para recuperarse de errores
- \`git tag\` y ramas para la gestión de lanzamientos
- \`git mv <viejo> <nuevo>\` para renombrar archivos preservando el historial de Git

**¿Qué es git cherry-pick?**
Cherry-picking te permite copiar commits específicos de una rama a otra. En lugar de fusionar ramas enteras, puedes elegir commits individuales. ¡Perfecto para aplicar hotfixes de una rama a otra!

Ejemplo: \`git cherry-pick abc123\` - aplica el commit abc123 a tu rama actual

**¿Qué es git bisect?**
Bisect te ayuda a encontrar qué commit introdujo un error usando búsqueda binaria. Git hará checkout de commits para que pruebes, y le dices "good" o "bad" hasta que encuentre el commit problemático.

Ejemplo:
\`git bisect start\`
\`git bisect bad\` (el commit actual está roto)
\`git bisect good abc123\` (este commit antiguo funcionaba)
¡Git te guiará por los commits hasta encontrar el primero malo!

**¿Qué es git mv?**
Mueve o renombra archivos manteniendo intacto el historial de Git. Mejor que renombrar archivos manualmente porque Git rastrea el cambio de nombre.

Ejemplo: \`git mv nombre-viejo.js nombre-nuevo.js\`

Esto no es solo sobre comandos de Git: se trata de liderazgo, toma de decisiones bajo presión y la capacidad de pensar sistemáticamente cuando todo está en llamas.

Los ingresos del Black Friday de la empresa dependen de ti. Millones de clientes están esperando. Tu equipo te mira en busca de orientación.

Este es tu momento. Demuéstrales lo que puede hacer un Maestro de Git.

¿Listo para demostrar tu maestría? El tiempo corre...`,
    "mastery.level3.story.realWorldContext":
        "La verdadera maestría en Git implica orquestar operaciones complejas bajo presión, gestionar múltiples partes interesadas y tomar decisiones críticas que afectan las operaciones empresariales.",
    "mastery.level3.story.taskIntroduction":
        "Este es el desafío definitivo de Git: combina todas tus habilidades para gestionar un escenario de emergencia complejo y de alta presión.",

    // Archaeology Stage Levels
    "archaeology.level1.name": "Git Blame - Arqueología de Código",
    "archaeology.level1.description": "Investigar el historial de código para entender los cambios y encontrar el origen de los errores",
    "archaeology.level1.objective1": "Encontrar quién escribió líneas específicas",
    "archaeology.level1.objective2": "Rastrear el historial de un error",
    "archaeology.level1.objective3": "Entender el contexto de los cambios en el código",
    "archaeology.level1.objective4": "Encontrar commits y cambios relacionados",
    "archaeology.level1.hint1": "git blame muestra quién modificó por última vez cada línea",
    "archaeology.level1.hint2": "Usa la opción -L para culpar a rangos de líneas específicos",
    "archaeology.level1.hint3": "Combina blame con log para entender el contexto",
    "archaeology.level1.hint4": "Busca patrones en los mensajes de commit",
    "archaeology.level1.requirement1.description": "Investigar quién escribió la lógica de validación",
    "archaeology.level1.requirement1.success": "¡Autoría del código revelada!",
    "archaeology.level1.requirement2.description": "Comprobar el historial reciente de commits para contexto",
    "archaeology.level1.requirement2.success": "¡Historial reciente examinado!",
    "archaeology.level1.requirement3.description": "Examinar los detalles de un commit específico",
    "archaeology.level1.requirement3.success": "¡Detalles del commit analizados!",
    "archaeology.level1.story.title": "El Caso del Error Misterioso",
    "archaeology.level1.story.narrative":
        "Un error crítico en el código de validación está afectando al 23% de los clientes europeos. El código fue escrito por 4 desarrolladores diferentes durante 18 meses. Tu desarrollador senior explica: 'Bienvenido a la arqueología de código. Git no es solo control de versiones: es tu máquina del tiempo. Cada línea tiene una historia.' Usa git blame, git log y git show para investigar el error y entender por qué se escribió el código de esta manera.",
    "archaeology.level1.story.realWorldContext":
        "Las habilidades de arqueología de código son esenciales para mantener bases de código grandes y de larga vida con múltiples contribuidores a lo largo del tiempo.",
    "archaeology.level1.story.taskIntroduction":
        "Aprende a investigar el historial de código y rastrear el origen de los errores usando las herramientas forenses de Git.",

    "archaeology.level2.name": "Forense de Commits con Git Log",
    "archaeology.level2.description": "Dominar técnicas avanzadas para investigar historiales de código complejos",
    "archaeology.level2.objective1": "Usar filtrado avanzado de logs para encontrar cambios específicos",
    "archaeology.level2.objective2": "Rastrear cambios de nombre y movimientos de archivos",
    "archaeology.level2.objective3": "Encontrar commits por cambios de contenido",
    "archaeology.level2.objective4": "Analizar patrones y tendencias de commits",
    "archaeology.level2.hint1": "Usa --grep para buscar en los mensajes de commit",
    "archaeology.level2.hint2": "Usa -S para encontrar cuándo se añadió/eliminó texto específico",
    "archaeology.level2.hint3": "Usa --follow para rastrear archivos a través de renombres",
    "archaeology.level2.hint4": "Combina filtros para búsquedas más potentes",
    "archaeology.level2.requirement1.description": "Encontrar todos los commits relacionados con seguridad",
    "archaeology.level2.requirement1.success": "¡Commits relacionados con seguridad encontrados!",
    "archaeology.level2.requirement2.description": "Encontrar commits que añadieron o eliminaron el texto 'password'",
    "archaeology.level2.requirement2.success": "¡Cambios relacionados con contraseñas rastreados!",
    "archaeology.level2.requirement3.description": "Encontrar todos los commits de Sarah para entender sus contribuciones",
    "archaeology.level2.requirement3.success": "¡Historial de contribuciones de Sarah analizado!",
    "archaeology.level2.story.title": "El Rastro de Auditoría de Seguridad",
    "archaeology.level2.story.narrative":
        "Tu empresa recibió una auditoría de seguridad. Los auditores quieren un historial completo de todos los cambios relacionados con la seguridad: autenticación, manejo de contraseñas, cifrado. La base de código tiene 2.847 commits durante 3 años. Tu responsable de seguridad explica las capacidades de búsqueda de Git: --grep para mensajes, -S para contenido de código, --author para contribuidores. Crea un rastro de auditoría completo usando técnicas avanzadas de git log.",
    "archaeology.level2.story.realWorldContext":
        "Las técnicas avanzadas de git log son esenciales para auditorías de seguridad, revisiones de código y para entender historiales de proyectos complejos.",
    "archaeology.level2.story.taskIntroduction":
        "Domina las técnicas avanzadas de git log para la investigación exhaustiva del historial de código y el análisis forense.",

    "archaeology.level3.name": "Git Reflog - La Máquina del Tiempo",
    "archaeology.level3.description": "Usar Git reflog para recuperar commits perdidos y entender los cambios de estado del repositorio",
    "archaeology.level3.objective1": "Entender qué rastrea el reflog",
    "archaeology.level3.objective2": "Recuperar commits eliminados accidentalmente",
    "archaeology.level3.objective3": "Encontrar referencias de ramas perdidas",
    "archaeology.level3.objective4": "Restaurar estados anteriores del repositorio",
    "archaeology.level3.hint1": "El reflog rastrea todos los movimientos de HEAD",
    "archaeology.level3.hint2": "Usa git reflog para ver las acciones recientes",
    "archaeology.level3.hint3": "git reset --hard puede usar referencias del reflog",
    "archaeology.level3.hint4": "Las entradas del reflog caducan después de 90 días por defecto",
    "archaeology.level3.requirement1.description": "Comprobar el reflog para ver los movimientos recientes de HEAD",
    "archaeology.level3.requirement1.success": "¡Historial del reflog examinado!",
    "archaeology.level3.requirement2.description": "Restablecer a un estado anterior usando la referencia del reflog",
    "archaeology.level3.requirement2.success": "¡Estado del repositorio restaurado!",
    "archaeology.level3.requirement3.description": "Crear una rama de recuperación a partir de una entrada del reflog",
    "archaeology.level3.requirement3.success": "¡Rama de recuperación creada!",
    "archaeology.level3.story.title": "La Gran Recuperación del Desastre de Git",
    "archaeology.level3.story.narrative":
        "Son las 16:30 del viernes. Tu compañero Jake entra en pánico: '¡Ejecuté git reset --hard accidentalmente y perdí dos semanas de trabajo! ¡El sistema de autenticación, los componentes de interfaz, las pruebas: todo se fue!' Pero recuerdas: Git nunca olvida. Git reflog rastrea cada commit, cambio de rama, fusión y reset. Incluso los commits 'eliminados' existen en el reflog durante 90 días. Tu misión: examina el reflog, encuentra los commits perdidos y recupera el trabajo de Jake. ¡Es el momento de ser el héroe!",
    "archaeology.level3.story.realWorldContext":
        "Git reflog es una potente herramienta de recuperación que puede salvar a los desarrolladores de escenarios catastróficos de pérdida de datos.",
    "archaeology.level3.story.taskIntroduction":
        "Domina Git reflog para convertirte en el héroe que puede recuperar el trabajo 'perdido' y salvar el día a tus compañeros.",

    // Intro Level 4
    "intro.level4.name": "Inspeccionar Cambios",
    "intro.level4.description": "Ver exactamente qué cambió en tus archivos",
    "intro.level4.objective1": "Averiguar qué archivos han sido modificados",
    "intro.level4.objective2": "Inspeccionar los cambios exactos línea por línea",
    "intro.level4.hint1": "Usa `git status` para ver qué archivos han sido modificados",
    "intro.level4.hint2": "Usa `git diff` para ver los cambios exactos dentro de esos archivos",
    "intro.level4.hint3": "También puedes ejecutar `git diff <archivo>` para inspeccionar un solo archivo",
    "intro.level4.requirement1.description": "Comprobar qué archivos han sido modificados",
    "intro.level4.requirement1.success": "¡Bien! `git status` muestra que src/config.js ha sido modificado.",
    "intro.level4.requirement2.description": "Mostrar los cambios exactos con git diff",
    "intro.level4.requirement2.success":
        "¡Excelente! Ahora puedes ver exactamente qué líneas cambiaron antes de que nada sea confirmado.",
    "intro.level4.story.title": "El Cambio Misterioso",
    "intro.level4.story.narrative":
        'Lunes por la mañana en TechStart. Alex se acerca a tu escritorio con cara de preocupación.\n\n"Antes de irse el viernes, Sarah cambió algo en la configuración del sitio web, pero está de vacaciones y hoy lanzamos. Necesito saber exactamente qué cambió."\n\nExplica: "`git status` solo te dice QUÉ archivos cambiaron. Para ver QUÉ cambió dentro de ellos, usamos `git diff`. Compara tus archivos de trabajo con el último commit y muestra cada línea añadida y eliminada."\n\n"Primero comprueba el estado del repositorio, luego inspecciona el cambio con `git diff`. Las líneas que empiezan con + fueron añadidas, las que empiezan con - fueron eliminadas."',
    "intro.level4.story.realWorldContext":
        "Los desarrolladores ejecutan `git diff` muchas veces al día, especialmente justo antes de hacer un commit. Revisar tus propios cambios primero es como evitas que banderas de depuración, código de prueba sobrante y secretos acaben en el historial del proyecto.",
    "intro.level4.story.taskIntroduction":
        "Usa `git status` para encontrar el archivo modificado, luego `git diff` para ver exactamente qué cambió.",

    // Files Level 4
    "files.level4.name": "Renombrar Archivos",
    "files.level4.description": "Renombrar un archivo con Git y conservar su historial",
    "files.level4.objective1": "Renombrar src/app-config.js a src/config.js usando git mv",
    "files.level4.objective2": "Confirmar el cambio de nombre con un mensaje descriptivo",
    "files.level4.hint1": "Usa el comando `git mv <nombre-antiguo> <nombre-nuevo>`",
    "files.level4.hint2": "`git mv` renombra el archivo y prepara el cambio en un solo paso",
    "files.level4.hint3": "Termina con `git commit -m 'Tu mensaje'` para registrar el cambio de nombre",
    "files.level4.requirement1.description": "Renombrar el archivo usando git mv",
    "files.level4.requirement1.success": "¡Genial! Git ha renombrado el archivo y ya ha preparado el cambio por ti.",
    "files.level4.requirement2.description": "Confirmar el cambio de nombre con un mensaje",
    "files.level4.requirement2.success": "¡Perfecto! El cambio de nombre ya forma parte del historial del proyecto.",
    "files.level4.story.title": "Un Código Organizado",
    "files.level4.story.narrative":
        '"Una cosa más antes de la revisión de código," dice Alex, señalando tu árbol de archivos. "Acordamos nombres de archivo cortos y consistentes en el equipo. app-config.js debería llamarse simplemente config.js."\n\nAñade: "¡No lo renombres desde tu explorador de archivos! Usa `git mv` en su lugar: renombra el archivo y prepara el cambio en un solo paso, para que Git conserve el historial del archivo."',
    "files.level4.story.realWorldContext":
        "Renombrar archivos ocurre constantemente a medida que los proyectos crecen y evolucionan las convenciones de nombres. Con `git mv`, Git registra el cambio de nombre de forma limpia en lugar de ver una eliminación sin relación y un archivo completamente nuevo.",
    "files.level4.story.taskIntroduction":
        "Renombra src/app-config.js a src/config.js con `git mv` y luego confirma el cambio.",

    // Branches Level 6
    "branches.level6.name": "Limpieza de Ramas",
    "branches.level6.description": "Eliminar ramas fusionadas y abandonadas para mantener el repositorio ordenado",
    "branches.level6.objective1": "Eliminar la rama fusionada feature/search-filters",
    "branches.level6.objective2": "Forzar la eliminación de la rama abandonada experiment/new-ui",
    "branches.level6.hint1": "Ejecuta `git branch` para ver qué ramas todavía existen",
    "branches.level6.hint2":
        "Usa `git branch -d feature/search-filters`: la -d minúscula solo elimina ramas que están completamente fusionadas",
    "branches.level6.hint3":
        "Git rechaza eliminar ramas sin fusionar con -d. Usa `git branch -D experiment/new-ui` para forzar la eliminación",
    "branches.level6.requirement1.description": "Eliminar la rama fusionada feature/search-filters usando git branch -d",
    "branches.level6.requirement1.success":
        "¡Bien hecho! Git permitió la eliminación porque todo lo de feature/search-filters ya está en main.",
    "branches.level6.requirement2.description":
        "Forzar la eliminación de la rama abandonada experiment/new-ui usando git branch -D",
    "branches.level6.requirement2.success":
        "¡Perfecto! Con -D descartaste el experimento sin fusionar: tu lista de ramas está limpia de nuevo.",
    "branches.level6.story.title": "Limpieza de Primavera en el Repositorio",
    "branches.level6.story.narrative":
        '"Nuestra lista de ramas se está llenando," dice Alex, desplazándose por el repositorio. "Los filtros de búsqueda de feature/search-filters se fusionaron en main hace semanas, y experiment/new-ui era un prototipo que decidimos no usar."\n\nExplica: "Usa `git branch -d` para la rama fusionada: la -d minúscula es segura porque Git verifica que nada se pierde. Para el experimento, Git se negará, ya que sus commits nunca se fusionaron. Para eso sirve la -D mayúscula: elimina la rama incluso con trabajo sin fusionar, así que úsala solo cuando estés seguro."',
    "branches.level6.story.realWorldContext":
        "En proyectos reales, docenas de ramas obsoletas se acumulan con el tiempo. Eliminar las ramas fusionadas regularmente mantiene el repositorio fácil de navegar. La -d minúscula es el valor predeterminado seguro porque Git protege los commits sin fusionar, mientras que -D descarta conscientemente el trabajo; los commits a menudo todavía se pueden recuperar a través del reflog, pero nunca debes confiar en eso.",
    "branches.level6.story.taskIntroduction":
        "Primero elimina la rama fusionada feature/search-filters con `git branch -d`, luego fuerza la eliminación de la rama abandonada experiment/new-ui con `git branch -D`.",

    // Merge Level 4
    "merge.level4.name": "Resolver Conflictos de Fusión",
    "merge.level4.description": "Resolver un conflicto de fusión a mano y completar la fusión",
    "merge.level4.objective1": "Comprobar con git status qué archivo tiene conflicto",
    "merge.level4.objective2": "Editar src/api.js, eliminar los marcadores de conflicto y preparar el archivo resuelto",
    "merge.level4.objective3": "Completar la fusión con un commit",
    "merge.level4.hint1": "Empieza con `git status` para ver qué archivos tienen conflicto",
    "merge.level4.hint2":
        "Abre `src/api.js` y elimina los marcadores de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`) — conserva el código que el equipo necesita, luego prepara el archivo con `git add .`",
    "merge.level4.hint3": "Termina la fusión con `git commit -m 'Resolver conflicto de fusión'`",
    "merge.level4.requirement1.description": "Inspeccionar el conflicto con git status",
    "merge.level4.requirement1.success": "¡Bien! Ahora sabes exactamente qué archivo necesita tu atención: src/api.js.",
    "merge.level4.requirement2.description": "Preparar el archivo resuelto",
    "merge.level4.requirement2.success": "¡Genial! El archivo resuelto está preparado, sin marcadores de conflicto.",
    "merge.level4.requirement3.description": "Confirmar para completar la fusión",
    "merge.level4.requirement3.success": "¡Sobresaliente! Has resuelto tu primer conflicto de fusión como un profesional.",
    "merge.level4.story.title": "Sin Más Huidas",
    "merge.level4.story.narrative":
        '"¿Recuerdas la fusión que abortamos?", pregunta Sarah con una sonrisa. "El limitador de tasa tiene que entrar en producción hoy: esta vez resolvemos el conflicto en lugar de retroceder."\n\nSeñala tu pantalla: "Git marcó el conflicto justo dentro del archivo. Todo lo que está entre <<<<<<< HEAD y ======= es nuestra versión de main, todo lo que está debajo hasta >>>>>>> viene de feature/rate-limit. Tu trabajo: edita el archivo, conserva lo que necesitamos, elimina los marcadores. Luego `git add` y `git commit`: así es como terminas una fusión."',
    "merge.level4.story.realWorldContext":
        "Resolver conflictos es el día a día en el desarrollo en equipo. Los pasos son siempre los mismos: 1) abre el archivo en conflicto, 2) decide qué código sobrevive (a menudo una combinación de ambos), 3) elimina los marcadores, 4) prepara el archivo y confirma. Los editores modernos resaltan los marcadores por ti, pero por debajo es exactamente este flujo de trabajo.",
    "merge.level4.story.taskIntroduction":
        "Una fusión de feature/rate-limit en main se detuvo con un conflicto en src/api.js. Comprueba el estado, resuelve el conflicto en el archivo, luego prepáralo y completa la fusión con un commit.",

    // Rebase Level 5
    "rebase.level5.name": "Rebase sin Cambiar de Rama",
    "rebase.level5.description":
        "Aprender la forma de dos argumentos de git rebase para hacer rebase de una rama sin cambiar a ella primero",
    "rebase.level5.objective1":
        "Hacer rebase de la rama feature/payment-api sobre main usando la forma de dos argumentos de git rebase",
    "rebase.level5.hint1":
        "Puedes pasar dos argumentos: `git rebase <upstream> <rama>`: Git hace checkout de `<rama>` y le hace rebase sobre `<upstream>` en un solo paso",
    "rebase.level5.hint2": "Prueba `git rebase main feature/payment-api`: no es necesario cambiar de rama primero",
    "rebase.level5.requirement1.description": "Hacer rebase de feature/payment-api sobre main con la forma de dos argumentos",
    "rebase.level5.requirement1.success":
        "¡Brillante! Has hecho rebase de feature/payment-api sobre main con un solo comando: sin cambios de rama necesarios.",
    "rebase.level5.story.title": "Un Comando, Dos Argumentos",
    "rebase.level5.story.narrative":
        '"Lanzamos la versión de pagos esta noche," dice Alex, mirando el tablero. "Estás en main comprobando la versión, y la rama feature/payment-api se ha quedado atrás de nuevo."\n\nSonríe: "Aquí hay un truco que la mayoría desconoce: git rebase acepta un segundo argumento. En lugar de cambiar de rama primero, dile directamente al comando qué rama hacer rebase: comprueba la rama y la vuelve a reproducir sobre main de una sola vez."',
    "rebase.level5.story.realWorldContext":
        "La forma de dos argumentos git rebase <upstream> <rama> es un atajo útil en el trabajo diario: hace checkout de <rama> y le hace rebase sobre <upstream> en un solo paso. Ahorra un checkout extra y mantiene el ritmo en los días de lanzamiento ocupados.",
    "rebase.level5.story.taskIntroduction":
        "Estás en main. Haz rebase de feature/payment-api sobre main con un solo comando: git rebase main feature/payment-api",

    // Remote Level 4
    "remote.level4.name": "Seguimiento Upstream con -u",
    "remote.level4.description": "Configura el upstream una vez y luego haz push sin argumentos",
    "remote.level4.objective1": "Publicar la rama login-form con seguimiento upstream",
    "remote.level4.objective2": "Confirmar los mensajes de error mejorados",
    "remote.level4.objective3": "Hacer push de nuevo, esta vez sin argumentos",
    "remote.level4.hint1":
        "Publica la rama primero: `git push -u origin login-form`. El indicador `-u` vincula tu rama local con la rama remota.",
    "remote.level4.hint2":
        "Luego prepara y confirma el pulido: `git add .` seguido de `git commit -m 'Mejorar mensajes de error del login'`",
    "remote.level4.hint3": "Como el upstream está configurado, un simple `git push` es suficiente ahora: sin remoto, sin nombre de rama.",
    "remote.level4.requirement1.description": "Publicar la rama login-form con `git push -u origin login-form`",
    "remote.level4.requirement1.success":
        "¡Rama publicada! Git ahora recuerda que login-form rastrea origin/login-form.",
    "remote.level4.requirement2.description": "Confirmar los mensajes de error mejorados en src/login.js",
    "remote.level4.requirement2.success": "¡Genial! Tu pulido está confirmado localmente: a un paso del equipo.",
    "remote.level4.requirement3.description": "Subir tu nuevo commit con un simple `git push`",
    "remote.level4.requirement3.success":
        "¡Perfecto! Un simple `git push` fue suficiente: eso es el poder del seguimiento upstream.",
    "remote.level4.story.title": "Configúralo Una Vez, Haz Push Siempre",
    "remote.level4.story.narrative":
        '"¡El formulario de login se ve fantástico!" dice Alex, acercando su silla a tu escritorio en TechStart. "Publica tu rama `login-form` para que el equipo pueda empezar la revisión. Y hazme un favor: súbela con `-u`. Ese indicador configura el upstream: Git recuerda a qué rama remota pertenece tu rama local."\n\nSonríe: "Todavía veo una mejora sin confirmar en `src/login.js`, los mensajes de error más amigables. Publica la rama primero, luego confirma el pulido y vuelve a hacer push. Fíjate bien: la segunda vez, un simple `git push` es todo lo que necesitas. Sin remoto, sin nombre de rama: Git ya sabe adónde va."',
    "remote.level4.story.realWorldContext":
        "El primer push de una nueva rama es casi siempre `git push -u origin <rama>`. Una vez configurado el upstream, `git push` y `git pull` funcionan sin argumentos, y `git status` puede decirte cuántos commits llevas de ventaja o de retraso respecto al remoto. Sin un upstream, Git te detiene con el famoso error: 'La rama actual no tiene una rama upstream.'",
    "remote.level4.story.taskIntroduction":
        "Publica la rama con `git push -u origin login-form`, luego confirma los mensajes de error mejorados y súbelos con un simple `git push`.",

    // Workflow Level 4
    "workflow.level4.name": "El Commit Perfecto: Amend",
    "workflow.level4.description": "Corrige tu último commit con git commit --amend antes de que nadie vea el error",
    "workflow.level4.objective1": "Preparar el archivo de configuración olvidado",
    "workflow.level4.objective2": "Modificar tu último commit para incluir el archivo y corregir el mensaje",
    "workflow.level4.objective3": "Subir el commit corregido al remoto",
    "workflow.level4.hint1":
        "Ejecuta `git status`: el /src/config.js actualizado nunca fue preparado, así que tu commit de corrección está incompleto.",
    "workflow.level4.hint2": "Prepara el archivo faltante con `git add src/config.js` (o `git add .`).",
    "workflow.level4.hint3":
        "Usa `git commit --amend -m 'Corregir tiempo de espera del login'` para incorporar el archivo preparado a tu último commit Y corregir la errata del mensaje.",
    "workflow.level4.hint4":
        "Modificar es seguro aquí porque el commit nunca fue subido. Termina con `git push origin main`. ¡Nunca modifiques commits que ya han sido subidos!",
    "workflow.level4.requirement1.description": "Preparar el archivo de configuración olvidado",
    "workflow.level4.requirement1.success": "¡Archivo preparado! Ahora se puede incorporar al commit anterior.",
    "workflow.level4.requirement2.description": "Modificar el último commit con 'git commit --amend'",
    "workflow.level4.requirement2.success":
        "¡Commit modificado! Un error, un commit limpio, incluyendo el archivo de configuración y un mensaje sin erratas.",
    "workflow.level4.requirement3.description": "Subir el commit corregido con 'git push origin main'",
    "workflow.level4.requirement3.success":
        "¡Subido! Nadie sabrá nunca de la errata: tu historial parece que lo hiciste bien a la primera.",
    "workflow.level4.story.title": "El Commit Casi Perfecto",
    "workflow.level4.story.narrative":
        'Son las 16:55 del viernes en TechStart. Acabas de confirmar la corrección del error de tiempo de espera del login y ya estás cogiendo la chaqueta cuando el líder de equipo Alex acerca su silla a tu escritorio.\n\n"Espera, mira tu último commit," dice Alex, señalando la pantalla.\n\n`git log` muestra el mensaje de tu commit: **"Corregir timout del login"**. Ay, una errata. Y `git status` revela algo peor: `src/config.js`, el archivo que en realidad aumenta el tiempo de espera de la sesión a 30 minutos, nunca fue preparado. Tu commit de "corrección" contiene solo la mitad de la corrección.\n\n"No te paniques," sonríe Alex. "Todavía no has hecho push. Eso significa que podemos reescribir el último commit como si el error nunca hubiera ocurrido."\n\n**¿Qué hace `git commit --amend`?**\nREEMPLAZA tu último commit con una versión corregida:\n- Todo lo que está actualmente preparado se añade al commit\n- Con `-m` puedes escribir un nuevo mensaje de commit\n- El commit antiguo se descarta: el historial queda limpio\n\n**El plan de rescate:**\n1. Prepara el archivo olvidado: `git add src/config.js`\n2. Reescribe el commit: `git commit --amend -m "Corregir tiempo de espera del login"`\n3. Envíalo: `git push origin main`\n\n**La regla de oro:** Solo modifica commits que NO han sido subidos. Modificar reescribe el historial: si los compañeros ya han descargado el commit antiguo, crearás caos en cada clon. ¿Local y sin subir? Modifica sin problema.',
    "workflow.level4.story.realWorldContext":
        "Olvidar un archivo o cometer una errata en un mensaje de commit le pasa a todo desarrollador, cada semana. `git commit --amend` es la herramienta cotidiana que mantiene el historial limpio: un cambio lógico, un commit pulido. Los equipos profesionales siguen una regla de hierro: nunca modifiques un commit que ya ha sido subido, porque reescribir el historial compartido rompe los repositorios de tus compañeros.",
    "workflow.level4.story.taskIntroduction":
        "Rescata tu último commit: prepara el archivo de configuración olvidado, modifica el commit con un mensaje corregido, luego sube un historial tan limpio que nadie sabrá nunca lo que pasó.",

    // Reset Level 4
    "reset.level4.name": "Deshacer de Forma Segura con Revert",
    "reset.level4.description": "Deshacer un commit público sin reescribir el historial",
    "reset.level4.objective1": "Inspeccionar el historial para encontrar el commit malo",
    "reset.level4.objective2": "Deshacer el último commit de forma segura con revert",
    "reset.level4.hint1": "Usa `git log --oneline` para ver un historial compacto",
    "reset.level4.hint2": "`git revert HEAD` crea un nuevo commit que deshace el último",
    "reset.level4.hint3": "A diferencia de `git reset`, revert nunca reescribe el historial que los compañeros ya han descargado",
    "reset.level4.requirement1.description": "Mostrar el historial de commits compacto",
    "reset.level4.requirement1.success": "Ahí está: 'Corrección rápida sin revisión' es el commit malo en la cima.",
    "reset.level4.requirement2.description": "Revertir el último commit",
    "reset.level4.requirement2.success": "¡Perfecto! Un nuevo commit de reversión deshace el cambio: el historial queda intacto.",
    "reset.level4.story.title": "La Corrección que Rompió los Reembolsos",
    "reset.level4.story.narrative":
        "¡Alerta roja! Alguien subió una 'corrección rápida' directamente a main sin revisión, y rompe el flujo de reembolsos.\n\nAlex se acerca corriendo: \"No podemos usar `git reset` aquí. El commit ya es público y todo el equipo lo ha descargado. Si reescribimos el historial ahora, el repositorio de todos se rompe.\n\nEsto es exactamente para lo que sirve `git revert`: crea un NUEVO commit que deshace el malo. El historial permanece intacto y todos siguen sincronizados.\"",
    "reset.level4.story.realWorldContext":
        "En las ramas compartidas, los equipos profesionales casi siempre usan revert en lugar de reset. Reescribir el historial público causa caos para todos los que ya lo han descargado.",
    "reset.level4.story.taskIntroduction":
        "Comprueba el historial con `git log --oneline`, luego deshace el commit malo con `git revert HEAD`.",

    // Stash Level 4
    "stash.level4.name": "Conserva tu Copia de Seguridad: Stash Apply",
    "stash.level4.description": "Aplicar el trabajo guardado en stash conservando el stash como copia de seguridad",
    "stash.level4.objective1": "Guardar en stash tu experimento arriesgado",
    "stash.level4.objective2": "Recuperar el trabajo con apply (conservando el stash)",
    "stash.level4.objective3": "Confirmar el experimento una vez que confíes en él",
    "stash.level4.hint1": "`git stash` guarda tus cambios y te da un directorio de trabajo limpio",
    "stash.level4.hint2":
        "`git stash apply` restaura los cambios pero conserva una copia en el stash, a diferencia de `git stash pop`",
    "stash.level4.hint3": 'Después de preparar con `git add`, confirma con `git commit -m "mensaje"`',
    "stash.level4.requirement1.description": "Guardar tus cambios actuales en stash",
    "stash.level4.requirement1.success": "Experimento guardado de forma segura: tu directorio de trabajo está limpio.",
    "stash.level4.requirement2.description": "Aplicar el stash sin eliminarlo",
    "stash.level4.requirement2.success": "¡Trabajo restaurado, y el stash todavía tiene tu copia de seguridad!",
    "stash.level4.requirement3.description": "Confirmar el experimento",
    "stash.level4.requirement3.success": "¡Confirmado! La copia de seguridad del stash te salvó de perder el trabajo arriesgado.",
    "stash.level4.story.title": "El Experimento Arriesgado",
    "stash.level4.story.narrative":
        "Has estado experimentando con búsqueda difusa: prometedora, pero arriesgada.\n\nAlex sugiere: \"Antes de ir más lejos, guárdalo en stash. Pero aquí hay un movimiento pro: usa `git stash apply` en lugar de `pop` cuando lo recuperes. Apply restaura tus cambios pero CONSERVA la copia en el stash. Si tu siguiente paso sale mal, tu copia de seguridad todavía estará ahí.\"",
    "stash.level4.story.realWorldContext":
        "Los desarrolladores usan `apply` en lugar de `pop` cuando quieren una red de seguridad: la entrada del stash sobrevive como copia de seguridad hasta que la eliminan explícitamente.",
    "stash.level4.story.taskIntroduction":
        "Guarda el experimento en stash, recupéralo con `git stash apply` y luego confírmalo.",

    // Teamwork Level 4
    "teamwork.level4.name": "Revisa Antes de Enviar",
    "teamwork.level4.description": "Revisa tus propios cambios con git diff antes de confirmar",
    "teamwork.level4.objective1": "Revisar tus cambios sin preparar",
    "teamwork.level4.objective2": "Preparar los cambios revisados",
    "teamwork.level4.objective3": "Verificar doble qué está a punto de confirmarse",
    "teamwork.level4.objective4": "Confirmar los cambios revisados",
    "teamwork.level4.hint1": "`git diff` muestra los cambios en tu directorio de trabajo que todavía no están preparados",
    "teamwork.level4.hint2": "`git diff --staged` muestra exactamente qué irá al próximo commit",
    "teamwork.level4.hint3": "Revisa primero, luego `git add`, revisa de nuevo con `--staged`, luego confirma",
    "teamwork.level4.requirement1.description": "Mostrar tus cambios sin preparar",
    "teamwork.level4.requirement1.success": "¡Buen hábito! Revisaste el diff antes de preparar nada.",
    "teamwork.level4.requirement2.description": "Preparar los cambios",
    "teamwork.level4.requirement2.success": "Cambios preparados: listos para la comprobación final.",
    "teamwork.level4.requirement3.description": "Mostrar los cambios preparados",
    "teamwork.level4.requirement3.success": "Eso es exactamente lo que entrará en el commit. Sin sorpresas.",
    "teamwork.level4.requirement4.description": "Confirmar los cambios revisados",
    "teamwork.level4.requirement4.success": "¡Enviado con confianza: revisado dos veces, confirmado una!",
    "teamwork.level4.story.title": "El Hábito de la Autorrevisión",
    "teamwork.level4.story.narrative":
        'Tu compañera Sarah acaba de cometer un error: confirmó una línea de depuración por accidente y el revisor la detectó en el pull request. Vergonzoso.\n\nAlex comparte la regla de oro del equipo: "Revisa tu PROPIO diff antes de que nadie más lo vea. `git diff` muestra qué cambiaste, y después de preparar, `git diff --staged` muestra exactamente qué va al commit. Dos comprobaciones rápidas que detectan líneas de depuración sueltas, erratas y archivos olvidados."',
    "teamwork.level4.story.realWorldContext":
        "La autorrevisión de diffs antes de confirmar es uno de los hábitos de mayor impacto en los equipos profesionales: detecta errores antes de que lleguen a la revisión de código.",
    "teamwork.level4.story.taskIntroduction":
        "Revisa con `git diff`, prepara con `git add`, verifica con `git diff --staged`, luego confirma.",

    // Advanced Level 4
    "advanced.level4.name": "Caza de Errores con Bisect",
    "advanced.level4.description": "Encontrar el commit que rompió la aplicación usando búsqueda binaria",
    "advanced.level4.objective1": "Iniciar una sesión de bisect",
    "advanced.level4.objective2": "Marcar las versiones rota y funcional",
    "advanced.level4.objective3": "Terminar la sesión de bisect",
    "advanced.level4.hint1": "`git bisect start` inicia la búsqueda binaria a través de tu historial",
    "advanced.level4.hint2":
        "Marca el estado actual roto con `git bisect bad`, luego un commit conocido funcional con `git bisect good`",
    "advanced.level4.hint3": "Cuando hayas terminado, `git bisect reset` te devuelve a donde empezaste",
    "advanced.level4.requirement1.description": "Iniciar el bisect",
    "advanced.level4.requirement1.success": "Sesión de bisect iniciada: Git está listo para acotar al culpable.",
    "advanced.level4.requirement2.description": "Marcar el commit actual como malo",
    "advanced.level4.requirement2.success": "Versión actual marcada como rota.",
    "advanced.level4.requirement3.description": "Marcar un commit funcional como bueno",
    "advanced.level4.requirement3.success": "¡Git ahora conoce el rango bueno/malo y puede hacer búsqueda binaria entre ellos!",
    "advanced.level4.requirement4.description": "Terminar la sesión de bisect",
    "advanced.level4.requirement4.success": "¡Sesión cerrada: encontraste al culpable en tiempo logarítmico!",
    "advanced.level4.story.title": "La Aguja en el Pajar",
    "advanced.level4.story.narrative":
        'La búsqueda está rota en producción, pero funcionaba bien la semana pasada, y hay docenas de commits en medio.\n\nAlex sonríe: "Revisar cada commit manualmente llevaría horas. `git bisect` hace una búsqueda binaria: dile un commit malo y uno bueno, y verifica repetidamente el del medio hasta que localiza exactamente el commit que rompió las cosas. ¿Veinte commits? Solo unas cinco comprobaciones."',
    "advanced.level4.story.realWorldContext":
        "git bisect es la forma más rápida de encontrar regresiones en historiales grandes. Con 1000 commits, la búsqueda binaria necesita solo ~10 pasos para encontrar al culpable.",
    "advanced.level4.story.taskIntroduction":
        "Empieza con `git bisect start`, marca versiones con `bad` y `good`, luego termina con `git bisect reset`.",

    // Archaeology Level 4
    "archaeology.level4.name": "Rescate del Árbol de Trabajo",
    "archaeology.level4.description": "Deshacer cambios accidentales con git restore",
    "archaeology.level4.objective1": "Desprepara el cambio de configuración preparado accidentalmente",
    "archaeology.level4.objective2": "Descartar los cambios garbled en el archivo de notas",
    "archaeology.level4.hint1":
        "`git restore --staged config.js` mueve un archivo fuera del área de preparación sin perder sus cambios",
    "archaeology.level4.hint2":
        "`git restore notes.md` descarta los cambios del directorio de trabajo y devuelve la versión confirmada",
    "archaeology.level4.hint3": "Comprueba `git status` en cualquier momento para ver qué está preparado y qué está modificado",
    "archaeology.level4.requirement1.description": "Desprepara el archivo de configuración",
    "archaeology.level4.requirement1.success": "La URL local está fuera del área de preparación: crisis evitada.",
    "archaeology.level4.requirement2.description": "Restaurar el archivo de notas a su estado confirmado",
    "archaeology.level4.requirement2.success":
        "La obra maestra del gato ha desaparecido: tus notas volvieron a la versión confirmada.",
    "archaeology.level4.story.title": "El Incidente del Gato en el Teclado",
    "archaeology.level4.story.narrative":
        'El desastre golpea dos veces: primero preparaste accidentalmente un cambio de configuración que apunta la aplicación a localhost, que NO debe confirmarse. Luego tu gato caminó por el teclado y llenó de errores tus notas de sprint.\n\nAlex se ríe: "Le pasa a todo el mundo. `git restore --staged` saca un archivo del área de preparación, y el simple `git restore` descarta los cambios del directorio de trabajo y restaura la última versión confirmada. Dos rescates diferentes, un solo comando."',
    "archaeology.level4.story.realWorldContext":
        "git restore es el reemplazo moderno y más seguro de las antiguas recetas 'git checkout -- file' y 'git reset HEAD file' para desprepara y descartar cambios.",
    "archaeology.level4.story.taskIntroduction":
        "Desprepara config.js con `git restore --staged config.js`, luego descarta los cambios de notes.md con `git restore notes.md`.",

    // Mastery Level 4
    "mastery.level4.name": "El Lanzamiento Perfecto",
    "mastery.level4.description": "Corregir el último commit con --amend y etiquetar el lanzamiento",
    "mastery.level4.objective1": "Preparar las notas de lanzamiento olvidadas",
    "mastery.level4.objective2": "Modificar el commit de lanzamiento para incluirlas",
    "mastery.level4.objective3": "Etiquetar el lanzamiento pulido",
    "mastery.level4.hint1": "Prepara el archivo olvidado con `git add .`",
    "mastery.level4.hint2": '`git commit --amend -m "mensaje"` incorpora los cambios preparados al commit anterior',
    "mastery.level4.hint3": 'Crea una etiqueta anotada con `git tag -a v3.0.0 -m "Lanzamiento 3.0.0"`',
    "mastery.level4.requirement1.description": "Preparar las notas de lanzamiento",
    "mastery.level4.requirement1.success": "Notas de lanzamiento preparadas: listas para unirse al commit de lanzamiento.",
    "mastery.level4.requirement2.description": "Modificar el commit anterior",
    "mastery.level4.requirement2.success": "El commit de lanzamiento ahora incluye las notas, como si nunca las hubieras olvidado.",
    "mastery.level4.requirement3.description": "Crear una etiqueta de lanzamiento anotada",
    "mastery.level4.requirement3.success": "¡v3.0.0 etiquetado: un lanzamiento impecable. ¡Realmente has dominado Git!",
    "mastery.level4.story.title": "Un Commit para Gobernar el Lanzamiento",
    "mastery.level4.story.narrative":
        "¡Día de lanzamiento! Confirmaste 'Preparar lanzamiento v3.0.0', y luego ves el archivo de notas de lanzamiento, sin preparar y olvidado. Un segundo commit 'ups, olvidé las notas' quedaría feo en los libros de historia.\n\nAlex asiente aprobatoriamente: \"Como el commit todavía no se ha subido, usa `git commit --amend`. Incorpora tus cambios preparados al commit anterior como si siempre hubieran estado allí. Luego corónalo con una etiqueta anotada.\"",
    "mastery.level4.story.realWorldContext":
        "Modificar commits sin subir mantiene el historial limpio e intencional. Combinado con etiquetas anotadas, así es como los profesionales hacen lanzamientos ordenados y bien documentados.",
    "mastery.level4.story.taskIntroduction":
        "Prepara las notas con `git add .`, incorpóralas con `git commit --amend`, luego etiqueta con `git tag -a`.",
};

export default levels;
