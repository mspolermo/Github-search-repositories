// `https://api.github.com/search/repositories?q={${query}{&page,per_page,sort,order}`

let formEl = document.querySelector('#form');

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  let inputsValue = Object.fromEntries(new FormData(event.target));

  document.querySelector('#results-block').innerHTML = '';
  showSearchResults (inputsValue.name);

});


async function showSearchResults (SearchInput) {

  try {

    let gihubSearchResult = await getData (SearchInput);
    createSumOfResultsBlock (gihubSearchResult);
    
  }
  catch {
    console.log('ERROR');
  }

};

async function getData(SearchInput) {

  let response = fetch(`https://api.github.com/search/repositories?q=${SearchInput}`).then(
    successResponse => {
      if (successResponse.status != 200) {
        return null;
      } else {
        return successResponse.json();
      }
    },
    failResponse => {
      return null;
    }
  );

  return response;
};

function createSumOfResultsBlock (response) {

  const countResult = document.createElement('p');
  countResult.className = 'section-results__sum-of-results';
  countResult.innerText = `Number of search results : ${response.total_count}`
  document.getElementById('results-block').append(countResult); 

  for (let i = 0; i < 10; i++) {
    createResultBlock (i, response);
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
  description.innerText = `Description: ${response.items[i].description}`;
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
