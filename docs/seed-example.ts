// This file is only to demonstrate DATA STRUCTURE for the project
// Relations are shown logically (not meant for direct DB execution)

// Category
const categories = [
  { name: "Pain Relief" },
  { name: "Antibiotics" },
  { name: "Vitamins & Supplements" },
  { name: "Diabetes Care" },
  { name: "Heart & Blood Pressure" },
];

// Medicines
const medicines = [
  {
    name: "Paracetamol 500mg",
    description: "Used to relieve pain and reduce fever.",
    manufacturer: "Square Pharmaceuticals",
    price: 2.5,
    stock: 200,
    image: "https://example.com/images/paracetamol.jpg",
    categoryId: "Pain Relief",
  },
  {
    name: "Ibuprofen 400mg",
    description:
      "Nonsteroidal anti-inflammatory drug for pain and inflammation.",
    manufacturer: "Beximco Pharma",
    price: 3.0,
    stock: 150,
    image: "https://example.com/images/ibuprofen.jpg",
    categoryId: "Pain Relief",
  },
  {
    name: "Amoxicillin 250mg",
    description: "Antibiotic used to treat bacterial infections.",
    manufacturer: "Incepta Pharmaceuticals",
    price: 6.5,
    stock: 100,
    image: "https://example.com/images/amoxicillin.jpg",
    categoryId: "Antibiotics",
  },
  {
    name: "Azithromycin 500mg",
    description: "Macrolide antibiotic for respiratory and skin infections.",
    manufacturer: "Renata Limited",
    price: 8.0,
    stock: 80,
    image: "https://example.com/images/azithromycin.jpg",
    categoryId: "Antibiotics",
  },
  {
    name: "Vitamin C 1000mg",
    description: "Boosts immunity and supports overall health.",
    manufacturer: "ACI Limited",
    price: 5.0,
    stock: 120,
    image: "https://example.com/images/vitamin-c.jpg",
    categoryId: "Vitamins & Supplements",
  },
  {
    name: "Multivitamin Tablets",
    description:
      "Dietary supplement containing essential vitamins and minerals.",
    manufacturer: "Aristopharma",
    price: 7.5,
    stock: 140,
    image: "https://example.com/images/multivitamin.jpg",
    categoryId: "Vitamins & Supplements",
  },
  {
    name: "Calcium + D3",
    description: "Supports bone strength and calcium absorption.",
    manufacturer: "Opsonin Pharma",
    price: 6.0,
    stock: 130,
    image: "https://example.com/images/calcium.jpg",
    categoryId: "Vitamins & Supplements",
  },
  {
    name: "Metformin 500mg",
    description: "Helps control blood sugar levels in type 2 diabetes.",
    manufacturer: "Square Pharmaceuticals",
    price: 4.5,
    stock: 160,
    image: "https://example.com/images/metformin.jpg",
    categoryId: "Diabetes Care",
  },
  {
    name: "Insulin Injection",
    description: "Hormone therapy used to control blood glucose levels.",
    manufacturer: "Novo Nordisk",
    price: 15.0,
    stock: 60,
    image: "https://example.com/images/insulin.jpg",
    categoryId: "Diabetes Care",
  },
  {
    name: "Glimepiride 2mg",
    description: "Oral diabetes medicine that helps control blood sugar.",
    manufacturer: "Healthcare Pharmaceuticals",
    price: 5.5,
    stock: 110,
    image: "https://example.com/images/glimepiride.jpg",
    categoryId: "Diabetes Care",
  },
  {
    name: "Amlodipine 5mg",
    description: "Used to treat high blood pressure and chest pain.",
    manufacturer: "Renata Limited",
    price: 4.0,
    stock: 170,
    image: "https://example.com/images/amlodipine.jpg",
    categoryId: "Heart & Blood Pressure",
  },
  {
    name: "Losartan 50mg",
    description: "Helps lower blood pressure and protect kidneys.",
    manufacturer: "Incepta Pharmaceuticals",
    price: 5.2,
    stock: 150,
    image: "https://example.com/images/losartan.jpg",
    categoryId: "Heart & Blood Pressure",
  },
  {
    name: "Aspirin 75mg",
    description: "Low-dose aspirin used for heart protection and pain relief.",
    manufacturer: "Square Pharmaceuticals",
    price: 3.2,
    stock: 180,
    image: "https://example.com/images/aspirin.jpg",
    categoryId: "Heart & Blood Pressure",
  },
  {
    name: "Cough Syrup",
    description: "Relieves cough and throat irritation.",
    manufacturer: "Beximco Pharma",
    price: 4.8,
    stock: 90,
    image: "https://example.com/images/cough-syrup.jpg",
    categoryId: "Pain Relief",
  },
  {
    name: "Antacid Tablets",
    description: "Provides relief from acidity and heartburn.",
    manufacturer: "ACI Limited",
    price: 3.7,
    stock: 140,
    image: "https://example.com/images/antacid.jpg",
    categoryId: "Pain Relief",
  },
  {
    name: "Iron Supplement",
    description: "Prevents and treats iron deficiency anemia.",
    manufacturer: "Opsonin Pharma",
    price: 5.9,
    stock: 100,
    image: "https://example.com/images/iron.jpg",
    categoryId: "Vitamins & Supplements",
  },
  {
    name: "Zinc Tablets",
    description: "Supports immune function and wound healing.",
    manufacturer: "Aristopharma",
    price: 4.3,
    stock: 115,
    image: "https://example.com/images/zinc.jpg",
    categoryId: "Vitamins & Supplements",
  },
  {
    name: "Folic Acid",
    description: "Essential vitamin for cell growth and pregnancy support.",
    manufacturer: "ACI Limited",
    price: 3.9,
    stock: 125,
    image: "https://example.com/images/folic-acid.jpg",
    categoryId: "Vitamins & Supplements",
  },
  {
    name: "Blood Glucose Strips",
    description: "Used with a glucometer to measure blood sugar levels.",
    manufacturer: "Accu-Chek",
    price: 12.0,
    stock: 75,
    image: "https://example.com/images/glucose-strips.jpg",
    categoryIdId: "Diabetes Care",
  },
  {
    name: "Omega 3 Capsules",
    description: "Supports heart health and brain function.",
    manufacturer: "Eskayef Pharmaceuticals",
    price: 9.5,
    stock: 95,
    image: "https://example.com/images/omega3.jpg",
    categoryId: "Heart & Blood Pressure",
  },
];

// Orders
const orders = [
  {
    shippingAddress: "Chittagong, Bangladesh",
    orderItems: [{ medicineId: "Amoxicillin 250mg", quantity: 1, price: 6.5 }],
  },
];

// Reviews

export const reviews = [
  {
    medicineId: "Paracetamol 500mg",
    rating: 5,
    comment: "Very effective for fever. Fast relief!",
  },
];
