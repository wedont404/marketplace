import React, { useEffect, useState } from 'react';
import { getContributors, getUploads } from '../api';

const AdminPage = () => {
    const [contributors, setContributors] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const contributorsData = await getContributors();
                const uploadsData = await getUploads();
                setContributors(contributorsData);
                setUploads(uploadsData);
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <h2>Contributors</h2>
                <ul>
                    {contributors.map(contributor => (
                        <li key={contributor.id}>{contributor.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Uploads</h2>
                <ul>
                    {uploads.map(upload => (
                        <li key={upload.id}>{upload.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Info Cards</h2>
                <p>Syncing data from Sheets...</p>
                <p>Live contributor stats updated.</p>
            </div>
        </div>
    );
};

export default AdminPage;