import { Button, Dialog, Flex, TextArea, Text } from '@radix-ui/themes'
import { useCallback, useState } from 'react'
import useSourceStore from '../stores/source-store'
import { fetchTranslate } from '../utils/fetch-translate'
import LoadingButton from './loading-button'
import usePreferenceStore from '../stores/preference-store'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  text: string
}

const EditDialog = ({ isOpen, setIsOpen, text }: Props) => {
  const { source, currentIndex, replaceSourceValue } = useSourceStore()
  const { engine, key, target } = usePreferenceStore()
  const [value, setValue] = useState<string>(text)

  const onClick = useCallback(() => {
    if (!value) {
      alert('입력한 값이 없습니다.')

      return
    }

    const line = source[currentIndex]

    const replace = line.replace(`"${text}"`, `"${value.replace(/"/g, '')}"`)

    replaceSourceValue(replace)
    setIsOpen(false)
  }, [currentIndex, replaceSourceValue, setIsOpen, source, text, value])

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit text</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to text.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Origin text
            </Text>
            <TextArea
              defaultValue={text}
              placeholder="Enter value"
              disabled={true}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              New text
            </Text>
            <TextArea
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <LoadingButton
            disabled={!value}
            color="purple"
            onClick={() =>
              fetchTranslate({
                value,
                key,
                engine,
                target,
              }).then((e) => setValue(e))
            }
          >
            Translate
          </LoadingButton>
          <div className=" flex-1" />
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={onClick} disabled={!value}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default EditDialog
