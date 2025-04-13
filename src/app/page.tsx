'use client'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <p className="text-2xl font-bold mb-4">BillionTests</p>
      <p className="text-muted-foreground mb-4 text-center">
        To delete your account in BillionTests app please write an email to <a href="mailto:outreach@excl.ai" className="text-primary underline">outreach@excl.ai</a>.
        Your account will be deleted (All data) within 3-5 business days.
      </p>
    </div>
  );
}
