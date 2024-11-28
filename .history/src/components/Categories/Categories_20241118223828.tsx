import React from 'react';

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
    name: 'Cycling Performance',
    description: 'Track cadence, speed, and power output to optimize your cycling routines and hit new personal bests.',
    link: '/categories/cycling',
    badges: [
      { name: 'Cadence' },
      { name: 'Speed' },
      { name: 'Power' },
    ],
  },
  {
    name: 'Running Insights',
    description: 'Analyze pace, stride length, and heart rate to achieve your running goals effectively.',
    link: '/categories/running',
    badges: [
      { name: 'Pace' },
      { name: 'Stride Length' },
      { name: 'Heart Rate' },
    ],
  },
  {
    name: 'Swimming Analytics',
    description: 'Monitor stroke rate, lap times, and breathing patterns for smarter swim training.',
    link: '/categories/swimming',
    badges: [
      { name: 'Stroke Rate' },
      { name: 'Lap Times' },
      { name: 'Breathing Patterns' },
    ],
  },
  {
    name: 'Recovery & Health',
    description: 'Understand your recovery times, sleep quality, and overall wellness for balanced training.',
    link: '/categories/recovery',
    badges: [
      { name: 'Recovery Time' },
      { name: 'Sleep Quality' },
      { name: 'Wellness Score' },
    ],
  },
  {
    name: 'Custom Training Plans',
    description: 'Create and customize training schedules tailored to your sport and fitness goals.',
    link: '/categories/training-plans',
    badges: [
      { name: 'Strength Plan' },
      { name: 'Endurance Plan' },
      { name: 'Flexibility Plan' },
    ],
  },
];

// Main Categories component
const Categories: React.FC = () => (
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
    <div style={{ padding: '20px', textAlign: 'center' }}>
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
            {category.badges.map((badge, badgeIndex) => (
              <span
                key={badgeIndex}
                style={{
                  display: 'inline-block',
                  margin: '5px',
                  padding: '5px 10px',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  borderRadius: '5px',
                  fontSize: '12px',
                }}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Categories;
