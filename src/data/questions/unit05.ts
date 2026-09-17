import type { Question } from '../../types'

const SOURCE = 'Clase 5 — Herencia y Polimorfismo'

export const unit05: Question[] = [
  {
    id: 'u05-q01',
    unitId: 5,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'En Java una subclase puede extender simultáneamente de dos superclases.',
    answer: false,
    explanation:
      'Java implementa herencia simple: una subclase puede tener sólo una superclase. Sí es posible la herencia multinivel, es decir que A sea heredada por B y que C herede de B.',
    source: SOURCE,
    tags: ['Herencia'],
  },
  {
    id: 'u05-q02',
    unitId: 5,
    type: 'vf',
    difficulty: 'basico',
    prompt:
      'Salvo que se especifique otra clase padre, toda clase en Java deriva por defecto de java.lang.Object.',
    answer: true,
    explanation:
      'Ésa es una de las reglas de la herencia que enuncia el material: por defecto, todas las clases derivan de java.lang.Object a no ser que se especifique otra clase padre.',
    source: SOURCE,
    tags: ['Herencia', 'Object'],
  },
  {
    id: 'u05-q03',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué regla rige la invocación a super() dentro del constructor de una subclase?',
    options: [
      'Debe ser siempre la primera sentencia del constructor; si no se escribe, el compilador inserta una llamada sin parámetros.',
      'Puede ubicarse en cualquier lugar del constructor, igual que en el resto de los métodos.',
      'Es obligatorio escribirla explícitamente, porque el compilador nunca la agrega.',
      'Sólo puede usarse si la superclase es abstracta.',
    ],
    correctIndex: 0,
    explanation:
      'El constructor de una subclase debe tener siempre como primera sentencia una invocación al constructor de su superclase. Si no se hace explícitamente, el compilador inserta un super() sin parámetros, lo que exige que la superclase tenga un constructor sin parámetros definido.',
    source: SOURCE,
    tags: ['super', 'Constructores'],
  },
  {
    id: 'u05-q04',
    unitId: 5,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre al compilarlo?',
    code: `class Vehiculo {
    protected String marca;

    public Vehiculo(String marca) {
        this.marca = marca;
    }
}

class Auto extends Vehiculo {
    public Auto() {
        // sin llamada explícita a super
    }
}`,
    options: [
      'No compila: el compilador inserta super() sin parámetros y Vehiculo no tiene un constructor sin parámetros.',
      'Compila sin problemas y marca queda en null.',
      'Compila, porque Java usa automáticamente el constructor con parámetros de la superclase.',
      'No compila, porque un atributo protected no puede inicializarse en el constructor padre.',
    ],
    correctIndex: 0,
    explanation:
      'Al no escribirse la llamada explícita, el compilador inserta automáticamente super() sin parámetros. Como Vehiculo sólo define un constructor que recibe un String, esa llamada no existe y el compilador señala el error.',
    source: SOURCE,
    tags: ['super', 'Constructores'],
  },
  {
    id: 'u05-q05',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Al sobrescribir un método, ¿qué está permitido respecto del modificador de acceso?',
    options: [
      'Que la versión de la subclase tenga un modificador menos restrictivo que la de la superclase, pero nunca más restrictivo.',
      'Que la versión de la subclase tenga un modificador más restrictivo, para reforzar el encapsulamiento.',
      'El modificador debe ser idéntico en ambas clases, sin excepción.',
      'El modificador es irrelevante, porque la sobrescritura sólo mira el nombre del método.',
    ],
    correctIndex: 0,
    explanation:
      'La firma debe ser la misma, pero el método sobrescrito puede tener un modificador menos restrictivo que el de la superclase. Por ejemplo, un método protected en el padre puede ser public en el hijo, nunca al revés.',
    source: SOURCE,
    tags: ['Sobrescritura'],
  },
  {
    id: 'u05-q06',
    unitId: 5,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `class Animal {
    public void hablar() {
        System.out.println("Sonido generico");
    }
}

class Perro extends Animal {
    @Override
    public void hablar() {
        System.out.println("Guau");
    }
}

// En el main:
Animal a = new Perro();
a.hablar();`,
    options: [
      'Guau, porque el método a ejecutar se determina en tiempo de ejecución según el tipo dinámico.',
      'Sonido generico, porque la variable está declarada de tipo Animal.',
      'Ambas líneas, primero la del padre y después la del hijo.',
      'No compila, porque un Perro no puede asignarse a una variable de tipo Animal.',
    ],
    correctIndex: 0,
    explanation:
      'Es polimorfismo dinámico: los métodos sobrescritos de las subclases tienen precedencia, y la búsqueda comienza en la clase dinámica de la instancia. El objeto es un Perro, así que se ejecuta su versión de hablar().',
    source: SOURCE,
    tags: ['Polimorfismo', 'Enlace dinámico'],
  },
  {
    id: 'u05-q07',
    unitId: 5,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre en la última línea?',
    code: `class Animal {
    public void comer() { }
}

class Perro extends Animal {
    public void ladrar() { }
}

// En el main:
Animal a = new Perro();
a.ladrar();`,
    options: [
      'Error de compilación: ladrar() no está definido en Animal, que es el tipo declarado de la variable.',
      'Se ejecuta ladrar() sin inconvenientes, porque el objeto realmente es un Perro.',
      'Error en tiempo de ejecución del tipo ClassCastException.',
      'Se ejecuta comer() en su lugar, por sustitución.',
    ],
    correctIndex: 0,
    explanation:
      'Sólo pueden invocarse los métodos del objeto que también estén definidos o declarados en la superclase, no aquellos que existan únicamente en la clase real del objeto. Para llamar a ladrar() habría que castear: ((Perro) a).ladrar().',
    source: SOURCE,
    tags: ['Polimorfismo', 'Sustitución'],
  },
  {
    id: 'u05-q08',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué excepción se lanza cuando se castea una referencia a un tipo que el objeto no tiene?',
    options: ['ClassCastException', 'NullPointerException', 'IllegalArgumentException', 'ArrayIndexOutOfBoundsException'],
    correctIndex: 0,
    explanation:
      'En tiempo de ejecución se comprueba que el objeto sea realmente de ese tipo, y si no lo es se lanza ClassCastException. Por eso conviene verificar antes con instanceof.',
    source: SOURCE,
    tags: ['Casting', 'ClassCastException'],
  },
  {
    id: 'u05-q09',
    unitId: 5,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué evalúa el operador instanceof?',
    options: [
      'Si el objeto pertenece a la clase indicada o a alguna de sus subclases.',
      'Si dos objetos tienen exactamente el mismo contenido.',
      'Si una variable fue inicializada con el operador new.',
      'Si una clase implementa la interfaz Comparable.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo ejemplifica como if (v instanceof A), que se cumple si el objeto v pertenece a la clase A o a una de sus subclases. Es la verificación previa recomendada antes de castear.',
    source: SOURCE,
    tags: ['instanceof'],
  },
  {
    id: 'u05-q10',
    unitId: 5,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'En la sobrecarga de métodos, el tipo de retorno es uno de los elementos que permite diferenciarlos.',
    answer: false,
    explanation:
      'En la sobrecarga no interviene el tipo de retorno. Los métodos se distinguen por tener el mismo nombre y diferentes parámetros, y el compilador decide cuál invocar en tiempo de compilación según los argumentos.',
    source: SOURCE,
    tags: ['Sobrecarga', 'Polimorfismo estático'],
  },
  {
    id: 'u05-q11',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál es la diferencia temporal entre el polimorfismo estático y el dinámico?',
    options: [
      'El estático se resuelve en tiempo de compilación y el dinámico en tiempo de ejecución.',
      'El estático se resuelve en tiempo de ejecución y el dinámico en tiempo de compilación.',
      'Ambos se resuelven en tiempo de compilación, pero en etapas distintas.',
      'Ambos se resuelven en tiempo de ejecución, según el orden de la jerarquía.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo resume así: el estático se da en tiempo de compilación y el dinámico en tiempo de ejecución. Además, en el estático los métodos tienen el mismo nombre y distintos parámetros, mientras que en el dinámico comparten la misma firma en clases distintas.',
    source: SOURCE,
    tags: ['Polimorfismo'],
  },
  {
    id: 'u05-q12',
    unitId: 5,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Una subclase puede acceder directamente a los atributos privados de su superclase.',
    answer: false,
    explanation:
      'Una subclase no puede acceder a los miembros privados de la superclase. Si necesita ese dato, la superclase tiene que ofrecer los métodos apropiados, típicamente getters y setters, o declarar el atributo como protected.',
    source: SOURCE,
    tags: ['Herencia', 'Modificadores de acceso'],
  },
  {
    id: 'u05-q13',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Cuando un método está sobrescrito en varios niveles de la jerarquía, ¿cuál de las versiones se ejecuta?',
    options: [
      'La última redefinición, es decir la más baja en la jerarquía de herencia.',
      'La de la superclase más alta, que es la definición original.',
      'Todas, en orden descendente desde la superclase.',
      'La que corresponda al tipo declarado de la variable.',
    ],
    correctIndex: 0,
    explanation:
      'La búsqueda del método comienza al final de la jerarquía, en la clase dinámica de la instancia, de modo que se ejecuta la última redefinición. Las versiones de las superclases no se ejecutan automáticamente.',
    source: SOURCE,
    tags: ['Sobrescritura', 'Enlace dinámico'],
  },
]
