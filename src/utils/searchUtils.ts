/**
 * Utilities for searching and filtering blog posts
 */

type BlogPost = {
  slug: string;
  data: {
    title: string;
    description?: string;
    category: string;
    tags?: string[];
    author?: string;
    // other fields...
  };
  body: string;
};

/**
 * Process search query string to extract advanced search operators
 * Supports operators like:
 * - "exact phrase" (exact match)
 * - tag:keyword (tag search)
 * - author:name (author search)
 * - category:name (category search)
 *
 * @param query Search query string
 * @returns Processed search parameters
 */
export function processSearchQuery(query: string): {
  terms: string[];
  exactPhrases: string[];
  tags: string[];
  authors: string[];
  categories: string[];
  remainingQuery: string;
} {
  const result = {
    terms: [] as string[],
    exactPhrases: [] as string[],
    tags: [] as string[],
    authors: [] as string[],
    categories: [] as string[],
    remainingQuery: query
  };

  if (!query.trim()) return result;

  // Extract exact phrases (in quotes)
  const exactPhraseRegex = /"([^"]*)"/g;
  let match;

  while ((match = exactPhraseRegex.exec(query)) !== null) {
    const phrase = match[1].trim();
    if (phrase) {
      result.exactPhrases.push(phrase);
      // Remove matched phrases from the query
      result.remainingQuery = result.remainingQuery.replace(match[0], '');
    }
  }

  // Process operator searches (tag:, author:, category:)
  const processOperators = (operator: string, targetArray: string[]) => {
    const regex = new RegExp(`${operator}:([\\w-]+)`, 'g');
    let opMatch;

    while ((opMatch = regex.exec(query)) !== null) {
      const value = opMatch[1].trim();
      if (value) {
        targetArray.push(value.toLowerCase());
        // Remove matched operator from the query
        result.remainingQuery = result.remainingQuery.replace(opMatch[0], '');
      }
    }
  };

  processOperators('tag', result.tags);
  processOperators('author', result.authors);
  processOperators('category', result.categories);

  // Extract remaining terms
  result.terms = result.remainingQuery
    .toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 0);

  return result;
}

/**
 * Check if a blog post matches the given search parameters
 * @param post Blog post to check
 * @param searchParams Search parameters
 * @returns Boolean indicating if the post matches
 */
export function postMatchesSearch(post: BlogPost, searchParams: ReturnType<typeof processSearchQuery>): boolean {
  const {
    terms,
    exactPhrases,
    tags,
    authors,
    categories
  } = searchParams;

  // Prepare searchable content
  const title = post.data.title.toLowerCase();
  const description = post.data.description?.toLowerCase() || '';
  const content = post.body.toLowerCase();
  const allText = `${title} ${description} ${content}`;

  // Check if post matches all filter criteria

  // Category filter
  if (categories.length > 0) {
    const postCategory = post.data.category.toLowerCase().replace(/\s+/g, '-');
    if (!categories.some(c => postCategory.includes(c))) {
      return false;
    }
  }

  // Tag filter
  if (tags.length > 0) {
    const postTags = post.data.tags?.map(t => t.toLowerCase()) || [];
    if (!tags.some(tag => postTags.some(t => t.includes(tag)))) {
      return false;
    }
  }

  // Author filter
  if (authors.length > 0) {
    const postAuthor = post.data.author?.toLowerCase() || '';
    if (!authors.some(a => postAuthor.includes(a))) {
      return false;
    }
  }

  // Exact phrase matches
  if (exactPhrases.length > 0) {
    if (!exactPhrases.every(phrase => allText.includes(phrase.toLowerCase()))) {
      return false;
    }
  }

  // Regular terms (match any)
  if (terms.length > 0) {
    if (!terms.some(term => allText.includes(term))) {
      return false;
    }
  }

  // If we've made it here, the post matches all criteria
  return true;
}

/**
 * Enhanced filter posts by search query with support for advanced operators
 * @param posts Array of blog posts
 * @param query Search query string
 * @returns Filtered array of posts
 */
export function filterPostsByQuery(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) return posts;

  const searchParams = processSearchQuery(query);

  return posts.filter(post => postMatchesSearch(post, searchParams));
}

/**
 * Filter posts by category
 * @param posts Array of blog posts
 * @param category Category to filter by
 * @returns Filtered array of posts
 */
export function filterPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  if (!category.trim()) return posts;

  return posts.filter(post => {
    const postCategory = post.data.category.toLowerCase().replace(/\s+/g, '-');
    return postCategory === category.toLowerCase();
  });
}

/**
 * Filter posts by tag
 * @param posts Array of blog posts
 * @param tag Tag to filter by
 * @returns Filtered array of posts
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  if (!tag.trim()) return posts;

  return posts.filter(post => {
    const tags = post.data.tags || [];
    return tags.some(t =>
      t.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase()
    );
  });
}

/**
 * Get all categories with post counts
 * @param posts Array of blog posts
 * @returns Object with category slugs as keys and category info as values
 */
export function getCategoriesWithCount(posts: BlogPost[]): Record<string, {name: string, slug: string, count: number}> {
  return posts.reduce((acc, post) => {
    const category = post.data.category;
    const slug = category.toLowerCase().replace(/\s+/g, '-');

    if (!acc[slug]) {
      acc[slug] = {
        name: category,
        slug,
        count: 0
      };
    }

    acc[slug].count++;
    return acc;
  }, {} as Record<string, {name: string, slug: string, count: number}>);
}

/**
 * Get all tags with post counts
 * @param posts Array of blog posts
 * @returns Object with tag slugs as keys and tag info as values
 */
export function getTagsWithCount(posts: BlogPost[]): Record<string, {name: string, slug: string, count: number}> {
  return posts.reduce((acc, post) => {
    const tags = post.data.tags || [];

    tags.forEach(tag => {
      const slug = tag.toLowerCase().replace(/\s+/g, '-');

      if (!acc[slug]) {
        acc[slug] = {
          name: tag,
          slug,
          count: 0
        };
      }

      acc[slug].count++;
    });

    return acc;
  }, {} as Record<string, {name: string, slug: string, count: number}>);
}

/**
 * Sort posts by date (newest first)
 * @param posts Array of blog posts
 * @returns Sorted array of posts
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (!a.data.pubDate || !b.data.pubDate) return 0;
    return new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf();
  });
}

/**
 * Apply all filters to posts
 * @param posts Array of blog posts
 * @param query Search query
 * @param category Category filter
 * @param tag Tag filter
 * @returns Filtered and sorted array of posts
 */
export function searchAndFilterPosts(
  posts: BlogPost[],
  query: string = '',
  category: string = '',
  tag: string = ''
): BlogPost[] {
  let results = [...posts];

  // Apply filters
  if (query) results = filterPostsByQuery(results, query);
  if (category) results = filterPostsByCategory(results, category);
  if (tag) results = filterPostsByTag(results, tag);

  // Sort by date
  results = sortPostsByDate(results);

  return results;
}
