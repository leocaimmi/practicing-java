import type { Question } from '../../types'

const SOURCE = 'Clase 7 — La clase Object'

export const unit07: Question[] = [
  {
    id: 'u07-q01',
    unitId: 7,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Todas las clases de Java heredan, directa o indirectamente, de la clase Object.',
    answer: true,
    explanation:
      'Object es la clase padre de todas las clases. De ahí que métodos como equals(), hashCode(), toString() y getClass() estén disponibles en cualquier clase.',
    source: SOURCE,
    tags: ['Object'],
  },
  {
    id: 'u07-q02',
    unitId: 7,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'El método getClass() puede sobrescribirse para devolver un nombre de clase personalizado.',
    answer: false,
    explanation:
      'getClass() es un método final, de modo que no puede sobreescribirse. Devuelve una representación en tiempo de ejecución de la clase del objeto.',
    source: SOURCE,
    tags: ['getClass', 'final'],
  },
  {
    id: 'u07-q03',
    unitId: 7,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Siempre que se sobrescribe el método equals() debe sobrescribirse también hashCode().',
    answer: true,
    explanation:
      'El material lo plantea como regla: siempre se debe hacer Override de hashCode cuando se hace Override de equals. Si dos objetos son iguales según equals, deben tener el mismo código hash, o se rompe el funcionamiento de HashSet y HashMap.',
    source: SOURCE,
    tags: ['equals', 'hashCode'],
  },
  {
    id: 'u07-q04',
    unitId: 7,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuál es la diferencia entre el operador == y el método equals()?',
    options: [
      '== compara si dos referencias apuntan al mismo objeto; equals() compara si dos objetos son del mismo tipo y contienen los mismos datos.',
      '== compara el contenido de los objetos; equals() compara las direcciones de memoria.',
      'Son equivalentes: equals() es simplemente la forma orientada a objetos de escribir ==.',
      '== sólo puede usarse con tipos primitivos; equals() sólo con arreglos.',
    ],
    correctIndex: 0,
    explanation:
      'El operador == solamente compara si dos referencias a objetos apuntan al mismo objeto. equals() se utiliza para saber si dos objetos separados son del mismo tipo y contienen los mismos datos.',
    source: SOURCE,
    tags: ['equals', 'Object'],
  },
  {
    id: 'u07-q05',
    unitId: 7,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `class Punto {
    int x;

    Punto(int x) {
        this.x = x;
    }
}

// En el main:
Punto a = new Punto(1);
Punto b = new Punto(1);
System.out.println(a.equals(b));`,
    options: [
      'false, porque Punto no sobrescribe equals() y se usa el de Object, que compara referencias.',
      'true, porque ambos objetos tienen el mismo valor en el atributo x.',
      'No compila, porque Punto no implementa la interfaz Comparable.',
      'Lanza NullPointerException, porque equals() no está definido.',
    ],
    correctIndex: 0,
    explanation:
      'Al no sobrescribirse, se hereda el equals() de Object, cuya implementación por omisión compara referencias. Como a y b son dos instancias distintas, devuelve false. Para comparar por contenido hay que sobrescribir equals() y hashCode().',
    source: SOURCE,
    tags: ['equals', 'Object'],
  },
  {
    id: 'u07-q06',
    unitId: 7,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `String a = new String("hola");
String b = new String("hola");
System.out.println(a == b);
System.out.println(a.equals(b));`,
    options: ['false y luego true', 'true y luego true', 'false y luego false', 'true y luego false'],
    correctIndex: 0,
    explanation:
      'Cada new crea un objeto distinto, así que las referencias no coinciden y == devuelve false. En cambio equals() está sobrescrito en String para comparar el contenido carácter por carácter, y ambas cadenas dicen lo mismo.',
    source: SOURCE,
    tags: ['equals', 'String'],
  },
  {
    id: 'u07-q07',
    unitId: 7,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál es el propósito del método toString()?',
    options: [
      'Obtener la representación en cadena de un objeto, habitualmente sobrescrita para que describa sus atributos.',
      'Convertir cualquier objeto en un arreglo de caracteres.',
      'Serializar el objeto para guardarlo en un archivo de texto.',
      'Comparar dos objetos y devolver la diferencia entre sus atributos como texto.',
    ],
    correctIndex: 0,
    explanation:
      'toString() es la manera de obtener la representación en cadena de un objeto. Como está definido en Object, todas las clases lo tienen, pero la implementación por omisión rara vez alcanza y conviene sobrescribirla.',
    source: SOURCE,
    tags: ['toString'],
  },
  {
    id: 'u07-q08',
    unitId: 7,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre al ejecutarlo?',
    code: `Object o = "una cadena";
Integer n = (Integer) o;`,
    options: [
      'Compila, pero en tiempo de ejecución lanza ClassCastException.',
      'No compila, porque un String nunca puede asignarse a una variable Object.',
      'Compila y ejecuta sin errores, dejando n en null.',
      'No compila, porque falta verificar con instanceof antes de castear.',
    ],
    correctIndex: 0,
    explanation:
      'El casteo desde Object es válido para el compilador, que no puede saber qué contiene la referencia. La verificación ocurre en tiempo de ejecución: como el objeto real es un String y no un Integer, la JVM lanza ClassCastException.',
    source: SOURCE,
    tags: ['Casting', 'ClassCastException'],
  },
  {
    id: 'u07-q09',
    unitId: 7,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Al sobrescribir equals() correctamente, ¿qué verificaciones conviene realizar?',
    options: [
      'Comprobar identidad con ==, descartar null, verificar compatibilidad de tipos, aplicar el casteo y recién ahí comparar los atributos.',
      'Comparar únicamente el valor de hashCode() de ambos objetos.',
      'Comparar el resultado de toString() de ambos objetos.',
      'Invocar super.equals() y devolver directamente su resultado.',
    ],
    correctIndex: 0,
    explanation:
      'El material describe esa secuencia: identidad (==), nulidad, compatibilidad de tipos con instanceof o getClass, downcasting y, finalmente, la comparación de los atributos clave.',
    source: SOURCE,
    tags: ['equals'],
  },
  {
    id: 'u07-q10',
    unitId: 7,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Para qué sirve el operador instanceof antes de aplicar un casteo?',
    options: [
      'Para verificar que el objeto sea compatible con el tipo de destino y evitar así una ClassCastException.',
      'Para convertir automáticamente el objeto al tipo indicado.',
      'Para comprobar si el objeto fue creado con el operador new.',
      'Para averiguar cuántas subclases tiene la clase del objeto.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo presenta como el casteo preventivo: primero se comprueba con instanceof y sólo si el objeto pertenece al tipo esperado se aplica la conversión de la referencia.',
    source: SOURCE,
    tags: ['instanceof', 'Casting'],
  },
  {
    id: 'u07-q11',
    unitId: 7,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      '¿Cuál es el problema de almacenar todo polimórficamente como Object, por ejemplo en un arreglo Object[]?',
    options: [
      'Los elementos pierden su tipo específico, de modo que sólo pueden invocarse los métodos declarados en Object hasta que se haga un casteo.',
      'Los objetos se copian al stack y dejan de poder modificarse.',
      'El arreglo deja de poder recorrerse con un for each.',
      'Object no tiene métodos, así que el arreglo queda inutilizable.',
    ],
    correctIndex: 0,
    explanation:
      'Como señala el material, el problema de tener todo polimórficamente como Object es que lo que se almacena pierde su verdadera esencia: por eso algunas invocaciones compilan y otras no, y hay que castear para recuperar el comportamiento propio de la clase.',
    source: SOURCE,
    tags: ['Object', 'Polimorfismo', 'Casting'],
  },
  {
    id: 'u07-q12',
    unitId: 7,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuáles son los cuatro métodos más importantes de la clase Object?',
    options: [
      'equals(), hashCode(), toString() y getClass().',
      'equals(), compareTo(), clone() y finalize().',
      'get(), set(), toString() y print().',
      'equals(), hashCode(), compareTo() y iterator().',
    ],
    correctIndex: 0,
    explanation:
      'Son los que enumera el material como disponibles en todas las clases de Java, porque todas heredan directa o indirectamente de Object.',
    source: SOURCE,
    tags: ['Object'],
  },
  {
    id: 'u07-q13',
    unitId: 7,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'La implementación por omisión de toString() suele ser suficiente para las clases que escribe el programador.',
    answer: false,
    explanation:
      'El material dice lo contrario: la implementación por omisión raramente alcanza, y para la mayoría de las clases creadas por el programador será deseable sobrescribirla para dar una representación en cadena que describa apropiadamente al objeto.',
    source: SOURCE,
    tags: ['toString'],
  },
  {
    id: 'u07-q14',
    unitId: 7,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué indica la anotación @Override sobre un método?',
    options: [
      'Que el método está sobrescribiendo uno definido en una clase superior.',
      'Que el método no puede volver a sobrescribirse en las subclases.',
      'Que el método se ejecuta antes que el constructor.',
      'Que el método pertenece a la clase y no a las instancias.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo señala al mostrar el equals sobrescrito en la clase Persona: la notación @Override indica que el método está siendo sobrescrito.',
    source: SOURCE,
    tags: ['Sobrescritura', 'Object'],
  },
  {
    id: 'u07-q15',
    unitId: 7,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `class Persona {
    private String nombre;

    public Persona(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Persona: " + nombre;
    }
}

// En el main:
Persona p = new Persona("Ana");
System.out.println(p);`,
    options: [
      'Persona: Ana',
      'La dirección de memoria del objeto.',
      'Ana',
      'No compila: println() no acepta un objeto Persona.',
    ],
    correctIndex: 0,
    explanation:
      'println() invoca internamente el toString() del objeto. Como la clase lo sobrescribe devolviendo un String que la describe, se imprime ese texto en lugar de la representación por omisión de Object.',
    source: SOURCE,
    tags: ['toString'],
  },
  {
    id: 'u07-q16',
    unitId: 7,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué establece el contrato entre equals() y hashCode()?',
    options: [
      'Si dos objetos son iguales según equals(), ambos deben generar el mismo hashCode().',
      'Si dos objetos tienen el mismo hashCode(), equals() debe devolver true obligatoriamente.',
      'hashCode() debe devolver siempre un valor distinto para cada objeto.',
      'equals() debe calcularse a partir del resultado de hashCode().',
    ],
    correctIndex: 0,
    explanation:
      'Ésa es la dirección del contrato. Romperla quiebra el funcionamiento de colecciones como HashSet y HashMap, que usan el código hash para ubicar los objetos antes de compararlos.',
    source: SOURCE,
    tags: ['equals', 'hashCode'],
  },
  {
    id: 'u07-q17',
    unitId: 7,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Para qué se utiliza el código hash que devuelve hashCode()?',
    options: [
      'Es un número entero que sirve para identificar y ubicar un objeto en una tabla hash.',
      'Es el identificador único que le asigna el sistema operativo al objeto.',
      'Es la cantidad de bytes que ocupa el objeto en el heap.',
      'Es el orden que tendrá el objeto al ordenar una colección.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo define como un código entero que se utiliza para identificar de manera única un objeto en una tabla hash, y es la base de la indexación en HashSet y HashMap.',
    source: SOURCE,
    tags: ['hashCode'],
  },
  {
    id: 'u07-q18',
    unitId: 7,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué devuelve el método getClass()?',
    options: [
      'Un objeto Class con información de la clase del objeto en tiempo de ejecución.',
      'El nombre de la clase como un String.',
      'Una copia del objeto con su tipo original.',
      'La superclase directa del objeto.',
    ],
    correctIndex: 0,
    explanation:
      'Devuelve una representación en tiempo de ejecución de la clase del objeto: un objeto Class al que se le puede pedir su nombre, el de su superclase y los de las interfaces que implementa. Además es final, así que no puede sobrescribirse.',
    source: SOURCE,
    tags: ['getClass'],
  },
  {
    id: 'u07-q19',
    unitId: 7,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `Object[] elementos = new Object[2];
elementos[0] = "una cadena";
elementos[1] = 42;

String texto = (String) elementos[0];
System.out.println(texto.toUpperCase());`,
    options: [
      'UNA CADENA',
      'una cadena',
      'Lanza ClassCastException.',
      'No compila: no se puede castear desde Object.',
    ],
    correctIndex: 0,
    explanation:
      'El casteo es válido porque el objeto guardado en esa posición es efectivamente un String. Recuperado su tipo, se puede invocar toUpperCase(). El problema de guardar todo como Object es justamente que hasta el casteo se pierde el acceso a los métodos propios de la clase.',
    source: SOURCE,
    tags: ['Casting', 'Object'],
  },
  {
    id: 'u07-q20',
    unitId: 7,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Las subclases pueden sobrescribir equals() para comparar objetos de un tipo definido por el programador.',
    answer: true,
    explanation:
      'Es lo que indica el material: las subclases pueden sobrescribir equals() para realizar la comparación adecuada entre dos objetos de un tipo definido por el programador, ya que la versión heredada de Object compara referencias.',
    source: SOURCE,
    tags: ['equals'],
  },
]
