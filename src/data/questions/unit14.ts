import type { Question } from '../../types'

const SOURCE = 'Clase 14 — Genericidad'

export const unit14: Question[] = [
  {
    id: 'u14-q01',
    unitId: 14,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Una clase genérica puede instanciarse con tipos primitivos, por ejemplo Pila<char>.',
    answer: false,
    explanation:
      'Los genéricos en Java sólo pueden instanciarse con clases, no con tipos primitivos. Para casos como ese hay que usar las clases envoltorio: Pila<Character>, Mapa<String, Integer>, etcétera.',
    source: SOURCE,
    tags: ['Genéricos', 'Wrappers'],
  },
  {
    id: 'u14-q02',
    unitId: 14,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Dentro de una clase genérica se pueden crear objetos del tipo genérico, por ejemplo T dato = new T().',
    answer: false,
    explanation:
      'No se pueden crear objetos ni arreglos del tipo genérico: ni T dato = new T() ni T[] miArreglo = new T[10]. Esto no impide declarar variables ni argumentos de tipo genérico.',
    source: SOURCE,
    tags: ['Genéricos', 'Restricciones'],
  },
  {
    id: 'u14-q03',
    unitId: 14,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál es el problema de usar Object como tipo de dato para lograr un contenedor universal?',
    options: [
      'Es potencialmente inseguro: el error recién se descubre en tiempo de ejecución, al castear, con una ClassCastException.',
      'Object no admite ser usado como tipo de un atributo.',
      'Obliga a que todas las clases almacenadas implementen Comparable.',
      'Impide que el contenedor almacene más de un elemento.',
    ],
    correctIndex: 0,
    explanation:
      'Al usar Object, la caja puede contener cualquier cosa y queda a cargo del programador verificar que el código no falle. El error se descubre recién al momento del casteo, cuando se lanza ClassCastException. La genericidad traslada esa verificación al tiempo de compilación.',
    source: SOURCE,
    tags: ['Genéricos', 'Object'],
  },
  {
    id: 'u14-q04',
    unitId: 14,
    type: 'mc',
    difficulty: 'basico',
    prompt: 'Según la convención de nombres para parámetros de tipo, ¿qué representa la letra E?',
    options: [
      'Un elemento de una colección',
      'Una excepción',
      'Una entidad persistente',
      'Un tipo enumerado',
    ],
    correctIndex: 0,
    explanation:
      'La convención del material es: E para elemento de una colección, K para clave, N para número, T para tipo, V para valor, y S, U, V para otros tipos adicionales.',
    source: SOURCE,
    tags: ['Genéricos', 'Convenciones'],
  },
  {
    id: 'u14-q05',
    unitId: 14,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre en la última línea?',
    code: `public class Caja<T> {
    private T contenido;

    public void guardar(T contenido) {
        this.contenido = contenido;
    }

    public T obtener() {
        return contenido;
    }
}

// En el main:
Caja<String> caja = new Caja<>();
caja.guardar("un texto");
caja.guardar(42);`,
    options: [
      'Error de compilación: la caja fue parametrizada con String y 42 no lo es.',
      'Compila y reemplaza el contenido anterior por el número 42.',
      'Compila, pero lanza ClassCastException en tiempo de ejecución.',
      'Error de compilación, porque una clase genérica no puede tener métodos que devuelvan T.',
    ],
    correctIndex: 0,
    explanation:
      'Ésa es precisamente la ventaja de la genericidad frente a Object: al instanciar la Caja se define el tipo de dato y, si luego quiere guardarse otro, se arroja un error en tiempo de compilación, antes de que el programa llegue a ejecutarse.',
    source: SOURCE,
    tags: ['Genéricos', 'Clases genéricas'],
  },
  {
    id: 'u14-q06',
    unitId: 14,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál es la ventaja central de la genericidad frente al casteo manual?',
    options: [
      'El chequeo de tipos se realiza en tiempo de compilación, lo que evita el casteo y reduce los fallos en tiempo de ejecución.',
      'Permite que una misma variable almacene simultáneamente varios tipos distintos.',
      'Reduce la cantidad de memoria que ocupa cada objeto en el heap.',
      'Elimina la necesidad de declarar los tipos de retorno de los métodos.',
    ],
    correctIndex: 0,
    explanation:
      'La genericidad evita el casteo de clases y, con ello, el chequeo de tipos que la JVM debe hacer en tiempo de ejecución. Al verificar en compilación, muchos problemas de asignaciones o casteos inapropiados se detectan antes de que el programa se ejecute.',
    source: SOURCE,
    tags: ['Genéricos'],
  },
  {
    id: 'u14-q07',
    unitId: 14,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué expresa el comodín ? extends Number en la firma de un método?',
    options: [
      'Que el tipo desconocido es Number o alguna de sus subclases: es un límite superior.',
      'Que el tipo desconocido es Number o alguna de sus superclases: es un límite inferior.',
      'Que el método sólo acepta la clase Number, sin subclases.',
      'Que el método puede recibir cualquier tipo, sin restricción alguna.',
    ],
    correctIndex: 0,
    explanation:
      '? extends Type declara que el tipo desconocido representa un subtipo de Type, incluido Type mismo, lo que se conoce como límite superior. La forma ? super Type expresa lo inverso: un límite inferior.',
    source: SOURCE,
    tags: ['Comodines', 'extends'],
  },
  {
    id: 'u14-q08',
    unitId: 14,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué permite un parámetro de tipo acotado, como <T extends Comparable>?',
    options: [
      'Limitar los tipos con los que se puede parametrizar la clase o el método, exigiendo que sean subclases o implementaciones del tipo indicado.',
      'Fijar la cantidad máxima de elementos que puede contener la estructura.',
      'Obligar a que el tipo genérico sea siempre una clase abstracta.',
      'Permitir que el tipo genérico se use en campos estáticos.',
    ],
    correctIndex: 0,
    explanation:
      'Los parámetros de tipo acotado limitan los tipos aceptados, especificando una clase o interfaz superior en la jerarquía de la cual el argumento debe ser subclase o implementación. Se declaran con la palabra extends, tanto para clases como para interfaces.',
    source: SOURCE,
    tags: ['Tipos acotados'],
  },
  {
    id: 'u14-q09',
    unitId: 14,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: 'En una limitación múltiple como <T extends Persona & Comparable>, ¿qué regla debe respetarse?',
    options: [
      'Puede haber una sola clase y debe ir primera; las interfaces van a continuación, separadas por &.',
      'Pueden combinarse varias clases, siempre que se separen con &.',
      'Las interfaces deben ir primero y la clase al final.',
      'Sólo se admiten interfaces: las clases no pueden usarse como límite.',
    ],
    correctIndex: 0,
    explanation:
      'En una limitación múltiple los tipos pueden ser una sola clase, que debe ir primera, y las interfaces que se deseen, separadas por el ampersand.',
    source: SOURCE,
    tags: ['Tipos acotados'],
  },
  {
    id: 'u14-q10',
    unitId: 14,
    type: 'vf',
    difficulty: 'avanzado',
    prompt: 'El tipo genérico T puede utilizarse como tipo de un campo estático de la clase.',
    answer: false,
    explanation:
      'No se puede usar el tipo genérico como tipo de un campo estático ni en ningún lugar dentro de un método o inicializador estático. Dentro de la definición de la clase, T puede aparecer en cualquier declaración no estática.',
    source: SOURCE,
    tags: ['Genéricos', 'static'],
  },
  {
    id: 'u14-q11',
    unitId: 14,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Al heredar de una clase genérica, ¿qué opciones tiene la clase hija?',
    options: [
      'Mantener la genericidad del padre, restringirla con extends, o no ser genérica y especificar un tipo concreto.',
      'Únicamente mantener la genericidad tal cual la declara el padre.',
      'Únicamente especificar un tipo concreto, porque la genericidad no se hereda.',
      'No puede heredar de una clase genérica: sólo puede implementar interfaces genéricas.',
    ],
    correctIndex: 0,
    explanation:
      'El material enumera las tres alternativas: mantener la genericidad de la clase padre, restringirla mediante un tipo acotado, o no ser genérica y especificar un tipo concreto al extender.',
    source: SOURCE,
    tags: ['Genéricos', 'Herencia'],
  },
  {
    id: 'u14-q12',
    unitId: 14,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué es un método genérico?',
    options: [
      'Un método que puede invocarse con distintos tipos de objetos, más allá de los vinculados a la clase donde está definido.',
      'Un método que sólo puede existir dentro de una clase genérica.',
      'Un método que acepta cualquier cantidad de parámetros.',
      'Un método que devuelve siempre Object.',
    ],
    correctIndex: 0,
    explanation:
      'El material aclara que un método genérico puede definirse dentro de una clase genérica o dentro de una clase ordinaria, ya que la declaración del tipo es específica del método y no afecta a la clase entera.',
    source: SOURCE,
    tags: ['Genéricos', 'Métodos genéricos'],
  },
  {
    id: 'u14-q13',
    unitId: 14,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá la siguiente declaración. ¿Qué significa el <T> antes del tipo de retorno?',
    code: `public static <T> void imprimirArreglo(T[] arreglo) {
    for (T elemento : arreglo) {
        System.out.println(elemento);
    }
}`,
    options: [
      'Define un parámetro de tipo propio del método, que permite usarlo con Integer[], String[] o cualquier otro arreglo.',
      'Indica que el método devuelve un valor de tipo T.',
      'Declara que la clase entera es genérica.',
      'Obliga a que el arreglo contenga elementos de una única clase concreta fijada de antemano.',
    ],
    correctIndex: 0,
    explanation:
      'Es el ejemplo del material: <T> define un parámetro de tipo usado por el método, de modo que puede utilizarse con cualquier tipo de arreglo. El tipo de retorno acá es void, independiente de T.',
    source: SOURCE,
    tags: ['Genéricos', 'Métodos genéricos'],
  },
  {
    id: 'u14-q14',
    unitId: 14,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué es una interfaz genérica?',
    options: [
      'Una interfaz cuyos métodos operan sobre parámetros de tipo, que se sustituyen cuando una clase la implementa.',
      'Una interfaz que sólo pueden implementar las clases genéricas.',
      'Una interfaz sin métodos, que sólo declara constantes.',
      'Una interfaz que se instancia con new indicando el tipo.',
    ],
    correctIndex: 0,
    explanation:
      'Define un conjunto de métodos que operan en tipos genéricos: no se especifica con qué tipo concreto trabajarán, se usan parámetros de tipo que se sustituyen por tipos reales al implementarla. Pueden implementarla tanto clases ordinarias como genéricas.',
    source: SOURCE,
    tags: ['Genéricos', 'Interfaces'],
  },
  {
    id: 'u14-q15',
    unitId: 14,
    type: 'vf',
    difficulty: 'avanzado',
    prompt: 'Al instanciar una clase genérica con un tipo concreto se crea una clase nueva.',
    answer: false,
    explanation:
      'El material lo aclara: todas las invocaciones de clases genéricas son expresiones de una misma clase. Al instanciar una clase genérica no se crea una clase nueva.',
    source: SOURCE,
    tags: ['Genéricos'],
  },
  {
    id: 'u14-q16',
    unitId: 14,
    type: 'mc',
    difficulty: 'basico',
    prompt: 'Según la convención de nombres, ¿qué representan las letras K y V?',
    options: ['Clave y valor', 'Clase y variable', 'Constante y void', 'Colección y vector'],
    correctIndex: 0,
    explanation:
      'La convención del material es E para elemento de una colección, K para clave, N para número, T para tipo y V para valor. S, U y V se usan para representar otros tipos.',
    source: SOURCE,
    tags: ['Genéricos', 'Convenciones'],
  },
  {
    id: 'u14-q17',
    unitId: 14,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuáles son los dos casos de uso típicos de la genericidad que menciona el material?',
    options: [
      'Contenedores cuyas operaciones no dependen del tipo almacenado, y algoritmos aplicables a cualquier dato.',
      'Las clases abstractas y las interfaces.',
      'El manejo de excepciones y la lectura de archivos.',
      'La herencia simple y la herencia múltiple.',
    ],
    correctIndex: 0,
    explanation:
      'El material ejemplifica el primero con ArrayList o Stack, que almacenan cualquier tipo de objeto especificándolo al crearlos, y el segundo con la ordenación, un algoritmo que no depende del tipo de dato que procesa.',
    source: SOURCE,
    tags: ['Genéricos'],
  },
  {
    id: 'u14-q18',
    unitId: 14,
    type: 'code',
    difficulty: 'avanzado',
    prompt: '¿Cuál de estas declaraciones es válida en Java?',
    code: `// A
Mapa<String, int> a;

// B
Mapa<String, Integer> b;

// C
Pila<char> c;`,
    options: [
      'Sólo la B, porque los genéricos no admiten tipos primitivos.',
      'La A y la B, porque int e Integer son equivalentes.',
      'Las tres son válidas.',
      'Ninguna: los genéricos requieren siempre un solo parámetro de tipo.',
    ],
    correctIndex: 0,
    explanation:
      'Los genéricos sólo pueden instanciarse con clases, no con tipos primitivos. El material usa justamente Mapa<String, int> y Pila<char> como ejemplos de lo que no se puede: hay que usar las clases envoltorio, como Integer o Character.',
    source: SOURCE,
    tags: ['Genéricos', 'Wrappers'],
  },
  {
    id: 'u14-q19',
    unitId: 14,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué expresa el comodín ? super Integer?',
    options: [
      'Que el tipo desconocido es Integer o alguna de sus superclases, como Number u Object: es un límite inferior.',
      'Que el tipo desconocido es Integer o alguna de sus subclases: es un límite superior.',
      'Que el método acepta cualquier tipo numérico.',
      'Que el tipo se resuelve en tiempo de ejecución.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo describe como límite inferior: el tipo desconocido representa una superclase de Type, incluido Type mismo. La forma con extends es el límite superior, que va en el sentido contrario.',
    source: SOURCE,
    tags: ['Comodines', 'super'],
  },
]
