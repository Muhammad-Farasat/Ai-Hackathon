import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useUserProfile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const displayUser = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = localStorage.getItem('auth-token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.get(`${backend_url}/user-details`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                setData(response.data.user);            
            }

        } catch (error) {
            console.error("Error fetching user details:", error);
            setError(error.message || 'Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        displayUser();
    }, []);

    return { data, loading };
}

export default useUserProfile;