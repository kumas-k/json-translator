import { useEffect, useState } from 'react'
import Source from './components/source'
import useSourceStore from './stores/source-store'
import SourceUploader from './components/source-uploader'
import Page from './components/page'
import Preference from './components/preference'
import usePreferenceStore from './stores/preference-store'
import { useCookies } from 'react-cookie'
import Header from './components/header'
import Manual from './components/manual'

const App = () => {
  const [cookies] = useCookies(['engine', 'target', 'key'])
  const { source } = useSourceStore()
  const [isPreferenceOpen, setIsPreferenceOpen] = useState(false)
  const [isManualOpen, setIsManualOpen] = useState(false)
  const { init } = usePreferenceStore()

  useEffect(() => {
    init(cookies)
  }, [cookies, init])

  return (
    <>
      <Header
        openPreference={() => setIsPreferenceOpen(true)}
        openManual={() => setIsManualOpen(true)}
      />
      <main>
        {isPreferenceOpen && (
          <Preference
            isOpen={isPreferenceOpen}
            setIsOpen={setIsPreferenceOpen}
          />
        )}
        {isManualOpen && (
          <Manual isOpen={isManualOpen} setIsOpen={setIsManualOpen} />
        )}
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
