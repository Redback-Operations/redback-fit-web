import React, { useState } from 'react';
import { FaRunning, FaBiking } from 'react-icons/fa';

const Badge: React.FC<{ name: string; icon?: React.ReactNode; description: string }> = ({
  name,
  icon,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', margin: '10px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Display */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          margin: '5px',
          padding: '5px 10px',
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        {name}
      </span>

      {/* Tooltip */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            fontSize: '12px',
            zIndex: 10,
            width: '200px',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

const Categories: React.FC = () => {
  const categories = [
    {
      name: 'Running Insights',
      description: `Running insights can improve your performance by tracking stride length, pace, and heart rate.`,
      link: '/categories/running',
      badges: [
        { name: 'Pace Master', icon: <FaRunning />, description: 'Awarded for mastering pace control and maintaining consistent speeds across your runs.' },
        { name: 'Marathon Pro', icon: <FaRunning />, description: 'Earned by completing marathon-level distances in record time.' },
        { name: 'Sprint Champion', icon: <FaRunning />, description: 'Recognizes outstanding performance in short-distance sprints.' },
        { name: 'Trail Explorer', icon: <FaRunning />, description: 'Given for exploring and conquering challenging trail runs.' },
        { name: 'Endurance Hero', icon: <FaRunning />, description: 'Awarded for long-distance running with excellent endurance.' },
      ],
    },
    {
      name: 'Cycling Performance',
      description: `Cycling analytics can optimize your training routines by focusing on cadence, speed, and power output.`,
      link: '/categories/cycling',
      badges: [
        { name: 'Speedster', icon: <FaBiking />, description: 'Awarded for achieving record cycling speeds.' },
        { name: 'Hill Conqueror', icon: <FaBiking />, description: 'Earned for exceptional performance on uphill rides.' },
        { name: 'Endurance Rider', icon: <FaBiking />, description: 'Given for long-distance cycling endurance.' },
        { name: 'Power Cyclist', icon: <FaBiking />, description: 'Recognizes consistent high-power cycling.' },
      ],
    },
  ];

  return (
    <div>
      <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Explore Categories</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {categories.map((category, index) => (
          <div key={index} style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
            <div
              style={{
                border: '1px solid white',
                borderRadius: '10px',
                padding: '15px',
                backgroundColor: '#333',
                color: 'white',
              }}
            >
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <a
                href={category.link}
                style={{
                  color: '#007BFF',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Learn More
              </a>
            </div>

            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <h4>{`${category.name} Badges`}</h4>
              {category.badges.map((badge, badgeIndex) => (
                <Badge
                  key={badgeIndex}
                  name={badge.name}
                  icon={badge.icon}
                  description={badge.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

