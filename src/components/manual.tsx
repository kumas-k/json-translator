import { Dialog, Heading, Table } from '@radix-ui/themes'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Manual = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Keyboard shortcuts</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Speed up your work and use shortcuts to perform common actions.
        </Dialog.Description>
        <Heading>Main</Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Window</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mac</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Open Edit</Table.RowHeaderCell>
              <Table.Cell>Ctrl + Enter</Table.Cell>
              <Table.Cell>⌘ + Enter</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <br />
        <Heading>Dialog</Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Window</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mac</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Save</Table.RowHeaderCell>
              <Table.Cell>Ctrl + Enter</Table.Cell>
              <Table.Cell>⌘ + Enter</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Cancel</Table.RowHeaderCell>
              <Table.Cell>ESC</Table.Cell>
              <Table.Cell>ESC</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Translate</Table.RowHeaderCell>
              <Table.Cell>Ctrl + K</Table.Cell>
              <Table.Cell>⌘ + K</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Manual
