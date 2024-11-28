import React, { useState } from 'react';

// Define types for categories and badges
interface Badge {
  name: string;
}

interface Category {
  name: string;
  description: string;
  link: string;
  badges: Badge[];
}

// Data for categories and badges
const categories: Category[] = [
  {
    name: 'Running Insights',
    description: 'Analyze pace, stride length, and heart rate to achieve your running goals effectively.',
    link: '/categories/running',
    badges: [
      { name: 'Pace Master' },
      { name: 'Marathon Pro' },
      { name: 'Sprint Champion' },
      { name: 'Trail Explorer' },
      { name: 'Endurance Hero' },
    ],
  },
  {
    name: 'Cycling Performance',
    description: 'Track cadence, speed, and power output to optimize your cycling routines and hit new personal bests.',
    link: '/categories/cycling',
    badges: [
      { name: 'Speedster' },
      { name: 'Hill Conqueror' },
      { name: 'Endurance Rider' },
      { name: 'Power Cyclist' },
    ],
  },
  {
    name: 'Swimming Analytics',
    description: 'Monitor stroke rate, lap times, and breathing patterns for smarter swim training.',
    link: '/categories/swimming',
    badges: [
      { name: 'Stroke Specialist' },
      { name: 'Lap Leader' },
      { name: 'Breath Expert' },
    ],
  },
  {
    name: 'Recovery & Health',
    description: 'Understand your recovery times, sleep quality, and overall wellness for balanced training.',
    link: '/categories/recovery',
    badges: [
      { name: 'Sleep Tracker' },
      { name: 'Wellness Guru' },
      { name: 'Recovery Champ' },
    ],
  },
  {
    name: 'Custom Training Plans',
    description: 'Create and customize training schedules tailored to your sport and fitness goals.',
    link: '/categories/training-plans',
    badges: [
      { name: 'Strength Builder' },
      { name: 'Flexibility Master' },
      { name: 'Cardio Strategist' },
    ],
  },
];

// Badge component
const Badge: React.FC<{ name: string }> = ({ name }) => (
  <span
    style={{
      display: 'inline-block',
      margin: '5px',
      padding: '5px 10px',
      backgroundColor: '#007BFF',
      color: 'white',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
    }}
  >
    {name}
  </span>
);

// Main Categories component
const Categories: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleBadges = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', textAlign: 'center' }}>
        <a
          href="#"
          style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Click here to listen...
        </a>
      </div>

      {/* Heading */}
      <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
        <h1>Explore Categories</h1>
      </div>

      {/* Categories Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {categories.map((category, index) => (
          <div key={index} style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
            {/* Category Name */}
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

            {/* Badges for the category */}
            <div style={{ margin: '10px 0', textAlign: 'center' }}>
              {category.badges.slice(0, 3).map((badge, badgeIndex) => (
                <Badge key={badgeIndex} name={badge.name} />
              ))}

              {/* Dropdown Button to View More Badges */}
              {category.badges.length > 3 && (
                <>
                  {expandedCategory === category.name &&
                    category.badges.slice(3).map((badge, badgeIndex) => (
                      <Badge key={`expanded-${badgeIndex}`} name={badge.name} />
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
      </div>
    </div>
  );
};

export default Categories;
