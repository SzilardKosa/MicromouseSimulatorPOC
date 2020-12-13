export default interface Program {
  id: string
  name: string
  language: Languages
  codeText: string
}

export enum Languages {
  python = 'Python',
  c = 'C',
  cpp = 'C++'
}
