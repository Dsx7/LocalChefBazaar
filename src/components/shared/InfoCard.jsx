// @flow 
import * as React from 'react';

function InfoCard({ label, value }) {
    return (
        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-500 shadow-sm dark:bg-primary">
            <p className="text-xs font-semibold text-gray-500 mb-1 dark:text-white">{label}</p>
            <p className="text-[15px] font-medium text-gray-800 dark:text-white">{value}</p>
        </div>
    );
}
export default InfoCard;