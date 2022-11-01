import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.intro}>
                Harvey writes post about<br />
				Failures and Mistakes,<br />
				Ups and Downs.
        </div>
    </div>
  )
}
