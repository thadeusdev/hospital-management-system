import React from 'react';
import Chart from '../../components/chart/Chart';
import WidgetLarge from '../../components/widgetLarge/WidgetLarge';
import WidgetSmall from '../../components/widgetSmall/WidgetSmall';
import FeaturedInfo from '../featuredInfo/FeaturedInfo';
import "./dashboard.css"

const Dashboard = () => {
    return (
        <div className='home'>
            {/* <h1>dashboard page</h1> */}
            <FeaturedInfo />
            <Chart />
            <div className='homeWidgets'>
                <WidgetSmall />
                <WidgetLarge />
            </div>
        </div>
    );
};

export default Dashboard;