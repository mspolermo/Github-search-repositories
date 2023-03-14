# Github-search-repositories
Github search repositories using API Github
# Описание
Поиск репозиториев github по подстроке
- Форма срабатывает по кнопке "Search" или по нажатию клавиши Enter
- Cписок с результатами выводит только первые 10 найденных репозиториев
- Поле ввода (для подстроки поиска): 
  - Если символов недостаточно, то выдается сообщение об ошибке
# Внешний вид
- В результатах поиска выводится название репозитория, искользуемый язык, видимость, описание репозитория, автар, ник и id владельца репозитория
- Название по совместительству является ссылкой на соответвующий git репозиторий
  - Ссылки окрываются в новой вкладке браузера
- Дополнительно
  - Изначально пустой список
  - Если по запросу ничего не найдено, то вместо списка выводится сообщение "Sorry, nothing found"
  - В случае возникновение ошибок при запросе к API, вместо списка выводится сообщение "ERROR - Something went wrong"
