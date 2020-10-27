/* A função "filterData" é responsável por manipular o array de objetos (planetas) retornado
pela API, aplicando os filtros de nome e de comparação de valores numéricos.
*/

export const filterData = (datatable, nameInput, numericFilters) => {
  let filteredData = [];

  nameInput === ''
    ? (filteredData = datatable)
    : (filteredData = datatable.filter((planet) =>
        planet.name.includes(nameInput),
      ));

  if (numericFilters.length > 0) {
    numericFilters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        filteredData = filteredData.filter(
          (planet) => planet[filter.column] > Number(filter.value),
        );
      }
      if (filter.comparison === 'menor que') {
        filteredData = filteredData.filter(
          (planet) => planet[filter.column] < Number(filter.value),
        );
      }
      if (filter.comparison === 'igual a') {
        filteredData = filteredData.filter(
          (planet) => planet[filter.column] === filter.value,
        );
      }
    });
  }

  return filteredData;
};

/* A função "orderAscDesc" é responsável por ordenar os planetas (tendo ou não filtro(s) aplicado(s)).
Por padrão, a tabela é ordenada pela coluna "name" de maneira ascendente.
 */

const numericKeys = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const ascSortNumber = (filtered, column) =>
  filtered.sort((a, b) => Number(a[column]) - Number(b[column]));

const ascSortString = (filtered, column) =>
  filtered.sort((a, b) => {
    if (a[column] > b[column]) return 1;
    if (a[column] < b[column]) return -1;
    return 0;
  });

export const orderAscDesc = (filtered, column, sort) => {
  const sorted = numericKeys.includes(column)
    ? ascSortNumber(filtered, column)
    : ascSortString(filtered, column);
  return sort === 'DESC' ? sorted.reverse() : sorted;
};
