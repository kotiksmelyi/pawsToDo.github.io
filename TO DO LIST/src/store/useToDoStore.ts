import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from 'zustand/middleware'

export const useToDoStore = create(persist(
    (set, get) => ({
        toDos: [],

        addToDoList: (title: string) => {
            set((state) => ({
                toDos: [...state.toDos, {id: nanoid(), title: title, tasks: []}]
            }))
        },

        setListTitle: (newTitle: string, index: number) => 
            set(state => {
                const newList = [...state.toDos]
                newList[index].title = newTitle
                return { toDos: newList }
            }),

        setTask: (newTitle: string, newText: string, parentIndex: number, childIndex: number) =>
            set(state => {
                const newList = [...state.toDos]
                newList[parentIndex].tasks[childIndex].header = newTitle
                newList[parentIndex].tasks[childIndex].text = newText
                return { toDos: newList }
            }),

        addTask: (index: number, header: string) => 
            set((state) => {
                const newTask = {id: nanoid(), header, text: 'Описание задачи' }
                const newList = [...state.toDos]
                newList[index].tasks.unshift(newTask)
                console.log(newList[index].tasks)
                return { toDos: newList }
        }),

        deleteList: (id: string | number) =>
            set((state) => ({toDos: state.toDos.filter((list) => list.id !== id)})),

        deleteTask: (parentIndex: number, childIndex: number) => 
            set(state => {
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