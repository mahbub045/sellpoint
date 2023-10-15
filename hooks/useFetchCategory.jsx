import { useState } from 'react';

const useFetchCategory = () => {
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://sellpoint-api.vercel.app/api/v1/category');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setCategoryDetails(result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    fetchData();

    return { categoryDetails, loading, error };
};

export default useFetchCategory;
