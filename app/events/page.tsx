import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
const BASE_URL =process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {

  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <EventDetails params={Promise.resolve("someParam")} />
      </Suspense>
    </main>
  )
}

export default page
