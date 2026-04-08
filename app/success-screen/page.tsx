import { SuccessScreen } from '@/components/SuccessScreen';
import React from 'react';

const page = () => {
    const handleReset = () => {
        window.location.href = "/";
    }
    return (
    <div>
<SuccessScreen onReset={handleReset} />
    </div>
    );
}

export default page;