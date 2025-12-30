import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
const BASE_URL =process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {

  return (
    <main>
      <Suspense fallback={<div className="text-center">Loading events...</div>}>
        <EventDetails params={Promise.resolve("someParam")} />
      </Suspense>
    </main>
  )
}

export default page
