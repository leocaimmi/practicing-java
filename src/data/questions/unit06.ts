import type { Question } from '../../types'

const SOURCE = 'Clase 6 — Encapsulamiento. Clases y métodos abstractos'

export const unit06: Question[] = [
  {
    id: 'u06-q01',
    unitId: 6,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Una clase abstracta no puede instanciarse directamente con el operador new.',
    answer: true,
    explanation:
      'Ésa es su diferencia central con una clase concreta: no se pueden crear objetos de una clase abstracta. Se usa como plantilla para definir el comportamiento común de un conjunto de clases relacionadas.',
    source: SOURCE,
    tags: ['abstract'],
  },
  {
    id: 'u06-q02',
    unitId: 6,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Una clase abstracta no puede tener constructores, porque nunca se instancia.',
    answer: false,
    explanation:
      'Sí puede definirlos. El material aclara que es posible definir constructores en las superclases abstractas: no sirven para crear instancias de ellas, sino para que las subclases los utilicen a través de la herencia.',
    source: SOURCE,
    tags: ['abstract', 'Constructores'],
  },
  {
    id: 'u06-q03',
    unitId: 6,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cómo se caracteriza un método abstracto?',
    options: [
      'Está precedido por la palabra abstract y no tiene cuerpo: su encabezado termina con punto y coma.',
      'Está precedido por la palabra abstract y su cuerpo debe estar vacío, entre llaves.',
      'Se declara sin modificador de acceso y retorna siempre void.',
      'Es un método que sólo puede invocarse desde la propia clase abstracta.',
    ],
    correctIndex: 0,
    explanation:
      'Los dos detalles que lo definen son estar precedido por abstract y no tener cuerpo: se especifica nombre, parámetros y tipo de retorno, y el encabezado termina en punto y coma, sin llaves.',
    source: SOURCE,
    tags: ['Métodos abstractos'],
  },
  {
    id: 'u06-q04',
    unitId: 6,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Una clase concreta puede contener métodos abstractos siempre que los declare como private.',
    answer: false,
    explanation:
      'No puede haber métodos abstractos en una clase concreta, sin importar el modificador. Si un método se declara abstracto, la clase entera debe marcarse como abstracta.',
    source: SOURCE,
    tags: ['abstract', 'Métodos abstractos'],
  },
  {
    id: 'u06-q05',
    unitId: 6,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Si una subclase no sobrescribe todos los métodos abstractos que hereda, ¿qué debe ocurrir para que el código compile?',
    options: [
      'La subclase también tiene que declararse como abstracta.',
      'Los métodos no implementados deben declararse como final.',
      'La superclase debe dejar de ser abstracta.',
      'Nada: los métodos abstractos no implementados se heredan con un cuerpo vacío.',
    ],
    correctIndex: 0,
    explanation:
      'Las subclases concretas están obligadas a sobrescribir todos los métodos abstractos que heredan. En caso de que no interese sobrescribir alguno, la subclase deberá declararse también abstracta.',
    source: SOURCE,
    tags: ['abstract', 'Herencia'],
  },
  {
    id: 'u06-q06',
    unitId: 6,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre en la última línea?',
    code: `abstract class Figura {
    public abstract double calcularArea();
}

class Circulo extends Figura {
    private double radio;

    public Circulo(double radio) {
        this.radio = radio;
    }

    @Override
    public double calcularArea() {
        return Math.PI * radio * radio;
    }
}

// En el main:
Figura f = new Figura();`,
    options: [
      'Error de compilación: Figura es abstracta y no puede instanciarse.',
      'Compila y crea un objeto con calcularArea() devolviendo 0.',
      'Compila, pero lanza una excepción en tiempo de ejecución.',
      'Error de compilación, porque Circulo no implementó correctamente el método abstracto.',
    ],
    correctIndex: 0,
    explanation:
      'Circulo está bien: sobrescribe el único método abstracto heredado. El problema es la última línea, que intenta instanciar la clase abstracta. Lo válido sería Figura f = new Circulo(3), aprovechando la sustitución.',
    source: SOURCE,
    tags: ['abstract'],
  },
  {
    id: 'u06-q07',
    unitId: 6,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿En qué consiste el encapsulamiento?',
    options: [
      'En ocultar los detalles internos de una clase y ofrecer una interfaz pública para acceder a sus datos y métodos.',
      'En agrupar varias clases dentro de un mismo paquete para organizarlas.',
      'En impedir que una clase pueda ser heredada por otras.',
      'En convertir todos los atributos de una clase en constantes.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo define como el mecanismo de ocultar los detalles internos de una clase y proporcionar una interfaz pública para acceder a los datos y métodos. En la práctica se implementa con atributos privados y métodos de acceso.',
    source: SOURCE,
    tags: ['Encapsulamiento'],
  },
  {
    id: 'u06-q08',
    unitId: 6,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: 'En el ejemplo de la clase Libro, ¿qué ventaja aporta encapsular el atributo disponible?',
    options: [
      'Garantiza que el estado sólo se modifique de maneras lógicamente coherentes, evitando inconsistencias.',
      'Reduce el espacio que ocupa el objeto en el heap.',
      'Permite que la clase Libro pueda instanciarse sin constructor.',
      'Obliga a que todas las subclases de Libro reimplementen el atributo.',
    ],
    correctIndex: 0,
    explanation:
      'Al encapsular ese estado y exponer sólo prestar() y devolver(), se asegura que la disponibilidad se modifique de maneras coherentes, previniendo casos como un libro marcado erróneamente como disponible cuando está prestado.',
    source: SOURCE,
    tags: ['Encapsulamiento'],
  },
  {
    id: 'u06-q09',
    unitId: 6,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué un método se define como abstracto?',
    options: [
      'Porque en ese momento no se conoce cómo debe ser su implementación, y serán las subclases las responsables de darle cuerpo.',
      'Porque su implementación es tan extensa que conviene ubicarla en otra clase.',
      'Porque se trata de un método que sólo se ejecuta una vez por programa.',
      'Porque necesita acceder a atributos privados de otras clases.',
    ],
    correctIndex: 0,
    explanation:
      'El material es explícito: se declara abstracto porque en ese momento no se conoce cómo ha de ser su implementación, y serán las subclases de la clase abstracta las responsables de darle cuerpo mediante la sobrescritura.',
    source: SOURCE,
    tags: ['Métodos abstractos'],
  },
  {
    id: 'u06-q10',
    unitId: 6,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿En qué consiste la abstracción como pilar de la POO?',
    options: [
      'En representar un objeto en su forma más esencial y general, sin ocuparse de los detalles de implementación.',
      'En impedir el acceso directo a los atributos desde fuera de la clase.',
      'En permitir que un mismo método se comporte distinto según el objeto que lo invoque.',
      'En reutilizar el código de una clase existente creando una clase derivada.',
    ],
    correctIndex: 0,
    explanation:
      'La abstracción es la capacidad de representar un objeto en su forma más esencial, abstracta y general, sin preocuparse por los detalles específicos de su implementación. Las otras opciones describen encapsulamiento, polimorfismo y herencia.',
    source: SOURCE,
    tags: ['Abstracción', 'POO'],
  },
  {
    id: 'u06-q11',
    unitId: 6,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Una clase abstracta puede tener métodos concretos, con su cuerpo implementado.',
    answer: true,
    explanation:
      'Una clase abstracta es similar a una concreta: posee atributos y métodos, y puede combinar métodos concretos con abstractos. La diferencia es que no se puede instanciar. Una interfaz, en cambio, sólo puede tener métodos abstractos.',
    source: SOURCE,
    tags: ['abstract'],
  },
  {
    id: 'u06-q12',
    unitId: 6,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre al compilarlo?',
    code: `abstract class Figura {
    public abstract double calcularArea();
    public abstract String describir();
}

class Cuadrado extends Figura {
    private double lado;

    public Cuadrado(double lado) {
        this.lado = lado;
    }

    @Override
    public double calcularArea() {
        return lado * lado;
    }
}`,
    options: [
      'No compila: Cuadrado no implementa describir() y tampoco se declara abstracta.',
      'Compila: alcanza con implementar uno de los dos métodos abstractos.',
      'Compila, y describir() devuelve null por omisión.',
      'No compila: una clase abstracta no puede tener más de un método abstracto.',
    ],
    correctIndex: 0,
    explanation:
      'Las subclases concretas están obligadas a sobrescribir todos los métodos abstractos que heredan. Si no interesa implementar alguno, la subclase debe declararse también como abstracta.',
    source: SOURCE,
    tags: ['abstract', 'Métodos abstractos'],
  },
  {
    id: 'u06-q13',
    unitId: 6,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuál de estas NO es una ventaja del encapsulamiento según el material?',
    options: [
      'Permite que cualquier clase modifique directamente los atributos, lo que agiliza el código.',
      'Ayuda a mantener la integridad de los datos de la clase.',
      'Hace más fáciles los cambios internos de la clase.',
      'Facilita la reutilización del código y mejora su seguridad.',
    ],
    correctIndex: 0,
    explanation:
      'El encapsulamiento va en el sentido contrario: impide el acceso directo para que el estado sólo se modifique de maneras lógicamente coherentes. Las otras tres sí son las ventajas que enumera el material.',
    source: SOURCE,
    tags: ['Encapsulamiento'],
  },
  {
    id: 'u06-q14',
    unitId: 6,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `public class Cuenta {
    private double saldo = 0;

    public void depositar(double monto) {
        if (monto > 0) {
            saldo += monto;
        }
    }

    public double getSaldo() {
        return saldo;
    }
}

// En el main:
Cuenta c = new Cuenta();
c.depositar(500);
c.depositar(-200);
System.out.println(c.getSaldo());`,
    options: [
      '500.0',
      '300.0',
      '700.0',
      'No compila: saldo es privado y no se puede modificar.',
    ],
    correctIndex: 0,
    explanation:
      'Es el beneficio del encapsulamiento: como el atributo es privado y sólo se toca a través de depositar(), el método puede imponer la regla de negocio y rechazar el monto negativo. El saldo queda en 500.0, y se imprime con decimal por ser double.',
    source: SOURCE,
    tags: ['Encapsulamiento'],
  },
  {
    id: 'u06-q15',
    unitId: 6,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Para qué sirve un getter?',
    options: [
      'Para obtener o recuperar el valor ya asignado a un atributo y poder utilizarlo.',
      'Para asignarle un valor a un atributo de forma explícita.',
      'Para inicializar todos los atributos al crear el objeto.',
      'Para eliminar el valor de un atributo y dejarlo en null.',
    ],
    correctIndex: 0,
    explanation:
      'Del inglés get (obtener), el getter sirve para recuperar o acceder al valor de un atributo. El que asigna es el setter, que nunca retorna nada: siempre es void.',
    source: SOURCE,
    tags: ['Getters y setters', 'Encapsulamiento'],
  },
  {
    id: 'u06-q16',
    unitId: 6,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cuántos métodos de acceso recomienda crear el material por cada atributo encapsulado?',
    options: [
      'Dos: uno para obtener el dato y otro para modificarlo.',
      'Uno solo, que sirva para ambas cosas según los parámetros.',
      'Tres: uno para obtener, uno para modificar y uno para borrar.',
      'Ninguno: los atributos deberían ser públicos para evitar código repetido.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo indica al presentar el ejemplo de la clase Gato: debe crearse un método para obtener el dato (get) y otro para modificarlo (set) por cada uno de los atributos.',
    source: SOURCE,
    tags: ['Getters y setters'],
  },
  {
    id: 'u06-q17',
    unitId: 6,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué permite la abstracción al separar la implementación de los métodos públicos?',
    options: [
      'Facilita la comprensión y el mantenimiento del código, y permite mayor modularidad y reutilización.',
      'Reduce la cantidad de memoria que ocupa cada objeto.',
      'Elimina la necesidad de escribir constructores.',
      'Permite que una clase herede de varias superclases.',
    ],
    correctIndex: 0,
    explanation:
      'Ésas son las ventajas que enumera el material: encapsular la complejidad de un objeto y separar la implementación de sus métodos públicos facilita la comprensión y el mantenimiento, y permite mayor modularidad y reutilización.',
    source: SOURCE,
    tags: ['Abstracción'],
  },
  {
    id: 'u06-q18',
    unitId: 6,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Las clases abstractas fueron pensadas para crear instancias de ellas y también para servir de superclase.',
    answer: false,
    explanation:
      'El material es explícito: son clases que NO fueron pensadas para crear instancias sino exclusivamente para servir como superclase de otra. Funcionan como plantilla del comportamiento común de un conjunto de clases relacionadas.',
    source: SOURCE,
    tags: ['abstract'],
  },
  {
    id: 'u06-q19',
    unitId: 6,
    type: 'mc',
    difficulty: 'avanzado',
    prompt:
      'Si una clase tiene al menos un método abstracto, ¿qué está obligada a hacer?',
    options: [
      'Declararse ella misma como abstracta.',
      'Declarar todos sus métodos como abstractos.',
      'Implementar una interfaz que declare ese método.',
      'Declarar el método como final para evitar ambigüedades.',
    ],
    correctIndex: 0,
    explanation:
      'La regla del material es directa: si un método se declara abstracto, se debe marcar la clase como abstracta. No puede haber métodos abstractos en una clase concreta.',
    source: SOURCE,
    tags: ['abstract', 'Métodos abstractos'],
  },
]
