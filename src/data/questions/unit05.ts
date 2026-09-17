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
  {
    id: 'u05-q14',
    unitId: 5,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Cuál es la diferencia central entre sobrecarga y sobrescritura de métodos?',
    options: [
      'En la sobrecarga los métodos tienen el mismo nombre y distintos parámetros; en la sobrescritura tienen exactamente la misma firma, en clases distintas.',
      'En la sobrecarga los métodos tienen la misma firma; en la sobrescritura cambian los parámetros.',
      'La sobrecarga sólo se puede dar entre una clase padre y una hija; la sobrescritura, dentro de una misma clase.',
      'Son dos nombres para lo mismo: uno se usa para métodos y el otro para constructores.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo resume así: en el polimorfismo estático (sobrecarga) los métodos tienen el MISMO NOMBRE pero DIFERENTES PARÁMETROS, y están en la misma clase o en subclases. En el dinámico (sobrescritura) tienen la MISMA FIRMA y están en DISTINTAS CLASES.',
    source: SOURCE,
    tags: ['Sobrecarga', 'Sobrescritura', 'Polimorfismo'],
  },
  {
    id: 'u05-q15',
    unitId: 5,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿En qué momento se decide cuál de varios métodos SOBRECARGADOS se va a invocar?',
    options: [
      'En tiempo de compilación, según los tipos de los argumentos que se le pasan.',
      'En tiempo de ejecución, según el tipo real del objeto.',
      'En tiempo de ejecución, según el tipo declarado de la variable.',
      'Al cargar la clase en la JVM, antes de ejecutar el main.',
    ],
    correctIndex: 0,
    explanation:
      'La sobrecarga es polimorfismo estático: el compilador decide cuál de los métodos invocar en tiempo de compilación, basándose en los tipos de los argumentos. La resolución en tiempo de ejecución corresponde a la sobrescritura.',
    source: SOURCE,
    tags: ['Sobrecarga', 'Polimorfismo estático'],
  },
  {
    id: 'u05-q16',
    unitId: 5,
    type: 'vf',
    difficulty: 'avanzado',
    prompt:
      'La sobrecarga sólo puede darse dentro de una misma clase, nunca entre una clase padre y una hija.',
    answer: false,
    explanation:
      'El material señala expresamente que la sobrecarga también podría darse en las clases hijas: una clase hija puede redefinir un método de la clase padre con el mismo nombre pero distinta lista de parámetros.',
    source: SOURCE,
    tags: ['Sobrecarga', 'Herencia'],
  },
  {
    id: 'u05-q17',
    unitId: 5,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `class Calculadora {
    public int sumar(int a, int b) {
        return a + b;
    }

    public double sumar(double a, double b) {
        return a + b;
    }
}

// En el main:
Calculadora c = new Calculadora();
System.out.println(c.sumar(2, 3));`,
    options: [
      '5, porque los argumentos son enteros y se elige la versión con parámetros int.',
      '5.0, porque siempre se elige la versión más general.',
      'No compila: no puede haber dos métodos con el mismo nombre.',
      'No compila: los métodos sobrecargados deben tener distinto tipo de retorno.',
    ],
    correctIndex: 0,
    explanation:
      'Es sobrecarga: mismo nombre, distinta lista de parámetros. El compilador elige según los tipos de los argumentos, y como 2 y 3 son enteros, invoca la versión que recibe int y devuelve el int 5.',
    source: SOURCE,
    tags: ['Sobrecarga', 'Polimorfismo estático'],
  },
  {
    id: 'u05-q18',
    unitId: 5,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `class Animal {
    public void describir() {
        System.out.println("Soy un animal");
    }
}

class Perro extends Animal {
    @Override
    public void describir() {
        super.describir();
        System.out.println("y soy un perro");
    }
}

// En el main:
new Perro().describir();`,
    options: [
      'Soy un animal y después y soy un perro',
      'Solamente y soy un perro',
      'Solamente Soy un animal',
      'No compila: super sólo puede usarse en constructores.',
    ],
    correctIndex: 0,
    explanation:
      'La llamada super.describir() ejecuta la versión de la superclase y después sigue el cuerpo del método hijo. A diferencia de los constructores, la llamada a super en un método común es opcional y puede ir en cualquier lugar del cuerpo.',
    source: SOURCE,
    tags: ['super', 'Sobrescritura'],
  },
  {
    id: 'u05-q19',
    unitId: 5,
    type: 'vf',
    difficulty: 'avanzado',
    prompt:
      'La llamada a super dentro de un método común debe ser obligatoriamente la primera sentencia, igual que en los constructores.',
    answer: false,
    explanation:
      'El material marca la diferencia: en contra de la regla de los constructores, la llamada a super en un método puede ocurrir en cualquier lugar del cuerpo. Además no se genera automáticamente ni es obligatoria, es completamente opcional.',
    source: SOURCE,
    tags: ['super', 'Sobrescritura'],
  },
  {
    id: 'u05-q20',
    unitId: 5,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `class A {
    public void saludar() {
        System.out.println("Hola desde A");
    }
}

class B extends A {
    @Override
    public void saludar() {
        System.out.println("Hola desde B");
    }
}

class C extends B {
    @Override
    public void saludar() {
        System.out.println("Hola desde C");
    }
}

// En el main:
A objeto = new C();
objeto.saludar();`,
    options: [
      'Hola desde C',
      'Hola desde A',
      'Hola desde B',
      'Las tres líneas, de A hacia C',
    ],
    correctIndex: 0,
    explanation:
      'La búsqueda del método comienza al final de la jerarquía, en la clase dinámica de la instancia. Como el objeto es un C, se ejecuta su versión. Cuando un método está sobrescrito sólo se ejecuta la última versión: las de las superclases no corren automáticamente.',
    source: SOURCE,
    tags: ['Sobrescritura', 'Enlace dinámico', 'Herencia multinivel'],
  },
  {
    id: 'u05-q21',
    unitId: 5,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `class Vehiculo { }
class Coche extends Vehiculo { }

// En el main:
Vehiculo v = new Coche();
if (v instanceof Coche) {
    System.out.println("es un coche");
} else {
    System.out.println("no es un coche");
}`,
    options: [
      'es un coche',
      'no es un coche',
      'No compila: v está declarada como Vehiculo.',
      'Lanza ClassCastException.',
    ],
    correctIndex: 0,
    explanation:
      'instanceof evalúa el tipo real del objeto, no el declarado. La variable es de tipo Vehiculo por sustitución, pero el objeto que contiene es un Coche, así que la comprobación da verdadero. Ésta es la verificación previa recomendada antes de castear.',
    source: SOURCE,
    tags: ['instanceof', 'Casting'],
  },
  {
    id: 'u05-q22',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué es la SUSTITUCIÓN en la jerarquía de tipos?',
    options: [
      'Poder usar objetos de subtipos en cualquier lugar donde se espera un objeto del supertipo.',
      'Reemplazar el cuerpo de un método heredado por otro distinto.',
      'Cambiar el tipo declarado de una variable después de crearla.',
      'Sustituir una clase concreta por una abstracta en la jerarquía.',
    ],
    correctIndex: 0,
    explanation:
      'El tipo definido por la clase padre es el supertipo y el de la clase hija es el subtipo. Se pueden usar objetos de subtipos donde se espera el supertipo: eso es la sustitución, y por eso las variables que contienen objetos son variables polimórficas.',
    source: SOURCE,
    tags: ['Sustitución', 'Polimorfismo'],
  },
  {
    id: 'u05-q23',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál de estas NO es una ventaja de la herencia que mencione el material?',
    options: [
      'Permite que una clase herede de varias superclases a la vez.',
      'Reutilización de código ya escrito y probado.',
      'Mantenibilidad: un cambio en la clase padre se refleja en las hijas.',
      'Modularidad: ayuda a organizar y estructurar el código.',
    ],
    correctIndex: 0,
    explanation:
      'Java implementa herencia simple: una subclase puede tener sólo una superclase. Las otras tres sí figuran entre las ventajas, junto con el acceso a la gran cantidad de clases que provee la API de Java.',
    source: SOURCE,
    tags: ['Herencia'],
  },
  {
    id: 'u05-q24',
    unitId: 5,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Una superclase puede tener cualquier número de subclases.',
    answer: true,
    explanation:
      'Es una de las reglas de la herencia del material. La restricción va en el otro sentido: una subclase puede tener sólo una superclase directa.',
    source: SOURCE,
    tags: ['Herencia'],
  },
  {
    id: 'u05-q25',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué ocurre si una clase intenta heredar de una clase declarada como final?',
    options: [
      'Se produce un error de compilación.',
      'Se compila, pero la subclase no hereda ningún método.',
      'Se lanza una excepción en tiempo de ejecución.',
      'Se compila y la subclase sólo hereda los atributos públicos.',
    ],
    correctIndex: 0,
    explanation:
      'Si se quiere evitar que una clase sea heredada, se la declara con el modificador final. Si otra clase intenta extenderla, el error aparece en compilación.',
    source: SOURCE,
    tags: ['final', 'Herencia'],
  },
  {
    id: 'u05-q26',
    unitId: 5,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Si una subclase necesita leer un atributo privado de su superclase, ¿cuál es la salida correcta?',
    options: [
      'Que la superclase ofrezca los métodos de acceso adecuados, como un getter.',
      'Declarar el atributo como private también en la subclase.',
      'Acceder directamente con super.atributo, que salta la restricción.',
      'Castear la subclase al tipo de la superclase antes de leerlo.',
    ],
    correctIndex: 0,
    explanation:
      'Una subclase no puede acceder a los miembros privados de la superclase. El material indica que, si los necesita, la superclase tiene que ofrecer los métodos apropiados, por ejemplo setters y getters. La otra alternativa es declarar el atributo como protected.',
    source: SOURCE,
    tags: ['Herencia', 'Modificadores de acceso'],
  },
  {
    id: 'u05-q27',
    unitId: 5,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué significa que el casteo "no cambia el objeto en nada"?',
    options: [
      'Que sólo permite usar la referencia de otra manera; el objeto en memoria sigue siendo el mismo.',
      'Que el casteo se descarta si el tipo no coincide, y el programa sigue.',
      'Que crea una copia del objeto con el nuevo tipo.',
      'Que convierte los atributos del objeto al nuevo tipo de dato.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo dice textualmente: el objeto no cambia en nada, simplemente se permite usar la referencia adecuadamente. En tiempo de ejecución se comprueba que el objeto sea realmente de ese tipo, y si no lo es se lanza ClassCastException. Por eso recomienda usarlo con moderación.',
    source: SOURCE,
    tags: ['Casting'],
  },
]
