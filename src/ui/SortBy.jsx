/* eslint-disable react/prop-types */
import Select from "./Select";

const SortBy = ({ options }) => {
    return (
        <Select options={options} value="name-asc"/>
    );
};

export default SortBy;