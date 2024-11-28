import React, { useState } from 'react';
import { FaRunning, FaBiking, FaSwimmer, FaBed, FaDumbbell } from 'react-icons/fa';
import Footer from '../../components/Footer/Footer.tsx';  // Added import for Footer component

// Badge Component with optional graphic icon
const Badge: React.FC<{ name: string; icon?: React.ReactNode; tooltip?: string }> = ({ name, icon, tooltip }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      margin: '5px',
      padding: '8px 15px',
      backgroundColor: '#555',
      color: '#fff',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      position: 'relative', // Ensure positioning for the tooltip
    }}
    className="badge" // Adding a class for hover effects
  >
    {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
    {name}

    {/* Tooltip (speech bubble) */}
    {tooltip && (
      <div
        style={{
          visibility: 'hidden',
          opacity: 0,
          position: 'absolute',
          bottom: '120%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          zIndex: 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        className="tooltip"
      >
        {tooltip}
      </div>
    )}
  </span>
);

// Define the badge type
interface BadgeType {
  name: string;
  icon?: React.ReactNode;
  tooltip?: string; // Add tooltip as an optional field
}

// Define the category type
interface Category {
  name: string;
  description: string;
  link: string;
  badges: BadgeType[];
}

// Categories data
const categories: Category[] = [
  {
    name: 'Running Insights',
    description: `Track your running performance and elevate your fitness. 
                  Analyze your pace, stride length, and heart rate.`,
    link: '/categories/running',
    badges: [
      { name: 'Pace Master', icon: <FaRunning />, tooltip: 'Master your pace with precision tracking!' }, // Adding tooltip for hover effect
      { name: 'Marathon Pro', icon: <FaRunning /> },
      { name: 'Sprint Champion', icon: <FaRunning /> },
      { name: 'Trail Explorer', icon: <FaRunning /> },
      { name: 'Endurance Hero', icon: <FaRunning /> },
    ],
  },
  {
    name: 'Cycling Performance',
    description: `Optimize your cycling with insights on speed, cadence, and power.`,
    link: '/categories/cycling',
    badges: [
      { name: 'Speedster', icon: <FaBiking /> },
      { name: 'Hill Conqueror', icon: <FaBiking /> },
      { name: 'Endurance Rider', icon: <FaBiking /> },
      { name: 'Power Cyclist', icon: <FaBiking /> },
    ],
  },
  {
    name: 'Swimming Analytics',
    description: `Improve your swimming with stroke rate analysis and lap tracking.`,
    link: '/categories/swimming',
    badges: [
      { name: 'Stroke Specialist', icon: <FaSwimmer /> },
      { name: 'Lap Leader', icon: <FaSwimmer /> },
      { name: 'Breath Expert', icon: <FaSwimmer /> },
    ],
  },
  {
    name: 'Recovery & Health',
    description: `Achieve balance with insights on sleep, wellness, and recovery times.`,
    link: '/categories/recovery',
    badges: [
      { name: 'Sleep Tracker', icon: <FaBed /> },
      { name: 'Wellness Guru', icon: <FaBed /> },
      { name: 'Recovery Champ', icon: <FaBed /> },
    ],
  },
  {
    name: 'Custom Training Plans',
    description: `Tailor your training plans to match your fitness goals.`,
    link: '/categories/training-plans',
    badges: [
      { name: 'Strength Builder', icon: <FaDumbbell /> },
      { name: 'Flexibility Master', icon: <FaDumbbell /> },
      { name: 'Cardio Strategist', icon: <FaDumbbell /> },
    ],
  },
];

// Main component
const Categories: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleBadges = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const playAudio = () => {
    const audio = new Audio('/audio/sample.mp3'); // Replace with your audio file path
    audio.play();
  };

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          padding: '10px',
          backgroundColor: '#007BFF',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={playAudio}
      >
        <p style={{ margin: 0 }}>
          Welcome to the Categories Page. Click to hear about our features and badges.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Explore Categories</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {categories.map((category, index) => (
          <div key={index} style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
            {/* Category Info */}
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

            {/* Badges Section */}
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <h4 style={{ color: '#FFD700', marginBottom: '10px' }}>{`${category.name} Badges`}</h4>
              {category.badges.slice(0, 3).map((badge, badgeIndex) => (
                <Badge key={badgeIndex} name={badge.name} icon={badge.icon} tooltip={badge.tooltip} />
              ))}

              {/* Show More/Show Less */}
              {category.badges.length > 3 && (
                <>
                  {expandedCategory === category.name &&
                    category.badges.slice(3).map((badge, badgeIndex) => (
                      <Badge key={`expanded-${badgeIndex}`} name={badge.name} icon={badge.icon} tooltip={badge.tooltip} />
                    ))}
                  <div>
                    <button
                      onClick={() => toggleBadges(category.name)}
                      style={{
                        marginTop: '10px',
                        padding: '5px 15px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      {expandedCategory === category.name ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Other Badges Section */}
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            backgroundColor: '#444',
            borderRadius: '10px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#FFD700' }}>Other Badges</h3>
          <p>Explore additional badges for activities outside the main categories.</p>
          <Badge name="General Fitness" icon={<FaDumbbell />} />
          <Badge name="Cross-Training" icon={<FaRunning />} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Categories;
