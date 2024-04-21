import React, { useEffect, useState } from 'react';
import TicketsSection from './TicketsSection';
import * as API from '../utils/API';
import { Button } from '@mui/material';
import { ROUTES } from '../utils/Routes';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import BannerV2 from './BannerV2';

function Explore() {

  const navigate = useNavigate();
  const [dataLoading,setDataLoading] = useState(false);

  useEffect(()=>{
    fetchLanguages();
  },[]);

  const [languagesCategory,setLanguagesCategory] = useState([])

  const fetchLanguages = async () =>{
    setDataLoading(true);
    let languages = await API.GetMethod('languages');
    setDataLoading(false);
    setLanguagesCategory(previousValue => previousValue = languages.data.data);
  }

  return (
    <div className='flex flex-col flex-auto overflow-auto'>
      <BannerV2 />
      <div className='flex flex-col flex-auto p-4 gap-2'>
        {
          languagesCategory && languagesCategory.length > 0 && languagesCategory.map((language)=>{
            return (
              <div className='flex flex-col min-w-[300px] min-h-[300px]' key={language?._id}>
                <div className='flex flex-row justify-between items-center'>
                  <div className='text-xl'>{language.other_name}</div>
                  <div>
                      <Button variant='contained' onClick={()=> navigate(ROUTES.EVENTS,createSearchParams( { languages:language?._id }))} >View more</Button>
                  </div>
                </div>
                {
                  dataLoading ? 
                  <div>
                    <Skeleton style={{transform:"scale(1)"}} width={210} height={300} />
                  </div> : 
                  <TicketsSection language={language} />
                }
                
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Explore
