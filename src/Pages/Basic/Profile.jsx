import useAuth from "../../Hooks/useAuth";


const Profile = () => {
    const {user} = useAuth()
    console.log(user);
    return (
        <div className="flex flex-col justify-center items-center gap-3 mt-10">
            <img className="w-[200px] rounded-full" src={user?.photoURL} alt="" />
            <p className="text-xl md:text-3xl">Name: {user?.displayName}</p>
            <p className="text-xl md:text-3xl">Email: {user?.email}</p>
        </div>
    );
};

export default Profile;