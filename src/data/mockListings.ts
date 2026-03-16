export interface Listing {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  price: number;
  category: "books" | "notes" | "stationery";
  condition: "new" | "good" | "fair" | "like_new" | "acceptable" | "heavily_used";
  subject: string;
  location: string;
  sellerName: string;
  sellerWhatsapp: string;
  imageUrl: string;
  postedAt: string;
}

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Engineering Mathematics by B.S. Grewal",
    titleHi: "इंजीनियरिंग गणित - बी.एस. ग्रेवाल",
    description: "Higher Engineering Mathematics, 44th edition. Slightly highlighted but in great condition. Perfect for B.Tech students.",
    descriptionHi: "उच्च इंजीनियरिंग गणित, 44वां संस्करण। हल्की हाइलाइटिंग लेकिन बहुत अच्छी स्थिति में।",
    price: 250,
    category: "books",
    condition: "good",
    subject: "Mathematics",
    location: "Delhi",
    sellerName: "Rahul Sharma",
    sellerWhatsapp: "919876543210",
    imageUrl: "",
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "GATE CSE Handwritten Notes (Complete Set)",
    titleHi: "GATE CSE हस्तलिखित नोट्स (पूरा सेट)",
    description: "Complete handwritten notes for GATE Computer Science. Covers all subjects including OS, DBMS, CN, TOC, Algorithms.",
    descriptionHi: "GATE कंप्यूटर साइंस के पूरे हस्तलिखित नोट्स। OS, DBMS, CN, TOC, Algorithms सभी विषय शामिल।",
    price: 450,
    category: "notes",
    condition: "new",
    subject: "Computer Science",
    location: "Pune",
    sellerName: "Priya Patel",
    sellerWhatsapp: "919876543211",
    imageUrl: "",
    postedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Scientific Calculator Casio fx-991EX",
    titleHi: "साइंटिफिक कैलकुलेटर Casio fx-991EX",
    description: "Casio fx-991EX ClassWiz scientific calculator. Used for 1 semester, works perfectly. Comes with cover.",
    descriptionHi: "Casio fx-991EX ClassWiz साइंटिफिक कैलकुलेटर। 1 सेमेस्टर इस्तेमाल किया, बिल्कुल सही काम करता है।",
    price: 800,
    category: "stationery",
    condition: "good",
    subject: "Engineering",
    location: "Mumbai",
    sellerName: "Amit Kumar",
    sellerWhatsapp: "919876543212",
    imageUrl: "",
    postedAt: "3 hours ago",
  },
  {
    id: "4",
    title: "HC Verma Physics Vol 1 & 2",
    titleHi: "HC वर्मा फिज़िक्स भाग 1 और 2",
    description: "Concepts of Physics by HC Verma, both volumes. Clean copy, no markings. Ideal for IIT-JEE / NEET preparation.",
    descriptionHi: "HC वर्मा की कॉन्सेप्ट्स ऑफ फिज़िक्स, दोनों भाग। साफ़ कॉपी, कोई निशान नहीं।",
    price: 350,
    category: "books",
    condition: "new",
    subject: "Physics",
    location: "Kota",
    sellerName: "Sneha Gupta",
    sellerWhatsapp: "919876543213",
    imageUrl: "",
    postedAt: "5 hours ago",
  },
  {
    id: "5",
    title: "Complete Drawing Kit for Architecture",
    titleHi: "आर्किटेक्चर के लिए पूरा ड्राइंग किट",
    description: "Includes drafting tools, T-square, set squares, compass set, drawing sheets holder. Used for 1 year.",
    descriptionHi: "ड्राफ्टिंग टूल्स, T-स्क्वायर, सेट स्क्वायर, कंपास सेट शामिल। 1 साल इस्तेमाल किया।",
    price: 600,
    category: "stationery",
    condition: "fair",
    subject: "Architecture",
    location: "Bangalore",
    sellerName: "Arjun Reddy",
    sellerWhatsapp: "919876543214",
    imageUrl: "",
    postedAt: "1 week ago",
  },
  {
    id: "6",
    title: "CA Foundation Study Material (Full Set)",
    titleHi: "CA फाउंडेशन स्टडी मैटेरियल (पूरा सेट)",
    description: "ICAI official study material for CA Foundation. All 4 subjects. Latest edition with amendments.",
    descriptionHi: "CA फाउंडेशन के लिए ICAI का आधिकारिक स्टडी मैटेरियल। सभी 4 विषय। नवीनतम संस्करण।",
    price: 500,
    category: "notes",
    condition: "good",
    subject: "Commerce",
    location: "Jaipur",
    sellerName: "Neha Agarwal",
    sellerWhatsapp: "919876543215",
    imageUrl: "",
    postedAt: "4 days ago",
  },
];
