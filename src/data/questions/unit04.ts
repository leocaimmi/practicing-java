import type { Question } from '../../types'

const SOURCE = 'Clase 4 — Static y Non-Static'

export const unit04: Question[] = [
  {
    id: 'u04-q01',
    unitId: 4,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Un método estático puede utilizar las palabras reservadas this y super.',
    answer: false,
    explanation:
      'Un método estático pertenece a la clase y no a un objeto en particular, así que no tiene un “objeto actual” al que referirse. Por eso el material aclara que no puede hacer uso de this ni de super.',
    source: SOURCE,
    tags: ['static', 'this'],
  },
  {
    id: 'u04-q02',
    unitId: 4,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Un método estático puede acceder directamente a las variables de instancia de su propia clase.',
    answer: false,
    explanation:
      'Los métodos estáticos no pueden usar variables de instancia ni invocar métodos regulares, justamente porque esos métodos dependen de variables de instancia. Un método estático no puede hacer referencia a elementos no estáticos de su misma clase.',
    source: SOURCE,
    tags: ['static'],
  },
  {
    id: 'u04-q03',
    unitId: 4,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuál es la forma recomendada de invocar un método estático?',
    options: [
      'Mediante el nombre de la clase: NombreClase.metodo().',
      'Creando previamente una instancia y usando la variable del objeto.',
      'Con la palabra new seguida del nombre del método.',
      'Únicamente desde el método main de la misma clase.',
    ],
    correctIndex: 0,
    explanation:
      'La llamada se realiza mediante la clase, respetando las reglas de visibilidad. Aunque técnicamente también puedan invocarse con un objeto, el material desaconseja hacerlo porque dependen de la clase y no de los objetos.',
    source: SOURCE,
    tags: ['static'],
  },
  {
    id: 'u04-q04',
    unitId: 4,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `public class Contador {
    private static int cantidad = 0;

    public Contador() {
        cantidad++;
    }

    public static int getCantidad() {
        return cantidad;
    }
}

// En el main:
new Contador();
new Contador();
new Contador();
System.out.println(Contador.getCantidad());`,
    options: [
      '3, porque la variable estática es única y compartida por todas las instancias.',
      '1, porque cada objeto tiene su propia copia de la variable.',
      '0, porque el contador se reinicia con cada instanciación.',
      'No compila, porque un método estático no puede leer una variable estática.',
    ],
    correctIndex: 0,
    explanation:
      'Los campos static no forman parte de los objetos sino de la propia clase: hay una única copia compartida. Cada llamada al constructor incrementa esa misma variable, así que después de tres instanciaciones vale 3.',
    source: SOURCE,
    tags: ['static', 'Variables de clase'],
  },
  {
    id: 'u04-q05',
    unitId: 4,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre al intentar compilarlo?',
    code: `public class Ejemplo {
    private int valor = 5;

    public static void mostrar() {
        System.out.println(valor);
    }
}`,
    options: [
      'No compila: un método estático no puede hacer referencia a una variable de instancia.',
      'Compila e imprime 5 cada vez que se invoca Ejemplo.mostrar().',
      'Compila, pero imprime 0 porque el método estático no ve la inicialización.',
      'Compila e imprime null, porque valor no está inicializado en el contexto estático.',
    ],
    correctIndex: 0,
    explanation:
      'El método mostrar() es estático y valor es una variable de instancia, que sólo existe dentro de un objeto concreto. Como el método no está asociado a ninguna instancia, la referencia es un error de compilación.',
    source: SOURCE,
    tags: ['static'],
  },
  {
    id: 'u04-q06',
    unitId: 4,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué implica declarar una clase como final?',
    options: [
      'Que no puede tener subclases.',
      'Que no puede ser instanciada con new.',
      'Que todos sus atributos se vuelven constantes.',
      'Que no puede contener métodos estáticos.',
    ],
    correctIndex: 0,
    explanation:
      'El material resume los tres usos de final: una variable final no puede cambiar su valor, un método final no puede sobrescribirse y una clase final no puede tener subclases.',
    source: SOURCE,
    tags: ['final'],
  },
  {
    id: 'u04-q07',
    unitId: 4,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué implica declarar un método como final?',
    options: [
      'Que no puede sobrescribirse en las subclases.',
      'Que no puede invocarse más de una vez por objeto.',
      'Que no puede recibir parámetros.',
      'Que pasa a ser automáticamente estático.',
    ],
    correctIndex: 0,
    explanation:
      'Un método final no puede sobreescribirse, lo que impide que una subclase cambie su comportamiento.',
    source: SOURCE,
    tags: ['final'],
  },
  {
    id: 'u04-q08',
    unitId: 4,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cómo se declara habitualmente una constante de clase en Java?',
    options: [
      'public static final TIPO NOMBRE = valor;',
      'private final TIPO nombre = valor;',
      'static TIPO NOMBRE = valor;',
      'const TIPO NOMBRE = valor;',
    ],
    correctIndex: 0,
    explanation:
      'Las constantes suelen ser public para poder accederse desde cualquier lugar del código, y static para no necesitar una instancia. La palabra final es la que impide que el valor cambie. Por convención, el nombre va en mayúsculas.',
    source: SOURCE,
    tags: ['final', 'Constantes'],
  },
  {
    id: 'u04-q09',
    unitId: 4,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'La palabra reservada final sólo puede aplicarse a variables estáticas.',
    answer: false,
    explanation:
      'final no es exclusiva de las variables estáticas: también puede usarse en variables de instancia, variables locales, parámetros de métodos y clases.',
    source: SOURCE,
    tags: ['final'],
  },
  {
    id: 'u04-q10',
    unitId: 4,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Una misma clase puede combinar métodos regulares y métodos estáticos.',
    answer: true,
    explanation:
      'El material lo indica expresamente: se pueden combinar métodos regulares y estáticos en la misma clase. Las restricciones aparecen recién cuando el método estático intenta acceder a miembros de instancia.',
    source: SOURCE,
    tags: ['static'],
  },
]
