import { describe, expect, it } from 'vitest'
import { parse } from './parser'
import { JavaInterpreter } from './interpreter'
import { int, javaToString, str, type JavaValue } from './values'

/** Ejecuta un método y devuelve su retorno formateado como lo imprimiría Java. */
function run(source: string, method = 'f', args: JavaValue[] = []): string {
  const interpreter = new JavaInterpreter(parse(source))
  return javaToString(interpreter.invoke(method, args))
}

/** Ejecuta un método y devuelve lo que imprimió por consola. */
function output(source: string, method = 'f', args: JavaValue[] = []): string[] {
  const interpreter = new JavaInterpreter(parse(source))
  interpreter.invoke(method, args)
  return interpreter.getOutput()
}

const arr = (items: number[]): JavaValue => ({
  kind: 'array',
  elementType: 'int',
  items: items.map(int),
})

describe('aritmética y tipos', () => {
  it('la división entre enteros descarta los decimales', () => {
    expect(run('public static int f() { return 7 / 2; }')).toBe('3')
  })

  it('el resto funciona como en C', () => {
    expect(run('public static int f() { return 7 % 2; }')).toBe('1')
  })

  it('si un operando es double el resultado es double', () => {
    expect(run('public static double f() { return 7.0 / 2; }')).toBe('3.5')
  })

  it('imprime los double con decimal, igual que Java', () => {
    expect(output('public static void f() { System.out.println(Math.pow(2, 3)); }')).toEqual([
      '8.0',
    ])
  })

  it('lanza ArithmeticException al dividir por cero', () => {
    expect(() => run('public static int f() { return 5 / 0; }')).toThrow(/by zero/)
  })

  it('resuelve el operador ternario', () => {
    expect(run('public static int f(int b) { return (b > 3) ? 2 : 7; }', 'f', [int(5)])).toBe('2')
  })
})

describe('control de flujo', () => {
  it('calcula Fibonacci de forma recursiva', () => {
    const source = `
      public static int fib(int n) {
          if (n <= 1) return n;
          return fib(n - 1) + fib(n - 2);
      }`
    expect(run(source, 'fib', [int(10)])).toBe('55')
  })

  it('calcula Fibonacci de forma iterativa', () => {
    const source = `
      public static int fib(int n) {
          int a = 0, b = 1;
          for (int i = 0; i < n; i++) {
              int t = a + b;
              a = b;
              b = t;
          }
          return a;
      }`
    expect(run(source, 'fib', [int(10)])).toBe('55')
  })

  it('respeta break y continue dentro de un while', () => {
    const source = `
      public static int f() {
          int i = 0, total = 0;
          while (true) {
              i++;
              if (i % 2 == 0) continue;
              if (i > 9) break;
              total += i;
          }
          return total;
      }`
    expect(run(source)).toBe('25')
  })

  it('corta los bucles infinitos en lugar de colgarse', () => {
    expect(() => run('public static int f() { while (true) { } }')).toThrow(/demasiadas/i)
  })

  it('corta la recursión sin caso base', () => {
    expect(() => run('public static int f() { return f(); }')).toThrow(/anidadas/i)
  })
})

describe('arreglos', () => {
  it('recorre un arreglo con for each', () => {
    const source = `
      public static int suma(int[] nums) {
          int total = 0;
          for (int n : nums) { total += n; }
          return total;
      }`
    expect(run(source, 'suma', [arr([1, 2, 3, 4])])).toBe('10')
  })

  it('ordena con Arrays.sort y formatea con Arrays.toString', () => {
    const source = `
      public static String f(int[] a) {
          Arrays.sort(a);
          return Arrays.toString(a);
      }`
    expect(run(source, 'f', [arr([5, 1, 4, 2])])).toBe('[1, 2, 4, 5]')
  })

  it('length es un atributo y no lleva paréntesis', () => {
    expect(run('public static int f() { int[] a = new int[3]; return a.length; }')).toBe('3')
  })

  it('inicializa los int en cero', () => {
    expect(run('public static int f() { int[] a = new int[3]; return a[1]; }')).toBe('0')
  })

  it('lanza ArrayIndexOutOfBoundsException al pasarse de rango', () => {
    expect(() => run('public static int f() { int[] a = new int[3]; return a[5]; }')).toThrow(
      /fuera de rango/,
    )
  })

  it('acepta el inicializador con llaves', () => {
    expect(run('public static int f() { int[] a = {4, 5, 6}; return a[2]; }')).toBe('6')
  })
})

