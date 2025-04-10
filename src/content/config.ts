import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    originalUrl: z.string(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date(),
    author: z.string(),
    authorBio: z.string(),
    authorImage: z.string(),
    authorImageAlt: z.string(),
    image: z.string().optional(),
    coverAlt: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    readingTime: z.string().optional(),
    canonicalUrl: z.string().optional(),
    category: z.string(),
    seo: z.string().optional(),
    showTableOfContents: z.boolean().default(true).optional(),
  }),
});

// Reviews collection schema

const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    subtitle: z.string(),
    excerpt: z.string(),
    date: z.string().datetime().optional(),
    author: z.object({
      name: z.string(),
      slug: z.string(),
      image: z.string(),
      title: z.string(),
      bio: z.string(),
    }),
    category: z.object({
      name: z.string(),
      slug: z.string(),
    }),
    product: z.object({
      name: z.string(),
      brand: z.string(),
      model: z.string(),
      image: z.string(),
      description: z.string(),
      price: z.number(),
      salePrice: z.number().optional(),
      url: z.string().url(),
      features: z.array(z.string()),
    }),
    rating: z.object({
      overall: z.number().min(0).max(5),
      suction: z.number().min(0).max(5),
      maneuverability: z.number().min(0).max(5),
      noise: z.number().min(0).max(5),
      batteryLife: z.number().min(0).max(5),
      filtration: z.number().min(0).max(5),
      valueForMoney: z.number().min(0).max(5),
    }),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    verdict: z.string(),
    alternatives: z.array(z.object({
      name: z.string(),
      slug: z.string(),
      image: z.string(),
      rating: z.number().min(0).max(5),
      price: z.number(),
    })),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
});




// Team collection schema
const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    credentials: z.string(),
    bio: z.string(),
    image: z.string().default('/images/placeholder.svg'),
    expertise: z.array(z.string()),
    linkedin: z.string().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Additional fields will be validated based on the specific page
  }),
});

// Export all collections
export const collections = {
  'blog': blogCollection,
  'reviews': reviewsCollection,
  'team': teamCollection,
  'pages': pagesCollection,
};
