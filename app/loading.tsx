'use client';
import { Bars } from 'react-loader-spinner';

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#4a4a4a]">
            <Bars
                height="80"
                width="80"
                color="#dc2626"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}
