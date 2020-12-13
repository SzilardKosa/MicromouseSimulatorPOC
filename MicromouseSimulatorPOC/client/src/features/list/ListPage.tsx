import { Container } from '@material-ui/core'
import React from 'react'
import Program, { Languages } from '../../models/ProgramModel'
import AddNewProgram from './AddNewProgram'
import ProgramList from './ProgramList'

const TestList: Program[] = [
  {
    id: '1',
    name: 'hello world',
    language: Languages.python,
    codeText: 'print("Hello World!")'
  },
  {
    id: '2',
    name: 'hello world 2',
    language: Languages.c,
    codeText: '#include <stdio.h>\nint main() {\n   printf("Hello, World! v2");\n   return 0;\n}'
  },
  {
    id: '3',
    name: 'hello world 3',
    language: Languages.cpp,
    codeText:
      '#include <iostream>\nint main() {\n    std::cout << "Hello World!";\n    return 0;\n}'
  }
]

const ListPage = () => {
  return (
    <Container maxWidth="lg">
      <ProgramList programs={TestList} />
      <AddNewProgram />
    </Container>
  )
}

export default ListPage
