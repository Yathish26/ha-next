const Shimmer = () => {
    return (

            <div className="flex flex-col gap-4 p-4">
                <div className="h-6 bg-gray-300 animate-pulse rounded-md w-3/4"></div>
                <div className="h-6 bg-gray-300 animate-pulse rounded-md w-1/2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded-md w-1/2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded-md w-1/4"></div>
            </div>


    );
};

export default Shimmer;