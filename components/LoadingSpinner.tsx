"use client";

import { Bars } from "react-loader-spinner";

interface LoadingSpinnerProps {
  height?: string;
  width?: string;
  color?: string;
}

const LoadingSpinner = ({
  height = "80",
  width = "80",
  color = "#e10600", // F1 red color
}: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center min-h-[200px] w-full">
      <Bars
        height={height}
        width={width}
        color={color}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
