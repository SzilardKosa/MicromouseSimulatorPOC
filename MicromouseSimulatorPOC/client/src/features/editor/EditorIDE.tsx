import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import Program, { Languages } from '../../models/ProgramModel'
import { updateCode } from './editorSlice'
import { RootState } from '../../app/store'

export const languages = ['c_cpp', 'python']
export const fontSizes = [14, 16, 18, 20, 24, 28, 32, 40]
export const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal'
]

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`)
  require(`ace-builds/src-noconflict/snippets/${lang}`)
})

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`))

const ideStyle = {
  width: '100%'
}

type Props = { program: Program }

const EditorIDE: React.FC<Props> = ({ program }) => {
  const fontSize = useSelector((state: RootState) => state.editor.fontSize)
  const theme = useSelector((state: RootState) => state.editor.theme)
  const dispatch = useDispatch()

  const onLoad = () => {
    console.log('load')
  }

  const onChange = (newValue: any) => {
    dispatch(updateCode(newValue))
  }

  const lang = program.language === Languages.python ? 'python' : 'c_cpp'

  return (
    <AceEditor
      style={ideStyle}
      mode={lang}
      theme={theme}
      name="ide"
      onLoad={onLoad}
      onChange={onChange}
      fontSize={fontSize}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={program.codeText}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
        minLines: 30,
        maxLines: 40
      }}
    />
  )
}

export default EditorIDE
