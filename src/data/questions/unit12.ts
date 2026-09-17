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
  {
    id: 'u12-q13',
    unitId: 12,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `Map<String, Integer> stock = new LinkedHashMap<>();
stock.put("clavos", 50);
stock.put("tornillos", 30);
System.out.println(stock.keySet());
System.out.println(stock.values());`,
    options: [
      '[clavos, tornillos] y luego [50, 30]',
      '[50, 30] y luego [clavos, tornillos]',
      '{clavos=50, tornillos=30} en las dos líneas',
      '[clavos, tornillos] y luego [clavos, tornillos]',
    ],
    correctIndex: 0,
    explanation:
      'keySet() retorna un Set con las claves y values() una Collection con los valores. El LinkedHashMap conserva el orden de inserción, así que ambas vistas respetan el orden en que se cargaron los pares.',
    source: SOURCE,
    tags: ['Map', 'keySet', 'values'],
  },
  {
    id: 'u12-q14',
    unitId: 12,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué imprime?',
    code: `Map<String, Integer> m = new HashMap<>();
m.put("a", 1);
System.out.println(m.containsKey("a"));
System.out.println(m.containsValue(1));
System.out.println(m.containsKey("b"));`,
    options: ['true, true y luego false', 'true, false y luego false', 'true, true y luego true', 'false, true y luego false'],
    correctIndex: 0,
    explanation:
      'containsKey() devuelve true si el mapa contiene esa clave y containsValue() si contiene una o más claves asociadas a ese valor. La clave "b" nunca se cargó, así que la última consulta da false.',
    source: SOURCE,
    tags: ['Map'],
  },
  {
    id: 'u12-q15',
    unitId: 12,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué conviene que la clave de un Map sea inmutable?',
    options: [
      'Porque funciona como identificador único y no debería cambiar en tiempo de ejecución.',
      'Porque de lo contrario el mapa no admitiría más de una clave.',
      'Porque las claves mutables ocupan más memoria.',
      'Porque es la única forma de que el mapa quede ordenado.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo plantea así al describir la interfaz: la clave funciona como identificador único, y conviene que sea inmutable (final) de modo que no cambie en tiempo de ejecución.',
    source: SOURCE,
    tags: ['Map'],
  },
  {
    id: 'u12-q16',
    unitId: 12,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Cuál es la forma correcta de recorrer un Map accediendo a la clave y al valor a la vez?',
    options: [
      'Iterando sobre entrySet(), que devuelve el conjunto de pares clave-valor.',
      'Iterando sobre values() y pidiéndole la clave a cada valor.',
      'Recorriendo el mapa con un for por índice.',
      'No se puede: hay que hacer dos recorridos separados.',
    ],
    correctIndex: 0,
    explanation:
      'El ejemplo del material recorre entrySet() con un Iterator y por cada Map.Entry pide getKey() y getValue(). keySet() y values() dan sólo una de las dos mitades.',
    source: SOURCE,
    tags: ['Map', 'entrySet'],
  },
  {
    id: 'u12-q17',
    unitId: 12,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué estructura usa internamente un TreeMap?',
    options: [
      'Un árbol binario de búsqueda balanceado, del tipo rojo-negro.',
      'Una tabla de dispersión sin orden.',
      'Una lista doblemente vinculada.',
      'Un arreglo redimensionable ordenado por clave.',
    ],
    correctIndex: 0,
    explanation:
      'Ésa es la implementación que describe el material, y es lo que le permite mantener las entradas ordenadas de forma ascendente según las claves, con un costo logarítmico en las operaciones básicas.',
    source: SOURCE,
    tags: ['TreeMap'],
  },
  {
    id: 'u12-q18',
    unitId: 12,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Qué devuelve el método ceilingKey() de un TreeMap?',
    options: [
      'La menor clave que sea mayor o igual a la pasada por parámetro, o null si no existe.',
      'La menor clave estrictamente mayor a la pasada por parámetro.',
      'La primera clave del mapa.',
      'La cantidad de claves mayores a la indicada.',
    ],
    correctIndex: 0,
    explanation:
      'La diferencia con higherKey() está en el "o igual": ceilingKey() incluye la clave del parámetro si existe, mientras que higherKey() devuelve la menor clave estrictamente mayor.',
    source: SOURCE,
    tags: ['TreeMap'],
  },
  {
    id: 'u12-q19',
    unitId: 12,
    type: 'mc',
    difficulty: 'intermedio',
    prompt:
      'Se necesitan pares clave-valor que se recorran en el mismo orden en que fueron agregados. ¿Cuál corresponde?',
    options: ['LinkedHashMap', 'HashMap', 'TreeMap', 'HashSet'],
    correctIndex: 0,
    explanation:
      'Según la matriz de decisión del material, el LinkedHashMap mantiene el orden de inserción mediante una lista enlazada interna. El TreeMap ordena por clave y el HashMap no garantiza orden alguno.',
    source: SOURCE,
    tags: ['LinkedHashMap', 'Decisión'],
  },
  {
    id: 'u12-q20',
    unitId: 12,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'De las tres implementaciones de Map que vimos, el HashMap es la más eficiente en las operaciones estándar.',
    answer: true,
    explanation:
      'El material lo afirma al comparar las tres: el HashMap es el más eficiente, pero el TreeMap tiene la ventaja de ser el único ordenado, a costa de un coste logarítmico.',
    source: SOURCE,
    tags: ['HashMap', 'TreeMap'],
  },
  {
    id: 'u12-q21',
    unitId: 12,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué imprime la última línea?',
    code: `Map<String, Integer> conteo = new HashMap<>();
String[] palabras = {"sol", "mar", "sol"};

for (String p : palabras) {
    conteo.put(p, conteo.getOrDefault(p, 0) + 1);
}

System.out.println(conteo.get("sol"));`,
    options: ['2', '1', '3', 'null'],
    correctIndex: 0,
    explanation:
      'getOrDefault() devuelve el valor asociado a la clave, o el valor por omisión cuando la clave todavía no está. En la primera vuelta "sol" no existe y se guarda 1; en la tercera ya vale 1 y se guarda 2, porque put reemplaza el valor anterior.',
    source: SOURCE,
    tags: ['Map', 'HashMap'],
  },
]
