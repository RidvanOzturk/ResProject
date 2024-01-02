import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUserData, setUser } from "../redux/features/UserSlice";


const useAuthentication = () => {
    
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);


    const loginCall = async({username, password}) => {

        setIsLoading(true)

        try {

            /*
            const response = await axios.post(
                "api_connection_url",
                {
                    username, password
                },
                {   
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              );
            */

            console.log("Axios Post!");

            const userData = {username, password};
              
            dispatch(setUser(userData));

        }
        catch(e) {

            console.log(err);

            setMessage({
                content: "Incorrect mail or password, please try again!",
                isError: true
            });
        }
        finally {

            setIsLoading(false);
        }
    }

    const logoutCall = async () => {

        setIsLoading (true);

        try {
            /*await signOut (auth);*/
            dispatch(clearUserData());

            setMessage({
                content: "You are successfully logged out!",
                isError: false
            });
        }
        catch (err) {
            console.log(err);

            setMessage({
                content: err,
                isError: true
            });
        }
        finally {
            setIsLoading (false);
        }
    };
    
    return {isLoading, message, loginCall, logoutCall};
}

export default useAuthentication