import React from 'react'
import styles from '../../styles/PopularProfiles.module.css'
import { Container } from 'react-bootstrap'
import Profile from './Profile'
import { useProfileData } from '../../contexts/ProfileDataContext'

const PopularProfiles = ({ mobile }) => {
    const { popularProfiles } = useProfileData();


    return (
        <Container className={`${styles.Container} ${mobile && 'd-lg-none text-center mb-3'}`}>
            <p><i class="fa-regular fa-user" /> Profiles: </p>

            {mobile ? (
                <div className='d-flex justify-content-around'>
                    {popularProfiles.results.slice(0, 4).map(profile => (
                        <Profile key={profile.id} profile={profile} mobile />
                    ))}
                </div>
            ) : (

                popularProfiles.results.map(profile => (
                    <Profile key={profile.id} profile={profile} />
                ))
            )}

        </Container>
    )
}

export default PopularProfiles