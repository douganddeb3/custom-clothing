// .category-container{
//     display:grid;
//     // fr refers to what fraction of all the space 
//     // will be allocated for a particular column 
//     // if there are 6 columns 1fr would be 1/6.
//     grid-template-columns: repeat(4, 1fr);
//     column-gap: 20px;
//     row-gap: 50px;

    
// }
// .category-title {
//     font-size: 38px;
//     margin-bottom: 25px;
//     text-align: center;
// }

import styled from 'styled-components';

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
    @media screen and (max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2px;

      }

`;

export const Title = styled.h2`
    font-size: 38px;
    margin-bottom: 25px;
    text-align: center;
`;