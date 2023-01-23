import { FC } from "react"
import { useToDoStore } from "../../store/useToDoStore"
import { ListContainer } from "../ListContainer/ListContainer"
import styles from './Body.module.css'

    export const Body: FC = () => {
    const toDo = useToDoStore(state => state.toDos)

    return (
        <div className={styles.body}>
            {toDo && toDo.map((list: any, index: number) => <ListContainer key={list.id} title={list.title} parentIndex={index} list={list} id={list.id} />)}
        </div>
    )
    }