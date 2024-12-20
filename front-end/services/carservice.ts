const CarService = () => {
    const getAllCars = async () => {
        const token = localStorage.getItem('loggedInUser');
        if (!token) {
            throw new Error('No token found');
        }

        const parsedToken = JSON.parse(token);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
            headers: {
                'Authorization': `Bearer ${parsedToken.accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Unauthorized');
        }
        return response.json();
    };

    return {
        getAllCars,
    };
};

export default CarService;