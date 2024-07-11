import Dropzone from 'react-dropzone'
import useSourceFileLoader from '../hooks/use-source-file-loader'

const SourceUploader = () => {
  const { setSourceFile } = useSourceFileLoader()

  return (
    <Dropzone
      onDrop={(e) => setSourceFile(e.at(0))}
      maxFiles={1}
      onDropRejected={(e) => alert(e.at(0)?.errors.at(0)?.message)}
      accept={{
        'application/json': ['.json'],
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section
          className="w-[100wh] h-[100vh] flex justify-center items-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} type="file" />
          <p>Drag 'n' drop some file here, or click to select file</p>
        </section>
      )}
    </Dropzone>
  )
}

export default SourceUploader
