import type { Question } from '../../types'

const SOURCE = 'Clase 13 — Manejo de errores. Excepciones'

export const unit13: Question[] = [
  {
    id: 'u13-q01',
    unitId: 13,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'En Java, las excepciones son objetos que encapsulan la información del error ocurrido.',
    answer: true,
    explanation:
      'El material las define como objetos que encapsulan la información del error y que convierten los errores que un método puede arrojar en una parte explícita de su contrato.',
    source: SOURCE,
    tags: ['Excepciones'],
  },
  {
    id: 'u13-q02',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuáles son las dos grandes ramas que nacen de la clase Throwable?',
    options: ['Error y Exception', 'Exception y RuntimeException', 'Checked y Unchecked', 'Error y Warning'],
    correctIndex: 0,
    explanation:
      'Todos los tipos de excepción deben extender de Throwable o de alguna de sus subclases. De Throwable nacen dos ramas: Error, para problemas irrecuperables del entorno de ejecución, y Exception, para los errores que sí deberíamos gestionar.',
    source: SOURCE,
    tags: ['Throwable', 'Jerarquía'],
  },
  {
    id: 'u13-q03',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a una excepción checked o comprobada?',
    options: [
      'Representa un error del que se puede recuperar y el compilador obliga a manejarla explícitamente, capturándola o relanzándola.',
      'Representa un error de programación y el compilador no exige capturarla.',
      'Es una excepción que sólo puede lanzarse desde el método main.',
      'Es aquella que deriva directamente de la clase Error.',
    ],
    correctIndex: 0,
    explanation:
      'Las checked representan errores de los que técnicamente podemos recuperarnos y suelen ser situaciones ajenas al propio código, como un fallo de lectura o escritura. El compilador obliga a manejarlas; si no, el código no compila.',
    source: SOURCE,
    tags: ['checked'],
  },
  {
    id: 'u13-q04',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a una excepción unchecked o no comprobada?',
    options: [
      'Representa un error de programación, no necesita declararse con throws y el compilador no exige capturarla.',
      'Representa un fallo del entorno de ejecución del que nunca se puede recuperar.',
      'Debe declararse obligatoriamente en la cláusula throws del método.',
      'Sólo puede capturarse dentro de un bloque finally.',
    ],
    correctIndex: 0,
    explanation:
      'Las unchecked representan errores de programación. No necesitan declararse mediante throws y el compilador no requiere que sean capturadas. Ejemplos típicos son ArrayIndexOutOfBoundsException, ArithmeticException y NullPointerException.',
    source: SOURCE,
    tags: ['unchecked'],
  },
  {
    id: 'u13-q05',
    unitId: 13,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué excepción lanza la última línea?',
    code: `int[] numerosPrimos = {1, 3, 5, 7, 9, 11, 13, 17, 19, 23};
System.out.println(numerosPrimos[10]);`,
    options: [
      'ArrayIndexOutOfBoundsException',
      'ArithmeticException',
      'NullPointerException',
      'NumberFormatException',
    ],
    correctIndex: 0,
    explanation:
      'El arreglo tiene 10 elementos, de las posiciones 0 a 9. Intentar leer la posición 10 excede el rango y lanza ArrayIndexOutOfBoundsException, una excepción unchecked que refleja un error de programación.',
    source: SOURCE,
    tags: ['unchecked', 'Arrays'],
  },
  {
    id: 'u13-q06',
    unitId: 13,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime por consola?',
    code: `try {
    int divisor = 0;
    System.out.println(10 / divisor);
} catch (ArithmeticException ae) {
    System.out.println("Error aritmetico");
} finally {
    System.out.println("Fin");
}`,
    options: [
      'Error aritmetico y luego Fin',
      'Solamente Error aritmetico',
      'Solamente Fin',
      '10, Error aritmetico y luego Fin',
    ],
    correctIndex: 0,
    explanation:
      'La división por cero lanza ArithmeticException, por lo que la ejecución del try se detiene y pasa al catch correspondiente. El bloque finally contiene código que se ejecuta siempre, se haya lanzado una excepción o no.',
    source: SOURCE,
    tags: ['try-catch', 'finally'],
  },
  {
    id: 'u13-q07',
    unitId: 13,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'El bloque finally se ejecuta únicamente cuando no se lanzó ninguna excepción.',
    answer: false,
    explanation:
      'El finally contiene código que debe ejecutarse después de los bloques try y catch, independientemente de si se lanzó una excepción o no. Suele usarse para liberar recursos, como cerrar archivos o conexiones.',
    source: SOURCE,
    tags: ['finally'],
  },
  {
    id: 'u13-q08',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál es la diferencia entre throw y throws?',
    options: [
      'throw es la expresión que lanza efectivamente una excepción; throws se escribe en la firma del método para declarar las excepciones checked que puede lanzar.',
      'throw se usa en la firma del método y throws dentro del cuerpo.',
      'Son sinónimos: throws es simplemente la forma plural de throw.',
      'throw captura la excepción y throws la propaga al método llamador.',
    ],
    correctIndex: 0,
    explanation:
      'throw es la expresión que lanza una excepción en el momento en que se detecta el error, y siempre lanza una instancia de un Throwable. throws va en la firma del método y avisa que en su cuerpo hay al menos una sentencia que lanza una excepción checked.',
    source: SOURCE,
    tags: ['throw', 'throws'],
  },
  {
    id: 'u13-q09',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué ocurre si una excepción no se captura en ningún nivel de la pila de llamadas?',
    options: [
      'Se propaga de método en método y, si llega al main sin ser captada, la ejecución termina.',
      'La JVM la ignora y el programa continúa normalmente.',
      'Se convierte automáticamente en un Error y se reintenta la operación.',
      'El compilador impide que el programa llegue a ejecutarse.',
    ],
    correctIndex: 0,
    explanation:
      'Si no existe un manejador, la excepción se propaga al método que invocó, y así sucesivamente. Si llega al main y tampoco es captada, la ejecución termina.',
    source: SOURCE,
    tags: ['Propagación'],
  },
  {
    id: 'u13-q10',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Al escribir varios bloques catch para un mismo try, ¿en qué orden conviene ubicarlos?',
    options: [
      'Las excepciones más específicas primero y las más generales después.',
      'Las más generales primero, para asegurarse de capturar todo.',
      'En orden alfabético según el nombre de la excepción.',
      'El orden es indistinto, porque Java elige el catch más adecuado automáticamente.',
    ],
    correctIndex: 0,
    explanation:
      'Entre las buenas prácticas, el material indica capturar las excepciones más específicas antes que las más generales. Las cláusulas catch se examinan en orden, así que una general ubicada primero interceptaría los casos particulares.',
    source: SOURCE,
    tags: ['try-catch', 'Buenas prácticas'],
  },
  {
    id: 'u13-q11',
    unitId: 13,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Las excepciones personalizadas que define el programador deben heredar de la clase Exception.',
    answer: true,
    explanation:
      'El material lo indica con el ejemplo public class MiExcepcion extends Exception. Además señala que, al crear excepciones personalizadas, extender Exception generalmente es suficiente.',
    source: SOURCE,
    tags: ['Excepciones propias'],
  },
  {
    id: 'u13-q12',
    unitId: 13,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Cuál de las siguientes es una mala práctica en el manejo de excepciones?',
    options: [
      'Usar excepciones para controlar el flujo del programa, por ejemplo en condicionales o iteraciones.',
      'Documentar las excepciones que puede lanzar un método.',
      'Cerrar los recursos en el bloque finally.',
      'Lanzar excepciones específicas en lugar de genéricas.',
    ],
    correctIndex: 0,
    explanation:
      'Usar excepciones para controlar el flujo es ineficiente y hace el código más difícil de leer y mantener: están diseñadas para manejar errores, no para dirigir la ejecución en condiciones normales. Las otras tres opciones figuran entre las buenas prácticas.',
    source: SOURCE,
    tags: ['Buenas prácticas'],
  },
  {
    id: 'u13-q13',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a la rama Error de la jerarquía Throwable?',
    options: [
      'Representa errores irrecuperables, de una magnitud tal que la aplicación nunca debería intentar hacer nada con ellos.',
      'Representa errores de programación que el compilador obliga a capturar.',
      'Representa situaciones ajenas al código de las que sí podemos recuperarnos.',
      'Es la rama de la que deben heredar las excepciones personalizadas.',
    ],
    correctIndex: 0,
    explanation:
      'Los Error se relacionan con problemas del entorno de ejecución, como quedarse sin memoria (OutOfMemoryError), fallas de la JVM o desbordamiento de buffer. Las excepciones personalizadas heredan de Exception, no de Error.',
    source: SOURCE,
    tags: ['Throwable', 'Jerarquía'],
  },
  {
    id: 'u13-q14',
    unitId: 13,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué excepción lanza?',
    code: `String valor = "hola";
int numero = Integer.parseInt(valor);`,
    options: [
      'NumberFormatException',
      'ArithmeticException',
      'ClassCastException',
      'Ninguna: numero queda en 0.',
    ],
    correctIndex: 0,
    explanation:
      'Es el caso que usa el material al mostrar múltiples catch: un valor no numérico lanza NumberFormatException al intentar convertirlo con parseInt.',
    source: SOURCE,
    tags: ['unchecked', 'NumberFormatException'],
  },
  {
    id: 'u13-q15',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué excepción se lanza al intentar manejar un objeto nulo?',
    options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'IllegalStateException', 'ClassNotFoundException'],
    correctIndex: 0,
    explanation:
      'El material la menciona entre los ejemplos de excepciones unchecked, junto con ArrayIndexOutOfBoundsException por salirse del rango de un arreglo y ArithmeticException por dividir por cero.',
    source: SOURCE,
    tags: ['unchecked', 'NullPointerException'],
  },
  {
    id: 'u13-q16',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué excepciones NO hace falta incluir en la cláusula throws de un método?',
    options: [
      'RuntimeException y Error.',
      'Todas las que hereden de Exception.',
      'Las excepciones personalizadas del programador.',
      'Las que puedan capturarse con un catch dentro del propio método.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo indica al describir throws: RuntimeException y Error son las únicas que no hace falta declarar. La cláusula sirve para avisar sobre las checked, que son las que el compilador exige manejar.',
    source: SOURCE,
    tags: ['throws', 'unchecked'],
  },
  {
    id: 'u13-q17',
    unitId: 13,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Las excepciones de tipo RuntimeException se propagan sin necesidad de declararlas en la cabecera de los métodos.',
    answer: true,
    explanation:
      'El material lo justifica con ejemplos: sería tedioso declarar en todos los métodos que se puede propagar una división entre cero o un índice fuera de rango, así que Java las propaga automáticamente sin exigir esa declaración.',
    source: SOURCE,
    tags: ['unchecked', 'RuntimeException'],
  },
  {
    id: 'u13-q18',
    unitId: 13,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `try {
    System.out.println("uno");
    int[] a = new int[2];
    a[5] = 10;
    System.out.println("dos");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("tres");
} finally {
    System.out.println("cuatro");
}`,
    options: [
      'uno, tres y cuatro',
      'uno, dos, tres y cuatro',
      'uno, dos y cuatro',
      'uno y tres solamente',
    ],
    correctIndex: 0,
    explanation:
      'Al lanzarse la excepción, la ejecución del try se detiene de inmediato: las acciones que estaban detrás del punto del error no tienen lugar, por eso "dos" nunca se imprime. Se pasa al catch correspondiente y por último al finally, que se ejecuta siempre.',
    source: SOURCE,
    tags: ['try-catch', 'finally', 'Transferencia de control'],
  },
  {
    id: 'u13-q19',
    unitId: 13,
    type: 'mc',
    difficulty: 'avanzado',
    prompt:
      'Si se invoca un método que declara una excepción checked en su cláusula throws, ¿qué NO es una opción válida?',
    options: [
      'Ignorarla sin capturarla ni declararla, y dejar que el programa compile igual.',
      'Encerrar la llamada en un bloque try-catch.',
      'Propagarla declarándola en la cláusula throws del método que invoca.',
      'Capturarla y relanzarla dentro del propio método.',
    ],
    correctIndex: 0,
    explanation:
      'Ésa es justamente la definición de checked: el compilador obliga a manejarlas explícitamente, capturándolas o relanzándolas para que quien invoque sí las capture. Si no se hace ninguna de las dos cosas, el código no compila.',
    source: SOURCE,
    tags: ['checked', 'throws'],
  },
  {
    id: 'u13-q20',
    unitId: 13,
    type: 'vf',
    difficulty: 'avanzado',
    prompt:
      'Un método redefinido puede declarar más excepciones checked en su cláusula throws que el método al que sobrescribe.',
    answer: false,
    explanation:
      'No se permite: el método redefinido no puede declarar más excepciones checked que las que declara el original. Sí puede lanzar subtipos de las declaradas, porque se capturan en el catch correspondiente a su supertipo.',
    source: SOURCE,
    tags: ['throws', 'Sobrescritura'],
  },
  {
    id: 'u13-q21',
    unitId: 13,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué hace la palabra reservada throw?',
    options: [
      'Lanza una instancia de una excepción en el momento en que se detecta el error.',
      'Declara en la firma del método las excepciones que puede elevar.',
      'Captura la excepción que se produjo dentro de un bloque try.',
      'Define un bloque de código que se ejecuta siempre al final.',
    ],
    correctIndex: 0,
    explanation:
      'throw es la expresión que lanza una excepción. Como las excepciones son objetos, hay que crear una instancia antes de lanzarla, y debe ser un Throwable, ya sea predefinido o personalizado. Si se lanza, no se regresa al flujo normal del programa.',
    source: SOURCE,
    tags: ['throw'],
  },
  {
    id: 'u13-q22',
    unitId: 13,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'El manejo de excepciones evita que se produzcan errores en el programa.',
    answer: false,
    explanation:
      'El material lo advierte textualmente: el manejo de errores usando excepciones no evita errores, sólo permite su detección y su posible reparación.',
    source: SOURCE,
    tags: ['Excepciones'],
  },
  {
    id: 'u13-q23',
    unitId: 13,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Para qué sirve el constructor de excepción que acepta una causa?',
    options: [
      'Para encadenar excepciones: lanzar una distinta sin perder el rastreo de la original.',
      'Para que la excepción se capture automáticamente en el nivel superior.',
      'Para definir el mensaje que verá el usuario final.',
      'Para convertir una excepción checked en unchecked.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo ubica entre las buenas prácticas: es útil para el encadenamiento de excepciones, donde un throwable es causado por otro, sobre todo cuando se captura una y se quiere lanzar una diferente sin perder el rastreo original.',
    source: SOURCE,
    tags: ['Buenas prácticas', 'Excepciones propias'],
  },
]
