import React, {useEffect, useRef, useState} from "react";
import './App.css';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import styles from './app.module.scss'
import Carousel from 'react-elastic-carousel';


const topMenuList = [
    {id: 'summary', text: 'Job Summary'},
    {id: 'about', text: 'About the company'},
    {id: 'neighborhood', text: 'About the Neighborhood'},
]


// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map(el => {
        const {id, text} = el;

        return <MenuItem text={text} key={id} selected={selected}/>;
    });


const Arrow = ({text, className}) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({text: '<', className: 'arrow-prev '});
const ArrowRight = Arrow({text: '>', className: 'arrow-next '});


const defaultItem = 'summary';



const AscendMenu = () => {

    const [selected, setSelected] = useState(defaultItem);
    const [menuItems, setMenuItems] = useState();

    let carouselRef = useRef(null);
    let menuRef = useRef(null);

    useEffect(() => {

        setMenuItems(Menu(topMenuList, defaultItem))

    }, []);

    const onSelect = (key) => {
        console.log('key, carousel ===>', key,carouselRef);
        setSelected(key);
        if (carouselRef) {
            carouselRef.goTo(topMenuList.findIndex((x)=> x.id === key));
        }
    }
    const onScroll = (key) => {
        console.log('onScroll key. menuRef ===>', key, menuRef);

        if(menuRef) {
            menuRef.scrollTo(topMenuList[key.index].id)
            menuRef.onItemClick(topMenuList[key.index].id)
        }
    }
    const showNextMenu = (currentItem, nextItem) => {
        console.log('showNextMenu  currentItem, nextItem ===>', currentItem, nextItem);

    }
    const showPrevMenu = (currentItem, nextItem) => {
        console.log('showPrevMenu currentItem, nextItem ===>', currentItem, nextItem);

    }

    return (

        <>
            <div style={{backgroundColor: "#3061A9",color:"white", height: "75px"}}> Some Header Here</div>
            <div className={styles.menuDivider}>
                <ScrollMenu
                    ref={ref => (menuRef = ref)}
                    data={menuItems}
                    // arrowLeft={ArrowLeft}
                    // arrowRight={ArrowRight}
                    selected={selected}
                    onSelect={onSelect}
                    hideArrows={true}
                />
            </div>

            <Carousel
                ref={ref => (carouselRef = ref)}
                onChange={onScroll}
                onNextStart={showNextMenu}
                onPrevStart={showPrevMenu}
                showArrows={false}
                isRTL=""
                itemsToShow={1}
                renderPagination={({pages, activePage, onClick}) => {
                    return <div/>;
                }}
            >
                <div className={styles.cardData}><h2>Job Summary</h2> Some information here</div>
                <div className={styles.cardData}><h2>About the Company</h2> Some information here</div>
                <div className={styles.cardData}><h2>About the Neighborhood</h2> Some information here</div>

            </Carousel>
        </>

    )

}


function App() {
    return (
        <div className="App">

            <AscendMenu/>
        </div>
    );
}

export default App;
