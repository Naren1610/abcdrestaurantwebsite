import { MenuItem } from "@/types/menu";
import { Category } from "@/types/category";

export const mockCategories: Category[] = [
  {
    id: "the-imperial-tandoor",
    name: "The Imperial Tandoor",
    description: "Tandoori starters & sizzling grills",
    image: "/mock/images/menu/items/Murgh Malai Tikka.png",
    itemCount: 6,
  },
  {
    id: "curries-that-comfort",
    name: "Curries that comfort",
    description: "Slow-cooked perfections",
    image: "/mock/images/menu/items/Butter Chicken.jpg",
    itemCount: 6,
  },
  {
    id: "biryani-and-bread",
    name: "Biryani & Bread",
    description: "Aromas of heritage",
    image: "/mock/images/menu/items/Lucknowi Murgh Biryani.png",
    itemCount: 6,
  },
  {
    id: "indo-chinese-delights",
    name: "Indo-Chinese Delights",
    description: "A fusion worth sharing",
    image: "/mock/images/menu/items/Chilli Paneer.jpg",
    itemCount: 6,
  },
  {
    id: "desserts-and-drinks",
    name: "Desserts & Drinks",
    description: "Sweet endings & refreshments",
    image: "/mock/images/menu/items/Gulab Jamun.png",
    itemCount: 6,
  },
];

