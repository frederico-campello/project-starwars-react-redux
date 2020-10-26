import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filterByName } from '../actions';

const NameFilter = ({ filterName }) => (
  <div className="nameFilter">
    <label htmlFor="planetName">
      Filtrar planeta pelo nome
      <input
        type="text"
        name="planetName"
        data-testid="name-filter"
        onChange={(event) => filterName(event.target.value)}
        placeholder="Digite..."
      />
    </label>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  filterName: (payload) => dispatch(filterByName(payload)),
});

NameFilter.propTypes = {
  filterName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NameFilter);
