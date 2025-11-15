import React from "react";

const Blog: React.FC = () => {
  // This is just two example links — you can change them later!
  const cards = [
    {
      title: "🌴 Main Attractions in Florida",
      description: "Discover Florida's most popular destinations — from Orlando’s theme parks to Miami’s beaches.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Beach photo
      link: "https://www.visitflorida.com/things-to-do/attractions/", // external link
    },
    {
      title: "🍽️ Best Restaurants in Florida",
      description: "Explore Florida’s top-rated restaurants and hidden gems for amazing food experiences.",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", // Food photo
      link: "https://guide.michelin.com/us/en/florida/restaurants", // external link
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Florida Travel Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="text-gray-300">{card.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blog;


