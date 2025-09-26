import React from "react";
import styles from './PowerBiPage.module.css';

const PowerBIPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <iframe
        width="100%"
        height="100%"
        src="https://app.powerbi.com/reportEmbed?reportId=6c566462-e58a-4204-81c7-65f41efef2af&autoAuth=true&ctid=d02378ec-1688-46d5-8540-1c28b5f470f6"
        frameBorder="0"
        allowFullScreen
        title="Performance Insights"
      ></iframe>
    </div>
  );
};

export default PowerBIPage;
