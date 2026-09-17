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
]
