# Task-Manager

## Ссылка на демо:
https://leszeof.github.io/Task-Manager/index.html

## Описание проекта:
Приложение-органайзер с возможностью добавления своих заданий и их удаления. Приложение запоминает браузер пользователя и позволяет сохранять задачи между сеансами.

## Возможности приложения:
* Добавление своих заданий на день (модально окно)
  * Поля формы ограничены HTML валидацией. Их правила:
    * Название: длина от 2 до 40 символов
    * Описание: длина от 2 до 40 символов
    * День: число от 1 до 31
    * Месяц: число от 1 до 12
    * Год: число от 2021 до 2041
* Превью просмотр конкретного задания при клике на "Показать детали" (модальное окно)
* При перезагрузке страницы все данные сохраняются (список задач, дни с заданиями) благодаря использованию LocalStorage
* Просмотреть задачи на день:
  * Кликнуть на желаемую дату в месяце
  * При выборе дня (клик на дату) в заголовок окна просмотра задач подставляется дата и месяц
  * День в котором есть задание подсвечивается "огоньком"
* Просмотреть все задачи на месяц: необходимо нажать на месяц (находится между стрелками)

* В таблице календаря отмечается текущий день (синий круг)
  * при первой загрузке
  * если в процессе перелистывания месяцев и годов вы попадаете на текущий месяц текущего года

## Испольуземые технологии:
* HTML
* CSS
* БЭМ Нейминг и Nested файловая структура
* JS
  * ООП подход к организации кода (классы)
  * Модульная организация JS кода
* LocalStorage

## Планы по доработке:
* Переписать на React + Typescript.
* Живая валидация форм.
* Реальный бекенд (Express + MongoDB) для хранения списка дел под конкретного юзера.
* Регистрация и логин, выдача токена.
* Оповещения о грядущих задачах.
