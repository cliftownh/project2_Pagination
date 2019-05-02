/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

let students = document.getElementsByClassName('student-item');
let pageList = [];
let currentPage = 1;
let numPerPage = 10;
let numOfPages = 1;
let page = document.querySelector('.page');
let linkDiv = document.createElement('div');

linkDiv.className = 'pagination';
page.appendChild(linkDiv);

// Create the search bar
let header = document.querySelector('.page-header');
let searchBar = document.createElement('div');

searchBar.className = 'student-search';
header.appendChild(searchBar);

let input = document.createElement('input');
input.placeholder = 'Search for students...';
searchBar.appendChild(input);

let button = document.createElement('button');
button.innerText = 'Search';
searchBar.appendChild(button);

// Calculate pages needed based on number of students
function getNumOfPages(array) {
  return Math.ceil(array.length / numPerPage);
}
numOfPages = getNumOfPages(students);

// Hide all students
function hide(array) {
  for (let i = 0; i < array.length; i++){
      array[i].style.display = 'none';
  }
}

// Show 10 students on front page
function showPage(students, selectedPage, numPerPage) {
  hide(students);

  for (let i = (selectedPage * numPerPage - numPerPage); i < (selectedPage * numPerPage) && i < students.length; i++) {
    students[i].style.display = '';
  }
}

showPage(students, currentPage, numPerPage);


// Add page links to the bottom
function appendPageLinks (numOfPages) {
  for (i = 1; i < numOfPages + 1; i++) {
    let li = document.createElement('li');
    linkDiv.appendChild(li);
    li.innerHTML = `<a>${i}</a>`;
  }
}

appendPageLinks(numOfPages);

let links = linkDiv.getElementsByTagName('a');

// Make search functionality
function search (event) {
  if (input.value == "") {
    showPage(students, currentPage, numPerPage);
    hide(links);
    appendPageLinks(getNumOfPages(students));
  } else {
    hide(students);
    hide(links);

    let txt;
    let remove;
    let none = [];
    let count = [];
    let ul = document.querySelector('.student-list');

    for (let i = 0; i < students.length; i++) {
      names = students[i].getElementsByTagName('h3')[0];
      txt = names.textContent || names.innerText;

      if (txt.indexOf(input.value.toLowerCase()) > -1) {
        if (count.length >= (currentPage * numPerPage - numPerPage) && count.length < (currentPage * numPerPage))
        {
          students[i].style.display = "";
        }
        count.push(1);
      }
    }

    // Handle no results found
    if (count.length <= 0 && none.length < 1) {
      none.push(document.createElement('li'));
      none[0].className = 'none';
      none[0].innerHTML = 'No results found.';
      ul.appendChild(none[0]);
    }
    if (count.length <= 0 && none.length > 0) {
      remove = document.querySelector('.none');
      ul.removeChild(remove);
      ul.appendChild(none[0]);
    } else if (count.length > 0 && ul.childElementCount > students.length) {
      ul.removeChild(ul.lastChild);
    }
    numOfPages = getNumOfPages(count);
    appendPageLinks(numOfPages);
  }
}

input.addEventListener('keyup', (event) => {
  currentPage = 1;
  search(event);
});

linkDiv.addEventListener('click', (event) => {
  if (event.target.tagName == 'A') {
    hide(students);
    currentPage = event.target.innerText;
    if (input.value == ""){
      showPage(students, currentPage, numPerPage);
    } else {
      search(event);
    }
  }
});
