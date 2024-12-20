import { User } from "@/types";
const UserService = async () => {
    const fetchUsers = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    };

    const loginUser = (user: User) => {
        return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

    };

    return {
        fetchUsers,
        loginUser,
    }
};

export default UserService;