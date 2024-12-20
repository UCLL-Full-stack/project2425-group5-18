import { User } from "@/types";

const UserService = () => {
    const fetchUsers = async () => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    };

    const loginUser = async (user: User) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Login failed:', errorText);
            throw new Error('Failed to login');
        }

        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        return data;
    };

    return {
        fetchUsers,
        loginUser,
    };
};

export default UserService;