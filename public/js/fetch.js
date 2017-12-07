'use strict';
/**
 * API: DATA ACCESS LAYER (using fetch())
 * 
 * Primary Job: communicates with API methods. 
 *  
 * Rule of Thumb:
 * - Never manipulation DOM directly
 * - No jquery on this page, use `fetch()` not `$.AJAX()` or `$.getJSON()`
 * - Do not call render methods from this layer
 * 
 */

function buildUrl(path, query) {
  var url = new URL(path, window.location.origin);
  if (query) {
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  }
  return url;
}

function normalizeResponseErrors(res) {
  if (!res.ok) {
    if (
      res.headers.has('content-type') &&
      res.headers.get('content-type').startsWith('application/json')
    ) {
      // It's a nice JSON error returned by us, so decode it
      return res.json().then(err => Promise.reject(err));
    }
    // It's a less informative error returned by express
    return Promise.reject({
      status: res.status,
      message: res.statusText
    });
  }
  return res;
}

var api = {

  spellSearch: function (query) {
    const url = buildUrl(COMPENDIUM_URL, query);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(normalizeResponseErrors)
      .then(res => res.json());
  },

  wizardSearch: function (query) {
    const url = buildUrl(WIZARDS_URL, query);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(normalizeResponseErrors)
      .then(res => res.json());
  },

  spellDetails: function (id) {
    const url = buildUrl(`${COMPENDIUM_URL}${id}`);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(normalizeResponseErrors)
      .then(res => res.json());
  },

  wizardDetails: function (id) {
    const url = buildUrl(`${WIZARDS_URL}${id}`);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(normalizeResponseErrors)
      .then(res => res.json());
  },

  wizardCreate: function (document) {
    const url = buildUrl(`${WIZARDS_URL}`);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: document ? JSON.stringify(document) : null
    }).then(normalizeResponseErrors)
      .then(res => res.json());
  },

  wizardUpdate: function (document) {
    const url = buildUrl(`${WIZARDS_URL}${document.id}`);
    
    console.log('dev tools', document);

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: document ? JSON.stringify(document) : null
    }).then(normalizeResponseErrors)
      .then(res => res.json());
  },

  wizardRemove: function (id) {
    const url = buildUrl(`${WIZARDS_URL}${id}`);

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    }).then(normalizeResponseErrors)
      .then(res => res.text());
  },

  spellBook: function (id) {
    const url = buildUrl(`${WIZARDS_URL}${id}/spellbook`);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(normalizeResponseErrors)
      .then(res => res.json());
  },

};