export const mockMenuItems: MenuItem[] = [
  // Tandoor
  { id: "murgh-malai-tikka", name: "Murgh Malai Tikka", description: "Silken chicken infused with cream, cheese and gentle spices.", price: 18.99, image: "/mock/images/menu/items/Murgh Malai Tikka.png", tags: ["non-veg"], categoryId: "the-imperial-tandoor" },
  { id: "paneer-achari-tikka", name: "Paneer Achari Tikka", description: "Cottage cheese marinated in house pickle spices and grilled to perfection.", price: 18.99, image: "/mock/images/menu/items/Paneer Achari Tikka.jpg", tags: ["veg", "spicy"], categoryId: "the-imperial-tandoor" },
  { id: "seekh-kebab", name: "Seekh Kebab", description: "Minced lamb blended with spices and grilled on skewers.", price: 18.99, image: "/mock/images/menu/items/Seekh Kebab.jpg", tags: ["non-veg"], categoryId: "the-imperial-tandoor" },
  { id: "tandoori-aloo", name: "Tandoori Aloo", description: "Baby potatoes marinated in yogurt and spices, roasted in tandoor.", price: 14.99, image: "/mock/images/menu/items/Tandoori Chicken.jpg", tags: ["veg"], categoryId: "the-imperial-tandoor" },
  { id: "murgh-malai-tikka-2", name: "Murgh Malai Tikka", description: "Silken chicken infused with cream, cheese and gentle spices.", price: 18.99, image: "/mock/images/menu/items/Murgh Malai Tikka.png", tags: ["non-veg"], categoryId: "the-imperial-tandoor" },
  { id: "paneer-achari-tikka-2", name: "Paneer Achari Tikka", description: "Cottage cheese marinated in house pickle spices and grilled to perfection.", price: 18.99, image: "/mock/images/menu/items/Paneer Achari Tikka.jpg", tags: ["veg", "spicy"], categoryId: "the-imperial-tandoor" },
  
  // Curries
  { id: "dal-makhani", name: "Dal Makhani", description: "Black lentils simmered overnight with butter and cream.", price: 18.99, image: "/mock/images/menu/items/Dal Makhani.png", tags: ["veg"], categoryId: "curries-that-comfort" },
  { id: "butter-chicken", name: "Butter Chicken", description: "Tandoori chicken in a rich tomato and butter gravy.", price: 18.99, image: "/mock/images/menu/items/Butter Chicken.jpg", tags: ["non-veg"], categoryId: "curries-that-comfort" },
  { id: "malabar-prawn-curry", name: "Malabar Prawn Curry", description: "Prawns cooked in coconut and spice infused coastal curry.", price: 18.99, image: "/mock/images/menu/items/Malabar Prawn Curry.jpg", tags: ["non-veg", "spicy"], categoryId: "curries-that-comfort" },
  { id: "paneer-kadai", name: "Paneer Kadai", description: "Cottage cheese with bell peppers in a bold, spiced masala.", price: 18.99, image: "/mock/images/menu/items/Paneer Kadai.jpg", tags: ["veg"], categoryId: "curries-that-comfort" },
  { id: "dal-makhani-2", name: "Dal Makhani", description: "Black lentils simmered overnight with butter and cream.", price: 18.99, image: "/mock/images/menu/items/Dal Makhani.png", tags: ["veg"], categoryId: "curries-that-comfort" },
  { id: "butter-chicken-2", name: "Butter Chicken", description: "Tandoori chicken in a rich tomato and butter gravy.", price: 18.99, image: "/mock/images/menu/items/Butter Chicken.jpg", tags: ["non-veg"], categoryId: "curries-that-comfort" },

  // Biryani & Bread
  { id: "lucknowi-murgh-biryani", name: "Lucknowi Murgh Biryani", description: "Fragrant basmati layered with tender chicken and subtle spices.", price: 24.50, image: "/mock/images/menu/items/Lucknowi Murgh Biryani.png", tags: ["non-veg"], categoryId: "biryani-and-bread" },
  { id: "hyderabadi-veg-biryani", name: "Hyderabadi Veg Biryani", description: "Aromatic basmati with garden vegetables and saffron.", price: 12.75, image: "/mock/images/menu/items/Hyderabadi Veg Biryani.jpg", tags: ["veg"], categoryId: "biryani-and-bread" },
  { id: "garlic-naan", name: "Garlic Naan", description: "Soft tandoor naan brushed with garlic and butter.", price: 29.99, image: "/mock/images/menu/items/Garlic Naan.jpg", tags: ["veg"], categoryId: "biryani-and-bread" },
  { id: "lachha-paratha", name: "Lachha Paratha", description: "Multi-layered whole wheat paratha cooked on tawa.", price: 15.00, image: "/mock/images/menu/items/Lachha Paratha.jpg", tags: ["veg"], categoryId: "biryani-and-bread" },
  { id: "lucknowi-murgh-biryani-2", name: "Lucknowi Murgh Biryani", description: "Fragrant basmati layered with tender chicken and subtle spices.", price: 24.50, image: "/mock/images/menu/items/Lucknowi Murgh Biryani.png", tags: ["non-veg", "spicy"], categoryId: "biryani-and-bread" },
  { id: "hyderabadi-veg-biryani-2", name: "Hyderabadi Veg Biryani", description: "Aromatic basmati with garden vegetables and saffron.", price: 12.75, image: "/mock/images/menu/items/Hyderabadi Veg Biryani.jpg", tags: ["veg"], categoryId: "biryani-and-bread" },

  // Indo-Chinese
  { id: "chilli-paneer", name: "Chilli Paneer", description: "Crispy cottage cheese tossed in spicy Indo-Chinese sauce.", price: 17.59, image: "/mock/images/menu/items/Chilli Paneer.jpg", tags: ["veg", "spicy"], categoryId: "indo-chinese-delights" },
  { id: "veg-manchurian", name: "Veg Manchurian", description: "Crispy vegetable balls in a tangy, savoury brown sauce.", price: 16.99, image: "/mock/images/menu/items/Veg Manchurian.jpg", tags: ["veg", "spicy"], categoryId: "indo-chinese-delights" },
  { id: "chicken-65", name: "Chicken 65", description: "Spicy, deep-fried chicken bites with curry leaves.", price: 18.99, image: "/mock/images/menu/items/Chicken 65.jpg", tags: ["non-veg", "spicy"], categoryId: "indo-chinese-delights" },
  { id: "hakka-noodles", name: "Hakka Noodles", description: "Stir-fried noodles with vegetables and classic seasonings.", price: 15.99, image: "/mock/images/menu/items/Hakka Noodles.jpg", tags: ["veg"], categoryId: "indo-chinese-delights" },
  { id: "chilli-paneer-2", name: "Chilli Paneer", description: "Crispy cottage cheese tossed in spicy Indo-Chinese sauce.", price: 17.59, image: "/mock/images/menu/items/Chilli Paneer.jpg", tags: ["veg", "spicy"], categoryId: "indo-chinese-delights" },
  { id: "veg-manchurian-2", name: "Veg Manchurian", description: "Crispy vegetable balls in a tangy, savoury brown sauce.", price: 16.99, image: "/mock/images/menu/items/Veg Manchurian.jpg", tags: ["veg", "spicy"], categoryId: "indo-chinese-delights" },

  // Desserts
  { id: "gulab-jamun", name: "Gulab Jamun", description: "Soft milk dumplings in rose flavoured sugar syrup.", price: 6.99, image: "/mock/images/menu/items/Gulab Jamun.png", tags: ["veg"], categoryId: "desserts-and-drinks" },
  { id: "kulfi-pistachio", name: "Kulfi (Pistachio)", description: "Traditional Indian ice cream garnished with pistachios.", price: 7.99, image: "/mock/images/menu/items/Kulfi (Pistachio).jpg", tags: ["veg"], categoryId: "desserts-and-drinks" },
  { id: "masala-chai", name: "Masala Chai", description: "Spiced Indian tea brewed to warm your soul.", price: 4.49, image: "/mock/images/menu/items/Masala Chai.jpg", tags: ["veg"], categoryId: "desserts-and-drinks" },
  { id: "mango-lassi", name: "Mango Lassi", description: "Creamy yogurt blended with mango and a hint of cardamom.", price: 5.49, image: "/mock/images/menu/items/Mango Lassi.webp", tags: ["veg"], categoryId: "desserts-and-drinks" },
  { id: "gulab-jamun-2", name: "Gulab Jamun", description: "Soft milk dumplings in rose flavoured sugar syrup.", price: 6.99, image: "/mock/images/menu/items/Gulab Jamun.png", tags: ["veg"], categoryId: "desserts-and-drinks" },
  { id: "kulfi-pistachio-2", name: "Kulfi (Pistachio)", description: "Traditional Indian ice cream garnished with pistachios.", price: 7.99, image: "/mock/images/menu/items/Kulfi (Pistachio).jpg", tags: ["veg"], categoryId: "desserts-and-drinks" },
];

