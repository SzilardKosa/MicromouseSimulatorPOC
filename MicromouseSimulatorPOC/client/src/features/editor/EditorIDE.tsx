import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'

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

const EditorIDE = () => {
  const onLoad = () => {
    console.log('load')
  }

  const onChange = (newValue: any) => {
    console.log('change', newValue)
  }
  return (
    <AceEditor
      style={ideStyle}
      mode="python"
      theme="monokai"
      name="ide"
      onLoad={onLoad}
      onChange={onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={''}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        minLines: 30,
        maxLines: 40
      }}
    />
  )
}

export default EditorIDE
