import { NextResponse } from 'next/server'
import { db, checkDbConnection } from '@/lib/db'
import { getSession } from '@/lib/session'

// Default seed data copy to enable programmatic re-seeding
const DEFAULT_GUESTS = [
  {
    id: 'guest1',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh@email.com',
    phone: '+91 98765 43210',
    password: 'guest123',
    nationality: 'Indian',
    city: 'Mumbai',
    country: 'India',
    notes: 'Prefers backwater view rooms',
  },
  {
    id: 'guest2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@email.com',
    phone: '+1 234 567 8900',
    password: 'guest123',
    nationality: 'American',
    city: 'New York',
    country: 'USA',
    notes: 'Vegetarian, allergic to nuts',
  },
  {
    id: 'guest3',
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit@email.com',
    phone: '+91 98765 12345',
    password: 'guest123',
    nationality: 'Indian',
    city: 'Bangalore',
    country: 'India',
    notes: 'VIP guest - always upgrade',
  },
  {
    id: 'guest4',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily@email.com',
    phone: '+65 1234 5678',
    password: 'guest123',
    nationality: 'Singaporean',
    city: 'Singapore',
    country: 'Singapore',
    notes: 'Honeymoon couple',
  },
  {
    id: 'guest5',
    firstName: 'Mohammed',
    lastName: 'Ali',
    email: 'mohammed@email.com',
    phone: '+971 50 123 4567',
    password: 'guest123',
    nationality: 'Emirati',
    city: 'Dubai',
    country: 'UAE',
    notes: 'Prefers halal food',
  },
  {
    id: 'guest6',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya@email.com',
    phone: '+91 99887 76543',
    password: 'guest123',
    nationality: 'Indian',
    city: 'Delhi',
    country: 'India',
    notes: '',
  }
]

const DEFAULT_ROOMS = [
  {
    id: 'room1',
    name: 'Backwater Villa',
    slug: 'backwater-villa',
    description: 'Traditional Kerala architecture with modern amenities overlooking the serene backwaters',
    longDescription: 'Wake up to the gentle sound of water and the sight of fishing boats gliding past your window. Our Backwater Villas offer an immersive experience of Kerala\'s famous waterways, featuring traditional wooden architecture with modern comforts. Each villa has a private deck where you can watch the sunset paint the waters in golden hues.',
    price: 15000,
    size: '120 m²',
    maxGuests: 2,
    beds: '1 King Bed',
    view: 'Backwater View',
    features: JSON.stringify(['Private Deck', 'Canoe Ride', 'Sunset View', 'Outdoor Bath']),
    amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker']),
    images: JSON.stringify(['/images/room-collage.jpg']),
    active: true,
    sortOrder: 1
  },
  {
    id: 'room2',
    name: 'Coconut Grove Suite',
    slug: 'coconut-grove-suite',
    description: 'Nestled among swaying coconut palms with authentic Kerala decor',
    longDescription: 'Surrounded by towering coconut palms that sway in the gentle breeze, these suites offer a true tropical retreat. The interiors feature bamboo furniture and coconut wood accents, celebrating the versatile tree that Kerala is famous for. Enjoy your morning chai on the private balcony as birds sing in the grove.',
    price: 12000,
    size: '95 m²',
    maxGuests: 2,
    beds: '1 King Bed',
    view: 'Garden View',
    features: JSON.stringify(['Garden View', 'Outdoor Bath', 'Bird Watching', 'Private Balcony']),
    amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker']),
    images: JSON.stringify(['/images/room-collage-2.jpg']),
    active: true,
    sortOrder: 2
  },
  {
    id: 'room3',
    name: 'Heritage Nalukettu',
    slug: 'heritage-nalukettu',
    description: 'Traditional Kerala courtyard house with wooden architecture',
    longDescription: 'Experience authentic Kerala living in our Heritage Nalukettu villas. These traditional courtyard houses feature intricate wood carvings, a central open courtyard (nadumuttam), and architecture that has been perfected over centuries. The natural ventilation and earthy tones create a cool, serene atmosphere.',
    price: 18000,
    size: '150 m²',
    maxGuests: 4,
    beds: '2 Queen Beds',
    view: 'Courtyard View',
    features: JSON.stringify(['Courtyard', 'Wood Carvings', 'Heritage Style', 'Rain Shower']),
    amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker']),
    images: JSON.stringify(['/images/exterior-interior-collage.jpg']),
    active: true,
    sortOrder: 3
  }
]

