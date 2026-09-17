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
]
