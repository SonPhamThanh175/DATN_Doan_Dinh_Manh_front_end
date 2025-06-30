import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import MenuItemLeft from '../components/Menu';

function ProductFilter({ filters, onChange }) {
    const handleCategoryChange = ({ field, id }) => {
        if (!onChange) return;

        const newFilters = { ...filters };

        if (field === 'categoryId') {
            // Nếu chọn category mới -> reset luôn typeId
            newFilters.categoryId = id;
            newFilters.typeId = undefined; // hoặc null
        } else if (field === 'typeId') {
            // Nếu chọn type -> chỉ set typeId
            newFilters.typeId = id;
        }

        onChange(newFilters);
    };

    return (
        <div>
            <MenuItemLeft onChange={handleCategoryChange} />
        </div>
    );
}

ProductFilter.propTypes = {};

export default ProductFilter;
