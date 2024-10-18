import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

const InstagramCard = () => {
  return (
    <div className="max-w-sm h-96 mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
      <div className="p-4">
        <InstagramEmbed
          url="https://www.instagram.com/p/BxdC4LPF00r/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
          style={{ borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};

export default InstagramCard;