const DEFAULT_BOOKINGS = [
  {
    confirmationCode: 'BK001',
    guestId: 'guest1',
    roomId: 'room1',
    checkIn: new Date('2024-01-15'),
    checkOut: new Date('2024-01-18'),
    adults: 2,
    children: 0,
    totalPrice: 45000,
    depositPaid: 15000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-10')
  },
  {
    confirmationCode: 'BK002',
    guestId: 'guest2',
    roomId: 'room3',
    checkIn: new Date('2024-01-16'),
    checkOut: new Date('2024-01-19'),
    adults: 4,
    children: 1,
    totalPrice: 54000,
    depositPaid: 0,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-11')
  },
  {
    confirmationCode: 'BK003',
    guestId: 'guest3',
    roomId: 'room1',
    checkIn: new Date('2024-01-17'),
    checkOut: new Date('2024-01-20'),
    adults: 2,
    children: 0,
    totalPrice: 45000,
    depositPaid: 45000,
    status: 'checked_in',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-12')
  },
  {
    confirmationCode: 'BK004',
    guestId: 'guest4',
    roomId: 'room2',
    checkIn: new Date('2024-01-18'),
    checkOut: new Date('2024-01-21'),
    adults: 2,
    children: 0,
    totalPrice: 36000,
    depositPaid: 36000,
    status: 'checked_out',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-13')
  },
  {
    confirmationCode: 'BK005',
    guestId: 'guest5',
    roomId: 'room3',
    checkIn: new Date('2024-01-19'),
    checkOut: new Date('2024-01-20'),
    adults: 2,
    children: 0,
    totalPrice: 18000,
    depositPaid: 0,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: new Date('2024-01-14')
  }
]