export const mockSettings = {
  restaurantName: "ABCD Restaurant",
  email: "contact@abcdrestaurant.com",
  phone: "+1 234 567 8900",
  address: "417 Lancaster Ave, Malvern, PA 19355",
  facebookUrl: "https://facebook.com/abcdrestaurant",
  instagramUrl: "https://instagram.com/abcdrestaurant",
  twitterUrl: "https://twitter.com/abcdrestaurant",
  operatingHours: [
    { day: "Mon - Fri", hours: "11:00 AM - 3:00 PM, 5:00 PM - 10:00 PM" },
    { day: "Sat - Sun", hours: "11:00 AM - 11:00 PM" },
  ],
};

export const mockHomeContent = {
  heroHeadline: "A Taste of Tradition, A Touch of Modernity",
  heroSubheadline: "Discover the rich flavors of Indian cuisine at ABCD Restaurant",
  heroImage: "/mock/images/home/biryani-handi.webp",
  ctaText: "Order Now",
  ctaLink: "/menu",
  featuredItems: ["lucknowi-murgh-biryani", "butter-chicken", "murgh-malai-tikka"],
};

export const mockOurStoryContent = {
  storyHeadline: "Our Story",
  storyContent: "ABCD Restaurant was founded with a passion for bringing authentic Indian flavors to our community. Our recipes have been passed down through generations, combining traditional techniques with fresh, local ingredients.",
  storyImage: "/mock/images/about/abcd-restaurant.png",
  teamMembers: [
    { name: "Rahul Sharma", role: "Head Chef", image: "/mock/images/about/chef-image.png", description: "Master of Tandoor" },
    { name: "Priya Patel", role: "Pastry Chef", image: "/mock/images/about/chef-image.png", description: "Creates sweet magic" }
  ]
};


