import useSourceStore from '../stores/source-store'

function useSourceFileLoader() {
  const { initSource } = useSourceStore()

  function setSourceFile(file?: File) {
    if (!file) {
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
      const lines = fileReader.result
        ?.toString()
        .split('\n')
        .map((e) => (e ? e : ' '))

      if (lines && lines?.length > 0) {
        initSource(lines)
      }
    }

    fileReader.readAsText(file)
  }

  return { setSourceFile }
}

export default useSourceFileLoader
