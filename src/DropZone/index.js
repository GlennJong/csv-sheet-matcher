import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { File, Error, Check } from '@styled-icons/boxicons-regular';

const DropZone = ({titleName, className, getFileInfo, children}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0].type === 'text/csv') {
      setError('');
      setFile(acceptedFiles[0]);
      getFileInfo(acceptedFiles);
    }
    else {
      setFile(null);
      setError('這個檔案不是 .csv 喔！');
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={`${className} ${isDragActive ? '-active' : ''}`}>
      <input {...getInputProps()} multiple={false} accept=".csv" />
      { !file &&
        <>
          <div className="icon">
            <File />
          </div>
          {
            isDragActive ?
            <p className="msg">拖曳到這裡</p> :
            <p className="msg">點擊或拖曳到這裡</p>
          }
        </>
      }
      {
        error !== '' &&
        <p className="error"><Error /> {error}</p>
      }
      {
        file && <p className="name"><Check /> {titleName} {file.name}</p>
      }
      <p className="info">{children}</p>
    </div>
  )
}


export default DropZone;