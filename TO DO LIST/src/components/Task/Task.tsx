import { FC, useState } from "react";
import styles from './Task.module.css'
import pen from '/src/assets/pen.svg'
import trashcan from '/src/assets/trashcan.svg'
import { useToDoStore } from "../../store/useToDoStore"

type Props = {
    header: string
    text: string
    parentIndex: number
    childIndex: number
    currentList: any
}

export const Task: FC<Props> = ({header, text, parentIndex, childIndex}) => {
    const [store, deleteTask, editTask] = useToDoStore(state => [state.toDos, state.deleteTask, state.setTask])
    const [head, setHead] = useState(header)
    const [taskText, setTaskText] = useState(text)
    const [editable, setEditable] = useState(true)

    const clickHandle = () => {
        setEditable(!editable)
        editTask(head, taskText, parentIndex, childIndex)
    }

    return (
        <div className={styles.taskContainer}>
            <div className={styles.taskHead}>
                <input value={head} disabled={editable} className={styles.headInput} onChange={(e) => setHead(e.target.value)} />
                <div className={styles.taskIcons}>
                    <img className={styles.icon} src={pen} onClick={clickHandle} alt="pen" />
                    <img className={styles.icon} src={trashcan} alt="trashcan" onClick={() => deleteTask(parentIndex, childIndex)}/>
                </div>
            </div>
            <div className={styles.taskBody}>
                <input value={taskText} disabled={editable} className={styles.bodyInput} onChange={(e) => setTaskText(e.target.value)} />
            </div>
        </div>
    )
}