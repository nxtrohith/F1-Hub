import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import LoadingSpinner from "@/components/LoadingSpinner";

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
