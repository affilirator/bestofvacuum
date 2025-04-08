import type { WebSite, Organization, Review, Product, Article, FAQPage, Person, ImageObject, BreadcrumbList } from 'schema-dts';

/**
 * Generate structured data for the website
 */
export function generateWebsiteSchema(): WebSite {
  return {
    '@type': 'WebSite',
    '@context': 'https://schema.org',
    name: 'Vacuum Expert Reviews',
    url: 'https://vacuum-expert-reviews.com',
    description: 'Unbiased vacuum cleaner reviews, guides, and cleaning tips from certified experts',
    potentialAction: {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://vacuum-expert-reviews.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate organization schema data
 */
export function generateOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    '@context': 'https://schema.org',
    name: 'Vacuum Expert Reviews',
    url: 'https://vacuum-expert-reviews.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://vacuum-expert-reviews.com/logo.png',
      width: '180',
      height: '60'
    },
    sameAs: [
      'https://facebook.com/vacuumexpertreviews',
      'https://twitter.com/vacuumexpert',
      'https://instagram.com/vacuumexpertreviews',
      'https://youtube.com/c/vacuumexpertreviews'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      email: 'contact@vacuum-expert-reviews.com',
      availableLanguage: 'English'
    }
  };
}

/**
 * Generate product schema for a vacuum cleaner
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  brand: string;
  model: string;
  sku?: string;
  category: string;
  url: string;
  price?: number;
  priceCurrency?: string;
  ratingValue?: number;
  reviewCount?: number;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}): Product {
  return {
    '@type': 'Product',
    '@context': 'https://schema.org',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    model: product.model,
    sku: product.sku,
    category: product.category,
    url: product.url,
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price.toString(),
        priceCurrency: product.priceCurrency || 'USD',
        availability: `https://schema.org/${product.availability || 'InStock'}`,
        url: product.url
      }
    }),
    ...(product.ratingValue && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.ratingValue.toString(),
        reviewCount: (product.reviewCount || 0).toString(),
        bestRating: '5',
        worstRating: '1'
      }
    })
  };
}

/**
 * Generate review schema for a vacuum cleaner review
 */
export function generateReviewSchema(review: {
  name: string;
  reviewBody: string;
  datePublished: string;
  ratingValue: number;
  author: {
    name: string;
    url?: string;
  };
  product: {
    name: string;
    image: string;
    description: string;
    brand: string;
    sku?: string;
    url: string;
  };
}): Review {
  return {
    '@type': 'Review',
    '@context': 'https://schema.org',
    name: review.name,
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Person',
      name: review.author.name,
      url: review.author.url
    },
    itemReviewed: {
      '@type': 'Product',
      name: review.product.name,
      image: review.product.image,
      description: review.product.description,
      brand: {
        '@type': 'Brand',
        name: review.product.brand
      },
      sku: review.product.sku,
      url: review.product.url
    }
  };
}

/**
 * Generate article schema for blog posts and guides
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  url: string;
}): Article {
  return {
    '@type': 'Article',
    '@context': 'https://schema.org',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: article.publisher.logo
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

/**
 * Generate FAQ schema for FAQs pages
 */
export function generateFAQSchema(faqs: {
  question: string;
  answer: string;
}[]): FAQPage {
  return {
    '@type': 'FAQPage',
    '@context': 'https://schema.org',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate person schema for author pages
 */
export function generatePersonSchema(person: {
  name: string;
  description: string;
  image: string;
  url: string;
  jobTitle: string;
  sameAs?: string[];
}): Person {
  return {
    '@type': 'Person',
    '@context': 'https://schema.org',
    name: person.name,
    description: person.description,
    image: person.image,
    url: person.url,
    jobTitle: person.jobTitle,
    sameAs: person.sameAs
  };
}

/**
 * Generate image schema
 */
export function generateImageSchema(image: {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}): ImageObject {
  return {
    '@type': 'ImageObject',
    '@context': 'https://schema.org',
    url: image.url,
    caption: image.caption,
    width: image.width?.toString(),
    height: image.height?.toString()
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: {
  name: string;
  url: string;
}[]): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    '@context': 'https://schema.org',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: (index + 1).toString(),
      name: item.name,
      item: item.url
    }))
  };
}
