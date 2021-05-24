import React from "react";
import './App.css';
import ScrollablePageView from "./ScrollablePageView";
import styles from './app.module.scss'



const topMenuList = [
    {id: 'summary', text: 'Job Summary'},
    {id: 'about', text: 'About the company'},
    {id: 'neighborhood', text: 'About the Neighborhood'},
]

const defaultItem = 'summary';



function App() {
    return (
        <div className="App">

            <ScrollablePageView menuList={topMenuList} defaultMenuItem={defaultItem}>
                <div className={styles.cardData}><h2>Job Summary</h2> Some information here</div>
                <div className={styles.cardData}><h2>About the Company</h2> Some information here</div>
                <div className={styles.cardData}><h2>About the Neighborhood</h2> Some information here</div>

            </ScrollablePageView>
        </div>
    );
}

export default App;
