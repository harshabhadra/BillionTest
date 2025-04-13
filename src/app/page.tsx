'use client'

import {sendEmail} from '@/services/email-service';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {toast} from "@/hooks/use-toast"
import {useState} from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await sendEmail('harshahelloworld@gmail.com', 'Account Deletion Request', `Phone Number: ${phoneNumber}`);
      setIsSubmitted(true);
      toast({
        title: "Deletion request submitted!",
        description: "We've received your request and will process it shortly.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting deletion request.",
        description: error.message,
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-2xl font-semibold mb-4">Account Eraser</h1>
      <p className="text-muted-foreground mb-4">Enter your phone number to request account deletion.</p>

      <div className="flex flex-col space-y-2 w-full max-w-md">
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isSubmitted || isLoading}
        />
        <Button
          onClick={handleDeleteAccount}
          disabled={isSubmitted || !phoneNumber || isLoading}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? 'Deleting...' : 'Delete Account'}
        </Button>
      </div>
    </div>
  );
}

