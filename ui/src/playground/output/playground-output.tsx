import React from 'react';

export function PlaygroundOutput(props: { js: string }): JSX.Element {
  return <div style={{
    flex: "1 1",
    height: "100%",
    width: "600px",
    maxWidth: "100%",
    flexShrink: 1,
    flexGrow: 1,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    fontSize: '14px'
  }}>
    <pre dangerouslySetInnerHTML={{ __html: props.js }} style={{
      overflowX: 'auto',
      width: '100%',
      height: '100%',
      margin: '0',
      padding: '5px',
      boxSizing: 'border-box'
    }}>
    </pre>
  </div>;
}
