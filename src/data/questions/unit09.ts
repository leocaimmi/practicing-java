import type { Question } from '../../types'

const SOURCE = 'Clase 9 — Interfaces. Comparable'

export const unit09: Question[] = [
  {
    id: 'u09-q01',
    unitId: 9,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Una interfaz puede contener variables de instancia y constructores.',
    answer: false,
    explanation:
      'Una interfaz no puede contener variables de instancia ni constructores, porque no es una clase y no se pueden crear objetos de ella. Sólo puede contener constantes y métodos sin implementar.',
    source: SOURCE,
    tags: ['Interfaces'],
  },
  {
    id: 'u09-q02',
    unitId: 9,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Una clase puede implementar varias interfaces al mismo tiempo.',
    answer: true,
    explanation:
      'Con las interfaces existe una suerte de herencia múltiple: una clase puede implementar una o varias interfaces, con la obligación de implementar los métodos de todas ellas. También puede heredar de una clase y a la vez implementar interfaces.',
    source: SOURCE,
    tags: ['Interfaces', 'Herencia múltiple'],
  },
  {
    id: 'u09-q03',
    unitId: 9,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué modificadores tienen implícitamente los métodos declarados en una interfaz?',
    options: [
      'public y abstract',
      'private y final',
      'protected y static',
      'default y synchronized',
    ],
    correctIndex: 0,
    explanation:
      'Todos los métodos dentro de una interfaz son públicos y abstractos por defecto, sin necesidad de declararlo explícitamente. En consecuencia, cada clase que implemente la interfaz debe implementarlos.',
    source: SOURCE,
    tags: ['Interfaces'],
  },
  {
    id: 'u09-q04',
    unitId: 9,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre al compilarlo?',
    code: `interface Mascota {
    void jugar();
    void hacerTruco();
}

class Perro implements Mascota {
    @Override
    public void jugar() {
        System.out.println("Corre atras de la pelota");
    }
}`,
    options: [
      'No compila: Perro no implementa hacerTruco() ni se declara como clase abstracta.',
      'Compila, y hacerTruco() queda con un cuerpo vacío heredado de la interfaz.',
      'Compila, porque basta con implementar al menos un método del contrato.',
      'No compila, porque los métodos de una interfaz no pueden declararse sin modificador de acceso.',
    ],
    correctIndex: 0,
    explanation:
      'Las clases que implementan una interfaz están obligadas a proporcionar una implementación para todos los métodos definidos en ella, o bien declararse como abstract. Acá falta hacerTruco().',
    source: SOURCE,
    tags: ['Interfaces', 'implements'],
  },
  {
    id: 'u09-q05',
    unitId: 9,
    type: 'mc',
    difficulty: 'avanzado',
    prompt:
      '¿Cuál es la diferencia central entre una clase abstracta y una interfaz en cuanto a la jerarquía de clases?',
    options: [
      'La clase abstracta pertenece a una jerarquía de clases; la interfaz no, por lo que clases sin relación de herencia pueden implementar la misma interfaz.',
      'La interfaz pertenece a una jerarquía de clases y la clase abstracta no.',
      'Ambas pertenecen a la misma jerarquía, pero la interfaz admite un solo nivel de profundidad.',
      'Ninguna de las dos participa de jerarquías: las dos son tipos independientes.',
    ],
    correctIndex: 0,
    explanation:
      'Ésa es la ventaja que destaca el material: las interfaces capturan similitudes entre clases no relacionadas sin forzar una relación entre ellas, lo que permite procesar polimórficamente objetos de clases que no comparten una raíz común.',
    source: SOURCE,
    tags: ['Interfaces', 'Clases abstractas'],
  },
  {
    id: 'u09-q06',
    unitId: 9,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué contrato debe respetar el método compareTo() de la interfaz Comparable?',
    options: [
      'Un entero negativo si el objeto es menor al del parámetro, cero si son iguales y un entero positivo si es mayor.',
      'true si el objeto es mayor al del parámetro y false en caso contrario.',
      'Siempre un valor entre -1 y 1, sin otros valores posibles.',
      'El resultado de restar los códigos hash de ambos objetos.',
    ],
    correctIndex: 0,
    explanation:
      'Ése es el contrato que especifica el material para a.compareTo(b): entero negativo si a es menor, cero si es igual y entero positivo si es mayor. Además, conviene que sea consistente con equals().',
    source: SOURCE,
    tags: ['Comparable', 'compareTo'],
  },
  {
    id: 'u09-q07',
    unitId: 9,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Si a.compareTo(b) devuelve 0, lo esperable es que a.equals(b) devuelva true, aunque el lenguaje no lo obliga.',
    answer: true,
    explanation:
      'El material lo plantea exactamente así: es importante que compareTo sea consistente con equals. No es obligatorio, pero muchas clases y métodos de Java asumen esa consistencia.',
    source: SOURCE,
    tags: ['Comparable', 'equals'],
  },
  {
    id: 'u09-q08',
    unitId: 9,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Cómo quedan ordenadas las personas al invocar Collections.sort()?',
    code: `class Persona implements Comparable<Persona> {
    String nombre;
    int edad;

    Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    @Override
    public int compareTo(Persona otra) {
        return this.edad - otra.edad;
    }
}`,
    options: [
      'De menor a mayor edad.',
      'De mayor a menor edad.',
      'Alfabéticamente por nombre.',
      'En el orden en que fueron agregadas a la lista, porque compareTo no afecta a sort().',
    ],
    correctIndex: 0,
    explanation:
      'La resta devuelve negativo cuando this.edad es menor que otra.edad, que según el contrato significa “este objeto es menor”. Los algoritmos de ordenación ubican primero a los menores, de modo que el resultado es ascendente por edad.',
    source: SOURCE,
    tags: ['Comparable', 'compareTo'],
  },
  {
    id: 'u09-q09',
    unitId: 9,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué ventaja aporta usar una interfaz como tipo de dato de una variable o parámetro?',
    options: [
      'El código se vuelve más flexible, porque acepta objetos de cualquier clase que implemente la interfaz, sin depender de la herencia.',
      'Permite instanciar la interfaz directamente cuando no hay implementaciones disponibles.',
      'Obliga a que todas las clases involucradas pertenezcan a la misma jerarquía.',
      'Mejora el rendimiento porque evita el uso del heap.',
    ],
    correctIndex: 0,
    explanation:
      'La interfaz es un tipo de dato de referencia y puede usarse en variables, parámetros y retornos. Así, un método puede recibir cualquier objeto que cumpla el contrato, sin importar de qué clase provenga.',
    source: SOURCE,
    tags: ['Interfaces', 'Polimorfismo'],
  },
  {
    id: 'u09-q10',
    unitId: 9,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué característica tienen los atributos declarados dentro de una interfaz?',
    options: [
      'Son automáticamente constantes public static final.',
      'Son variables de instancia privadas de cada clase que la implementa.',
      'Son atributos protegidos, accesibles sólo desde las implementaciones.',
      'No pueden declararse atributos de ningún tipo dentro de una interfaz.',
    ],
    correctIndex: 0,
    explanation:
      'Una interfaz no incluye declaración de variables de instancia, pero sí puede declarar constantes que luego usan las clases. Esos atributos son implícitamente public static final.',
    source: SOURCE,
    tags: ['Interfaces', 'Constantes'],
  },
  {
    id: 'u09-q11',
    unitId: 9,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'Cuando tanto una clase abstracta como una interfaz resuelven el problema, ¿qué recomienda el material?',
    options: [
      'Preferir la interfaz, por no estar limitada a la herencia simple y poder usarse como tipo de variable.',
      'Preferir la clase abstracta, porque permite definir constructores.',
      'Usar siempre ambas en conjunto, para cubrir los dos casos.',
      'Elegir según la cantidad de métodos: clase abstracta si son pocos, interfaz si son muchos.',
    ],
    correctIndex: 0,
    explanation:
      'El material señala que si se puede elegir, es preferible usar interfaces, por sus dos grandes ventajas: compartir constantes y métodos sin el límite de la herencia simple, y servir como tipo de variable para tratar de manera uniforme objetos de distintas clases.',
    source: SOURCE,
    tags: ['Interfaces', 'Clases abstractas'],
  },
]
