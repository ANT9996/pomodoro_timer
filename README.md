# Трекер задач с таймером по методу «Помодоро»

Запуск проекта - ```npm run dev```
#
### Доп. библиотеки:
#### - State-менеджер - Zustand
#### - Работа с датами - moment.js
###
#### Константы - [constants.ts](./src/constants.ts)
#### Типы - [types.ts](./src/types.ts)
#### Перечисления - [enums.ts](./src/enums.ts)
###
#### Таймер - [Timer.tsx](./src/components/Timer/Timer.tsx)
#### Таймер при отсутствии задач - [EmptyTimer.tsx](./src/components/EmptyTimer/EmptyTimer.tsx)
#### Таймер отдыха - [RestTimer.tsx](./src/components/RestTimer/RestTimer.tsx)
###
#### Хранилище (zustand) - [store.ts](./src/store.ts)
#### Управление localStorage - [LocalStorage.ts](./src/helpers/LocalStorage.ts)

## 
### 1. Добавлены анимации
  - Уменьшение времени на таймере сопровождается анимацией. (***по мере уменьшения времени, цифры постепенно перекрашиваются в другой цвет***)
  - При добавлении новой задачи она появляется с анимацией.
  - После остановки таймера выполненная задача исчезает с анимацией.
### 2. Добавлена тёмная тема
  - Реализована «тёмная тема».
  - Добавлен в шапку переключатель между темами.
  - Сохранение последней выбранной темы между перезагрузками страницы.
### 3. Добавлены уведомления
  - По истечению времени таймера работы/отдыха производится звуковое уведомление
### 4. Добавлены настройки таймера
  - Можно изменять продолжительность «помидора».
  - Можно изменять продолжительность длинного перерыва.
  - Можно изменять продолжительность короткого перерыва.
  - Можно изменять частоту длинных перерывов.
  - Можно выключить уведомления.
### 5. Сохранение состояния приложения при перезагрузке страницы
  - Сохранение состояния приложения в LocalStorage.
  - При перезагрузке приложения восстанавливается предыдущее сохранённое состояние.
