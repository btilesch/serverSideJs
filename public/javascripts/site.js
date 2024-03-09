document.addEventListener('DOMContentLoaded', function () {
  highlightNavItem();
  handleUserLeaving();
  handleTableRowClicked();
  bindRecipeActions();
});

function bindRecipeActions() {
  document.getElementById('recipe-action-new').addEventListener('click', () => {
    window.location = '/' + getMachineName() + '/new';
  });
  document.getElementById('recipe-action-edit').addEventListener('click', () => {
    window.location = '/' + getMachineName() + '/edit';
  });
}

/**
 *
 * @param targetState {'hidden' | 'visible'}
 */
function setActionButtonState(targetState) {
  console.log('setting: ', targetState);
  if (targetState === 'visible') {
    document.getElementById('recipe-action-delete').classList.remove('hidden');
    document.getElementById('recipe-action-edit').classList.remove('hidden');
    document.getElementById('recipe-action-enable').classList.remove('hidden');
  } else {
    document.getElementById('recipe-action-delete').classList.add('hidden');
    document.getElementById('recipe-action-edit').classList.add('hidden');
    document.getElementById('recipe-action-enable').classList.add('hidden');
  }
}

function handleTableRowClicked() {
  document.querySelectorAll('tbody tr').forEach((rowClicked) => {
    rowClicked.addEventListener('click', (event) => {
      let isSelected = false;
      document.querySelectorAll('tbody tr').forEach((row) => {
        if (row !== rowClicked || row.ariaSelected === 'true') {
          row.ariaSelected = 'false';
          row.classList.remove('bg-indigo-700');
        } else {
          isSelected = true;
          row.ariaSelected = 'true';
          row.classList.add('bg-indigo-700');
        }
      });

      if (isSelected) {
        setActionButtonState('visible');
      } else {
        setActionButtonState('hidden');
      }
    });
  });
}

function getMachineName() {
  let path = window.location.pathname.replace(/^\/|\/$/g, '').split('/');
  return path[0] || 'line';
}

function highlightNavItem() {
  let machine = getMachineName();
  let links = document.querySelectorAll('nav a');
  const highlight = ['border-indigo-500', 'text-indigo-70'];

  links.forEach((link) => {
    link.classList.remove(...highlight);
    let machineNav = link.getAttribute('href').replace(/^\/|\/$/g, '');
    if (machineNav === machine) {
      link.classList.add(...highlight);
    }
  });
}

function handleUserLeaving() {
  let pageType = document.getElementsByTagName('meta')['page-type']?.content;
  const confirmLeave = (event) => {
    event.preventDefault();
    return (event.returnValue = '');
  };

  if (pageType === 'editor') {
    window.addEventListener('beforeunload', confirmLeave);
  }

  let forms = document.getElementsByTagName('form');
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', () => {
      window.removeEventListener('beforeunload', confirmLeave);
    });
  }
}
