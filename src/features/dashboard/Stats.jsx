/* eslint-disable react/prop-types */

import { Fragment } from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numbDays, cabinCount }) => {
    const numbBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const numbCheckins = confirmedStays.length;
    const occupancyRate = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numbDays * cabinCount);

    console.log(occupancyRate);

    return (
        <Fragment>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase/>} value={numbBookings}/>
            <Stat title="Sales" color="green" icon={<HiOutlineBanknotes/>} value={formatCurrency(sales)}/>
            <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays/>} value={numbCheckins}/>
            <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar/>} value={Math.round(occupancyRate * 100) + '%'}/>
        </Fragment>
    );
};

export default Stats;