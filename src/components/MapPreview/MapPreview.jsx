import './mapPreview.css';

export const MapPreview = () => {

  return (
  <div className="map-preview">
    {/*<a href="https://yandex.ru/maps?utm_medium=mapframe&utm_source=maps"*/}
    {/*   style={{color:"#eee",fontSize:"12px",position:"absolute",top:"0px"}}>Яндекс*/}
    {/*Карты</a>*/}
    <a
    href="https://yandex.ru/maps/?ll=37.722985%2C54.456191&mode=usermaps&source=constructorLink&um=constructor%3A2474ca31b699229a9a87ea675329c7a09def4e5978f5bbc9f2be728252037e4b&utm_medium=mapframe&utm_source=maps&z=13.7"
    style={{color:"#eee",fontSize:"12px",position:"absolute",top:"14px"}}>Яндекс Карты — транспорт, навигация, поиск мест</a>
    <iframe
      src="https://yandex.ru/map-widget/v1/?ll=37.722985%2C54.456191&mode=usermaps&source=constructorLink&um=constructor%3A2474ca31b699229a9a87ea675329c7a09def4e5978f5bbc9f2be728252037e4b&z=13.7"
      width="401" height="401" frameBorder="0" allowFullScreen="true" style={{position:"relative"}}></iframe>
  </div>);

}