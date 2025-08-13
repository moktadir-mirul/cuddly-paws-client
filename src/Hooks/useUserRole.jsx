import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthContext"
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
    const {user, pageLoading: AuthLoading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: role = "user", isLoading: roleLoading, refetch} = useQuery({
        queryKey:["userrole", user?.email],
        enabled: !AuthLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user?.email}`);
            return res.data.role;
        }
    })


    return {role, roleBasedLoading: AuthLoading || roleLoading, refetch}
}

export default useUserRole;