const DEFAULT_EXPERIENCES = [
  {
    name: 'Houseboat Cruise',
    slug: 'houseboat-cruise',
    description: 'Drift through the enchanting backwaters on a traditional Kettuvallam houseboat',
    longDescription: 'Experience the magic of Kerala\'s backwaters aboard a traditional Kettuvallam houseboat. These converted rice barges feature comfortable bedrooms, a dining area, and an open deck for viewing the passing scenery. Your private chef will prepare authentic Kerala cuisine as you drift past villages, paddy fields, and coconut groves.',
    duration: 'Full Day / Overnight',
    price: 25000,
    priceType: 'per_couple',
    highlights: JSON.stringify(['Private chef', 'Sunset views', 'Village life', 'Traditional cuisine']),
    images: JSON.stringify(['/images/experience-1.png']),
    active: true,
    featured: true,
    sortOrder: 1
  },
  {
    name: 'Ayurveda Wellness',
    slug: 'ayurveda-wellness',
    description: 'Rejuvenate with authentic Ayurvedic treatments and therapies',
    longDescription: 'Kerala is the birthplace of Ayurveda, the 5000-year-old science of life. Our wellness center offers authentic treatments passed down through generations, using traditional herbs and oils sourced from Kerala\'s pristine forests.',
    duration: '1-21 Days Programs',
    price: 5000,
    priceType: 'per_session',
    highlights: JSON.stringify(['Certified practitioners', 'Traditional herbs', 'Holistic healing', 'Custom programs']),
    images: JSON.stringify(['/images/spa.png']),
    active: true,
    featured: true,
    sortOrder: 2
  },
  {
    name: 'Village Life Experience',
    slug: 'village-life-experience',
    description: 'Immerse yourself in Kerala\'s rich culture and traditions',
    longDescription: 'Step into the authentic Kerala village life with our guided tours. Visit local coir making units, watch traditional fishing techniques, learn about paddy cultivation, and interact with local artisans. Experience the simplicity and warmth of rural Kerala.',
    duration: 'Half Day',
    price: 2500,
    priceType: 'per_person',
    highlights: JSON.stringify(['Coir making', 'Fishing demo', 'Paddy fields', 'Local artisans']),
    images: JSON.stringify(['/images/indoor-activity.jpg']),
    active: true,
    featured: false,
    sortOrder: 3
  },
  {
    name: 'Kathakali Performance',
    slug: 'kathakali-performance',
    description: 'Witness the ancient art form of Kerala\'s classical dance-drama',
    longDescription: 'Watch the classical dance-drama of Kerala characterized by grotesque makeup, detailed gestures, and well-defined body movements. Learn about the makeup process before the show starts.',
    duration: '2-3 Hours',
    price: 1500,
    priceType: 'per_person',
    highlights: JSON.stringify(['Traditional makeup', 'Classical music', 'Epic stories', 'Photo opportunity']),
    images: JSON.stringify(['/images/gallery-2.png']),
    active: true,
    featured: false,
    sortOrder: 4
  },
  {
    name: 'Sunset Canoe Ride',
    slug: 'sunset-canoe-ride',
    description: 'Paddle through narrow canals as the sun sets over the backwaters',
    longDescription: 'Take a quiet canoe ride through narrow canals where houseboats cannot reach. Observe rural life from a close distance and enjoy the sunset.',
    duration: '2 Hours',
    price: 1000,
    priceType: 'per_person',
    highlights: JSON.stringify(['Narrow canals', 'Sunset views', 'Bird watching', 'Village glimpses']),
    images: JSON.stringify(['/images/gallery-5.png']),
    active: true,
    featured: false,
    sortOrder: 5
  },
  {
    name: 'Spice Plantation Tour',
    slug: 'spice-plantation-tour',
    description: 'Explore the aromatic spice gardens of the Western Ghats',
    longDescription: 'Take a guided tour through spice plantations growing cardamom, pepper, cloves, and cinnamon. Learn about their cultivation and medicinal properties.',
    duration: 'Full Day',
    price: 3500,
    priceType: 'per_person',
    highlights: JSON.stringify(['Cardamom fields', 'Pepper vines', 'Traditional lunch', 'Spice shopping']),
    images: JSON.stringify(['/images/gallery-6.png']),
    active: true,
    featured: false,
    sortOrder: 6
  },
  {
    name: 'Kerala Cooking Class',
    slug: 'kerala-cooking-class',
    description: 'Learn to prepare authentic Kerala dishes with our master chefs',
    longDescription: 'Learn to prepare authentic Kerala dishes with our master chefs. Take home recipes and skills to recreate the flavors of Kerala in your own kitchen.',
    duration: '3 Hours',
    price: 2000,
    priceType: 'per_person',
    highlights: JSON.stringify(['Fresh spices', 'Seafood prep', 'Recipe booklet', 'Meal included']),
    images: JSON.stringify(['/images/gallery-1.png']),
    active: true,
    featured: true,
    sortOrder: 7
  },
  {
    name: 'Yoga & Meditation',
    slug: 'yoga-and-meditation',
    description: 'Find inner peace with traditional yoga and meditation sessions',
    longDescription: 'Begin your morning with Hatha Yoga and meditation overlooking the calm backwaters. Perfect for all skill levels.',
    duration: '1-2 Hours',
    price: 0,
    priceType: 'complimentary',
    highlights: JSON.stringify(['Hatha yoga', 'Pranayama', 'Backwater views', 'All levels welcome']),
    images: JSON.stringify(['/images/spa.png']),
    active: true,
    featured: false,
    sortOrder: 8
  }
]

