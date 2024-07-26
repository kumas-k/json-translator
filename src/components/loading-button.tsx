import { AlertDialog, Button, ButtonProps, Flex } from '@radix-ui/themes'
import { forwardRef, PropsWithChildren, useState } from 'react'

const LoadingButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      loading,
      onClick,

      ...props
    },
    forwardedRef,
  ) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    return (
      <>
        {isError && (
          <AlertDialog.Root open={isError}>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Translate Failed!!</AlertDialog.Title>
              <AlertDialog.Description size="2">
                {errorMessage}
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Action>
                  <Button
                    variant="solid"
                    color="red"
                    onClick={(e) => setIsError(false)}
                  >
                    Confirm
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        )}

        <Button
          loading={isLoading}
          ref={forwardedRef}
          onClick={async (e) => {
            try {
              setIsLoading(true)
              await onClick?.(e)
            } catch (error) {
              setIsError(true)
              setErrorMessage(String(error))
            } finally {
              setIsLoading(false)
            }
          }}
          {...props}
        >
          {children}
        </Button>
      </>
    )
  },
)

export default LoadingButton
