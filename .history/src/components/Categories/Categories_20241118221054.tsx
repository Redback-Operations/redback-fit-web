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

// Component for individual category card
const CategoryCard: React.FC<Category> = ({ name, description, link, badges }) => (
  <div
    style={{
      border: '1px solid white',
      borderRadius: '10px',
      padding: '20px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      color: 'white',
      backgroundColor: '#333',
    }}
  >
    <h3>{name}</h3>
    <p>{description}</p>
    <div style={{ margin: '10px 0' }}>
      {badges.slice(0, 3).map((badge, index) => (
        <span
          key={index}
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
    <a
      href={link}
      style={{
        color: '#007BFF',
        textDecoration: 'none',
        fontWeight: 'bold',
      }}
    >
      See All Badges
    </a>
  </div>
);

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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {categories.map((category) => (
        <CategoryCard key={category.name} {...category} />
      ))}
    </div>
  </div>
);

export default Categories;
