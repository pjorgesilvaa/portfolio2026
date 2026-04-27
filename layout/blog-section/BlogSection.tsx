import AnimateIn from '@/components/animateIn';
import BlogPost from '@/models/blogPost';

export default function BlogSection() {
  const posts: BlogPost[] = [
    {
      id: '1',
      site: {
        id: '1',
        domain: 'myportfolio.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      author: {
        id: '1',
        name: 'José Araújo',
        email: 'jose@jose.com',
        avatarUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'A passionate designer and developer with a love for creating intuitive digital experiences.',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      category: {
        id: '1',
        site: {
          id: '1',
          domain: 'myportfolio.com',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        name: 'Design',
        slug: 'design',
        description: 'Insights and trends in design, user experience, and creativity.',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      title: 'Designing for Delight: The Art of User-Centered Experiences',
      slug: 'designing-for-delight',
      excerpt: 'Discover the principles of user-centered design and how to create delightful digital experiences that resonate with users.',
      content: 'Full content of the blog post would go here...',
      status: 'published',
      language: 'en',
      coverImageUrl:
        'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metaTitle: 'Designing for Delight: The Art of User-Centered Experiences',
      metaDescription:
        'Discover the principles of user-centered design and how to create delightful digital experiences that resonate with users.',
      ogImageUrl:
        'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      canonicalUrl: '/blog/designing-for-delight',
      isIndexed: true,
      readingTimeMinutes: 5,
      publishedAt: new Date('2024-10-12'),
      createdAt: new Date('2024-10-12'),
      updatedAt: new Date('2024-10-12'),
    },
    {
      id: '2',
      site: {
        id: '1',
        domain: 'myportfolio.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      author: {
        id: '1',
        name: 'José Araújo',
        email: 'jose@jose.com',
        avatarUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'A passionate designer and developer with a love for creating intuitive digital experiences.',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      category: {
        id: '1',
        site: {
          id: '1',
          domain: 'myportfolio.com',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        name: 'Design',
        slug: 'design',
        description: 'Insights and trends in design, user experience, and creativity.',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      title: 'Designing for Delight: The Art of User-Centered Experiences',
      slug: 'designing-for-delight',
      excerpt: 'Discover the principles of user-centered design and how to create delightful digital experiences that resonate with users.',
      content: 'Full content of the blog post would go here...',
      status: 'published',
      language: 'en',
      coverImageUrl:
        'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metaTitle: 'Designing for Delight: The Art of User-Centered Experiences',
      metaDescription:
        'Discover the principles of user-centered design and how to create delightful digital experiences that resonate with users.',
      ogImageUrl:
        'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      canonicalUrl: '/blog/designing-for-delight',
      isIndexed: true,
      readingTimeMinutes: 5,
      publishedAt: new Date('2024-10-12'),
      createdAt: new Date('2024-10-12'),
      updatedAt: new Date('2024-10-12'),
    },
    {
      id: '3',
      site: {
        id: '1',
        domain: 'myportfolio.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      author: {
        id: '1',
        name: 'José Araújo',
        email: 'jose@jose.com',
        avatarUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'A passionate designer and developer with a love for creating intuitive digital experiences.',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      category: {
        id: '1',
        site: {
          id: '1',
          domain: 'myportfolio.com',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        name: 'Design',
        slug: 'design',
        description: 'Insights and trends in design, user experience, and creativity.',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      title: 'Designing for Delight: The Art of User-Centered Experiences',
      slug: 'designing-for-delight',
      excerpt: 'Discover the principles of user-centered design and how to create delightful digital experiences that resonate with users.',
      content: 'Full content of the blog post would go here...',
      status: 'published',
      language: 'en',
      coverImageUrl:
        'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metaTitle: 'Designing for Delight: The Art of User-Centered Experiences',
      metaDescription:
        'Discover the principles of user-centered design and how to create delightful digital experiences that resonate with users.',
      ogImageUrl:
        'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      canonicalUrl: '/blog/designing-for-delight',
      isIndexed: true,
      readingTimeMinutes: 5,
      publishedAt: new Date('2024-10-12'),
      createdAt: new Date('2024-10-12'),
      updatedAt: new Date('2024-10-12'),
    },
  ];

  return (
    <div className="w-full md:w-7xl md:px-8">
      <AnimateIn className="flex flex-col justify-center items-center gap-4" animation="fade-up">
        <h2 className="text-primary font-semibold uppercase">Insights & Perspectives</h2>
        <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">The Curated Journal</h3>
        <p className="text-lg text-[#5A677A] text-center">Explore my latest thoughts and insights on design, technology, and business.</p>
      </AnimateIn>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-8 md:mt-32">
        {posts.map(post => (
          <AnimateIn animation="fade-up" delay={0} className="w-full">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between items-start gap-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <img src={post.coverImageUrl} alt={post.title} className="w-full" />
              <div className="p-8 pt-0 flex flex-col justify-center items-center gap-2">
                <h4 className="text-xl font-bold text-[#2B3437] line-clamp-2">{post.title}</h4>
                <p className="text-secondary line-clamp-3">{post.excerpt}</p>
                <div className="h-px w-full bg-gray-200 mt-2 mb-2" />
                <div className="w-full flex gap-4 md:gap-8 items-center">
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="aspect-square h-8 md:h-12 rounded-lg shrink-0 shadow-2xl"
                  />
                  <div>
                    <p className="text-primary text-base md:text-lg font-bold">{post.author.name}</p>
                    <p className="text-secondary text-sm font-semibold">
                      {Intl.DateTimeFormat('pt-PT', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      }).format(post.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
