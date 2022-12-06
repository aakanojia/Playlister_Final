import { useContext } from 'react'
import { Statusbar } from ".";
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return (
            <div>
                <HomeScreen />
            </div>
        );
    else
        return <SplashScreen />
}