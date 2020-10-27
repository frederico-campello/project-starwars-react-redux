import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPlanets } from '../actions';

import NameFilter from './NameFilter';
import FiltersList from './FiltersList';
import NumericFilters from './NumericFilters';
import SortFilters from './SortFilters';
import Table from './Table';

class SWDatatable extends Component {
  componentDidMount() {
    const { getPlanets } = this.props;
    getPlanets();
  }

  render() {
    const { isFetching, arrayPlanets } = this.props;
    return (
      <div>
        <h1 className="title">StarWars Datatable</h1>
        {isFetching && <h2>Loading...</h2>}
        {!isFetching && (
          <div className="filterContainer">
            <NameFilter />
            <FiltersList />
            <NumericFilters />
            <SortFilters />
          </div>
        )}
        {arrayPlanets.length > 0 && <Table />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.starWarsAPIReducer.isFetching,
  arrayPlanets: state.starWarsAPIReducer.data,
  numericFilters: state.filters.filterByNumericValues,
});

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchPlanets()),
});

SWDatatable.propTypes = {
  getPlanets: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  arrayPlanets: PropTypes.arrayOf(
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SWDatatable);
