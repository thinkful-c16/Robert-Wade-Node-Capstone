/* global jQuery, handle, $, api */
'use strict';

const COMPENDIUM_URL = '/api/v1/spells/';
const WIZARDS_URL = '/api/v1/wizards/';

const renderPage = function (store) {
  if (store.demo) {
    $('.view').css('background-color', 'gray');
    $('#' + store.view).css('background-color', 'white');
  } else {
    $('.view').hide();
    $('#' + store.view).show();
  }
};

const renderResults = function (store) {
  const listItems = store.list.map((item) => {
    return `<li id="${item._id}">
                <a href="${item.url}" class="compendiumDetail">${item.name}</a>
              </li>`;
  });
  $('#result').empty().append('<ul>').find('ul').append(listItems);
};

const renderCompendiumResults = function (store) {
  const listItems = store.compendiumList.map((item) => {
    return `<li id="${item._id}">
                <a href="${item.url}" class="compendiumDetail">${item.name}</a>
              </li>`;
  });
  $('#result').empty().append('<ul>').find('ul').append(listItems);
};

const renderWizardsResults = function (store) {
  const listItems = store.wizardsList.map((item) => {
    return `<li id="${item._id}">
                <a href="${item.url}" class="wizardsDetail">${item.name}, level ${item.level} wizard</a>
              </li>`;
  });
  $('#allWizards').empty().append('<ul>').find('ul').append(listItems);
};

// const renderEdit = function (store) {
//   const el = $('#edit');
//   const item = store.item;
//   el.find('[name=title]').val(item.title);
//   el.find('[name=content]').val(item.content);
// };

const renderWizardEdit = function (store) {
  const el = $('#edit-wizard');
  const item = store.item;
  el.find('[name=name]').val(item.name);
  el.find('[name=level]').val(item.level);
  el.find('[name=intelligence]').val(item.intelligence);
};

const renderDetail = function (store) {
  const el = $('#compendiumDetail');
  const item = store.item;
  el.find('.name').text(item.name);
  el.find('.description').text(item.description);
  el.find('.higher-levels').text(item.higher_levels);
  el.find('.casting-time').text(item.casting_time);
  el.find('.duration').text(item.duration);
  el.find('.range').text(item.range);
  el.find('.components').text(item.components.raw);
  el.find('.type').text(item.type);
};

const renderWizardDetail = function (store) {
  const el = $('#wizardDetail');
  const item = store.item;
  el.find('.name').text(item.name);
  el.find('.level').text(item.level);
  el.find('.intelligence').text(item.intelligence);
  el.find('.intelligence-modifier').text(item.intelligenceModifier);
  el.find('.max-prepared').text(item.maxPrepared);
  el.find('.spell-book').text(item.spellBook);
};

// const handleSearch = function (event) {
//   event.preventDefault();
//   const store = event.data;
//   const el = $(event.target);
//   const title = el.find('[name=title]').val();
//   var query;
//   if (title) {
//     query = {
//       title: el.find('[name=title]').val()
//     };
//   }
//   api.search(query)
//     .then(response => {
//       store.list = response;
//       renderResults(store);

//       store.view = 'search';
//       renderPage(store);
//     }).catch(err => {
//       console.error(err);
//     });
// };

const handleCompendium = function (event) {
  event.preventDefault();
  const store = event.data;
  const el = $(event.target);
  const spellName = el.find('[name=spellName]').val();
  var query;
  if (spellName) {
    query = {
      title: el.find('[name=spellName]').val()
    };
  }
  api.spellSearch(query)
    .then(response => {
      store.compendiumList = response;
      renderCompendiumResults(store);

      store.view = 'compendiumOfSpells';
      renderPage(store);
    }).catch(err => {
      console.error(err);
    });
};

const handleWizards = function (event) {
  event.preventDefault();
  const store = event.data;
  const el = $(event.target);
  const spellName = el.find('[name=wizardName]').val();
  var query;
  if (spellName) {
    query = {
      title: el.find('[name=wizardName]').val()
    };
  }
  api.wizardSearch(query)
    .then(response => {
      store.wizardsList = response;
      renderWizardsResults(store);

      store.view = 'wizards';
      renderPage(store);
    }).catch(err => {
      console.error(err);
    });
};

const handleCreate = function (event) {
  event.preventDefault();
  const store = event.data;
  const el = $(event.target);

  const document = {
    title: el.find('[name=title]').val(),
    content: el.find('[name=content]').val()
  };
  api.create(document)
    .then(response => {
      store.item = response;
      store.list = null; //invalidate cached list results
      renderDetail(store);
      store.view = 'compendiumDetail';
      renderPage(store);
    }).catch(err => {
      console.error(err);
    });
};

const handleCreateWizard = function (event) {
  event.preventDefault();
  const store = event.data;
  const el = $(event.target);

  const document = {
    name: el.find('[name=name]').val(),
    level: el.find('[name=level]').val(),
    intelligence: el.find('[name=intelligence]').val()
  };
  api.wizardCreate(document)
    .then(response => {
      store.item = response;
      store.wizardsList = null; //invalidate cached list results
      renderWizardDetail(store);
      store.view = 'wizardDetail';
      renderPage(store);
    }).catch(err => {
      console.error(err);
    });
};

// const handleUpdate = function (event) {
//   event.preventDefault();
//   const store = event.data;
//   const el = $(event.target);

