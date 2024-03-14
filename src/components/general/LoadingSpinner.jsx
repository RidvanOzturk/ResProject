import { Spinner } from "flowbite-react";

const LoadingSpinner = ({isTransparent}) => {
    return (
      <div className={`${isTransparent && "bg-opacity-50"} bg-gray-600 w-full min-h-screen flex justify-center items-center absolute top-0 left-0 z-50`}>
        <div className="scale-150">
            <Spinner size="xl" />
        </div>
      </div>
    );
};

export default LoadingSpinner