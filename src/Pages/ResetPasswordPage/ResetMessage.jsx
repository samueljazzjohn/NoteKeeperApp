import React from 'react'
import { useLocation } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

const ResetMessage = () => {
    const state = useLocation()
    console.log('state', state.state.status)


    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                {
                    state.state.status
                        ?
                        <div className='flex flex-row'>
                            <VerifiedIcon />
                            <h1 className='font-display'>Password updated successfully</h1>
                        </div>
                        :
                        <div className='flex flex-row'>
                            <UnpublishedIcon/>
                            <h1 className='font-display'>Please try again later</h1>
                            </div>
                }
            </div>
        </>
    )
}

export default ResetMessage