import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import { Bars } from 'react-loader-spinner';
const BASE_URL =process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {

  return (
    <main>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#4a4a4a]">
          <Bars
            height="80"
            width="80"
            color="#dc2626"
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
      }>
        <EventDetails params={Promise.resolve("someParam")} />
      </Suspense>
    </main>
  )
}

export default page
