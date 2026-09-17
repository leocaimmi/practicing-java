import type { Question } from '../../types'

const SOURCE = 'Clase 12 — Colecciones de tipo Map'

export const unit12: Question[] = [
  {
    id: 'u12-q01',
    unitId: 12,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'La interfaz Map hereda de la interfaz Collection.',
    answer: false,
    explanation:
      'Aunque muchas veces se hable de los mapas como colecciones, en rigor no lo son: no heredan de Collection, porque su estructura de pares clave-valor difiere de la de las colecciones que manejan listas o conjuntos de valores. Los mapas se definen en la interfaz Map.',
    source: SOURCE,
    tags: ['Map', 'Collection'],
  },
  {
    id: 'u12-q02',
    unitId: 12,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'En un Map no se admiten claves duplicadas, pero sí valores repetidos.',
    answer: true,
    explanation:
      'La clave funciona como identificador único y no se admiten claves duplicadas. Para cada clave hay un solo valor, aunque diferentes claves pueden asociarse con el mismo valor.',
    source: SOURCE,
    tags: ['Map'],
  },
  {
    id: 'u12-q03',
    unitId: 12,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime por consola?',
    code: `Map<String, Integer> edades = new HashMap<>();
edades.put("Ana", 20);
edades.put("Juan", 30);
edades.put("Ana", 25);
System.out.println(edades.size());
System.out.println(edades.get("Ana"));`,
    options: [
      '2 y luego 25',
      '3 y luego 25',
      '2 y luego 20',
      '3 y luego 20',
    ],
    correctIndex: 0,
    explanation:
      'put() inserta el par clave-valor, pero si la clave ya existe el valor anterior se reemplaza por el nuevo. No se crea una segunda entrada para "Ana": el mapa queda con dos claves y el valor asociado pasa a ser 25.',
    source: SOURCE,
    tags: ['Map', 'HashMap', 'put'],
  },
  {
    id: 'u12-q04',
    unitId: 12,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué devuelve el método entrySet() de un Map?',
    options: [
      'Un Set con las entradas del mapa, es decir con los pares clave-valor.',
      'Un Set únicamente con las claves del mapa.',
      'Una Collection únicamente con los valores del mapa.',
      'Un arreglo bidimensional con claves y valores.',
    ],
    correctIndex: 0,
    explanation:
      'Para iterar un Map se obtienen vistas: entrySet() retorna un Set de las entradas (los pares clave-valor), keySet() retorna un Set de las claves y values() retorna una Collection de los valores.',
    source: SOURCE,
    tags: ['Map', 'entrySet'],
  },
  {
    id: 'u12-q05',
    unitId: 12,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué en Map sólo hay métodos para buscar usando la clave y no directamente por el valor?',
    options: [
      'Porque el mapa trabaja siempre en términos de clave-valor y las claves son únicas; para buscar por valor hay que recorrer el mapa.',
      'Porque los valores no se almacenan realmente, sino que se calculan al momento de consultarlos.',
      'Porque buscar por valor sería más rápido y por eso está reservado a TreeMap.',
      'Porque los valores en un Map también deben ser únicos.',
    ],
    correctIndex: 0,
    explanation:
      'Las claves no pueden repetirse, pero los valores sí. Por eso get() y remove() operan sobre la clave. Existe containsValue(), que indica si el mapa contiene una o más claves asociadas a ese valor, pero recuperar por valor exige recorrer el mapa.',
    source: SOURCE,
    tags: ['Map'],
  },
  {
    id: 'u12-q06',
    unitId: 12,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué implementación de Map conviene cuando se necesita recorrer las entradas ordenadas por clave?',
    options: ['TreeMap', 'HashMap', 'LinkedHashMap', 'Cualquiera de las tres, porque todas ordenan por clave'],
    correctIndex: 0,
    explanation:
      'El TreeMap usa un árbol binario de búsqueda balanceado (rojo-negro) y permite tener un mapa ordenado: la iteración es en orden ascendente según las claves. Es el único ordenado de los tres, aunque su costo es O(log n).',
    source: SOURCE,
    tags: ['TreeMap'],
  },
  {
    id: 'u12-q07',
    unitId: 12,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a un LinkedHashMap?',
    options: [
      'Mantiene una lista doblemente vinculada además de la tabla hash, por lo que conserva el orden de inserción.',
      'Ordena las entradas de forma ascendente según la clave.',
      'Admite claves duplicadas, a diferencia de HashMap.',
      'Es la única implementación de Map que admite claves null.',
    ],
    correctIndex: 0,
    explanation:
      'Es similar a HashMap, pero al mantener una lista doblemente vinculada los elementos quedan agregados en orden de inserción. Eso permite iteraciones predecibles y ordenadas sin sacrificar de forma significativa el rendimiento del HashMap.',
    source: SOURCE,
    tags: ['LinkedHashMap'],
  },
  {
    id: 'u12-q08',
    unitId: 12,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'Un HashMap admite una sola clave null.',
    answer: true,
    explanation:
      'El HashMap almacena los objetos en una tabla de dispersión sin orden y sólo admite una clave null, en coherencia con la regla de unicidad de las claves.',
    source: SOURCE,
    tags: ['HashMap'],
  },
  {
    id: 'u12-q09',
    unitId: 12,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué devuelve el método remove(Object key) de un Map?',
    options: [
      'El valor al que la clave estaba asociada previamente, o null si no la encuentra.',
      'true o false según haya podido eliminar la entrada.',
      'La cantidad de entradas que quedan en el mapa.',
      'La clave eliminada.',
    ],
    correctIndex: 0,
    explanation:
      'remove(Object key) elimina el par clave-valor y devuelve el valor al que la clave estaba previamente asociada, o null si no la encuentra. La versión que devuelve boolean es remove(Object key, Object value), que borra sólo si la clave está asociada exactamente a ese valor.',
    source: SOURCE,
    tags: ['Map', 'remove'],
  },
  {
    id: 'u12-q10',
    unitId: 12,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué devuelve el método higherKey(key) de un TreeMap?',
    options: [
      'La menor clave estrictamente mayor a la pasada por parámetro, o null si no existe.',
      'La mayor clave estrictamente menor a la pasada por parámetro, o null si no existe.',
      'La menor clave mayor o igual a la pasada por parámetro.',
      'La última clave del mapa en el orden establecido.',
    ],
    correctIndex: 0,
    explanation:
      'higherKey() devuelve la menor clave estrictamente mayor a la del parámetro. lowerKey() hace lo inverso, ceilingKey() retorna la menor clave mayor o igual, y lastKey() devuelve la más grande del orden.',
    source: SOURCE,
    tags: ['TreeMap'],
  },
  {
    id: 'u12-q11',
    unitId: 12,
    type: 'vf',
    difficulty: 'avanzado',
    prompt:
      'Si se usan objetos de una clase creada por el programador como clave de un TreeMap, esa clase debe implementar Comparable.',
    answer: true,
    explanation:
      'El TreeMap ordena las claves de forma ascendente cuando se usan clases propias de Java, como String o Integer. Si la clave es una clase creada por el programador, hay que implementarle la interfaz Comparable.',
    source: SOURCE,
    tags: ['TreeMap', 'Comparable'],
  },
  {
    id: 'u12-q12',
    unitId: 12,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Se necesita una estructura para acceder a registros por una clave única con la máxima velocidad, sin importar el orden. ¿Cuál corresponde?',
    options: ['HashMap', 'TreeMap', 'LinkedHashSet', 'ArrayList'],
    correctIndex: 0,
    explanation:
      'El HashMap es el más eficiente de las implementaciones de Map en las operaciones estándar, con tiempo promedio constante en la búsqueda por clave, a costa de no garantizar ningún orden.',
    source: SOURCE,
    tags: ['HashMap', 'Decisión'],
  },
]
