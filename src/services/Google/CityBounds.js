// eslint-disable-next-line import/prefer-default-export
export function cityBounds(city, maps) {
  return new maps.LatLngBounds(
    new maps.LatLng(city.bounds.southwest.lat, city.bounds.southwest.lng),
    new maps.LatLng(city.bounds.northeast.lat, city.bounds.northeast.lng)
  );
}
