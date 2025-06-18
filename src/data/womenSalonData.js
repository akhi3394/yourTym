  // Mock data for women's salon
  export const categories = [
    {
      id: 1,
      title: "Package",
      image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Cleanup & Facials",
      image: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Waxing",
      image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 4,
      title: "Bleach & Detain",
      image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 5,
      title: "Massage",
      image: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 6,
      title: "Hair Care",
      image: "https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 7,
      title: "Threading & Face Waxing",
      image: "https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 8,
      title: "Pedicure",
      image: "https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 9,
      title: "Manicure",
      image: "https://images.pexels.com/photos/3985322/pexels-photo-3985322.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];
  
  export const packages = [
    {
      id: 1,
      title: "Complete Wax (All in One)",
      services: [
        { type: "Waxing", description: "Full legs, Full arms, body, honey wax" },
        { type: "Bleach + Massage", description: "Olivia, OxyLife" }
      ],
      duration: "60 Min",
      rating: 4.9,
      reviews: 500,
      price: 1299,
      image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Ready to GO",
      services: [
        { type: "Waxing", description: "Half Arms, Half Legs, Stomach, Back" },
        { type: "Facial", description: "O3+, Twacha" },
        { type: "Threading", description: "Eyebrow, Upper lip" }
      ],
      duration: "60 Min",
      rating: 4.9,
      reviews: 500,
      price: 999,
      image: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Party Ready",
      services: [
        { type: "Waxing", description: "Half Arms, Half Legs, Underarms" },
        { type: "Facial", description: "O3+, LOTUS Radiant Pearl" },
        { type: "Threading + D-Tan", description: "RAGA, O3+" }
      ],
      duration: "60 Min",
      rating: 4.9,
      reviews: 500,
      price: 1499,
      image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
    }
  ];
  
  export const cleanupServices = [
    {
      id: 1,
      title: "skin whitening",
      subtitle: "Cleanup (O3+)",
      name: "skin whitening Cleanup (O3+)",
      rating: 4.8,
      reviews: 1108,
      price: 399,
      duration: "45 Min",
      benefits: [
        "Instant glow and enhance the natural radiance of your skin",
        "Of all skin types, including sensitive skin"
      ],
      image: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      productImage: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Fruit",
      subtitle: "Cleanup (SARA)",
      name: "Fruit Cleanup (SARA)",
      rating: 4.8,
      reviews: 1108,
      price: 299,
      duration: "45 Min",
      benefits: [
        "Orange & Apricot nourished, glowing skin",
        "Rich in Vitamin A & Vitamin C"
      ],
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      productImage: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];
  
  export const facialServices = [
    {
      id: 1,
      title: "skin whitening",
      subtitle: "Facial (O3+)",
      name: "O3+ facial",
      rating: 4.8,
      reviews: 1500,
      price: 1499,
      duration: "1 hr 30 Min",
      benefits: [
        "Instant glow and enhance the natural radiance of your skin",
        "Of all skin types, including sensitive skin"
      ],
      image: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      productImage: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Hydra",
      subtitle: "Facial (Twacha)",
      name: "Hydra Facial (Twacha)",
      rating: 4.8,
      reviews: 1500,
      price: 1299,
      duration: "1 hr 30 Min",
      benefits: [
        "Skin brightening, Skin Whitening & Rejuvenation",
        "All types skin & Anti-ageing and Hyaluronic Power",
        "10 Steps Hydra facial"
      ],
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      productImage: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];