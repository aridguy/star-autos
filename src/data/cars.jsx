// src/data/cars.js

// 👇 CHANGE THIS to your real WhatsApp number (digits only, no + or spaces)
export const WHATSAPP_NUMBER = '2348012345678';

// Helper: build a pre-filled WhatsApp link for any car
export function buildWhatsAppLink(car) {
  const message =
    `Hi, I'm interested in this car:\n\n` +
    `*${car.name} (${car.year})*\n` +
    `*Vehicle ID:* #${String(car.id).padStart(3, '0')}\n` +
    `*Price:* ${car.priceFormatted}\n` +
    `*Condition:* ${car.condition}\n` +
    `*Mileage:* ${car.mileage}\n` +
    `*Location:* ${car.location}\n\n` +
    `Please share more details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Helper: scrub a VIN (show first 11 chars, hide middle, show last 2)
export function scrubVin(vin) {
  if (!vin || vin.length < 8) return vin;
  return `${vin.slice(0, 11)}••••${vin.slice(-2)}`;
}

export const cars = [
  {
    id: 1,
    name: 'Toyota Camry',
    year: 2023,
    price: 48000000,
    priceFormatted: '₦48,000,000',
    condition: 'Brand New',
    mileage: '0 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '2.5L 4-Cylinder',
    rating: 4.9,
    reviews: 32,
    location: 'Orile Agege, Lagos',
    exteriorColor: 'Pearl White',
    interiorColor: 'Black Leather',
    vin: '4T1B11HK5KU123456',
    bodyType: 'Sedan',
    seats: 5,
    doors: 4,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop',
    ],
    features: [
      'Air Conditioning',
      'Reverse Camera',
      'Bluetooth Connectivity',
      'Alloy Wheels',
      'Power Steering',
      'Keyless Entry',
      'Leather Seats',
      'Apple CarPlay',
    ],
    description:
      'A brand-new Toyota Camry with the perfect blend of efficiency, comfort, and modern technology. Fully loaded with safety features and a premium interior — perfect for executives and families alike.',
  },
  {
    id: 2,
    name: 'Lexus RX 350',
    year: 2021,
    price: 42500000,
    priceFormatted: '₦42,500,000',
    condition: 'Foreign Used',
    mileage: '48,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.5L V6',
    rating: 4.7,
    reviews: 18,
    location: 'Ikeja, Lagos',
    exteriorColor: 'Silver Metallic',
    interiorColor: 'Beige Leather',
    vin: '2T2BZMCA3MC123456',
    bodyType: 'SUV',
    seats: 5,
    doors: 4,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80&auto=format&fit=crop',
    ],
    features: [
      'Panoramic Sunroof',
      'Ventilated Seats',
      'Blind Spot Monitor',
      'Adaptive Cruise Control',
      'Premium Audio',
      'Power Tailgate',
      'Heated Seats',
    ],
    description:
      'A clean foreign-used Lexus RX 350 with full service history. Smooth, quiet, and luxurious — everything you expect from a Lexus SUV, at a fraction of the new price.',
  },
  {
    id: 3,
    name: 'Mercedes-Benz GLE',
    year: 2020,
    price: 55000000,
    priceFormatted: '₦55,000,000',
    condition: 'Foreign Used',
    mileage: '62,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.0L V6 Turbo',
    rating: 4.8,
    reviews: 41,
    location: 'Victoria Island, Lagos',
    exteriorColor: 'Obsidian Black',
    interiorColor: 'Black Nappa Leather',
    vin: 'WDC0G4KB8HV123456',
    bodyType: 'SUV',
    seats: 5,
    doors: 4,
    images: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop',
    ],
    features: [
      'AMG Sport Package',
      'MBUX Infotainment',
      '360° Camera',
      'Air Suspension',
      'Burmester Sound',
      'LED Headlights',
      'Heated & Cooled Seats',
    ],
    description:
      'Stunning Mercedes GLE with the full AMG sport package. Immaculate interior, all maintenance up to date. This is a serious luxury SUV for someone who wants the very best.',
  },
  {
    id: 4,
    name: 'Honda Accord',
    year: 2022,
    price: 35000000,
    priceFormatted: '₦35,000,000',
    condition: 'Foreign Used',
    mileage: '22,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '1.5L Turbo 4-Cylinder',
    rating: 4.6,
    reviews: 27,
    location: 'Lekki, Lagos',
    exteriorColor: 'Crystal Black Pearl',
    interiorColor: 'Black Fabric',
    vin: '1HGCV1F34NA123456',
    bodyType: 'Sedan',
    seats: 5,
    doors: 4,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop',
    ],
    features: [
      'Honda Sensing Safety',
      'Wireless CarPlay',
      'Dual-Zone Climate',
      'Power Moonroof',
      'LED Headlights',
      'Remote Start',
    ],
    description:
      'A reliable, efficient Honda Accord with low mileage and clean title. The turbocharged engine delivers great performance without sacrificing fuel economy. Ready for a new owner.',
  },
  {
    id: 5,
    name: 'Toyota Highlander',
    year: 2021,
    price: 52000000,
    priceFormatted: '₦52,000,000',
    condition: 'Foreign Used',
    mileage: '38,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.5L V6',
    rating: 4.8,
    reviews: 22,
    location: 'Orile Agege, Lagos',
    exteriorColor: 'Midnight Black Metallic',
    interiorColor: 'Black Leather',
    vin: '5TDJZRFH3MS123456',
    bodyType: 'SUV',
    seats: 7,
    doors: 5,
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&auto=format&fit=crop',
    ],
    features: [
      '7-Seater',
      'Third Row Seats',
      'Power Tailgate',
      'Toyota Safety Sense',
      'Blind Spot Monitor',
      'Tri-Zone Climate',
      'Leather Interior',
    ],
    description:
      'Perfect family SUV — 7 seats, spacious, and built to last. This Highlander is fully loaded with the third row and every safety feature Toyota offers. Excellent condition.',
  },
  {
    id: 6,
    name: 'Range Rover Sport',
    year: 2020,
    price: 65000000,
    priceFormatted: '₦65,000,000',
    condition: 'Foreign Used',
    mileage: '55,000 km',
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '3.0L V6 Supercharged',
    rating: 4.9,
    reviews: 38,
    location: 'Ikoyi, Lagos',
    exteriorColor: 'Santorini Black',
    interiorColor: 'Ebony Leather',
    vin: 'SALWR2SU3LA123456',
    bodyType: 'SUV',
    seats: 5,
    doors: 4,
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80&auto=format&fit=crop',
    ],
    features: [
      'Meridian Sound System',
      'Air Suspension',
      'Panoramic Roof',
      'Heated Steering Wheel',
      '360° Parking Camera',
      'Terrain Response',
      'Soft Close Doors',
    ],
    description:
      'Commanding presence, effortless power, and legendary Range Rover luxury. This Sport edition is fully loaded with the Meridian sound system and every off-road capability. A head-turner.',
  },
];