const DEFAULT_TREATMENTS = [
  {
    id: 't1',
    name: 'Panchakarma',
    slug: 'panchakarma',
    sanskrit: 'പഞ്ചകർമ്മം',
    description: 'Complete detoxification program',
    longDescription: 'Panchakarma is the ultimate Ayurvedic detoxification and rejuvenation therapy. It involves five therapeutic actions that cleanse the body of toxins and restore biological balance.',
    duration: '21-28 Days',
    price: 95000,
    benefits: JSON.stringify(['Deep detoxification', 'Restored balance', 'Enhanced immunity', 'Mental clarity']),
    images: JSON.stringify(['/images/spa.png']),
    active: true,
    featured: true,
    sortOrder: 1
  },
  {
    id: 't2',
    name: 'Shirodhara',
    slug: 'shirodhara',
    sanskrit: 'ശിരോധാര',
    description: 'Meditative oil therapy',
    longDescription: 'A continuous stream of warm herbal oil is gently poured over the forehead (third eye). Highly effective for stress, anxiety, insomnia, and mental fatigue.',
    duration: '45-60 Minutes',
    price: 5000,
    benefits: JSON.stringify(['Deep relaxation', 'Better sleep', 'Mental clarity', 'Stress relief']),
    images: JSON.stringify(['/images/gallery-1.png']),
    active: true,
    featured: true,
    sortOrder: 2
  },
  {
    id: 't3',
    name: 'Abhyanga',
    slug: 'abhyanga',
    sanskrit: 'അഭ്യംഗ',
    description: 'Full body massage',
    longDescription: 'A traditional full-body massage using warm, herb-infused Ayurvedic oils selected according to your body type (Dosha). Relieves fatigue and improves sleep.',
    duration: '60-90 Minutes',
    price: 4000,
    benefits: JSON.stringify(['Improved circulation', 'Skin nourishment', 'Fatigue relief', 'Muscle relaxation']),
    images: JSON.stringify(['/images/gallery-2.png']),
    active: true,
    featured: false,
    sortOrder: 3
  },
  {
    id: 't4',
    name: 'Nasyam',
    slug: 'nasyam',
    sanskrit: 'നസ്യം',
    description: 'Nasal treatment therapy',
    longDescription: 'Administration of herbal oils through the nasal passages to cleanse and open channels in the head, relieving sinus issues and headaches.',
    duration: '30-45 Minutes',
    price: 3500,
    benefits: JSON.stringify(['Sinus relief', 'Improved breathing', 'Mental clarity', 'Headache relief']),
    images: JSON.stringify(['/images/gallery-3.png']),
    active: true,
    featured: false,
    sortOrder: 4
  },
  {
    id: 't5',
    name: 'Udvarthanam',
    slug: 'udvarthanam',
    sanskrit: 'ഉദ്വർത്ഥനം',
    description: 'Herbal powder massage',
    longDescription: 'A therapeutic deep-tissue massage using dry herbal powders. Excellent for weight loss, improving skin complexion, and boosting metabolism.',
    duration: '60 Minutes',
    price: 4500,
    benefits: JSON.stringify(['Weight reduction', 'Skin toning', 'Cellulite reduction', 'Metabolism boost']),
    images: JSON.stringify(['/images/gallery-4.png']),
    active: true,
    featured: false,
    sortOrder: 5
  },
  {
    id: 't6',
    name: 'Pizhichil',
    slug: 'pizhichil',
    sanskrit: 'പിഴിച്ചിൽ',
    description: 'Oil bath therapy',
    longDescription: 'An exceptional therapy combining oil massage and heat. Warm medicated oil is squeezed over the entire body, helping with joint pain and stiffness.',
    duration: '60-90 Minutes',
    price: 6000,
    benefits: JSON.stringify(['Deep rejuvenation', 'Joint health', 'Neurological benefits', 'Skin nourishment']),
    images: JSON.stringify(['/images/gallery-5.png']),
    active: true,
    featured: true,
    sortOrder: 6
  }
]

