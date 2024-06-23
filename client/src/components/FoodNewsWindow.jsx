import React, { useEffect, useState } from 'react';
import img1 from '../NewsPhotos/img1.jpg';
import img2 from '../NewsPhotos/img2.png';
import img3 from '../NewsPhotos/img3.jpg';

export default function FoodNewsWindow() {
  const imgs = [img1, img2, img3, img2];
  const [id, setId] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      
      id >= imgs.length - 1 ? setId(0) : setId((priv) => priv + 1);
    }, 2000);
  }, [id]);

  return (
    <div className="img">
      <img src={imgs[id]} />
    </div>
  );
}
