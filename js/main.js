// https://api.github.com/search/repositories?q={${query}{&page,per_page,sort,order}

let formEl = document.querySelector('#form');
let searchInput = document.querySelector('#search-input');
let validationErrorMessage = document.querySelector('#error-block');


formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  let inputsValue = Object.fromEntries(new FormData(event.target));

  if (validationCheck (inputsValue.name.length) == true) {

    document.querySelector('#results-block').innerHTML = '';
    showSearchResults (inputsValue.name);

  };
});

async function showSearchResults (SearchInput) {

  try {

    let gihubSearchResult = await getData(SearchInput);
    createSumOfResultsBlock (gihubSearchResult);
    
  }
  catch {
    createStatusMessage ('ERROR')
  }

};

async function getData(SearchInput) {

  let response = fetch(`https://api.github.com/search/repositories?q=${SearchInput}`).then(
    successResponse => {
      if (successResponse.ok) {
        return successResponse.json();
      } else {
        return null;
      }
    },
    failResponse => {
      return null;
    }
  );

  return response;
};

function createSumOfResultsBlock (response) {

  if (response.total_count >= 10) {

    createStatusMessage (response.total_count);
  
    for (let i = 0; i < 10; i++) {
      createResultBlock (i, response);
    };

  }else if (response.total_count < 10) {

    createStatusMessage (response.total_count);
  
    for (let i = 0; i < response.total_count ; i++) {
      createResultBlock (i, response);
    };


  }else {

    createStatusMessage (0);

  };

};

function createResultBlock (i, response) {

  const newResultBlock = document.createElement('div');
  newResultBlock.className = 'section-results__result';
  newResultBlock.id = ('result-' + i);
  document.getElementById('results-block').append(newResultBlock); 

  const leftPart = document.createElement('div');
  leftPart.className = 'section-results__left';
  leftPart.id = ('left-part-' + i);
  document.getElementById('result-' + i).append(leftPart);

  const searchBlockNumber =  document.createElement('p');
  searchBlockNumber.className = 'section-results__number';
  searchBlockNumber.innerText = i + 1;
  document.getElementById('left-part-' + i).append(searchBlockNumber);

  const repositoryName =  document.createElement('a');
  repositoryName.className = 'section-results__rep-name';
  repositoryName.innerText = response.items[i].name;
  repositoryName.setAttribute('href', response.items[i].html_url)
  document.getElementById('left-part-' + i).append(repositoryName);

  const centerPart = document.createElement('div');
  centerPart.className = 'section-results__center';
  centerPart.id = ('center-part-' + i);
  document.getElementById('result-' + i).append(centerPart);

  const language =  document.createElement('p');
  language.className = 'section-results__language';
  language.innerText = `Language: ${response.items[i].language}`;
  document.getElementById('center-part-' + i).append(language);

  const visibility =  document.createElement('p');
  visibility.className = 'section-results__visibility';
  visibility.innerText = `Visibility: ${response.items[i].visibility}`;
  document.getElementById('center-part-' + i).append(visibility);

  const description =  document.createElement('p');
  description.className = 'section-results__project-description';
  if (response.items[i].description == null) {
    description.innerText = `No description`;
  }else {
    description.innerText = `Description: ${response.items[i].description}`;
  };
  document.getElementById('center-part-' + i).append(description);

  const rightPart = document.createElement('div');
  rightPart.className = 'section-results__right';
  rightPart.id = ('right-part-' + i);
  document.getElementById('result-' + i).append(rightPart);

  const avatar =  document.createElement('img');
  avatar.className = 'section-results__avatar';
  avatar.setAttribute('src', response.items[i].owner.avatar_url)
  document.getElementById('right-part-' + i).append(avatar);

  const ownerInfo = document.createElement('div');
  ownerInfo.className = 'section-results__owner-info';
  ownerInfo.id = ('owner-info-' + i);
  document.getElementById('right-part-' + i).append(ownerInfo);

  const ownerName =  document.createElement('p');
  ownerName.className = 'section-results__owner';
  ownerName.innerText = `${response.items[i].owner.login}`;
  document.getElementById('owner-info-' + i).append(ownerName);

  const ownerId =  document.createElement('p');
  ownerId.className = 'section-results__id';
  ownerId.innerText = `Id:${response.items[i].owner.id}`;
  document.getElementById('owner-info-' + i).append(ownerId);
};

function createStatusMessage (data) {

  const countResult = document.createElement('p');
  countResult.className = 'section-results__status-message';

  if (data > 0) {
    countResult.innerText = `Number of search results : ${data}`;
  }else if (data == 0) {
    countResult.innerText = `Sorry, nothing found :(`;
  } else {
    countResult.innerText = `${data} - Something went wrong :(`;
  };

  document.getElementById('results-block').append(countResult); 
};

function validationCheck (symbols) {

  if (symbols < 2) {

    validationErrorMessage.classList.remove('section-search__error_none');
    validationErrorMessage.innerText = 'Minimum search length is 2 symbols';

    searchInput.addEventListener ('keydown', function (){
      validationErrorMessage.classList.add('section-search__error_none');
      validationErrorMessage.innerText = '';
    });

    return false;
  }else {

    validationErrorMessage.classList.add('section-search__error_none');
    validationErrorMessage.innerText = '';

    return true
  };
};