import ComicType from '@/components/ui/ComicType';

export async function generateMetadata() {
  return {
    title: 'Comic List Type',
    description: `Explore the best comics in the list type on truyentranh.online.`,
    openGraph: {
      title: 'Comic List Type',
      description: `Explore the best comics in the list type on truyentranh.online.`,
      type: 'website',
      images: [
        {
          url: '/default-cover.jpg',
          alt: 'comic list type of truyentranh.online',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Comic List Type',
      description: `Explore the best comics in the list type on truyentranh.online.`,
      images: [
        {
          url: '/default-cover.jpg',
          alt: 'comic list type of truyentranh.online',
        },
      ],
    },
    // Structured Data (JSON-LD)
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Comic List Type',
      description: `Explore the best comics in the list type on truyentranh.online.`,
      publisher: {
        '@type': 'Organization',
        name: 'TruyenTranh Online',
        logo: {
          '@type': 'ImageObject',
          url: 'https://truyentranh.online/logo.png',
        },
      },
      image: '/default-cover.jpg',
    },
  };
}

export default async function ComicListPage() {
  return (
    <div className="container mx-auto p-4">
      <ComicType />
    </div>
  );
}
