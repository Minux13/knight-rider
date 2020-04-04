import { createSelector } from 'reselect';
import { observationsReducer } from './observations.reducer';
import { Observation } from './observations.reducer';

const sliceSelector = (state: any) => state[observationsReducer.sliceName];

export const observationsSelector = createSelector(
  sliceSelector,
  (slice: any) => slice.observations,
);

export const isLoadingSelector = createSelector(
  sliceSelector,
  (slice: any) => slice.loading,
);

export const catalogSelector = createSelector(
  sliceSelector,
  (slice: any) => slice.catalog,
);

export const observationsCatalogSelector = createSelector(
  sliceSelector,
  catalogSelector,
  (slice: any, catalog: any) =>
    slice.observations &&
    catalog &&
    slice.observations.map((observation: Observation) => {
      let observation_type_id_title = catalog.observation_types.find(
        (item: any) => item.id === observation.observation_type_id
      );
      let social_program_id_title = catalog.social_programs.find(
        (item: any) => item.id === observation.social_program_id
      );
      observation_type_id_title = observation_type_id_title
        ? observation_type_id_title.title
        : null;
      social_program_id_title = social_program_id_title
        ? social_program_id_title.title
        : null;

      return {
        ...observation,
        observation_type_id_title,
        social_program_id_title,
      };
    })
);