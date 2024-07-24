import React from "react";

export default function Alert(props) {
  const cpitalize= (word) =>{
        if(word==='danger'){
          word= 'error'
        }
        const newWord = word.toLowerCase();
        return newWord.charAt(0).toUpperCase() +word.slice(1);

    }
  return (
    <div style={{ height:'50px' }}>
      
    <div>
    { props.alert !== null ? <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{cpitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div> : null
    }
    </div>
    </div>
  );
}

