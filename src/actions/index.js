
let nextTodoId = 0

export const add = value => ({
    type: 'ADD',
    id: nextTodoId++,
    value
})