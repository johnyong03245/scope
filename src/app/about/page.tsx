import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">About scopé.</h1>
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed font-normal">
          Hey there! Thanks for visiting scopé. This project is a passion of mine, a first step into the startup world, and an exploration of how AI can help us understand technology better.
        </p>
        <p className="text-gray-600 leading-relaxed font-normal">
          I&apos;m the person behind scopé, and while AI does the heavy lifting in writing the articles, I&apos;m here to guide the content, select the topics, and ensure everything you read is both interesting and accurate. My focus is purely on technology – the areas I love to dig into and learn about myself.
        </p>
        <p className="text-gray-600 leading-relaxed font-normal">
          Think of scopé as a collaborative effort: AI generates the ideas, and I shape them into something valuable for you. It&apos;s an exciting learning curve for me, and I&apos;m thrilled to be building this platform to share my tech interests and gain real-world startup experience. Let&apos;s explore the world of tech together!
        </p>
      </div>
      <div className="mt-10">
      <Link 
          href="/articles"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-base font-medium"
      >
          Explore our latest article
        </Link>
      </div>
    </main>
  );
} 