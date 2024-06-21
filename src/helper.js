export const getStrapiImageUrl = uri => `${process.env.REACT_APP_STRAPI_URL}${uri}`;

export const raceStatus = {
  opened: 'Открыта регистрация',
  locationAnnounced: 'Объявлено место старта',
  registrationClosed: 'Закрыта регистрация',
  resultsPublished: 'Готовы результаты',
  closed: 'Протокол закрыт',
}