describe('String', () => {
  it('encadena métodos', () => {
    const source = 'public static String f(String s) { return s.toUpperCase().substring(0, 3) + s.length(); }'
    expect(run(source, 'f', [str('programacion')])).toBe('PRO12')
  })

  it('es inmutable: toUpperCase devuelve una copia', () => {
    const source = `
      public static String f() {
          String a = "java";
          a.toUpperCase();
          return a;
      }`
    expect(run(source)).toBe('java')
  })

  it('distingue equals de ==', () => {
    const source = `
      public static String f() {
          String a = new String("hola");
          String b = new String("hola");
          return a.equals(b) + "," + (a == b);
      }`
    expect(run(source)).toBe('true,false')
  })

  it('divide con split', () => {
    expect(run('public static int f(String s) { return s.split(",").length; }', 'f', [
      str('a,b,c'),
    ])).toBe('3')
  })

  it('recorre con toCharArray y arma con StringBuilder', () => {
    const source = `
      public static String f(String s) {
          char[] cs = s.toCharArray();
          StringBuilder sb = new StringBuilder();
          for (int i = cs.length - 1; i >= 0; i--) { sb.append(cs[i]); }
          return sb.toString();
      }`
    expect(run(source, 'f', [str('abcde')])).toBe('edcba')
  })

  it('substring excluye el índice final', () => {
    expect(run('public static String f() { return "Programacion".substring(0, 6); }')).toBe(
      'Progra',
    )
  })
})

describe('colecciones', () => {
  it('ordena una lista con Collections.sort', () => {
    const source = `
      public static String f() {
          List<String> l = new ArrayList<>();
          l.add("pera"); l.add("banana"); l.add("manzana");
          Collections.sort(l);
          return l.toString();
      }`
    expect(run(source)).toBe('[banana, manzana, pera]')
  })

  it('recorre una lista con for each', () => {
    const source = `
      public static String f() {
          List<Integer> l = new ArrayList<>();
          l.add(3); l.add(1); l.add(2);
          StringBuilder sb = new StringBuilder();
          for (Integer x : l) { sb.append(x); }
          return sb.toString();
      }`
    expect(run(source)).toBe('312')
  })

  it('el Set no admite duplicados', () => {
    const source = `
      public static int f() {
          Set<String> s = new HashSet<>();
          s.add("x"); s.add("y"); s.add("x");
          return s.size();
      }`
    expect(run(source)).toBe('2')
  })

  it('el TreeSet mantiene el orden natural', () => {
    const source = `
      public static String f() {
          Set<Integer> s = new TreeSet<>();
          s.add(5); s.add(1); s.add(3);
          return s.toString();
      }`
    expect(run(source)).toBe('[1, 3, 5]')
  })

  it('put reemplaza el valor cuando la clave ya existe', () => {
    const source = `
      public static int f() {
          Map<String, Integer> m = new HashMap<>();
          m.put("a", 1);
          m.put("b", 2);
          m.put("a", 5);
          return m.size() * 100 + m.get("a");
      }`
    expect(run(source)).toBe('205')
  })

  it('remove(int) borra por índice y remove(Object) por igualdad', () => {
    const source = `
      public static String f() {
          List<String> l = new ArrayList<>();
          l.add("a"); l.add("b"); l.add("c");
          l.remove(0);
          l.remove("c");
          return l.toString();
      }`
    expect(run(source)).toBe('[b]')
  })
})

describe('estructura del código', () => {
  it('acepta el método envuelto en una clase', () => {
    const source = `
      public class Solucion {
          public static int f() { return 42; }
      }`
    expect(run(source)).toBe('42')
  })

  it('acepta métodos sueltos sin clase', () => {
    expect(run('public static int f() { return 42; }')).toBe('42')
  })

  it('ignora los comentarios y las anotaciones', () => {
    const source = `
      // un comentario
      /* y otro */
      @Override
      public static int f() { return 1; } // final de línea`
    expect(run(source)).toBe('1')
  })
})

describe('trazado paso a paso', () => {
  it('registra un paso por sentencia ejecutada', () => {
    const interpreter = new JavaInterpreter(
      parse(`
        public static int f() {
            int a = 1;
            int b = 2;
            return a + b;
        }`),
    )
    interpreter.invoke('f', [])
    const trace = interpreter.getTrace()

    expect(trace.length).toBe(3)
    expect(trace[0].vars).toEqual([{ name: 'a', value: '1' }])
    expect(trace[1].vars).toEqual([
      { name: 'a', value: '1' },
      { name: 'b', value: '2' },
    ])
    expect(trace[2].note).toBe('retorna 3')
  })

  it('incluye las variables de los bloques anidados, como la i de un for', () => {
    const interpreter = new JavaInterpreter(
      parse(`
        public static int f() {
            int total = 0;
            for (int i = 0; i < 3; i++) {
                total += i;
            }
            return total;
        }`),
    )
    interpreter.invoke('f', [])

    // Dentro del cuerpo del ciclo tienen que verse tanto total como i.
    const dentroDelCiclo = interpreter
      .getTrace()
      .find((step) => step.vars.some((v) => v.name === 'i'))

    expect(dentroDelCiclo).toBeDefined()
    expect(dentroDelCiclo!.vars.map((v) => v.name)).toEqual(['total', 'i'])
  })

  it('guarda la salida acumulada en cada paso', () => {
    const interpreter = new JavaInterpreter(
      parse(`
        public static void f() {
            System.out.println("uno");
            System.out.println("dos");
        }`),
    )
    interpreter.invoke('f', [])
    const trace = interpreter.getTrace()

    expect(trace[0].output).toEqual(['uno'])
    expect(trace[1].output).toEqual(['uno', 'dos'])
  })
})
