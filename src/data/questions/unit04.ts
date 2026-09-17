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
  {
    id: 'u04-q11',
    unitId: 4,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      '¿Cuál es la diferencia entre una variable de instancia y una variable de clase (static)?',
    options: [
      'La de instancia tiene un valor propio en cada objeto; la de clase tiene una única copia compartida por todos.',
      'La de instancia se guarda en el heap y la de clase en el stack.',
      'La de instancia no puede ser privada; la de clase sí.',
      'La de instancia se inicializa sola y la de clase hay que inicializarla a mano siempre.',
    ],
    correctIndex: 0,
    explanation:
      'Las variables miembro static no forman parte de los objetos de la clase sino de la propia clase: cuando se crean objetos, todos comparten una copia de esos campos. Las de instancia, en cambio, toman valores únicos en cada objeto.',
    source: SOURCE,
    tags: ['static', 'Variables de clase'],
  },
  {
    id: 'u04-q12',
    unitId: 4,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué se puede usar Math.pow(2, 3) sin haber instanciado la clase Math?',
    options: [
      'Porque es un método static, que se aplica a la clase como un todo y no depende de ningún objeto.',
      'Porque la JVM crea automáticamente una instancia de Math al iniciar el programa.',
      'Porque Math es una clase abstracta y sus métodos no necesitan objeto.',
      'Porque los métodos que devuelven double no requieren instancia.',
    ],
    correctIndex: 0,
    explanation:
      'Ésa es justamente la pregunta con la que el material introduce el tema. Algunas veces un método realiza una tarea que no depende del contenido de ningún objeto: se aplica a la clase donde está declarado y se lo conoce como método static o método de clase.',
    source: SOURCE,
    tags: ['static', 'Math'],
  },
  {
    id: 'u04-q13',
    unitId: 4,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Un método estático puede invocar a otros métodos estáticos de su misma clase.',
    answer: true,
    explanation:
      'La restricción del material es contra los elementos NO estáticos: un método estático no puede usar variables de instancia ni métodos regulares, porque éstos dependen de aquéllas. Entre estáticos no hay problema.',
    source: SOURCE,
    tags: ['static'],
  },
  {
    id: 'u04-q14',
    unitId: 4,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Los métodos estáticos también se pueden invocar a través de un objeto, aunque no sea lo recomendable.',
    answer: true,
    explanation:
      'El material lo aclara: aunque técnicamente se puedan llamar con un objeto de la clase, no es recomendable, porque son métodos dependientes de la clase y no de los objetos. La forma correcta es NombreClase.metodo().',
    source: SOURCE,
    tags: ['static'],
  },
  {
    id: 'u04-q15',
    unitId: 4,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `public class Alumno {
    private static int matriculados = 0;
    private String nombre;

    public Alumno(String nombre) {
        this.nombre = nombre;
        matriculados++;
    }

    public String getNombre() {
        return nombre;
    }

    public static int getMatriculados() {
        return matriculados;
    }
}

// En el main:
Alumno a = new Alumno("Ana");
Alumno b = new Alumno("Juan");
System.out.println(a.getNombre() + " " + Alumno.getMatriculados());`,
    options: [
      'Ana 2',
      'Ana 1',
      'Juan 2',
      'No compila: getMatriculados() no puede leer una variable declarada arriba de nombre.',
    ],
    correctIndex: 0,
    explanation:
      'nombre es variable de instancia, así que cada objeto tiene el suyo y a devuelve "Ana". matriculados es de clase: hay una sola copia, y como el constructor la incrementa en cada creación, después de dos objetos vale 2.',
    source: SOURCE,
    tags: ['static', 'Variables de clase'],
  },
  {
    id: 'u04-q16',
    unitId: 4,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre al compilarlo?',
    code: `public class Config {
    public static final int MAXIMO = 100;

    public static void subirLimite() {
        MAXIMO = 200;
    }
}`,
    options: [
      'No compila: una variable final no puede cambiar de valor una vez inicializada.',
      'Compila y MAXIMO pasa a valer 200 al invocar el método.',
      'No compila: un método estático no puede modificar una variable estática.',
      'Compila, pero el cambio se pierde al terminar el método.',
    ],
    correctIndex: 0,
    explanation:
      'La palabra reservada final indica que, una vez inicializada, el valor de la variable no puede cambiar. El error aparece en compilación. Por convención, además, el nombre de una constante va en mayúsculas.',
    source: SOURCE,
    tags: ['final', 'Constantes'],
  },
  {
    id: 'u04-q17',
    unitId: 4,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué modificadores de acceso puede llevar un atributo estático que se use desde fuera de la clase?',
    options: [
      'public, protected o ninguno.',
      'Únicamente public.',
      'Únicamente private.',
      'Cualquiera, incluido private, porque static ya lo hace accesible.',
    ],
    correctIndex: 0,
    explanation:
      'El material indica que los atributos estáticos deben llevar un modificador de acceso que permita su uso desde el exterior de la clase, y que ése puede ser public, protected o ninguno (es decir, default).',
    source: SOURCE,
    tags: ['static', 'Modificadores de acceso'],
  },
  {
    id: 'u04-q18',
    unitId: 4,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué convención de escritura corresponde al nombre de una constante?',
    options: [
      'Todo en mayúsculas.',
      'lowerCamelCase, como cualquier variable.',
      'Con la primera letra en mayúscula.',
      'Con un guión bajo como prefijo.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo remarca al hablar de constantes: el nombre de una constante debe estar en mayúscula. Se combinan public static final para que sean accesibles desde cualquier lugar sin necesitar una instancia.',
    source: SOURCE,
    tags: ['Constantes', 'Convenciones'],
  },
  {
    id: 'u04-q19',
    unitId: 4,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a un método regular o non-static?',
    options: [
      'Usa valores de variables de instancia, y hace falta crear un objeto de la clase para invocarlo.',
      'Se invoca con el nombre de la clase, sin crear objetos.',
      'No puede recibir parámetros ni devolver valores.',
      'Sólo puede declararse dentro de clases abstractas.',
    ],
    correctIndex: 0,
    explanation:
      'Son los métodos tradicionales: usan valores de variables de instancia, y por eso es necesario crear una instancia de la clase para poder invocarlos.',
    source: SOURCE,
    tags: ['static'],
  },
]
