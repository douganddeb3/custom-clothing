import {useState, useEffect, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {selectCategoriesMap} from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';
// import { connectFirestoreEmulator } from 'firebase/firestore';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
    console.log('render/re-rendering category component');
    console.log('effect firing setProducts is next.');
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
            {   products &&
                products.map((product) => <ProductCard key={product.id} product={product} />)
            }
            </div>  
        </Fragment>
        
    );
};

export default Category;