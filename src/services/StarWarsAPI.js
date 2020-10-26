const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsData = async () => {
  try {
    const response = await fetch(API_URL);
    const planets = await response.json();
    return planets;
  } catch (e) {
    return Promise.reject(new Error('error'));
  }
};

export default getPlanetsData;
