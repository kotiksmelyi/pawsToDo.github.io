import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from 'zustand/middleware'

interface ToDo {
    todos: [],
    addToDoList: (title: string) => void
    setListTitle: (newTitle: string, index: number) => Array<Task>
    setTask: (newTitle: string, newText: string, parentIndex: number, childIndex: number) => Array<Task>
    addTask: (index: number, header: string) => Array<Task>
    deleteList: (id: string | number) => void
    deleteTask: (parentIndex: number, childIndex: number) => Array<Task>
}

interface Task {
    id: string
    title: string
    tasks: []
}
    


export const useToDoStore = create(persist(
    (set, get) => ({
        toDos: [],

        addToDoList: (title: string) => {
            set((state: { toDos: any; }) => ({
                toDos: [...state.toDos, {id: nanoid(), title: title, tasks: []}]
            }))
        },

        setListTitle: (newTitle: string, index: number) => 
            set((state: { toDos: any; }) => {
                const newList = [...state.toDos]
                newList[index].title = newTitle
                return { toDos: newList }
            }),

        setTask: (newTitle: string, newText: string, parentIndex: number, childIndex: number) =>
            set((state: { toDos: any; }) => {
                const newList = [...state.toDos]
                newList[parentIndex].tasks[childIndex].header = newTitle
                newList[parentIndex].tasks[childIndex].text = newText
                return { toDos: newList }
            }),

        addTask: (index: number, header: string) => 
            set((state: { toDos: any; }) => {
                const newTask = {id: nanoid(), header, text: 'Описание задачи' }
                const newList = [...state.toDos]
                newList[index].tasks.unshift(newTask)
                console.log(newList[index].tasks)
                return { toDos: newList }
        }),

        deleteList: (id: string | number) =>
            set((state: { toDos: any[]; }) => ({toDos: state.toDos.filter((list: { id: string | number; }) => list.id !== id)})),

        deleteTask: (parentIndex: number, childIndex: number) => 
            set((state: { toDos: any; }) => {
                const newList = [...state.toDos]
                newList[parentIndex].tasks.splice(childIndex, 1)
                return { toDos: newList }
            }),
            name: "todos-storage",
            getStorage: () => sessionStorage
}), 
        {
            name: 'toDos-storage'
        }
))