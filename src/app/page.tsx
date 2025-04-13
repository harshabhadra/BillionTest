'use client'

import {sendEmail} from '@/services/email-service';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {toast} from "@/hooks/use-toast"
import {useState} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to control the AlertDialog

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await sendEmail('harshahelloworld@gmail.com', 'Account Deletion Request', `Phone Number: ${phoneNumber}`);
      setOpen(true); // Open the AlertDialog after successful email submission
      setPhoneNumber(''); // Clear the phone number input
    } catch (error: any) {
      toast({
        key: phoneNumber,
        variant: "destructive",
        title: "Error submitting deletion request.",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <img src="https://i.imgur.com/your_image_url.png" alt="BillionTests" className="mb-4" />
      <p className="text-muted-foreground mb-4">Enter your phone number to request account deletion.</p>

      <div className="flex flex-col space-y-2 w-full max-w-md">
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isSubmitted || isLoading}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              onClick={handleDeleteAccount}
              disabled={isSubmitted || !phoneNumber || isLoading}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deletion Request Submitted</AlertDialogTitle>
              <AlertDialogDescription>
                Your request to delete the account associated with {phoneNumber} has been submitted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpen(false)}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
