// Extras component with graphql not apollo:

// import {  gql, useQuery} from '@apollo/client';
// import {useEffect} from 'react';
// import { selectCategoriesMap } from '../../store/categories/category.selector';
import {useQuery} from 'react-query';
import './extras.styles.scss';

// const COLLECTIONS = gql`
// 	query {
//         collections{
//             id
//             title
//             items{
//             name
//             imageUrl
//             }
//         }	
// }	
// `;

const fetcher = () => {
    return fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => res.json());
 }

      
const Extras = () => {
    const { isLoading, error, data } = useQuery('repoData', fetcher);
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
    // const {loading, error, data } = useQuery(COLLECTIONS);
        
    // console.log("ERROR: ",error);
    // console.log("Reload ", data );
    // console.log("load ",loading );
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error : {error.message}</p>;  
    

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
        // }, [data, error, loading]);
        
return(
    <div className="extras-container">
        <aside>
        <h1>Extras</h1>
        <p>
            <em><strong>Try useQuery to hit an API in your React App</strong></em>
            <ol>
                <li>npm install 'react-query'</li>

                <li>In index.js: 
                    <ul>
                        <li>import &#123; QueryClient, QueryClientProvider &#125; from 'react-query';</li>
                        <li>const queryClient = new QueryClient();</li>
                        <li>wrap the entire structure with &#60;QueryClientProvider client=&#123;queryClient&#125;&#62;</li>
                    </ul>
                </li>    
               
                <li>In <em>your_component.js</em>: 
                    <ul>
                        <li>import &#123;useQuery&#125; from 'react-query';</li>
                        <li>Write your fetch function: const fetcher = () => &#123;
                            return fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => res.json());
                            &#125;
                        </li>
                        <li>Within the functional component:
                            const &#123; isLoading, error, data &#125; = useQuery('repoData', fetcher);
                        </li>
                    
                        <li>
                             Use these the variables returned in your code. Eg. &#60;h1&#62; data.name &#60;/h1&#62;
                        </li>
                    </ul>
                </li>
            </ol>
        </p>
        </aside>
        <div>
            <h1>{data.name}</h1> 
            <p>{data.description}</p>
            <p><strong>Subscribers: {data.subscribers_count}</strong></p>
            <p><strong>Stargazers: {data.stargazers_count}</strong></p>
            <p><strong>Forks: {data.forks_count}</strong></p>
            {/* {
               data && data.collections.map(({title}) => <h1 key={title}>{title}</h1>)  
               
            }  */}
        
        </div>
    </div>
    
);
};

export default Extras;


