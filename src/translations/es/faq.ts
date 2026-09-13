const faq = {
    "faq.title": "Preguntas frecuentes sobre Git",
    "faq.subtitle": "Todo lo que necesitas saber sobre Git",
    "faq.intro":
        "Git es un sistema de control de versiones potente y ampliamente utilizado. Aquí encontrarás respuestas a las preguntas más comunes sobre Git, su propósito y cómo se usa en el desarrollo de software.",

    // Categorías
    "faq.categories.basics": "Fundamentos de Git",
    "faq.categories.concepts": "Conceptos clave",
    "faq.categories.usage": "Uso práctico",

    // Sección de fundamentos
    "faq.whatIsGit.question": "¿Qué es Git?",
    "faq.whatIsGit.answer":
        "Git es un sistema de control de versiones distribuido que registra los cambios en los archivos a lo largo del tiempo. Permite que varias personas colaboren en proyectos, mantengan un historial de cambios y reviertan a versiones anteriores cuando sea necesario. A diferencia de los sistemas de control de versiones centralizados, Git proporciona a cada desarrollador una copia completa del repositorio, lo que permite trabajar sin conexión y ofrece redundancia.",

    "faq.whyCreated.question": "¿Por qué se creó Git?",
    "faq.whyCreated.answer":
        "Git fue creado por Linus Torvalds en 2005 para el desarrollo del kernel de Linux. Torvalds necesitaba un sistema de control de versiones distribuido que fuera rápido, admitiera el desarrollo no lineal con miles de ramas paralelas y pudiera manejar proyectos grandes como el kernel de Linux de manera eficiente. Las herramientas disponibles en ese momento no satisfacían estos requisitos, por lo que desarrolló Git. El nombre 'git' es argot británico para 'persona desagradable', que Torvalds aplicó en broma al software (y a sí mismo).",

    "faq.vsOtherVcs.question": "¿En qué se diferencia Git de otros sistemas de control de versiones?",
    "faq.vsOtherVcs.answer":
        "Git se diferencia de sistemas más antiguos como SVN (Subversion) o CVS en varios aspectos clave:\n\n• Es distribuido en lugar de centralizado, lo que otorga a cada desarrollador una copia completa del repositorio\n• Está diseñado para el desarrollo no lineal con sólidas capacidades de ramificación y fusión\n• Es mucho más rápido, especialmente para operaciones como la creación de ramas y las fusiones\n• Utiliza un enfoque diferente para almacenar datos, enfocándose en instantáneas en lugar de diferencias de archivos\n• Tiene mejor integridad de datos gracias al uso de hashes SHA-1\n• Proporciona un soporte sólido para operaciones sin conexión",

    "faq.benefits.question": "¿Cuáles son los principales beneficios de usar Git?",
    "faq.benefits.answer":
        "Git ofrece numerosas ventajas para el desarrollo de software:\n\n• Velocidad y eficiencia, especialmente en proyectos grandes\n• Potentes capacidades de ramificación y fusión que apoyan el desarrollo no lineal\n• Naturaleza distribuida que proporciona redundancia y permite trabajar sin conexión\n• Sólido soporte para flujos de trabajo de desarrollo en paralelo\n• Excelente integridad de datos y seguimiento de cambios\n• Sólido ecosistema con herramientas y servicios de alojamiento como GitHub, GitLab y Bitbucket\n• Amplia adopción en la industria, lo que lo convierte en una habilidad valiosa para los desarrolladores\n• Software libre y de código abierto",

    "faq.gitVsGithub.question": "¿Cuál es la diferencia entre Git y GitHub?",
    "faq.gitVsGithub.answer":
        "Git es el sistema de control de versiones en sí mismo: la herramienta de software que instalas en tu computadora para rastrear cambios en tus archivos. GitHub, por otro lado, es un servicio de alojamiento web para repositorios Git. GitHub añade funcionalidades adicionales como solicitudes de incorporación de cambios (pull requests), seguimiento de problemas, revisiones de código y otras herramientas de colaboración. Servicios similares incluyen GitLab y Bitbucket. Piensa en Git como la herramienta y en GitHub como un servicio construido alrededor de esa herramienta para hacerla más fácil de usar y añadir funciones de colaboración.",

    // Sección de conceptos
    "faq.repositories.question": "¿Qué son los repositorios en Git?",
    "faq.repositories.answer":
        "Un repositorio (o 'repo') es la unidad fundamental en Git. Contiene todos los archivos de tu proyecto y el historial completo de los cambios realizados en ellos. Técnicamente, un repositorio Git es el directorio .git en tu proyecto, que almacena todos los metadatos y la base de datos de objetos del proyecto. Cuando clonas un repositorio, obtienes una copia de todo ese historial. Los repositorios pueden ser locales (en tu máquina) o remotos (en un servidor como GitHub).",

    "faq.commits.question": "¿Qué son los commits y por qué son importantes?",
    "faq.commits.answer":
        "Los commits son instantáneas de todo tu repositorio en momentos específicos. Cada commit tiene un identificador único (hash) e incluye información sobre qué cambió, quién hizo el cambio, cuándo y un mensaje que describe el cambio. Los commits son importantes porque:\n\n• Crean un historial del desarrollo de tu proyecto\n• Te permiten volver a estados anteriores de tu proyecto\n• Ayudan a identificar cuándo y por quién se introdujeron cambios específicos\n• Facilitan la colaboración al proporcionar puntos de referencia claros\n\nLos buenos mensajes de commit son fundamentales para entender el 'porqué' detrás de los cambios al revisar el código más adelante.",

    "faq.branches.question": "¿Qué son las ramas y cómo funcionan?",
    "faq.branches.answer":
        "Las ramas en Git son simplemente punteros móviles a commits. Permiten líneas de desarrollo en paralelo, de modo que diferentes funcionalidades o correcciones pueden trabajarse simultáneamente sin interferir entre sí. La rama predeterminada suele llamarse 'main' (anteriormente 'master').\n\nCuando creas una rama, básicamente estás creando un nuevo puntero al commit actual. A medida que realizas nuevos commits en esa rama, el puntero avanza automáticamente. Esto te permite cambiar fácilmente entre diferentes estados de tu proyecto y fusionar cambios de una rama a otra cuando estés listo.",

    "faq.merge.question": "¿Qué es la fusión y cómo ocurren los conflictos de fusión?",
    "faq.merge.answer":
        "La fusión (merge) es el proceso de combinar los cambios de una rama en otra. Por ejemplo, cuando una funcionalidad está completa en una rama de características, la fusionarías en la rama principal. Git maneja automáticamente la fusión cuando los cambios no se superponen.\n\nLos conflictos de fusión ocurren cuando la misma parte de un archivo ha sido modificada de manera diferente en las dos ramas que se están fusionando. Git no puede determinar automáticamente qué versión usar, por lo que marca el archivo como conflictivo y debe resolverse manualmente. Los marcadores de conflicto en el archivo muestran ambas versiones del código, y debes editar el archivo para crear la versión final antes de completar la fusión.",

    "faq.workflow.question": "¿Cuál es un flujo de trabajo típico en Git?",
    "faq.workflow.answer":
        "Un flujo de trabajo común en Git podría verse así:\n\n1. Crear una rama para una nueva funcionalidad o corrección de errores\n2. Realizar cambios y hacer commits en tu rama\n3. Subir tu rama al repositorio remoto\n4. Crear una solicitud de incorporación de cambios (en GitHub/GitLab) o solicitar una revisión de código\n5. Realizar cambios adicionales si se solicitan\n6. Fusionar la rama en la rama principal cuando sea aprobada\n7. Eliminar la rama de características una vez fusionada\n\nExisten varios modelos de flujo de trabajo establecidos como GitHub Flow, GitFlow y Trunk-Based Development, cada uno con su propio enfoque para ramas, lanzamientos y despliegues.",

    // Sección de uso
    "faq.whenUse.question": "¿Cuándo debería usar Git?",
    "faq.whenUse.answer":
        "Deberías usar Git prácticamente en cualquier proyecto donde necesites rastrear cambios a lo largo del tiempo, especialmente si involucra código. Esto incluye:\n\n• Proyectos de desarrollo de software de cualquier tamaño\n• Proyectos de documentación\n• Archivos de configuración\n• Proyectos de escritura como libros o artículos\n• Cualquier proyecto colaborativo donde varias personas necesiten trabajar en los mismos archivos\n\nIncluso para proyectos individuales, Git ofrece funcionalidades valiosas como el seguimiento del historial, la capacidad de experimentar con cambios de forma segura y capacidades de copia de seguridad.",

    "faq.smallProjects.question": "¿Es Git demasiado para proyectos pequeños?",
    "faq.smallProjects.answer":
        "Si bien Git tiene funcionalidades potentes diseñadas para manejar proyectos grandes y complejos, sigue siendo valioso para proyectos pequeños. Incluso para proyectos pequeños o personales, Git proporciona:\n\n• Una red de seguridad que te permite revertir cambios si algo se rompe\n• Un historial completo de tu trabajo\n• La capacidad de trabajar en múltiples funcionalidades simultáneamente usando ramas\n• Copia de seguridad sencilla del historial completo de tu proyecto en repositorios remotos\n• Potencial de colaboración en el futuro\n\nLa inversión inicial en aprender Git vale la pena incluso para proyectos pequeños con estos beneficios.",

    "faq.teamCollaboration.question": "¿Cómo ayuda Git a la colaboración en equipo?",
    "faq.teamCollaboration.answer":
        "Git mejora la colaboración en equipo de muchas maneras:\n\n• Varios desarrolladores pueden trabajar en el mismo proyecto simultáneamente sin sobrescribir el trabajo de los demás\n• Los cambios se rastrean claramente con información del autor y marcas de tiempo\n• Las ramas permiten trabajar por separado en diferentes funcionalidades sin interferencias\n• Las solicitudes de incorporación de cambios (en plataformas como GitHub) facilitan las revisiones de código\n• Los conflictos se identifican automáticamente cuando ocurren\n• El historial del proyecto proporciona responsabilidad y transparencia\n• Los repositorios remotos garantizan que todos tengan acceso al código más reciente\n• Las herramientas de seguimiento de problemas y gestión de proyectos se integran bien con los flujos de trabajo de Git",

    "faq.commandLine.question": "¿Tengo que usar la línea de comandos para Git?",
    "faq.commandLine.answer":
        "No, no es necesario usar la línea de comandos, aunque entender los comandos de Git puede ser útil. Existen muchas interfaces gráficas de usuario (GUI) disponibles para Git, entre ellas:\n\n• GitHub Desktop: una interfaz simple y fácil de usar\n• GitKraken: un potente cliente Git multiplataforma\n• Sourcetree: cliente Git con muchas funciones para Windows y Mac\n• Git Extensions: interfaz de usuario de código abierto para Windows\n• TortoiseGit: interfaz de shell de Windows para Git\n\nAdemás, la mayoría de los IDEs modernos como Visual Studio Code, IntelliJ IDEA y otros tienen integración Git incorporada, lo que te permite realizar operaciones comunes de Git directamente desde el editor.",

    "faq.hosting.question": "¿Dónde puedo alojar mis repositorios Git?",
    "faq.hosting.answer":
        "Existen varios servicios populares para alojar repositorios Git:\n\n• GitHub: la plataforma más popular, con muchas funciones de colaboración\n• GitLab: ofrece una plataforma DevOps completa con capacidades de CI/CD\n• Bitbucket: se integra bien con otros productos de Atlassian como Jira\n• Azure DevOps: la solución de Microsoft con amplia integración en su ecosistema\n• Opciones auto-alojadas: GitLab Community Edition o Gitea para alojar en tus propios servidores\n\nLa mayoría de estos servicios ofrecen niveles gratuitos para repositorios públicos y desarrolladores individuales, con planes de pago para repositorios privados y equipos.",

    // Llamada a la acción
    "faq.readyToStart.title": "¿Listo para empezar con Git?",
    "faq.readyToStart.text":
        "¡Ahora que entiendes los fundamentos de Git, estás listo para empezar a usarlo en tus proyectos!",
    "faq.readyToStart.installButton": "Instalar Git",
    "faq.readyToStart.practiceButton": "Practicar comandos de Git",
};

export default faq;
