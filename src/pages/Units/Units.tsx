import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ListView from '../../components/Units/ListView';
import GET_ALL_UNITS from '../../graphql/queries/getAllUnits';

const UnitsPage = ():JSX.Element => {
  // @ts-ignore
  const { id } = useParams();
  const { data, loading } = useQuery(GET_ALL_UNITS, {
    variables:{
      semester:id,
    },
  });

  return (
        <>
            {
                !loading && data.getAllUnits.map(({ unitName }:any)=>(
                    <ListView unitName={unitName} />
                ))
            }
        </>
  );
};

export default UnitsPage;
