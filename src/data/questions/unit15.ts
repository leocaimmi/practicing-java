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
]
