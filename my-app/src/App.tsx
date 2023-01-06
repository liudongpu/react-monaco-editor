import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MonacoEditor, { monaco as monacoEditor }  from 'react-monaco-editor';
import  sourceCode from './code.json';

var editor:monacoEditor.editor.IStandaloneCodeEditor;
function App() {

  const [code,setCode] = useState("");
  const options = {
    selectOnLineNumbers: true
  };

  const editorDidMount=(codeEditor:monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor)=>{
    console.log('editorDidMount', codeEditor);
     
    codeEditor.focus();
    editor=codeEditor;
  }
  const onChange=(value: string, event: monacoEditor.editor.IModelContentChangedEvent)=> {
    //setCode(value);a
    console.log(event);
  }

  const onClick=()=>{
    editor.focus();

    var aOptions:monacoEditor.editor.IIdentifiedSingleEditOperation[]=[];
    
    sourceCode.files.map(fItem=>{

      if(fItem.operateAction==="TextChange"&&fItem.textChanges&&fItem.textChanges.length>0){
        var c=fItem.textChanges[0];
         
        var range:monacoEditor.IRange={startColumn:parseInt(c.startLine),startLineNumber:(parseInt(c.startCharacter)),
        endColumn:parseInt(c.endLine),endLineNumber:parseInt(c.endCharacter)
        }
        aOptions.push({range:range,text:c.rangeText});
        
      }
    });


    var timer=setInterval(()=>{

      if(aOptions.length>0){
        var a=aOptions.pop()!;
        editor.executeEdits("a",[a]);
        editor.setSelection(a.range);
      }else{
        clearInterval(timer);
      }
      

    },1000);


    
  }

  return (
    <div >
      <button onClick={onClick}>修改内容</button>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
         
        options={options}
        onChange={onChange}
         
        editorDidMount={editorDidMount}
      />
    </div>
  );
}

export default App;
