import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer.tsx';  
import runnerIcon from '../../assets/runningicon.png';
import swimmerIcon from '../../assets/swimicon.png';
import cyclingIcon from '../../assets/cyclingicon.png';
import heartIcon from '../../assets/hearticon.png';
import weightIcon from '../../assets/weighticon.png';
import test1Audio from '../../assets/test1.mp3';

// Badge Component with optional graphic icon
const Badge: React.FC<{ name: string; icon?: React.ReactNode; tooltip?: string }> = ({ name, icon, tooltip }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      margin: '17px',
      padding: '8px 15px',
      backgroundColor: '#555',
      color: '#fff',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      position: 'relative', // Ensure positioning for the tooltip
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth hover transition
    }}
    className="badge" // Adding a class for hover effects
    onMouseEnter={(e) => {
      const tooltipElement = e.currentTarget.querySelector('.tooltip');
      if (tooltipElement) {
        (tooltipElement as HTMLElement).style.visibility = 'visible';
        (tooltipElement as HTMLElement).style.opacity = '1';
      }
    }}
    onMouseLeave={(e) => {
      const tooltipElement = e.currentTarget.querySelector('.tooltip');
      if (tooltipElement) {
        (tooltipElement as HTMLElement).style.visibility = 'hidden';
        (tooltipElement as HTMLElement).style.opacity = '0';
      }
    }}
  >
    {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
    {name}

    {/* Tooltip (speech bubble) */}
    {tooltip && (
      <div
        className="tooltip"
        style={{
          visibility: 'hidden', // Start with hidden visibility
          opacity: 0,
          position: 'absolute',
          top: '120%', // Move the tooltip below the badge
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FFEB3B', // Bright yellow background for high contrast
          color: '#333', // Dark text color for contrast
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          zIndex: 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
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
// Categories data
 
    const categories: Category[] = [
          {
            name: 'Running Insights',
            description: `Track your running performance and elevate your fitness. 
                          Analyze your pace, stride length, and heart rate.`,
            link: '/categories/running',
            badges: [
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Pace Master</span></div>, tooltip: 'To attain this badge, maintain exercise heartrate for thirty minutes' },
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Sprint Champion</span></div>, tooltip: 'To attain this badge, complete a hundred 100m sprints' },
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Half Bannister</span></div>, tooltip: 'To attain this badge, run an 8 minute mile' },
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Step Up Week</span></div>, tooltip: 'To attain this badge, complete 100,000 steps in a week' },
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Marathon Man</span></div>, tooltip: 'To attain this badge, run a marathon (42.1km) without walking' },
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Running Uphill</span></div>, tooltip: 'To attain this badge, complete a run with elevation gains of 1000 meters' },
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>5 Miler</span></div>, tooltip: 'To attain this badge, complete 5-mile run'},
              { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={runnerIcon} alt="Running Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Zato-Combo</span></div>, tooltip: 'To attain this badge, complete a 5km, 10km and marathon run within a week' },
      ],
    },
    {
    name: 'Cycling Performance',
    description: `Optimize your cycling with insights on speed, cadence, and power.`,
    link: '/categories/cycling',
    badges: [
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Tour De Year</span></div>, tooltip: 'To attain this badge, complete a Tour De France(3500kms) in a year' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>100 Club</span></div>, tooltip: 'To attain this badge, cycle hundred kms in a single ride' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Master Racer</span></div>, tooltip: 'To attain this badge, complete 30 km ride within an hour' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Speed Demon</span></div>, tooltip: 'To attain this badge, reach speeds of 50km/h' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Lance Legstrong</span></div>, tooltip: 'To attain this badge, cycle 160kms within a day' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Frequent Rider</span></div>, tooltip: 'To attain this badge, cycle (1km) twenty times in a month' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Elevate Your Ride</span></div>, tooltip: 'To attain this badge, ride in high elevation(1km above sea level)' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={cyclingIcon} alt="Cycling Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Sprint To Finish</span></div>, tooltip: 'To attain this badge, complete 750 metres cycling within a minute' },
    ],
    },
  {
    name: 'Swimming Analytics',
    description: `Improve your swimming with stroke rate analysis and lap tracking.`,
    link: '/categories/swimming',
    badges: [
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Laplander</span></div>, tooltip: 'To attain this badge, complete 50 full laps in a full-size pool in a single session' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Like a Fish </span></div>, tooltip: 'To attain this badge, swim continuously for an hour ' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Multi-Talented</span></div>, tooltip: 'To attain this badge, complete individual medley(400m) within six minutes' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Torpedo</span></div>, tooltip: 'To attain this badge, maintain speed of 5km/h for fifteen seconds' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Month Marathon</span></div>, tooltip: 'To attain this badge, swim 42 kms in a month' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Morning Swimmer</span></div>, tooltip: 'To attain this badge, swim before noon every day for a week' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Swim to Slim</span></div>, tooltip: 'To attain this badge, burn 500 kilocalories in a session' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={swimmerIcon} alt="Swimmer Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Night Swimming</span></div>, tooltip: 'To attain this badge, complete a single 30 minute swim after 6pm' },
    ],
  },
  {
    name: 'Recovery & Health',
    description: `Achieve balance with insights on sleep, wellness, and recovery times.`,
    link: '/categories/recovery',
    badges: [
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={heartIcon} alt="Heart Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Sleep to Recover</span></div>, tooltip: 'To attain this badge, achieve a fortnite of consistent sleeping times(within an hour)' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={heartIcon} alt="Heart Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Seven for Seven</span></div>, tooltip: 'To attain this badge, sleep for seven hours for seven days' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={heartIcon} alt="Heart Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>HR Reducer</span></div>, tooltip: 'To attain this badge, reduce resting heart rate by 10%' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={heartIcon} alt="Heart Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Sauna Superstar</span></div>, tooltip: 'To attain this badge, increase body temperature without movement (body temperature increase one degree)' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={heartIcon} alt="Heart Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Post Work Ice</span></div>, tooltip: 'To attain this badge, take an ice bath after sustained exercise (skin temperature 10Celsius for 5 minutes)' },
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={heartIcon} alt="Heart Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Rest is Best</span></div>, tooltip: 'To attain this badge, maintain a day of complete rest(no exercise) each week for a month' },
      
    ],
  },
  {
    name: 'Custom Training Plans',
    description: `Tailor your training plans to match your fitness goals.`,
    link: '/categories/training-plans',
    badges: [
      { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Try Athlete</span></div>, tooltip: 'To attain this badge, swim 300 meters, run 1km & cycle 20 kms in a day ' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Third Time</span></div>, tooltip: 'To attain this badge, complete three hour long workout sessions in a day ' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>King Consistency</span></div>, tooltip: 'To attain this badge, move for thirty consecutive minutes for thirty days' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Burn Up</span></div>, tooltip: 'To attain this badge, burn 700 calories in a workout session' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Steady Eddie</span></div>, tooltip: 'To attain this badge, maintain aerobic zone heartrate for 30 minutes' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>Row Row</span></div>, tooltip: 'To attain this badge, row a thousand strokes in a session(machine or on-water)' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>A For Effort</span></div>, tooltip: 'To attain this badge, exercise an hour every day for a week' },
        { icon: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><img src={weightIcon} alt="Weight Icon" style={{ width: '80px', height: '80px' }} /><span style={{ marginTop: '18px', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>A+ For Effort</span></div>, tooltip: 'To attain this badge, exercise an hour every day for a month' },
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
    const audio = new Audio(test1Audio); // Use imported path
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

        {/* Other Content */}
        <Footer />
      </div>
    </div>
  );
};

export default Categories;

