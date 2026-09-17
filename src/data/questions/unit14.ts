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
]
