import {useState, useEffect, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {selectCategoriesIsLoading, selectCategoriesMap} from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
// import './category.styles.tsx';
// import { connectFirestoreEmulator } from 'firebase/firestore';
import { CategoryContainer, Title } from './category.styles';



type CategoryRouteParams = {
    category: string;
};


const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    console.log('render/re-rendering category component');
    console.log('effect firing setProducts is next.');
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return(
        <Fragment>
            
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ? <Spinner />
                :
                <CategoryContainer>
                    {   products &&
                        products.map((product) => <ProductCard key={product.id} product={product} />)
                    }
            </CategoryContainer> 
            }
             
        </Fragment>
        
    );
};

export default Category;