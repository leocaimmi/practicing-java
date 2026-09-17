import type { Question } from '../../types'

const SOURCE = 'Clase 15 — Manejo de archivos de texto'

export const unit15: Question[] = [
  {
    id: 'u15-q01',
    unitId: 15,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Cuáles son los tres pasos que siempre hay que seguir para manipular un archivo?',
    options: [
      'Abrir el archivo, escribir o leer los datos, y cerrar el archivo.',
      'Crear el archivo, comprimirlo y guardarlo en disco.',
      'Declarar el archivo, instanciarlo e inicializarlo.',
      'Validar la ruta, verificar los permisos y convertir el contenido a binario.',
    ],
    correctIndex: 0,
    explanation:
      'El material los enumera en ese orden. Si no se abre el archivo, se obtiene un mensaje de error al intentar acceder a su contenido, y si no se lo cierra, puede que realmente no se llegue a guardar ningún dato.',
    source: SOURCE,
    tags: ['Archivos'],
  },
  {
    id: 'u15-q02',
    unitId: 15,
    type: 'vf',
    difficulty: 'basico',
    prompt: 'Si no se cierra un archivo después de escribirlo, puede ocurrir que los datos no lleguen a guardarse.',
    answer: true,
    explanation:
      'Es exactamente la advertencia del material sobre el tercer paso: si no cerramos el archivo, puede que realmente no se llegue a guardar ningún dato.',
    source: SOURCE,
    tags: ['Archivos'],
  },
  {
    id: 'u15-q03',
    unitId: 15,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué diferencia a un archivo de texto de uno binario?',
    options: [
      'En el de texto los datos se almacenan como caracteres ASCII o Unicode y puede leerse con cualquier editor de texto.',
      'El de texto sólo admite letras, mientras que el binario admite números.',
      'El de texto no puede crearse desde un programa Java, sólo leerse.',
      'El binario es siempre más lento de procesar que el de texto.',
    ],
    correctIndex: 0,
    explanation:
      'En los archivos de texto los datos se almacenan como caracteres ASCII o Unicode, de modo que pueden crearse desde Java y leerse con cualquier editor. En los binarios los datos quedan en su forma binaria original y resultan más eficientes, pero no están pensados para ser legibles por humanos.',
    source: SOURCE,
    tags: ['Archivos', 'Texto y binario'],
  },
  {
    id: 'u15-q04',
    unitId: 15,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué aporta la clase BufferedReader frente a FileReader?',
    options: [
      'Usa un buffer interno y ofrece readLine(), que lee una línea completa de una sola vez.',
      'Permite escribir en el archivo además de leerlo.',
      'Convierte automáticamente el archivo de texto en binario.',
      'Evita la necesidad de cerrar el archivo al terminar.',
    ],
    correctIndex: 0,
    explanation:
      'FileReader es la clase básica, sin buffer, con métodos como read() que leen un carácter o un array de caracteres por vez. BufferedReader usa un buffer interno y aporta readLine(). El buffer reduce la cantidad de accesos a disco, lo que mejora el rendimiento con archivos grandes.',
    source: SOURCE,
    tags: ['BufferedReader', 'FileReader'],
  },
  {
    id: 'u15-q05',
    unitId: 15,
    type: 'mc',
    difficulty: 'avanzado',
    prompt: '¿Cuál es una diferencia entre PrintWriter y FileWriter según el material?',
    options: [
      'PrintWriter ofrece print() y println() para escribir datos formateados y no lanza excepciones ante un error; se verifica con checkError().',
      'PrintWriter sólo puede escribir números y FileWriter sólo texto.',
      'FileWriter incorpora un buffer propio y PrintWriter no.',
      'PrintWriter no puede combinarse con un BufferedWriter.',
    ],
    correctIndex: 0,
    explanation:
      'FileWriter escribe caracteres con métodos básicos como write() y lanza excepciones como IOException directamente. PrintWriter ofrece métodos más avanzados como print() y println(), no lanza excepciones ante un error de lectura y permite verificarlo con checkError(). Ambos suelen combinarse con un BufferedWriter.',
    source: SOURCE,
    tags: ['PrintWriter', 'FileWriter'],
  },
  {
    id: 'u15-q06',
    unitId: 15,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué representa un objeto de la clase File?',
    options: [
      'El nombre del archivo, su ruta y otras propiedades, como la última modificación, los permisos y el tamaño.',
      'El contenido completo del archivo cargado en memoria.',
      'Un buffer de escritura asociado al archivo.',
      'Una conexión abierta al sistema de archivos que debe cerrarse manualmente.',
    ],
    correctIndex: 0,
    explanation:
      'El objeto File contiene el nombre del archivo, la ruta y demás propiedades relativas a él, y define métodos para conocerlas: última modificación, permisos de acceso, tamaño, entre otras.',
    source: SOURCE,
    tags: ['File'],
  },
  {
    id: 'u15-q07',
    unitId: 15,
    type: 'vf',
    difficulty: 'intermedio',
    prompt: 'El uso de un buffer reduce la cantidad de accesos a disco y mejora el rendimiento con archivos grandes.',
    answer: true,
    explanation:
      'Ésa es la justificación que da el material para preferir las clases con buffer: reducen la cantidad de veces que se accede al disco, lo que mejora el rendimiento y las vuelve más adecuadas para trabajar con archivos grandes.',
    source: SOURCE,
    tags: ['Buffer'],
  },
  {
    id: 'u15-q08',
    unitId: 15,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Por qué conviene usar archivos para guardar los datos de un programa?',
    options: [
      'Porque permiten recuperar los datos más adelante cuando el volumen de información no es muy elevado.',
      'Porque garantizan el acceso concurrente de varios usuarios.',
      'Porque reemplazan por completo a las bases de datos en cualquier escala.',
      'Porque los datos quedan cifrados de manera automática.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo plantea así: los archivos se usan cuando el volumen de datos no es muy elevado y hace falta guardar los datos del programa para poder recuperarlos más adelante.',
    source: SOURCE,
    tags: ['Archivos'],
  },
  {
    id: 'u15-q09',
    unitId: 15,
    type: 'mc',
    difficulty: 'basico',
    prompt: '¿Qué es un archivo, según la definición del material?',
    options: [
      'Un conjunto de bits almacenados en un dispositivo, accesible a través de un camino de acceso que lo identifica.',
      'Una estructura de datos que sólo existe mientras el programa se ejecuta.',
      'Una colección de objetos ordenados por clave.',
      'Un bloque de memoria reservado dentro del heap.',
    ],
    correctIndex: 0,
    explanation:
      'El material lo define así y agrega que los archivos suelen organizarse en estructuras jerárquicas de directorios, lo que permite identificar cada uno unívocamente y encontrarlo en el disco a partir de su nombre.',
    source: SOURCE,
    tags: ['Archivos'],
  },
  {
    id: 'u15-q10',
    unitId: 15,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué caracteriza a FileReader?',
    options: [
      'Es la clase básica para leer caracteres directamente de un archivo, sin buffer y con métodos como read().',
      'Usa un buffer interno y permite leer líneas completas con readLine().',
      'Permite escribir texto formateado con print() y println().',
      'Representa la ruta del archivo y sus propiedades, sin leer su contenido.',
    ],
    correctIndex: 0,
    explanation:
      'FileReader no usa buffer y sólo tiene métodos básicos, como read(), que lee un carácter o un array de caracteres por vez. El que usa buffer y ofrece readLine() es BufferedReader.',
    source: SOURCE,
    tags: ['FileReader', 'BufferedReader'],
  },
  {
    id: 'u15-q11',
    unitId: 15,
    type: 'mc',
    difficulty: 'avanzado',
    prompt:
      'Se está escribiendo en un archivo con PrintWriter y algo falla. ¿Cómo se detecta el problema?',
    options: [
      'Consultando el método checkError(), porque PrintWriter no lanza excepciones ante un error.',
      'Capturando la IOException que lanza automáticamente.',
      'Revisando el valor de retorno de println(), que devuelve false si falló.',
      'No se puede detectar: hay que usar FileWriter si interesa el control de errores.',
    ],
    correctIndex: 0,
    explanation:
      'Es la diferencia que marca el material: FileWriter lanza IOException directamente cuando ocurre un error, mientras que PrintWriter no lanza excepciones y permite verificarlo con checkError().',
    source: SOURCE,
    tags: ['PrintWriter', 'FileWriter'],
  },
  {
    id: 'u15-q12',
    unitId: 15,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Qué método de BufferedReader permite leer una línea completa de una sola vez?',
    options: ['readLine()', 'read()', 'nextLine()', 'readAll()'],
    correctIndex: 0,
    explanation:
      'readLine() es el método conveniente que aporta BufferedReader frente al read() básico de FileReader. nextLine() es de la clase Scanner, que se usa para la entrada por consola.',
    source: SOURCE,
    tags: ['BufferedReader'],
  },
  {
    id: 'u15-q13',
    unitId: 15,
    type: 'vf',
    difficulty: 'basico',
    prompt:
      'Los archivos de texto pueden crearse desde un programa Java y después abrirse con cualquier editor de texto.',
    answer: true,
    explanation:
      'Es lo que los distingue de los binarios: como los datos se almacenan como caracteres ASCII o Unicode, se pueden crear desde Java y leer con cualquier editor, o al revés. Por eso son adecuados para datos que se leen y editan fácilmente.',
    source: SOURCE,
    tags: ['Archivos', 'Texto y binario'],
  },
  {
    id: 'u15-q14',
    unitId: 15,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Para qué tipo de contenido son adecuados los archivos binarios?',
    options: [
      'Para datos que no están diseñados para ser legibles por humanos, como imágenes, audio o video.',
      'Para datos que se van a editar a mano con frecuencia.',
      'Para configuraciones que otras personas deben poder revisar.',
      'Para cualquier archivo que supere una línea de texto.',
    ],
    correctIndex: 0,
    explanation:
      'En los binarios los datos se almacenan en su forma original, como secuencia de bits. Son más eficientes en almacenamiento y procesamiento, y se usan para contenido que necesita ser procesado por un programa y no leído por una persona.',
    source: SOURCE,
    tags: ['Texto y binario'],
  },
  {
    id: 'u15-q15',
    unitId: 15,
    type: 'mc',
    difficulty: 'intermedio',
    prompt: '¿Con qué clase suelen combinarse FileWriter y PrintWriter para mejorar el rendimiento?',
    options: ['BufferedWriter', 'BufferedReader', 'File', 'Scanner'],
    correctIndex: 0,
    explanation:
      'El material lo menciona para las dos: como FileWriter escribe directamente en el archivo sin almacenar en un buffer, suele combinarse con un BufferedWriter, y con PrintWriter ocurre lo mismo.',
    source: SOURCE,
    tags: ['FileWriter', 'PrintWriter', 'Buffer'],
  },
  {
    id: 'u15-q16',
    unitId: 15,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué problema tiene?',
    code: `File archivo = new File("datos.txt");
FileWriter escritor = new FileWriter(archivo);
escritor.write("Hola mundo");
// el programa termina acá`,
    options: [
      'Nunca cierra el archivo, así que puede que los datos no lleguen a guardarse.',
      'No se puede escribir en un File: hay que usar un String con la ruta.',
      'write() sólo acepta caracteres sueltos, no una cadena completa.',
      'Ninguno: el archivo queda escrito correctamente.',
    ],
    correctIndex: 0,
    explanation:
      'De los tres pasos que enumera el material (abrir, operar y cerrar), falta el último. Si no cerramos el archivo, puede que realmente no se llegue a guardar ningún dato. Además, cerrar libera los recursos tomados.',
    source: SOURCE,
    tags: ['FileWriter', 'Archivos'],
  },
  {
    id: 'u15-q17',
    unitId: 15,
    type: 'code',
    difficulty: 'avanzado',
    prompt: 'Analizá el siguiente código. ¿Qué papel cumple cada clase?',
    code: `BufferedReader lector = new BufferedReader(new FileReader("datos.txt"));
String linea = lector.readLine();
System.out.println(linea);
lector.close();`,
    options: [
      'FileReader lee los caracteres del archivo y BufferedReader agrega el buffer y el método readLine().',
      'BufferedReader abre el archivo y FileReader se encarga de cerrarlo.',
      'FileReader convierte el texto a binario y BufferedReader lo vuelve a texto.',
      'Las dos hacen lo mismo: una de las dos sobra.',
    ],
    correctIndex: 0,
    explanation:
      'FileReader es la clase básica que lee caracteres directamente del archivo, sin buffer y con métodos como read(). BufferedReader la envuelve para aportar un buffer interno y métodos más convenientes, como readLine(), que lee una línea completa de una sola vez.',
    source: SOURCE,
    tags: ['BufferedReader', 'FileReader'],
  },
  {
    id: 'u15-q18',
    unitId: 15,
    type: 'code',
    difficulty: 'intermedio',
    prompt: 'Analizá el siguiente código. ¿Qué información permite obtener?',
    code: `File archivo = new File("informe.txt");
System.out.println(archivo.getName());
System.out.println(archivo.length());
System.out.println(archivo.canRead());`,
    options: [
      'Propiedades del archivo: su nombre, su tamaño y sus permisos de acceso.',
      'El contenido completo del archivo, línea por línea.',
      'La cantidad de líneas que tiene el archivo.',
      'Nada: la clase File no tiene métodos, sólo guarda la ruta.',
    ],
    correctIndex: 0,
    explanation:
      'El objeto File contiene el nombre del archivo, la ruta y demás propiedades relativas a él, y define métodos para conocerlas: la última modificación, los permisos de acceso, el tamaño. Para leer el contenido hacen falta FileReader o BufferedReader.',
    source: SOURCE,
    tags: ['File'],
  },
]
