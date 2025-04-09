import { toast } from 'react-hot-toast'

// Transaction success toast utility
export function transactionToast(tx: string) {
    toast.success(`Transaction Successful: ${tx}`, {
        duration: 5000,
        position: 'top-right',
    })
}