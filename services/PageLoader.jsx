"use client";
import React, { useEffect, useState } from 'react'

function PageLoader({load=true}) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(load);
    }, [load]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }
}

export default PageLoader