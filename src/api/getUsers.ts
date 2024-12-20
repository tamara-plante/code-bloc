interface User {
    firstName: string;
}
interface Users {
    users: User[];
}


const getUsers = async (limit : number, skip: number): Promise<User[]> => {
    const users: Users = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`).then((res) => res.json());
    console.log("users", users.users);
    return users.users;
}

export default getUsers;