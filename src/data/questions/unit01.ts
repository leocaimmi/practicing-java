import type { Question } from '../../types'

const SOURCE = 'Clase 1 — Introducción a Java, variables y operadores'

export const unit01: Question[] = [
  {
    id: 'u01-q01',
    unitId: 1,
    type: 'vf',
    difficulty: 'basico',
    prompt:
      'El bytecode que genera el compilador de Java es código 100 % binario, listo para que el procesador lo ejecute directamente.',
    answer: false,
    explanation:
      'El material lo define como un lenguaje intermedio que no es 100 % binario: está a mitad de camino entre el código fuente y la máquina. Quien lo ejecuta es la JVM, no el procesador en forma directa.',
    source: SOURCE,
    tags: ['Bytecode', 'JVM'],
  },
  {
    id: 'u01-q02',
    unitId: 1,
    type: 'vf',
    difficulty: 'basico',
    prompt:
      'El nombre de una variable en Java puede comenzar con un dígito, siempre que los caracteres siguientes sean letras.',
    answer: false,
    explanation:
      'La primera regla de nomenclatura establece que el nombre siempre debe comenzar con una letra. Recién los caracteres subsiguientes pueden ser letras, dígitos, “$” o “_”.',
    source: SOURCE,
    tags: ['Variables', 'Nomenclatura'],
  },
  {
    id: 'u01-q03',
    unitId: 1,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuál fue el objetivo que persiguió Gosling al diseñar Java?',
    options: [
      'Que el lenguaje fuera independiente de la plataforma, con un entorno de ejecución propio llamado JVM.',
      'Que el código compilado fuera específico de cada sistema operativo, para ganar velocidad.',
      'Reemplazar por completo al lenguaje C en el desarrollo de sistemas operativos.',
      'Que el lenguaje se interpretara línea por línea, sin etapa de compilación.',
    ],
    correctIndex: 0,
    explanation:
      'El material resume la idea como “escribilo una vez, ejecutalo donde quieras”: un lenguaje independiente del sistema operativo, con un entorno de ejecución llamado JVM (máquina virtual de Java).',
    source: SOURCE,
    tags: ['JVM', 'Historia'],
  },
  {
    id: 'u01-q04',
    unitId: 1,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Para qué sirven las clases de envoltorio (wrapper) en Java?',
    options: [
      'Dan mayor funcionalidad a los tipos primitivos, aportando métodos de comprobación y conversión.',
      'Permiten que un tipo primitivo ocupe menos memoria que su versión original.',
      'Reemplazan a los tipos primitivos, que quedaron obsoletos en las versiones actuales del lenguaje.',
      'Se usan exclusivamente para declarar constantes dentro de una interfaz.',
    ],
    correctIndex: 0,
    explanation:
      'Java define una clase wrapper para cada tipo primitivo. Su razón de ser es aportar métodos para operaciones de comprobación y conversión, como intValue(), doubleValue() o parseInt().',
    source: SOURCE,
    tags: ['Wrappers'],
  },
  {
    id: 'u01-q05',
    unitId: 1,
    type: 'mc',
    difficulty: 'basico',
    prompt:
      '¿Qué método de la clase Integer se utiliza para convertir la cadena "2147483647" en un valor de tipo int?',
    options: ['Integer.parseInt("2147483647")', 'Integer.toString("2147483647")', 'Integer.intValue("2147483647")', 'Integer.valueOf().parse("2147483647")'],
    correctIndex: 0,
    explanation:
      'El material presenta parseInt() como el método que castea una cadena a int: int k = Integer.parseInt("2147483647"). En cambio toString() hace el camino inverso e intValue() opera sobre una instancia de Integer.',
    source: SOURCE,
    tags: ['Wrappers', 'Casteo'],
  },
  {
    id: 'u01-q06',
    unitId: 1,
    type: 'code',
    difficulty: 'basico',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int b = 5;
int a = (b > 3) ? 2 : 7;
System.out.println(a);`,
    options: ['2', '7', 'true', 'No compila: el operador ternario requiere una sentencia if previa.'],
    correctIndex: 0,
    explanation:
      'El operador ternario es la versión abreviada de un if-else: si la condición se cumple devuelve el primer valor y, en caso contrario, el segundo. Como 5 > 3 es verdadero, a recibe 2.',
    source: SOURCE,
    tags: ['Operador ternario'],
  },
  {
    id: 'u01-q07',
    unitId: 1,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int x = 7;
int y = 2;
System.out.println(x / y);
System.out.println(x % y);`,
    options: ['3 y luego 1', '3.5 y luego 1', '3 y luego 3.5', '4 y luego 1'],
    correctIndex: 0,
    explanation:
      'Los operadores aritméticos funcionan igual que en C. Al dividir dos enteros, el resultado también es entero y se descarta la parte decimal: 7 / 2 da 3. El operador % devuelve el resto de esa división, que es 1.',
    source: SOURCE,
    tags: ['Operadores aritméticos'],
  },
  {
    id: 'u01-q08',
    unitId: 1,
    type: 'code',
    difficulty: 'basico',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `boolean a = true;
boolean b = false;
System.out.println(a && b);
System.out.println(a || b);
System.out.println(!b);`,
    options: ['false, true, true', 'true, true, false', 'false, false, true', 'true, false, true'],
    correctIndex: 0,
    explanation:
      'Según la tabla de verdad del material: la conjunción (&&) sólo da verdadero si ambos operandos lo son, por lo que devuelve false; la disyunción (||) da verdadero con que uno lo sea, por lo que devuelve true; y la negación (!) invierte false a true.',
    source: SOURCE,
    tags: ['Operadores lógicos'],
  },
  {
    id: 'u01-q09',
    unitId: 1,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a una variable local?',
    options: [
      'Es visible únicamente dentro del método donde fue declarada y no puede accederse desde el resto de las clases.',
      'Existe una única copia compartida por todas las instancias de la clase.',
      'Toma valores únicos para cada instancia del objeto.',
      'Es la que se pasa entre métodos al invocarlos.',
    ],
    correctIndex: 0,
    explanation:
      'La clasificación del material distingue variables de instancia, de clase, parámetros y locales. La local se determina por su ubicación: es local al método, sólo visible allí e inaccesible desde el resto de las clases.',
    source: SOURCE,
    tags: ['Scope'],
  },
  {
    id: 'u01-q10',
    unitId: 1,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'El método nextInt() de la clase Scanner consume el carácter de salto de línea que queda en el buffer después de leer el número.',
    answer: false,
    explanation:
      'Justamente no lo consume, y ése es el problema que advierte el material. Por eso conviene invocar nextLine() inmediatamente después, para consumir ese salto de línea y evitar el falso efecto de que la lectura siguiente se “salteó”.',
    source: SOURCE,
    tags: ['Scanner'],
  },
  {
    id: 'u01-q11',
    unitId: 1,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué hace el método close() de la clase Scanner?',
    options: [
      'Cierra la fuente de entrada asociada al objeto y libera los recursos que tenía tomados.',
      'Descarta el último dato leído para poder volver a leerlo.',
      'Vacía el buffer de entrada, pero mantiene la fuente abierta.',
      'Finaliza la ejecución del programa una vez leídos todos los datos.',
    ],
    correctIndex: 0,
    explanation:
      'El material define close() como el método que cierra la fuente de entrada asociada con el objeto Scanner y libera cualquier recurso asociado.',
    source: SOURCE,
    tags: ['Scanner'],
  },
  {
    id: 'u01-q12',
    unitId: 1,
    type: 'vf',
    difficulty: 'basico',
    prompt:
      'Una variable declarada con el modificador static tiene exactamente una copia, compartida por todas las instancias de la clase.',
    answer: true,
    explanation:
      'Ésa es precisamente la definición de variable de clase: se declara con static para indicarle al compilador que hay exactamente una copia de la variable, compartida por todas las instancias.',
    source: SOURCE,
    tags: ['static', 'Variables de clase'],
  },
  {
    id: 'u01-q13',
    unitId: 1,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Java es un lenguaje de programación de bajo nivel.',
    answer: false,
    explanation:
      'El material lo ubica expresamente entre los lenguajes de ALTO NIVEL. Los de bajo nivel son los cercanos al lenguaje de máquina.',
    source: SOURCE,
    tags: ['JVM', 'Conceptos'],
  },
  {
    id: 'u01-q14',
    unitId: 1,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `System.out.println(1 + 2 + "3");`,
    options: ['33', '123', '6', 'No compila: no se puede sumar un número con una cadena.'],
    correctIndex: 0,
    explanation:
      'El operador + se evalúa de izquierda a derecha. Primero suma los dos enteros y da 3; recién ahí encuentra una cadena y concatena, con lo que resulta "33".',
    source: SOURCE,
    tags: ['Operadores', 'Concatenación'],
  },
  {
    id: 'u01-q15',
    unitId: 1,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int x = 2;
System.out.println("valor: " + x + 3);`,
    options: ['valor: 23', 'valor: 5', 'valor: 2 3', 'No compila.'],
    correctIndex: 0,
    explanation:
      'Como la expresión arranca con una cadena, todo lo que sigue se concatena de izquierda a derecha: primero se pega el 2 y después el 3. Para que sumara habría que escribir (x + 3) entre paréntesis.',
    source: SOURCE,
    tags: ['Operadores', 'Concatenación'],
  },
  {
    id: 'u01-q16',
    unitId: 1,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int a = 5;
int b = a++ + 2;
System.out.println(a + " " + b);`,
    options: ['6 7', '6 8', '5 7', '5 8'],
    correctIndex: 0,
    explanation:
      'El incremento posterior (a++) devuelve el valor que tenía la variable y recién después la incrementa. Entonces b recibe 5 + 2 = 7, y a queda en 6.',
    source: SOURCE,
    tags: ['Operadores', 'Incremento'],
  },
  {
    id: 'u01-q17',
    unitId: 1,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int a = 5;
int b = ++a + 2;
System.out.println(a + " " + b);`,
    options: ['6 8', '6 7', '5 7', '5 8'],
    correctIndex: 0,
    explanation:
      'El incremento previo (++a) incrementa primero y devuelve el valor ya incrementado. Entonces a pasa a 6 y b recibe 6 + 2 = 8.',
    source: SOURCE,
    tags: ['Operadores', 'Incremento'],
  },
  {
    id: 'u01-q18',
    unitId: 1,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Según la tabla de verdad del material, ¿cuándo da verdadero la operación XOR?',
    options: [
      'Cuando los dos operandos tienen valores distintos.',
      'Cuando los dos operandos son verdaderos.',
      'Cuando los dos operandos son falsos.',
      'Cuando al menos uno de los dos es verdadero.',
    ],
    correctIndex: 0,
    explanation:
      'En la tabla del material, XOR da 1 sólo en las filas donde A y B difieren, y 0 cuando ambos coinciden. Ésa es la diferencia con el OR, que también da verdadero cuando los dos lo son.',
    source: SOURCE,
    tags: ['Operadores lógicos'],
  },
  {
    id: 'u01-q19',
    unitId: 1,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuáles son los tres tipos de comentarios que menciona el material?',
    options: [
      'De línea única, de varias líneas y de documentación.',
      'De línea única, de bloque y de compilación condicional.',
      'Públicos, privados y protegidos.',
      'De autor, de versión y de fecha.',
    ],
    correctIndex: 0,
    explanation:
      'El material los enumera igual que en C: comentario de línea única, comentario de varias líneas y comentarios de documentación.',
    source: SOURCE,
    tags: ['Comentarios'],
  },
  {
    id: 'u01-q20',
    unitId: 1,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'JOptionPane.showInputDialog() devuelve lo que el usuario escribe. ¿Qué hay que hacer para trabajarlo como número?',
    options: [
      'Convertirlo con Integer.parseInt(), porque el diálogo devuelve un String.',
      'Nada: el diálogo ya devuelve un int cuando se ingresan dígitos.',
      'Castearlo con (int) delante de la variable.',
      'Leerlo con nextInt() de la clase Scanner.',
    ],
    correctIndex: 0,
    explanation:
      'El ejemplo del material lo muestra así: String numStr = JOptionPane.showInputDialog(...) y después Integer numero = Integer.parseInt(numStr). El diálogo siempre entrega texto.',
    source: SOURCE,
    tags: ['JOptionPane', 'Casteo'],
  },
  {
    id: 'u01-q21',
    unitId: 1,
    type: 'vf',
    difficulty: 'basico',
    prompt:
      'Cuando el nombre de una variable tiene más de una palabra, se capitaliza la primera letra de cada palabra posterior a la primera.',
    answer: true,
    explanation:
      'Es la convención lowerCamelCase que indica el material: la primera palabra en minúscula y la inicial de cada palabra subsiguiente en mayúscula, como en nombreCompleto.',
    source: SOURCE,
    tags: ['Nomenclatura'],
  },
  {
    id: 'u01-q22',
    unitId: 1,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué método de la clase Scanner lee una línea completa hasta el salto de línea?',
    options: ['nextLine()', 'nextInt()', 'nextDouble()', 'next()'],
    correctIndex: 0,
    explanation:
      'nextLine() lee una secuencia de caracteres delimitada por un salto de línea y devuelve una cadena. Los otros métodos que enumera el material leen un entero, un número de punto flotante y un booleano.',
    source: SOURCE,
    tags: ['Scanner'],
  },
  {
    id: 'u01-q23',
    unitId: 1,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Los parámetros son las variables que se pasan entre métodos cuando uno invoca a otro.',
    answer: true,
    explanation:
      'Es la definición que da el material al clasificar las variables en de instancia, de clase, locales y parámetros: estos últimos son los que se pasan entre métodos.',
    source: SOURCE,
    tags: ['Scope', 'Parámetros'],
  },
  {
    id: 'u01-q24',
    unitId: 1,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente fragmento. ¿Qué imprime por consola?',
    code: `int edad = 20;
String resultado = (edad >= 18) ? "mayor" : "menor";
System.out.println(resultado);`,
    options: ['mayor', 'menor', 'true', 'No compila: el ternario sólo puede devolver números.'],
    correctIndex: 0,
    explanation:
      'El operador ternario devuelve el primer valor cuando la condición se cumple. Como 20 es mayor o igual a 18, la variable recibe "mayor". El ternario puede devolver cualquier tipo, no sólo números.',
    source: SOURCE,
    tags: ['Operador ternario'],
  },
]
