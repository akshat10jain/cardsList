import React from 'react';

const CardList = ({ cardsToRender }) => {
  return (
    <ul className="list-cards">
      {cardsToRender && cardsToRender.map((card) => (
        <li key={card.mal_id} className="list">
          <article>
            <img
              src={card.image_url}
              alt='card-img'
            />
            <div className='bottom-content'>
              <h4>{card.title}</h4>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};
export default CardList;