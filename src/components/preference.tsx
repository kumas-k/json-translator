import {
  Button,
  Dialog,
  Flex,
  RadioGroup,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useCallback, useState } from 'react'
import usePreferenceStore, { isEngine } from '../stores/preference-store'
import { useCookies } from 'react-cookie'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Preference = ({ isOpen, setIsOpen }: Props) => {
  const [, setCookies] = useCookies(['engine', 'target', 'key'])
  const preference = usePreferenceStore()

  const [engine, setEngine] = useState(preference.engine)
  const [key, setKey] = useState(preference.key)
  const [target, setTarget] = useState(preference.target)

  const onClick = useCallback(() => {
    const { setEngine, setKey, setTarget } = preference

    setCookies('engine', engine, { expires: new Date(2100, 0) })
    setEngine(isEngine(engine) ? engine : 'google')

    setCookies('target', target, { expires: new Date(2100, 0) })
    setTarget(target)

    setCookies('key', key, { expires: new Date(2100, 0) })
    setKey(key)

    setIsOpen(false)
  }, [preference, setCookies, engine, target, key, setIsOpen])

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Preference</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Engine
            </Text>
            <RadioGroup.Root
              defaultValue={preference.engine}
              onValueChange={(e) => isEngine(e) && setEngine(e)}
              onClick={(e) => e.preventDefault()}
            >
              <RadioGroup.Item value="google">Google</RadioGroup.Item>
              <RadioGroup.Item value="deepl">DeepL</RadioGroup.Item>
            </RadioGroup.Root>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Key
            </Text>
            <TextField.Root
              defaultValue={key}
              placeholder="Enter the key."
              onChange={(e) => setKey(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Language Target{'  '}
              <a
                target="_blank"
                href="https://cloud.google.com/translate/docs/languages"
                rel="noreferrer"
                className=" cursor-pointer text-[12px] text-[--accent-10]"
              >
                Reference
              </a>
            </Text>
            <TextField.Root
              defaultValue={target}
              placeholder="Enter the target."
              onChange={(e) => setTarget(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={onClick}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Preference
