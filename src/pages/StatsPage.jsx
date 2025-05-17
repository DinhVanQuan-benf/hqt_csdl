import React from 'react';
import '../styles/stats.css'; // Đảm bảo đường dẫn đúng

const PowerBIReport = () => {
    return (
        <div className="powerbi-wrapper">
            <div className="powerbi-container">
                <iframe
                    title="hqt_csdl"
                    src="https://app.powerbi.com/reportEmbed?reportId=b4de0c32-b7bc-4f0a-8917-a1c3aafae005&autoAuth=true&embeddedDemo=true"
                    allowFullScreen
                    frameBorder="0"
                ></iframe>
            </div>
        </div>
    );
};

export default PowerBIReport;
