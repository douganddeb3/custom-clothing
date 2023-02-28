import { gql, useQuery} from '@apollo/client';
// import {useEffect} from 'react';
// import { selectCategoriesMap } from '../../store/categories/category.selector';

import './extras.styles.scss';

const COLLECTIONS = gql`
	query {
        collections{
            id
            title
            items{
            name
            imageUrl
            }
        }	
}	
`;

        
const Extras = () => {
    
        const {loading, error, data } = useQuery(COLLECTIONS);
        
    
    console.log("Reload ", data );
    console.log("load ",loading );
        
    // useEffect(() => {
       

    //     if(data){
    //         console.log("F DATA ", data );
    //         const {collections } = data;
    //         const collectionMap = collections.reduce((acc, collection) =>{
    //         const {title, items} = collection;
    //         acc[title.toLowerCase()] = items;
    //         return acc;
    //         }
        
    //         // setCategoriesMap(collectionMap);
        
    //     }
    //     }, [data]);
        
return(
    <div className="extras-container">
        <aside>
        <h1>Extras</h1>
        <p>
            Some code here
        </p>
        </aside>
        <div>
        
            {
               data && data.collections.map(({title}) => <h1>{title}</h1>)  
            }
        
        </div>
    </div>
);
};

export default Extras;