const DEFAULT_PACKAGES = [
  {
    name: 'Rejuvenation Package',
    slug: 'rejuvenation-package',
    description: '7 days of revitalizing treatments for body and mind',
    duration: '7 Days',
    treatments: JSON.stringify(['Abhyanga', 'Shirodhara', 'Herbal Bath', 'Yoga']),
    price: 45000,
    active: true,
    featured: true,
    sortOrder: 1
  },
  {
    name: 'Detox Package',
    slug: 'detox-package',
    description: '14 days of deep cleansing and purification',
    duration: '14 Days',
    treatments: JSON.stringify(['Panchakarma Prep', 'Abhyanga', 'Nasyam', 'Specialized Diet']),
    price: 95000,
    active: true,
    featured: true,
    sortOrder: 2
  },
  {
    name: 'Stress Relief Package',
    slug: 'stress-relief-package',
    description: '5 days focused on relaxation and mental wellness',
    duration: '5 Days',
    treatments: JSON.stringify(['Shirodhara', 'Head Massage', 'Yoga', 'Meditation']),
    price: 28000,
    active: true,
    featured: false,
    sortOrder: 3
  },
  {
    name: 'Weight Management',
    slug: 'weight-management-package',
    description: '21 days of targeted treatments and diet',
    duration: '21 Days',
    treatments: JSON.stringify(['Udvarthanam', 'Herbal Steam', 'Specialized Diet', 'Yoga']),
    price: 150000,
    active: true,
    featured: false,
    sortOrder: 4
  }
]

const DEFAULT_VENUES = [
  {
    name: 'The Backwater Restaurant',
    slug: 'the-backwater-restaurant',
    description: 'Our main restaurant offers panoramic views of the backwaters while you enjoy authentic Kerala cuisine prepared with locally sourced ingredients.',
    cuisine: 'Kerala & International',
    capacity: '80 guests',
    timing: '7:00 AM - 10:00 PM',
    images: JSON.stringify(['/images/gallery-3.png']),
    active: true,
    sortOrder: 1
  },
  {
    name: 'Sunset Chai Lounge',
    slug: 'sunset-chai-lounge',
    description: 'Relax with fresh chai and local snacks while watching the sun set over the backwaters. The perfect spot for afternoon relaxation.',
    cuisine: 'Snacks & Beverages',
    capacity: '40 guests',
    timing: '3:00 PM - 7:00 PM',
    images: JSON.stringify(['/images/gallery-4.png']),
    active: true,
    sortOrder: 2
  },
  {
    name: 'Private Dining Pavilion',
    slug: 'private-dining-pavilion',
    description: 'For special occasions, reserve our private dining pavilion for an intimate dining experience with personalized menu and butler service.',
    cuisine: 'Custom Menu',
    capacity: '12 guests',
    timing: 'By Reservation',
    images: JSON.stringify(['/images/gallery-5.png']),
    active: true,
    sortOrder: 3
  }
]

const DEFAULT_DISHES = [
  {
    name: 'Karimeen Pollichathu',
    description: 'Pearl spot fish marinated with spices and wrapped in banana leaf',
    price: 650,
    veg: false,
    imageUrl: '/images/dining-1.png',
    active: true,
    featured: true,
    sortOrder: 1
  },
  {
    name: 'Kerala Sadya',
    description: 'Traditional vegetarian feast with 24+ dishes served on banana leaf',
    price: 750,
    veg: true,
    imageUrl: '/images/dining-2.png',
    active: true,
    featured: true,
    sortOrder: 2
  },
  {
    name: 'Appam & Stew',
    description: 'Fermented rice pancakes with creamy vegetable or meat stew',
    price: 350,
    veg: true,
    imageUrl: '/images/dining-3.png',
    active: true,
    featured: true,
    sortOrder: 3
  },
  {
    name: 'Chemmeen Curry',
    description: 'Kerala-style prawn curry with coconut milk and kokum',
    price: 550,
    veg: false,
    imageUrl: '/images/dining-4.png',
    active: true,
    featured: false,
    sortOrder: 4
  },
  {
    name: 'Puttu & Kadala',
    description: 'Steamed rice cake with black chickpea curry - a breakfast favorite',
    price: 250,
    veg: true,
    imageUrl: '/images/gallery-1.png',
    active: true,
    featured: false,
    sortOrder: 5
  },
  {
    name: 'Palada Payasam',
    description: 'Traditional rice flake dessert in sweetened milk',
    price: 200,
    veg: true,
    imageUrl: '/images/gallery-2.png',
    active: true,
    featured: false,
    sortOrder: 6
  }
]

