import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const useAuth = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    }, [user, navigate]);

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(new Blob([blob])); // Convert BLOB to Base64
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
        });
    };

    if (user?.userProfile instanceof Blob) {
        convertBlobToBase64(user.userProfile).then((base64Image) => {
            user.userProfile = base64Image;
            localStorage.setItem('user', JSON.stringify(user))
        });
    }

    return user;
};

export default useAuth;