import React from 'react';

// Define a type for categories
interface Category {
  name: string;
  description: string;
  link: string;
}

const categories: Category[] = [
  {
    name: 'Cycling Performance',
    description: 'Track cadence, speed, and power output to optimize your cycling routines and hit new personal bests.',
    link: '/categories/cycling',
  },
  {
    name: 'Running Insights',
    description: 'Analyze pace, stride length, and heart rate to achieve your running goals effectively.',
    link: '/categories/running',
  },
  {
    name: 'Swimming Analytics',
    description: 'Monitor stroke rate, lap times, and breathing patterns for smarter swim training.',
    link: '/categories/swimming',
  },
  {
    name: 'Recovery & Health',
    description: 'Understand your recovery times, sleep quality, and overall wellness for balanced training.',
    link: '/categories/recovery',
  },
  {
    name: 'Custom Training Plans',
    description: 'Create and customize training schedules tailored to your sport and fitness goals.',
    link: '/categories/training-plans',
  },
];

const Categories: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Explore Categories</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {categories.map((category) => (
          <div
            key={category.name}
            style={{
              border: '1px solid white',
              borderRadius: '10px',
              padding: '20px',
              width: '300px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
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
        ))}
      </div>
    </div>
  );
};

export default Categories;