const DEFAULT_GALLERY_IMAGES = [
  { title: 'Sunrise over the Backwaters', description: 'The golden hour paints the waters in magical hues', category: 'backwaters', imageUrl: '/images/birds-view.jpg', featured: true, active: true, sortOrder: 1 },
  { title: 'Heritage Villa', description: 'Traditional Kerala architecture meets modern comfort', category: 'resort', imageUrl: '/images/room-collage.jpg', featured: false, active: true, sortOrder: 2 },
  { title: 'Kathakali Performance', description: 'The ancient art form of Kerala', category: 'culture', imageUrl: '/images/gallery-2.png', featured: true, active: true, sortOrder: 3 },
  { title: 'Pool Villa', description: 'Private plunge pool with garden views', category: 'resort', imageUrl: '/images/front-exterior.jpg', featured: false, active: true, sortOrder: 4 },
  { title: 'Ayurveda Treatment', description: 'Authentic healing therapies', category: 'wellness', imageUrl: '/images/birds-view.jpg', featured: false, active: true, sortOrder: 5 },
  { title: 'Houseboat at Sunset', description: 'Cruising through paradise', category: 'backwaters', imageUrl: '/images/gallery-5.png', featured: true, active: true, sortOrder: 6 },
  { title: 'Kerala Sadya', description: 'Traditional feast on banana leaf', category: 'cuisine', imageUrl: '/images/gallery-6.png', featured: false, active: true, sortOrder: 7 },
  { title: 'Backwater Villa', description: 'Serene views from your room', category: 'resort', imageUrl: '/images/room-collage.jpg', featured: false, active: true, sortOrder: 8 },
  { title: 'Coconut Grove Suite', description: 'Amongst the coconut palms', category: 'resort', imageUrl: '/images/room-collage-2.jpg', featured: false, active: true, sortOrder: 9 },
  { title: 'Heritage Nalukettu', description: 'Traditional courtyard house', category: 'resort', imageUrl: '/images/exterior-interior-collage.jpg', featured: false, active: true, sortOrder: 10 },
  { title: 'Houseboat Experience', description: 'Floating through the backwaters', category: 'backwaters', imageUrl: '/images/experience-1.png', featured: false, active: true, sortOrder: 11 },
  { title: 'Village Tour', description: 'Experiencing local life', category: 'culture', imageUrl: '/images/indoor-activity.jpg', featured: false, active: true, sortOrder: 12 },
  { title: 'Spa Interior', description: 'Tranquil wellness space', category: 'wellness', imageUrl: '/images/spa.png', featured: false, active: true, sortOrder: 13 },
  { title: 'Karimeen Pollichathu', description: 'Signature Kerala dish', category: 'cuisine', imageUrl: '/images/dining-1.png', featured: false, active: true, sortOrder: 14 },
  { title: 'Traditional Breakfast', description: 'Appam and stew', category: 'cuisine', imageUrl: '/images/dining-2.png', featured: false, active: true, sortOrder: 15 },
]

