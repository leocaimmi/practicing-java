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
]
