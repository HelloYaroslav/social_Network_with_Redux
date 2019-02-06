import React from 'react';
import style from './News.module.css';
import NewsPost from './NewsPost/NewsPost'
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import connect from "react-redux/es/connect/connect";
import isLoggedInHOC from "../../LoginPage/isLoggedInHOC";


const News = (props) => {

    let NewsList = props.newsList.map((el) => {
        return <NewsPost caption={el.caption} text={el.text} img={el.img}/>
    });

    return (
        <div className={style.page_wrapper}>
            <Header/>
            <div className={style.content}>
                <Sidebar/>
                <div className={style.news_wrapper}>
                    <img className={style.profile_img} src="https://images7.alphacoders.com/542/thumb-1920-542418.jpg"
                         alt=""/>
                    <h1>НОВОСТИ ИЗ НАШЕЙ ПЛОСКОСТИ</h1>
                    <div className={style.news}>
                        {NewsList}
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        newsList: state.newsPage.newsList
    }
};

const ConnectedNews = connect(mapStateToProps, null)(News);

export default isLoggedInHOC(ConnectedNews);
