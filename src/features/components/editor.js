import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-coy.css';

export default function CodeEditor(props) {
  const [code, setCode] = useState([]);
  useEffect(() => {
    setCode(JSON.stringify(props.value));
  }, [props.value]);
  return (
    <Editor
      value={code}
      onValueChange={(change) => setCode(change)}
      highlight={(code) => highlight(code, languages.js)}
      textareaClassName="textEditor"
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        height: '500px',
        width: '700px',
        background: '#ffeee1',
        borderRadius: 4,
        overflow: 'auto',
        margin: '10% auto',
      }}
    />
  );
}
