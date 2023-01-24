import { FC, ReactNode } from "react";
import { Header } from '../Header/Header'
import styles from './Layout.module.css'

type Props = {
    children: ReactNode
}

export const Layout: FC<Props> = ({children}) => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}
