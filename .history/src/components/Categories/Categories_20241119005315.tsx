import React, { useState } from 'react';
import { FaRunning, FaBiking, FaSwimmer, FaBed, FaDumbbell } from 'react-icons/fa';

// Badge Component with optional graphic icon and hover functionality
const Badge: React.FC<{ name: string; icon?: React.ReactNode; showSpeechBubble?: boolean }> = ({ name, icon, showSpeechBubble }) => (
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
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={() => showSpeechBubble && (document.getElementById(name)?.style.display = 'block')}
    onMouseLeave={() => showSpeechBubble && (document.getElementById(name)?.style.display = 'none')}
  >
    {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
    {name}
    
    {/* Speech Bubble */}
    {showSpeechBubble && (
      <div
        id={name}
        style={{
          position: 'absolute',
          top: 'calc(100% + 5px)',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#000',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '10px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          display: 'none', // initially hidden
          zIndex: 10,
        }}
      >
        Keep pushing your limits and improve your performance!
      </div>
    )}
  </span>
);

// Define the badge type
interface BadgeType {
  name: string;
  icon?: React.ReactNode;
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
      { name: 'Pace Master', icon: <FaRunning /> },
      { name: 'Marathon Pro', icon: <FaRunning /> },
      { name: 'Sprint Champion', icon: <FaRunning /> },
      { name: 'Trail Explorer', icon: <FaRunning /> },
      { name: 'Endurance Hero', icon: <FaRunning /> },
    ],
  },
  // Other categories...
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
              {category.name === 'Running Insights' ? (
                // Show badges with hover effect for 'Running Insights'
                category.badges.slice(0, 3).map((badge, badgeIndex) => (
                  <Badge key={badgeIndex} name={badge.name} icon={badge.icon} showSpeechBubble />
                ))
              ) : (
                // Default badge display for other categories
                category.badges.slice(0, 3).map((badge, badgeIndex) => (
                  <Badge key={badgeIndex} name={badge.name} icon={badge.icon} />
                ))
              )}

              {/* Show More/Show Less */}
              {category.badges.length > 3 && (
                <>
                  {expandedCategory === category.name &&
                    category.badges.slice(3).map((badge, badgeIndex) => (
                      <Badge key={`expanded-${badgeIndex}`} name={badge.name} icon={badge.icon} />
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
    </div>
  );
};

export default Categories;

