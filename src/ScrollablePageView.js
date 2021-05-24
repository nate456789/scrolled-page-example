import React, { useRef, useState} from "react";
import './App.css';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import styles from './ScrollablePageView.module.scss'
import Carousel from 'react-elastic-carousel';


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


// const Arrow = ({text, className}) => {
//     return (
//         <div
//             className={className}
//         >{text}</div>
//     );
// };


// const ArrowLeft = Arrow({text: '<', className: 'arrow-prev '});
// const ArrowRight = Arrow({text: '>', className: 'arrow-next '});




export default function  ScrollablePageView ({menuList, defaultMenuItem, children}) {

    const [selected, setSelected] = useState(defaultMenuItem);
    const [menuItems] = useState(Menu(menuList, defaultMenuItem));


    let carouselRef = useRef(null);
    let menuRef = useRef(null);

    const onSelect = (key) => {
        setSelected(key);
        if (carouselRef) {
            carouselRef.goTo(menuList.findIndex((x)=> x.id === key));
        }
    }
    const onScroll = (key) => {
        if(menuRef) {
            menuRef.scrollTo(menuList[key.index].id)
            menuRef.onItemClick(menuList[key.index].id)
        }
    }

    return (

        <>
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
                showArrows={false}
                isRTL=""
                itemsToShow={1}
                renderPagination={({pages, activePage, onClick}) => {
                    return <div/>;
                }}
            >
                {children}

            </Carousel>
        </>

    )

}