const DEFAULT_INQUIRIES = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    phone: '+91 98765 43210',
    checkIn: new Date('2024-02-15'),
    checkOut: new Date('2024-02-18'),
    guests: 2,
    roomType: 'Backwater Villa',
    message: 'Looking for a romantic getaway with my wife. Interested in the houseboat experience.',
    status: 'new',
    notes: '',
    createdAt: new Date('2024-01-20T10:30:00')
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1 234 567 8900',
    checkIn: new Date('2024-02-20'),
    checkOut: new Date('2024-02-25'),
    guests: 4,
    roomType: 'Heritage Nalukettu',
    message: 'Family trip with 2 children. Need vegetarian food options.',
    status: 'read',
    notes: 'Asked about airport pickup',
    createdAt: new Date('2024-01-19T14:45:00')
  },
  {
    name: 'Amit Patel',
    email: 'amit@email.com',
    phone: '+91 98765 12345',
    checkIn: null,
    checkOut: null,
    guests: 0,
    roomType: '',
    message: 'Interested in the 14-day Panchakarma treatment. What is the cost and availability in March?',
    status: 'responded',
    notes: 'Sent treatment details',
    createdAt: new Date('2024-01-18T09:15:00')
  },
  {
    name: 'Emily Chen',
    email: 'emily@email.com',
    phone: '+65 1234 5678',
    checkIn: new Date('2024-03-01'),
    checkOut: new Date('2024-03-05'),
    guests: 2,
    roomType: 'Pool Villa',
    message: 'Honeymoon package inquiry. Would like to include spa treatments.',
    status: 'responded',
    notes: 'Quoted honeymoon package',
    createdAt: new Date('2024-01-17T16:20:00')
  },
  {
    name: 'Mohammed Ali',
    email: 'mohammed@email.com',
    phone: '+971 50 123 4567',
    checkIn: new Date('2024-01-10'),
    checkOut: new Date('2024-01-12'),
    guests: 2,
    roomType: 'Luxury Houseboat',
    message: 'Need halal food options for our stay.',
    status: 'archived',
    notes: 'Booking cancelled',
    createdAt: new Date('2024-01-05T11:00:00')
  },
  {
    name: 'Priya Sharma',
    email: 'priya@email.com',
    phone: '+91 99887 76543',
    checkIn: new Date('2024-02-10'),
    checkOut: new Date('2024-02-12'),
    guests: 6,
    roomType: 'Royal Suite',
    message: 'Corporate retreat for 6 people. Need conference facilities.',
    status: 'new',
    notes: '',
    createdAt: new Date('2024-01-20T08:00:00')
  }
]

const DEFAULT_SETTINGS = [
  { key: 'resort_name', value: 'Munroe Morris Service Villa' },
  { key: 'resort_email', value: 'info@munroemorris.com' },
  { key: 'resort_phone', value: '+91 98765 43210' },
  { key: 'resort_address', value: 'Munroe Island, Kollam, Kerala, India - 691502' },
  { key: 'brand_logo', value: '/mmoris logo.png' },
  { key: 'brand_favicon', value: '/favicon.ico' }
]

