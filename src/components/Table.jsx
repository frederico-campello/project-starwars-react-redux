import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filterData, orderAscDesc } from '../services/filterAndOrder';

const Table = ({ data, nameInput, numericFilters, column, sort }) => {
  const filtered = filterData(data, nameInput, numericFilters);
  const ordered = orderAscDesc(filtered, column, sort);

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0])
              .filter((element) => element !== 'residents')
              .map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {ordered.map(({ residents, ...planet }) => (
            <tr key={planet.name}>
              {Object.values(planet).map((value) => (
                <td key={value}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.starWarsAPIReducer.data,
  nameInput: state.filters.filterByName.name,
  numericFilters: state.filters.filterByNumericValues,
  column: state.filters.order.column.toLowerCase(),
  sort: state.filters.order.sort,
});

Table.propTypes = {
  nameInput: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      diameter: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      gravity: PropTypes.string,
      population: PropTypes.string,
      climate: PropTypes.string,
      terrain: PropTypes.string,
      surface_water: PropTypes.string,
      films: PropTypes.array,
      url: PropTypes.string,
      created: PropTypes.string,
      edited: PropTypes.string,
    }).isRequired,
  ).isRequired,
  numericFilters: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.string,
      comparison: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
  ).isRequired,
  column: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Table);
