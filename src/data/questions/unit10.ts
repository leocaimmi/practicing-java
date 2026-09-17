import type { Question } from '../../types'

const SOURCE = 'Clase 10 — Colecciones. List y Queue. Comparable'

export const unit10: Question[] = [
  {
    id: 'u10-q01',
    unitId: 10,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'La interfaz List permite almacenar elementos duplicados y acceder a ellos mediante un índice.',
    answer: true,
    explanation:
      'Ésas son sus dos características distintivas junto con el orden secuencial: agrupa los elementos uno detrás del otro, permite el acceso mediante un índice que representa su ubicación numérica y admite duplicados.',
    source: SOURCE,
    tags: ['List'],
  },
  {
    id: 'u10-q02',
    unitId: 10,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Como Collection es una interfaz, no pueden construirse objetos de tipo Collection.',
    answer: true,
    explanation:
      'Collection es la raíz de todas las interfaces y clases de colecciones, y define las operaciones que deben implementar List, Set y Queue. Al ser una interfaz y no una clase, no se pueden construir objetos de ese tipo.',
    source: SOURCE,
    tags: ['Collection'],
  },
  {
    id: 'u10-q03',
    unitId: 10,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué ventaja tiene un ArrayList frente a un arreglo común?',
    options: [
      'No es necesario declarar su tamaño inicial y puede crecer automáticamente mediante redimensionamiento.',
      'Permite almacenar elementos de tipos distintos dentro de la misma colección.',
      'Garantiza que los elementos queden siempre ordenados por su valor natural.',
      'Ocupa menos memoria porque no almacena referencias.',
    ],
    correctIndex: 0,
    explanation:
      'El ArrayList almacena datos de forma similar a un array pero dinámica: no hace falta declarar el tamaño inicial y, al superarse la capacidad, crea internamente un array más grande, copia los elementos y descarta el anterior.',
    source: SOURCE,
    tags: ['ArrayList'],
  },
  {
    id: 'u10-q04',
    unitId: 10,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime por consola?',
    code: `List<String> nombres = new ArrayList<>();
nombres.add("Ana");
nombres.add("Juan");
nombres.add("Ana");
System.out.println(nombres.size());
System.out.println(nombres.indexOf("Ana"));`,
    options: [
      '3 y luego 0',
      '2 y luego 0',
      '3 y luego 2',
      '2 y luego 1',
    ],
    correctIndex: 0,
    explanation:
      'List admite duplicados, de modo que "Ana" se agrega dos veces y size() devuelve 3. indexOf() retorna el índice de la primera aparición del objeto, que es la posición 0.',
    source: SOURCE,
    tags: ['ArrayList', 'List'],
  },
  {
    id: 'u10-q05',
    unitId: 10,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué ocurre al ejecutarlo?',
    code: `List<String> nombres = new ArrayList<>();
nombres.add("Ana");
nombres.add("Juan");

for (String n : nombres) {
    if (n.equals("Ana")) {
        nombres.remove(n);
    }
}`,
    options: [
      'Falla en tiempo de ejecución: no se pueden agregar ni eliminar elementos de un listado mientras se lo recorre con un for each.',
      'Funciona sin problemas y la lista queda con un solo elemento.',
      'No compila, porque remove() no acepta un String como parámetro.',
      'Funciona, pero elimina todos los elementos de la lista.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo advierte expresamente: con un for each no se pueden agregar ni eliminar datos de un listado mientras se lo recorre. Se puede modificar internamente un elemento, pero no el listado mismo. Para hacerlo hay que usar un Iterator.',
    source: SOURCE,
    tags: ['for each', 'Iterator'],
  },
  {
    id: 'u10-q06',
    unitId: 10,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿En qué caso conviene una LinkedList por sobre un ArrayList?',
    options: [
      'Cuando la aplicación requiere inserciones y eliminaciones frecuentes en el medio de la colección.',
      'Cuando se necesita búsqueda frecuente de elementos por índice.',
      'Cuando se busca minimizar el consumo de memoria por elemento.',
      'Cuando se necesita que los elementos queden ordenados automáticamente.',
    ],
    correctIndex: 0,
    explanation:
      'El resumen del material es claro: el ArrayList conviene cuando hay búsqueda frecuente por índice y las altas y bajas se hacen al final; la LinkedList conviene cuando las inserciones y eliminaciones son frecuentes, ya que sólo hay que cambiar los enlaces entre nodos.',
    source: SOURCE,
    tags: ['ArrayList', 'LinkedList'],
  },
  {
    id: 'u10-q07',
    unitId: 10,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Cómo está implementada internamente una LinkedList?',
    options: [
      'Como una lista doblemente enlazada de nodos, donde cada nodo guarda el dato y los enlaces al anterior y al siguiente.',
      'Como un arreglo redimensionable que se copia cuando se llena.',
      'Como un árbol binario de búsqueda balanceado.',
      'Como una tabla de dispersión con función hash.',
    ],
    correctIndex: 0,
    explanation:
      'Su implementación se basa en una lista doblemente enlazada de tamaño ilimitado. Cada nodo contiene tres componentes: el dato, un enlace al nodo anterior y otro al siguiente, lo que permite recorrerla en ambos sentidos.',
    source: SOURCE,
    tags: ['LinkedList'],
  },
  {
    id: 'u10-q08',
    unitId: 10,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué métodos representan el comportamiento FIFO de la interfaz Queue?',
    options: [
      'offer(e), poll() y peek()',
      'push(e), pop() y empty()',
      'add(i, e), get(i) y set(i, e)',
      'first(), last() y higher()',
    ],
    correctIndex: 0,
    explanation:
      'Queue modela el comportamiento FIFO con offer(), que inserta al final; poll(), que elimina y retorna el primero o null si está vacía; y peek(), que retorna el primero sin eliminarlo. Los métodos push, pop y empty corresponden al comportamiento LIFO de Deque.',
    source: SOURCE,
    tags: ['Queue', 'FIFO'],
  },
  {
    id: 'u10-q09',
    unitId: 10,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Cuál es la diferencia entre ArrayDeque y LinkedList?',
    options: [
      'Ambas implementan Deque, pero LinkedList además implementa List, por lo que admite acceso por índice y ArrayDeque no.',
      'ArrayDeque sólo sirve como pila y LinkedList sólo como cola.',
      'ArrayDeque mantiene los elementos ordenados y LinkedList no.',
      'LinkedList no admite el comportamiento LIFO, porque no implementa Deque.',
    ],
    correctIndex: 0,
    explanation:
      'Las dos implementan Deque y por lo tanto también Queue, de modo que ambas pueden funcionar como pila (push, pop, peek) o como cola (offer, poll, peek). La diferencia es que LinkedList además implementa List y se maneja con índice.',
    source: SOURCE,
    tags: ['Deque', 'ArrayDeque', 'LinkedList'],
  },
  {
    id: 'u10-q10',
    unitId: 10,
    type: 'vf',
    difficulty: 'intermedio',
    prompt:
      'Para poder eliminar un objeto de una colección por igualdad, es necesario haber sobrescrito el método equals() en la clase propia.',
    answer: true,
    explanation:
      'Al eliminar por igualdad se evalúa cada elemento con elementoArray.equals(p1). Si la clase propia no sobrescribe equals(), se usa el de Object, que compara referencias, y la eliminación no funciona como se espera.',
    source: SOURCE,
    tags: ['equals', 'ArrayList'],
  },
  {
    id: 'u10-q11',
    unitId: 10,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué hace el método set(int index, Object element) de la interfaz List?',
    options: [
      'Reemplaza el elemento que está en la posición indicada por el nuevo elemento.',
      'Inserta el elemento en la posición indicada y desplaza los siguientes.',
      'Agrega el elemento al final de la lista.',
      'Devuelve el elemento que está en la posición indicada.',
    ],
    correctIndex: 0,
    explanation:
      'set() reemplaza el elemento de la posición index. El que inserta desplazando los existentes es add(int índice, E elemento), y el que devuelve el elemento de una posición es get(int índice).',
    source: SOURCE,
    tags: ['List'],
  },
  {
    id: 'u10-q12',
    unitId: 10,
    type: 'mc',
    difficulty: 'avanzado',
    prompt:
      '¿Cuál es una desventaja del ArrayList que menciona el material, además del costo de redimensionar?',
    options: [
      'Agregar y eliminar elementos en el medio de la lista es lento, porque hay que mover todos los elementos subsiguientes.',
      'No permite recorrerse con un for each.',
      'No admite objetos de clases creadas por el programador.',
      'Pierde el orden de inserción de los elementos.',
    ],
    correctIndex: 0,
    explanation:
      'El material lista tres desventajas: el costo de redimensionar, la lentitud al agregar o eliminar en el medio por tener que mover los elementos subsiguientes, y que no están sincronizados, lo que obliga a controlar la concurrencia de acceso.',
    source: SOURCE,
    tags: ['ArrayList'],
  },
  {
    id: 'u10-q13',
    unitId: 10,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuál de estos métodos NO pertenece a la interfaz Collection?',
    options: [
      'get(int índice)',
      'add(E e)',
      'contains(Object o)',
      'isEmpty()',
    ],
    correctIndex: 0,
    explanation:
      'get(int índice) es propio de List, porque implica acceso posicional y no todas las colecciones lo tienen: un Set, por ejemplo, no admite acceso por índice. Los otros tres sí están entre los métodos de instancia que define Collection.',
    source: SOURCE,
    tags: ['Collection', 'List'],
  },
  {
    id: 'u10-q14',
    unitId: 10,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `LinkedList<String> cola = new LinkedList<>();
cola.addLast("b");
cola.addFirst("a");
cola.addLast("c");
System.out.println(cola);`,
    options: ['[a, b, c]', '[b, a, c]', '[c, b, a]', '[a, c, b]'],
    correctIndex: 0,
    explanation:
      'addFirst() agrega al principio accediendo directamente al inicio de la lista y addLast() al final. Después de las tres operaciones, "a" quedó adelante de "b", y "c" al final.',
    source: SOURCE,
    tags: ['LinkedList'],
  },
  {
    id: 'u10-q15',
    unitId: 10,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código, que usa la lista como una cola FIFO. ¿Qué imprime?',
    code: `Queue<String> fila = new LinkedList<>();
fila.offer("primero");
fila.offer("segundo");
System.out.println(fila.peek());
System.out.println(fila.poll());
System.out.println(fila.size());`,
    options: [
      'primero, primero y luego 1',
      'primero, segundo y luego 1',
      'segundo, primero y luego 0',
      'primero, primero y luego 2',
    ],
    correctIndex: 0,
    explanation:
      'offer() inserta al final. peek() retorna el primero SIN eliminarlo, así que muestra "primero" y la cola sigue con dos. poll() elimina y retorna el primero, con lo que vuelve a mostrar "primero" y quedan 1 elemento.',
    source: SOURCE,
    tags: ['Queue', 'FIFO'],
  },
  {
    id: 'u10-q16',
    unitId: 10,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código, que usa la lista como una pila LIFO. ¿Qué imprime?',
    code: `LinkedList<Integer> pila = new LinkedList<>();
pila.push(1);
pila.push(2);
pila.push(3);
System.out.println(pila.pop());
System.out.println(pila.peek());`,
    options: ['3 y luego 2', '1 y luego 2', '3 y luego 1', '1 y luego 3'],
    correctIndex: 0,
    explanation:
      'push introduce un elemento en el tope de la pila, así que el 3 queda arriba. pop quita y retorna el del tope, es decir 3. peek retorna sin eliminar el nuevo tope, que pasó a ser el 2.',
    source: SOURCE,
    tags: ['Deque', 'LIFO'],
  },
  {
    id: 'u10-q17',
    unitId: 10,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Se necesita eliminar elementos de una lista mientras se la recorre. ¿Qué corresponde usar?',
    options: [
      'Un Iterator, que sí permite modificar el listado durante el recorrido.',
      'Un for each, que es la forma moderna de recorrer.',
      'Un for con índice, que evita el problema por completo.',
      'No se puede eliminar de una lista bajo ninguna forma de recorrido.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo advierte expresamente: con un for each no se pueden agregar ni eliminar datos del listado mientras se lo recorre, aunque sí modificar internamente un elemento. Para modificar el listado hay que usar Iterator.',
    source: SOURCE,
    tags: ['Iterator', 'for each'],
  },
  {
    id: 'u10-q18',
    unitId: 10,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué devuelve el método indexOf(Object objeto) de una List cuando el objeto no está?',
    options: ['-1', '0', 'null', 'Lanza IndexOutOfBoundsException'],
    correctIndex: 0,
    explanation:
      'indexOf() devuelve el índice de la primera aparición del objeto especificado, o -1 si no está en la lista. lastIndexOf() hace lo mismo con la última aparición.',
    source: SOURCE,
    tags: ['List'],
  },
  {
    id: 'u10-q19',
    unitId: 10,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué devuelve subList(int inicio, int fin)?',
    options: [
      'Una vista de la sublista desde el índice de inicio inclusive hasta el de fin exclusive.',
      'Una copia independiente de la lista original completa.',
      'La cantidad de elementos que hay entre las dos posiciones.',
      'Una nueva lista con los elementos que quedan fuera del rango.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo define así: devuelve una vista de sublista de la lista original, que abarca desde el índice de inicio (inclusive) hasta el índice de fin (exclusive). Es la misma convención que substring() en String.',
    source: SOURCE,
    tags: ['List'],
  },
  {
    id: 'u10-q20',
    unitId: 10,
    type: 'vf',
    difficulty: 'avanzado',
    prompt: 'Los ArrayList están sincronizados, así que varios hilos pueden usarlos sin precauciones.',
    answer: false,
    explanation:
      'Es una de las desventajas que marca el material: no están sincronizados. Si múltiples hilos acceden a un mismo ArrayList concurrentemente puede haber problemas de consistencia de datos, así que hay que controlar la concurrencia de acceso.',
    source: SOURCE,
    tags: ['ArrayList'],
  },
  {
    id: 'u10-q21',
    unitId: 10,
    type: 'mc',
    difficulty: 'avanzado',
    prompt:
      'Si hay que agregar y eliminar elementos siempre al FINAL de la colección, ¿qué conviene y por qué?',
    options: [
      'ArrayList, porque se accede directamente a la posición y no hay que modificar enlaces entre nodos.',
      'LinkedList, porque las altas y bajas siempre son más rápidas ahí.',
      'Da exactamente lo mismo: las dos tienen el mismo costo en los extremos.',
      'TreeSet, porque mantiene el orden sin costo adicional.',
    ],
    correctIndex: 0,
    explanation:
      'El material matiza la regla general: si se agrega o elimina al final, es más rápido el ArrayList, porque accede directamente a la posición. La LinkedList gana cuando hay que insertar o borrar en el medio, aunque ahí también hay que iterar hasta la posición.',
    source: SOURCE,
    tags: ['ArrayList', 'LinkedList'],
  },
  {
    id: 'u10-q22',
    unitId: 10,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué hace el método estático Collections.reverse(List lista)?',
    options: [
      'Invierte el orden de los elementos de la lista.',
      'Devuelve una copia invertida y deja intacta la original.',
      'Ordena la lista de mayor a menor según el orden natural.',
      'Invierte el signo de los elementos numéricos.',
    ],
    correctIndex: 0,
    explanation:
      'Está entre los métodos estáticos que enumera el material, junto con addAll, copy, frequency, max y min. Invierte el orden actual de la lista; no la ordena.',
    source: SOURCE,
    tags: ['Collections'],
  },
  {
    id: 'u10-q23',
    unitId: 10,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué requisito tienen los elementos para poder usar Collections.max(Collection c)?',
    options: [
      'Tienen que implementar Comparable.',
      'Tienen que sobrescribir toString().',
      'Tienen que estar ordenados de antemano.',
      'Tienen que ser tipos primitivos.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo aclara junto al método: para max y min los elementos tienen que implementar Comparable, porque hace falta un orden para poder compararlos. Para frequency, en cambio, el objeto debe implementar equals().',
    source: SOURCE,
    tags: ['Collections', 'Comparable'],
  },
  {
    id: 'u10-q24',
    unitId: 10,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `List<String> l = new ArrayList<>();
l.add("a");
l.add("b");
l.add(1, "x");
System.out.println(l);`,
    options: ['[a, x, b]', '[a, b, x]', '[x, a, b]', '[a, x]'],
    correctIndex: 0,
    explanation:
      'add(int índice, E elemento) inserta en la posición indicada y desplaza hacia adelante los elementos existentes. La "x" entra en la posición 1 y la "b" pasa a la 2.',
    source: SOURCE,
    tags: ['List', 'ArrayList'],
  },
]
