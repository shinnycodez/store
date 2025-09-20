import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Phone charm",
    imageUrl: "https://pbs.twimg.com/media/G1SpArfXgAEHqfI?format=png&name=small"
  },
    {
    id: 2,
    title: "Arm cuff",
    imageUrl: "https://pbs.twimg.com/media/G1SpgnfXQAAbmAy?format=png&name=small"
  },
  {
    id: 3,
    title: "Bracelet",
    imageUrl: "https://pbs.twimg.com/media/G1SpkAAWIAAN9Ka?format=png&name=small"
  },
    {
    id: 4,
    title: "Bookmarks",
    imageUrl: "https://pbs.twimg.com/media/G1Sp09cXkAAfeu5?format=png&name=small"
  },
      {
    id: 5,
    title: "Necklaces",
    imageUrl: "https://pbs.twimg.com/media/G1SqRycX0AAzxSd?format=png&name=small"
  },
        {
    id: 6,
    title: "Bag charms",
    imageUrl: "https://pbs.twimg.com/media/G1SqS8CW4AAMxC6?format=png&name=900x900"
  },

];

function FeaturedCategories() {
  return (
    <div>
      <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Featured Categories
      </h2>
      
      <div className="flex flex-col gap-5 p-4 md:grid md:grid-cols-3 md:gap-4">
        {categories.map(category => (
          <Link
            to={`/products?category=${encodeURIComponent(category.title)}`}
            key={category.id}
            className="flex flex-col gap-2 group"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ backgroundImage: `url(${category.imageUrl})` }}
            ></div>
            <p className="text-[#141414] text-base font-medium leading-normal">{category.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCategories;
