import { FC, useState } from "react";
import styles from './ListContainer.module.css'
import pen from '/src/assets/pen.svg'
import trashcan from '/src/assets/trashcan.svg'
import addTask from '/src/assets/addTask.svg'
import { useToDoStore } from "../../store/useToDoStore"
import { Task } from "../Task/Task";


type Props = {
    title: string,
    parentIndex: number,
    list: any,
    id: any
}

export const ListContainer: FC<Props> = ({title, parentIndex, list, id}) => {

    //@ts-ignore
    const [titleStore, setTitleStore, deleteList, addNewTask] = useToDoStore(state => [state.toDos, state.setListTitle, state.deleteList, state.addTask])

    const [titles, setTitles] = useState(title)
    const [task, setTask] = useState('')

    return (
    <div className={styles.container}>
        <div className={styles.listHeader}>
            <input id='head' className={styles.headerInput} value={titles} onChange={(e) => {setTitles(e.target.value), setTitleStore(e.target.value, parentIndex), console.log(list)}} />
            <img className={styles.icon} src={pen} alt="pen" />
            <img className={styles.icon} src={trashcan} alt="trashcan" onClick={() => deleteList(id)}/>
        </div>

        <div className={styles.listBody}>
            <div className={styles.addTaskContainer}>
                <input className={styles.addTaskInput} placeholder='Добавить задачу' value={task} onChange={(e) => setTask(e.target.value)}/>
                <img className={styles.addTaskButton} src={addTask} alt="add task" onClick={() => {addNewTask(parentIndex, task), setTask('')}}/>
            </div>
            <div className={styles.tasksContainer}>
                {list && list?.tasks?.map((i: any, index: number) => (
                    <Task text={i.text} parentIndex={parentIndex} key={i.id} header={i.header} childIndex={index} currentList={list.tasks} />
                )
                )}
            </div>
        </div>
    </div>
)
}