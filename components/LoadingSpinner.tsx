'use client';
import { Bars } from 'react-loader-spinner';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

export default function LoadingSpinner({ fullScreen = true }: LoadingSpinnerProps) {
    return (
        <div className={`${fullScreen ? 'min-h-screen' : ''} flex flex-col items-center justify-center`}>
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
