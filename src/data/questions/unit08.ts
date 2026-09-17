import type { Question } from '../../types'

const SOURCE = 'Clase 8 — La clase Enum'

export const unit08: Question[] = [
  {
    id: 'u08-q01',
    unitId: 8,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Un tipo enumerado puede declararse dentro del método main.',
    answer: false,
    explanation:
      'Un enum no puede declararse dentro de un constructor ni de ningún otro método. Si se intenta, el compilador informa el error “enum types must not be local”.',
    source: SOURCE,
    tags: ['enum'],
  },
  {
    id: 'u08-q02',
    unitId: 8,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Los constructores de un enum son implícitamente privados.',
    answer: true,
    explanation:
      'Siempre son private de forma implícita, porque no tiene sentido instanciar manualmente nuevas constantes de una enumeración desde fuera de su definición.',
    source: SOURCE,
    tags: ['enum', 'Constructores'],
  },
  {
    id: 'u08-q03',
    unitId: 8,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué devuelve el método values() de un enum?',
    options: [
      'Un arreglo con todos los valores del enumerado, en el orden en que fueron declarados.',
      'Una lista ordenada alfabéticamente con los nombres de las constantes.',
      'La cantidad de constantes definidas en la enumeración.',
      'El valor de la primera constante declarada.',
    ],
    correctIndex: 0,
    explanation:
      'values() es uno de los métodos especiales que el compilador agrega automáticamente al crear un enum. Devuelve un array con todos los valores en su orden de declaración, útil para iterar y mostrar todas las opciones posibles.',
    source: SOURCE,
    tags: ['enum', 'values()'],
  },
  {
    id: 'u08-q04',
    unitId: 8,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué es seguro comparar dos variables del mismo tipo enum con el operador ==?',
    options: [
      'Porque cada constante del enumerado tiene una única instancia en la JVM, de modo que comparar referencias equivale a comparar valores.',
      'Porque Java sobrescribe internamente el operador == para los enum.',
      'Porque los enum se almacenan siempre en el stack y no en el heap.',
      'Porque las constantes de un enum son en realidad cadenas de texto.',
    ],
    correctIndex: 0,
    explanation:
      'Usando enum se asegura que cada constante tenga una única instancia en la JVM, lo que las vuelve efectivamente singletons dentro de su propio tipo. Además, comparar con == evita el NullPointerException que sí puede ocurrir al invocar un método sobre una referencia nula.',
    source: SOURCE,
    tags: ['enum', 'Comparación'],
  },
  {
    id: 'u08-q05',
    unitId: 8,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime por consola?',
    code: `enum Dia {
    LUNES, MARTES, MIERCOLES
}

// En el main:
for (Dia d : Dia.values()) {
    System.out.print(d + " ");
}`,
    options: [
      'LUNES MARTES MIERCOLES',
      'MIERCOLES MARTES LUNES',
      '0 1 2',
      'No compila: values() no existe porque el enum no lo declara.',
    ],
    correctIndex: 0,
    explanation:
      'values() lo agrega el compilador automáticamente y devuelve las constantes en el orden en que fueron declaradas. Al imprimir cada constante se usa su nombre, de modo que la salida respeta ese orden.',
    source: SOURCE,
    tags: ['enum', 'values()'],
  },
  {
    id: 'u08-q06',
    unitId: 8,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `enum Estado {
    ACTIVO("verde"),
    INACTIVO("rojo");

    private final String color;

    Estado(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }
}

// En el main:
System.out.println(Estado.ACTIVO.getColor());`,
    options: [
      'verde',
      'ACTIVO',
      'null, porque el constructor de un enum no puede asignar atributos.',
      'No compila, porque un enum no admite constructores.',
    ],
    correctIndex: 0,
    explanation:
      'Un tipo enumerado puede tener campos, métodos y constructores, lo que permite que cada constante tenga estado y comportamiento. El constructor inicializa el campo color de cada constante y getColor() lo devuelve.',
    source: SOURCE,
    tags: ['enum', 'Campos'],
  },
  {
    id: 'u08-q07',
    unitId: 8,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuál es la ventaja central de usar un tipo enum?',
    options: [
      'Restringe los valores posibles de una variable, lo que aporta un tipo de dato seguro y verificación en tiempo de compilación.',
      'Permite que una variable tome cualquier valor, siempre que sea una cadena en mayúsculas.',
      'Acelera la ejecución del programa al evitar el uso del heap.',
      'Reemplaza a las clases abstractas en las jerarquías de herencia.',
    ],
    correctIndex: 0,
    explanation:
      'El enum restringe los posibles valores que puede tomar una variable, y por eso ofrece un tipo de dato seguro: documenta por adelantado los valores aceptados, mejora la legibilidad, reduce errores y permite verificación en tiempo de compilación.',
    source: SOURCE,
    tags: ['enum'],
  },
  {
    id: 'u08-q08',
    unitId: 8,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Un tipo enum extiende de forma implícita de java.lang.Enum.',
    answer: true,
    explanation:
      'El material define enum como un tipo especial de clase que siempre extiende de java.lang.Enum y en la cual se restringen los posibles valores que puede tomar una variable.',
    source: SOURCE,
    tags: ['enum'],
  },
  {
    id: 'u08-q09',
    unitId: 8,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Las enumeraciones son especialmente adecuadas para usarse dentro de una sentencia switch.',
    answer: true,
    explanation:
      'Por su naturaleza de valor limitado, las enumeraciones son ideales para usar en un switch: el conjunto de casos posibles está acotado y documentado de antemano.',
    source: SOURCE,
    tags: ['enum', 'switch'],
  },
  {
    id: 'u08-q10',
    unitId: 8,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué convención de escritura se usa para las constantes de una enumeración?',
    options: [
      'Se escriben en letras mayúsculas, para recordar que son valores fijos.',
      'Se escriben en lowerCamelCase, como cualquier variable.',
      'Se escriben con la primera letra en mayúscula, como los nombres de clase.',
      'Se escriben en minúsculas y separadas por guiones bajos.',
    ],
    correctIndex: 0,
    explanation:
      'Por convención, los nombres de los valores que puede tomar un enum se escriben en letras mayúsculas, para recordar que son valores fijos.',
    source: SOURCE,
    tags: ['enum', 'Convenciones'],
  },
  {
    id: 'u08-q11',
    unitId: 8,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `enum Talle {
    CHICO, MEDIANO, GRANDE
}

// En el main:
Talle t = Talle.MEDIANO;

switch (t) {
    case CHICO:
        System.out.println("S");
        break;
    case MEDIANO:
        System.out.println("M");
        break;
    case GRANDE:
        System.out.println("L");
        break;
}`,
    options: ['M', 'MEDIANO', 'S, M y L', 'No compila: el switch no admite tipos enumerados.'],
    correctIndex: 0,
    explanation:
      'Las enumeraciones son ideales para el switch por su naturaleza de valor limitado: el conjunto de casos posibles está acotado de antemano. Como la variable vale MEDIANO, se ejecuta esa rama y el break corta.',
    source: SOURCE,
    tags: ['enum', 'switch'],
  },
  {
    id: 'u08-q12',
    unitId: 8,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `enum Palo {
    OROS, COPAS, ESPADAS, BASTOS
}

// En el main:
System.out.println(Palo.values().length);`,
    options: ['4', '3', '0', 'No compila: values() habría que declararlo en el enum.'],
    correctIndex: 0,
    explanation:
      'values() es uno de los métodos especiales que el compilador agrega automáticamente al crear un enum. Devuelve un array con todos los valores declarados, así que su longitud es la cantidad de constantes: 4.',
    source: SOURCE,
    tags: ['enum', 'values()'],
  },
  {
    id: 'u08-q13',
    unitId: 8,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Las enumeraciones pueden tener métodos, tanto abstractos como concretos.',
    answer: true,
    explanation:
      'El material lo indica expresamente: las enumeraciones pueden tener métodos abstractos y concretos, lo que permite definir comportamientos personalizados para cada constante.',
    source: SOURCE,
    tags: ['enum', 'Métodos'],
  },
  {
    id: 'u08-q14',
    unitId: 8,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Dónde puede declararse un tipo enumerado?',
    options: [
      'Dentro de una clase o como una clase en sí misma, pero nunca dentro de un método.',
      'Únicamente dentro del método main.',
      'Únicamente como una clase independiente, en su propio archivo.',
      'En cualquier lugar, incluido el interior de un constructor.',
    ],
    correctIndex: 0,
    explanation:
      'El material señala las dos ubicaciones válidas, y advierte que un enum no puede declararse dentro de un constructor ni de ningún otro método: el compilador informa "enum types must not be local".',
    source: SOURCE,
    tags: ['enum'],
  },
  {
    id: 'u08-q15',
    unitId: 8,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Los campos de una enumeración suelen declararse final cuando se asignan una sola vez desde el constructor.',
    answer: true,
    explanation:
      'El material lo menciona al mostrar un enum con constructor y campos: pueden declararse final si se asignan una vez a través del constructor y no están destinados a cambiar, que es lo más común.',
    source: SOURCE,
    tags: ['enum', 'final'],
  },
  {
    id: 'u08-q16',
    unitId: 8,
    type: 'mc',
    difficulty: 'avanzado',
    prompt:
      'Al comparar el estado de un objeto contra una constante de enum, ¿qué ventaja tiene usar == sobre invocar un método?',
    options: [
      'Si la referencia es null, == no falla, mientras que invocar un método lanzaría NullPointerException.',
      'El operador == compara el contenido y el método sólo la referencia.',
      'El operador == funciona en tiempo de compilación y el método en ejecución.',
      'No hay diferencia: son equivalentes en todos los casos.',
    ],
    correctIndex: 0,
    explanation:
      'Es la seguridad en tiempo de ejecución que marca el material: si el estado es null, la opción que invoca un método da NullPointerException, y la que compara con == no. Comparar con == es seguro porque cada constante tiene una única instancia en la JVM.',
    source: SOURCE,
    tags: ['enum', 'Comparación'],
  },
  {
    id: 'u08-q17',
    unitId: 8,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué ocurre si se intenta asignarle a una variable de tipo enum un valor que no está enumerado?',
    options: [
      'El compilador lo rechaza, porque el enum restringe los valores posibles.',
      'Se asigna igual y el valor queda en null.',
      'Se lanza una excepción en tiempo de ejecución.',
      'Se agrega automáticamente como una constante nueva.',
    ],
    correctIndex: 0,
    explanation:
      'Ésa es la razón de ser del enum: si una variable se declaró de un tipo enumerado, no puede tomar valores que no sean uno de los enumerados. Por eso ofrece un tipo de dato seguro y permite verificación en tiempo de compilación.',
    source: SOURCE,
    tags: ['enum'],
  },
]