//   const document = {
//     id: store.item.id,
//     title: el.find('[name=title]').val(),
//     content: el.find('[name=content]').val()
//   };
//   api.update(document, store.token)
//     .then(response => {
//       store.item = response;
//       store.list = null; //invalidate cached list results
//       renderDetail(store);
//       store.view = 'compendiumDetail';
//       renderPage(store);
//     }).catch(err => {
//       console.error(err);
//     });
// };

const handleWizardUpdate = function (event) {
  event.preventDefault();
  const store = event.data;
  const el = $(event.target);

  const document = {
    id: store.item._id,
    name: el.find('[name=name]').val(),
    level: el.find('[name=level]').val(),
    intelligence: el.find('[name=intelligence]').val()
  };
  api.wizardUpdate(document, store.token)
    .then(response => {
      store.item = response;
      store.wizardsList = null; //invalidate cached list results
      renderWizardDetail(store);
      store.view = 'wizardDetail';
      renderPage(store);
    }).catch(err => {
      console.error(err);
    });
};

const handleCompendiumDetails = function (event) {
  event.preventDefault();
  const store = event.data;
  const el = $(event.target);

  const id = el.closest('li').attr('id');

  api.spellDetails(id)
    .then(response => {
      store.item = response;
      renderDetail(store);

      store.view = 'compendiumDetail';
      renderPage(store);

    }).catch(err => {
      store.error = err;
    });
};

const handleWizardDetails = function (event) {
  event.preventDefault();
  const store = event.data;
  const el = $(event.target);

  const id = el.closest('li').attr('id');

  api.wizardDetails(id)
    .then(response => {
      store.item = response;
      renderWizardDetail(store);

      store.view = 'wizardDetail';
      renderPage(store);

    }).catch(err => {
      store.error = err;
    });
};

// const handleRemove = function (event) {
//   event.preventDefault();
//   const store = event.data;
//   const id = store.item.id;

//   api.remove(id, store.token)
//     .then(() => {
//       store.list = null; //invalidate cached list results
//       return handleSearch(event);
//     }).catch(err => {
//       console.error(err);
//     });
// };

const handleWizardRemove = function (event) {
  event.preventDefault();
  const store = event.data;
  const id = store.item._id;

  api.wizardRemove(id, store.token)
    .then(() => {
      store.wizardsList = null; //invalidate cached list results
      return handleWizards(event);
    }).catch(err => {
      console.error(err);
    });
};

const handleViewWizards = function (event) {
  event.preventDefault();
  const store = event.data;
  if (!store.wizardsList) {
    handleWizards(event);
    return;
  }
  store.view = 'wizards';
  renderPage(store);
};

// const handleViewList = function (event) {
//   event.preventDefault();
//   const store = event.data;
//   if (!store.list) {
//     handleSearch(event);
//     return;
//   }
//   store.view = 'search';
//   renderPage(store);
// };

const handleViewCompendium = function (event) {
  event.preventDefault();
  const store = event.data;
  if (!store.compendiumList) {
    handleCompendium(event);
    return;
  }
  store.view = 'compendiumOfSpells';
  renderPage(store);
};

// const handleViewEdit = function (event) {
//   event.preventDefault();
//   const store = event.data;
//   renderEdit(store);

//   store.view = 'edit';
//   renderPage(store);
// };

const handleViewEditWizard = function (event) {
  event.preventDefault();
  const store = event.data;
  renderWizardEdit(store);

  store.view = 'edit-wizard';
  renderPage(store);
};

const handleViewHome = function (event) {
  event.preventDefault();
  const store = event.data;
  store.view='home';
  renderPage(store);
};

const handleViewCreateWizard = function (event) {
  event.preventDefault();
  const store = event.data;
  store.view='createWizard';
  renderPage(store);
};

//on document ready bind events
jQuery(function ($) {

  const STORE = {
    demo: true,        // display in demo mode true | false
    view: 'list',       // current view: splash page | spell list | spell details | wizards | wizard details | spell book
    query: {},          // search query values
    wizardsList: null,
    compendiumList: null,         // search result - array of objects (documents)
    spellBookList: null,
    item: null,         // currently selected document
    activeWizard: {}
  };

  // $('#create').on('submit', STORE, handleCreate);
  // $('#edit').on('submit', STORE, handleUpdate);

  // $('#detail').on('click', '.remove', STORE, handleRemove);
  // $('#detail').on('click', '.edit', STORE, handleViewEdit);

  // compendium related listeners 
  $('#result').on('click', '.compendiumDetail', STORE, handleCompendiumDetails);
  $('#compendiumOfSpells').on('submit', STORE, handleCompendium);

  // wizards related listeners
  $('#createWizard').on('submit', STORE, handleCreateWizard);
  $('#allWizards').on('click', '.wizardsDetail', STORE, handleWizardDetails);
  $('#wizards').on('click', '.viewCreateWizard', STORE, handleViewCreateWizard);
  $('#wizardDetail').on('click', '.view-edit-wizard', STORE, handleViewEditWizard);
  $('#edit-wizard').on('submit', STORE, handleWizardUpdate);
  $('#wizardDetail').on('click', '.delete-wizard', STORE, handleWizardRemove);

  // nav bar listeners
  $(document).on('click', '.viewWizards', STORE, handleViewWizards);
  $(document).on('click', '.viewSpellSearch', STORE, handleViewCompendium);
  $(document).on('click', '.viewHome', STORE, handleViewHome);

  // start app by viewing the home page
  // $('#search').trigger('submit');
  $('.viewHome').trigger('click');
});
