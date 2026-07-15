import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { subscribeNetworkError } from '@/lib/network-error'
import { useEffect, useState, type ReactNode } from 'react'

const GlobalNetworkErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    return subscribeNetworkError((message) => {
      setErrorMessage(message)
    })
  }, [])

  return (
    <>
      {children}
      <Dialog open={Boolean(errorMessage)} onOpenChange={(open) => !open && setErrorMessage(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Something went wrong</DialogTitle>
            <DialogDescription className="text-center">Network error. Please try again.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" className="w-full" onClick={() => setErrorMessage(null)}>
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GlobalNetworkErrorProvider