export async function POST(request: Request) {
  const dbCheck = await checkDbConnection()
  if (!dbCheck.success) {
    return NextResponse.json({
      error: dbCheck.error,
      diagnosticTrace: dbCheck.diagnosticTrace
    }, { status: 503 })
  }

  try {
    const session = await getSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { mode, selections } = await request.json()

    if (mode === 'full') {
      // Full reset logic - Delete all records in reverse order
      await db.booking.deleteMany()
      await db.review.deleteMany()
      await db.inquiry.deleteMany()
      await db.setting.deleteMany()
      await db.dish.deleteMany()
      await db.diningVenue.deleteMany()
      await db.galleryImage.deleteMany()
      await db.wellnessPackage.deleteMany()
      await db.spaTreatment.deleteMany()
      await db.experience.deleteMany()
      await db.room.deleteMany()
      await db.guest.deleteMany()

      // Re-seed all tables
      for (const guest of DEFAULT_GUESTS) {
        await db.guest.create({ data: guest })
      }
      for (const room of DEFAULT_ROOMS) {
        await db.room.create({ data: room })
      }
      for (const booking of DEFAULT_BOOKINGS) {
        await db.booking.create({ data: booking })
      }
      for (const exp of DEFAULT_EXPERIENCES) {
        await db.experience.create({ data: exp })
      }
      for (const treat of DEFAULT_TREATMENTS) {
        await db.spaTreatment.create({ data: treat })
      }
      for (const pkg of DEFAULT_PACKAGES) {
        await db.wellnessPackage.create({ data: pkg })
      }
      for (const venue of DEFAULT_VENUES) {
        await db.diningVenue.create({ data: venue })
      }
      for (const dish of DEFAULT_DISHES) {
        await db.dish.create({ data: dish })
      }
      for (const img of DEFAULT_GALLERY_IMAGES) {
        await db.galleryImage.create({ data: img })
      }
      for (const inquiry of DEFAULT_INQUIRIES) {
        await db.inquiry.create({ data: inquiry })
      }
      for (const setting of DEFAULT_SETTINGS) {
        await db.setting.create({ data: setting })
      }

      return NextResponse.json({ success: true, message: 'Database fully reset and re-seeded successfully' })
    } else {
      // Partial reset logic
      if (!selections) {
        return NextResponse.json({ error: 'No selections provided for partial reset' }, { status: 400 })
      }

      // 1. If guests, rooms, or bookings are wiped, delete bookings first due to FK constraints
      if (selections.bookings || selections.guests || selections.rooms) {
        await db.booking.deleteMany()
      }

      // 2. Clear selected tables
      if (selections.guests) {
        await db.guest.deleteMany()
      }
      if (selections.rooms) {
        await db.room.deleteMany()
      }
      if (selections.experiences) {
        await db.experience.deleteMany()
      }
      if (selections.spa) {
        await db.wellnessPackage.deleteMany()
        await db.spaTreatment.deleteMany()
      }
      if (selections.dining) {
        await db.dish.deleteMany()
        await db.diningVenue.deleteMany()
      }
      if (selections.gallery) {
        await db.galleryImage.deleteMany()
      }
      if (selections.inquiries) {
        await db.inquiry.deleteMany()
      }
      if (selections.reviews) {
        await db.review.deleteMany()
      }
      if (selections.settings) {
        await db.setting.deleteMany()
      }

      // 3. Re-seed selected tables if requested (default to re-seeding their initial datasets)
      if (selections.guests) {
        for (const guest of DEFAULT_GUESTS) {
          await db.guest.create({ data: guest })
        }
      }
      if (selections.rooms) {
        for (const room of DEFAULT_ROOMS) {
          await db.room.create({ data: room })
        }
      }
      // Re-seed bookings if bookings selection is checked and we have both guests and rooms populated
      if (selections.bookings && !selections.guests && !selections.rooms) {
        // Only re-seed bookings if we didn't clear guests or rooms (or if we seeded them as well)
        for (const booking of DEFAULT_BOOKINGS) {
          await db.booking.create({ data: booking })
        }
      } else if (selections.bookings && selections.guests && selections.rooms) {
        // Safe to seed bookings if guests and rooms are also reset/seeded
        for (const booking of DEFAULT_BOOKINGS) {
          await db.booking.create({ data: booking })
        }
      }
      if (selections.experiences) {
        for (const exp of DEFAULT_EXPERIENCES) {
          await db.experience.create({ data: exp })
        }
      }
      if (selections.spa) {
        for (const treat of DEFAULT_TREATMENTS) {
          await db.spaTreatment.create({ data: treat })
        }
        for (const pkg of DEFAULT_PACKAGES) {
          await db.wellnessPackage.create({ data: pkg })
        }
      }
      if (selections.dining) {
        for (const venue of DEFAULT_VENUES) {
          await db.diningVenue.create({ data: venue })
        }
        for (const dish of DEFAULT_DISHES) {
          await db.dish.create({ data: dish })
        }
      }
      if (selections.gallery) {
        for (const img of DEFAULT_GALLERY_IMAGES) {
          await db.galleryImage.create({ data: img })
        }
      }
      if (selections.inquiries) {
        for (const inquiry of DEFAULT_INQUIRIES) {
          await db.inquiry.create({ data: inquiry })
        }
      }
      if (selections.settings) {
        for (const setting of DEFAULT_SETTINGS) {
          await db.setting.create({ data: setting })
        }
      }

      return NextResponse.json({ success: true, message: 'Selected tables partially reset and re-seeded successfully' })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
