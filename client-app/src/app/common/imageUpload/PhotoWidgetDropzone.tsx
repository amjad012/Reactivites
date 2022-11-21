import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props{
  setFiles:(files: any) => void;
}

export default function PhotoWidgetDropzone({setFiles}:Props) {
  const dzStyles = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRaduis:'5px',
    paddingTop:'30px',
    textAlign:'center' as 'center',
    height:200
  }

  const dzActive ={
    borderColor:'green',

  }

  const onDrop = useCallback((acceptedFiles: any) => { // to see the image that we drop...
    setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file) // this will hang around in the client's memory .. So we need to dispose it once we're done
    })))
  }, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here'/>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}