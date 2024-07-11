import { useEffect, useState } from 'react'
import Source from './components/source'
import useSourceStore from './stores/source-store'
import SourceUploader from './components/source-uploader'
import Page from './components/page'
import Preference from './components/preference'
import usePreferenceStore from './stores/preference-store'
import { useCookies } from 'react-cookie'
import Header from './components/header'

const App = () => {
  const [cookies] = useCookies(['engine', 'target', 'key'])
  const { source } = useSourceStore()
  const [isOpen, setIsOpen] = useState(false)
  const { init } = usePreferenceStore()

  useEffect(() => {
    init(cookies)
  }, [cookies, init])

  return (
    <>
      <Header openPreference={() => setIsOpen(true)} />
      <main>
        {isOpen && <Preference isOpen={isOpen} setIsOpen={setIsOpen} />}
        {source.length <= 0 ? (
          <SourceUploader />
        ) : (
          <div>
            <Source />
            <Page />
          </div>
        )}
      </main>
    </>
  )
}

export default App
