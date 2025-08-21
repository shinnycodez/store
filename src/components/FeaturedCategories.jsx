import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Phone charm",
    imageUrl: "https://scontent.flhe7-1.fna.fbcdn.net/v/t1.15752-9/520316640_739284315509283_8235616515268146188_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=H95HpV8pj3MQ7kNvwH-igP-&_nc_oc=Admi3G8wZnqbxfNpd2HErFX0VRjsdUVhDW-W3CPcSfPMuxrAqdBJHDCZSQ90QcZEOYQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.flhe7-1.fna&oh=03_Q7cD3AEG37oMHw9U-GUFuYqF9Ad2DH4qxIqzAM2VXxBA-wbFag&oe=68CEA851"
  },
    {
    id: 2,
    title: "Arm cuff",
    imageUrl: "https://scontent.flhe7-2.fna.fbcdn.net/v/t1.15752-9/518872764_2112236285933772_3598642941186150970_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_ohc=rLqs4KV7p6YQ7kNvwFYRk1U&_nc_oc=Adk0IIeSm74uFfjSULJrgpWRjLDqbQc6PHJ4fHpxS-Ffrm_orqS4kd6lQbowLoiPwLU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.flhe7-2.fna&oh=03_Q7cD3AEzmMp4InyaEJm9eio-8E0naLczJsQsJ2p9mmzVGrXuPA&oe=68CE9713"
  },
  {
    id: 3,
    title: "Bracelet",
    imageUrl: "https://scontent.flhe7-2.fna.fbcdn.net/v/t1.15752-9/519162040_1439721110565854_7224674274541967288_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_ohc=WeCdFgZj-AQQ7kNvwGtYuSc&_nc_oc=Admr7zO3V6XcVBcnhne70gR6eL_jOBMcuO3iHlirETupNs5gbYYlm1C5XjDDii6M_zc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.flhe7-2.fna&oh=03_Q7cD3AGf1jVe_YZcDxthPDkgKmU6ohlpRyXBGLq6PvIIUD5WLQ&oe=68CE9744"
  },
    {
    id: 4,
    title: "Bookmarks",
    imageUrl: "https://scontent.flhe3-2.fna.fbcdn.net/v/t1.15752-9/523296752_1458911468463243_3121384784033634617_n.png?stp=dst-png_s640x640&_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_ohc=k4zcz4E-Tp4Q7kNvwF6KbWD&_nc_oc=AdlGoXwntadR5pg2uz6n_1TkG4DwqVbrzXsg7wMdDanJ5eCnw_reoi_8WxNXC1bCexw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.flhe3-2.fna&oh=03_Q7cD3AGvRRHUUhtPTMzKLowkLpziNXyBnUEncwLVS-boXOkIrA&oe=68CEB988"
  },
      {
    id: 5,
    title: "Necklaces",
    imageUrl: "https://scontent.flhe7-2.fna.fbcdn.net/v/t1.15752-9/518732106_1432521157784810_4236191864935155782_n.png?stp=dst-png_s640x640&_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_ohc=PegacEAHjYUQ7kNvwE_h9Cf&_nc_oc=AdmwHiIenOoGXtuR5egO-yjtLNOZP4UnpIZsQhKUW3WkDCjH3OshsnHGX8vcvbw8A9o&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.flhe7-2.fna&oh=03_Q7cD3AGPY_bRb-eseekM2x1hBM_dZ5hnDTUXTPX3gjyhEgpp3A&oe=68CEB2EB"
  },
        {
    id: 6,
    title: "Bag charms",
    imageUrl: "https://scontent.flhe3-1.fna.fbcdn.net/v/t69.46293-2/521553686_717219624551674_674821928729006345_n.?stp=dst-jpg_p480x480_tt6&_nc_cat=111&ccb=1-7&_nc_sid=942482&_nc_ohc=EvF10yKGwKoQ7kNvwEjI3ym&_nc_oc=AdnFOv3aW0E4Xj3EgiMrvL2C2HKlyb-2C-iBsUjKEp-iUJpKDtlgTmq0uwTUJglmMjQ&_nc_zt=28&_nc_ht=scontent.flhe3-1.fna&_nc_gid=wx5N5ME78mXcxPgxu59MUg&oh=03_Q7cD3AEdbk800nInS9kQaEtjnUzDioUC46RNH7b_Cd6OCvmSBQ&oe=68A90E15"
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
