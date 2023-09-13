// Необходимо получить список всех пользователей с помощью бесплатного API (https://jsonplaceholder.typicode.com/users) и отобразить их на странице. Пользователь должен иметь возможность удалить любого пользователя из списка. Данные при получении необходимо сохранить в локальное хранилище браузера localStorage. При удалении пользователь должен удаляться не только со страницы, но и из локального хранилища localStorage
const usersGetData = async (url) => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    localStorage.setItem('usersList', JSON.stringify(responseJSON)); 
    return responseJSON;
  };
  
const url = 'https://jsonplaceholder.typicode.com/users';
  
  
async function main(){
    try {
        const formData = await usersGetData(url);
        const elementUsers = document.querySelector('.users_form');
        formData.forEach((el) => {
            const userCard = `
              <div class="user" id="${el.id}">
                  <h3>User ${el.id}</h3>
                  <p class="name">Имя: ${el.name}</p>
                  <p class="username">Никнейм: ${el.username}</p>
                  <p class="email">Email: ${el.email}</p>
                  <button class="btn__del">Удалить пользователя</button>
              </div>
              `
            elementUsers.insertAdjacentHTML("beforeend", userCard)
        })
        const deleteButton = document.querySelectorAll('.btn__del');
        deleteButton.forEach((btn) => {
          btn.addEventListener('click', () => {
            const choiceUser = btn.closest('.user');
            const localUsersData = JSON.parse(localStorage.getItem('usersList'));
            const filterUsers = localUsersData.filter(element => element.id != choiceUser.id);
            localStorage.setItem('usersList', JSON.stringify(filterUsers));
            choiceUser.remove();
          })
        })
    } catch (error) {
        console.error('Произошла ошибка. Попробуйте снова');
    }
};
main ();