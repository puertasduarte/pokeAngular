# PokeAngular
### Miembros del equipo:
  - Jorge Domínguez
  - Rubén Martín
  - Jesus Puertas
  - Eduardo Vela

### Aplicación desplegada:
**Link:** https://jordoe.github.io/PokeAngular/

**Guía para desplegar en GitHub Pages:**
  - Subir la aplicación en su última versión al respositorio de GitHub
  - ng build --prod --base-href https://nombre-usuario.github.io/nombre-repositorio/
  - npx ngh --dir=dist/poke-angular/


### Organización del equipo
La organización del equipo se ha hecho en base a la metodología ágil SCRUM, pero dada la peculiaridad del proyecto, solo hemos adoptado algunas de las propuestas:
  - Realización de pequeñas *dailies* a primera hora de la mañana, donde comentabamos cada uno que estabamos haciendo, y que teniamos pensado hacer durante el día
  - Uso de un *Trello* estilo *kanban* para organizar el trabajo
    (enlace : https://trello.com/b/k84iFUnT/pokedex-project)
    El tablero consta de cuatro columnas: Backlog, To-Do, Doing y Done. A medida que iban surgiendo nuevas tareas, se añadían al backlog y, una vez asignadas a un desarrollador, se pasaban a to-do. Cuando se empezaba la tarea, pasaba a doing, donde permanecía hasta estar terminada.

### Organización del proyecto
Para organizar el proyecto se han utilizado las siguientes herramientas:
  - **GITHUB**: (https://github.com/jordoe/PokeAngular/commits/develop) : Debido a que inicialmente no se nos proporcionó ningún entorno para trabajar de forma colaborativa, decidimos utilizar github, ya que teníamos algo de experiencia trabajando con él.
  - **GITLAB**: Posteriormente, se nos proporcionó un gitlab interno del departamento, pero debido al avanzado estado del proyecto en ese momento se decidió esperar a tener la funcionalidad básica hasta ese momento terminada antes de subir nada a gitlab.
  - **GitFlow**: Como metodologia de trabajo con git se nos solicitó utilizar gitflow. Para ello, decidimos sacar una rama de master: develop, y de ella se fueron sacando ramas en base a la tarea que se iba a realizar. Una vez completada la tarea en cuestión, se procedía a subir la tarea a develop realizando para ello un merge con develop.

### Funcionalidades y forma de la aplicación
La aplicación consiste en una página web con un componente *pokedex* que permite navegar por una lista de pokémon, filtrando sus elementos por nombre y/o tipo. Para cada uno de ellos, se permite acceder a sus detalles y su localización, y cambiar al tipo *shiny* del pokémon en cuestión. La estructura de la aplicación consiste en cinco componentes y dos servicios:
- **Componente pokedex**: Componente padre que contiene la lista de pokémon, y accede al servicio *pokedex*
- **Componente pokedex-list**: Componente hijo principal. Contiene la pantalla principal donde se muestra la lista de pokémon y el pokémon seleccionado
- **Componente pokedex-detail**: Componente que muestra los detalles del pokémon seleccionado
- **Componente pokedex-map**: Componente que muestra la localización del pokémon seleccionado
- **Componente nav**: Componente que contiene el navegador mostrado en la parte superior de la página
- **Servicio map**: Servicio que recibe información de la API de mapas *leaflet*
- **Servicio pokedex**: Servicio que recibe información de la API *pokeapi*

### Etapas del proyecto
El proyecto se ha dividido en tres *sprints*:
  - **Primer Sprint**: Tras organizar el sprint, lo primero fue realizar un boceto del diseño que tendría la aplicación y crear el proyecto de Angular. Durante el resto del sprint, todos los componentes de la aplicación fueron creados siguiendo el diseño bocetado. Se desarrollaron los servicios de map y pokedex.
  - **Segundo Sprint**: En el segundo sprint se añadió routing para la navegación entre componentes, y el pipe para filtrar la lista de pokémon por tipo y/o búsqueda de nombre. Además, se hizo la aplicación responsive para todos los dispositivos móvil y tablet. También se añadió una barra superior de navegación. Finalmente, se migró el proyecto desde GitHub a GitLab.
  - **Tercer Sprint**: En el tercer sprint, los bugs menores fueron solucionados, y se refactorizaron los archivos para conseguir un código más limpio y óptimo.
  - **Cuarto Sprint**: En el cuarto sprint, se rediseñó el estilo visual de la aplicación, para que fuera más consistente, y se refactorizaron los componentes para mejorar el código tras el feedback recibido. Además, se añadieron nuevas funcionalidades: dentro del componente detalles, se añadieron los *stats* de cada pokémon, así como su cadena de evolución, los movimientos que puede aprender y el tamaño comparado con un humano. También fué creado un componente compartido: el modal. Finalmente, se solucionaron los bugs existentes y se desplegó en GitHub Pages.

### Modelo Responsive
Como se ha mencionado, la aplicación es responsive: se adapta a pantallas de escritorio, de móvil y de tablet. Debido a la estructura y las funcionalidades del proyecto, se ha optado por un modelo *mobile first*.