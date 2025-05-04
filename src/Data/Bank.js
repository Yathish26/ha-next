const DataBank = () => {
  const CategoryUILinks = [
    // Home Services
    '/cleaning', '/pest-control', '/plumbing', '/electrical-services',
    '/home-repairs-maintenance', '/landscaping-gardening', '/moving-relocation',
    '/painting-wall-repair', '/carpentry', '/appliance-installation',

    // Health & Wellness
    '/personal-training', '/nutrition-diet-counseling', '/mental-health-counseling',
    '/massage-therapy', '/physiotherapy', '/yoga-meditation', '/chiropractic-care',
    '/spa-relaxation-services', '/acupuncture', '/dermatology',

    // Automotive Services
    '/car-wash-detailing', '/oil-change-maintenance', '/vehicle-repair-service',
    '/tire-repair-replacement', '/battery-replacement', '/auto-glass-repair',
    '/roadside-assistance', '/vehicle-inspection', '/auto-painting-wrapping', '/towing-services',

    // Professional Services
    '/legal-consulting', '/financial-planning', '/tax-preparation-accounting',
    '/business-consulting', '/insurance-services', '/real-estate-agents',
    '/translation-services', '/marketing-advertising', '/human-resources-consulting',
    '/project-management',

    // Education
    '/tutoring-homework-help', '/language-classes', '/music-dance-classes',
    '/test-preparation', '/online-courses-certifications', '/art-craft-classes',
    '/skill-development', '/computer-coding-classes', '/cooking-classes',
    '/sports-fitness-training',

    // Events & Entertainment
    '/event-planning', '/photography-videography', '/dj-services', '/catering-services',
    '/party-rentals', '/live-performers-bands', '/decor-balloon-services', '/florists',
    '/wedding-planners', '/audio-visual-equipment-rental',

    // Personal Services
    '/personal-chef', '/errand-running', '/pet-grooming-boarding', '/personal-shoppers',
    '/life-coaching', '/fitness-coaching', '/babysitting-nanny-services',
    '/tailoring-alterations', '/laundry-dry-cleaning', '/house-sitting',

    // Technology Repair
    '/smartphone-tablet-repair', '/computer-laptop-repair', '/data-recovery-services',
    '/tv-repair', '/home-networking', '/game-console-repair', '/printer-scanner-repair',
    '/security-system-installation', '/smart-home-setup', '/software-troubleshooting',

    // Home & Interior
    '/interior-design', '/home-staging', '/custom-furniture-carpentry',
    '/flooring-installation', '/hvac-installation-repair', '/window-treatment-blinds',
    '/lighting-electrical-fixtures', '/closet-organization', '/kitchen-bath-remodeling',
    '/upholstery-services',

    // Delivery Services
    '/food-delivery', '/grocery-delivery', '/package-courier-delivery', '/flower-delivery',
    '/document-delivery', '/furniture-appliance-delivery', '/laundry-pickup-delivery',
    '/prescription-delivery', '/meal-kit-delivery', '/gift-special-occasion-delivery',

    //Others
    'bridal-makeup', 'skincare', 'doctors', 'contractors', 'gym', 'pet-care-services', 'it-tech-support',
    '/appliance-repair-services', '/home-renovation-remodeling',
  ]
  const Currencies = [
    '$', '€', '£', '¥', '₹'
  ];

  const workCategory = [
    'Accounting',
    'Advertising',
    'Aerospace',
    'Agricultural',
    'Apparel & Fashion',
    'Architecture',
    'Arts & Culture',
    'Automotive',
    'Aviation',
    'Banking',
    'Beauty',
    'Biotechnology',
    'Broadcast Media',
    'Business Services',
    'Chemical',
    'Civil Services',
    'Cleaning Services',
    'Commercial Real Estate',
    'Computer Software',
    'Construction',
    'Consulting',
    'Consumer Goods',
    'Creative Design',
    'Customer Service',
    'Cybersecurity',
    'Data Science',
    'Defense & Space',
    'Digital Marketing',
    'E-commerce',
    'Education',
    'Electrical',
    'Energy',
    'Engineering',
    'Entertainment',
    'Environmental',
    'Event Management',
    'Facilities Management',
    'Fashion',
    'Financial',
    'Fitness & Wellness',
    'Food & Beverage',
    'Forestry',
    'Gaming',
    'Government',
    'Healthcare',
    'Home Improvement',
    'Hospitality',
    'Human Resources',
    'Industrial Design',
    'Information Technology',
    'Insurance',
    'Interior Design',
    'Investment Banking',
    'Journalism',
    'Landscaping',
    'Legal',
    'Logistics',
    'Luxury Goods',
    'Manufacturing',
    'Marine',
    'Marketing',
    'Media',
    'Mining',
    'Music',
    'Non-Profit',
    'Oil & Gas',
    'Pharmaceutical',
    'Photography',
    'Publishing',
    'Real Estate',
    'Renewable Energy',
    'Retail',
    'Robotics',
    'Safety & Security',
    'Science & Research',
    'Sports',
    'Student',
    'Telecommunications',
    'Textiles',
    'Transportation',
    'Travel & Tourism',
    'Utilities',
    'Veterinary Services',
    'Video Production',
    'Wholesale',
    'Other'
  ];

  const blogCategories = [
    "Technology",
    "News",
    "Health",
    "Lifestyle",
    "Travel",
    "Food",
    "Business",
    "Fashion",
    "Entertainment",
    "Sports",
    "Finance",
    "Education",
    "Science",
    "Environment",
    'Horoscope',
    "Automobiles",
    "Photography",
    "Movies",
    "Music",
    "Art",
    "Books",
    "Gaming",
    "Politics",
    "History",
    "Culture",
    "Relationships",
    "Fitness",
    "Animals",
    "Career",
    "Startup",
    "Programming",
    "Motivation",
    "Cryptocurrency",
    "Social",
    "Space",
  ];

  const popularBlogCategories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Travel",
    "Food",
    "Business",
    "Fashion",
    "Entertainment",
    "Sports",
    "Finance",
  ];

  const employmenttype = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ];

  const explevel = [
    "Entry-level",
    "Junior-level",
    "Mid-level",
    "Senior-level",
    "Executive-level",
  ];

  const LocationTypes = [
    'Hybrid',
    'Remote',
    'On-site',
  ];

  const JobCat = [
    "Accounting and Finance",
    "Administrative and Office Support",
    "Advertising and Marketing",
    "Arts and Design",
    "Business and Management",
    "Construction and Trades",
    "Customer Service",
    "Education and Training",
    "Engineering",
    "Healthcare and Medical",
    "Hospitality and Tourism",
    "Human Resources",
    "Information Technology",
    "Legal",
    "Logistics and Supply Chain",
    "Manufacturing and Production",
    "Media and Communications",
    "Nonprofit and Volunteering",
    "Project Management",
    "Real Estate",
    "Research and Development",
    "Retail and Sales",
    "Science and Biotechnology",
    "Security and Protective Services",
    "Social Services and Counseling",
    "Sports and Recreation",
    "Transportation and Warehousing",
    "Writing and Editing",
  ];

  const homepngImages = [
    { title: 'Cleaners', img: "https://i.ibb.co/ksJzhRRK/image.png" },
    { title: 'Plumbers', img: "https://cdn.rotorootercdn.com/images/images/services/plumbing-hero.png" },
    { title: 'Electricians', img: "https://png.pngtree.com/png-clipart/20231020/original/pngtree-power-lineman-electrician-png-image_13377739.png" },
    { title: 'Carpenters', img: "https://www.pngall.com/wp-content/uploads/5/Carpenter-PNG-Image.png" },
    { title: 'Gardener', img: "https://static.vecteezy.com/system/resources/thumbnails/053/647/744/small/an-old-woman-dressed-as-a-gardener-with-a-troop-of-tools-in-a-lush-garden-setting-ideal-for-illustrating-gardening-and-senior-life-themes-in-contexts-like-community-projects-and-advertisements-png.png" },
  ]

  return { CategoryUILinks, homepngImages, Currencies, workCategory, blogCategories, popularBlogCategories, employmenttype, explevel, LocationTypes, JobCat };

}

export default DataBank