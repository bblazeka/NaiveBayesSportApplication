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

export const addPlayer = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ADD_PLAYER,
  });
  /*
  common.customFetch(`${common.apiServiceEndpoint}/api/players/selected?id=${id}`, getState, {
    method: 'PUT',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.SELECTED_PLAYERS_LOADED,
      payload: data
    })
  }));*/
}

export const deletePlayer = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_PLAYER,
  });
  /*
    common.customFetch(`${common.apiServiceEndpoint}/api/players/selected?id=${id}`, getState, {
      method: 'DELETE',
    }).then(response => response.json().then(data => {
      dispatch({
        type: actionTypes.SELECTED_PLAYERS_LOADED,
        payload: data
      })
    }));*/
}

export const searchBasicPlayer = (name) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.BASIC_SEARCH_PLAYER,
  });
  /*common.customFetch(`${common.apiServiceEndpoint}/api/players/search/${name}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.BASIC_PLAYER_LOADED,
      payload: data
    })
  }));*/
}

export const searchPlayer = (name, individual) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SEARCH_PLAYER,
  });
  /*common.customFetch(`${common.apiServiceEndpoint}/api/players/search/${name}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    common.customFetch(`${common.apiServiceEndpoint}/api/players/${data[0].id}`, getState, {
      method: 'GET',
    }).then(response => response.json().then(data2 => {
      if (individual) {
        dispatch({
          type: actionTypes.PLAYER_LOADED,
          payload: data2
        })
      }
      else
      {
        dispatch({
          type: actionTypes.ADD_PLAYER,
          payload: data2
        })
      }
    }));
  }));*/
}

export const removePlayer = (id) => ({
  type: actionTypes.REMOVE_PLAYER,
  payload: {
    id,
  }
})

export const getSelectedPlayers = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_SELECTED_PLAYERS,
  });
  /*common.customFetch(`${common.apiServiceEndpoint}/api/players/selected`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: actionTypes.SELECTED_PLAYERS_LOADED,
      payload: data
    })
  }));*/
}