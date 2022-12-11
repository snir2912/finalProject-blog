import React, { useEffect } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";

const CategoryDropDown = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const category = useSelector(state => state?.category);
  const { categoryList, loading } = category;

  const allCategories = categoryList?.map(category => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  const handleChange = value => {
    props.onChange("category", value);
  };

  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h3 className='text-base text-green-600'>
          Product categories list are loading please wait...
        </h3>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id='category'
          options={allCategories}
          value={props?.value?.label}
        />
      )}

      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
      )}
    </div>
  );
};

export default CategoryDropDown;
