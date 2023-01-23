import { FC } from "react"
import styles from './Header.module.css'
import paw from '/src/assets/paw.png'
import addList from '/src/assets/addList.svg'
import { useToDoStore } from "../../store/useToDoStore"

export const Header: FC = () => {
    const [lists, addLists] = useToDoStore(state => [state.toDos, state.addToDoList])

    const handleClick = () => {
        addLists('Новый списочек!')
    }

   

    return (
        <div className={styles.container}>
                <div className={styles.borders}>

                </div>
                <div className={styles.textContainer}>
                    <img className={styles.text} src={paw} alt="paws" />
                    <img className={styles.addList} src={addList} alt="add list" onClick={handleClick}/>
                </div>
                <div className={styles.borders}>
                    
                </div>
        </div>
    )
}