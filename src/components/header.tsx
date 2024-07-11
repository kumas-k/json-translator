import { Button, DropdownMenu } from '@radix-ui/themes'
import { useCallback, useRef } from 'react'
import useSourceFileLoader from '../hooks/use-source-file-loader'
import useSourceStore from '../stores/source-store'
import usePreferenceStore from '../stores/preference-store'

type Props = {
  openPreference: () => void
}

const Header = ({ openPreference }: Props) => {
  const { setSourceFile } = useSourceFileLoader()
  const { source } = useSourceStore()
  const { target } = usePreferenceStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const onFileOpenClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <header className="flex justify-end p-[10px]">
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".json"
        onChange={(e) => setSourceFile(e.target.files?.item(0) ?? undefined)}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Menu
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={onFileOpenClick}>Open</DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={(e) => {
              const element = document.createElement('a')
              const file = new Blob([source.join('\n')], { type: 'text/plain' })
              element.href = URL.createObjectURL(file)
              element.download = `${target}.json`
              document.body.appendChild(element)
              element.click()
            }}
          >
            Save
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={openPreference}>
            Preference
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
  )
}

export default Header
