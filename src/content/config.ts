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
    pubDate: z.date(),
    rating: z.number().min(1).max(5),
    image: z.string(),
    description: z.string(),
    brand: z.string(),
    model: z.string(),
    category: z.enum(['Upright', 'Stick', 'Robot', 'Canister', 'Handheld', 'Wet/Dry', 'Commercial', 'Cordless Vacuums']),
    price: z.number().optional(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    featured: z.boolean().default(false),
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
