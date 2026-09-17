/** Nodos del AST del subconjunto de Java que interpreta la aplicación. */

export interface TypeNode {
  name: string
  /** Argumentos genéricos, como el Integer de List<Integer>. */
  typeArgs: TypeNode[]
  /** Cantidad de pares de corchetes: int[] tiene 1. */
  dims: number
}

export type Expr =
  | { kind: 'literal'; literalType: 'int' | 'double' | 'string' | 'char' | 'boolean' | 'null'; raw: string | number | boolean | null; line: number }
  | { kind: 'identifier'; name: string; line: number }
  | { kind: 'binary'; op: string; left: Expr; right: Expr; line: number }
  | { kind: 'unary'; op: string; operand: Expr; line: number }
  | { kind: 'assign'; op: string; target: Expr; value: Expr; line: number }
  | { kind: 'update'; op: '++' | '--'; operand: Expr; prefix: boolean; line: number }
  | { kind: 'ternary'; cond: Expr; then: Expr; otherwise: Expr; line: number }
  | { kind: 'call'; object: Expr | null; name: string; args: Expr[]; line: number }
  | { kind: 'index'; array: Expr; index: Expr; line: number }
  | { kind: 'field'; object: Expr; name: string; line: number }
  | { kind: 'newArray'; elementType: TypeNode; size: Expr; line: number }
  | { kind: 'arrayInit'; elementType: TypeNode | null; items: Expr[]; line: number }
  | { kind: 'newObject'; className: string; typeArgs: TypeNode[]; args: Expr[]; line: number }
  | { kind: 'cast'; type: TypeNode; expr: Expr; line: number }
  | { kind: 'instanceof'; expr: Expr; type: TypeNode; line: number }

export interface Declarator {
  name: string
  /** Corchetes extra del estilo `int a[]`. */
  extraDims: number
  init: Expr | null
}

export type Stmt =
  | { kind: 'varDecl'; type: TypeNode; declarators: Declarator[]; line: number }
  | { kind: 'exprStmt'; expr: Expr; line: number }
  | { kind: 'if'; cond: Expr; then: Stmt; otherwise: Stmt | null; line: number }
  | { kind: 'while'; cond: Expr; body: Stmt; line: number }
  | { kind: 'doWhile'; body: Stmt; cond: Expr; line: number }
  | { kind: 'for'; init: Stmt | null; cond: Expr | null; update: Expr[]; body: Stmt; line: number }
  | { kind: 'forEach'; varType: TypeNode; varName: string; iterable: Expr; body: Stmt; line: number }
  | { kind: 'block'; statements: Stmt[]; line: number }
  | { kind: 'return'; value: Expr | null; line: number }
  | { kind: 'break'; line: number }
  | { kind: 'continue'; line: number }

export interface Param {
  type: TypeNode
  name: string
}

export interface MethodDecl {
  name: string
  returnType: TypeNode
  params: Param[]
  body: Stmt[]
  line: number
}

export interface Program {
  /** Nombre de la clase que envuelve, si el usuario escribió una. */
  className: string | null
  methods: MethodDecl[]
}

export function typeToString(type: TypeNode): string {
  const args = type.typeArgs.length
    ? `<${type.typeArgs.map(typeToString).join(', ')}>`
    : ''
  return `${type.name}${args}${'[]'.repeat(type.dims)}`
}
