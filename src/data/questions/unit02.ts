import type { Question } from '../../types'

const SOURCE = 'Clase 2 — Introducción a la POO. Clases y objetos'

export const unit02: Question[] = [
  {
    id: 'u02-q01',
    unitId: 2,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Un constructor debe declararse con tipo de retorno void.',
    answer: false,
    explanation:
      'Los constructores tienen el mismo nombre que la clase a la que pertenecen y no tienen tipo de retorno, ni siquiera void. Ésa es una de las diferencias que los distingue de un método común.',
    source: SOURCE,
    tags: ['Constructores'],
  },
  {
    id: 'u02-q02',
    unitId: 2,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Si una clase no define ningún constructor, Java le provee uno por defecto sin argumentos.',
    answer: true,
    explanation:
      'Así lo establece el material: si no se define un constructor en una clase, Java proporciona uno por defecto sin argumentos.',
    source: SOURCE,
    tags: ['Constructores'],
  },
  {
    id: 'u02-q03',
    unitId: 2,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuáles son los cuatro pilares de la Programación Orientada a Objetos?',
    options: [
      'Abstracción, encapsulamiento, herencia y polimorfismo.',
      'Cohesión, acoplamiento, herencia y modularidad.',
      'Clases, objetos, atributos y métodos.',
      'Compilación, ejecución, instanciación y destrucción.',
    ],
    correctIndex: 0,
    explanation:
      'El material presenta la POO como un paradigma sostenido por cuatro pilares: abstracción, encapsulamiento, herencia y polimorfismo. La cohesión y el acoplamiento son criterios de diseño, no pilares.',
    source: SOURCE,
    tags: ['POO'],
  },
  {
    id: 'u02-q04',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'En UML, ¿qué relación se representa con un diamante relleno del lado del contenedor e implica que la parte no puede existir sin el todo?',
    options: ['Composición', 'Agregación', 'Asociación', 'Dependencia'],
    correctIndex: 0,
    explanation:
      'La composición es similar a la agregación pero más fuerte: la parte no puede existir sin el todo, y se dibuja con el diamante relleno. En la agregación las partes pueden existir independientemente y el diamante es hueco.',
    source: SOURCE,
    tags: ['UML', 'Relaciones'],
  },
  {
    id: 'u02-q05',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Según el material, ¿qué se almacena en el Heap?',
    options: [
      'Los objetos que se crean; es la zona de memoria dinámica.',
      'Las instrucciones del programa y las constantes, sin posibilidad de modificarse en ejecución.',
      'Únicamente los tipos de datos primitivos.',
      'El código fuente antes de ser compilado a bytecode.',
    ],
    correctIndex: 0,
    explanation:
      'El material describe el Heap como la zona de memoria dinámica que almacena los objetos que se crean. Las instrucciones y constantes viven en la zona de datos.',
    source: SOURCE,
    tags: ['Heap y Stack', 'Memoria'],
  },
  {
    id: 'u02-q06',
    unitId: 2,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `public class Persona {
    private String nombre;

    public Persona(String nombre) {
        nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }
}

// En el main:
Persona p = new Persona("Ana");
System.out.println(p.getNombre());`,
    options: [
      'null, porque la asignación le da el valor del parámetro a sí mismo y el atributo nunca se inicializa.',
      'Ana, porque Java asocia automáticamente el parámetro con el atributo del mismo nombre.',
      'Una cadena vacía, porque los atributos String se inicializan en "".',
      'No compila, porque el parámetro no puede llamarse igual que el atributo.',
    ],
    correctIndex: 0,
    explanation:
      'Dentro del constructor, el nombre más cercano es el del parámetro, así que la línea le asigna el parámetro a sí mismo y el atributo queda en su valor por defecto: null. Para distinguir el atributo del parámetro hay que escribir this.nombre = nombre.',
    source: SOURCE,
    tags: ['this', 'Constructores'],
  },
  {
    id: 'u02-q07',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuándo puede el Garbage Collector liberar la memoria que ocupa un objeto?',
    options: [
      'Cuando desde el stack ninguna variable hace referencia a ese objeto.',
      'Cuando el programador invoca explícitamente el método delete() del objeto.',
      'Inmediatamente después de que termina de ejecutarse el método que lo creó, siempre.',
      'Cuando el objeto supera el tamaño máximo permitido en el heap.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo dice textualmente: un objeto podrá ser “limpiado” cuando desde el stack ninguna variable haga referencia al mismo. El programador no se ocupa de asignar ni liberar esa memoria.',
    source: SOURCE,
    tags: ['Garbage Collector'],
  },
  {
    id: 'u02-q08',
    unitId: 2,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué visibilidad otorga el modificador protected?',
    options: [
      'Es visible para las clases del mismo paquete y para las subclases.',
      'Es visible únicamente dentro de la propia clase.',
      'Es visible desde cualquier clase, sin restricciones.',
      'Es visible sólo para las clases del mismo paquete, pero no para las subclases.',
    ],
    correctIndex: 0,
    explanation:
      'Un método o atributo declarado protected es visible para las clases del mismo paquete y para las subclases. La visibilidad limitada al paquete, sin incluir subclases externas, corresponde a default.',
    source: SOURCE,
    tags: ['Modificadores de acceso'],
  },
  {
    id: 'u02-q09',
    unitId: 2,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `System.out.println(Math.max(3, 8));
System.out.println(Math.pow(2, 3));
System.out.println(Math.sqrt(16));`,
    options: ['8, 8.0 y 4.0', '8, 8 y 4', '3, 6.0 y 4.0', '8, 9.0 y 8.0'],
    correctIndex: 0,
    explanation:
      'Math.max() devuelve el mayor de dos números, y con dos int el resultado es el int 8. Math.pow() eleva un número a una potencia y Math.sqrt() calcula la raíz cuadrada: ambos devuelven double, de ahí 8.0 y 4.0.',
    source: SOURCE,
    tags: ['Math'],
  },
  {
    id: 'u02-q10',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Al diseñar clases a partir del análisis de un problema, ¿qué elemento del texto sugiere un método?',
    options: ['Los verbos', 'Los sustantivos', 'Los adjetivos', 'Los adverbios'],
    correctIndex: 0,
    explanation:
      'La guía de diseño del material asocia sustantivos con clases potenciales, verbos con métodos y adjetivos con atributos. Por ejemplo, “realizar un pedido” sugiere un método de la clase Pedido.',
    source: SOURCE,
    tags: ['Diseño de clases'],
  },
  {
    id: 'u02-q11',
    unitId: 2,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'En el diseño del código siempre se busca la mayor cohesión y el menor acoplamiento.',
    answer: true,
    explanation:
      'Un componente tiene alta cohesión cuando todos sus elementos están estrechamente relacionados, y bajo acoplamiento cuando es independiente del resto. El material plantea ambos como objetivo permanente de diseño.',
    source: SOURCE,
    tags: ['Cohesión', 'Acoplamiento'],
  },
  {
    id: 'u02-q12',
    unitId: 2,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué caracteriza a un método setter?',
    options: [
      'Se declara público, no retorna nada (es void) y permite modificar el valor de un atributo.',
      'Se declara privado y retorna el valor actual del atributo.',
      'Retorna siempre un boolean que indica si la modificación fue exitosa.',
      'Es un método estático que se invoca con el nombre de la clase.',
    ],
    correctIndex: 0,
    explanation:
      'Los setters y getters son métodos de acceso y por eso se declaran siempre públicos. El setter sirve para asignar un valor a un atributo de forma explícita y nunca retorna nada: siempre es void.',
    source: SOURCE,
    tags: ['Encapsulamiento', 'Getters y setters'],
  },
  {
    id: 'u02-q13',
    unitId: 2,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'La Programación Orientada a Objetos es un lenguaje de programación.',
    answer: false,
    explanation:
      'El material lo aclara de entrada: la POO NO es un lenguaje ni una IDE. Es una forma de ver las cosas, de entender un problema identificando las entidades principales que aparecen en él.',
    source: SOURCE,
    tags: ['POO'],
  },
  {
    id: 'u02-q14',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál de estas definiciones corresponde a la ABSTRACCIÓN?',
    options: [
      'Seleccionar las características relevantes de un conjunto, ignorando los detalles menos importantes, para definir nuevos tipos de entidades.',
      'Restringir el acceso directo a los componentes de una clase mediante modificadores de acceso.',
      'Que las clases se relacionen formando una jerarquía de clasificación y compartan comportamiento.',
      'Que un mismo método tenga el mismo nombre pero un comportamiento diferente según el objeto.',
    ],
    correctIndex: 0,
    explanation:
      'La abstracción permite trabajar con conceptos más generales e identificar comportamientos comunes. Es clave en el análisis y diseño orientado a objetos, porque con ella se llega al conjunto de clases que modela el problema.',
    source: SOURCE,
    tags: ['POO', 'Abstracción'],
  },
  {
    id: 'u02-q15',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál de estas definiciones corresponde al ENCAPSULAMIENTO?',
    options: [
      'Esconder los detalles de la puesta en práctica de un objeto y exponer sólo lo necesario para interactuar con él.',
      'Representar un objeto en su forma más esencial y general.',
      'Permitir que una subclase herede los atributos y métodos de una superclase.',
      'Decidir en tiempo de ejecución cuál de varios métodos con el mismo nombre se ejecuta.',
    ],
    correctIndex: 0,
    explanation:
      'El encapsulamiento localiza los datos y el comportamiento en el núcleo del objeto, y permite restringir el acceso directo con modificadores. Así se reduce la complejidad, aumenta la seguridad y los detalles internos pueden cambiar sin afectar al resto del programa.',
    source: SOURCE,
    tags: ['POO', 'Encapsulamiento'],
  },
  {
    id: 'u02-q16',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál de estas definiciones corresponde a la HERENCIA?',
    options: [
      'Que los objetos hereden las propiedades y el comportamiento de las clases a las que pertenecen, formando una jerarquía.',
      'Ocultar el estado de un objeto detrás de métodos públicos.',
      'Ignorar los detalles de implementación para quedarse con lo esencial.',
      'Que un método pueda recibir distintos tipos de parámetros.',
    ],
    correctIndex: 0,
    explanation:
      'Las clases no están aisladas: se relacionan formando una jerarquía de clasificación. La herencia permite definir objetos como tipos especializados de otros preexistentes, que comparten y extienden su comportamiento sin volver a implementarlo.',
    source: SOURCE,
    tags: ['POO', 'Herencia'],
  },
  {
    id: 'u02-q17',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál de estas definiciones corresponde al POLIMORFISMO?',
    options: [
      'Que un mismo método o acción pueda tener el mismo nombre pero un comportamiento diferente para el mismo o distintos objetos.',
      'Que una clase pueda tener varios atributos del mismo tipo.',
      'Que los atributos privados sólo sean accesibles desde la propia clase.',
      'Que las clases se agrupen en paquetes según su responsabilidad.',
    ],
    correctIndex: 0,
    explanation:
      'El material define el polimorfismo por el nombre compartido y el comportamiento distinto. Los métodos se diferencian por la cantidad y el tipo de parámetros de entrada, mientras que el nombre y el retorno se mantienen.',
    source: SOURCE,
    tags: ['POO', 'Polimorfismo'],
  },
  {
    id: 'u02-q18',
    unitId: 2,
    type: 'mc',
    difficulty: 'basico',
    prompt: 'En la notación de atributos de UML, ¿qué visibilidad representa el símbolo #?',
    options: ['protected', 'private', 'public', 'default'],
    correctIndex: 0,
    explanation:
      'La notación que usa el material es: + para public, - para private, # para protected y ~ para default.',
    source: SOURCE,
    tags: ['UML', 'Modificadores de acceso'],
  },
  {
    id: 'u02-q19',
    unitId: 2,
    type: 'mc',
    difficulty: 'basico',
    prompt: 'En la notación de atributos de UML, ¿qué visibilidad representa el símbolo -?',
    options: ['private', 'protected', 'public', 'default'],
    correctIndex: 0,
    explanation:
      'El guión corresponde a private. El + es public, el # es protected y el ~ es default.',
    source: SOURCE,
    tags: ['UML', 'Modificadores de acceso'],
  },
  {
    id: 'u02-q20',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué relación entre objetos se valida con la frase "usa un"?',
    options: ['Asociación', 'Composición', 'Herencia', 'Agregación'],
    correctIndex: 0,
    explanation:
      'La asociación es la relación por la cual dos objetos se unen para trabajar juntos, y es la más común. Se valida con "usa un" y se dibuja con una línea simple. La agregación y la composición usan "tiene un", y la herencia "es un".',
    source: SOURCE,
    tags: ['UML', 'Relaciones'],
  },
  {
    id: 'u02-q21',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      '¿Qué relación se dibuja con una línea punteada terminada en una flecha hacia la clase de la que se depende?',
    options: ['Dependencia', 'Asociación', 'Agregación', 'Herencia'],
    correctIndex: 0,
    explanation:
      'La dependencia se da cuando una clase necesita de otra de manera temporal o para un propósito específico. Se identifica preguntando si una clase "necesita" a otra para realizar una acción.',
    source: SOURCE,
    tags: ['UML', 'Relaciones'],
  },
  {
    id: 'u02-q22',
    unitId: 2,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'En una relación de agregación, la clase contenida puede existir de manera independiente.',
    answer: true,
    explanation:
      'Ésa es justamente la diferencia con la composición: en la agregación las partes pueden existir independientemente y el diamante se dibuja hueco, mientras que en la composición la parte no puede existir sin el todo y el diamante va relleno.',
    source: SOURCE,
    tags: ['UML', 'Relaciones'],
  },
  {
    id: 'u02-q23',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Según el material, ¿qué se almacena en la zona de datos que maneja la JVM?',
    options: [
      'Las instrucciones del programa, las clases con sus métodos y las constantes; no se puede modificar en tiempo de ejecución.',
      'Los objetos creados con el operador new.',
      'Únicamente las variables locales de cada método.',
      'Los objetos que el Garbage Collector marcó para eliminar.',
    ],
    correctIndex: 0,
    explanation:
      'El material distingue tres zonas: la de datos con las instrucciones, clases y constantes; el Stack, cuyo tamaño se define en compilación; y el Heap, la zona de memoria dinámica donde se almacenan los objetos que se crean.',
    source: SOURCE,
    tags: ['Memoria', 'Heap y Stack'],
  },
  {
    id: 'u02-q24',
    unitId: 2,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `public class Punto {
    private int x;
    private int y;

    public Punto() {
        this.x = 0;
        this.y = 0;
    }

    public Punto(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }
}

// En el main:
Punto p = new Punto();
System.out.println(p.getX());`,
    options: [
      '0, porque se invoca el constructor sin parámetros.',
      'No compila: una clase no puede tener dos constructores.',
      'null, porque el constructor sin parámetros no inicializa nada.',
      'Un valor indefinido, distinto en cada ejecución.',
    ],
    correctIndex: 0,
    explanation:
      'Es una sobrecarga de constructores: dos constructores con el mismo nombre y distinta lista de parámetros. Como se invoca con new Punto() sin argumentos, se ejecuta el primero, que deja ambos atributos en 0.',
    source: SOURCE,
    tags: ['Constructores', 'Sobrecarga'],
  },
  {
    id: 'u02-q25',
    unitId: 2,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué devuelve Math.random()?',
    options: [
      'Un número aleatorio entre 0 y 1.',
      'Un entero aleatorio entre 1 y 100.',
      'Un entero aleatorio dentro del rango que se le pase por parámetro.',
      'Un booleano aleatorio.',
    ],
    correctIndex: 0,
    explanation:
      'El material la presenta así: Math.random() devuelve un número aleatorio entre 0 y 1. Para llevarlo a otro rango hay que multiplicarlo y ajustarlo.',
    source: SOURCE,
    tags: ['Math'],
  },
  {
    id: 'u02-q26',
    unitId: 2,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Al analizar el enunciado de un problema, ¿qué elemento del texto sugiere un atributo?',
    options: ['Los adjetivos', 'Los sustantivos', 'Los verbos', 'Los pronombres'],
    correctIndex: 0,
    explanation:
      'La guía del material asocia sustantivos con clases, verbos con métodos y adjetivos con atributos. El ejemplo que da es "pedido urgente": el adjetivo sugiere que la clase Pedido podría tener un atributo que indique la urgencia.',
    source: SOURCE,
    tags: ['Diseño de clases'],
  },
  {
    id: 'u02-q27',
    unitId: 2,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Todos los sustantivos que aparecen en el análisis de un problema deben convertirse en clases.',
    answer: false,
    explanation:
      'El material advierte lo contrario: no todos los sustantivos son clases. Algunos se representan mejor como atributos de otras clases, y no toda entidad mencionada necesita modelarse como clase en el diseño final.',
    source: SOURCE,
    tags: ['Diseño de clases'],
  },
  {
    id: 'u02-q28',
    unitId: 2,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué es el estado de un objeto?',
    options: [
      'El valor que tienen sus atributos en un momento dado.',
      'La cantidad de métodos que la clase define.',
      'La posición de memoria donde fue creado.',
      'El nombre de la clase de la que es instancia.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo ejemplifica con tres objetos Lapiz que comparten la clase pero difieren en el color: el estado es el valor que toman los atributos de cada objeto.',
    source: SOURCE,
    tags: ['POO', 'Objetos'],
  },
]
