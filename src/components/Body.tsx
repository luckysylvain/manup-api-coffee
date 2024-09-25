import React, { useState, useEffect } from 'react';

type Coffee = {
    id: string;
    name: string;
    price: string;
    image: string;
    rating: number | null;
    popular: boolean;
    available: boolean;
    votes: number;
};

const Body = () => {
    const [coffees, setCoffees] = useState<Coffee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);

   useEffect(() => {
        if (isAvailable !== null) {
        setIsLoading(true);
        fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json')
            .then(response => response.json())
            .then(data => {
                setCoffees(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch coffee data:', err);
                setError('Failed to load data, check your internet connection');
                setIsLoading(false);
            });
       };
        }, [isAvailable]);

    const handleButtonClick = (available: boolean) => {
        setIsAvailable(available);
        setIsSelected(true);
    };

    return (
        <div className='bg-gray-900 grid grid-rows-[200px,1fr] text-white w-full h-screen'>
            <div className='bg-cover bg-center bg-[url(bg-cafe.jpg)]'></div>
            <div className='bg-[#111315] relative'>
                <div className='m-24 -mt-20 bg-[#1B1D1F] bg-[url(vector.svg)] bg-no-repeat bg-right-top flex-col flex items-center justify-center rounded-lg'>
                    <div className='max-w-sm text-center mt-16'>
                        <p className='text-xl font-bold'>Our Collection</p>
                        <p className='text-xs mt-2 text-[#6F757C]'>
                            Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.
                        </p>
                        <div className="flex justify-center space-x-4 mb-8">
                            <button
                                className={`px-1 md:px-4 py-2 mt-4 rounded-md font-semibold text-xs text-white ${isAvailable === false ? 'bg-[#6F757C]' : 'bg-transparent'}`}
                                onClick={() => handleButtonClick(false)}
                            >
                                All Products
                            </button>
                            <button
                                className={`px-1 md:px-4 py-2 mt-4 rounded-md font-semibold text-xs text-white ${isAvailable === true ? 'bg-[#6F757C]' : 'bg-transparent'}`}
                                onClick={() => handleButtonClick(true)}
                            >
                                Available Now
                            </button>
                        </div>
                    </div>
                   {isLoading && !error && (
                            <div className="text-center mt-10">
                                <p className="text-xs text-yellow-300">Loading data, please wait...</p>
                            </div>
                    )}
                    {!isLoading && error && (
                    <div className="text-center mt-10">
                        <p className="text-xs text-red-500">{error}</p>
                    </div>
                        )}
                    {isSelected && !isLoading && !error && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-14'>
                            {coffees.map((coffee) => {
                                if (!coffee.available && isAvailable) return null;
                                return (
                                    <div key={coffee.id} className='p-4 rounded-lg space-y-2'>
                                        {coffee.popular && (
                                            <span className="absolute mt-4 ml-2 bg-[#F6C768] text-black text-xs font-semibold px-2 py-1 rounded-full">
                                                Popular
                                            </span>
                                        )}
                                        <img src={coffee.image} alt={coffee.name} className='w-full h-40 object-cover rounded-md' />
                                        <div className='flex items-center justify-between'>
                                            <h2 className='text-xs font-semibold'>{coffee.name}</h2>
                                            <p className='bg-[#BEE3CC] text-black rounded-sm text-xs font-semibold p-1'>{coffee.price}</p>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='flex items-center'>
                                                {coffee.rating !== null && coffee.votes > 0 ? (
                                                    <>
                                                        <img src="Star_fill.svg" alt="star-yellow" className='w-5 h-5 mr-1' />
                                                        <p className='text-xs'>{coffee.rating}</p>
                                                        <p className='text-[#6F757C] text-xs'>({coffee.votes} votes)</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <img src="Star.svg" alt="star-grey" className='w-5 h-5 mr-1' />
                                                        <p className='text-xs'>No ratings</p>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Body;