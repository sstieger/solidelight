import { dct, schema } from 'rdf-namespaces';

export const Place = 'http://purl.org/solidelight/terms/Place';

export const hereId = 'https://stieger.io/terms/hereGeocodingAndSearchApi/v7/place/id';
export const title = dct.title;
export const address = schema.address;
export const category = 'https://stieger.io/terms/hereGeocodingAndSearchApi/v7/place/categoryId';
export const foodType = 'https://stieger.io/terms/hereGeocodingAndSearchApi/v7/place/foodTypeId';
export const latitude = schema.latitude;
export const longitude = schema.longitude;
