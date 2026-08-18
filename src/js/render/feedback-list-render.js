import starSprite from '../../img/sprite.svg';

function renderStarIcon(type) {
  return `
    <svg class="star__icon star__icon--${type}" viewBox="0 0 34 32" aria-hidden="true">
      <use href="../../img/sprite.svg#star-${type}"></use>
    </svg>
  `;
}

export function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(({ _id, author, rate, description }) => {
      const fullStars = Math.floor(rate);
      const hasHalf = rate % 1 === 0.5;

      const stars = Array.from({ length: 5 }, (_, index) => {
        let type;

        if (index < fullStars) {
          type = 'filled';
        } else if (index === fullStars && hasHalf) {
          type = 'half';
        } else {
          type = 'empty';
        }

        return `<div class="star">${renderStarIcon(type)}</div>`;
      }).join('');

      return `
        <div class="feedback-slide swiper-slide" data-id="${_id}">
          <article class="feedback-card">
            <div class="feedback-rating" aria-label="Оцінка ${rate} з 5">
              <div class="star-container">
                ${stars}
              </div>
            </div>

            <p class="feedback-text">${description}</p>

            <p class="feedback-name">${author}</p>
          </article>
        </div>
      `;
    })
    .join('');
}