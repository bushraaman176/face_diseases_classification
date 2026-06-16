import { Product } from "@/components/ProductRecommendations";
import serumImg from "@/assets/serum.jpg";
import moisturizerImg from "@/assets/moisturizer.jpg";
import facewashImg from "@/assets/facewash.jpg";

export const MOCK_PRODUCTS: Record<string, Product[]> = {
  "Acne": [
    {
      id: "acne-1",
      name: "Facewash",
      rating: 4.7,
      imageUrl: facewashImg,
      description: "Contains Salicylic Acid, Tea Tree Oil, Zinc PCA, Witch Hazel — helps deeply cleanse pores and reduce acne.",
      targetIssue: "Acne"
    },
    {
      id: "acne-2",
      name: "Serum",
      imageUrl: serumImg,
      rating: 4.7,
      description: "Formulated with Retinol, Niacinamide, Azelaic Acid, and Green Tea Extract to target acne-causing bacteria.",
      targetIssue: "Acne"
    },
    {
      id: "acne-3",
      name: "Cream",
      imageUrl: moisturizerImg,
      rating: 4.7,
      description: "Includes Benzoyl Peroxide, Sulfur, Lactic Acid, and Allantoin to heal and calm inflamed skin.",
      targetIssue: "Acne"
    },
    {
      id: "acne-4",
      name: "Toner",
      imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop",
      rating: 4.7,
      description: "Made with Salicylic Acid, Niacinamide, and Witch Hazel for oil control and clearer skin.",
      targetIssue: "Acne"
    },
  ],

  "Oily Skin": [
    {
      id: "oily-1",
      name: "Facewash",
      rating: 4.7,
      imageUrl: facewashImg,
      description: "Cleansing gel with Salicylic Acid, Tea Tree Oil, Niacinamide, and Zinc PCA to remove excess oil.",
      targetIssue: "Oily Skin"
    },
    {
      id: "oily-2",
      name: "Serum",
      rating: 4.7,
      imageUrl: serumImg, 
      description: "Contains Niacinamide, Retinol, and Green Tea Extract to reduce shine and balance sebum.",
      targetIssue: "Oily Skin"
    },
    {
      id: "oily-3",
      name: "Face Mask",
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      description: "Charcoal and Kaolin Clay mask that detoxifies oily skin and clears clogged pores.",
      targetIssue: "Oily Skin"
    },
  ],

  "Dry Skin": [
    {
      id: "dry-1",
      name: "Facewash",
      rating: 4.7,
      imageUrl: facewashImg,
      description: "Hydrating wash with Hyaluronic Acid, Glycerin, Ceramides, and Aloe Vera to retain moisture.",
      targetIssue: "Dry Skin"
    },
    {
      id: "dry-2",
      name: "Cream",
      rating: 4.7,
      imageUrl: moisturizerImg,
      description: "Deeply nourishing Shea Butter and Ceramide cream that locks in moisture and repairs skin.",
      targetIssue: "Dry Skin"
    },
    {
      id: "dry-3",
      name: "Serum",
      rating: 4.7,
      imageUrl: serumImg,
      description: "Hyaluronic Acid and Peptides boost hydration and improve elasticity.",
      targetIssue: "Dry Skin"
    },
  ],

  "Wrinkles": [
    {
      id: "wrinkle-1",
      name: "Serum",
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4b7b527?w=400&h=400&fit=crop",
      description: "Anti-aging formula with Retinol, Peptides, Hyaluronic Acid, and Vitamin C.",
      targetIssue: "Wrinkles"
    },
    {
      id: "wrinkle-2",
      name: "Cream",
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop",
      description: "Collagen-rich moisturizer with Retinol and Ceramides to reduce fine lines.",
      targetIssue: "Wrinkles"
    },
    {
      id: "wrinkle-3",
      name: "Face Mask",
      rating: 4.7,
      imageUrl: "https://www.freepik.com/free-photo/young-woman-with-facial-mask-beauty-spa-cosmetology_9028315.htm#fromView=keyword&page=1&position=27&uuid=24cb7682-0435-4fea-94c7-fb64cfe77efd&query=Facial+mask",
      description: "Collagen and Vitamin C infused mask to brighten and firm aging skin.",
      targetIssue: "Wrinkles"
    },
  ],
};