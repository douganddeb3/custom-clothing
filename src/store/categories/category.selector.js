import {createSelector} from 'reselect';

const selectCategoryReducer = (state) => state.categories;

// memmoizes - store data as a key, and its value as the data
// its all about storing to cache what has already been
// looked up
// this one checks if the categories(or docs in Firebase) change

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

// this one creates a mapping from title to items
// because we are not printing the doc name
// we are printing the title of the category held
// under title in the doc
// stores and checks if any of that changes

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
}, {})
);
