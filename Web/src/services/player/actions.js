import { axiosGraphQL } from '../../util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';

export const getPlayer = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_PLAYER,
  });
  var player = (await axiosGraphQL.post('', { query: querySchemas.getBasicPlayer(id) })).data.data.player;
  var queryString = (player.primaryPosition.code === "G") ? querySchemas.getGoalie(id)
    : querySchemas.getSkater(id);
  axiosGraphQL
    .post('', { query: queryString })
    .then(response => {
      dispatch({
        type: actionTypes.PLAYER_LOADED,
        payload: response.data.data.player
      })
    });
}

export const addPlayer = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_PLAYER,
  });

  axiosGraphQL
    .post('', { query: querySchemas.addSelectedPlayer(id) })
    .then(response => {
      dispatch({
        type: actionTypes.SELECTED_PLAYERS_LOADED,
        payload: response.data.data.addSelectedPlayer
      })
    });
}

export const deletePlayer = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_PLAYER,
  });
  axiosGraphQL
    .post('', { query: querySchemas.deleteSelectedPlayer(id) })
    .then(response => {
      dispatch({
        type: actionTypes.SELECTED_PLAYERS_LOADED,
        payload: response.data.data.deleteSelectedPlayer
      })
    });
}

export const removeAllPlayers = () => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_ALL_PLAYERS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.removeAllPlayers() })
    .then(response => {
      dispatch({
        type: actionTypes.SELECTED_PLAYERS_LOADED,
        payload: response.data.data.clearSelectedPlayers
      })
    });
}

export const searchBasicPlayer = (name) => (dispatch) => {
  dispatch({
    type: actionTypes.BASIC_SEARCH_PLAYER,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getBasicPlayerByName(name) })
    .then(response => {
      dispatch({
        type: actionTypes.BASIC_PLAYER_LOADED,
        payload: response.data.data.searchPlayerByName
      })
    });
}

export const removePlayer = (id) => ({
  type: actionTypes.REMOVE_PLAYER,
  payload: {
    id,
  }
})

export const getSelectedPlayers = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_SELECTED_PLAYERS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getSelectedPlayers() })
    .then(response => {
      dispatch({
        type: actionTypes.SELECTED_PLAYERS_LOADED,
        payload: response.data.data.selectedPlayers
      })
    });
}