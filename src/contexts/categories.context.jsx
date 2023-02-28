// Everything migrated to Redux

// import {createContext, useState, useEffect} from 'react';

// import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// // import SHOP_DATA from '../shop-data.js';
// // eslint-disable-next-line 
// import { Firestore } from 'firebase/firestore';

// export const CategoriesContext = createContext({
//     categoriesMap: {},
// });

// export const CategoriesProvider = ({ children}) => {

//         const [categoriesMap, setCategoriesMap] = useState({});

//         useEffect(() => {
//             const getCategoriesMap = async () => {
//                 const categoryMap = await getCategoriesAndDocuments();
//                 console.log(categoryMap);
//                 
//             };
//             getCategoriesMap();
//         }, []);
        
//         // only had to run this useEffect
//         // to send data to Firestore, so now 
//         // it is commented out
//         // useEffect(() => {
//         //     addCollectionAndDocuments('categories', SHOP_DATA);
//         // },[]);
//         const value = {categoriesMap};
//         return(
//         <CategoriesContext.Provider value={value}> 
//             {children} 
//         </CategoriesContext.Provider>
//     );
// };